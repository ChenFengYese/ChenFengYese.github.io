
$(function () {
    //wow动画插件启动
    if($(".wow").length) {
        // 启动wow插件列表页鼠标移动到元素时产生css动画的插件
        var wow = new WOW({
            boxClass: 'wow',
            animateClass: 'animated',
            offset: 0,
            mobile: true,
            live: true
        });
        wow.init();
    }
});
//两种加载后执行的方法，我选择全部元素全部加载后执行
window.onload=function(){

    //首页的文章轮播部分
    if($(".index_side_box").length){
        var time=120;
        var side_box = $(".index_side_box");
        var slide_one = $(".ul_one");
        var slide_two = $(".ul_two");

        //如果首页诗词的盒子宽度大于轮播的盒子宽度执行循环移动方法
        //console.log(slide_one.innerWidth());
        if(slide_one.innerWidth()>side_box.innerWidth()){

            slide_two.html(slide_one.html());
            /*文章左移*/
            function Marquee(){
                if(side_box.scrollLeft() >= slide_one.width()){
                    side_box.scrollLeft(0);
                }
                else{
                    side_box.scrollLeft(side_box.scrollLeft()+1);
                }
            }

            /*文章左移*/
            //两秒后调用
            var sliding=setInterval(Marquee,time)
            side_box.hover(function() {
                //鼠标移动DIV上停止
                clearInterval(sliding);
            },function(){
                //离开继续调用
                sliding=setInterval(Marquee,time);
            });
        }
    }

    //导航根据因为服务器循环数据导致不方便判断当前在哪个顶级栏目下，所以使用js脚本的祖先元素给该元素的祖先元素赋值
    if($(".base_header_nav").length){
        if($(".base_header_nav_active").parents(".have_second_navs").length){
            $(".base_header_nav_active").parents(".have_second_navs").find("a").addClass("base_header_nav_active");
        }
    }

    //页面获得随机数修改背景图片
    random_bg_pic();
    function random_bg_pic(){
        //console.log(Math.floor(Math.random()*10)+1);
        var index=Math.floor(Math.random()*12)+1;
        //console.log(index+'.png');
        var url='url(img/bg_pic/bg_'+index+'.png)';
        //console.log('url(../img/'+index+'.png)');
        $(".bg_pic").css('background-image',url);
    }

    //导航部分的js
    //头部导航变fiexd浮动
    stickyHeader();
    function stickyHeader() {
        $(window).scroll(function () {
            if ($('.base_header').length) {
                var strickyScrollPos = 60;
                if ($(window).scrollTop() > strickyScrollPos) {
                    $('.base_header').stop(true,true).addClass('base_header_fixed');
                } else {
                    $('.base_header').stop(true,true).removeClass('base_header_fixed');
                }
            }
        });
    }

    //手机端导航的js
    //导航按钮点击三横变一×
    click_base_menu_btn();
    function click_base_menu_btn() {
        $("#base_nav_menu").click(function () {
            //导航按钮三横变一×
            $(this).stop(true,true).toggleClass("click_base_nav_menu_btn");
            //打开导航遮罩div
            $(".base_nav_zhezao").stop(true,true).toggleClass("base_nav_zhezao_open");
            //手机导航的显示隐藏
            $(".base_header_nav").stop(true,true).toggleClass("base_header_nav_open");
            //手机端搜索简介和推荐文章显示隐藏
            $(".base_content_right").stop(true,true).toggleClass("base_content_right_open");
            //手机端二级导航打开的时候，导航滚动条滚动到底后，会带动后面的身体部分的滚动条滚动，目前安卓端有bug不知怎么解决
            $("body").toggleClass("hide_body_scrolly");


            $(".base_nav_zhezao").click(function () {
                //关闭导航遮罩div
                $(".base_nav_zhezao").stop(true,true).removeClass("base_nav_zhezao_open");
                //切换三横导航按钮样式
                $("#base_nav_menu").stop(true,true).removeClass("click_base_nav_menu_btn");
                //关闭手机端导航div
                $(".base_header_nav").stop(true,true).removeClass("base_header_nav_open");
                //关闭手机端右侧部分
                $(".base_content_right").stop(true,true).removeClass("base_content_right_open");
                //移除body的样式
                $("body").removeClass("hide_body_scrolly");
            });
        });}

    //手机导航的二级导航显示隐藏
    base_header_have_second_navs();
    function base_header_have_second_navs(){
        if($(".fa-caret-right").length){
            $(".fa-caret-right").click(function () {
                $(this).nextAll(".nav_child").stop(true,true).slideToggle(300);
                $(this).stop(true,true).toggleClass("click_fa-caret-right");
            });
        }
    }
    
    //电脑端的时候隐藏所有的nac_child防止手机端的bug
    nav_child_hide();
    function nav_child_hide() {
        if(window.innerWidth>1024){
            $(".nav_child").hide();
        }
    }
    //电脑端的时候删除点击导航给body的class电脑端的bug
    body_remove_class();
    function body_remove_class() {
        if($("body").hasClass("hide_body_scrolly")){
            $("body").removeClass("hide_body_scrolly");
        }
    }
    
    //根据浏览器大小自动选择nav的高度
    base_header_nav_height();
    function base_header_nav_height() {
        //初始高度浏览器高度-header的61高度让元素高度满屏
        var height=window.innerHeight-($(".base_header").height());
        //$(".base_content_right")的初始高度，此变量是为了文章页和随笔页的默认高度样式兼容
        //var right_base_height=$(".base_content_right").height();

        if(window.innerWidth<=1024){
            $(".base_header_nav").css({height:height});
            $(".base_content_right").css({height:height});
        }else{
            $(".base_header_nav").css({height:61});
            if($(".base_content_right").css("visibility")!='hidden'){
                $(".base_content_right").css({height:'unset'});
            }
            //$(".base_content_right").css({height:right_base_height});
        }

    }

    //这里是随着浏览器的缩小而随时改变nav的高度
    $(window).resize(function() {
        base_header_nav_height();
        nav_child_hide();
        body_remove_class();
    });

    //身体部分的
    // js右侧导航鼠标悬停改变class样式
    youce_class();
    function youce_class() {
        if($(".blog_lanmu_active").length){
            if(window.innerWidth>1024) {
                var moren = $(".blog_lanmu_active");
                var moren_height = moren.height();
                var moren_width = moren.width();
                //这是一个好方法 可以直接给到距离父元素的top值
                //console.log(moren.position().top);

                //右侧栏目部分鼠标悬停增加的class样式
                $(".blog_right_nav .blog_active_and_hover_class").css({
                    'top': moren.position().top + 'px',
                    'width': moren_width + 'px',
                    'height': moren_height + 'px'
                });

                $(".blog_right_nav ul li").hover(function () {
                    $(".blog_right_nav .blog_active_and_hover_class").css({
                        'top': $(this).position().top + 'px',
                        'width': $(this).width() + 'px',
                        'height': $(this).height() + 'px'
                    });
                }, function () {
                    $(".blog_right_nav .blog_active_and_hover_class").css({
                        'top': moren.position().top + 'px',
                        'width': moren_width + 'px',
                        'height': moren_height + 'px'
                    });
                });

                //鼠标滑动的时候计算右侧盒子的高度，当滚轮大于右侧盒子的高度的时候，证明滚动的地方超过了盒子的高度，把右侧的盒子向下展示出来
                $(window).scroll(function () {
                    var winPos = $(window).scrollTop();
                    if (winPos > $(".base_content_right").height())
                        $('#base_content_right_down').addClass('base_content_right_down');
                    else
                        $('#base_content_right_down').removeClass('base_content_right_down');
                });
            }
        }
    }

    //身体部分的一键回到顶部的按钮
    //一键回到顶部的脚本部分
    //为当前窗口添加滚动条滚动事件（适用于所有可滚动的元素和 window 对象（浏览器窗口））
    go_top();
    function go_top(){
        $(window).scroll(function(){
            //创建一个变量存储当前窗口下移的高度
            var scroTop = $(window).scrollTop();
            //判断当前窗口滚动高度
            //如果大于100，则显示顶部元素，否则隐藏顶部元素
            if(scroTop>100){
                $('.go_top').fadeIn(500);
            }else{
                $('.go_top').fadeOut(500);
            }
        });
        //为返回顶部元素添加点击事件
        $('.go_top').click(function() {
            //将当前窗口的内容区滚动高度改为0，即顶部
            $("html,body").animate({scrollTop: 0}, "fast");
        });
    }

    //随笔页面下的时间a按钮点击
    click_suibi_time();
    function click_suibi_time() {
        if($(".suibi_year").length){
            //时间轴默认打开第一个时间下面的样式，默认样式是收起，第一个打开的状态

            $(".suibi_year").eq(0).find("h2 a").addClass("suibi_year_active");

            $(".suibi_year").eq(0).find(".suibi_neirong").addClass("suibi_neirong_open");

            $(".suibi_year h2>a").click(function () {
                    $(this).stop(true,true).toggleClass("suibi_year_active");
                    var suibibox=$(this).parent().parent().find(".suibi_neirong");
                    if(suibibox.css('display') === 'none'){
                        suibibox.stop(true,true).slideDown(1000);
                    }else{
                        suibibox.stop(true,true).slideUp(1000);
                    }
                    //$(this).parent().parent().find(".suibi_neirong").stop(true,true).slideToggle(1000);
            });
        }
    }

    //文章页部分分享插件启动
    if($('#share').length){
        $('#share').share({sites: ['wechat', 'weibo', 'qq','qzone','tencent','douban']});
    }



};


























