let img = window.opener.document.getElementsByTagName("img");
let length =  img.length;
document.getElementsByClassName("fast-flicker")[0].innerHTML = String(length).padEnd(2,' ');
for(let i = 0 ;i<length;i++){
    if(i%4===0)
    {
        //创建一个div
        div = document.createElement("div");
        //为div创建属性class = "test"
        const divattr = document.createAttribute("class");
        divattr.value = "love-body";
        //把属性class = "test"添加到div
        div.setAttributeNode(divattr);
    }
    //创建main
    const main = document.createElement("main");
    const mainattr = document.createAttribute("class");
    mainattr.value = "love-content raise";
    main.setAttributeNode(mainattr);
    //创建a标签
    const a = document.createElement("a");
    //创建div_content
    const div_content = document.createElement("div");
    const divattrs = document.createAttribute("class");
    divattrs.value = "love-content-text";
    div_content.setAttributeNode(divattrs);
    div_content.innerHTML = img[i].name;
    a.appendChild(div_content);
    main.appendChild(a);
    //创建img标签
    const imgp = document.createElement("img");
    const imgsrc = document.createAttribute("src");
    imgsrc.value= img[i].src;
    imgp.setAttributeNode(imgsrc);
    main.appendChild(imgp);
    div.appendChild(main);
    document.getElementsByClassName("middle").item(0).appendChild(div);
}


//
// /* 获取节点 */
// // var oUl = document.getElementsByTagName("ul")[0];
// //获取所有元素,返回的是一个数组
// var aLi = document.querySelectorAll(".love-content");
// // console.log(aLi, "aLi");
// // var aLi = oUl.getElementsByTagName("li");
//
// /* 创建img标签函数 */
// function createImg(obj) {
//     let src = "";
//     if (obj.dataset.src) {
//     src = obj.dataset.src;
//   } else {
//     src = obj.getAttribute("data-src");
//   }
//   // console.log(obj, "obj");
//   if (obj.children.length <= 2) {
//       const img = document.createElement("img");
//       img.src = src;
//
//     obj.appendChild(img);
//   }
// }
//
// /* 计算节点到文档顶部的距离 */
// function getTop(obj) {
//   var h = 0;
//   while (obj) {
//     h += obj.offsetTop;
//     obj = obj.offsetParent;
//   }
//   return h;
// }
// /* 滚动实时计算所到区域并进行相关计算 */
// window.onscroll = function () {
//   var t =
//     document.documentElement.clientHeight +
//     (document.body.scrollTop || document.documentElement.scrollTop);
//   for (var i = 0; i < aLi.length; i++) {
//     if (getTop(aLi[i]) < t) {
//       setTimeout("createImg(aLi[" + i + "])", 500);
//     }
//   }
// };
// /* 页面加载完便执行一次滚动函数 */
// window.onload = function () {
//   window.onscroll();
//
// };