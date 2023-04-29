try{

    let base_ = (window.location.href).split('?')[1];
    let id = sessionStorage.getItem("NoteBookUidInUnique")
    base_ = base_.split("%")[0]
    id = id.split("%")[0]
    id = unbase64(id)
    base_ = unbase64(base_)
    $(".indexHref").attr("href","NotBook.html?"+base64(base_))
    $(".addHref").attr("href","noteAdd.html?"+base64(base_))


    sortByTime()
    selectPublicNotes()
}catch (Ex){
    swal("你尚未登陆,请先登录")
    window.location.href = "index.html";
}





// Delete note
function deleteNoteInfo(suid) {
    swal({
        title: "删除",
        text: "确定删除吗",
        icon: "warning",
        button: "确定",
        cancelButtonText: '还是不了!',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
    }).then((result) => {
        if (result.value) {
            $.ajax({
                url: getURLTest()+"textif/deleteif",
                type: "post",
                dataType: "json",
                data: {
                    "suid": suid,
                    uid: id
                },
                xhrFields: {
                    withCredentials: true
                },
                success: function (data) {
                    swal("删除成功！")
                    setTimeout(function () {
                        window.location.href = "NotBook.html?" + base64(id);
                    }, 1000);
                },
                error: function () {
                    swal("服务器异常");
                }
            });
        }else {
            swal("取消删除")
        }
    });
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
        xhrFields: {
            withCredentials: true
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
            swal("服务器异常");
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
        xhrFields: {
            withCredentials: true
        },
        success: function (data) {
            if(data.msg==="E30001"){
                //swal确定之后在跳转页面
                swal({
                    title: "错误",
                    text: "缓存过期或在其他地方登陆，请重新登陆！",
                    icon: "error",
                }).then((login) => {
                    if (login) {
                        window.location.href = "index.html";
                    }
                });
            }
            else
            { viewData(data,"")}
        },
        error: function (e) {
            swal("你尚未登陆，请先登陆！")
            window.location.href = "index.html";
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
        xhrFields: {
            withCredentials: true
        },
        success: function (data) {
            viewData(data,"not")
        },
        error: function () {
            swal("服务器异常");
        }
    });
}

function selectByKeywords(){
    var keywords = $(".search_text").val();
    if (keywords === ""){swal("请先输入字段");}
    else {
        $.ajax({
        url: getURLTest()+"textif/searchByArgs",
        type: "post",
        data: {
            "args": keywords,
            uid:id
        },
       xhrFields: {
                withCredentials: true
            },
        success: function (data) {
            viewData(data,"search")
        },
        error: function () {
            swal("服务器异常");
        }
    });}
}
function selectPublicNotes(){
    $.ajax({
        url: getURLTest()+"textif/getPublicNotes",
        type: "post",
        data: {
            uid:id
        },
        xhrFields: {
            withCredentials: true
        },
        success: function (data) {
            if(data===null){}
            else {

                viewPublicNotes(data.results)
            }
        },
        error: function () {
            swal("服务器异常");
        }
    });
}
function viewPublicNotes(data){
    let h2 = "";
    let locationHref = (window.location.href).split('/');
    let locationHref_ = "";
    let LinkHref;
    for (var i = 0; i < locationHref.length - 1; i++) {
        locationHref_ += locationHref[i];
        locationHref_ += "/"
    }
    let author;
    let title;
    let dataDir = {}
    dataDir["author"] = []
    dataDir["title"] = []
    dataDir["link"] = []
    dataDir["time"] = []
    // let openFunc;
    for (let i = 0; i < data.length; i++) {
        LinkHref = locationHref_ + "noteGuestView.html?h_ijt=U?at" + base64(Math.round(Math.random() * 100000)) + "=" + base64(data[i].uid) + "&h_ijr=S?at" + base64(Math.round(Math.random() * 100000)) + "=" + base64(data[i].suid);
        if(i<10){
            author = "<span style='color:#f27474'>  (作者: " + data[i].uid + ")</span>"
            title = "<span style='color:#f27474'>" + data[i].title + "</span>"
            // openFunc = "javascript:"+"window.open('" + LinkHref + "')";
            h2 += '<li><a target="_blank" href="' + LinkHref + '" title="作者: ' + data[i].uid + " 最新修改时间:" + data[i].time + '">' + title + author + '</a></li>'
        }
        dataDir["author"].push(data[i].uid)
        dataDir["title"].push(data[i].title)
        dataDir["link"].push(LinkHref)
        dataDir["time"].push(data[i].time)
    }
    $("#NotBookPublic").html(h2)
    $("#ViewMorePublic").attr("onclick","viewPublicData("+JSON.stringify(dataDir)+")")
}
function viewPublicData(data){
    console.log(data)
    // data = JSON.parse(data);
    if (JSON.stringify(data) !== '{}') {
        let html = "";
        for (let i = 0; i < data["author"].length; i++) {
            html += "<ul>" +
                '<li class="wow fadeIn" data-wow-delay="0.1s" data-wow-duration="1s" style="visibility: visible; animation-duration: 1s; animation-delay: 0.1s; animation-name: fadeIn;">' +
                '<div class="base_list_box_title">' +
                '<span><img src="image/yuanchuangwenzhang.png"></span>' +
                '<a class="base_list_box_title_a" href="' + data["link"][i] + '" title="这里是文章title">' + data["title"][i] + '</a></div>';
            html += '<div class="base_list_xiebian"><span>版权</span></div><div class="base_list_box_readmore">';
            //html += '<div class="base_list_box_readmore"><a href="' + data["link"][i] + '" title="阅读全部">阅读全部<i class="fa fa-paper-plane"></i></a></div>'
            html += '<div class="base_list_box_message clearfix"><div class="left"><a href="' + data["link"][i] + '" title="笔记标注"><i class="fa fa-bookmark"></i>' + data["author"][i] + '</a></div>';
            html += ' <div class="right"><a href="javascript:void(0)" title="最新修改时间">最新修改时间:<i class="fa fa-clock-o"></i>' + data["time"][i] + '</a></div></div></li></ul>'
        }
        $("#noteList").html(html);
    }
}

function viewData(data,executer){

    if (JSON.stringify(data) !== '{}') {
        var noteList = data;
        var html = ""
        var h2 = ""
        var h3 = ""
        var count = 0
        var node = ''
        var nn = ''
        var i = 0

        for (node in noteList) {
            var note = noteList[node];
            document.getElementById("noteElement-Subtext").innerHTML = note.subtext
            b = ""
            re = new RegExp('<[^<>]+>','g');
            if (note.collect === "1") {
                b = "style='color: red;'"
                if(count<10){
                    h2 += '<li><a href="noteView.html?' + 'uid=' + base64(base_) + '&suid=' + base64(note.suid.toString()) +
                        '" title="阅读收藏">' + note.title + '</a></li>'
                }
                count += 1
            }
            if(i===count){
                nn = note.time
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
            html += document.getElementById("noteElement-Subtext").innerText;
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
        if(executer!=="not"){
            $(".noteCounts").html("笔记总数:" + Object.keys(noteList).length)
            $(".collectCounts").html("收藏总数:" + count)
            $(".updateTime").html("最新修改时间:" + nn)
        }
        if(executer===""){
            sessionStorage.setItem("NotBookSave", h2);
            sessionStorage.setItem("editNoteList", h3);
            sessionStorage.setItem("noteCounts", "笔记总数:" + Object.keys(noteList).length);
            sessionStorage.setItem("collectCounts", "收藏总数:" + count);
            sessionStorage.setItem("updateTime","最新修改时间:" + nn);
        }
    } else {

        swal("提示", "这里都是空空的,好寂寞┭┮﹏┭┮", "warning");
//         window.location.href = "index.html";
    }
}

