<!doctype html>
<html <?php language_attributes(); ?> itemscope="itemscope" itemtype="http://schema.org/WebPage">
	<head>
		<meta charset="UTF-8">
		<!-- 標題為頁面標題加網站標題 -->
		<title itemprop="name"><?php if(!is_home()){ echo the_title().' | '.get_bloginfo('title'); } else { echo get_bloginfo('title'); }?></title>
		<link href="//www.google-analytics.com" rel="dns-prefetch">
        <link href="<?php echo get_template_directory_uri(); ?>/img/icons/favicon.ico" rel="shortcut icon">
        <link href="<?php echo get_template_directory_uri(); ?>/img/icons/touch.png" rel="apple-touch-icon-precomposed">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<meta name='viewport' content='width=device-width, initial-scale=1.0'  />
		<meta name="description" content="<?php echo get_bloginfo('description'); ?>">
		<!-- 網頁關鍵字為文章的標籤 -->
		<meta name="keywords" content="<?php $posttags = get_the_tags();if ($posttags) {foreach($posttags as $tag) {echo $tag->name . ','; }}?>">
		<!--FACEBOOK OG TAG-->
		<meta property="fb:app_id" content="" />
		<meta property="og:title" content="<?php echo the_title();?>">
		<meta property="og:type" content="website">
		<meta property="og:url" content="<?php echo get_permalink();?>">
		<meta property="og:site_name" content="<?php echo home_url(); ?>">
		<meta property="og:description" content="<?php echo get_bloginfo('description'); ?>">
		<meta property="og:image" content="<?php ?>">
		<?php wp_head(); ?>
		<?php wp_deregister_script('jquery');wp_head(); ?>
	</head>
	<body <?php body_class(); ?>>
		<div class="wrapper">
			<header class="header clear" role="banner">
				<div class="logo">
					<a href="<?php echo home_url(); ?>">
						<img src="<?php echo get_template_directory_uri(); ?>/img/logo.svg" alt="Logo" class="logo-img">
					</a>
				</div>
				<nav class="nav" role="navigation">
					<?php html5blank_nav(); ?>
				</nav>
			</header>