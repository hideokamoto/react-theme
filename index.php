<!DOCTYPE html>
<html <?php language_attributes();?> >
	<head>
		<meta charset="<?php bloginfo( 'charset' ); ?>">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
		<?php wp_head();?>
	</head>
	<body <?php body_class() ;?> >
		<header>
			<h1 class="site-title">
				<a href="<?php echo esc_url( home_url() ) ;?>">
					<?php bloginfo( 'name' ); ?>
				</a>
			</h1>
		</header>
		<div id="content" data-site-url="<?php echo esc_url( home_url() ) ;?>" <?php post_class() ;?>></div>
		<div id="comment" data-site-url="<?php echo esc_url( home_url() ) ;?>"></div>
		<?php wp_footer();?>
	</body>
</html>
