

let base_ = (window.location.href).split('?')[1];
let id = sessionStorage.getItem("NoteBookUidInUnique")
base_ = base_.split("%")[0]
id = id.split("%")[0]
id = unbase64(id)
base_ = unbase64(base_)
$(".indexHref").attr("href","NotBook.html?"+base64(base_))
$(".addHref").attr("href","noteAdd.html?"+base64(base_))


sortByTime()





// Delete note
function deleteNoteInfo(suid) {
    if (confirm("确定删除吗？")){
        $.ajax({
            url: getURLTest()+"textif/deleteif",
            type: "post",
            dataType: "json",
            data: {
                "suid": suid,
                uid: id
            },
            success: function (data) {
                alert("删除成功！")
                setTimeout(function () {
                    window.location.href = "NotBook.html?" + base64(id);
                }, 1000);
            },
            error: function () {
                alert("服务器异常");
            }
        });
    }
}
// 收藏笔记
function collectNoteInfo(suid,collect,i) {
    if(collect===1){
        collect = 0
    }else
    {collect = 1}
    button = $(".collect_button:eq("+i+")")
    button.css("background","rgb(130,229,241)")
    $.ajax({
        url: getURLTest()+"textif/collectBySuid",
        type: "post",
        dataType: "json",
        data: {
            "suid": suid,
            uid:id,
            collect:collect
        },
        success: function () {
            if(collect===1)
            {
                button.css('color','red')
            }
            else
            {
                button.css('color','')
            }
            button.attr("onclick","collectNoteInfo("+suid+","+collect+","+i+")")
        },
        error: function () {
            alert("服务器异常");
        }
    });
}

function sortByTime() {
    $.ajax({
        url: getURLTest()+"textif/getif",
        type: "post",
        data: {
            uid:id
        },
        headers:{
            Authorization:$.cookie("Tokens")
        },
        success: function (data) {
            viewData(data)
        },
        error: function (e) {
            console.log("服务器异常");
            console.log(e)
            // alert("你尚未登陆，请先登陆！")
            // window.location.href = "index.html";
        }
    });
    return true;
}

function sortBySuid() {
    $.ajax({
        url: getURLTest()+"textif/sortBySuid",
        type: "post",
        dataType: "json",
        data: {
            uid:id
        },
        success: function (data) {
            viewData(data)
        },
        error: function () {
            alert("服务器异常");
        }
    });
}

function selectByKeywords(){
    var keywords = $(".search_text").val();
    if (keywords === ""){alert("请先输入字段");}
    else {
        $.ajax({
        url: getURLTest()+"textif/searchByArgs",
        type: "post",
        data: {
            "args": keywords,
            uid:id
        },
        success: function (data) {
            viewData(data)
        },
        error: function () {
            alert("服务器异常");
        }
    });}
}

function viewData(data){

    if (JSON.stringify(data) !== '{}') {
        var noteList = data;
        var html = ""
        var h2 = ""
        var h3 = ""
        var count = 0
        var node = ''
        var i = 0
        console.log(noteList)
        for (node in noteList) {
            var note = noteList[node];
            b = ""
            re = new RegExp('<[^<>]+>','g');
            if (note.collect === "1") {
                b = "style='color: red;'"
                h2 += '<li><a href="noteView.html?' + 'uid=' + base64(base_) + '&suid=' + base64(note.suid.toString()) +
                    '" title="阅读收藏">' + note.title + '</a></li>'
                count += 1
            }
            h3 += '<li><a href="noteEdit.html?' + 'uid=' + base64(base_) + '&suid=' + base64(note.suid.toString()) +
                '" title="修改笔记"  style="background: #5e8c88">' + note.title + '</a></li>'
            html += "<ul>" +
                '<li class="wow fadeIn" data-wow-delay="0.1s" data-wow-duration="1s" style="visibility: visible; animation-duration: 1s; animation-delay: 0.1s; animation-name: fadeIn;">' +
                '<div class="base_list_box_title">' +
             
                '<span><img src="image/yuanchuangwenzhang.png"></span>' +
                '<a class="base_list_box_title_a" href="noteView.html?' +
                'uid=' + base64(base_) + '&suid=' + base64(note.suid.toString()) + '" title="这里是文章title">';
            html += note.title;
            html += "" +
                "</a></div>" +
 
                '<div class="base_list_xiebian"><span>版权</span></div>' +
                '<div class="base_list_box_content clearfix">' +
                '<div class="base_list_box_left">' +
                ' <a href="noteView.html?uid=' + base64(base_) + '&suid=' + base64(note.suid.toString()) + '" title="文章title">' +
                ' <img src="image/bg_1.png">' +
                '</a> </div>' +
                '<div class="base_list_box_right">' +
                '<div class="base_list_box_info" title="文章的全部简介部分">';
            if(note.subtext.replace(re,"").indexOf("<img")!==-1){
                html += note.subtext.replace(re,"").substring(0,note.subtext.replace(re,"").indexOf("<img"));
                html += "(img)"
            }else if(note.subtext.replace(re,"").indexOf("<!--")!==-1){
                html += note.subtext.replace(re,"").substring(0,note.subtext.replace(re,"").indexOf("<!--"));
                html += "(注释)"
            }
            else if(note.subtext.replace(re,"").indexOf("<a")!==-1){
                html += note.subtext.replace(re,"").substring(0,note.subtext.replace(re,"").indexOf("<a"));
                html += "(超链接)"
            }
            else{html += note.subtext;}
            html += '</div></div></div><div class="base_list_box_readmore"><a href="noteView.html?' + 'uid=' + base64(base_) + '&suid=' + base64(note.suid.toString()) +
                '" title="阅读全部">阅读全部<i class="fa fa-paper-plane"></i></a></div><div class="base_list_box_message clearfix"><div class="left"><a href="noteView.html?' + 'uid=' + base64(base_) + '&suid=' + base64(note.suid.toString()) +
                '" title="笔记标注"><i class="fa fa-bookmark"></i>'
            html += "账号:" + note.uid + "笔记编号:" + note.suid;
            html += '</a></div><div class="right"><a href="javascript:void(0)" title="最新修改时间">最新修改时间:<i class="fa fa-clock-o"></i>'
            html += note.time + "</a>";
            html += "<a href='javascript:;' onclick='deleteNoteInfo(" + note.suid + ")' title=\"删除笔记\"><i class=\"fa fa-eye\"></i>删除</a>";
            html += "<a href='noteEdit.html?" + 'uid=' + base64(base_) + '&suid=' + base64(note.suid.toString()) + "' title=\"修改笔记\"><i class=\"fa fa-thumbs-up\"></i>修改</a>";
            html += "<a " + b + " href='javascript:' class='collect_button' onclick='collectNoteInfo(" + note.suid + ","+note.collect+","+i+ ")' title=\"收藏笔记\"><i class=\"fa fa-thumbs-up\"></i>收藏</a>";
            html += "</div></div></li></ul>";
            i += 1;
        }
        $("#noteList").html(html);
        $("#NotBookSave").html(h2)
        $("#editNoteList").html(h3)
        $(".updateTime").html("最新修改时间:" + noteList[node].time)
        $(".noteCounts").html("笔记总数:" + Object.keys(noteList).length)
        $(".collectCounts").html("收藏总数:" + count)
        sessionStorage.setItem("NotBookSave", h2);
        sessionStorage.setItem("editNoteList", h3);
        sessionStorage.setItem("updateTime","最新修改时间:" + noteList[node].time);
        sessionStorage.setItem("noteCounts", "笔记总数:" + Object.keys(noteList).length);
        sessionStorage.setItem("collectCounts", "收藏总数:" + count);
    } else {
        console.log(data);
        alert("这里没有记录,一切都是空空的,好寂寞┭┮﹏┭┮")
//         window.location.href = "index.html";
    }
}

