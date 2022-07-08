const pic_width = $("#body").find("img:first").width()
const pic_height = $("#body").find("img:first").height()
function set_size(){
    let height = $(window).height()*0.6
    let div_width = $("#body").width()
    if(div_width/pic_width*pic_height<height){
        $("#body").find("img:first").css("width","100%")
    }
    else{
        $("#body").find("p:first").css("text-align","center")
        $("#body").find("img:first").css("height",height+"px")
    }
}
function set_tag(){
    const tag_list = $("meta[name='keywords']").attr("content").split(",")
    const category = $("meta[name='category']").attr("content")
    const create_time = $("meta[name='create_time']").attr("content")
    let tag_text=""
    for(let i in tag_list){
       tag_text+= "<span class='icon-price-tag tag'>"+ tag_list[i]+"</span>"
    }
    $("h1").after("<div id='tag_list'>" +tag_text+
        "<span class='icon-book' style='margin: 5px' onclick='window.location.href=\"../category/"+category+".html\"'>"+category+"</span>"+"<br>" +
        "<span class='icon-history'>写于</span>"+create_time+""+
        "</div>")
}
$(function (){
    set_size()
    set_tag()
    $(window).resize(function (){
        set_size()
        }
    )
    }
)