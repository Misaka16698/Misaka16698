function set_img(){
    let height = $(window).height()*0.6
    let div_width = $("#body").width()
    let pic_width = $("#body").find("img:first").width()
    let pic_height = $("#body").find("img:first").height()
    console.log(height,div_width,pic_width,pic_height)
    if(div_width/pic_width*pic_height<height){
        $("#body").find("img:first").css("width","100%")
        console.log("aaa")
    }
    else{
        $("#body").find("p:first").css("text-align","center")
        $("#body").find("img:first").css("height",height+"px")
        console.log("bbb")
    }
}
$(function (){
    set_img()
    }
)