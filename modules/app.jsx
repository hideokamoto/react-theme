// React をロード
var React = require('react');
var ReactDOM = require('react-dom');
var CommentBox = require('../modules/comment.jsx');

var apiUrl = document.getElementById('content').dataset.siteUrl + '/wp-json/wp/v2/comments';
ReactDOM.render(
  <CommentBox url={apiUrl} pollInterval={60000}/>,
  document.getElementById('content')
);
