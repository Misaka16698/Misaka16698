function set_img(){
    $(".category").each(function (i,dom){
        let pic_width = $(dom).find("img:first").width()
        let  pic_height = $(dom).find("img:first").height()
        let height = 280
        let div_width = $(dom).width()
        if(div_width/pic_width*pic_height<height){
            $(dom).css("overflow","hidden")
            $(dom).find("img:first").css({"position":"relative","right":pic_width/2-div_width/2})
        }
        else{
            $(dom).css("text-align","center")
            $(dom).find("img:first").css("height",height+"px")
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