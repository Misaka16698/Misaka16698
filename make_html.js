const path = require('path')
const fs = require('fs')
const vm = require('vm')
const {marked} = require('marked')

fs.readdir("blog/resource",(err,data)=>{
    for(let i in data){
        fs.readFile("blog/resource/"+data[i],'utf8', (err,data_2) =>{
            let turned_js=marked(data_2)
            let title = turned_js.split("h1")[1].split(">")[1].split("<")[0]
            let new_html = "<!DOCTYPE html>\n" +
                "<html lang=\"en\">\n" +
                "<head>\n" +
                "    <meta charset=\"UTF-8\">\n" +
                "    <title>"+title+"</title>\n" +
                "    <script src=\"https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js\"></script>\n" +
                "    <script src=\"../../static/js/blog/index.js\"></script>\n" +
                "    <link rel=\"stylesheet\" href=\"../../static/css/blog/blog.css\">\n" +
                "    <link rel=\"stylesheet\" href=\"../../static/css/blog/module.css\">\n" +
                "<link rel=\"stylesheet\" \n" +
                "          href=\"//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/default.min.css\">\n" +
                "    <script src=\"//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/highlight.min.js\"></script>\n"+
                "</head>\n" +
                "<body>\n" +
                "<div id=\"head\">\n" +
                "    <img id=\"logo\" src=\"../../static/img/misaka16899.png\">\n" +
                "    <p id=\"logo_title\">御坂16899</p>\n" +
                "    <div id=\"left_side\">\n" +
                "        <span onclick=\"window.location.href='../index.html'\" class=\"icon-home3\"> 个人主页</span>\n" +
                "        <span onclick=\"window.location.href=''\" class=\"icon-home\"> 博客主页</span>\n" +
                "        <span onclick=\"window.location.href=''\" class=\"icon-search\"> 搜索</span>\n" +
                "        <span onclick=\"window.location.href=''\" class=\"icon-books\"> 分类</span>\n" +
                "        <span onclick=\"window.location.href=''\" class=\"icon-info\"> 关于</span>\n" +
                "    </div>\n" +
                "</div>\n" +
                "\n" +
                "<div id=\"body\">\n" +
                "\n" + marked(data_2)+
                "</div>\n" +
                "<div id=\"foot\">\n" +
                "    <p>Copyright 2022/6/29 by 小崔</p>\n" +
                "</div>\n" +
                "<script>hljs.highlightAll();</script>\n"+
                "</body>\n" +
                "</html>"
            fs.writeFile("blog/public/"+data[i].substring(0,data[i].length-3)+".html",new_html,{flag:"w+"},(err) =>{
                if(err){
                    console.error(err)
                }
                else{
                    console.log("已写入"+data[i].substring(0,data[i].length-3)+".html")
                }
            })
        })
    }

})

