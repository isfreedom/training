$(document).ready(function () {
    $(".a-back").click(function () {
        goback();
    });
    function goback(){
        window.history.go(-1);
    }
});