
var MX = {
    replaceall: function replaceall(obj, str1, str2) {
        var result = obj.replace(eval("/" + str1 + "/gi"), str2);
        return result;
    },
    check: function (value) {
        if (value == null || value == '' || value == undefined) {
            return false;
        }
        return true;
    },
    IsMobile: function (mobile) {
        var reg = /^1(3|4|5|7|8)\d{9}$/
        return reg.test(mobile)
    },

    IsWeiXin: function () {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    },

    loading: function (msg) {//m毫秒后自动关闭
        return layer.open({
            type: 2,
            content: msg,
            shadeClose: false
        });
    },
    hideLoading: function (index) {//关闭加载中
        if (index) {
            layer.close(index);
        } else {
            layer.closeAll()
        }
    },

    tip: function (msg) {//msg 提示内容，duration 显示时间 默认1500 毫秒
        layer.open({
            content: msg,
            skin: 'msg',
            time: 3
        });
    },
    confirm: function (msg, okFn, cancelFn) {//msg 显示内容，okFn 确认回调函数，cancelFn 取消回调函数
        //询问框
        layer.open({
            content: msg
          , btn: ['是', '否']
          , yes: function (index) {
              layer.close(index);
              okFn();
          }
        });

    },
    alert: function (msg) {
        layer.open({
            content: msg,
            btn: '确定'
        });
    },
    querystr: function (_s) {
        var _u = window.location.href.replace("#", "");
        var _rs = new RegExp("(^|[\&\?])" + _s + "=([^\&]*)(\&|$)", "gi").exec(_u), tmp;
        if (tmp = _rs) return tmp[2];
        return "";
    },
    showBus: function (result, defaultmsg) {
        if (result == null || result == undefined || result.ReturnCode == '202' || (result.ReturnCode == '201' && this.check(!result.ErrorMsg))) {
            this.tip(defaultmsg);
        } else {
            if (result.ReturnCode == '201') {
                this.tip(result.ErrorMsg);
            }
                //没有登录
            else if (result.ReturnCode == '203') {
                this.tip("该会员未登录");

                var url = result.Data, loginUrl = "/Member/Login";
                if (this.check(url)) {
                    loginUrl = "/Member/Login?url=" + this.replaceall(url, 'amp;', '');
                }
                window.location.href = loginUrl;

            }

                //没有登录
            else if (result.ReturnCode == '205') {
                this.tip("该业主未登录");
                var url = result.Data, loginUrl = "/Owner/Login";
                if (this.check(url)) {
                    loginUrl = "/Owner/Login?url=" + this.replaceall(url, 'amp;', '');
                }
                window.location.href = loginUrl;
            }
                //没有登录
            else if (result.ReturnCode == '206') {
                this.tip("该管家未登录");
                var url = result.Data, loginUrl = "/Waiter/Login";
                if (this.check(url)) {
                    loginUrl = "/Waiter/Login?url=" + this.replaceall(url, 'amp;', '');
                }
                window.location.href = loginUrl;
            }
        }
    },

    IsLogin: function (result) {
        try {
            var _d = JSON.parse(result);
            if (_d != undefined && !_d.Result) {
                if (_d.ReturnCode == '203') {
                    var url = _d.Data, loginUrl = "/Member/Login";
                    if (this.check(url)) {
                        loginUrl = "/Member/Login?url=" + this.replaceall(url, 'amp;', '');
                    }
                    window.location.href = loginUrl;
                    return true;
                }
                if (result.ReturnCode == '205') {
                    var url = result.Data, loginUrl = "/Owner/Login";
                    if (this.check(url)) {
                        loginUrl = "/Owner/Login?url=" + this.replaceall(url, 'amp;', '');
                    }
                    window.location.href = loginUrl;
                    return true;
                }

            }
        } catch (e) {

        }
    },
    getFomartData: function (value) {
        var exdate = new Date();
        var data = JSON.parse(value);
        if (data && data['expires'] > exdate.getTime()) {
            return data['value'];
        }
        return '';
    },
    fomartData: function (value, exMinutes) {
        if (!exMinutes) exMinutes = set_exMinutes;
        var exdate = new Date();
        var expires = exdate.setMinutes(exdate.getMinutes() + parseInt(exMinutes));
        var value = { 'expires': expires, 'value': value };
        var value = JSON.stringify(value);
        return value;
    }
}


//给日期添加一个新增天数的方法
Date.prototype.addDay = function (value) {
    this.setDate(this.getDate() + value);
    return this;
}

//字符串转日期
String.prototype.toDate = function () {
    return new Date(this.replace(/-/g, "/").replace(/(^\s*)|(\s*$)/g, ""));
}

//格式化日期
Date.prototype.Format = function (formatStr) {
    var str = formatStr;
    var currMonth = this.getMonth() + 1;
    var currYear = this.getFullYear();
    var currDay = this.getDate();
    str = str.replace(/yyyy|YYYY|yy|YY/, currYear);
    str = str.replace(/MM/, currMonth > 9 ? currMonth.toString() : '0' + currMonth);
    str = str.replace(/dd|DD/, currDay > 9 ? currDay.toString() : '0' + currDay);
    return str;
}


//日期计算
Date.prototype.DateAdd = function (strInterval, Number) {
    var dtTmp = this;
    switch (strInterval) {
        case 'd':
            return new Date(Date.parse(dtTmp) + (86400000 * Number));
        case 'w':
            return new Date(Date.parse(dtTmp) + ((86400000 * 7) * Number));
        case 'm':
            return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
        case 'y':
            return new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
    }
}
Date.prototype.DateDiff = function (_d) {
    var aDate, oDate1 = this, oDate2 = _d, iDays
    aDate = oDate1.toArray();
    oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])    //转换为12-18-2006格式  
    aDate = oDate2.toArray();
    oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
    //把相差的毫秒数转换为天数 
    iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24)
    return iDays
}

//+--------------------------------------------------- 
//| 把日期分割成数组 
//+--------------------------------------------------- 
Date.prototype.toArray = function () {
    var myDate = this;
    var myArray = Array();
    myArray[0] = myDate.getFullYear();
    myArray[1] = myDate.getMonth();
    myArray[2] = myDate.getDate();
    myArray[3] = myDate.getHours();
    myArray[4] = myDate.getMinutes();
    myArray[5] = myDate.getSeconds();
    return myArray;
}


//自定义的键值对
function Dictionary() {
    this.data = new Array();

    this.put = function (key, value) {
        this.data[key] = value;
    };

    this.get = function (key) {
        return this.data[key];
    };

    this.remove = function (key) {
        this.data[key] = null;
    };

    this.isEmpty = function () {
        return this.data.length == 0;
    };

    this.size = function () {
        return this.data.length;
    };
}


Date.prototype.Format = function (fmt) { //author: meizz  
    var o = {
        "M+": this.getMonth() + 1, //月份  
        "d+": this.getDate(), //日  
        "h+": this.getHours(), //小时  
        "m+": this.getMinutes(), //分  
        "s+": this.getSeconds(), //秒  
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度  
        "S": this.getMilliseconds() //毫秒  
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

String.prototype.format = function () {
    if (arguments.length == 0) return this;
    for (var s = this, i = 0; i < arguments.length; i++)
        s = s.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i]);
    return s;
};