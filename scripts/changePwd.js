$(document).ready(function () {
    $(".has").each(function () {
        $(this).keyup(function () {
            var getCode=$(".fill-code").val();
            var getPwd=$(".fill-pwd").val();
            var getGrap=$(".fill-grap").val();
            if(getCode!="" && getPwd!="" && getGrap!=""){
                $(".save").addClass("not-null");
                $(".save").click(function () {
                    $.toast("保存成功");
                });
            }
        });
    });
//    获取验证码
    //获取短信验证码
    var validCode=true;
    $(".getCode").click (function  () {
        var time=60;
        var $code=$(this);
        if (validCode) {
            validCode=false;
            var t=setInterval(function  () {
                time--;
                $code.html(time+"秒");
                if (time==0) {
                    clearInterval(t);
                    $code.html("重新获取");
                    validCode=true;
                }
            },1000)
        }
    });
});