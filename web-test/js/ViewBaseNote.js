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
            alert(uid+suid+"请求失败")
            console.log(e)
        }
    })
    console.log("最终值:"+suid+"data:  "+Rdata)
    return Rdata
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
    let uid = (window.location.href).split('?')[1].split("&")[0].split("=")[1];
    uid = uid.split("%")[0]
    uid = unbase64(uid)

    let suid = (window.location.href).split('?')[1].split("&")[1].split("=")[1];
    suid = suid.split("%")[0]
    suid = parseInt(unbase64(suid))

    const suidlist = getSuid(uid);
    $(".indexHref").attr("href","NotBook.html?"+base64(uid))
    $(".addHref").attr("href","noteAdd.html?"+base64(uid))
    $(".editNote").attr("href","noteEdit.html?uid="+base64(uid)+"&suid="+base64(suid.toString()))
    var luid =parseInt(suid)-1
    var ruid = parseInt(suid)+1
    console.log("====================================")
    console.log("这里是uid:"+uid+"这里是suid:"+suid)

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
        $("#title").text(noteInfo[0].title);
        $(".wenzhang_box_article").text(noteInfo[0].text);
        $(".wenzhang_box_article_shengming_title").html(noteInfo[0].title);
        $(".wenzhang_box_article_shengming_link").html(window.location.href);
        $(".wenzhang_box_content_jieshao_zishu").html("总字数:"+noteInfo[0].text.length+"字");
        $(".wenzhang_box_content_jieshao_zuozhe").html("作者:"+noteInfo[0].uid);
        $(".BackHref").attr("href","NotBook.html?"+base64(uid));
        $(".wenzhang_box_content_jieshao_time").html("更新时间:"+noteInfo[0].time);
        $(".wenzhang_box_content_jieshao_xieti:eq(0)").html(noteInfo[0].suid);
        $(".wenzhang_box_content_jieshao_xieti:eq(1)").html((Math.random()*10).toFixed(2));
    } else {
        console.log("error:"+data);
    }
    if (!$.isEmptyObject(ldata)) {
        console.log("ldata= "+ldata[0].title)
        $(".lsuidHref:eq(0)").attr("href","noteView.html?uid="+base64(uid)+"&suid="+base64(ldata[0].suid.toString()));
        $(".lsuid1").html(ldata[0].title);
    } else {
        console.log("ldata=空")
        $(".lsuidHref:eq(0)").attr("href","javascript:");
        $(".lsuid1").html("没有了");
    }
    if (!$.isEmptyObject(rdata)) {
        console.log("rdata= "+rdata[0].title)
        $(".lsuidHref:eq(1)").attr("href","noteView.html?uid="+base64(uid)+"&suid="+base64(rdata[0].suid.toString()));
        $(".lsuid2").html(rdata[0].title);
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
