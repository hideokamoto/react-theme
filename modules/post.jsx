// Load Reacts
var React = require('react');
var ReactDOM = require('react-dom');

var PostList = React.createClass({
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

			</div>
		);
	}
});
module.exports = PostList;
