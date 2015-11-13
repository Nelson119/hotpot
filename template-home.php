<?php /* Template Name: 首頁 */ get_header(); ?>


  <section class="highlight">

    <ul>
      <?php 
        $active = true;
        $class = ' class="active"';
        foreach (CFS()->get('highlight') as $highlight) {
            if(!$active){
              $class = '';
            }
            echo '<li'.$class.'><a href="'.$highlight['link'].'" title="'.$highlight['title'].'"><img alt="'.$highlight['title'].'"src="'.$highlight['image_source'].'"></a></li>';
            $active = false;
        } 
      ?>
    </ul>

    <nav>
      <ul>
      </ul>
      <a class="prev" href="javascript:"><img src="<?php echo get_template_directory_uri(); ?>/images/highlight/next.png"></a>
      <a class="next" href="javascript:"><img src="<?php echo get_template_directory_uri(); ?>/images/highlight/next.png"></a>
    </nav>

  </section>

  <section class="marquee">
    <aside class="w150">
      <i class="icon-megaphone"></i>
      NEWS
      <i class="fa fa-caret-right"></i>
    </aside>
    <aside class="mq">
      <ul>
        <?php 
          foreach (CFS()->get('marquee') as $marquee) {
              echo '<li><a target="_blank" href="'.$marquee['link'].'" title="'.$marquee['text'].'">'.$marquee['text'].'</a></li>';
          } 
        ?>
      </ul>
    </aside>
  </section>

  <section class="service">
    <ul>
      <li>
        <figure><img src="<?php echo get_template_directory_uri(); ?>/images/service/marketing.png"/></figure>
        <figure class="background"></figure>
        <aside>
          <h3 class="title">整合行銷<span>MARKETING</span></h3>
          <p>活動規劃、行銷推廣、媒體整合</p>
          <a href="/整合行銷">服務項目</a>
        </aside>
      </li>
      <li>
        <figure><img src="<?php echo get_template_directory_uri(); ?>/images/service/management.png"/></figure>
        <figure class="background"></figure>
        <aside>
          <h3 class="title">管理顧問<span>MANAGEMENT</span></h3>
          <p>全省會議場地導覽</p>
          <a href="/管理顧問">服務項目</a>
        </aside>
      </li>
    </ul>
    <div class="clearfix"></div>
  </section>

  <section class="news">
    <h3 class="cwTeXHei">活動快訊 <span>/&nbsp;NEWS</span></h3>
    <ul>
      <?php 
      // the query
      $args = array(
        'posts_per_page' => 5,
        'paged' => 1,
        'order'   => 'DESC'
      );
      $wp_query = new WP_Query( $args ); ?>

      <?php if ($wp_query->have_posts()): while ($wp_query->have_posts()) : $wp_query->the_post(); ?>
      <li>
        <span class="date"><?php the_time('Y.m.d'); ?></span>
        <span class="category" style="background:<?php echo get_term_by('id', the_category_id(false), 'category')->description;?>"><?php _e( '', 'html5blank' ); the_category(', '); ?></span>
        <a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>" class="subj"><?php the_title(); ?></a>
        <a class="more" href="<?php the_permalink(); ?>"><i class="icon-right-open-mini"></i><span>more</span></a>
      </li>
      <?php endwhile; ?>
      <?php else: ?>
      <li>
        <h4><?php _e( 'Sorry, nothing to display.', 'html5blank' ); ?></h4>
      </li>
      <?php endif; ?>
      <?php wp_reset_query(); ?>
    </ul>
    <a href="javascript:" class="btn btn-default cwTeXHei">快訊一覽</a>
  </section>

  <hr>

  <section class="clients">
    <h3 class="cwTeXHei title">衷心感謝<span> / CLIENTS</span></h3>
    <ul class="clients">
      <?php 
          // the query
          $args = array(
            
            'page_id' => 60
          );
          $wp_query = new WP_Query( $args );
          if ($wp_query->have_posts()){
            $wp_query->the_post(); 
            $raw = CFS()->get('client');
            $pageIndex = 1;
            $offset = 0;
            $take = 8;

            $pageCount = ceil(count($raw) / $take);

            $clients = array_slice ( $raw , $offset , $take);

            foreach ($clients as $client) {
                echo '<li><img src="'.$client['image'].'"></li>';
            } 
          } 
      ?>
      <?php wp_reset_query(); ?>
    </ul>
    <div class="clearfix"></div>
  </section>

<?php get_sidebar(); ?>

<?php get_footer(); ?>
