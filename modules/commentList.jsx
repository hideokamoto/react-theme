var React = require('react');
var ReactDOM = require('react-dom');

var Comment = React.createClass({
	render: function() {
		return (
			<li className="comment list-group-item">
				<div className="panel-headin">
					<h3 className="commentAuthor panel-titl">
						{this.props.author}
					</h3>
				</div>
				<div className="panel-bod">
					{this.props.children}
				</div>
			</li>
		);
	}
});

var CommentList = React.createClass({
	render: function() {
		var commentNodes = this.props.data.map(function (comment) {
			return (
				<Comment author={comment.author_name} key={comment.id}>
					<div dangerouslySetInnerHTML={{__html: comment.content.rendered}} />
				</Comment>
			);
		});
		return (
			<ul className="commentList list-group">
				{commentNodes}
			</ul>
		);
	}
});
module.exports = CommentList;
