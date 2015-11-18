var kNetwork = {};
kNetwork.data = {};

kNetwork.init = function () {
	var meta = $("meta");

	for (var i = 0; i < meta.length; i++) {

		if ($("meta:eq(" + i + ")").attr("property") == "og:title") {
			kNetwork.data.title = $("meta:eq(" + i + ")").attr("content");

		} else if ($("meta:eq(" + i + ")").attr("property") == "og:description") {
			kNetwork.data.description = $("meta:eq(" + i + ")").attr("content");

		} else if ($("meta:eq(" + i + ")").attr("property") == "og:image") {
			kNetwork.data.image = $("meta:eq(" + i + ")").attr("content");

		} else if ($("meta:eq(" + i + ")").attr("property") == "og:url") {
			kNetwork.data.url = $("meta:eq(" + i + ")").attr("content");
		}
	};

	if (typeof kNetwork.data.url == "undefined") {
		kNetwork.data.url = location.href.replace(location.hash, "");
	}
}

function f(url) {
	var fbsite = "https://www.facebook.com/sharer/sharer.php?u=";
	var shareURL = fbsite + (url ? url : kNetwork.data.url);
	window.open(shareURL);
}

function p(url) {
	var title = kNetwork.data.title;
	var context = kNetwork.data.description;
	var shareURL = url ? url : kNetwork.data.url;
	var image = kNetwork.data.image;
	var cut = 145 - shareURL.length - title.length - image.length;
	context = context.substr(0, cut) + "...";
	window.open("http://www.plurk.com/?qualifier=shares&status=" + encodeURIComponent(shareURL) + " (" + encodeURIComponent(title) + ") " + encodeURIComponent(context) + " " + image);
}

function t(url) {
	var title = kNetwork.data.title;
	var context = kNetwork.data.description;
	var shareURL = url ? url : kNetwork.data.url;
	var cut = 135 - shareURL.length - title.length;
	context = context.substr(0, cut) + "...";
	window.open("http://twitter.com/home/?status=" + encodeURIComponent(shareURL + " " + title + " " + context));
}

function m(url) {
	var title = kNetwork.data.title;
	var context = kNetwork.data.description;
	var shareURL = url ? url : kNetwork.data.url;
	var image = kNetwork.data.image;
	var cut = 205 - shareURL.length - title.length - image.length;
	context = context.substr(0, cut);
	var link = encodeURIComponent(shareURL) + '&title=' + encodeURIComponent(title) + '&screenshot=' + encodeURIComponent(image) + '&description=' + encodeURIComponent(context);
	window.open('http://profile.live.com/badge?url=' + link);
}

function g(url) {
	var shareURL = url ? url : kNetwork.data.url;
	var link = "https://plus.google.com/share?url=" + shareURL;
	
	window.open(link, "_blank", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600");
}
function line(url) {
    var linesite = "http://line.me/R/msg/text/?";
    var shareURL = linesite + "BMW%20i%E9%83%BD%E6%9C%83%E7%A7%BB%E5%8B%95%20%E9%AB%94%E7%8F%BE%E6%9C%AA%E4%BE%86" + encodeURIComponent(url ? url : kNetwork.data.url);
    window.open(shareURL);
}
var sendEvent = function (category, action, name) {
    
    if (typeof ga == "undefined") return
    ga('send', 'event', category, action, name);

};
var sendPage = function (page, title) {
    if (typeof ga == "undefined")return
    ga('send', 'pageview', { 'page': page, 'title': title });
};
$(kNetwork.init);