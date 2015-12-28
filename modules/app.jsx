// React をロード
var React = require('react');
var ReactDOM = require('react-dom');

var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        {this.props.children}
      </div>
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
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

var CommentForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var author = ReactDOM.findDOMNode(this.refs.author_name).value.trim();
    var text = ReactDOM.findDOMNode(this.refs.content).value.trim();
    var id = ReactDOM.findDOMNode(this.refs.id).value.trim();
    if (!text || !author || !id) {
      return;
    }
    this.props.onCommentSubmit({author_name: author, content: text,post: id});
    ReactDOM.findDOMNode(this.refs.author_name).value = '';
    ReactDOM.findDOMNode(this.refs.content).value = '';
    ReactDOM.findDOMNode(this.refs.id).value = '';
    return;
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your name" ref="author_name"/>
        <input type="text" placeholder="Say something..." ref="content"/>
		<input type="text" placeholder="postid" name="post" ref="id" />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

var CommentBox = React.createClass({
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
  handleCommentSubmit: function(comment) {
    var comments = this.state.data;
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
	  	this.setState({data: comments});
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
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
        <CommentList data={this.state.data} />
      </div>
    );
  }
});

ReactDOM.render(
  <CommentBox url="http://rest-api.dev/wp-json/wp/v2/comments" pollInterval={60000}/>,
  document.getElementById('content')
);
