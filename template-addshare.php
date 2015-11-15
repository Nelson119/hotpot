<?php /* Template Name: 新增投票 */ 

    $wp_error;
    $cfs = CFS();

    // Check that the nonce is valid, and the user can edit this post.
    if ( 
      isset( $_POST['FBID'] ) &&
      isset( $_POST['seq'] ) &&
      isset( $_POST['ticket'] ) 
    ) {
      if (have_posts()): while (have_posts()) : the_post();
        $fbid = $_POST['FBID'];
        $seq = $_POST['seq'];
        $share = $cfs->get('shares', 399, array('format'=>'api'));
        // if($share == ''){
        //   $share = array();
        // }
        // array_push($share, array(
        //     'fbid' => $fbid,
        //   )
        // );
        // $result = $cfs->save(
        //   array('share' => $share),
        //   array('ID' => $seq)
        // );
        print_r($share);
        print_r($share);
        print_r($share);
      endwhile;
      endif;
    }

?>
