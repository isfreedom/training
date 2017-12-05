$(document).ready(function() {
    FastClick.attach(document.body);
    $(".choose a").each(function () {
       $(this).click(function () {
          $(this).addClass("show").siblings().removeClass("show");
       });
    });
    $(".submit").click(function () {
        var txt=$(".txt").val();
        var show=$(".choose").find(".show").length;
        if(txt != "" && show!=0){
            $(this).parents(".animated").addClass("slideOutRight").removeClass("slideInRight");
            MX.tip("评论成功");
        }
        else if(show == 0){
            MX.tip("请选择等级");
        }
        else if(txt == ""){
            MX.tip("请填写评语");
            $(".txt").focus();
        }

    });
    $(".can").click(function () {
        $(".write").removeClass("slideOutRight").addClass("slideInRight").show();
    });
    $(".see").click(function () {
        $(".has-comment").removeClass("slideOutRight").addClass("slideInRight").show();
    });
    $(".return").click(function () {
       $(this).parents(".animated").addClass("slideOutRight");
    });
});
