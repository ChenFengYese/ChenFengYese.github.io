

let id = (window.location.href).split('?')[1];
id = id.split("%")[0]
id = unbase64(id)
$(".indexHref").attr("href","NotBook.html?"+base64(id))
$(".addHref").attr("href","noteAdd.html?"+base64(id))

$.ajax({
    url: "https://www.lbservice.top/textif/getif",
    type: "post",
    data: {
        uid:id
    },
    headers:{
        Authorization:$.cookie("Tokens")
    },
    success: function (data) {
        if (JSON.stringify(data) !== '{}') {
            var noteList = data;
            var html = ""
            var h2 = ""
            var h3 = ""
            var count = 0
            var node = ''
            for (node in noteList) {
                var note = noteList[node];
                b=""
                if(note.collect=== "1"){
                    b="style='color: red;"
                    h2 += '<li><a href="noteView.html?' +'uid='+base64(note.uid)+'&suid='+base64(note.suid.toString())+
                        '" title="阅读收藏">'+note.title+'</a></li>'
                    count += 1
                }
                h3 += '<li><a href="noteEdit.html?' +'uid='+base64(note.uid)+'&suid='+base64(note.suid.toString())+
                    '" title="修改笔记"  style="background: #5e8c88">'+note.title+'</a></li>'
                html += "<ul>"+
                    '<li class="wow fadeIn" data-wow-delay="0.1s" data-wow-duration="1s" style="visibility: visible; animation-duration: 1s; animation-delay: 0.1s; animation-name: fadeIn;">'+
                    '<div class="base_list_box_title">'+
                    ' <!--列表页判断文章是否原创是原创添加span元素-->'+
                    '<span><img src="image/yuanchuangwenzhang.png"></span>'+
                    '<a class="base_list_box_title_a" href="noteView.html?'+
                    'uid='+base64(note.uid)+'&suid='+base64(note.suid.toString())+'" title="这里是文章title">';
                html += note.title;
                html += ""+
                    "</a></div>"+
                    '<!--列表页判断文章是否原创是原创添加版权元素-->'+
                    '<div class="base_list_xiebian"><span>版权</span></div>'+
                    '<div class="base_list_box_content clearfix">'+
                    '<div class="base_list_box_left">'+
                    ' <a href="noteView.html?uid='+base64(note.uid)+'&suid='+base64(note.suid.toString())+'" title="文章title">'+
                    ' <img src="image/bg_1.png">'+
                    '</a> </div>'+
                    '<div class="base_list_box_right">'+
                    '<div class="base_list_box_info" title="文章的全部简介部分">';
                html += note.text;
                html+= '</div></div></div><div class="base_list_box_readmore"><a href="noteView.html?' +'uid='+base64(note.uid)+'&suid='+base64(note.suid.toString())+
                    '" title="阅读全部">阅读全部<i class="fa fa-paper-plane"></i></a></div><div class="base_list_box_message clearfix"><div class="left"><a href="noteView.html?' +'uid='+base64(note.uid)+'&suid='+base64(note.suid.toString())+
                    '" title="笔记标注"><i class="fa fa-bookmark"></i>'
                html += "账号:"+note.uid+"笔记编号:"+note.suid;
                html+= '</a></div><div class="right"><a href="javascript:void(0)" title="最新修改时间">最新修改时间:<i class="fa fa-clock-o"></i>'
                html += note.time+"</a>";
                html += "<a href='javascript:;' onclick='deleteNoteInfo(" + note.suid + ")' title=\"删除笔记\"><i class=\"fa fa-eye\"></i>删除</a>";
                html += "<a href='noteEdit.html?"  +'uid='+base64(note.uid)+'&suid='+base64(note.suid.toString())+ "' title=\"修改笔记\"><i class=\"fa fa-thumbs-up\"></i>修改</a>";
                html += "<a "+b+" href='javascript:'" + note.suid + " title=\"收藏笔记\"><i class=\"fa fa-thumbs-up\"></i>收藏</a>";
                html += "</div></div></li></ul>";
            }
            $("#noteList").html(html);
            $("#NotBookSave").html(h2)
            $("#editNoteList").html(h3)
            $(".updateTime").html("最新修改时间:"+noteList[node].time)
            $(".noteCounts").html("笔记总数:"+Object.keys(noteList).length)
            $(".collectCounts").html("收藏总数:"+count)

        } else {
            console.log(data);
            alert("你尚未登陆或者你的会话已过期，请重新登陆！")
            window.location.href = "index.html";
        }
    },
    error: function (e) {
        console.log("服务器异常");
        console.log(e)
        // alert("你尚未登陆，请先登陆！")
        // window.location.href = "index.html";
    }
});

// Delete note
function deleteNoteInfo(suid) {
    if (confirm("确定删除吗？")){
        $.ajax({
            url: "https://www.lbservice.top/textif/deleteif",
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
function collectNoteInfo(suid) {
    $.ajax({
        url: "https://www.lbservice.top/textif/collectif",
        type: "post",
        dataType: "json",
        data: {
            "suid": suid,
            uid:id
        },
        success: function (data) {
            alert("收藏成功！")
            setTimeout(function () {
                window.location.href = "NotBook.html?"+base64(id);
            }, 1000);
        },
        error: function () {
            alert("服务器异常");
        }
    });
}
// Look up notes by keyword
function selectByKeywords(keywords){
    $.ajax({
        url: "https://www.lbservice.top/textif/selectByif",
        type: "post",
        data: {
            "keywords": keywords,
            uid:id

        },
        success: function (data) {
            setTimeout(function () {
                window.location.href = "NotBook.html?"+base64(id);
            }, 1000);
        },
        error: function () {
            alert("服务器异常");
        }
    });
}
(function() {
    var ws = new WebSocket('ws://' + window.location.host +
        '/jb-server-page?reloadMode=RELOAD_ON_SAVE&'+
        'referrer=' + encodeURIComponent(window.location.pathname));
    ws.onmessage = function (msg) {
        if (msg.data === 'reload') {
            window.location.reload();
        }
        if (msg.data.startsWith('update-css ')) {
            var messageId = msg.data.substring(11);
            var links = document.getElementsByTagName('link');
            for (var i = 0; i < links.length; i++) {
                var link = links[i];
                if (link.rel !== 'stylesheet') continue;
                var clonedLink = link.cloneNode(true);
                var newHref = link.href.replace(/(&|\?)jbUpdateLinksId=\d+/, "$1jbUpdateLinksId=" + messageId);
                if (newHref !== link.href) {
                    clonedLink.href = newHref;
                }
                else {
                    var indexOfQuest = newHref.indexOf('?');
                    if (indexOfQuest >= 0) {
                        // to support ?foo#hash
                        clonedLink.href = newHref.substring(0, indexOfQuest + 1) + 'jbUpdateLinksId=' + messageId + '&' +
                            newHref.substring(indexOfQuest + 1);
                    }
                    else {
                        clonedLink.href += '?' + 'jbUpdateLinksId=' + messageId;
                    }
                }
                link.replaceWith(clonedLink);
            }
        }
    };
})();
(function() {
    var ws = new WebSocket('ws://' + window.location.host +
        '/jb-server-page?reloadMode=RELOAD_ON_SAVE&'+
        'referrer=' + encodeURIComponent(window.location.pathname));
    ws.onmessage = function (msg) {
        if (msg.data === 'reload') {
            window.location.reload();
        }
        if (msg.data.startsWith('update-css ')) {
            var messageId = msg.data.substring(11);
            var links = document.getElementsByTagName('link');
            for (var i = 0; i < links.length; i++) {
                var link = links[i];
                if (link.rel !== 'stylesheet') continue;
                var clonedLink = link.cloneNode(true);
                var newHref = link.href.replace(/(&|\?)jbUpdateLinksId=\d+/, "$1jbUpdateLinksId=" + messageId);
                if (newHref !== link.href) {
                    clonedLink.href = newHref;
                }
                else {
                    var indexOfQuest = newHref.indexOf('?');
                    if (indexOfQuest >= 0) {
                        // to support ?foo#hash
                        clonedLink.href = newHref.substring(0, indexOfQuest + 1) + 'jbUpdateLinksId=' + messageId + '&' +
                            newHref.substring(indexOfQuest + 1);
                    }
                    else {
                        clonedLink.href += '?' + 'jbUpdateLinksId=' + messageId;
                    }
                }
                link.replaceWith(clonedLink);
            }
        }
    };
})();