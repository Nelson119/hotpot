<?php /* Template Name: 活動快訊 */ get_header(); ?>

    <?php the_title(); ?>
    	<?php connectionsMenu(); ?>
	<?php if (have_posts()): while (have_posts()) : the_post(); ?>
	 	<?php the_content(); ?>
	<?php endwhile; ?>
	<?php endif; ?>
<?php get_footer(); ?>