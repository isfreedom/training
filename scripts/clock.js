$(document).ready(function() {
    // 获取当前时间
    var date=new Date();
    var hours=date.getHours();
    var Minutes=date.getMinutes();
    if (Minutes >= 0 && Minutes <= 9) {
        Minutes = "0" + Minutes;
    }
    $(".current").find("span").text(hours+":"+Minutes);
    $(".clock").click(function () {
       $(".current").html("<span class='animated zoomIn'>打卡成功！</span>");
       $(this).text("关闭");
    });
});