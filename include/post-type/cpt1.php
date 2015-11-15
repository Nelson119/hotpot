<?php 
function create_post_type_picture()
{
    $labels = array(
        'name'              => _x( '圖片分類', 'taxonomy general name' ),
        'singular_name'     => _x( '圖片分類', 'taxonomy singular name' ),
        'search_items'      => __( '搜尋分類' ),
        'all_items'         => __( '所有' ),
        'parent_item'       => __( '選擇上層分類' ),
        'parent_item_colon' => __( '選擇上層分類:' ),
        'edit_item'         => __( '編輯上層分類' ), 
        'update_item'       => __( '更新上層分類' ),
        'add_new_item'      => __( '新增分類' ),
        'new_item_name'     => __( '新分類' ),
        'menu_name'         => __( '分類' ),
    );
    $args = array(
        'labels' => $labels,
        'hierarchical' => true,  
        'label' => 'Themes store',  //Display name
        'query_var' => true,
        'rewrite' => array( 
            'with_front' =>false, 
            'hierarchical' => true 
        )
    );
    register_taxonomy( 'picture', 'pictures', $args );// Register Taxonomies for Category
    register_taxonomy_for_object_type('category', 'picture');
    register_post_type('pictures', // Register Custom Post Type
        array(
        'labels' => array(
            'name' => __('使用者上傳圖片', 'pictures'), // Rename these to suit
            'singular_name' => __('pictures', 'pictures'),
            'add_new' => __('新增', 'pictures'),
            'add_new_item' => __('新增', 'pictures'),
            'edit' => __('編輯', 'pictures'),
            'edit_item' => __('編輯', 'pictures'),
            'new_item' => __('新項目', 'pictures'),
            'view' => __('檢視', 'pictures'),
            'view_item' => __('編輯', 'pictures'),
            'search_items' => __('搜尋', 'pictures'),
            'not_found' => __('無結果', 'pictures'),
            'not_found_in_trash' => __('無結果', 'pictures')
        ),
        'public' => true,
        'hierarchical' => true, // Allows your posts to behave like Hierarchy Pages
        'has_archive' => true,
        'supports' => array(
            'title',
            'thumbnail'
        ), // Go to Dashboard Custom HTML5 Blank post for supports
        'can_export' => true, // Allows export in Tools > Export
        'taxonomies' => array(
            // 'post_tag',
            'picture'
        ) // Add Category and Post Tags support
    ));
}
add_action('init', 'create_post_type_picture');


function create_post_type_work()
{
    $labels = array(
        'name'              => _x( '圖片分類', 'taxonomy general name' ),
        'singular_name'     => _x( '圖片分類', 'taxonomy singular name' ),
        'search_items'      => __( '搜尋分類' ),
        'all_items'         => __( '所有' ),
        'parent_item'       => __( '選擇上層分類' ),
        'parent_item_colon' => __( '選擇上層分類:' ),
        'edit_item'         => __( '編輯上層分類' ), 
        'update_item'       => __( '更新上層分類' ),
        'add_new_item'      => __( '新增分類' ),
        'new_item_name'     => __( '新分類' ),
        'menu_name'         => __( '分類' ),
    );
    $args = array(
        'labels' => $labels,
        'hierarchical' => true,  
        'label' => 'Themes store',  //Display name
        'query_var' => true,
        'rewrite' => array( 
            'with_front' =>false, 
            'hierarchical' => true 
        )
    );
    register_taxonomy( 'work', 'works', $args );// Register Taxonomies for Category
    register_taxonomy_for_object_type('category', 'work');
    register_post_type('works', // Register Custom Post Type
        array(
        'labels' => array(
            'name' => __('火鍋動態圖', 'works'), // Rename these to suit
            'singular_name' => __('works', 'works'),
            'add_new' => __('新增', 'works'),
            'add_new_item' => __('新增', 'works'),
            'edit' => __('編輯', 'works'),
            'edit_item' => __('編輯', 'works'),
            'new_item' => __('新項目', 'works'),
            'view' => __('檢視', 'works'),
            'view_item' => __('編輯', 'works'),
            'search_items' => __('搜尋', 'works'),
            'not_found' => __('無結果', 'works'),
            'not_found_in_trash' => __('無結果', 'works')
        ),
        'public' => true,
        'hierarchical' => true, // Allows your posts to behave like Hierarchy Pages
        'has_archive' => true,
        'supports' => array(
            'title',
            'thumbnail'
        ), // Go to Dashboard Custom HTML5 Blank post for supports
        'can_export' => true, // Allows export in Tools > Export
        'taxonomies' => array(
            // 'post_tag',
            'work'
        ) // Add Category and Post Tags support
    ));
}
add_action('init', 'create_post_type_work');



?>