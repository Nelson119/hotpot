/**
 * version 1.4.6
 *
 * date 2014.4.29
 *
 * @author kisspowpow
 */

var Root = {};
//Device const
Root.IPHONE = "iPhone";
Root.IPAD = "iPad";
Root.ANDROID = "Android";
Root.ANDROIDTABLET = "AndroidTablet";
Root.WINDOWSPHONE = "WindowsPhone";
Root.PC = "PC";
//Browser const
Root.IE6 = "IE6";
Root.IE7 = "IE7";
Root.IE8 = "IE8";
Root.IE9 = "IE9";
Root.IE10 = "IE10";
Root.IE11 = "IE11";
Root.CHROME = "Chrome";
Root.FIREFOX = "FF";
Root.SAFARI = "Safari";
Root.OPERA = "Opera";
//System const
Root.MICROSOFT = "microsoft";
Root.APPLE = "apple";
Root.GOOGLE = "google";
//User info
Root.browser = "";
Root.device = "";
Root.mobile = false;
Root.system = "";
Root.target = window;
Root.pointer = false;

Root.detectBrowser = function () {
    var userAgent = navigator.userAgent;
    if (/iPhone/i.test(userAgent)) {
        Root.browser = Root.SAFARI;
        Root.device = Root.IPHONE;
        Root.system = Root.APPLE;
        Root.mobile = true;
    }
    else if (/iPad/i.test(userAgent)) {
        Root.browser = Root.SAFARI;
        Root.device = Root.IPAD;
        Root.system = Root.APPLE;
        Root.mobile = true;
    }
    else if (/Android/i.test(userAgent) && /mobile/i.test(userAgent)) {
        Root.browser = Root.CHROME;
        Root.device = Root.ANDROID;
        Root.system = Root.GOOGLE;
        Root.mobile = true;
    }
    else if (/Android/i.test(userAgent)) {
        Root.browser = Root.CHROME;
        Root.device = Root.ANDROIDTABLET;
        Root.system = Root.GOOGLE;
        Root.mobile = true;
    }
    else if (/Windows Phone/i.test(userAgent) && /rv:11/i.test(userAgent)) {
        Root.browser = Root.IE11;
        Root.device = Root.WINDOWSPHONE;
        Root.System = Root.MICROSOFT;
        Root.mobile = true;
    }
    else if (/Windows Phone/i.test(userAgent) && /MSIE 10/i.test(userAgent)) {
        Root.browser = Root.IE10;
        Root.device = Root.WINDOWSPHONE;
        Root.System = Root.MICROSOFT;
        Root.mobile = true;
    }
    else if (/Windows Phone/i.test(userAgent) && /MSIE 9/i.test(userAgent)) {
        Root.browser = Root.IE9;
        Root.device = Root.WINDOWSPHONE;
        Root.system = Root.MICROSOFT;
        Root.mobile = false;
    }
    else if (/MSIE 6/i.test(userAgent)) {
        Root.browser = Root.IE6;
        Root.device = Root.PC;
        Root.system = Root.MICROSOFT;
        Root.mobile = false;
    }
    else if (/MSIE 7/i.test(userAgent)) {
        Root.browser = Root.IE7;
        Root.device = Root.PC;
        Root.system = Root.MICROSOFT;
        Root.mobile = false;
    }
    else if (/MSIE 8/i.test(userAgent)) {
        Root.browser = Root.IE8;
        Root.device = Root.PC;
        Root.system = Root.MICROSOFT;
        Root.mobile = false;
    }
    else if (/MSIE 9/i.test(userAgent)) {
        Root.browser = Root.IE9;
        Root.device = Root.PC;
        Root.system = Root.MICROSOFT;
        Root.mobile = false;
    }
    else if (/MSIE 10/i.test(userAgent)) {
        Root.browser = Root.IE10;
        Root.device = Root.PC;
        Root.system = Root.MICROSOFT;
        Root.mobile = false;
    }
    else if (/rv:11/i.test(userAgent)) {
        Root.browser = Root.IE11;
        Root.device = Root.PC;
        Root.system = Root.MICROSOFT;
        Root.mobile = false;
    }
    else if (/Firefox/i.test(userAgent)) {
        Root.browser = Root.FIREFOX;
        Root.device = Root.PC;
        Root.system = Root.PC;
        Root.mobile = false;
    }
    else if (/Chrome/i.test(userAgent)) {
        Root.browser = Root.CHROME;
        Root.device = Root.PC;
        Root.system = Root.MICROSOFT;
        Root.mobile = false;
    }

    if (Root.browser == Root.IE10 && userAgent.match(/Touch/i)) {
        Root.pointer = true;
    }
    if (Root.browser == Root.IE11 && userAgent.match(/Touch/i)) {
        Root.pointer = true;
    }
}

Root.detectWindowsTouch = function () {
    if (window.PointerEvent && (navigator.msMaxTouchPoints || navigator.maxTouchPoints)) {
        return true;
    } else if (window.MSPointerEvent && (navigator.msMaxTouchPoints || navigator.maxTouchPoints)) {
        return true;
    } else {
        return false;
    }
};


// setCookie(name), getCookie(name), deleteCookie(name)
Root.cookieData = {};
Root.setCookie = function (name, value, minutes) {
    if (minutes) {
        var date = new Date();
        date.setTime(date.getTime() + (minutes * 60 * 1000));
        var expires = "";
        expires = "" + date.toGMTString();
    } else {
        var expires = "";
    }
    document.cookie = name + "=" + encodeURIComponent(value) + "; expires=" + expires;
}

Root.getCookie = function (name) {
    var cookie = document.cookie;
    var pairs = cookie.split(";");
    var cookieData = {};
    for (var i = 0; i < pairs.length; i++) {
        var group = pairs[i].split("=");
        var attr = group[0].replace(/^[\s]*|[\s]*$/g, "");
        var value = group[1];
        cookieData[attr] = value;
    }
    Root.cookieData = cookieData;
    return decodeURIComponent(cookieData[name]);
}

Root.deleteCookie = function (name) {
    Root.setCookie(name, "", -60 * 24);
}



//# titleCase, getParams
Root.titleCase = function (string) {
    return string.replace(/\w\S*/g, function (input) { return input.charAt(0).toUpperCase() + input.substr(1).toLowerCase(); });
}


Root.getParams = function () {
    if (location.search == '') {return '' }
    var data = {};
    var url = location.search.split('?')[1]
    var paramString = url;
    var paramArray = paramString.split("&");
    var total = paramArray.length;

    for (var i = 0; i < total; i++) {
        var pair = paramArray[i];
        var key = Root.getKey(pair);
        var value = Root.getValue(pair);
        data[key] = value;
    }

    return data;
}

Root.getKey = function (string) {
    var key = string.match(/^[^=]+/i)[0];
    return key;
}

Root.getValue = function (string) {
    var value = string.match(/[^=]+$/i)[0];
    return value;
}


//# Verify Phone, Email, Invoice
Root.verifyPhone = function (phone) {
    phoneReg = /(^[0]\d{1}\d{6,8}$)|(^[0]\d{2}\d{6,7}$)|(^[0]\d{3}\d{6}$)|(^09([0-9]){8})$/i;
    return phoneReg.test(phone);
};

Root.verifyEmail = function (email) {
    emailReg = /^([a-zA-Z0-9]+)(([a-zA-Z0-9]+)|([_\-\.][a-zA-Z0-9]+))+@((([a-zA-Z0-9]+)|([a-zA-Z0-9]+_[a-zA-Z0-9]+)|[a-zA-Z0-9]+\-[a-zA-Z0-9]+)\.)+([a-zA-Z0-9]{2,4})$/i;
    return emailReg.test(email);
};

Root.verifyTB=function(idvalue) { 
    var tmp = new String("12121241"); 
    var sum = 0; 
    re = /^\d{8}$/; 
    if (!re.test(idvalue)) { 
        return false; 
    } 
    for (t=0; t< 8; t++) { 
        s1 = parseInt(idvalue.substr(t,1)); 
        s2 = parseInt(tmp.substr(t,1)); 
        sum += cal(s1*s2); 
    } 
    if (!valid(sum)) { 
        if (idvalue.substr(6,1)=="7") return(valid(sum+1)); 
  }  
    return(valid(sum)); 
} 
function valid(n) { 
    return (n%10 == 0)?true:false; 
} 
function cal(n) { 
    var sum=0; 
    while (n!=0) { 
        sum += (n % 10); 
        n = (n - n%10) / 10;  // 取整數 
    } 
    return sum; 
}
Root.verifyInvoice = function (invoice) {
    invoiceReg = /^[a-zA-Z]{2}\d{8}/;
    return invoiceReg.test(invoice);
};