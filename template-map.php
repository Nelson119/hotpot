<?php /* Template Name: 場地導覽 */ get_header(); ?>

	<main role="main">

      <article class="page map">
        <aside class="center">
          <h3 class="banner"><img src="<?php echo CFS()->get('banner'); ?>" alt="<?php echo CFS()->get('alt'); ?>"></h3>


          <figure id="map"></figure>

          <nav>
            <a href="javascript:" class="prev"></a>
            <aside>
              <ul>
                <?php 
                  $wp_query = new WP_Query( array( 
                    'post_type'  => 'map'
                    ) 
                  );
                  //Down goes the loop...
                  while ($wp_query->have_posts()) : $wp_query->the_post();  ?>
                <li data-image="<?php echo CFS()->get('thumb'); ?>" data-name="<?php echo CFS()->get('name'); ?>" data-address="<?php echo CFS()->get('address'); ?>">
                  <figure><img src=""></figure>
                  <h4 class="name"></h4>
                  <p class="address"></p>
                  <a class="more" href="javascript:">
                    <i class="icon-right-open-mini"></i>
                    <span>詳細資訊</span>
                  </a>
                  <a class="location" href="javascript:">
                    <i class="icon-right-open-mini"></i>
                    <span>詳細位置</span>
                  </a>
                  <aside class="hide">
                    <article class="box-content">
                      <figure class="picture-preview">
                        <?php
                          $pictures = CFS()->get('preview');
                          if(count($pictures)) { ?>
                        <figure class="picture" title="<?php echo $pictures[0]['description']; ?>"><img src="<?php echo $pictures[0]['image_source']; ?>"></figure>
                        <i><?php echo $pictures[0]['description']; ?></i>
                        <?php
                          }
                        ?>
                        <ul class="picture-collection">
                        <?php
                          if(count($pictures)) {

                            foreach ($pictures as $picture) {
                            ?>
                               <li class="active" title="<?php echo $picture['description']; ?>"><img src="<?php echo $picture['image_source']; ?>"></li>

                            <?php }

                          }
                        ?>
                        </ul>
                      </figure>
                      <section>
                        <aside>
                          <h4><?php echo CFS()->get('name'); ?></h4>
                          <span><?php echo CFS()->get('address'); ?></span>
                          <hr>
                          <p><?php echo CFS()->get('description'); ?></p>
                          <hr>
                          <?php echo CFS()->get('pricing'); ?>
                          <p></p>
                        </aside>
                      </section>
                    </article>
                  </aside>
                </li>
                <?php endwhile; ?>
              </ul>
              
            </aside>
            <a href="javascript:" class="next"></a>
          </nav>
        </aside>

        <div id="blueimp-gallery" class="blueimp-gallery blueimp-gallery-controls">
          <div class="slides">
            
          </div>
          <aside class="fit">
            <aside class="center">
              <h3 class="title"></h3>
              <a class="prev icon-left-open-big"></a>
              <a class="next icon-right-open-big"></a>
              <a class="close"><i class="icon-right-open-big"></i><i class="icon-left-open-big"></i></a>
              <ol class="indicator"></ol>
              
            </aside>
            
          </aside>
        </div>
      </article>
      <script type="text/javascript" src="https://maps.google.com/maps/api/js?sensor=false"></script>
      
      <script type="text/javascript" src="http://google-maps-utility-library-v3.googlecode.com/svn/tags/markerwithlabel/1.1.5/src/markerwithlabel_packed.js"></script>

	</main>

<?php get_sidebar(); ?>

<?php get_footer(); ?>
