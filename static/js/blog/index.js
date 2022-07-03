const pic_width = $(".pic").find("img:first").width()
const pic_height = $(".pic").find("img:first").height()
function set_img(){
    let height = 180
    let div_width = $(".passage_info").width()*0.3
    if(div_width/pic_width*pic_height<height){
        $(".pic").find("img:first").css("width","100%")
    }
    else{
        $(".pic").css("text-align","center")
        $(".pic").find("img:first").css("height",height+"px")
    }
}
$(function (){
        set_img()
        $(window).resize(function (){
                set_img()
            }
        )
    }
)