//自从我发现jQuery 写格式这么简单，我就逐渐打算抛弃css了(滑稽)
let win = $(window)
let bg2 = $("#background_2")
let index_or_not=true

//用于设置图片的大小,以及动态的改变文字大小
function set_size() {
    let index = $("#index")
    let win_width = win.width()
    let win_height = win.height()
    index.width(win_width)
    index.height(win_height)
    $("#ul").css({"width":win_width/2,"height":win_height/2,"top":0,"left":0})
    $("#ur").css({"width":win_width/2,"height":win_height/2,"top":0,"left":win_width/2})
    $("#br").css({"width":win_width/2,"height":win_height/2,"top":win_height/2,"left":win_width/2})
    $("#bl").css({"width":win_width/2,"height":win_height/2,"top":win_height/2,"left":0})
    if (index_or_not){
        $("#a").css({"width":win_width/2,"height":win_height/2,"top":0,"left":0})
        $("#b").css({"width":win_width/2,"height":win_height/2,"top":0,"left":win_width/2})
        $("#c").css({"width":win_width/2,"height":win_height/2,"top":win_height/2,"left":win_width/2})
        $("#d").css({"width":win_width/2,"height":win_height/2,"top":win_height/2,"left":0})
        let rate = 1/(15+80+15+480+15)
        let gap_a = win_height*rate*15
        let line_1_height = win_height*rate*80
        let line_2_height = win_height*rate*110
        let line_3_height = win_height*rate*60
        $("#line_1").css({"left":gap_a,"top":gap_a,"line-height":line_1_height.toString()+"px","font-size":line_1_height})
        $("#line_2").css({"left":gap_a,"top":gap_a*2+line_1_height,"line-height":line_2_height.toString()+"px","font-size":line_2_height, "width":line_2_height})
        $("#line_3").css({"left":gap_a+line_2_height+gap_a/2,"top":gap_a*1.5+line_1_height,"line-height":(line_3_height).toString()+"px","font-size":line_3_height})
        let rate_2 = win_width/1536*1.1
        $("#line_4").css({"right":rate_2*285,"bottom":220*rate_2,"transform":"scale(2.5,1)","font-size":rate_2*20,"line-height":(rate_2*20).toString()+"px"})
        $("#line_5").css({"right":rate_2*220,"bottom":220*rate_2,"transform":"scale(1,1)","font-size":rate_2*50,"line-height":(rate_2*50).toString()+"px"})
        $("#line_6").css({"right":rate_2*236.67,"bottom":20*rate_2,"transform":"scale(1.5,1)","font-size":rate_2*66.67,"line-height":(rate_2*66.67).toString()+"px"})
        $("#line_7").css({"right":rate_2*20,"bottom":220*rate_2,"transform":"scale(1,1)","font-size":rate_2*100,"line-height":(rate_2*100).toString()+"px"})
        $("#line_8").css({"right":rate_2*20,"bottom":170*rate_2,"transform":"scale(1,0.5)","font-size":rate_2*100,"line-height":(rate_2*50).toString()+"px"})
        $("#line_9").css({"right":rate_2*20,"bottom":120*rate_2,"transform":"scale(1,0.5)","font-size":rate_2*100,"line-height":(rate_2*50).toString()+"px"})
        $("#line_10").css({"right":rate_2*20,"bottom":20*rate_2,"transform":"scale(1,1)","font-size":rate_2*100,"line-height":(rate_2*100).toString()+"px"})
        let rate_3 = rate_2/1.1
        let h_gap=(win_height-rate_3*300)/2 -6*rate_3
        let w_gap=(win_width-rate_3*300)/2-6*rate_3

        $("#dian").css({"top":h_gap,"left":w_gap,"font-size":rate_3*150,"line-height":(rate_3*150).toString()+"px"})
        $("#ji").css({"top":h_gap,"right":w_gap,"font-size":rate_3*150,"line-height":(rate_3*150).toString()+"px"})
        $("#jin").css({"bottom":h_gap,"left":w_gap,"font-size":rate_3*150,"line-height":(rate_3*150).toString()+"px"})
        $("#ru").css({"bottom":h_gap,"right":w_gap,"font-size":rate_3*150,"line-height":(rate_3*150).toString()+"px"})}

    else{
        draw_line(win_width,win_height)
        $("#misaka").css({"display":"inline","top":win_height/2-655/2,"left":win_width/2-664/2,"transform":"scale(0.2,0.2)"})
        $(".title").css({"top":win_height/4-22.5,"left":(win_width/2-7*45)/2})
    }
}


//用于点击进入时的动画
function move(){
    let index = $("#index")
    let win_width = win.width()
    let win_height = win.height()
    let rate_1 = 1/(15+80+15+480+15)
    let rate_2 = win_width/1536*1.1
    let rate_3 = rate_2/1.1
    $("#line_1").animate({
        top:"-="+(win_height*rate_1*15+win_height*rate_1*80).toString()+"px",
    },"fast")

    $("#tat").children().animate({
        left:"-="+ (win_height*rate_1*15*1.5+win_height*rate_1*110+win_height*rate_1*60).toString()+"px",
    },"fast")
    $("#description").children().animate({
        bottom: "-="+(rate_2*320).toString()+"px",
        right: "-="+(rate_2*320).toString()+"px"
    })

    $("#a").animate({
        top:"-="+(win_height/2).toString()+"px",
        left:"-="+(win_width/2).toString()+"px",
    },"slow")
    $("#dian").animate({
        top:"-="+(win_height/2).toString()+"px",
        left:"-="+(win_width/2).toString()+"px",
    },"slow")
    $("#b").animate({
        top:"-="+(win_height/2).toString()+"px",
        left:"+="+(win_width/2).toString()+"px",
    },"slow")
    $("#ji").animate({
        top:"-="+(win_height/2).toString()+"px",
        right:"-="+(win_width/2).toString()+"px",
    },"slow")
    $("#c").animate({
        top:"+="+(win_height/2).toString()+"px",
        left:"+="+(win_width/2).toString()+"px",
    },"slow")
    $("#ru").animate({
        bottom:"-="+(win_height/2).toString()+"px",
        right:"-="+(win_width/2).toString()+"px",
    },"slow")
    $("#d").animate({
        top:"+="+(win_height/2).toString()+"px",
        left:"-="+(win_width/2).toString()+"px",
    },"slow")
    $("#jin").animate({
        bottom:"-="+(win_height/2).toString()+"px",
        left:"-="+(win_width/2).toString()+"px",
    },"slow",0,function (){$("#first_page").empty();index_or_not=false})
    bg2.css("z-index",300)
    draw_line(win_width,win_height)
    $("#misaka").css({"display":"inline","top":win_height/2-655/2,"left":win_width/2-664/2,"transform":"scale(0.2,0.2)"})
    $(".title").css({"top":win_height/4-22.5,"left":(win_width/2-7*45)/2})

}
//用canvas绘制分界线
function draw_line(win_width,win_height){
    let c=$("#line")
    c.width(win_width)
    c.height(win_height)
    let cxt=c[0].getContext("2d");
    let grd=cxt.createLinearGradient(0,0,150,300);
    grd.addColorStop(0,"#00eeff");
    grd.addColorStop(0.5,"#ffc5c5");
    cxt.fillStyle=grd;
    cxt.fillRect(0,75,300,1);
    cxt.fillRect(150,0,1,150);
    cxt.strokeStyle=grd
    cxt.fill()
}
//动画式alert

function MyAlert(string){
    let time = new Date().getTime()
    $("#second_page").append("<div id='"+time.toString()+"' style='position: absolute;top:10px;" +
        "background: #ff0000;left:"+(win.width()/2-string.length/2*20).toString()+"px;" +
        "font-family: Serif;font-size: 20px;padding: 5px;border-radius: 5px'><p>!"+string+"</p></div>")

    $("#"+time.toString()).animate({top:"-=47px",opacity:"30%"},700,function (){$("#"+time.toString()).remove()})
}
//用于鼠标位于其上时发射标题的动画
const title_list={"ul":["开发日记","数学笔记","杂谈随感",],"ur":["组合趣题","敬请期待","敬请期待"],"br":["随机抽老婆","酷炫敲论文","敬请期待"],"bl":["免费pr","网页模板","敬请期待"]}
function send_title(element){
    let position = element.parent().attr("id")
    let titles = title_list[position]
    $("#"+position).append("<div id='sub_title'></div>")
    $("#sub_title").append("<p id='first_float_title' class='floating_title' style='position: absolute;font-size: 30px;font-family:Serif;text-shadow: 0px 0px 15px #fff5ce,0px 0px 15px #fff5ce,0px 0px 15px #fff5ce;" +
        "top:"+(win.height()/4).toString()+"px;left:"+((win.width()/2-7*45)/2).toString()+"px'>"+titles[0]+"</p>")
    $("#sub_title").append("<p id='second_float_title' class='floating_title' style='position: absolute;font-size: 30px;font-family:Serif;text-shadow: 0px 0px 15px #fff5ce,0px 0px 15px #fff5ce,0px 0px 15px #fff5ce;" +
        "top:"+(win.height()/4).toString()+"px;left:"+((win.width()/2-7*45)/2).toString()+"px'>"+titles[1]+"</p>")
    $("#sub_title").append("<p id='third_float_title' class='floating_title' style='position: absolute;font-size: 30px;font-family:Serif;text-shadow: 0px 0px 15px #fff5ce,0px 0px 15px #fff5ce,0px 0px 15px #fff5ce;" +
        "top:"+(win.height()/4).toString()+"px;left:"+((win.width()/2-7*45)/2).toString()+"px'>"+titles[2]+"</p>")
    $("#first_float_title").animate({top:"-=100",left:"-=50"})
    $("#second_float_title").animate({top:"-=150",left:"+=270"})
    $("#third_float_title").animate({top:"+=130",left:"+=180"})
}
//用于鼠标离开时收回标题
function back_title(){
    $("#sub_title").remove()
}
$(function () {
    set_size()
    $("#enter").click(function (){
        move()
    })
    $(".enlarge1").hover(function (){
        $(this).css("transform","scale(1.1,1.1)")
        send_title($(this))
    },
    function (){
        $(this).css("transform","scale(1,1)")
        back_title()
    console.log("finished")})
    $(".enlarge2").hover(function (){
            $(this).css("transform","scale(0.25,0.25)")
        },
        function (){$(this).css("transform","scale(0.2,0.2)")})
    $("#misaka").click(function (){MyAlert("禁止调戏御坂妹")})
    $("#blog").click(function (){window.location.href="blog/index.html"})
    win.resize(function () {
        set_size()
    })
});

