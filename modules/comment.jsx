var React = require('react');
var ReactDOM = require('react-dom');

var CommentList = require('../modules/commentList.jsx');
var CommentForm = React.createClass({
	handleSubmit: function(e) {
		e.preventDefault();
		var author = ReactDOM.findDOMNode(this.refs.author_name).value.trim();
		var text = ReactDOM.findDOMNode(this.refs.content).value.trim();
		var id = ReactDOM.findDOMNode(this.refs.id).value.trim();
		if (!text || !author || !id) {
			return;
		}
		this.props.onCommentSubmit({author_name: author, content: text,post: id});
		ReactDOM.findDOMNode(this.refs.author_name).value = '';
		ReactDOM.findDOMNode(this.refs.content).value = '';
		ReactDOM.findDOMNode(this.refs.id).value = '';
		return;
	},
	render: function() {
		return (
			<form className="commentForm panel-body" onSubmit={this.handleSubmit}>
				<label htmlFor="comment_author_name">Name</label>
				<div className="input-group">
					<input id="comment_author_name" className="form-control" type="text" placeholder="Your name" ref="author_name"/>
				</div>
				<label htmlFor="comment_post_id">Post ID</label>
				<div className="input-group">
					<input id="comment_post_id" className="form-control" type="text" placeholder="postid" name="post" ref="id" />
				</div>
				<label htmlFor="comment_content">Comment</label>
				<div className="input-group">
					<textarea id="comment_content" className="form-control" type="text" placeholder="Say something..." ref="content"/>
				</div>
				<div>
					<input className="btn btn-default" type="submit" value="Post" />
				</div>
			</form>
		);
	}
});

var CommentBox = React.createClass({
	loadCommentsFromServer: function() {
		$.ajax({
			url: this.props.url,
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
	handleCommentSubmit: function(comment) {
		var comments = this.state.data;
		var newComments = comments.concat([comment]);
		$.ajax({
			url: this.props.url,
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
		this.loadCommentsFromServer();
		setInterval(this.loadCommentsFromServer, this.props.pollInterval);
	},
	render: function() {
		return (
			<div className="commentBox panel panel-default">
				<h2 className="panel-heading">Recent Comments</h2>
				<CommentList data={this.state.data} />
				<h2 className="panel-heading">Post Comments</h2>
				<CommentForm onCommentSubmit={this.handleCommentSubmit} />
			</div>
		);
	}
});
module.exports = CommentBox;
