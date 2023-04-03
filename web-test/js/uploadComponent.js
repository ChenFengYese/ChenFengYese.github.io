function insertHtmlAtCaret (html) {
    var sel, range, frag
    if (window.getSelection) {
        sel = window.getSelection()
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0)
            range.deleteContents()
            var el = document.createElement('div')
            el.appendChild(html)
            frag = document.createDocumentFragment()
            var node
            var lastNode
            while ((node = el.firstChild)) {
                lastNode = frag.appendChild(node)
            }
            range.insertNode(frag)
            if (lastNode) {
                range = range.cloneRange()
                range.setStartAfter(lastNode)
                range.collapse(true)
                sel.removeAllRanges()
                sel.addRange(range)
            }
        }
    }else if (document.selection && document.selection.type !== "Control") {
        // IE < 9
        document.selection.createRange().pasteHTML(html);
    }
}
$(document).on("click", "#uploadPicture", function () {
    // 点击图片的同时，点击上传文件的input
    $('#file').click();
    // 将上传的图片显示到页面上
    document.querySelector('#file').onchange = function (){
        if(this.files.length) {
            let files = this.files;
            let len = files.length;
            for (let i=0; i < len; i++) {
                const cc = new Image();
                cc.src=window.URL.createObjectURL(files[i]);
                cc.name=files[i].name;
                cc.className="upload-img-display"
                cc.id = "img";
                cc.value = files[i]
                $("#article").focus();
                insertHtmlAtCaret(cc);
            }
        }
    };
});
$(document).on("click","#uploadFolder",function (){
    // 点击图片的同时，点击上传文件的input
    $('#file2').click();
    // 将上传的图片显示到页面上
    document.querySelector('#file2').onchange = function (){
        if(this.files.length) {
            let files = this.files;
            let len = files.length;
            for (let i=0; i < len; i++) {
                const cc = document.createElement("a");
                cc.href=window.URL.createObjectURL(files[i]);
                // cc.click(function (){
                //     window.open(cc.href)
                // })
                cc.name=files[i].name;
                cc.innerHTML=" "+files[i].name+"<br>";
                cc.className="upload-img-display"
                cc.target = "_blank"
                cc.style.width = "auto"
                cc.style.height = "auto"
                cc.id = "fold";
                cc.value = files[i]
                $("#article").focus();
                insertHtmlAtCaret(cc);
            }
        }
    };
})
$(document).on("click","#AutoloadPicture",function (){
    $(".upload-img-display").css("width","auto")
    $(".upload-img-display").css("height","auto")
    console.log("成功")
})
$(document).on("click","#pasteToArticle",function (){
    navigator.clipboard.readText().then(
        clipText => document.getElementById("article").innerHTML = document.getElementById("article").innerHTML + ""+ clipText

    );
})
document.addEventListener("paste", function (e){
    if ( !(e.clipboardData && e.clipboardData.items) ) {
        return ;
    }

    for (var i = 0, len = e.clipboardData.items.length; i < len; i++) {
        console.log(e.clipboardData.items[i])
        var item = e.clipboardData.items[i];

        if (item.kind === "string"&&item.type==="text/html") {
            item.getAsString(function (str) {
                var cc = document.createElement("div");
                cc.innerHTML = str
                var codeLength = cc.getElementsByTagName("code").length
                var length = cc.getElementsByTagName("img").length
                if (length === 0&&codeLength===0) {
                    $("#article").focus();
                    insertHtmlAtCaret(cc);
                } else {
                    for (let i = 0; i < length; i++) {
                        cc.getElementsByTagName("img")[i].className = "upload-img-display-outerPaste";
                    }
                    for (let i = 0; i < codeLength; i++) {
                        cc.getElementsByTagName("code")[i].style.color = "rgba(0,0,0,0.88)"
                    }
                    $("#article").focus();
                    insertHtmlAtCaret(cc);
                }
                // str 是获取到的字符串
            })
        }
        // } else if (item.kind === "file"&&item.kind !== "string"&&item.type!=="text/html") {
        //     // var pasteFile = item.getAsFile();
        //     // var cc = document.createElement("a");
        //     // cc.href=window.URL.createObjectURL(pasteFile);
        //     // // cc.click(function (){
        //     // //     window.open(cc.href)
        //     // // })
        //     // cc.name=pasteFile.name;
        //     // cc.innerHTML=" "+pasteFile.name+"<br>";
        //     // cc.className="upload-img-display-outerPaste"
        //     // cc.target = "_blank"
        //     // cc.style.width = "auto"
        //     // cc.style.height = "auto"
        //     // cc.id = "fold";
        //     // cc.value = pasteFile
        //     // $("#article").focus();
        //     // insertHtmlAtCaret(cc);
        //     // // pasteFile就是获取到的文件
        // }
        event.preventDefault();
    }
},false );
function getUploadComponents(uid,suid){
    var Rdata
    $.ajax({
        url: getURLTest()+"/file/download",
        type: "get",
        async: false,
        data: {
            "uid": uid,
            "suid":suid
        },
        success: function (data) {
            console.log(data)
            Rdata = data
        },
        error: function (e) {
            console.log("getComponents==================================")
            // alert(uid+"请求失败")
            console.log(e)
        }
    })
    return Rdata
}
async function UploadFunction(uid,suid,article_note) {
    if (article_note.length !== 0) {
        for (let i = 0; i < article_note.length; i++) {
            let formdata = new FormData();
            console.log(article_note[i].name + "i===============")
            formdata.append("file", article_note[i].value)
            // article_note[i].src = ""
            // article_note[i].href = ""
            $.ajax({
                dataType: "json",
                headers: {
                    "fid": uid,
                    "sfid": suid,
                    "originalname": encodeURIComponent(article_note[i].name)
                },
                data: formdata,
                url: getURLTest() + "file/upload",
                type: "post",
                cache: false,
                processData: false,
                contentType: false,
                success: function (data) {
                    console.log(data)
                },
                error: function (data) {
                    console.log(data)
                }
            });
        }
    }
}
async function deleteFunction(uid,suid,func){
    let judge = false;
    var article_note =  document.getElementsByClassName("upload-img-display")
    $.ajax({
        url:getURLTest()+"file/delete",
        dataType:"json",
        type:"post",
        data:{
            "uid": uid,
            "suid":suid
        },
        success:function (data) {
            console.log(data)
            func(uid,suid,article_note)
        },
        error:function (data) {
            console.log(data)
        }
    });
    return judge;
}
async function UpdateValueFunction( upload_data) {
    try{
        for (let f = 0; f < document.getElementsByClassName("upload-img-display").length; f++) {
            document.getElementsByClassName("upload-img-display")[f].href = upload_data[f].name
            document.getElementsByClassName("upload-img-display")[f].src = upload_data[f].name
            document.getElementsByClassName("upload-img-display")[f].name = upload_data[f].originalname
            const blob = await fetch(upload_data[f].name).then(r => r.blob())
            console.log(blob)
            document.getElementsByClassName("upload-img-display")[f].value = new File([blob], upload_data[f].name, {type: blob.type})
            //    document.getElementsByClassName("upload-img-display")[f].value = document.getElementsByClassName("hidden-value-uploadReaderValue-childNodes")[f].innerHTML;
        }
    }catch (Exception){
        console.log(Exception)

    }
}
