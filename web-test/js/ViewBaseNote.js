function getData(uid,suid){
    var Rdata
    $.ajax({
        url: "https://www.lbservice.top/textif/getif_s",
        type: "post",
        async: false,
        data: {
            "uid": uid,
            "suid": suid
        },
        success: function (data) {
            Rdata = data
        },
        error: function (e) {
            alert("请求失败")
            console.log(e)
        }
    })

    return Rdata.details
}
function getSuid(uid){
    var Rdata
    $.ajax({
        url: "https://www.lbservice.top/textif/getsuidlist",
        type: "post",
        async: false,
        data: {
            "uid": uid
        },
        success: function (data) {
            Rdata = data
        },
        error: function (e) {
            alert(uid+"请求失败")
            console.log(e)
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
    day = date.getDate();
    hours = date.getHours();
    minutes = date.getMinutes();
    seconds = date.getSeconds();
    hours =  hours<10?"0"+hours:hours;
    minutes =  minutes<10?"0"+minutes:minutes;
    seconds = seconds<10?"0"+seconds:seconds;
    month =  month<10?"0"+month:month;
    day = day<10?"0"+day:day;
    vWeek_s = date.getDay();
    $(".wenzhang_box_content_jieshao_xieti:eq(2)").html(year + "年" + month + "月" + day + "日" + "\t" + hours + ":" + minutes + ":" + seconds + "\t" + vWeek[vWeek_s])
}

try{
    let base_ = (window.location.href).split('?')[1].split("&")[0].split("=")[1];
    uid = sessionStorage.getItem("NoteBookUidInUnique")
    uid = uid.split("%")[0]
    base_ = base_.split("%")[0]
    base_ = unbase64(base_)
    uid = unbase64(uid)

    let suid = (window.location.href).split('?')[1].split("&")[1].split("=")[1];
    suid = suid.split("%")[0]
    suid = parseInt(unbase64(suid))
    const suidlist = getSuid(uid);
    $(".indexHref").attr("href","NotBook.html?"+base64(base_))
    $(".addHref").attr("href","noteAdd.html?"+base64(base_))
    $(".editNote").attr("href","noteEdit.html?uid="+base64(base_)+"&suid="+base64(suid.toString()))
    $("#editNoteList").html(sessionStorage.getItem("editNoteList"))
    $(".updateTime").html(sessionStorage.getItem("updateTime"))
    $(".noteCounts").html(sessionStorage.getItem("noteCounts"))
    $(".collectCounts").html(sessionStorage.getItem("collectCounts"))
    $("#NotBookSave").html(sessionStorage.getItem("NotBookSave"))
    var luid =parseInt(suid)-1
    var ruid = parseInt(suid)+1

    while (suidlist.indexOf(luid) === -1){
        if(luid > Math.min.apply(null,suidlist)) {
            luid = parseInt(luid) - 1
        }
        else{
            luid = Math.min.apply(null,suidlist) - 1
            break
        }
    }
    while (suidlist.indexOf(ruid) === -1){
        if(ruid < Math.max.apply(null,suidlist)) {
            ruid = parseInt(ruid) + 1
        }
        else{
            ruid = Math.max.apply(null,suidlist) + 1
            break
        }
    }
    console.log(luid,ruid)
    setInterval("time()", 1000);
    data = getData(uid,suid);
    ldata = (luid>=Math.min.apply(null,suidlist)?getData(uid,luid):{});
    rdata = (ruid<=Math.max.apply(null,suidlist)?getData(uid,ruid):{});

    const noteInfo = data;


    if (!$.isEmptyObject(data)) {
        let locationHref = (window.location.href).split('/');
        let locationHref_ = "";
        for(var i=0;i<locationHref.length-1;i++){
            locationHref_ += locationHref[i];
            locationHref_ += "/"
        }
        let LinkHref = locationHref_+"noteGuestView.html?h_ijt=U?at"+base64(Math.round(Math.random() * 100000))+"="+base64(uid)+"&h_ijr=S?at"+base64(Math.round(Math.random() * 100000))+"="+base64(suid);
        $("#title").text(noteInfo.title);
        console.log(LinkHref)
        $(".wenzhang_box_article").html(noteInfo.text);
        $(".wenzhang_box_article_shengming_title").html(noteInfo.title);
        // $(".wenzhang_box_article_shengming_link:eq(0)").html(window.location.href);
        $(".wenzhang_box_article_shengming_link:eq(0)").html(LinkHref);
        $(".wenzhang_box_article_shengming_link:eq(0)").click(function (){
            window.open($(".wenzhang_box_article_shengming_link:eq(0)").text())
        });
        $(".wenzhang_box_content_jieshao_zishu").html("总字数:"+noteInfo.text.length+"字");
        $(".wenzhang_box_content_jieshao_zuozhe").html("作者:"+noteInfo.uid);
        $(".BackHref").attr("href","NotBook.html?"+base64(base_));
        $(".wenzhang_box_content_jieshao_time").html("更新时间:"+noteInfo.time);
        $(".wenzhang_box_content_jieshao_xieti:eq(0)").html(noteInfo.suid);
        $(".wenzhang_box_content_jieshao_xieti:eq(1)").html((Math.random()*10).toFixed(2));

        $('#share').share({
            sites: ['wechat', 'weibo', 'qq','qzone'],
            url:LinkHref,
            source:"www.nahida-elysia.asia",
            title:noteInfo.title,
            description:$(".wenzhang_box_article").text().substring(0,20),
            image:'../image/bg_2.png',
            wechatQrcodeTitle:"微信扫一扫:分享"
        });

    } else {
        console.log("error:"+data);
    }
    if (!$.isEmptyObject(ldata)) {
        console.log("ldata= "+ldata.title)
        $(".lsuidHref:eq(0)").attr("href","noteView.html?uid="+base64(base_)+"&suid="+base64(ldata.suid.toString()));
        $(".lsuid1").html(ldata.title);
    } else {
        console.log("ldata=空")
        $(".lsuidHref:eq(0)").attr("href","javascript:");
        $(".lsuid1").html("没有了");
    }
    if (!$.isEmptyObject(rdata)) {
        console.log("rdata= "+rdata.title)
        $(".lsuidHref:eq(1)").attr("href","noteView.html?uid="+base64(base_)+"&suid="+base64(rdata.suid.toString()));
        $(".lsuid2").html(rdata.title);
    } else {
        console.log("rdata=空 ")
        $(".lsuidHref:eq(1)").attr("href", "javascript:");
        $(".lsuid2").html("没有了");
    }
}
catch (e) {
    console.log(e);
    alert(e)
}
// function shareToOthers(LinkHref,R_title,R_description){
//     function AllClick(ElementsClick,R_initUrl,blocks,others=""){
//         $(ElementsClick).click(function () {
//             var initUrl = R_initUrl;
//             //浏览器网址
//             var browser = encodeURIComponent(LinkHref);
//             //console.log(location);
//             //分享图片地址
//             var coverImage = location.origin + $("#coverImage").attr("src");
//             //描述
//             initUrl = initUrl + browser + blocks + R_title + "&pics=" + coverImage + "&summary=" + R_description + others;// + "&desc=" + description;
//             window.open(initUrl);
//         });
//     }
//     //QQ分享
//     AllClick("#QQSHare","http://connect.qq.com/widget/shareqq/index.html?url=","&sharesource=qzone&title=")
//     //QQ空间分享,本地测试链接为localhost会出现标题和内容undefined
//     AllClick("#ZoneShare","https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=","&title=")
//     //新浪微博 &appkey=你的key，需要在新浪微博开放平台中申请
//     AllClick("#WeiboShare","http://service.weibo.com/share/share.php?url=","&sharesource=weibo&title=","&appkey=1343713053")
//     var qrcode = new QRCode($('#qrcode'), {
//         text: LinkHref,
//         width: 200,
//         height: 200,
//         colorDark: "#000000",
//         colorLight: "#ffffff",
//         correctLevel: QRCode.CorrectLevel.H
//     });
// //微信分享
//     $("#WeiChatShare").click(function () {
//         layer.open({
//             type: 1,
//             title: false,
//             area: ['200px', '200px'],
//             shadeClose: true,
//             closeBtn: false,
//             content: $('#qrcode')
//         });
//     });
// }
