<?php if (have_posts()): while (have_posts()) : the_post(); ?>

	<?php 
		print_r($the_title);
		?>

<?php endwhile; ?>
<?php else: ?>



<?php endif; ?>