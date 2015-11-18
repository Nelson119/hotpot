<?php /* Template Name: 新增投票 */ 

    $wp_error;
    $status = 0;
    $cfs = CFS();

    // Check that the nonce is valid, and the user can edit this post.
    if ( 
      isset( $_POST['FBID'] ) &&
      isset( $_POST['seq'] ) &&
      isset( $_POST['email'] ) &&
      isset( $_POST['username'] ) &&
      isset( $_POST['ticket'] ) 
    ) {
        $fbid = $_POST['FBID'];
        $work_id = $_POST['seq'];
        $name = $_POST['username'];
        $email = $_POST['email'];

        $wp_query = new WP_Query( array(
          'post_type' => 'shares',
          'meta_query' => 
            array(
              array(
                'key' => 'fbid',
                'value'   => $fbid
              ),
              array(
                'key' => 'target_work',
                'value'   => $work_id
              )
            )
          )
        );
        if (have_posts()){
          $status = 0;
          $wp_error = '已經分享過';
        }else{
          $share_id = wp_insert_post(array(
            'post_title'=>$fbid . '的 分享', 
            'post_type'=>'shares', 
            'post_status'=>'publish',
            'post_content'=>'')
            , $wp_error 
          );
          $result = $cfs->save(
            array(
              'fbid' => $fbid,
              'target_work' => $work_id,
              'name' => $name,
              'email' => $email
            ),
            array( 'ID' => $share_id )
          );
          $status = 1;
          $wp_error = '上傳成功';
          wp_reset_query();
          $wp_query = new WP_Query( array(
            'post_type' => 'shares',
            'meta_query' => 
              array(
                array(
                  'key' => 'target_work',
                  'value'   => $work_id
                )
              )
            )
          );
          $count = $wp_query->post_count;

          $result = $cfs->save(
            array(
              'share_count' => $count
            ),
            array( 'ID' => $work_id )
          );


        }




    }else{
      $wp_error = '輸入欄位不正確';
      $status = 0;
    }


    $obj = array('status' => $status, 'msg' => $wp_error);

    header('Content-Type: application/json');
    echo json_encode($obj);

?>
