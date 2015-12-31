<?php
function oribe_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'oribe_content_width', 640 );
}
add_action( 'after_setup_theme', 'oribe_content_width', 0 );


/**
 * Register Nav Menu
 */
 function oribe_register_nav_menu () {
	register_nav_menus( array(
		'global_menu' => 'Global Navigation',
	) );
	add_filter('nav_menu_css_class' , 'oribe_nav_class' , 10 , 2);
}
oribe_register_nav_menu ();

function oribe_nav_class($classes, $item){
	//$classes[] = "navbar navbar-inverse";
	return $classes;
}

/**
 * Enqueue scripts and styles.
 */
function oribe_scripts() {
	wp_enqueue_style( 'oribe-bootstrap', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css');
		wp_enqueue_style( 'oribe-style', get_stylesheet_uri() );
	wp_enqueue_script( 'oribe-react', 'https://cdnjs.cloudflare.com/ajax/libs/react/0.14.3/react.js', array(), '20151228' );
	wp_enqueue_script( 'oribe-react-dom', 'https://cdnjs.cloudflare.com/ajax/libs/react/0.14.3/react-dom.js', array(), '20151228' );
	wp_enqueue_script( 'oribe-react-browser', 'https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.23/browser.min.js', array(), '20151228' );
	wp_deregister_script('jquery');
	wp_enqueue_script( 'jquery', 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js', array(), '20151228' );
	wp_enqueue_script( 'oribe-scripts', get_template_directory_uri() .'/app.js' , array(), '20151228', true );
}
add_action( 'wp_enqueue_scripts', 'oribe_scripts' );
