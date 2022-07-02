const path = require('path')
const fs = require('fs')
const vm = require('vm')
const {marked} = require('marked')
const cheerio = require("cheerio")
//用于将md转化为html
function md2html(file_name,to_path, origin_name){
    let pro =new Promise(function (resolve, reject){
        fs.readFile(file_name,'utf8', (err,data_2) =>{
            let turned_js=marked(data_2)
            let title = turned_js.split("h1")[1].split(">")[1].split("<")[0]
            let new_html = "<!DOCTYPE html>\n" +
                "<html lang=\"en\">\n" +
                "<head>\n" +
                "    <meta charset=\"UTF-8\">\n" +
                "    <title>"+title+"</title>\n" +
                "    <script src=\"https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js\"></script>\n" +
                "    <script src=\"../../static/js/blog/passage.js\"></script>\n" +
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
            fs.writeFile(to_path,new_html,{flag:"w+"},(err) =>{
                if(err){
                    console.error(err)
                    reject()
                }
                else{
                    console.log("已写入"+to_path)
                    description = upload_description(origin_name,description,new_html)
                    resolve()
                }
            })
        })
    })
    return pro
}
function change_passage_code(data, passage_name){
    data["passage_status"][passage_name] = 1
    fs.writeFile("make_html.json", JSON.stringify(data), {flag:"w+"},(err) =>{
        if(err){
            console.error(err)
        }
    })
}
function write_description(description){
    let prom = new Promise(function (resolve, reject){
        fs.writeFile("description.json",JSON.stringify(description),{flag: "w+"}, (err)=>{
            if(err){console.err(err)}
            else{console.log("已经更新description.json文档")}
        })
    })
    return prom
}
function upload_description(file_name,description,html){
    let $ = cheerio.load(html)
    description[file_name.substring(0,file_name.length-3)+".html"] = $("#body").text().replace(/[\r\n]/g,"");
    return description
}
function make_index(index_list, description){
    let passage_info =""
    for(let i in index_list){
        passage_info +=
        "            <div class=\"passage_info\" onclick='window.location.href=\"public/"+index_list[i]+"\"'>\n" +
        "                <div class=\"pic\">\n" +
        "                    <img src=\"../static/img/blog/"+index_list[i].split(".")[0] +".png\">\n" +
        "                </div>\n" +
        "                <div class=\"info\">\n" +
        "                    <p class=\"title1\">"+index_list[i].split(".")[0]+"</p>\n" +
        "                    <p>"+description[index_list[i]].substring(0,100)+"</p>\n" +
        "                </div>\n" +
        "            </div>\n"
    }
    let text = "<!DOCTYPE html>\n" +
        "<html lang=\"en\">\n" +
        "<head>\n" +
        "    <meta charset=\"UTF-8\">\n" +
        "    <title>小崔的博客主页</title>\n" +
        "    <script src=\"https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js\"></script>\n" +
        "    <script src=\"../static/js/blog/passage.js\"></script>\n" +
        "    <link rel=\"stylesheet\" href=\"../static/css/blog/index.css\">\n" +
        "    <link rel=\"stylesheet\" href=\"../static/css/blog/blog.css\">\n" +
        "</head>\n" +
        "<body>\n" +
        "    <div id=\"head\">\n" +
        "        <img id=\"logo\" src=\"../static/img/misaka16899.png\">\n" +
        "        <p id=\"logo_title\">御坂16899</p>\n" +
        "        <div id=\"left_side\">\n" +
        "            <span onclick=\"window.location.href='../index.html'\" class=\"icon-home3\"> 个人主页</span>\n" +
        "            <span onclick=\"window.location.href='index.html'\" class=\"icon-home\"> 博客主页</span>\n" +
        "            <span onclick=\"window.location.href=''\" class=\"icon-search\"> 搜索</span>\n" +
        "            <span onclick=\"window.location.href=''\" class=\"icon-books\"> 分类</span>\n" +
        "            <span onclick=\"window.location.href=''\" class=\"icon-info\"> 关于</span>\n" +
        "        </div>\n" +
        "    </div>\n" +
        "    <div id=\"body\">\n" +
        "        <div id=\"body_left\">\n" +
        "            <div>\n" +
        "                <p class=\"title1\">关于本站</p>\n" +
        "                <p>作者: 小崔(御坂16899)<br>内容: 你可以在这里找到数学，编程以及其他奇奇怪怪的东西</p>\n" +
        "            </div>\n" +
        "            <div>\n" +
        "                <p class=\"title1\">友链</p>\n" +
        "                <p>b站:<a href=\"https://space.bilibili.com/482336257\">御坂16899号(速速关注)</a><br>\n" +
        "                知乎:<a href=\"https://www.zhihu.com/people/wu-liao-de-zi-48\">御坂16899号(速速关注)</a></p>\n" +
        "            </div>\n" +
        "            <div>\n" +
        "                <p class=\"title1\">热门文章</p>\n" +
        "                <p>1.</p>\n" +
        "                <p>2.</p>\n" +
        "                <p>3.</p>\n" +
        "                <p>4.</p>\n" +
        "                <p>5.</p>\n" +
        "                <p>6.</p>\n" +
        "                <p>7.</p>\n" +
        "                <p>8.</p>\n" +
        "                <p>9.</p>\n" +
        "                <p>10.</p>\n" +
        "            </div>\n" +
        "            <div>\n" +
        "                <p class=\"title1\">网站数据</p>\n" +
        "                <ul>\n" +
        "                <li>文章数: 0</li>\n" +
        "                <li>总字数: 0</li>\n" +
        "                <li>访客数: 0</li>\n" +
        "                <li>浏览次数: 0</li>\n" +
        "                <li>上次更新时间: undefined</li>\n" +
        "                </ul>\n" +
        "            </div>\n" +
        "\n" +
        "        </div>\n" +
        "        <div id=\"body_right\">\n" +passage_info+
        "        </div>\n" +
        "    </div>\n" +
        "    <div id=\"foot\">\n" +
        "    <p>Copyright 2022/6/29 by 小崔</p>\n" +
        "    </div>\n" +
        "</body>\n" +
        "</html>"
    fs.writeFile("blog/index.html",text, {flag:"w+"}, err => {if(err){console.error(err)}else{console.log("已经更新主页")}})
}

let des_data = fs.readFileSync("description.json")
let description = JSON.parse(des_data)
let blog_data = fs.readFileSync("make_html.json")
let data =  fs.readdirSync("blog/resource")
let new_blog_data = JSON.parse(blog_data)
let index_list = new_blog_data["index_passage"]
let pro_list = []
for(let i in data){
    if (new_blog_data["passage_status"][data[i]] == undefined){
        let pro = md2html("blog/resource/"+data[i],"blog/public/"+data[i].substring(0,data[i].length-3)+".html",data[i])
        pro_list.push(pro)
        change_passage_code(new_blog_data,data[i])
    }
    else if(new_blog_data["passage_status"][data[i]] == 0){
        let pro = md2html("blog/resource/"+data[i],"blog/public/"+data[i].substring(0,data[i].length-3)+".html",data[i])
        change_passage_code(new_blog_data,data[i])
        pro_list.push(pro)
    }
}

Promise.all(pro_list).then(()=>{
    console.log("已完成全部更新")
    let prom = write_description(description)
    make_index(index_list,description)
})




