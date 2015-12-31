var React = require('react');
var ReactDOM = require('react-dom');

var CommentList = require('../modules/commentList.jsx');

var AllCommentBox = React.createClass({
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
				<h3 className="panel-heading">Recent Comments</h3>
				<CommentList data={this.state.data} />
			</div>
		);
	}
});
module.exports = AllCommentBox;
