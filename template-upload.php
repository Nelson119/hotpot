<?php /* Template Name: 上傳圖檔 */ 

    require_once( ABSPATH . 'wp-admin/includes/image.php' );
    require_once( ABSPATH . 'wp-admin/includes/file.php' );
    require_once( ABSPATH . 'wp-admin/includes/media.php' );

    function image_crop_dimensions($default, $orig_w, $orig_h, $new_w, $new_h, $crop){
        if ( !$crop ) return null; // let the wordpress default function handle this

        $aspect_ratio = $orig_w / $orig_h;
        $size_ratio = max($new_w / $orig_w, $new_h / $orig_h);

        $crop_w = round($new_w / $size_ratio);
        $crop_h = round($new_h / $size_ratio);

        $s_x = floor( ($orig_w - $crop_w) / 2 );
        $s_y = floor( ($orig_h - $crop_h) / 2 );
        return array( 0, 0, (int) $s_x, (int) $s_y, (int) $new_w, (int) $new_h, (int) $crop_w, (int) $crop_h );
    }
    add_filter('image_resize_dimensions', 'image_crop_dimensions', 10, 6);
    error_reporting(E_ERROR | E_PARSE);
    $wp_error;
    $imgUrl;
    $cfs = CFS();


    // Check that the nonce is valid, and the user can edit this post.
    if ( 
      isset( $_FILES['imgFile'] ) &&
      isset( $_POST['FBID'] ) &&
      isset( $_POST['ticket'] ) 
    ) {
      // The nonce was valid and the user has the capabilities, it is safe to continue.

      // These files need to be included as dependencies when on the front end.

      

      // Let WordPress handle the upload.
      // Remember, 'my_image_upload' is the name of our file input in our form above.



      if ( ! is_wp_error( $img ) ) {
        // echo $gif_file;
        $picture_id = wp_insert_post(array(
          'post_title'=>$_POST['FBID'] . ' 的原始圖', 
          'post_type'=>'pictures', 
          'post_status'=>'publish',
          'post_content'=>'')
          , $wp_error 
        );
        $fbid = $_POST['FBID'];

        $attachment_id = media_handle_upload('imgFile', $picture_id);
        // // Get the path to the upload directory.
        $wp_upload_dir = wp_upload_dir();
        
        $cropped_image = image_resize(get_attached_file($attachment_id), 462, 462, true);
        // echo pathinfo(basename($cropped_image))['extension'];
        $result = $cfs->save(
          array('fbid' => $fbid,'image' => $attachment_id),
          array( 'ID' => $picture_id )
        );
        // $imgUrl = wp_get_attachment_url( $attachment_id );
        $imgUrl = str_replace(
          basename(get_attached_file( $attachment_id )), 
          basename($cropped_image),
          wp_get_attachment_url($attachment_id)); 
        // echo $result;
        $wp_error = '上傳成功';

      }


      if ( is_wp_error( $attachment_id ) ) {
        // There was an error uploading the image.
        $wp_error = '新增資料失敗:' . $wp_error;
        $status = 0;
      } else {
        // The image was uploaded successfully!

        // echo $picture_id;

        $status = 1;
      }

    } else {
      $wp_error = '輸入欄位不正確';
      $status = 0;
      // The security check failed, maybe show the user an error.
    }

    $obj = array('status' => $status, 'imgUrl' => $imgUrl, 'msg' => $wp_error, 'aid' => $attachment_id);

    header('Content-Type: application/json');
    echo json_encode($obj);

?>
