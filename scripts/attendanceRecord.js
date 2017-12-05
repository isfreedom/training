$(document).ready(function () {

    var page=1;
    var finished=0;
    var sover=0;

    //如果屏幕未到整屏自动加载下一页补满
    var setdefult=setInterval(function (){
        if(sover==1)
            clearInterval(setdefult);
        else if($(".schedule").height()<$(window).height())
            loadmore($(window));
        else
            clearInterval(setdefult);
    },500);

    //加载完
    function loadover(){
        if(sover==1)
        {
            var overtext="";
            $(".loadmore").remove();
            if($(".loadover").length>0)
            {
                $(".loadover span").eq(0).html(overtext);
            }
            else
            {
                var txt='<div class="loadover"><span>'+overtext+'</span></div>'
                $(".wrapper").append(txt);
            }
        }
    }

    //加载更多
    var vid=0;
    function loadmore(obj){
        if(finished==0 && sover==0)
        {
            var scrollTop = $(obj).scrollTop();
            var scrollHeight = $(document).height();
            var windowHeight = $(obj).height();

            if($(".loadmore").length==0)
            {
                var txt='<div class="loadmore"><span class="loading"></span>加载中..</div>'
                $(".wrapper").append(txt);
            }

            if (scrollTop + windowHeight -scrollHeight<=50 ) {
                //此处是滚动条到底部时候触发的事件，在这里写要加载的数据，或者是拉动滚动条的操作


                //防止未加载完再次执行
                finished=1;
                var content = "";
                var result = "";
                for(var i = 0; i < 1; i++){
                    vid++;
                    if(i==2i){
                        content='<li class="room">' +
                            '<div class="clearfix"><div class="total">' +
                                '<div class="name">专题名称写在这里</div>' +
                                '<div class="time">打卡时间：<span>9：30</span></div>'+
                            '</div></div>'+
                            '</li>';
                    }
                    else if(i=2i+1){
                        content='<li class="room">' +
                            '<div class="clearfix"><div class="total">' +
                            '<div class="name">专题名称写在这里</div>' +
                            '<div class="time">打卡时间：<span>9：30</span></div>'+
                            '</div></div>'+
                            '</li>';
                    }
                    result+=content;

                }
                setTimeout(function(){
                    //$(".loadmore").remove();
                    $('.schedule ul').append(result);
                    page+=1;
                    finished=0;
                    //最后一页
                    if(page==6)
                    {
                        sover=1;
                        loadover();
                    }
                },1000);
                /*$.ajax({
                 type: 'GET',
                 url: 'json/more.json?t=25&page='+page,
                 dataType: 'json',
                 success: function(data){
                 if(data=="")
                 {
                 sover = 1;
                 loadover();
                 if (page == 1) {
                 $("#no_msg").removeClass("hidden");
                 $(".loadover").remove();
                 }
                 }
                 else
                 {
                 var result = ''
                 for(var i = 0; i < data.lists.length; i++){
                 result+='<div class="evaluation">'+
                 '<div class="eva-name clearfix">'+
                 '<span class="left">房东：匿名</span><span class="right"><span class="star"></span></span>'+
                 '</div>'+
                 '<div class="evaluat-con">'+
                 '辛苦了，谢谢鹿阿姨'+
                 '</div>'+
                 '<div class="evaluat-time">'+
                 '2017.10.1 20:42'+
                 '</div>'+
                 '</div>'

                 // 为了测试，延迟1秒加载
                 setTimeout(function(){
                 $(".loadmore").remove();
                 $('.prolist').append(result);
                 page+=1;
                 finished=0;
                 //最后一页
                 if(page==10)
                 {
                 sover=1;
                 loadover();
                 }
                 },1000);
                 }
                 },
                 error: function(xhr, type){
                 alert('Ajax error!');
                 }
                 });*/
            }
        }
    }
    //页面滚动执行事件
    $(window).scroll(function (){
        loadmore($(this));
    });
});