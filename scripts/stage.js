
/// <reference path="TweenMax.min.js" />
/// <reference path="jquery-1.9.1.min.js" />
/// <reference path="cScroll.js" />


var Stage = function () { }
Stage.url = 'http://events.laurel.com.tw/2015Q4hotpot/default.php';
Stage.ruleScroll = undefined;
Stage.privateScroll = undefined;
Stage.init = function () {
    Stage.loading();
    $('#loading_page').show();
    $('#index_wrap').hide();
    $('.footer_txt2').click(function () { $('#private_wrap').fadeIn(300); Stage.privateScroll.reset(); });
    $('#private_close_btn').click(function () { $('#private_wrap').fadeOut(300); });
    $('#event_detail_close_btn').click(function () { $('#info_wrap').fadeOut(300); });
    $('#winners_close_btn').click(function () { $('#winners_wrap').fadeOut(300); });
    $('#menu1').click(function () { $('#info_wrap').fadeIn(300); Stage.ruleScroll.reset(); });
    $('#menu2').click(function () { $('#winners_wrap').fadeIn(300); });
    $('#menu3').click(function () { });
    $('#cta').click(Stage.login);
    $('#upload_close_btn').click(function () { $('#upload_wrap').fadeOut(300); Stage.mixBoolean = false; });
    Stage.ruleScroll = new cScroll();
    Stage.ruleScroll.init($('.event_txt2_position'), $('.event_txt2_hide'), $('.event_txt2_croll_line'), $('#event_txt2_croll_btn'));
    Stage.privateScroll = new cScroll();
    Stage.privateScroll.init($('.private_position'), $('.private_hide'), $('.private_scroll_box'), $('#private_scroll_btn'),100);
    
    Stage.boxInit();
    $('#big_photo_close_btn').click(Stage.hideGif);
    cPhoto.init();
}


/*List Start*/
Stage.boxMax =8;
Stage.boxArray = [];
Stage.boxPage = 1;
Stage.boxGetNow = false;
Stage.boxNoData = false;
Stage.boxInit = function () {
    $('#wall_loading_wrap').hide();
    $('.photowall_box').remove();
    Stage.boxArray = [];
    Stage.boxPage = 1; //now page Number.
    Stage.getBoxData(Stage.boxPage);
}
Stage.getBoxData = function ($pageNum) {
    $('#wall_loading_wrap').show();
    if (Stage.boxGetNow) return;
    Stage.boxGetNow = true;
    var userData = { page:$pageNum };
    $.ajax({
        url: "http://events.laurel.com.tw/2015Q4hotpot/?page_id=14",
        type: "GET",
        dataType: "json",
        data: userData,
        error: function (e) {
            alert("請稍後再試");
        },
        success: function (r) {
            //Response:
            $('#wall_loading_wrap').hide();
            Stage.boxArray = r.list;
            if (Stage.boxArray.length < Stage.boxMax) { Stage.boxNoData = true; };
            if (Stage.boxArray.length == 0) { Stage.boxNoData = true; return false; }
            Stage.boxSet();
        }
    });
}
Stage.boxSet = function () {
    var main = $("<div class=\"photowall_box\">");
    $('#wall_loading_wrap').before(main);
    for (var i = 0; i < Stage.boxArray.length; i++) {
        var box = $("<div class=\"photowall\">").html('<div class="photo_hide"><div class="photo"><img src=' + Stage.boxArray[i].thumbUrl + ' /></div></div><div class="photo_icon"><img src="images/photo_icon.png" /></div> <a class="fb_share" href="#"><img src="images/photo_fb_share.png" /></a> <div class="fb_name">' + Stage.boxArray[i].name + '</div>');
        box.appendTo(main).data({ 'url': Stage.boxArray[i].url, 'name': Stage.boxArray[i].name, 'seq': Stage.boxArray[i].seq});
        box.find($('.fb_share')).click(function () {
            var parent = $(this).parent();
            var url = parent.data('url');
            var argA = url.replace('http://events.laurel.com.tw/2015Q4hotpot/wp-content/uploads/', '').split('/');
            var y = argA[0];
            var m = argA[1];
            var name = argA[2];
            if (!cFB.userID) {
                cFB.login(function (r) {
                    if (r == "error") {
                        alert("請同意存取桂冠火鍋料，才可以參與活動"); return;
                    }
                    cFB.getName(cFB.share(Stage.url + "?y=" + y + "&m=" + m + "&name=" + name, function (status) {
                        if (!status) return;
                        var userData = {};
                        userData.FBID = cFB.userID;
                        userData.email = cFB.email;
                        userData.username = cFB.userName;
                        userData.ticket = '18design';
                        userData.seq = parent.data('seq');
                        $('#upload_photo_loading_box').show();
                        cPhoto.upNow = true;
                        $.ajax({
                            url: "http://events.laurel.com.tw/2015Q4hotpot/?page_id=16",
                            type: "POST",
                            data: userData,
                            dataType: "json",
                            error: function (e) {
                                alert('發生錯誤，請重新再試！');
                                cPhoto.upNow = false;
                            },
                            success: function (r) {
                                if (r.status == 1) { alert("分享成功"); } else { alert(r.msg); }
                            }
                        });
                    }));
                });
            } else { cFB.getName( cFB.share(Stage.url + "?y=" + y + "&m=" + m + "&name=" + name, function (status) {
                if (!status) return;
                var userData = {};
                userData.FBID = cFB.userID;
                userData.email = cFB.email;
                userData.username = cFB.userName;
                userData.ticket = '18design';
                userData.seq = parent.data('seq');
                $('#upload_photo_loading_box').show();
                cPhoto.upNow = true;
                $.ajax({
                    url: "http://events.laurel.com.tw/2015Q4hotpot/?page_id=16",
                    type: "POST",
                    data: userData,
                    dataType: "json",
                    error: function (e) {
                        alert('發生錯誤，請重新再試！');
                        cPhoto.upNow = false;
                    },
                    success: function (r) {
                        if (r.status == 1) { alert("分享成功"); } else { alert(r.msg); }
                    }
                });
            })); }

            return false;
        });
        box.find($('.photo_hide')).click(function () {
            var obj = $(this).parent()
            Stage.showGif(obj.data('url'), obj.data('name'));
            return false;
        });

        if (i == Stage.boxArray.length - 1) {
            Stage.boxGetNow = false;
        }
    }
    
}
Stage.showGif = function (url, name) {
    $('#showphoto').remove();
    $('#big_photo_name').empty().html(name);
    $('#big_photo_wrap').fadeIn(150);
    $('#show_loading').show();
    var img = new Image();
    img.id = "showphoto";
    $(img).appendTo($('#big_photo'));
    img.onload = function () {
        $('#show_loading').hide();
    }
    img.src = url;
        
}
Stage.hideGif = function () {
    $('#big_photo_wrap').fadeOut(150, function () {
        $('#showphoto').remove();
        $('#big_photo_name').empty();
        $('#show_loading').show();
    });
    return false;
}

Stage.scroll = function (_scroll) {
    if (Stage.boxGetNow) return;
    if (Stage.boxNoData) return;
    if (_scroll + $(window).height() >= $(document).height()) {
        Stage.boxPage++;
        Stage.getBoxData(Stage.boxPage);
    }
}

/*List End*/
Stage.workID = undefined;
Stage.login = function () {
    if (!cFB.userID) {
        cFB.login(function (r) { if (r == "error") { alert("請同意存取桂冠火鍋料，才可以參與活動"); return; } cFB.getName(Stage.setUpload); });
    } else { cFB.getName(Stage.setUpload); }
}
Stage.setUpload = function () {
    $('#upload_wrap').fadeIn(300);
    $('.upload_btn_box1').hide();
    $('.upload_btn_box2').hide();
    $('#upload_photo_loading_box').hide();
    $('#filebtn').show();
    $('#filebtn2,.upload_btn3').hide();
    Stage.workID = undefined;
    $('.hotpot_masker,.bot_masker').hide();
    $('#upload_photo').show();
}
Stage.fileChang = function (files) {
    var file = $(files).get(0).files[0];
    if (file == undefined) return false;
    if (!file.type.match(/image.*/)) { return; }
    if (file.size > 1024 * 1024 * 3) {
        alert('檔案不能超過3M');
        return false;
    }
    $('#upload_photo_loading_box').show();
    $('#FBID').val(cFB.userID);
    $('#uploadTicket').val("18design");

    var formData = new FormData($('#uploadForm')[0]);
    $.ajax({
        url: 'http://events.laurel.com.tw/2015Q4hotpot/?page_id=8',  //server script to process data
        type: 'POST',
        data: formData,
        dataType: "json",
        cache: false,
        contentType: false,
        processData: false,
        enctype: 'multipart/form-data',
        success: completeHandler = function (data) {
            Stage.workID = data.aid;
            cPhoto.set(data);
        },
        error: errorHandler = function(e) {
            console.log(e);
            alert('發生錯誤，請稍後再試！');
        }    
    });

}

Stage.mixBoolean = false;
var cPhoto = function () { };
cPhoto.shareImg = undefined;
cPhoto.mask = undefined;
cPhoto.owidth = undefined;
cPhoto.oheight = undefined;
cPhoto.width = undefined;
cPhoto.height = undefined;
cPhoto.pic = undefined;
cPhoto.url;
cPhoto.x = 0;
cPhoto.y = 0;
cPhoto.dx = 0;
cPhoto.dy = 0;
cPhoto.obj_x = 0;
cPhoto.obj_y = 0;
cPhoto.obj_ow = 316*0.7;
cPhoto.obj_oh = 376*0.7;
cPhoto.obj_w = undefined;
cPhoto.obj_h = undefined;
cPhoto.obj_scale = 1;
cPhoto.isDrag = false;
cPhoto.scale = 1;
cPhoto.nscale = undefined;
cPhoto.main = undefined;
cPhoto.size = 316;
cPhoto.hotpot = undefined;
cPhoto.upNow = false;
cPhoto.init = function () {
    cPhoto.mask = $('.bot_masker');
    cPhoto.hotpot = $('.hotpot_obj');
   
    cPhoto.owidth = undefined;
    cPhoto.oheight = undefined;
    cPhoto.pic = undefined;
    cPhoto.main = undefined;
    cPhoto.x = 0;
    cPhoto.y = 0;
    cPhoto.dx = 0;
    cPhoto.dy = 0;
    cPhoto.obj_x = 0;
    cPhoto.obj_y = 0;
    cPhoto.obj_ow = 316 * 0.7;
    cPhoto.obj_oh = 376 * 0.7;
    cPhoto.obj_w = cPhoto.obj_ow;
    cPhoto.obj_h = cPhoto.obj_oh;
    cPhoto.isDrag = false;
    cPhoto.scale = 1;
    cPhoto.isSelet = false;

    cPhoto.hotpot.draggable({
        scroll: false,
        // containment:'parent',
        drag: function (event, ui) {

        },
        stop: cPhoto.dropHotpot
    })
    $('#big_btn').click(function () {
        cPhoto.obj_scale += 0.1;
        cPhoto.resizeHotpot();
    });
    $('#small_btn').click(function () {
        cPhoto.obj_scale -= 0.1;
        cPhoto.resizeHotpot();
    });
    $('#filebtn,#filebtn2,#upload_photo').click(function () { $("#file").click(); return false; });
    $('#file').on("change", function () { Stage.fileChang(this) });

    $('.upload_btn3').click(function () { cPhoto.upData(); return false; });

    $('.hotpot_obj').hover(function () { $('.bot_masker').animate({ 'opacity': 0.8 }, 300); }, function () { $('.bot_masker').animate({ 'opacity': 1 }, 300); })
    
    $('.bot_masker').hover(function () { $('.hotpot_obj').animate({ 'opacity': 0.8 }, 300); }, function () { $('.hotpot_obj').animate({ 'opacity': 1 }, 300); })

}
cPhoto.resizeHotpot = function () {
    var w=$('.hotpot_obj').width();
    var h=$('.hotpot_obj').height();
    var nw=cPhoto.obj_ow * cPhoto.obj_scale;
    var nh = cPhoto.obj_oh * cPhoto.obj_scale;

    var tx =$('.hotpot_obj').position().left+(w-nw)/2;
    var ty = $('.hotpot_obj').position().top+(h-nh)/2;
    $('.hotpot_obj').width(nw);
    $('.hotpot_obj').height(nh);
    $('.hotpot_obj').css("left", tx).css("top", ty);
    cPhoto.obj_w = nw;
    cPhoto.obj_h = nh;
    cPhoto.obj_x = tx;
    cPhoto.obj_y = ty;
}

cPhoto.setImage = function () {
    Stage.mixBoolean = true;
    $('.upload_img').html('');
    $('.upload_btn_box1,.upload_btn_box2').show();

    $('#pot_size_btn,#background_size_btn,.upload_btn_box2').hide();
    $('#filebtn').hide();
    $('#filebtn2,.upload_btn3').show();
    $('#upload_photo_loading_box').hide();
    $('.hotpot_masker,.bot_masker').show();
    $(this).appendTo($('.upload_img'));
    var photo = $(this);
    cPhoto.pic = photo;
    // alert(this.width+'&'+this.height)
    cPhoto.owidth = this.width;
    cPhoto.oheight = this.height;
    cPhoto.main = photo;
    if (this.width > this.height) {
        ph = cPhoto.size;
        pw = cPhoto.size / cPhoto.oheight * cPhoto.owidth;
        cPhoto.scale = cPhoto.size / cPhoto.oheight;
    } else if (this.width < this.height) {
        pw = cPhoto.size;
        ph = cPhoto.size / cPhoto.owidth * cPhoto.oheight;
        cPhoto.scale = cPhoto.size / cPhoto.owidth;
    } else {
        pw = cPhoto.size;
        ph = cPhoto.size;
        cPhoto.scale = cPhoto.size / cPhoto.oheight;
    }
    cPhoto.nscale = cPhoto.scale;
    photo.css('height', ph).css('width', pw).css('position','absolute');
    cPhoto.width = pw;
    cPhoto.height = ph;
    photo.css('left', cPhoto.mask.width() / 2 - pw / 2).css('top', cPhoto.mask.height() / 2 - ph / 2);
    cPhoto.x = $(cPhoto.pic).position().left;
    cPhoto.y = $(cPhoto.pic).position().top
    cPhoto.pic.draggable({
        scroll: false,
        // containment:'parent',
        drag: function (event, ui) {

        },
        stop: cPhoto.drop
    })

    /*hotpot start*/
    $('.hotpot_obj').width(cPhoto.obj_ow);
    $('.hotpot_obj').height(cPhoto.obj_oh);
    $('.hotpot_obj').css("left", 316 / 2 - cPhoto.obj_ow / 2).css("top", 316 - cPhoto.obj_oh);
    cPhoto.obj_scale = 1;
    /*hotpot end*/
}
cPhoto.set = function (data) {
    var img = new Image();
    img.onload = cPhoto.setImage;
    img.src = data.imgUrl;
    cPhoto.url = data.imgUrl;
    
    $('#upload_photo,#upload_photo_loading_box').hide();
    $('#upload_photo_loading_box').show();
    
    //cPhoto.setImage();
    //$('.btn_upload').show();
    //$('.adj2').unbind('click').bind('click', cPhoto.zoomIn);
    //$('.adj3').unbind('click').bind('click', cPhoto.zoomOut);

    //if (Root.device == Root.IPHONE || Root.device == Root.ANDROID || Root.device == Root.ANDROIDTABLET || Root.device == Root.IPAD) {
    //    $(cPhoto.mask).bind("touchstart", function (event) { cPhoto.touchStart(event); });
    //    $(cPhoto.mask).bind("touchmove", function (event) { cPhoto.touchMove(event); });
    //    $(document.body).bind("touchend", function (event) { cPhoto.touchEnd(event); });
    //}
    //else if (Root.browser.match(/IE10/i) && Root.mobile) {

    //    $(cPhoto.mask).css("-ms-touch-action", "none");
    //    $(cPhoto.mask)[0].addEventListener("MSPointerDown", function (event) { cPhoto.pointerDown(event); });
    //    $(cPhoto.mask)[0].addEventListener("MSPointerMove", function (event) { cPhoto.pointerMove(event); });
    //    $(cPhoto.mask)[0].addEventListener("MSPointerUp", function (event) { cPhoto.pointerUp(event); });
    //}
    //else {
    //    $(cPhoto.mask).unbind("mousedown").bind("mousedown", function (event) { cPhoto.mouseDown(event); });
    //    $(cPhoto.mask).unbind("mousemove").bind("mousemove", function (event) { cPhoto.mouseMove(event); });
    //    $(window).unbind("mouseup").bind("mouseup", function (event) { cPhoto.mouseUp(event); });
    //}
    //$(cPhoto.mask).unbind("mousedown").bind("mousedown", function (event) { cPhoto.mouseDown(event); });
    //$(cPhoto.mask).unbind("mousemove").bind("mousemove", function (event) { cPhoto.mouseMove(event); });
    //$(window).unbind("mouseup").bind("mouseup", function (event) { cPhoto.mouseUp(event); });

    //$(cPhoto.mask)[0].onselectstart = function () {return false;}
}
cPhoto.mouseDown = function (event) {
    cPhoto.isDrag = true;
    var pageX = event.pageX;
    var pageY = event.pageY;
    cPhoto.drag(pageX, pageY);
}
cPhoto.mouseMove = function (event) {
    if (!cPhoto.pic) return;
    if (!cPhoto.isDrag) return;
    event.preventDefault();
    var pageX = event.pageX;
    var pageY = event.pageY;

    cPhoto.dragging(pageX, pageY);
}
cPhoto.mouseUp = function (event) {
    if (!cPhoto.isDrag) return;
    cPhoto.isDrag = true;
    var pageX = event.pageX;
    var pageY = event.pageY;
    cPhoto.drop(pageX, pageY);
}
cPhoto.drag = function (pageX, pageY) {
    var image = cPhoto.pic;
    var pos = $(image).position();

    $(image).stop();
    cPhoto.isDrag = true;
    cPhoto.dx = pageX;
    cPhoto.dy = pageY;
    cPhoto.x = pos.left;
    cPhoto.y = pos.top;
}

cPhoto.dragging = function (pageX, pageY) {

    var image = cPhoto.pic;
    var tx = cPhoto.x + (pageX - cPhoto.dx);
    var ty = cPhoto.y + (pageY - cPhoto.dy);

    //this.targetX = tx;
    //this.targetY = ty;
    $(image).css("left", tx);
    $(image).css("top", ty);
}
cPhoto.dropHotpot = function () {
    var hotpot = cPhoto.hotpot;
    var pos = $(hotpot).position();
    cPhoto.obj_x = pos.left;
    cPhoto.obj_y = pos.top;
    console.log('drop')

    if (cPhoto.obj_x > (cPhoto.size - cPhoto.obj_w/2)) {
        if (cPhoto.obj_y > (cPhoto.size - cPhoto.obj_h/2)) {
            $(cPhoto.hotpot).animate({ 'top': (cPhoto.size - cPhoto.obj_h) }, 300, function () { cPhoto.obj_x = $(hotpot).position().left; cPhoto.obj_y = $(hotpot).position().top; })
        } else if (cPhoto.obj_y < (0 - cPhoto.obj_h / 2)) {
            $(cPhoto.hotpot).animate({ 'left': (cPhoto.size - cPhoto.obj_w), 'top': 0 }, 300, function () { cPhoto.obj_x = $(hotpot).position().left; cPhoto.obj_y = $(hotpot).position().top; })
        } else {
            $(cPhoto.hotpot).animate({ 'left': (cPhoto.size - cPhoto.obj_w) }, 300, function () { cPhoto.obj_x = $(hotpot).position().left; cPhoto.obj_y = $(hotpot).position().top; })
        }
       
    } else if (cPhoto.obj_x < (0 - cPhoto.obj_w / 2)) {
        if (cPhoto.obj_y > (cPhoto.size - cPhoto.obj_h/2)) {
            $(cPhoto.hotpot).animate({ 'left': 0, 'top': (cPhoto.size - cPhoto.obj_h) }, 300, function () { cPhoto.obj_x = $(hotpot).position().left; cPhoto.obj_y = $(hotpot).position().top; })
        } else if (cPhoto.obj_y < (0 - cPhoto.obj_h / 2)) {
            $(cPhoto.hotpot).animate({ 'left': 0, 'top': 0 }, 300, function () { cPhoto.obj_x = $(hotpot).position().left; cPhoto.obj_y = $(hotpot).position().top; })
        } else {
            $(cPhoto.hotpot).animate({ 'left': 0 }, 300, function () { cPhoto.obj_x = $(hotpot).position().left; cPhoto.obj_y = $(hotpot).position().top; })
        }
    } else {
        if (cPhoto.obj_y > (cPhoto.size - cPhoto.obj_h/2)) {
            $(cPhoto.hotpot).animate({ 'top': (cPhoto.size - cPhoto.obj_h) }, 300, function () { cPhoto.obj_x = $(hotpot).position().left; cPhoto.obj_y = $(hotpot).position().top; })
        } else if (cPhoto.obj_y < (0 - cPhoto.obj_h / 2)) {
            $(cPhoto.hotpot).animate({ 'top': 0 }, 300, function () { cPhoto.obj_x = $(hotpot).position().left; cPhoto.obj_y = $(hotpot).position().top; })
        } else {
           
        }
    }

  

}
cPhoto.drop = function () {
    if (!cPhoto.pic) return;
    cPhoto.isDrag = false;
    var pic = cPhoto.pic;
    var pos = $(pic).position();
    cPhoto.x = pos.left;
    cPhoto.y = pos.top;
    console.log('drop')
    if (cPhoto.x > 0) {
        //$(cPhoto.pic).animate({ 'left': 0 }, 300, function () { cPhoto.x = $(pic).position().left; })
        //return
        if (cPhoto.y > 0) {
            $(cPhoto.pic).animate({ 'left': 0, 'top': 0 }, 300, function () { cPhoto.x = $(pic).position().left; cPhoto.y = $(pic).position().top; })
            //return
        } else if (cPhoto.y < -(cPhoto.height - cPhoto.size)) {
            $(cPhoto.pic).animate({ 'left': 0, 'top': -(cPhoto.height - cPhoto.size) }, 300, function () { cPhoto.x = $(pic).position().left; cPhoto.y = $(pic).position().top; })
            //return
        } else {
            $(cPhoto.pic).animate({ 'left': 0 }, 300, function () { cPhoto.x = $(pic).position().left; })
        }
    } else if (cPhoto.x < -(cPhoto.width - cPhoto.size)) {
        if (cPhoto.y > 0) {
            $(cPhoto.pic).animate({ 'left': -(cPhoto.width - cPhoto.size), 'top': 0 }, 300, function () { cPhoto.x = $(pic).position().left; cPhoto.y = $(pic).position().top; })
            //return
        } else if (cPhoto.y < -(cPhoto.height - cPhoto.size)) {
            $(cPhoto.pic).animate({ 'left': -(cPhoto.width - cPhoto.size), 'top': -(cPhoto.height - cPhoto.size) }, 300, function () { cPhoto.x = $(pic).position().left; cPhoto.y = $(pic).position().top; })
            //return
        } else {
            $(cPhoto.pic).animate({ 'left': -(cPhoto.width - cPhoto.size) }, 300, function () { cPhoto.x = $(pic).position().left; })
        }
    } else {
        if (cPhoto.y > 0) {
            $(cPhoto.pic).animate({ 'top': 0 }, 300, function () { cPhoto.x = $(pic).position().left; cPhoto.y = $(pic).position().top; })
            //return
        } else if (cPhoto.y < -(cPhoto.height - cPhoto.size)) {
            $(cPhoto.pic).animate({ 'top': -(cPhoto.height - cPhoto.size) }, 300, function () { cPhoto.x = $(pic).position().left; cPhoto.y = $(pic).position().top; })
        }
    }


}
cPhoto.upData = function () {
    if (cPhoto.upNow) { alert("合成中，請稍後！");return;};
    var data = {};
    data.imgUrl = cPhoto.url;
    data.FBID = cFB.userID;
    data.email = cFB.email;
    data.username = cFB.userName;

    var scale = 462/316 ;

    data.bg_x = cPhoto.x * scale;
    data.bg_y = cPhoto.y * scale;

    data.obj_x = cPhoto.obj_x * scale;
    data.obj_y = cPhoto.obj_y * scale;
    data.obj_w = cPhoto.obj_w * scale;
    data.obj_h = cPhoto.obj_h * scale;
    data.ticket = '18design';
    data.aid = Stage.workID;
    $('#upload_photo_loading_box').show();
    cPhoto.upNow = true;
    $.ajax({
        url: "http://events.laurel.com.tw/2015Q4hotpot/?page_id=12",
        type: "POST",
        data: data,
        dataType: "json",
        error: function (e) {
            alert('發生錯誤，請重新再試！');
            cPhoto.upNow = false;
        },
        success: function (r) {
            if (r.status == 1) {
                cPhoto.upNow = false;
                alert("上傳成功");
                $('#upload_photo_loading_box').hide();
                $('#upload_wrap').fadeOut(300);
                Stage.boxInit();
            }
        }
    });

}


/*Loading Start*/
Stage.loading = function () {
    var imgArray = [];
    for (var i = 0; i < $('img').length; i++) {imgArray.push($('img').eq(i).attr('src'));}
    var htmlImg = $('a,li,div');
    for (var j = 0; j < htmlImg.length; j++) {
        if (htmlImg.eq(j).css('background-image') !== 'none') {
            var s = htmlImg.eq(j).css('background-image').replace('url("', '').replace("), none", '').replace('")', '').replace('url(', '').replace(')', '').replace('"', '').replace("'", '')
            imgArray.push(s);
        }
    }
    $('#cta').empty();
    for (var k = 1; k <= 37; k++) {
        imgArray.push('images/cta_animate/cta00' + k + '.png');
        var img = new Image();
        img.className = 'none';
        img.src = 'images/cta_animate/cta00' + k + '.png';
        $('#cta').append(img);
    }
    $('#index_smoke').empty();
    for (var l = 0; l <= 43; l++) {
        imgArray.push('images/smoke_index/SmokeLoop' + l + '.png');
        var img = new Image();
        img.className = 'none';
        img.src = 'images/smoke_index/SmokeLoop' + l + '.png';
        $('#index_smoke').append(img);  
    }
    for (var m = 0; m <= 5; m++) {
        imgArray.push('images/smoke_share/smokeLoop' + m + '.png');
        var img = new Image();
        img.className = 'none';
        img.src = 'images/smoke_share/smokeLoop' + m + '.png';
        $('.hotpot_obj').append(img);
    }
    imgloader = new kImageLoader(imgArray, "loader");
    imgloader.onComplete = Stage.LoadComplete;
    imgloader.startLoad();
}
Stage.ctaNow = 0;
Stage.ctaNumber = 37;
Stage.smokeNow = 0;
Stage.smokeNumber = 43;
Stage.hotpotNow = 0;
Stage.hotpotNumber = 5;
Stage.LoadComplete = function () {
    $('#loading_page').fadeOut();
    $('#index_wrap').fadeIn();
    $('#cta img').eq(Stage.ctaNow).removeClass('none').addClass('cut');
    $('#index_smoke img').eq(Stage.smokeNow).removeClass('none').addClass('cut');
    setInterval(function () {
        $('#cta img').eq(Stage.ctaNow).removeClass('cut').addClass('none');
        Stage.ctaNow = (Stage.ctaNow == Stage.ctaNumber - 1) ? 0 : Stage.ctaNow+1;
        $('#cta img').eq(Stage.ctaNow).removeClass('none').addClass('cut');
        $('#index_smoke img').eq(Stage.smokeNow).removeClass('cut').addClass('none');
        Stage.smokeNow = (Stage.smokeNow == Stage.smokeNumber) ? 0 : Stage.smokeNow + 1;
        $('#index_smoke img').eq(Stage.smokeNow).removeClass('none').addClass('cut');
        if (Stage.mixBoolean) {
            $('.hotpot_obj img').eq(Stage.hotpotNow).removeClass('cut').addClass('none');
            Stage.hotpotNow = (Stage.hotpotNow == Stage.hotpotNumber) ? 0 : Stage.hotpotNow + 1;
            $('.hotpot_obj img').eq(Stage.hotpotNow).removeClass('none').addClass('cut');
        }
    }, 1000 / 12);
    
}

/*Loading End*/

//Stage.load = function () {}
$(window).scroll(function () { var scroll = jQuery(this).scrollTop(); Stage.scroll(scroll); })
$(Stage.init)
//$(window).load(Stage.load)
