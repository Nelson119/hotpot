<?php get_header(); ?>

    <main role="main">
      <?php 
        // the query
        $args = array(

          'page_id' => 207
        );
        $wp_query = new WP_Query( $args ); 
        if (have_posts()): while (have_posts()) : the_post(); ?>
      <article class="page marketing" id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
        <aside class="center">
          <h3 class="banner"><img src="<?php echo CFS()->get('banner'); ?>" alt="<?php echo CFS()->get('alt'); ?>"></h3>
          <?php the_content(); ?>
          <nav class="categories">
          <?php $term = $wp_query->queried_object;?>
            <ul>
              <li class="active">
                <a href="/?p=207">所有活動</a>
              </li>
            <?php
            foreach (get_terms('marketing', array('parent' => 43 )) as $tax_term) {
                if($term->name === $tax_term->name){
                    $active = ' class="active"';
                }else{
                    $active = '';
                }
            echo '<li'. $active .'>' . '<a href="' . esc_attr(get_term_link($tax_term, 'marketing')) . '" title="' . sprintf( __( "View all posts in %s" ), $tax_term->name ) . '" ' . '>' . $tax_term->name.'</a></li>';
            }
            ?>
            </ul>
            <i class="fa fa-caret-down"></i>
          </nav>
          <div class="clearfix"></div>
        </aside>
      <?php endwhile; ?>
      <?php endif; ?>
        <aside class="fit">
            <ul class="activities-list">
              <?php 
              // the query

              $cat_id = get_cat_ID($term->name);
              $args = array(
                'post_type' => 'marketings',
                'cat' => $cat_id,
                'orderby' => 'date',
                'order'   => 'ASC',
                'posts_per_page' => 15,
                'paged' => $page
              );
              $wp_query = new WP_Query( $args ); 
              while ($wp_query->have_posts()) : $wp_query->the_post();  ?>
              <li>
                <a href="javascript:" title="<?php echo CFS()->get('marketing'); ?>">
                  <img src="<?php echo CFS()->get('thumb'); ?>">
                  <h4 ><span><?php echo CFS()->get('title'); ?><b><?php echo CFS()->get('date'); ?></b></span></h4>
                  <ul class="hide"><?php
                    $pictures = CFS()->get('pictures');
                    if(count($pictures)) {

                      foreach ($pictures as $picture) {
                        echo '<li data-src="' . $picture['image_source'] . '" data-description="' . $picture['description'] . '" data-date="' . $picture['date'] .'"></li>';

                      }

                    }
                  ?></ul>
                </a>
              </li>
              <?php endwhile; ?>
            </ul>
        </aside>
        <?php get_template_part('loop'); ?>
        <?php get_template_part('pagination'); ?>
        </article>
    </main>

<?php get_sidebar(); ?>

<?php get_footer(); ?>
