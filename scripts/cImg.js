/**
 * version 1.0.1
 * 
 * date 2014.9.1
 * 
 * @author Cyrus
 * 
 * img用imgLoop  background用backimgLoop
 * 
 * 用法：ex:var imgLoop4 = new imgLoop($('.videobox .kvBg'), 'images/kv/screen', 517, 1 / 18 * 1000, 'jpg', Kv.End);
 * 
 *          imgLoop4.init(483); //null從1開始 否則從帶入的數字開始
 * 
 * 
 */

//


function imgLoop($main, url, num, speed, type, callback) { //$main:要變更的物件, url:路徑, num:圖片總數, speed:換圖速度, type:圖片副檔名(ex:jpg、png), callback
    this.main = $main;
    this.url = url;
    this.totalNum = num;
    this.speed = speed;
    this.type = type;
    this.callback = function () { };
    this.callback = callback;
}
imgLoop.prototype.imgloop = null;
imgLoop.prototype.nowNum = 1;
imgLoop.prototype.totalNum = 15;
imgLoop.prototype.interval = 0;
imgLoop.prototype.main = null;
imgLoop.prototype.callback = null;
imgLoop.prototype.loop = false;
imgLoop.prototype.speed = null;
imgLoop.prototype.type = null;
imgLoop.prototype.url = null;
imgLoop.prototype.init = function (n) {
    if (n) {
        this.nowNum = n
    } else {
        this.nowNum = 1;
    }
    this.run();
}
imgLoop.prototype.run = function () {

    var imgloop = this;

    this.main.attr('src', this.url + this.nowNum + '.' + this.type);
    clearInterval(this.interval);
    this.interval = setInterval(function () { imgloop.loopRipple() }, this.speed);
}
imgLoop.prototype.loopRipple = function () {

    this.nowNum++;

    if ((this.nowNum - 1) == this.totalNum && !this.loop) {
        clearInterval(this.interval);
        if (typeof this.callback == "function") this.callback();
        return false;
    }
    else if ((this.nowNum - 1) == this.totalNum && this.loop) {
        this.nowNum = 1;
    }
    this.main.attr('src', this.url + this.nowNum + '.' + this.type);


}
imgLoop.prototype.stop = function () {
    clearInterval(this.interval);
}
imgLoop.prototype.goto = function (frame) {
    this.nowNum = frame;
    this.main.attr('src', this.url + this.nowNum + '.' + this.type);
}
imgLoop.prototype.isFinal = function () {
    if ((this.nowNum - 1) == this.totalNum) {
        return true;
    } else {
        return false;
    }
}



function backimgLoop($main, url, num, speed, type, callback) { //$main:要變更的物件, url:路徑, num:圖片總數, speed:換圖速度, type:圖片副檔名(ex:jpg、png), callback
    this.main = $main;
    this.url = url;
    this.totalNum = num;
    this.speed = speed;
    this.type = type;
    this.callback = function () { };
    this.callback = callback;
}
backimgLoop.prototype.backimgLoop = null;
backimgLoop.prototype.nowNum = 0;
backimgLoop.prototype.totalNum = 15;
backimgLoop.prototype.interval = 0;
backimgLoop.prototype.main = null;
backimgLoop.prototype.callback = null;
backimgLoop.prototype.loop = false;
backimgLoop.prototype.speed = null;
backimgLoop.prototype.type = null;
backimgLoop.prototype.url = null;
backimgLoop.prototype.init = function (n) {
    if (n) {
        this.nowNum = n
    } else {
        this.nowNum = 0;
    }
    this.run();
}
backimgLoop.prototype.run = function () {

    var backimgLoop = this;

    //this.main.attr('src', this.url + this.nowNum + '.' + this.type);
    this.main.css('background-image', 'url(' + this.url + this.nowNum + '.' + this.type + ')');
    this.main.css('background-size', 'cover');
    this.main.css('background-repeat', 'no-repeat');
    clearInterval(this.interval);
    this.interval = setInterval(function () { backimgLoop.loopRipple() }, this.speed);
}
backimgLoop.prototype.loopRipple = function () {

    this.nowNum++;

    if ((this.nowNum) == this.totalNum && !this.loop) {
        clearInterval(this.interval);
        if (typeof this.callback == "function") this.callback();
        return false;
    }
    else if ((this.nowNum) == this.totalNum && this.loop) {
        this.nowNum = 0;
    }
    //this.main.attr('src', this.url + this.nowNum + '.' + this.type);
    this.main.css('background-image', 'url(' + this.url + this.nowNum + '.' + this.type + ')');
    this.main.css('background-size', 'cover');
    this.main.css('background-repeat', 'no-repeat');

}
backimgLoop.prototype.stop = function () {
    clearInterval(this.interval);
}
backimgLoop.prototype.goto = function (frame) {
    this.nowNum = frame;
    //this.main.attr('src', this.url + this.nowNum + '.'+this.type);
    this.main.css('background-image', 'url(' + this.url + this.nowNum + '.' + this.type + ')');
    this.main.css('background-size', 'cover');
    this.main.css('background-repeat', 'no-repeat');
}
backimgLoop.prototype.isFinal=function(){
    if ((this.nowNum) == this.totalNum) {
        return true;
    } else {
        return false;
    }
}



function backgroundLoop($main, num, moveY, speed, callback) { //$main:要變更的物件, num:圖片總數,moveY:位移量, speed:換圖速度, callback
    this.main = $main;
    this.totalNum = num;
    this.speed = speed;
    this.moveY = moveY;
    this.callback = function () { };
    this.callback = callback;
}
backgroundLoop.prototype.imgloop = null;
backgroundLoop.prototype.nowNum = 0;
backgroundLoop.prototype.totalNum = 0;
backgroundLoop.prototype.interval = 0;
backgroundLoop.prototype.moveY = 0;
backgroundLoop.prototype.main = null;
backgroundLoop.prototype.callback = null;
backgroundLoop.prototype.loop = false;
backgroundLoop.prototype.speed = null;


backgroundLoop.prototype.init = function (n) {
    if (n) {
        this.nowNum = n
    } else {
        this.nowNum = 0;
    }
    this.run();
}
backgroundLoop.prototype.run = function () {
    //console.log(this.main);
    var backgroundLoop = this;
    clearInterval(this.interval);
    this.interval = setInterval(function () { backgroundLoop.loopRipple() }, this.speed);
}
backgroundLoop.prototype.loopRipple = function () {

    this.nowNum++;

    if ((this.nowNum) == this.totalNum && !this.loop) {
        clearInterval(this.interval);
        if (typeof this.callback == "function") this.callback();
        return false;
    }
    else if ((this.nowNum) == this.totalNum && this.loop) {
        this.nowNum = 0;
    }
    
    $(this.main).css("background-position-y", (this.moveY * this.nowNum + "px"));
}
backgroundLoop.prototype.stop = function () {
    clearInterval(this.interval);
}
backgroundLoop.prototype.goto = function (frame) {
    this.nowNum = frame;
    $(this.main).css("background-position-y", (this.moveY * this.nowNum + "px"));
    //this.main.attr('src', this.url + this.nowNum + '.' + this.type);
}
backgroundLoop.prototype.isFinal = function () {
    if ((this.nowNum) == this.totalNum) {
        return true;
    } else {
        return false;
    }
}