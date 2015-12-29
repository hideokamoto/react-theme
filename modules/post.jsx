// Load Reacts
var React = require('react');
var ReactDOM = require('react-dom');

var Post = React.createClass({
	render: function() {
		return (
			<li className="comment list-group-item">
				<a href={this.props.post.link}>
					<div className="panel-headin">
						<h3 className="commentAuthor panel-titl">
							{this.props.post.title.rendered}
						</h3>
					</div>
					<div className="panel-bod">
						{this.props.children}
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
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function(data) {
			console.log(data);
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
