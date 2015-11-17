<?php /* Template Name: 取得列表 */ 

    $wp_error;
    $cfs = CFS();
    $obj = array();
    $list = array();
    $id = get_the_ID(false);
    $args = array(
      'post_type' => 'works',
      'orderby' => 'date',
      'order'   => 'DESC',
      'posts_per_page' => 8,
      'paged' => $_GET['page']
    );
    $wp_query = new WP_Query( $args ); 
    if (have_posts()): while (have_posts()) : the_post();
      // $work = $cfs->get('works')
      $attachment_id = get_post_meta($id, 'gif', true);

      array_push($list, array(
          'url' => $cfs->get('gif'),
          'seq' => $id,
          'thumbUrl' => wp_get_attachment_thumb_url( $attachment_id ),
          'name' => $cfs->get('name')
        )
      );
    endwhile;
    endif;
    $obj['status'] = 1;
    $obj['list'] = $list;
    $obj['msg'] = '正常';
    header('Content-Type: application/json');
    echo json_encode($obj);

?>
