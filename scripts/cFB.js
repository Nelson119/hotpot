///<reference path="http://connect.facebook.net/zh_TW/all.js" />

var appID = "440633796061181" //ofline:440633986061162 //online:440633796061181  

var scopes = "email";

$(function () {
    if ($('#fb-root').get(0) == undefined) {
        var root = $("<div id='fb-root'>");
        root.appendTo($('body'));
    }
    $.getScript('//connect.facebook.net/zh_TW/sdk.js', function () {
        initFB()
    });
})
function initFB() {
    FB.init({
        appId: appID,
        xfbml: true,
        version: 'v2.5',
        scope:scopes
    }, { scope: scopes });
    FB.Canvas.setAutoGrow(true);
    cFB.getLoginStatus(function (r) { (r == false) ? cFB.isLogin = false : cFB.isLogin = true; })
    FB.Event.subscribe("edge.create", function (r) {
        if (typeof Stage.likeEnd == 'function') {
            Stage.likeEnd();
        }
    });
   cFB.initStatus = true;
}

function cFB() { };
cFB.accessToken = "";
cFB.userID = "";
cFB.userName = "";
cFB.gender = "";
cFB.email = "";
cFB.albumArray = [];
cFB.albumNum = 0;
cFB.albumTotal = 0;
cFB.fanscallback;
cFB.fanscallbackdata = {};
cFB.initStatus = false;
cFB.isLogin = false;
cFB.login = function (callback,data) {
    if (typeof callback != "function") {
        return;
    }
    FB.login(function (response) {
        if (response.authResponse) {
            cFB.accessToken = response.authResponse.accessToken;
            cFB.userID = response.authResponse.userID;
            var penis = {};

            for (var arg in response.authResponse) {
                penis[arg] = response.authResponse[arg];
            }
            callback(penis);
        } else {
            callback("error");
        }

    }, { scope: scopes, return_scopes: true })
}

cFB.hasPermission = function (callback) {
    var scope = "user_likes"; //要檢查的權限
    FB.api({ method: 'users.hasAppPermission', ext_perm: scope}, 
    function (status) {
        if (status == "1") {
            callback(1)
        } else {                     
            callback(-1)
        } 
    }) 
}

cFB.getLoginStatus = function (callback) {
    if (typeof callback != "function") callback = function (response) { };
    FB.getLoginStatus(function (response) {
        if (response.authResponse) {
            cFB.userID = response.authResponse.userID;
            cFB.accessToken = response.authResponse.accessToken;
            cFB.getName(function () { });
            callback(response.authResponse);
        } else {
            callback(false);
        }
    })
}
cFB.getName = function (callback) {
    FB.api('/me', { fields: 'name,email' }, function (response) {
        cFB.userName = response.name;
        cFB.email = response.email;
        callback(response);
    });
}
cFB.share = function (_link, callback) {
    if (typeof callback != "function") callback = function (response) { };
    var shareBool = false;
    FB.ui({
        method: 'share',
        href: _link,
    }, function (response) {
        if (typeof response == "undefined" || response == undefined || typeof response != "undefined" && typeof response.error_code != "undefined") {
            shareBool = false;
        } else {
            shareBool = true;
        }
        callback(shareBool);
    })
}


cFB.post = function (_link, _caption, pic,_description,_name,callback) {
    var _display;
    if(Root){
        Root.detectBrowser();
        if (Root.mobile) {
            _display = 'touch';
        } else {
            _display = 'dialog';
        }
    }
    FB.ui({
        method: 'feed',
        link: _link,
        caption: _caption,
        picture: pic,
        description: _description,
        name: _name,
        display: _display
    }, function (response) { callback(response); });
}


cFB.getAlbum = function (callback) {
	if(cFB.albumArray.length!=0){
		callback(cFB.albumArray);
	}else{
		FB.api("/me/albums", "GET", { limit: 500 }, function (response) {
			cFB.albumTotal = response.data.length;
			for (var i = 0; i < response.data.length; i++) {
				cFB.albumArray.push(response.data[i])
				cFB.getAlbumPhotos(callback,i);
			}
		});
	}
}
cFB.getAlbumPhotos = function (callback,n) {
    FB.api("/" + cFB.albumArray[n].id + "/photos", "GET", { limit: 500 }, function (response) {
        cFB.albumArray[n].photos = response.data;
        if (response.data.length != 0) {
            for (var i = 0; i < response.data.length; i++) {
                if (response.data[i].id == cFB.albumArray[n].cover_photo) {
                    cFB.albumArray[n].coverUrl = response.data[i].picture
                }
                if (i == response.data.length - 1) {
                    cFB.albumNum++;
                    if (cFB.albumNum == cFB.albumTotal) {
                        callback(cFB.albumArray);
                    }
                }
            }
        } else {
            cFB.albumNum++;
            if (cFB.albumNum == cFB.albumTotal) {
                callback(cFB.albumArray);
            }
        }
    })  
}

cFB.logout = function () { }
cFB.PostFeed = function () { }
cFB.getFriend = function () { }
cFB.getPhoto = function () { }

function cFlash() { }
cFlash.call=function(method,callback,data){
	try {flash = document.getElementById("my_flash");
	} catch (error) {}
	cFlash[callback] = function (data) {flash[callback](data);};
	cFB[method](cFlash[callback],data);
}
