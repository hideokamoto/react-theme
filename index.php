<!DOCTYPE html>
<html <?php language_attributes();?> >
	<head>
		<meta charset="<?php bloginfo( 'charset' ); ?>">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
		<?php wp_head();?>
	</head>
	<body <?php body_class() ;?> >
		<div id="content"></div>
		<script type="text/babel">
			var CommentBox = React.createClass({
			  render: function() {
			    return (
			      <div className="commentBox">
			        Hello, world! I am a CommentBox.
			      </div>
			    );
			  }
			});
			ReactDOM.render(
			  <CommentBox />,
			  document.getElementById('content')
			);
		</script>
	</body>
</html>
