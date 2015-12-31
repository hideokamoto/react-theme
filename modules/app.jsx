// Load Reacts
var React = require('react');
var ReactDOM = require('react-dom');

// Init API URL
var apiUrl = document.getElementById('content').dataset.siteUrl + '/wp-json/wp/v2/';

// Load components
var CommentBox = require('../modules/comment.jsx');
var Posts = require('../modules/post.jsx');

// Class
var Article = React.createClass({
	render: function() {
		var postApiUrl = this.props.apiUrl + 'posts';
		return (
			<div className="commentBox panel panel-default">
				<Posts url={postApiUrl} />
			</div>
		);
	}
});

var Comments = React.createClass({
	render: function() {
		var commentApiUrl = this.props.apiUrl + 'comments';
		return (
			<div className="commentBox panel panel-default">
				<CommentBox url={commentApiUrl} pollInterval={60000}/>
			</div>
		);
	}
});

// Render
ReactDOM.render(
	<Article apiUrl={apiUrl}/>,
	document.getElementById('content')
);

ReactDOM.render(
	<Comments apiUrl={apiUrl}/>,
	document.getElementById('comment')
);
