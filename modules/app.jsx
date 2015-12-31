// Load Reacts
var React = require('react');
var ReactDOM = require('react-dom');

// Init API URL
var apiUrl = document.getElementById('content').dataset.siteUrl + '/wp-json/wp/v2/';

// Load components
var CommentBox = require('../modules/comment.jsx');
var AllCommentBox = require('../modules/commentAll.jsx');
var SingleBox = require('../modules/single.jsx');
var Posts = require('../modules/post.jsx');

// Class
var Article = React.createClass({
	render: function() {
		var postApiUrl = this.props.apiUrl + 'posts';
		return (
			<Posts url={postApiUrl} />
		);
	}
});

var Comments = React.createClass({
	render: function() {
		var commentApiUrl = this.props.apiUrl + 'comments';
		return (
			<div className="commentBox panel panel-default">
				<AllCommentBox url={commentApiUrl} pollInterval={60000}/>
			</div>
		);
	}
});

var Single = React.createClass({
	render: function() {
		var postApiUrl = this.props.apiUrl;
		if ( 'post' === this.props.pageType ) {
			postApiUrl += 'posts/' + this.props.pageId;
		} else if ( 'page' === this.props.pageType ) {
			postApiUrl += 'pages/' + this.props.pageId;
		}
		return (
			<SingleBox url={postApiUrl} routeApi={this.props.apiUrl} pageId={this.props.pageId}/>
		);
	}
});

// Render
var pageType = document.getElementById('content').dataset.pageType;
if ('home' === pageType || 'archive' === pageType) {
	ReactDOM.render(
		<Article apiUrl={apiUrl}/>,
		document.getElementById('content')
	);
} else if ( 'post' === pageType  || 'page' === pageType) {
	var id = document.getElementById('content').dataset.pageId;
	ReactDOM.render(
		<Single apiUrl={apiUrl} pageType={pageType} pageId={id} />,
		document.getElementById('content')
	);
}

ReactDOM.render(
	<Comments apiUrl={apiUrl}/>,
	document.getElementById('comment')
);
