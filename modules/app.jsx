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
	getInitialState: function() {
		return {data: []};
	},
	render: function() {
		var postApiUrl = this.props.apiUrl + 'posts';
		var commentApiUrl = this.props.apiUrl + 'comments';
		return (
			<div className="commentBox panel panel-default">
				<Posts url={postApiUrl} />
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
