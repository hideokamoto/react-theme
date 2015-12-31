<!DOCTYPE html>
<html <?php language_attributes();?> >
	<head>
		<meta charset="<?php bloginfo( 'charset' ); ?>">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
		<?php wp_head();?>
	</head>
	<body <?php body_class() ;?> >
		<div id="content" data-site-url="<?php echo esc_url( home_url() ) ;?>"></div>
		<div id="comment" data-site-url="<?php echo esc_url( home_url() ) ;?>"></div>
		<?php wp_footer();?>
	</body>
</html>
