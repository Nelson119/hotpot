<?php
header("Content-Type:text/html; charset=utf-8");
$metaUrl="http://events.laurel.com.tw/2015Q4hotpot/";
if(isset($_GET['name'])&&isset($_GET['y'])&&isset($_GET['m'])){
    $gif=$metaUrl.'wp-content/uploads/'.$_GET['y'].'/'.$_GET['m'].'/'.$_GET['name'];
    $tpTitle=$gif;
    $tpUrl=$gif;
    $tpImg='';
}else{
    $tpTitle="相聚 怎麼可以少了你";
     $tpUrl=$metaUrl.'';
     $tpImg=$metaUrl.'images/600x315.jpg';
}
if(isset($_GET['seq'])){
    $attachment_id = get_post_meta($_GET['seq'], 'gif', true);
    $tpImg = wp_get_attachment_url( $attachment_id );
}



?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>桂冠火鍋料 相聚 怎麼可以少了你</title>
        <meta property="og:title" content="<?php echo $tpTitle ?>" />
    <meta property="og:type" content="website" />
<?php 

if(isset($_GET['seq'])){
    $attachment_id = get_post_meta($_GET['seq'], 'gif', true);
    $tpImg = wp_get_attachment_url( $attachment_id );
?>
    <meta property="og:url" content="<?php echo $tpImg ?>" />
    <meta property="og:title" content="<?php echo $tpImg ?>" />
    <meta property="og:image" content="" />
<?php }else{
?>
    <meta property="og:url" content="<?php echo $tpUrl ?>" />
    <meta property="og:image" content="<?php echo $tpImg ?>" />
<?php } ?>
    <meta property="og:description" content="全台首發!!!上傳屬於你們的第一張動態分享圖，就有機會抽到『桂冠火鍋行動小食堂 與你共享火鍋』等多項好禮唷!!!" />
    <meta name="description" content="全台首發!!!上傳屬於你們的第一張動態分享圖，就有機會抽到『桂冠火鍋行動小食堂 與你共享火鍋』等多項好禮唷!!!" />
    <meta name="keywords" content="" />

    <link href="<?php echo get_template_directory_uri();?>/css/style.css" rel="stylesheet" type="text/css" />
    <link href="<?php echo get_template_directory_uri();?>/css/reset.css" rel="stylesheet" type="text/css" />
    <link href="<?php echo get_template_directory_uri();?>/css/animate.css" rel="stylesheet" type="text/css" />
    <script src="<?php echo get_template_directory_uri();?>/scripts/jquery-1.9.1.min.js"></script>
    <script src="<?php echo get_template_directory_uri();?>/scripts/stage.js"></script>
    <script src="<?php echo get_template_directory_uri();?>/scripts/ImageLoader.js"></script>
    <script src="<?php echo get_template_directory_uri();?>/scripts/cImg.js"></script>
    <script src="<?php echo get_template_directory_uri();?>/scripts/cScroll.js"></script>
    <script src="<?php echo get_template_directory_uri();?>/scripts/jquery.mousewheel.js"></script>
    <script src="<?php echo get_template_directory_uri();?>/scripts/cFB.js"></script>
    <script src="<?php echo get_template_directory_uri();?>/scripts/kRoot.js"></script>
    <script src="<?php echo get_template_directory_uri();?>///code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
    
</head>

<body>
    <!--Loading page-->

    <div id="loading_page" style="display: none">
        <div class="loading_box">
            <div style="position: absolute; top: 236px; left: 66px; z-index: 99;">
                <img src="<?php echo get_template_directory_uri();?>/images/loading_txt.gif" width="108" height="31" />
            </div>
            <div style="position: absolute; top: 23px; z-index: 99; left: 14px;">
                <img src="<?php echo get_template_directory_uri();?>/images/loading_txt.png" />
            </div>
            <div class="circle_box">
                <div class="circle">
                    <div class="circle_bg">
                        <img src="<?php echo get_template_directory_uri();?>/images/loading_bg.jpg" style="margin-top: -14px;">
                    </div>
                </div>
                <div class="circle_hidden">
                    <img src="<?php echo get_template_directory_uri();?>/images/loading_hide.png" width="238" height="238" />
                </div>
                <div class="car">
                    <img src="<?php echo get_template_directory_uri();?>/images/loading_car.png" />
                    <div class="Wheel1">
                        <img src="<?php echo get_template_directory_uri();?>/images/Wheel1.png" />
                    </div>
                    <div class="wheel2">
                        <img src="<?php echo get_template_directory_uri();?>/images/Wheel2.png" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--Loading page Over-->
    <div id="bg">
        <!--��p�v-->
        <div class="light_box_bg" id="private_wrap" style="display: none">
            <div class="light_box_wrap">
                <div id="private_bg">
                    <a id="private_close_btn" href="#"></a>
                    <div class="private_title">
                        <img src="<?php echo get_template_directory_uri();?>/images/private_title.png" />
                    </div>
                    <div id="private_box">
                        <div class="private_hide">
                            <div class="private_position" style="margin-top: 0px;">
                                <img src="<?php echo get_template_directory_uri();?>/images/private_txt.png" />
                            </div>
                        </div>
                        <div class="private_scroll_box">
                            <a id="private_scroll_btn" href="#" style="margin-top: 0px;">
                                <img src="<?php echo get_template_directory_uri();?>/images/private_line_btn.png" /></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--��p�vover-->
        <!--�o���W��-->
        <div class="light_box_bg" id="winners_wrap" style="display: none;">
            <div class="light_box_wrap">
                <div id="winners_bg">
                    <a id="winners_close_btn" href="#"></a>
                    <div class="winners_title">
                        <img src="<?php echo get_template_directory_uri();?>/images/winners_title.png" />
                    </div>
                    <div class="w_box">
                        <div class="w1">
                            <div class="w1_title">
                                <img src="<?php echo get_template_directory_uri();?>/images/winners_t1.png" />
                            </div>
                            <div class="w1_box">
                                <div class="w1_p">
                                    <img src="<?php echo get_template_directory_uri();?>/images/winners_p1.png" />
                                </div>
                                <div style="position: absolute; width: 446px; top: 60px; left: 186px;">
                                    <img src="<?php echo get_template_directory_uri();?>/images/winners_txt1.png" />
                                </div>
                            </div>
                        </div>
                        <div class="w1">
                            <div class="w1_title">
                                <img src="<?php echo get_template_directory_uri();?>/images/winners_t2.png" />
                            </div>
                            <div class="w1_box">
                                <div class="w1_p">
                                    <img src="<?php echo get_template_directory_uri();?>/images/winners_p1.png" />
                                </div>
                                <div style="position: absolute; width: 446px; top: 60px; left: 186px;">
                                    <img src="<?php echo get_template_directory_uri();?>/images/winners_txt2.png" />
                                </div>
                            </div>
                            <div class="w1_box">
                                <div class="w1_p">
                                    <img src="<?php echo get_template_directory_uri();?>/images/winners_p2.png" />
                                </div>
                                <div style="position: absolute; width: 446px; top: 33px; left: 186px;">
                                    <img src="<?php echo get_template_directory_uri();?>/images/winners_txt3.png" />
                                </div>
                            </div>
                            <div class="w1_box">
                                <div class="w1_p">
                                    <img src="<?php echo get_template_directory_uri();?>/images/winners_p3.png" />
                                </div>
                                <div style="position: absolute; width: 446px; top: 50px; left: 186px;">
                                    <img src="<?php echo get_template_directory_uri();?>/images/winners_txt4.png" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--�o���W�� over-->
        <!--���ʿ�k-->
        <div class="light_box_bg" id="info_wrap" style="display: none;">
            <div class="light_box_wrap">
                <div id="event_detail_bg">
                    <a id="event_detail_close_btn" href="#"></a>
                    <div class="event_detail_title">
                        <img src="<?php echo get_template_directory_uri();?>/images/event_title.png" />
                    </div>
                    <div class="event_detail_txt1">
                        <img src="<?php echo get_template_directory_uri();?>/images/event_txt1.png" />
                    </div>
                    <div class="event_derail_txt2">
                        <div class="event_t1">
                            <img src="<?php echo get_template_directory_uri();?>/images/event_t1.png" />
                        </div>
                        <div class="event_txt2_hide">
                            <div class="event_txt2_position" style="margin-top: 0px;">
                                <img src="<?php echo get_template_directory_uri();?>/images/event_txt2.png" />
                            </div>
                        </div>
                        <div class="event_txt2_croll_box">
                            <div class="event_txt2_croll_line"></div>
                            <a id="event_txt2_croll_btn" href="#" style="margin-top: 0px;">
                                <img src="<?php echo get_template_directory_uri();?>/images/event_scrollbar_icon.png" /></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--���ʿ�k over-->
        <!--��j�Ӥ�-->
        <div class="light_box_bg" id="big_photo_wrap" style="display: none">
            <div class="light_box_wrap">
                <div id="big_photo_bg">
                    <a id="big_photo_close_btn" href="#"></a>
                    <div id="big_photo">
                        <div id="show_loading" class="big_photo_loading">
                            <img src="<?php echo get_template_directory_uri();?>/images/89_2.GIF" width="64" height="64" />
                        </div>
                    </div>
                    <div id="big_photo_name">Yu Wei Chang</div>
                </div>
            </div>
        </div>
        <!--��j�Ӥ� over-->
        <!--�W�ǷӤ�-->
        <div class="light_box_bg" id="upload_wrap" style="display: none;">
            <div class="light_box_wrap">
                <div id="upload_bg">
                    <a id="upload_close_btn" href="#"></a>
                    <div class="upload_txt">
                        <img src="<?php echo get_template_directory_uri();?>/images/upload_txt.png" />
                    </div>
                    <div class="upload_bg">

                        <div class="hotpot_masker">
                            <div class="hotpot_obj">
                                <div class="hotpot_border"></div>
                            </div>
                            <div class="bot_masker">
                                <div class="upload_img"></div>
                            </div>
                        </div>

                        <div id="upload_photo">
                            <img src="<?php echo get_template_directory_uri();?>/images/upload_photo.gif" />
                        </div>
                        <div id="upload_photo_loading_box">
                            <div class="big_photo_loading">
                                <img src="<?php echo get_template_directory_uri();?>/images/89_3.GIF" width="64" height="64" />
                            </div>
                        </div>
                    </div>
                    <div class="upload_btn_box1">
                        <a id="pot_size_btn" href="#"></a>
                        <a id="background_size_btn" href="#"></a>
                        <a id="big_btn" href="#"></a>
                        <a id="small_btn" href="#"></a>
                    </div>
                    <div class="upload_btn_box2">
                        <a id="up_btn" href="#"></a>
                        <a id="bottom_btn" href="#"></a>
                        <a id="left_btn" href="#"></a>
                        <a id="right_btn" href="#"></a>
                    </div>
                    <iframe id="uploadFrame" name="uploadFrame" width="0" height="0" frameborder="0"></iframe>
                    <form name="uploadForm" id="uploadForm" method="post" target="uploadFrame" enctype="multipart/form-data" action="http://events.laurel.com.tw/2015Q4hotpot/?page_id=8">
                        <input id="file" name="imgFile" class="upload_btn1" type="file" style="display: none;" />
                        <input id="FBID" name="FBID" type="text" style="display: none;" />
                        <input id="uploadTicket" name="ticket" type="text" style="display: none;" />
                    </form>
                    <a id="filebtn" class="upload_btn1" href="#"></a>
                    <a id="filebtn2" class="upload_btn2" href="#" style="display: none"></a>
                    <a class="upload_btn3" href="#" style="display: none"></a>
                </div>
            </div>
        </div>
        <!--�W�ǷӤ� over-->
        <!--����-->
        <div id="index_wrap">
            <div id="index_top">
                <div class="logo">
                    <img src="<?php echo get_template_directory_uri();?>/images/logo.png" />
                </div>
                <div class="indxt_title_smoke">
                    <img src="<?php echo get_template_directory_uri();?>/images/index_title_smoke.png" />
                </div>
                <div class="index_title">
                    <img src="<?php echo get_template_directory_uri();?>/images/index_title.png" />
                </div>
                <div id="menu_box">
                    <a class="menu_list" id="menu1" href="#"></a>
                    <a class="menu_list" id="menu2" href="#"></a>
                    <a class="menu_list" id="menu3" href="#"></a>
                </div>
                <div class="index_photo">
                    <img src="<?php echo get_template_directory_uri();?>/images/index_asdf.png" />
                </div>
                <div class="index_pot">
                    <img src="<?php echo get_template_directory_uri();?>/images/index_pot.png" />
                </div>
                <div class="index_txt">
                    <img src="<?php echo get_template_directory_uri();?>/images/index_txt.png" />
                </div>
                <!--�ʺA�������ĪG-->
                <div id="index_smoke">
                    <img src="<?php echo get_template_directory_uri();?>/images/index_smoke.png" />
                </div>
                <!--���s�n���ʺA �s�����PNG-->
                <a id="cta" href="#">
                    <img src="<?php echo get_template_directory_uri();?>/images/cta.png" /></a>
            </div>
            <div id="index_bottom">
                <div class="photowall_txt_box">
                    <div class="photowall_txt">
                        <img src="<?php echo get_template_directory_uri();?>/images/photowall_txt.png" />
                    </div>
                    <div class="photowall_food">
                        <img src="<?php echo get_template_directory_uri();?>/images/laurel_food.png" />
                    </div>
                </div>
                <div id="photowall_wrap">
                    <!------�Ӥ���8�i------->
                    <!--<div class="photowall_box">
                        <div class="photowall">
                            <div class="photo_hide">
                                <div class="photo">
                                    <img src="<?php echo get_template_directory_uri();?>/images/photo_238x238.png" />
                                </div>
                            </div>
                            <div class="photo_icon">
                                <img src="<?php echo get_template_directory_uri();?>/images/photo_icon.png" />
                            </div>
                            <a class="fb_share" href="#">
                                <img src="<?php echo get_template_directory_uri();?>/images/photo_fb_share.png" /></a>
                            <div class="fb_name">Yu Wei Chang</div>
                        </div>
                    </div>-->

                    <!------�Ӥ���8�i over------->

                    <!--�Ӥ�loading-->
                    <div id="wall_loading_wrap" style="display: none">
                        <div id="wall_loading">
                            <img src="<?php echo get_template_directory_uri();?>/images/89.GIF" />
                        </div>
                    </div>
                    <!--�Ӥ�loading over-->
                </div>
            </div>
        </div>
    </div>
    <div id="footer_wrap">
        <div id="footer">
            <div class="footer_txt1">
                <img src="<?php echo get_template_directory_uri();?>/images/footer_txt1.png" />
            </div>
            <a class="footer_txt2" href="#">
                <img src="<?php echo get_template_directory_uri();?>/images/footer_txt2.png" /></a>
        </div>
    </div>

</body>
</html>
