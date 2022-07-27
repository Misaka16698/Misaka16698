const path = require('path')
const fs = require('fs')
const vm = require('vm')
const {marked} = require('marked')
const cheerio = require("cheerio")
//用于将md转化为html
function md2html(file_name,to_path, origin_name){
    let pro =new Promise(function (resolve, reject){
        fs.readFile(file_name,'utf8', (err,data_2) =>{
            let file_info = data_2.split("</file_info>")[0].substring(11)
            file_info = JSON.parse(file_info)
            let tag = file_info["tag"]
            let category = file_info["category"]
            let time = new Date()
            let text_time=time.getFullYear().toString()+"/"+time.getMonth().toString()+"/"+time.getDate().toString()
            data_2 = data_2.split("</file_info>")[1]
            let turned_js=marked(data_2)
            let title = turned_js.split("h1")[1].split(">")[1].split("<")[0]
            let new_html = "<!DOCTYPE html>\n" +
                "<html lang=\"en\">\n" +
                "<head>\n" +
                "    <meta charset=\"UTF-8\">\n" +
                "<meta name='keywords' content='"+tag.join(",")+"'>\n"+
                "<meta name='category' content='"+category+"'>\n" +
                "<meta name='create_time' content='"+text_time+"'>"+
                "    <title>"+title+"</title>\n" +
                "    <script src=\"https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js\"></script>\n" +
                "    <script src=\"../../static/js/blog/passage.js\"></script>\n" +
                "    <link rel=\"stylesheet\" href=\"../../static/css/blog/blog.css\">\n" +
                "    <link rel=\"stylesheet\" href=\"../../static/css/blog/module.css\">\n" +
                "    <link rel=\"stylesheet\" href=\"../../static/css/icon-font.css\">\n" +
                "<link rel=\"stylesheet\" \n" +
                "          href=\"//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/default.min.css\">\n" +
                "    <script src=\"//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/highlight.min.js\"></script>\n"+
                "</head>\n" +
                "<body>\n" +
                "<div id=\"head\">\n" +
                "    <img id=\"logo\" src=\"../../static/img/misaka16899.png\">\n" +
                "    <p id=\"logo_title\">御坂16899</p>\n" +
                "    <div id=\"left_side\">\n" +
                "        <span onclick=\"window.location.href='../../index.html'\" class=\"icon-home3\"> 个人主页</span>\n" +
                "        <span onclick=\"window.location.href='../index.html'\" class=\"icon-home\"> 博客主页</span>\n" +
                "        <span onclick=\"window.location.href=''\" class=\"icon-search\"> 搜索</span>\n" +
                "        <span onclick=\"window.location.href='../category.html'\" class=\"icon-books\"> 分类</span>\n" +
                "        <span onclick=\"window.location.href='关于御坂16899号.html'\" class=\"icon-info\"> 关于</span>\n" +
                "    </div>\n" +
                "</div>\n" +
                "\n" +
                "<div id=\"body\">\n" +
                "\n" + turned_js+
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
                    description = upload_description(origin_name,description,new_html,tag,category,text_time)
                    resolve()
                }
            })
        })
    })
    return pro
}
//用于在转换成功后，把make_html.json中文件对应的值变为1, 在传入no_change时，只更新文件
function change_passage_code(data, passage_name){
    if(passage_name!="no_change"){
        data["passage_status"][passage_name] = 1
    }

    let write_data ={"index_passage":[],"passage_status":{}}
    for(let a in data["index_passage"]){
        write_data["index_passage"].push(data["index_passage"][a].split(".")[0])
    }
    for(let b in data["passage_status"]){
       write_data["passage_status"][b.split(".")[0]] = data["passage_status"][b]
    }

    fs.writeFileSync("make_html.json", JSON.stringify(write_data), {flag:"w+"})
}
// 用于把description写入对应文件
function write_description(description){
    let prom = new Promise(function (resolve, reject){
        fs.writeFile("description.json",JSON.stringify(description),{flag: "w+"}, (err)=>{
            if(err){console.err(err)}
            else{console.log("已经更新description.json文档")}
        })
    })
    return prom
}
// 用于在读取一个文件后更新description
function upload_description(file_name,description,html,tag,category,time){
    let $ = cheerio.load(html)
    if(description["passage_data"][file_name.substring(0,file_name.length-3)+".html"]){
        description["passage_data"][file_name.substring(0,file_name.length-3)+".html"]["text"] = $("#body").text().replace(/[\r\n]/g,"")
        description["passage_data"][file_name.substring(0,file_name.length-3)+".html"]["tag"] = tag
        description["passage_data"][file_name.substring(0,file_name.length-3)+".html"]["category"] = category
        description["passage_data"][file_name.substring(0,file_name.length-3)+".html"]["title_img"] = $("#body").children(":first").children(":first").attr("src")
        description["passage_data"][file_name.substring(0,file_name.length-3)+".html"]["update_time"].push(time)
    }
    else{
        description["passage_data"][file_name.substring(0,file_name.length-3)+".html"] = {"update_time":[]}
        description["passage_data"][file_name.substring(0,file_name.length-3)+".html"]["text"] = $("#body").text().replace(/[\r\n]/g,"")
        description["passage_data"][file_name.substring(0,file_name.length-3)+".html"]["tag"] = tag
        description["passage_data"][file_name.substring(0,file_name.length-3)+".html"]["category"] = category
        description["passage_data"][file_name.substring(0,file_name.length-3)+".html"]["title_img"] = $("#body").children(":first").children(":first").attr("src")
        description["passage_data"][file_name.substring(0,file_name.length-3)+".html"]["update_time"].push(time)
    }
    return description
}
function make_passage_info(i,position){
    let tag_list=description["passage_data"][i]["tag"]
    let category = description["passage_data"][i]["category"]
    let create_time = description["passage_data"][i]["update_time"][0]
    let img_src = description["passage_data"][i]["title_img"].substring(3)
    let tag_text =""
    for(let i in tag_list){
        tag_text+= "<span class='icon-price-tag tag'>"+ tag_list[i]+"</span>"
    }
    if(position===0){
    let detail = "<div class='tag_list'>" +tag_text+
        "<span class='icon-book' style='margin: 5px' onclick='window.location.href=\"category/"+category+".html\"'>"+category+"</span>"+"<br>" +
        "<span class='icon-history'>写于</span>"+create_time+
        "</div>"

        return "            <div class=\"passage_info\" onclick='window.location.href=\"public/"+i+"\"'>\n" +
        "                <div class=\"pic\">\n" +
        "                    <img src=\""+img_src+"\">\n" +
        "                </div>\n" +
        "                <div class=\"info\">\n" +
        "                    <p class=\"title1\">"+i.split(".")[0]+"</p>\n" +detail+

        "                    <p>"+description["passage_data"][i]["text"].substring(0,200)+"</p>\n" +
        "                </div>\n" +
        "            </div>\n"}
    else if(position===1){
        let detail = "<div class='tag_list'>" +tag_text+
            "<span class='icon-book' style='margin: 5px' onclick='window.location.href=\"../category/"+category+".html\"'>"+category+"</span>"+"<br>" +
            "<span class='icon-history'>写于</span>"+create_time+
            "</div>"
        return "            <div class=\"passage_info\" onclick='window.location.href=\"../public/"+i+"\"'>\n" +
            "                <div class=\"pic\">\n" +
            "                    <img src=\"../../static/img/blog/"+i.split(".")[0] +".png\">\n" +
            "                </div>\n" +
            "                <div class=\"info\">\n" +
            "                    <p class=\"title1\">"+i.split(".")[0]+"</p>\n" +detail+

            "                    <p>"+description["passage_data"][i]["text"].substring(0,200)+"</p>\n" +
            "                </div>\n" +
            "            </div>\n"
    }
}
// 用于制作主页
function make_index(index_list){
    let passage_info =""

    for(let i in index_list){
        passage_info += make_passage_info(index_list[i],0)
    }
    let time = new Date()
    let text_time=time.getFullYear().toString()+"/"+time.getMonth().toString()+"/"+time.getDate().toString()
    let text = "<!DOCTYPE html>\n" +
        "<html lang=\"en\">\n" +
        "<head>\n" +
        "    <meta charset=\"UTF-8\">\n" +
        "    <title>小崔的博客主页</title>\n" +
        "    <script src=\"https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js\"></script>\n" +
        "    <script src=\"../static/js/blog/index.js\"></script>\n" +
        "    <link rel=\"stylesheet\" href=\"../static/css/blog/index.css\">\n" +
        "    <link rel=\"stylesheet\" href=\"../static/css/blog/blog.css\">\n" +
        "    <link rel=\"stylesheet\" href=\"../static/css/icon-font.css\">\n" +
        "</head>\n" +
        "<body>\n" +
        "    <div id=\"head\">\n" +
        "        <img id=\"logo\" src=\"../static/img/misaka16899.png\">\n" +
        "        <p id=\"logo_title\">御坂16899</p>\n" +
        "        <div id=\"left_side\">\n" +
        "            <span onclick=\"window.location.href='../index.html'\" class=\"icon-home3\"> 个人主页</span>\n" +
        "            <span onclick=\"window.location.href='index.html'\" class=\"icon-home\"> 博客主页</span>\n" +
        "            <span onclick=\"window.location.href=''\" class=\"icon-search\"> 搜索</span>\n" +
        "            <span onclick=\"window.location.href='category.html'\" class=\"icon-books\"> 分类</span>\n" +
        "            <span onclick=\"window.location.href='public/关于御坂16899号.html'\" class=\"icon-info\"> 关于</span>\n" +
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
        "                <li>上次更新时间:"+text_time+"</li>\n" +
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
//用于制作分类页面
function create_category_page(){
    let category_html = ""
    for (let a in description["category"]){
        category_html +=
        "    <div class=\"category\" onclick=\"window.location.href='category/"+a+".html'\">\n" +
        "        <img src=\"../static/img/blog/category/"+description["category"][a]["img_src"]+".png\">\n" +
        "        <p>"+a.split("").join(" ")+"</p>\n" +
        "    </div>\n"
    }
    let html = "<!DOCTYPE html>\n" +
        "<html lang=\"en\">\n" +
        "<head>\n" +
        "    <meta charset=\"UTF-8\">\n" +
        "    <title>小崔的博客主页</title>\n" +
        "    <script src=\"https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js\"></script>\n" +
        "    <script src=\"../static/js/blog/category.js\"></script>\n" +
        "    <link rel=\"stylesheet\" href=\"../static/css/blog/category.css\">\n" +
        "    <link rel=\"stylesheet\" href=\"../static/css/blog/blog.css\">\n" +
        "    <link rel=\"stylesheet\" href=\"../static/css/icon-font.css\">\n" +
        "</head>\n" +
        "<body>\n" +
        "<div id=\"head\">\n" +
        "    <img id=\"logo\" src=\"../static/img/misaka16899.png\">\n" +
        "    <p id=\"logo_title\">御坂16899</p>\n" +
        "    <div id=\"left_side\">\n" +
        "        <span onclick=\"window.location.href='../index.html'\" class=\"icon-home3\"> 个人主页</span>\n" +
        "        <span onclick=\"window.location.href='index.html'\" class=\"icon-home\"> 博客主页</span>\n" +
        "        <span onclick=\"window.location.href=''\" class=\"icon-search\"> 搜索</span>\n" +
        "        <span onclick=\"window.location.href=''\" class=\"icon-books\"> 分类</span>\n" +
        "        <span onclick=\"window.location.href='public/关于御坂16899号.html'\" class=\"icon-info\"> 关于</span>\n" +
        "    </div>\n" +
        "</div>\n" +
        "<div id=\"body\">\n" +
        category_html+
        "</div>\n" +
        "<div id=\"foot\">\n" +
        "    <p>Copyright 2022/6/29 by 小崔</p>\n" +
        "</div>\n" +
        "</body>\n" +
        "</html>"
    fs.writeFile("blog/category.html",html,{flag:"w+"},
            err => {if(err){console.error(err)}else{console.log("已经更新分类页")}})
}
//用于制作每个分类的页面
function create_each_category(category){
    let include_passage = description["category"][category]["include_passage"]
    let description_word = description["category"][category]["description_word"]
    let img_src = description["category"][category]["img_src"]
    let passage_html = ""
    for(let i in  include_passage){
        passage_html += make_passage_info(include_passage[i],1)
    }
    let html = "<!DOCTYPE html>\n" +
        "<html lang=\"en\">\n" +
        "<head>\n" +
        "    <meta charset=\"UTF-8\">\n" +
        "    <title>"+category+"</title>\n" +
        "    <script src=\"https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js\"></script>\n" +
        "    <script src=\"../../static/js/blog/index.js\"></script>\n" +
        "    <link rel=\"stylesheet\" href=\"../../static/css/blog/index.css\">\n" +
        "    <link rel=\"stylesheet\" href=\"../../static/css/blog/blog.css\">\n" +
        "    <link rel=\"stylesheet\" href=\"../../static/css/icon-font.css\">\n" +
        "</head>\n" +
        "<body>\n" +
        "<div id=\"head\">\n" +
        "    <img id=\"logo\" src=\"../../static/img/misaka16899.png\">\n" +
        "    <p id=\"logo_title\">御坂16899</p>\n" +
        "    <div id=\"left_side\">\n" +
        "        <span onclick=\"window.location.href='../../index.html'\" class=\"icon-home3\"> 个人主页</span>\n" +
        "        <span onclick=\"window.location.href='../index.html'\" class=\"icon-home\"> 博客主页</span>\n" +
        "        <span onclick=\"window.location.href=''\" class=\"icon-search\"> 搜索</span>\n" +
        "        <span onclick=\"window.location.href='../category.html'\" class=\"icon-books\"> 分类</span>\n" +
        "        <span onclick=\"window.location.href='../public/关于御坂16899号.html'\" class=\"icon-info\"> 关于</span>\n" +
        "    </div>\n" +
        "</div>\n" +
        "<div id=\"body\">\n" +
        "    <div id=\"body_left\">\n" +
        "        <div>\n" +

        "            <img src=\"../../static/img/blog/category/"+img_src+".png\" style=\"width: 100%\">\n" +
        "            <p class=\"title1\">分类:"+category+"</p>\n" +
        "            <p>作者: 小崔(御坂16899)<br>内容: "+description_word+"</p>\n" +
        "        </div>\n" +
        "        <div>\n" +
        "            <p class=\"title1\">该分类下热门文章</p>\n" +
        "            <p>1.</p>\n" +
        "            <p>2.</p>\n" +
        "            <p>3.</p>\n" +
        "            <p>4.</p>\n" +
        "            <p>5.</p>\n" +
        "            <p>6.</p>\n" +
        "            <p>7.</p>\n" +
        "            <p>8.</p>\n" +
        "            <p>9.</p>\n" +
        "            <p>10.</p>\n" +
        "        </div>\n" +
        "\n" +
        "\n" +
        "    </div>\n" +
        "    <div id=\"body_right\">\n" +
        passage_html+
        "    </div>\n" +
        "</div>\n" +
        "<div id=\"foot\">\n" +
        "    <p>Copyright 2022/6/29 by 小崔</p>\n" +
        "</div>\n" +
        "</body>\n" +
        "</html>"
    fs.writeFile("blog/category/"+category+".html",html, {flag:"w+"},err => {if(err){console.error(err)}else {console.log("已经更新,"+category+".html")}})
}


let des_data = fs.readFileSync("description.json")
let description = JSON.parse(des_data)
let blog_data = fs.readFileSync("make_html.json")
let data =  fs.readdirSync("blog/resource")
blog_data = JSON.parse(blog_data)
let new_blog_data ={"index_passage":[],"passage_status":{}}
for(let a in blog_data["index_passage"]){
    new_blog_data["index_passage"].push(blog_data["index_passage"][a]+".html")
}
for(let b in blog_data["passage_status"]){
    new_blog_data["passage_status"][b+".md"] = blog_data["passage_status"][b]
}
let index_list = new_blog_data["index_passage"]
let pro_list = []
// 删除description和make_html中有而源文件目录下没有的内容
for(let i in new_blog_data["passage_status"]){
    if(data.indexOf(i) === -1){
        delete new_blog_data["passage_status"][i]
    }
}
for(let i in description["passage_data"]){
    if(data.indexOf(i.substring(0,i.length-5)+".md") === -1){
        delete description["passage_data"][i]
    }
}
change_passage_code(new_blog_data, "no_change")
for(let i in data){
    if (new_blog_data["passage_status"][data[i]] === undefined){
        let pro = md2html("blog/resource/"+data[i],"blog/public/"+data[i].substring(0,data[i].length-3)+".html",data[i])
        pro_list.push(pro)
        change_passage_code(new_blog_data,data[i])
    }
    else if(new_blog_data["passage_status"][data[i]] === 0){
        let pro = md2html("blog/resource/"+data[i],"blog/public/"+data[i].substring(0,data[i].length-3)+".html",data[i])
        change_passage_code(new_blog_data,data[i])
        pro_list.push(pro)
    }
}

Promise.all(pro_list).then(()=>{
    console.log("已完成全部更新")
    let category_dict = {}
    for(let k in description["passage_data"]){
        if(category_dict[description["passage_data"][k]["category"]]===undefined){
            category_dict[description["passage_data"][k]["category"]] = [k]
        }
        else{
            category_dict[description["passage_data"][k]["category"]].push(k)
        }
    }
    for(let n in category_dict){
        if(description["category"][n]==undefined){
            description["category"][n] = {"include_passage":category_dict[n],"description_word":"在这里写下关于分类的描述","img_src":"这里是分类的图片的地址"}
        }
        else{
            description["category"][n]["include_passage"] = category_dict[n]
        }
        }
    let prom = write_description(description)
    make_index(index_list,description)
    create_category_page()
    for(let n in category_dict){
        create_each_category(n)
    }
})




