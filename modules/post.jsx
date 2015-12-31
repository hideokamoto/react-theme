// Load Reacts
var React = require('react');
var ReactDOM = require('react-dom');

var Thumbnail = React.createClass({
	getThumbnail: function() {
		var thumbnail = this.props.postData['_embedded']['https://api.w.org/featuredmedia'][0];
		return thumbnail.media_details.sizes.thumbnail.source_url;
	},
	render: function() {
		var thumbnail_url = this.getThumbnail();
		return (
			<img src={thumbnail_url} className="col-xs-4"/>
		);
	}
});

var Post = React.createClass({
	render: function() {
		var post_col = "col-xs-12";
		if ( 0 !== this.props.post.featured_image ) {
			var thumbnailHtml = <Thumbnail postData={this.props.post}/>;
			post_col = "col-xs-8";
		}
		return (
			<li className="comment list-group-item">
				<a href={this.props.post.link} className="row">
					{thumbnailHtml}
					<div className={post_col}>
						<div className="panel-headin">
							<h3 className="commentAuthor panel-titl">
								{this.props.post.title.rendered}
							</h3>
						</div>
						<div className="panel-bod">
							{this.props.children}
						</div>
					</div>
				</a>
			</li>
		);
	}
});

var PostList = React.createClass({
	render: function() {
		var postNodes = this.props.data.map(function (post) {
			return (
				<Post post={post} key={post.id}>
					<div dangerouslySetInnerHTML={{__html: post.excerpt.rendered}} />
				</Post>
			);
		});
		return (
			<ul className="postList list-group">
				{postNodes}
			</ul>
		);
	}
});

var Posts = React.createClass({
	loadCommentsFromServer: function() {
		$.ajax({
			url: this.props.url + '?_embed',
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({data: data});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	getInitialState: function() {
		return {data: []};
	},
	componentDidMount: function() {
		this.loadCommentsFromServer();
	},
	render: function() {
		return (
			<div className="commentBox panel panel-default">
				<h2 className="panel-heading">Posts</h2>
				<PostList data={this.state.data} />
			</div>
		);
	}
});
module.exports = Posts;
