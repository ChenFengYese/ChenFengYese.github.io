function getData(uid,suid){
    var Rdata
    $.ajax({
        url: getURLTest()+"/textif/getif_s",
        type: "post",
        async: false,
        data: {
            "uid": uid,
            "suid": suid,
            "GetValueWay":2
        },
        success: function (data) {

            Rdata = data
        },
        error: function (e) {
            console.log("getData==================================")
            // alert("请求失败")
            console.log(e)
        }
    })

    return Rdata.details
}
function getSuid(uid){
    var Rdata
    $.ajax({
        url: getURLTest()+"/textif/getSuidListNotDeleted",
        type: "post",
        async: false,
        data: {
            "uid": uid
        },
        success: function (data) {
            Rdata = data
        },
        error: function (e) {
            // alert(uid+"请求失败")
            console.log("getSuid==================================")
            console.log(e)
        }
    })
    return Rdata
}
function getTitle(uid,suid){
    var Rdata
    $.ajax({
        url: getURLTest()+"/textif/getSuidAndNameList",
        type: "post",
        async: false,
        data: {
            "uid": uid,
            "suid":suid
        },
        success: function (data) {
            Rdata = data.details
        },
        error: function (e) {
            // alert(uid+"请求失败")
            console.log("getTitle==================================")
            console.log(e)
        }
    })
    return Rdata
}
function updatePublic(uid,suid,pon){
    var Rdata
    $.ajax({
        url: getURLTest()+"/textif/alterif",
        type: "post",
        async: false,
        data: {
            "uid": uid,
            "suid": suid,
            "texthtml": pon
        },
        success: function (data) {
            Rdata = "成功"
        },
        error: function (e) {
            // alert("请求失败")
            console.log("getPublic==================================")
            console.log(e)
            Rdata = "失败"
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
function setPublicOrNot(uid,suid,pon,LinkHref){
    swal({
        title: pon==="1"?'设置公开':'设置私密',
        text: pon==="1"?"确定将这篇文章设置为公开吗?当设置为公开后,所有人都可以通过该链接访问你的文章,并且文章分享功能也将对该篇文章开放":"确定将这篇文章设置为私密吗?当设置为私密后,所有人都无法通过该链接访问你的文章,并且文章分享功能也将对该篇文章关闭",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '确定'
    }).then((result) => {
        if (result.value) {
            if(updatePublic(uid,suid,pon)==="成功"){
                document.getElementsByClassName("article_dig")[0].style.display = pon==="1"?"block":"none";
                if(pon==="1"){
                    swal({
                        title: '设置成功',
                        text: "正在为你跳转至公开文章页面",
                        type: 'success',
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: '确定'
                    }).then((result) => {
                        if (result.value) {
                            $("#publicOrNot").html("已公开")
                            document.getElementsByClassName("article_dig")[0].style.display = "block";
                            window.open(LinkHref)

                        }
                    });
                }else {
                    swal("设置成功", "已将这篇文章设置为私密", "success")
                    $("#publicOrNot").html("未公开")
                    document.getElementsByClassName("article_dig")[0].style.display = "none";
                }
            }else {
                swal("请求失败", pon==="1"?"无法将该篇文章设置为公开":"无法将这篇文章设置为私密", "error")
            }
        }
    });
}

let fileReader;
try {
    let base_ = (window.location.href).split('?')[1].split("&")[0].split("=")[1];
    let FoolBase_ = base_
    let luid, ruid;
    uid = sessionStorage.getItem("NoteBookUidInUnique")
    uid = uid.split("%")[0]
    base_ = base_.split("%")[0]
    base_ = unbase64(base_)
    uid = unbase64(uid)

    let suid = (window.location.href).split('?')[1].split("&")[1].split("=")[1];
    suid = suid.split("%")[0]
    suid = parseInt(unbase64(suid))
    console.log(suid)
    console.log(uid)
    suidlist = getSuid(uid)
    uuuuid = suidlist.indexOf(parseInt(suid))
    $(".indexHref").attr("href", "NotBook.html?" + FoolBase_)
    $(".addHref").attr("href", "noteAdd.html?" + FoolBase_)
    $(".editNote").attr("href", "noteEdit.html?uid=" + FoolBase_ + "&suid=" + base64(suid.toString()))
    $("#editNoteList").html(sessionStorage.getItem("editNoteList"))
    $(".updateTime").html(sessionStorage.getItem("updateTime"))
    $(".noteCounts").html(sessionStorage.getItem("noteCounts"))
    $(".collectCounts").html(sessionStorage.getItem("collectCounts"))
    $("#NotBookSave").html(sessionStorage.getItem("NotBookSave"))
    if (uuuuid - 1 >= 0) {
        luid = suidlist[uuuuid - 1]
    } else {
        luid = ''
    }
    if (uuuuid + 1 < suidlist.length) {
        console.log("ruid-成功复制")
        ruid = suidlist[uuuuid + 1]
    } else {
        ruid = ''
        console.log("ruid=空")
    }

    setInterval("time()", 1000);
    data = getData(uid, suid);
    upload_data = getUploadComponents(uid, suid)
    console.log("=========")
    console.log(luid, ruid)
    console.log("=========")
    ldata = (luid !== '' ? getTitle(uid, luid) : {});
    rdata = (ruid !== '' ? getTitle(uid, ruid) : {});

    const noteInfo = data;


    if (!$.isEmptyObject(data)) {
        let locationHref = (window.location.href).split('/');
        let locationHref_ = "";
        for (var i = 0; i < locationHref.length - 1; i++) {
            locationHref_ += locationHref[i];
            locationHref_ += "/"
        }
        let LinkHref = locationHref_ + "noteGuestView.html?h_ijt=U?at" + base64(Math.round(Math.random() * 100000)) + "=" + base64(uid) + "&h_ijr=S?at" + base64(Math.round(Math.random() * 100000)) + "=" + base64(suid);
        $("#title").text(noteInfo.title);
        console.log(LinkHref)
        console.log(noteInfo)
        $(".wenzhang_box_article").html(noteInfo.text);
        $(".wenzhang_box_article_shengming_title").html(noteInfo.title);
        // $(".wenzhang_box_article_shengming_link:eq(0)").html(window.location.href);
        $(".wenzhang_box_article_shengming_link:eq(0)").html(LinkHref);
        if (noteInfo.texthtml === "1") {
            document.getElementsByClassName("article_dig")[0].style.display = "block";
            $("#publicOrNot").html("已公开")
        }
        $(".wenzhang_box_article_shengming_link:eq(0)").click(function () {
            if (document.getElementsByClassName("article_dig")[0].style.display !== "block") {
                setPublicOrNot(noteInfo.uid, noteInfo.suid, "1", LinkHref)
            } else {
                window.open(LinkHref)
            }
        });
        $("#publicOrNot").click(function () {
            setPublicOrNot(noteInfo.uid, noteInfo.suid, $("#publicOrNot").html() === "已公开" ? "0" : "1", LinkHref)
        })
        $('#share').share({
            sites: ['wechat', 'weibo', 'qq', 'qzone'],
            url: LinkHref,
            source: "www.nahida-elysia.asia",
            title: noteInfo.title,
            description: $(".wenzhang_box_article").text().substring(0, 20),
            image: '../image/bg_2.png',
            wechatQrcodeTitle: "微信扫一扫:分享"
        });
        for (let f = 0; f < document.getElementsByClassName("upload-img-display").length; f++) {
            document.getElementsByClassName("upload-img-display")[f].src = upload_data[f].name
            document.getElementsByClassName("upload-img-display")[f].href = upload_data[f].name
            document.getElementsByClassName("upload-img-display")[f].name = upload_data[f].originalname
            document.getElementsByClassName("upload-img-display")[f].onclick = function () {
                window.open(this.src)
            }
        }
        for (let f = 0; f < document.getElementsByClassName("upload-img-display-outerPaste").length; f++) {
            document.getElementsByClassName("upload-img-display-outerPaste")[f].onclick = function () {
                window.open(this.src)
            }
        }


        $(".wenzhang_box_content_jieshao_zishu").html("总字数:" + noteInfo.text.length + "字");
        $(".wenzhang_box_content_jieshao_zuozhe").html("作者:" + noteInfo.uid);
        $(".BackHref").attr("href", "NotBook.html?" + FoolBase_);
        $(".wenzhang_box_content_jieshao_time").html("更新时间:" + noteInfo.time);
        $(".wenzhang_box_content_jieshao_xieti:eq(0)").html(noteInfo.suid);
        $(".wenzhang_box_content_jieshao_xieti:eq(1)").html((Math.random() * 10).toFixed(2));

    } else {
        console.log("error:" + data);
    }
    if (!$.isEmptyObject(ldata)) {
        console.log("ldata= " + ldata.title)
        $(".lsuidHref:eq(0)").attr("href", "noteView.html?uid=" + FoolBase_ + "&suid=" + base64(ldata.suid.toString()));
        $(".lsuid1").html(ldata.title);
    } else {
        console.log("ldata=空")
        $(".lsuidHref:eq(0)").attr("href", "javascript:");
        $(".lsuid1").html("没有了");
    }
    if (!$.isEmptyObject(rdata)) {
        console.log("rdata= " + rdata.title)
        $(".lsuidHref:eq(1)").attr("href", "noteView.html?uid=" + FoolBase_ + "&suid=" + base64(rdata.suid.toString()));
        $(".lsuid2").html(rdata.title);
    } else {
        console.log("rdata=空 ")
        $(".lsuidHref:eq(1)").attr("href", "javascript:");
        $(".lsuid2").html("没有了");
    }
} catch (e) {
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
