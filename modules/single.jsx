// Load Reacts
var React = require('react');
var ReactDOM = require('react-dom');

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
		return (
			<div className="panel panel-default">
				<h2 className="panel-heading">{this.state.data.title.rendered}</h2>
				{thumbnailHtml}
				<div dangerouslySetInnerHTML={{__html: this.state.data.content.rendered}} />
			</div>
		);
	}
});

module.exports = SingleBox;
