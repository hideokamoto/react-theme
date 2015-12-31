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
			<?php wp_nav_menu( array(
				'menu' => 'global_menu',
				'container' => 'div',
				'container_class' => 'navbar navbar-inverse',
				'container_id' => 'global-menu',
				'menu_class' => 'nav navbar-nav',
				)
			); ?>
		</header>
		<?php
			$page_id = '';
			if ( is_single() ) {
				$page_type = "post";
				$page_id = get_the_Id();
			} elseif ( is_archive() ) {
				$page_type = "archive";
			} elseif ( is_home() ) {
				$page_type = "home";
			} else {
				$page_type = "other";
			}
		?>
		<div id="container" class="container">
			<div class="row">
				<div id="content" <?php post_class('col-sm-8') ;?>
					data-site-url="<?php echo esc_url( home_url() ) ;?>"
					data-page-type="<?php echo $page_type ;?>"
					data-page-id=<?php echo $page_id ;?> ></div>
				<div id="comment" data-site-url="<?php echo esc_url( home_url() ) ;?>" class="col-sm-4"></div>
			</div>
		</div>
		<?php wp_footer();?>
	</body>
</html>
