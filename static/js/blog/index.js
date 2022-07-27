
function set_img(){
    $(".passage_info").each(function (i,dom){
        let pic_width = $(dom).find("img:first").width()
        let  pic_height = $(dom).find("img:first").height()
        let height = 180
        let div_width = $(dom).width()*0.3
        $(dom).children(":first").css("width", $(dom).width()*0.3)
        if(div_width/pic_width*pic_height<height){
            $(dom).children(":first").css("overflow","hidden")
            $(dom).children(":first").find("img:first").css({"position":"relative","right":pic_width/2-div_width/2})
        }
        else{
            $(dom).children(":first").css("text-align","center")
            $(dom).children(":first").find("img:first").css("height",height+"px")
        }
    })

}
$(function (){
    set_img()
    $(window).resize(function (){
            set_img()
        }
    )
})