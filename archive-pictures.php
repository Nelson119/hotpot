<?php if (have_posts()): while (have_posts()) : the_post(); ?>

	<?php 
		print_r($the_title);


		
// function png2gif($pngs, $background = array(255, 255, 255), $dest = 'gif'){
//     // by WebReflection
//     foreach($pngs as $png){
//         $size = getimagesize($png);
//         $img = imagecreatefrompng($png);
//         $image = imagecreatetruecolor($width = $size[0], $height = $size[1]);
//         imagefill($image, 0, 0, $bgcolor = imagecolorallocate($image, $background[0], $background[1], $background[2]));
//         imagecopyresampled($image, $img, 0, 0, 0, 0, $width, $height, $width, $height);
//         imagecolortransparent($image, $bgcolor);
//         imagegif($image, str_ireplace('.png', '.gif', $dest.DIRECTORY_SEPARATOR.basename($png)), 100);
//         imagedestroy($image);
//     }
// }

// // example
// png2gif(glob("icons/*.png"));
		?>

<?php endwhile; ?>
<?php else: ?>



<?php endif; ?>