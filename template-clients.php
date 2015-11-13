<?php /* Template Name: 衷心感謝 */ get_header(); ?>

	<main role="main">

      <article class="page clients">
        <aside class="center">
          <?php if (have_posts()): while (have_posts()) : the_post(); ?>
          <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
            <aside class="center">
              <h3 class="banner"><img src="<?php echo CFS()->get('banner'); ?>" alt="<?php echo CFS()->get('alt'); ?>"></h3>
              <?php the_content(); ?>
            </aside>
            <?php comments_template( '', true );?>
          </article>
          <?php endwhile; ?>
          <?php else: ?>
          <article>
            <h2><?php _e( 'Sorry, nothing to display.', 'html5blank' ); ?></h2>
          </article>
          <?php endif; ?>
          <ul class="list">
            <?php 
                $raw = CFS()->get('client');
                $paged = (get_query_var('page') !== 0) ? get_query_var('page') : 1;
                $pageIndex = $paged - 1;
                $offset = $pageIndex * 15;
                $take = 15;
                $pageCount = ceil(count($raw) / $take);

                $clients = array_slice ( $raw , $offset , $take);

                foreach ($clients as $client) {
                    echo '<li><img src="'.$client['image'].'"></li>';
                } 
            ?>
          </ul>
          <nav class="pager">
            <ul>
            <?php 
              $pages = paginate_links( array(
                    'base'      => @add_query_arg('page','%#%'),
                    'format'    => '?page=%#%',
                    'current'   => $paged,
                    'total'     => $pageCount,
                    'type'      => 'array',
                    'prev_next' => TRUE,
                    'prev_text' => __('PREV&lt;'),
                    'next_text' => __('&gt;NEXT'),
                ) );
                if( is_array( $pages ) ) {
                    $i = 0;
                    foreach ( $pages as $page ) {
                      $active = '';
                      if($i == $paged){
                        $active = ' class="active"';
                      }
                      echo "<li".$active.">$page</li>";
                      $i++;
                    }
                }
            ?>
            </ul>
          </nav>
        </aside>

      </article>

	</main>

<?php get_sidebar(); ?>

<?php get_footer(); ?>
