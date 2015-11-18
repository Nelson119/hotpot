var cScroll = function () { };
cScroll.prototype.drag = false;
cScroll.prototype.trackHight = 0;
cScroll.prototype.contentHeight = 0;
cScroll.prototype.maskHeight = 0;
cScroll.prototype.initY = 0;
cScroll.prototype.pageY = 0;
cScroll.prototype.On = false;
cScroll.prototype.content = undefined;
cScroll.prototype.mask = undefined;
cScroll.prototype.bar = undefined;
cScroll.prototype.btn = undefined;
cScroll.prototype.speed = 50;
cScroll.prototype.init = function (_content, _mask, _bar, _btn, _speed) {
    this.content = $(_content);
    this.mask = $(_mask);
    this.bar = $(_bar);
    this.btn = $(_btn);
    if (_speed) this.speed = _speed;
    this.setScroll();
}
cScroll.prototype.reset = function () {
    this.trackHeight = this.bar.height() - this.btn.height();
    this.contentHeight = this.content.height() + 80;
    this.maskHeight = this.mask.height();

}
cScroll.prototype.setScroll = function () {
    var scroll = this;
    this.trackHeight = this.bar.height() - this.btn.height();
    this.contentHeight = this.content.height() + 80;
    this.maskHeight = this.mask.height();
    this.content.css('position', 'relative');
    $("body").bind("selectstart", function (event) { return false; });
    this.btn.bind("mousedown", function (event) {
        scroll.drag = true;
        scroll.initY = scroll.btn.position().top;
        (event.pageY) ? scroll.pageY = event.pageY : scroll.pageY = event.clientY;

    });
    this.mask.mousewheel(function (event, delta) {
        if (delta > 0 ) {
            scroll.setContent(scroll.btn.position().top - scroll.speed);
        } else {
            scroll.setContent(scroll.btn.position().top + scroll.speed);
        }
        return false;
    })

    this.mask.hover(function () { scroll.On = true; }, function () { scroll.On = false; })
    $(window).mousewheel(function () { return (scroll.On) ? false : true; })
    $(document).bind("mousemove", function (event) {
        if (!scroll.drag) return;
        var ty;
        (event.pageY) ? ty = event.pageY - scroll.pageY + scroll.initY : ty = event.clientY - scroll.pageY + scroll.initY;
        //console.log('ty');
        //console.log(ty);
        if (ty < 0) ty = 0;
        else if (ty > scroll.trackHeight) ty = scroll.trackHeight;
        scroll.btn.stop(true).css("top", ty);
        //console.log(ty);
        var rate = ty / scroll.trackHeight;
        var pos = Math.floor((scroll.contentHeight - scroll.maskHeight) * rate) * -1;
        //console.log(pos);
        scroll.content.stop(true).css("top", pos);
    });
    $(document).bind("mouseup", function (event) {
        if (!scroll.drag) return;
        scroll.drag = false;
        var ty;
        (event.pageY) ? ty = event.pageY - scroll.pageY + scroll.initY : ty = event.clientY - scroll.pageY + scroll.initY;
        if (ty < 0) ty = 0;
        else if (ty > scroll.trackHeight) ty = scroll.trackHeight;
        scroll.btn.stop(true).css("top", ty);

        var rate = ty / scroll.trackHeight;
        var pos = Math.floor((scroll.contentHeight - scroll.maskHeight) * rate) * -1;
        scroll.content.stop(true).css("top", pos);
    });

    this.bar.bind("mousedown", function (event) {
        if (event.target === scroll.btn.get(0)) return;
        var ty = event.offsetY - 7.5;
        if (ty < 0) ty = 0;
        else if (ty > scroll.trackHeight) ty = scroll.trackHeight;

        var rate = ty / scroll.trackHeight;
        var pos = Math.floor((scroll.contentHeight - scroll.maskHeight) * rate) * -1;

        scroll.btn.animate({ top: ty }, { queue: false, duration: 300 });
        scroll.content.animate({ top: pos }, {
            queue: false, duration: 300, specialEasing: {
                width: "linear",
                height: "easeOutBounce"
            },
        });
    });
};
cScroll.prototype.setContent = function (e) {
    var ty = e;
    if (ty < 0) ty = 0;
    else if (ty > this.trackHeight) ty = this.trackHeight;
    this.btn.stop(true).animate({ top: ty }, 300, 'swing');
    var rate = ty / this.trackHeight;
    var pos = Math.floor((this.contentHeight - this.maskHeight) * rate) * -1;
    this.content.stop(true).animate({ top: pos }, 300, 'swing');
};
cScroll.prototype.scrollto = function ($num) {
    var ty = Math.floor(($num / (this.contentHeight - this.maskHeight)) * this.trackHeight);
    this.btn.stop(true).animate({ "top": ty }, 300, 'swing');
    var rate = ty / this.trackHeight;
    var pos = Math.floor((this.contentHeight - this.maskHeight) * rate) * -1;
    this.content.stop(true).animate({ "top": pos }, 300, 'swing');
}