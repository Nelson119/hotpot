<?php /* Template Name: 關於我們 */ get_header(); ?>

	<main role="main">
    <?php if (have_posts()): while (have_posts()) : the_post(); ?>
    <article class="page about" id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
      <aside class="center">
        <h3 class="banner"><img src="<?php echo CFS()->get('banner'); ?>" alt="<?php echo CFS()->get('alt'); ?>"></h3>
      </aside>
      <?php the_content(); ?>
      <?php comments_template( '', true );?>
    </article>
    <?php endwhile; ?>
    <?php else: ?>
    <article>
      <h2><?php _e( 'Sorry, nothing to display.', 'html5blank' ); ?></h2>
    </article>
    <?php endif; ?>
	</main>

<?php get_sidebar(); ?>

<?php get_footer(); ?>
