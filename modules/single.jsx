// Load Reacts
var React = require('react');
var ReactDOM = require('react-dom');

var CommentBox = require('../modules/comment.jsx');


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
		if ( 'closed' !== this.state.data.comment_status && this.state.data.comment_status ) {
			var commentApi = this.props.routeApi + 'comments?post=' + this.props.pageId;
			commentHtml = <CommentBox url={commentApi} pollInterval={60000} pageId={this.props.pageId}/>;
		}
		return (
			<div className="singleBox panel panel-default">
				<h2 className="panel-heading" dangerouslySetInnerHTML={{__html:this.state.data.title.rendered}} />
				{thumbnailHtml}
				<div dangerouslySetInnerHTML={{__html: this.state.data.content.rendered}} />
				{commentHtml}
			</div>
		);
	}
});

module.exports = SingleBox;
