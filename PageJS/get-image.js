
if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)){
    swal({
        title: "选择背景样式",
        text: "因移动端各浏览器情况不同，请自行选择动态视频背景或者图片背景，若出现问题可刷新网页重新选择",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "动态视频背景",
        cancelButtonText: "图片背景",
        closeOnConfirm: false,
        closeOnCancel: false
    }).then((isConfirm) => {
        if (isConfirm.value) {
            swal("成功！", "已选择动态视频背景","success");
            document.getElementById("v1").src="mp4/02.mp4";
            document.getElementById("v1").style="width: 100%;object-fit:fill";

        } else {
            swal("成功！", "已选择图片背景","success");
            document.getElementById("v1").src = "";
            document.getElementById("v1").style.display = "none";
            document.body.style =  "background-image:url(img/getimage.jpg);background-repeat:no-repeat ;background-size:100% 100%;background-attachment: fixed;";
        }
    });

}else{
    document.getElementById("v1").src="mp4/02.mp4";
    document.getElementById("v1").style="width: 100%;object-fit:fill";
}
document.querySelector('#file').onchange = function (){
    if(this.files.length) {
        let files = this.files;
        let len = files.length;
        for (let i=0; i < len; i++) {
            let reader = new FileReader();
            //新建 FileReader 对象
            reader.onload = function () {
                // 当 FileReader 读取文件时候，读取的结果会放在 FileReader.result 属性中
                const cc = new Image();
                cc.src=this.result;
                cc.name=files[i].name;
                cc.id = "img";
                document.getElementById("d1").appendChild(cc);
            };
            // 设置以什么方式读取文件，这里以base64方式
            reader.readAsDataURL(files[i]);
        }
    }
};
function listen(){
    if (/(Android)/i.test(navigator.userAgent)) {
      swal({
      title: '加载失败',
      text: "当前移动端浏览器无法进行自定义设计，将为您跳转到主页面，我们为您的糟糕体验感到很抱歉，在未来我们将不断进行优化以满足用户更多需求，感谢你的支持。",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '跳转至默认链接'
    }).then((result) => {
      window.open('index.html')
    });
    } else {

    if(document.getElementsByTagName("img").length>0){
        window.open('showimage.html')
    }
    else {
        swal("提交失败","图片数量为0，无法提交")
    }
    }
}
function remove(){
    document.getElementById("d1").innerHTML="";
    document.getElementById("file").value="";

}