
function getSuid(uid){
    var Rdata
    $.ajax({
        url: getURLTest()+"textif/getsuidlist",
        type: "post",
        async: false,
        data: {
            "uid": uid
        },
        xhrFields: {
            withCredentials: true
        },
        success: function (data) {
            Rdata = data
        },
        error: function (e) {
            swal(uid+"请求失败")

        }
    })
    return Rdata
}
function time() {
    var vWeek, vWeek_s, vDay;
    vWeek = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    var date =  new Date();
    year = date.getFullYear();
    month = date.getMonth() + 1;
    month =  month<10?"0"+month:month;
    day = date.getDate()<10?"0"+date.getDate():date.getDate();
    hours = date.getHours();
    minutes = date.getMinutes();
    seconds = date.getSeconds();
    hours =  hours<10?"0"+hours:hours;
    minutes =  minutes<10?"0"+minutes:minutes;
    seconds = seconds<10?"0"+seconds:seconds;

    vWeek_s = date.getDay();
    $(".wenzhang_box_content_jieshao_xieti:eq(2)").html(year + "-" + month + "-" + day + " "  + hours + ":" + minutes + ":" + seconds)
    $(".wenzhang_box_content_jieshao_zishu").html("总字数:"+$(".wenzhang_box_article").text().length+"字");
    $(".wenzhang_box_article_shengming_title").html($("#title").text());
    $(".wenzhang_box_article_shengming_link").html(document.location.href.split("?")[0].split("noteAdd")[0]+"noteView.html?"+"uid="+document.location.href.split("?")[1]+"&suid="+base64($(".wenzhang_box_content_jieshao_xieti:eq(0)").html()));
}
// Add note
async function addNoteInfo(uid,ruid) {
    if($("#title").text() !== '' && $(".wenzhang_box_article").text() !== '')
    {
        var article_note =  document.getElementsByClassName("upload-img-display")
        // uid = "'"+uid+"'"
        // ruid = "'"+ruid+"'"

        document.getElementById("uploadIframe").style.display = "block";
        document.getElementsByClassName("base_content_body")[0].style.display = "none";
        document.getElementsByClassName("base_header")[0].style.display = "none";
        document.body.addEventListener('click', function (e) {
            e.preventDefault()
        })
        await UploadFunction(uid, ruid, article_note,"add",article_note.length-1)

    }
    else {
        swal("标题或内容不能为空");
    }
}
try{
    var base_ = (window.location.href).split('?')[1];
    const key = parseInt(base_.split("%")[1].split("").reverse().join(""))
    var id = sessionStorage.getItem("NoteBookUidInUnique");
    base_ = base_.split("%")[0]
    base_ = unbase64(base_)
    id = id.split("%")[0]
    id = unbase64(id)

    uid = id

    ruid = 1
    setInterval("time()", 1000);
    const suidlist = getSuid(uid);
    while (suidlist.indexOf(ruid) !== -1){
        ruid += 1;
    }

    $(".wenzhang_box_content_jieshao_xieti:eq(0)").html(ruid)
    $(".indexHref").attr("href","NotBook.html?"+base64(base_))
    $(".wenzhang_box_content_jieshao_zuozhe").html("作者:"+uid);
    $(".wenzhang_box_content_jieshao_xieti:eq(1)").html((Math.random()*10).toFixed(2));
    $(".lsuidHref:eq(0)").attr("href","NotBook.html?"+base64(base_));
    $(".lsuidHref:eq(1)").attr("href","javascript:addNoteInfo('"+uid+"','"+ruid+"')");
    $("#editNoteList").html(sessionStorage.getItem("editNoteList"))
    $(".updateTime").html(sessionStorage.getItem("updateTime"))
    $(".noteCounts").html(sessionStorage.getItem("noteCounts"))
    $(".collectCounts").html(sessionStorage.getItem("collectCounts"))
    $("#NotBookSave").html(sessionStorage.getItem("NotBookSave"))
}
catch (e) {

    swal("你尚未登陆,请重新登录")
    // window.location.href = "index.html";
}