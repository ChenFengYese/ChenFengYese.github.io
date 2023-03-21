function $(s){
	return document.querySelectorAll(s);
}
document.oncontextmenu = function(e){
	return false;//阻止浏览器的默认弹窗行为
}
// event = "music//back.mp3";
// mv.play(event.target.result);
var size = 128;//定义的音频数组长度

var box = $('.right')[0];
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
// var line;//渐变色变量
var height,width;
var Dots = [];//用于存放点对象数组,点的坐标和颜色信息
var list = $("#list li");

var mv = new Musicvisualizer({
	size:size,
	draw:draw
});


// 切换可视化效果类型
var typeli = $(".type li");
for(var i=0;i<typeli.length;i++){
	typeli[i].onclick = function(){
		for(var j=0;j<typeli.length;j++){
			typeli[j].className = "";
		}
		this.className = "selectedType";
		draw.type = this.getAttribute("data-type");
	}
}


function base64ToUint8Array(base64String) {
　　　　const padding = '='.repeat((4 - base64String.length % 4) % 4);
       const base64 = (base64String + padding)
                    .replace(/\-/g, '+')
                    .replace(/_/g, '/');

       const rawData = window.atob(base64);
       const outputArray = new Uint8Array(rawData.length);

       for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
       }
       return outputArray;
}
function reader(url,callback) {
    const script = document.createElement('script');
    script.type='text/javascript';
    script.async='async';
　　script.src=url;
    document.body.appendChild(script);
    if(script.readyState){   //IE
　　　　　　script.onreadystatechange=function(){
　　　　　　　　if(script.readyState==='complete'||script.readyState==='loaded'){
　　　　　　　　　　script.onreadystatechange=null;
　　　　　　　　　　callback();
　　　　　　　　}
　　　　　　}
　　　　}else{    //非IE
　　　　　　script.onload=function(){callback();}
　　　　}
}


function getRandom(m,n){
	return Math.round(Math.random()*(n-m)+m);
}
function getDots(){
	Dots = [];
	for(var i=0;i<size;i++){
		var DotX = getRandom(0,width);
		var DotY = getRandom(0,height);
		// rgba 增加透明度  最边缘透明度为0
		var DotColor = "rgba("+getRandom(0,255)+","+getRandom(0,255)+","+getRandom(0,255)+",0)";
		Dots.push({
			x:DotX,
			y:DotY,
			color:DotColor,
			cap:0,//柱状上面小方块高度参数
			dx:getRandom(1,2)
		});
	}
}

/**
 * [resize 根据窗口大小改变canvas画布大小]
 * @return {[type]} [description]
 */
function resize(){
	height = box.clientHeight;
	width = box.clientWidth;
	canvas.width = width;
	canvas.height = height;

	// 设置渐变色
	line = ctx.createLinearGradient(0,0,0,height-10);//线性渐变
	line.addColorStop(0,"red");
	line.addColorStop(0.5,"orange");
	line.addColorStop(1,"green");
	getDots();
}
resize();
window.onresize = resize;


var vol = $("#volume")[0];
vol.onchange = function(){
	mv.changeVolumn(this.value/this.max);
}
mv.changeVolumn(0.6);//初始化音频大小

function draw(arr){

	ctx.clearRect(0,0,width,height);//每次绘制时，清空上次画布内容
	ctx.fillStyle = line;
	var rectWidth = width/size;
	var cw = rectWidth*0.6;
	var capHeight = cw > 10?10:cw;//防止上面矩形过高
	for(var i=0;i<size;i++){
		var o = Dots[i];
		if(draw.type == "column"){
			var rectHeight = arr[i]/256*height;//音频数据最大值256
			// 绘制矩形条（x,y,width,height）; rectWidth*0.6使矩形之间有间隙
			ctx.fillRect(rectWidth*i,height-rectHeight,cw,rectHeight);
			ctx.fillRect(rectWidth*i,height-(o.cap+capHeight),cw,capHeight);
			o.cap--;
			if(o.cap<0){
				o.cap =0;
			}
			if(rectHeight>0 && o.cap<rectHeight+40){
				o.cap = rectHeight+40 > height-capHeight ? height-capHeight:rectHeight+40;
			}
		}else if(draw.type == "dot"){
			ctx.beginPath();//声明，防止各个圆之间连线起来
			var r = 5+arr[i]/256*(height>width?height:width)/18;//圆的半径 最小10px,并且半径大小会依赖屏幕的宽度大小
			ctx.arc(o.x,o.y,r,0,Math.PI*2,true);//x,y,半径，起始角度，绘制角度，是否逆时针
			var round = ctx.createRadialGradient(o.x,o.y,0,o.x,o.y,r);//从圆心到圆最外围
			round.addColorStop(0,"#fff");
			round.addColorStop(1,o.color);
			ctx.fillStyle = round;
			ctx.fill();
			// ctx.strokeStyle = round;
			// ctx.stroke();
			o.x += o.dx;
			o.x = o.x > width ? 0 : o.x;
		}

	}
}
draw.type = "column";//默认显示效果类型
// $.cookie("music_choose_name_selected", "已加载"+ name + ".MP3", { expires: 7, path: '/' });
// $.cookie("music_choose_address_selected", value, { expires: 7, path: '/' });
$("#add")[0].onclick = function() {
	// if($.cookie("music_choose_name_selected")!==undefined&&$.cookie("music_choose_address_selected")!==undefined){
	// 	var name = $.cookie("music_choose_name_selected");
	// 	var value = $.cookie("music_choose_address_selected");
	// 	$("#add").html(name);
	// 	$("#address").attr("href",value);
	// 	mv.play(value);
	// }
	let judgement = document.getElementById("add").innerHTML;
	if (judgement === "Load Music") {
		swal({
			title: "",
			text: "选择本地音乐播放或者网络音乐播放",
			icon: "warning",
			buttons: ["网络音乐选择", "本地音乐播放"],
			dangerMode: true,
		})
			.then((local) => {
				if (local) {
					$("#loadfile")[0].click();
				} else {
					openWin('music_choose.html');
				}
			});
	} else {
		swal({
			title: "",
			text: judgement + "，是否重新选择?",
			icon: "warning",
			buttons: ["播放", "重新选择"],
			dangerMode: true,
		})
			.then((local) => {
				if (local) {
					document.getElementById("add").innerHTML = "Load Music";
					$("#add")[0].click();
				} else {

					const value = document.getElementById("address").href;
					console.log(value)
					fetch(value).then(function (response) {
						return response.blob();
					}).then(function (response) {
						var fr = new FileReader();
						fr.onload = function (e) {
							console.log(e)
							console.log(e.target.result)
							// 重写play方法  这边e.target.result已经是arraybuffer对象类型，不再是ajax路径读入
							mv.play(e.target.result);
						}
						fr.readAsArrayBuffer(response);
					});
				}
			});
	}
}
function urlToBlob(the_url, callback) {
	let xhr = new XMLHttpRequest();
	xhr.open("get", the_url, true);
	xhr.responseType = "blob";
	xhr.onload = function () {
		console.log(this.status)
		if (this.status === 204) {
			if (callback) {
				callback(this.response);
			}
		}
	};
	xhr.send();
}
function openWin(url)
			 {
			  var name="音乐选择";                           //网页名称，可为空;
			  var iWidth=800;                         //弹出窗口的宽度;
			  var iHeight=600;                        //弹出窗口的高度;
			  //window.screen.height获得屏幕的高，window.screen.width获得屏幕的宽
			  var iTop = (window.screen.height-30-iHeight)/2;       //获得窗口的垂直位置;
			  var iLeft = (window.screen.width-10-iWidth)/2;        //获得窗口的水平位置;
			  window.open(url,name,'height='+iHeight+',innerHeight='+iHeight+',width='+iWidth+',innerWidth='+iWidth+',top='+iTop+',left='+iLeft+',toolbar=no,menubar=no,scrollbars=auto,resizable=no,location=no,status=no');
			 }
$("#loadfile")[0].onchange = function(){
	var file = this.files[0];
	var fr = new FileReader();

	fr.onload = function(e){
		// 重写play方法  这边e.target.result已经是arraybuffer对象类型，不再是ajax路径读入
		mv.play(e.target.result);
	}
	fr.readAsArrayBuffer(file);
	// $("#loadfile")[0].value = '';
}
function launchFullscreen(element) {
		if(element.requestFullscreen) {
			 element.requestFullscreen();
		} else if(element.mozRequestFullScreen) {
			 element.mozRequestFullScreen();
		} else if(element.webkitRequestFullscreen) {
			 element.webkitRequestFullscreen();
		} else if(element.msRequestFullscreen) {
			 element.msRequestFullscreen();
		}
	}
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

function confirmFull(){
	if(document.getElementById("fullscreen").innerHTML==="开启全屏模式"){
		  launchFullscreen(document.documentElement);
	    	  document.getElementById("fullscreen").innerHTML="关闭全屏模式";
	}
	else if(document.getElementById("fullscreen").innerHTML==="关闭全屏模式"){
		 document.getElementById("fullscreen").innerHTML="开启全屏模式";
		 exitFullscreen() 
	}
}

