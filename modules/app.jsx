// Load Reacts
var React = require('react');
var ReactDOM = require('react-dom');

// Init API URL
var apiUrl = document.getElementById('content').dataset.siteUrl + '/wp-json/wp/v2/';
var commentApiUrl = apiUrl + 'comments';

// Load components
var CommentBox = require('../modules/comment.jsx');

// Render
ReactDOM.render(
  <CommentBox url={commentApiUrl} pollInterval={60000}/>,
  document.getElementById('content')
);
