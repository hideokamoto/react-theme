// Load Reacts
var React = require('react');
var ReactDOM = require('react-dom');

var CommentList = require('../modules/commentList.jsx');

var PostComment = React.createClass({
	loadCommentsFromServer: function() {
		$.ajax({
			url: this.props.commentApi,
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
	handleCommentSubmit: function(comment) {
		var comments = this.state.data;
		var newComments = comments.concat([comment]);
		$.ajax({
			url: this.props.commentApi,
			dataType: 'json',
			type: 'POST',
			data: comment,
			success: function(data) {
				this.loadCommentsFromServer();
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
		console.log(this.props.commentApi);
		this.loadCommentsFromServer();
		//setInterval(this.loadCommentsFromServer, this.props.pollInterval);
	},
	render: function() {
		return (
			<div className="commentBox panel panel-default">
				<h2 className="panel-heading">Recent Comments</h2>
				<CommentList data={this.state.data} />
			</div>
		)
	}
});

var Thumbnail = React.createClass({
	getThumbnail: function() {
		var thumbnail = this.props.postData['_embedded']['https://api.w.org/featuredmedia'][0];
		return thumbnail.source_url;
	},
	render: function() {
		var thumbnail_url = this.getThumbnail();
		return (
			<img src={thumbnail_url}/>
		);
	}
});

var SingleBox = React.createClass({
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
		return {
			data: {
				featured_image: 0,
				title: {
					rendered: "Loading"
				},
				content: {
					rendered: ''
				}
			}
		};
	},
	componentDidMount: function() {
		this.loadCommentsFromServer();
	},
	render: function() {
		var thumbnailHtml = '';
		if ( 0 !== this.state.data.featured_image ) {
			thumbnailHtml = <Thumbnail postData={this.state.data}/>;
		}
		var commentHtml = '';
		if ( 'closed' !== this.state.data.comment_status ) {
			var commentApi = this.props.routeApi + 'comments?post=' + this.props.pageId;
			commentHtml = <PostComment commentApi={commentApi} pollInterval={10000}/>;
		}
		return (
			<div className="panel panel-default">
				<h2 className="panel-heading">{this.state.data.title.rendered}</h2>
				{thumbnailHtml}
				<div dangerouslySetInnerHTML={{__html: this.state.data.content.rendered}} />
				{commentHtml}
			</div>
		);
	}
});

module.exports = SingleBox;
