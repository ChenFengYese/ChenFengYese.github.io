function getData(uid,suid){
    var Rdata
    $.ajax({
        url: getURLTest()+"/textif/getif_s",
        type: "post",
        async: false,
        data: {
            "uid": uid,
            "suid": suid,
            "GetValueWay":2,
            "publicOrPrivate": 1
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
    let uid = (window.location.href).split('?h_ijt=U?at')[1].split("&h_ijr=S?at")[0].split("=")[1];
    uid = uid.split("%")[0]
    uid = unbase64(uid)

    let suid = (window.location.href).split('?h_ijt=U?at')[1].split("&h_ijr=S?at")[1].split("=")[1];
    suid = suid.split("%")[0]
    suid = parseInt(unbase64(suid))

    setInterval("time()", 1000);
    data = getData(uid,suid);


    const noteInfo = data;

    if (data!=="没有找到该备忘录") {
        $("#title").text(noteInfo.title);
        $(".wenzhang_box_article").html(noteInfo.text);
        $(".wenzhang_box_article_shengming_title").html(noteInfo.title);
        $(".wenzhang_box_article_shengming_link").html(window.location.href);
        $(".wenzhang_box_article_shengming_link:eq(0)").click(function (){
            window.open($(".wenzhang_box_article_shengming_link:eq(0)").text())
        });
        $(".wenzhang_box_content_jieshao_zishu").html("总字数:"+noteInfo.text.length+"字");
        $(".wenzhang_box_content_jieshao_zuozhe").html("作者:"+noteInfo.uid);
        $(".wenzhang_box_content_jieshao_time").html("更新时间:"+noteInfo.time);
        $(".wenzhang_box_content_jieshao_xieti:eq(0)").html(noteInfo.suid);
        $(".wenzhang_box_content_jieshao_xieti:eq(1)").html((Math.random()*10).toFixed(2));
        $('#share').share({
            sites: ['wechat', 'weibo', 'qq','qzone'],
            url:document.location.href,
            source:"www.nahida-elysia.asia",
            title:noteInfo.title,
            description:$(".wenzhang_box_article").text().substring(0,20),
            wechatQrcodeTitle:"微信扫一扫:分享"
        });
    } else {
        alert(data)
        console.log("error:"+data);
    }
}
catch (e) {
    console.log(e);
    alert(e)
}
