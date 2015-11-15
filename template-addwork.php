<?php /* Template Name: 產生動圖 */ 

    require_once( ABSPATH . 'wp-admin/includes/image.php' );
    require_once( ABSPATH . 'wp-admin/includes/file.php' );
    require_once( ABSPATH . 'wp-admin/includes/media.php' );
    require_once( ABSPATH . 'wp-content/themes/18design-theme/PHPImageWorkshop/GifCreator.php' );
    require_once( ABSPATH . 'wp-content/themes/18design-theme/PHPImageWorkshop/ImageWorkshop.php' );
    require_once( ABSPATH . 'wp-content/themes/18design-theme/PHPImageWorkshop/Core/ImageWorkshopLayer.php' );
    require_once( ABSPATH . 'wp-content/themes/18design-theme/PHPImageWorkshop/Core/ImageWorkshopLib.php' );
    require_once( ABSPATH . 'wp-content/themes/18design-theme/PHPImageWorkshop/Exception/ImageWorkshopBaseException.php' );
    require_once( ABSPATH . 'wp-content/themes/18design-theme/PHPImageWorkshop/Exception/ImageWorkshopException.php' );
    require_once( ABSPATH . 'wp-content/themes/18design-theme/PHPImageWorkshop/Core/Exception/ImageWorkshopLayerException.php' );
    require_once( ABSPATH . 'wp-content/themes/18design-theme/PHPImageWorkshop/Core/Exception/ImageWorkshopLibException.php' );
    use PHPImageWorkshop\ImageWorkshop;

    $wp_error;
    $cfs = CFS();

    // Check that the nonce is valid, and the user can edit this post.
    if ( 
      isset( $_POST['FBID'] ) &&
      isset( $_POST['username'] ) &&
      isset( $_POST['email'] ) &&
      isset( $_POST['imgUrl'] ) &&
      isset( $_POST['bg_x'] ) &&
      isset( $_POST['bg_y'] ) &&
      isset( $_POST['obj_x'] ) &&
      isset( $_POST['obj_y'] ) &&
      isset( $_POST['obj_w'] ) &&
      isset( $_POST['obj_h'] ) &&
      isset( $_POST['ticket'] ) 
    ) {
      // The nonce was valid and the user has the capabilities, it is safe to continue.

      // These files need to be included as dependencies when on the front end.

      

      // Let WordPress handle the upload.
      // Remember, 'my_image_upload' is the name of our file input in our form above.


      $fbid = $_POST['FBID'];
      $email = $_POST['email'] ;
      $name = $_POST['username'] ;
      $imgUrl = $_POST['imgUrl'];
      $positions = array(
        pot => array(
          x => $_POST['obj_x'],
          y => $_POST['obj_y'],
          w => $_POST['obj_w'],
          h => $_POST['obj_h']
        ),
        bg => array(
          x => $_POST['bg_x'],
          y => $_POST['bg_y']
        )
      );



      if ( ! is_wp_error( $img ) ) {

        $path = ABSPATH.str_replace(home_url(), '', $imgUrl);
    
        $pngs = ABSPATH.str_replace(home_url().'/', '', 
          get_template_directory_uri()."/img/smoke/SmokeLoop*.png");

        $dest = ABSPATH.str_replace(home_url().'/', '', 
          get_template_directory_uri()."/img/");


        $work_id = wp_insert_post(array(
          'post_title'=>$name . '的 火鍋圖', 
          'post_type'=>'works', 
          'post_status'=>'publish',
          'post_content'=>'')
          , $wp_error 
        );

        $gif_file = png2gif( $path,glob($pngs), null, $dest);

        $filename = preg_replace('/\.png|\.jpg|\.gif|\.jpeg/', '.gif', $path);

        // Check the type of file. We'll use this as the 'post_mime_type'.
        $filetype = wp_check_filetype( basename( $filename ), null );

        // Get the path to the upload directory.
        $wp_upload_dir = wp_upload_dir();

        $attachment = array(
          'guid'           => $wp_upload_dir['url'] . '/' . basename( $filename ), 
          'post_mime_type' => $filetype['type'],
          'post_title'     => preg_replace( '/\.[^.]+$/', '', basename( $filename ) ),
          'post_content'   => gif_file,
          'post_status'    => 'inherit'
        );

        $gif_attachment_id = wp_insert_attachment( $attachment, $filename, $work_id );
        $gif_meta = wp_generate_attachment_metadata( $gif_attachment_id, $filename );
        wp_update_attachment_metadata( $gif_attachment_id, $gif_meta );
        add_post_meta($work_id, 'image', $gif_attachment_id, true);


        $result = $cfs->save(
          array(
            'fbid' => $fbid,
            'name' => $name,
            'email' => $email,
            'gif' => $gif_attachment_id
          ),
          array( 'ID' => $work_id )
        );
        $imgUrl = $wp_upload_dir['url'] . '/' . basename( $filename );
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

    $obj = array('status' => $status, 'imgUrl' => $imgUrl, 'msg' => $wp_error);

    header('Content-Type: application/json');
    echo json_encode($obj);
    
function png2gif($uploaded,$pngs, $background = array(255, 255, 255), $dest = 'gif'){

      $gifPath = dest; // Your animated GIF path
      $frames = array();
      // array_push ( $frames, $uploaded);
        // // We want a height of 315px for the group
        // We initialize group
      $layer1 = ImageWorkshop::initFromPath($uploaded);
      if($layer1->getWidth() >= $layer1->getHeight()){
        $layer1->crop($layer1,$layer1->getHeight(),$layer1->getHeight(),0,0);
      }else{
        $layer1->crop($layer1,$layer1->getWidth(),$layer1->getWidth(),0,0);
      }
      foreach ($pngs as $png) {

        // #1: We create our document, which have the troll picture on its background
        $document = ImageWorkshop::initVirginLayer(600, 600); 

        // #2: open the image as layers

        $layer2 = ImageWorkshop::initFromPath($png);

        $layer2->resizeInPixel($positions->pot->w, $positions->pot->h, true);

        // // We add the group at the left top of our card
        $document->addLayer(1, $layer1, 0,0,'LT');
        // // We add the group at the left top of our card
        $document->addLayer(2, $layer2,$positions->pot->x,$positions->pot->y,'LT');
         
        $image = $document->getResult("ffffff");

        imagepng($image,str_replace('/smoke', '', $png),9);

        array_push ( $frames, str_replace('/smoke', '', $png));
      }
      // print_r( $frames );
      $durations = array(15, 15, 15, 15);

      // Initialize and create the GIF !
      $gc = new GifCreator();
      $gc->create($frames, $durations, 0);
      // header('Content-type: image/gif');
      // header('Content-Disposition: filename="smoke.gif"');
      $gifBinary = $gc->getGif();
      // echo $gifBinary;
      $fileSaved = preg_replace('/\.png|\.jpg|\.gif|\.jpeg/', '.gif', $uploaded);
      file_put_contents($fileSaved, $gifBinary);
      return $gifBinary;
  
}



?>
