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
$(document).on("click","#uploadToPDF",function (){
    //swal警告当前功能处于实验状态,确认后执行后续程序
    swal({
        title: "警告",
        text: "当前功能处于实验状态，可能会出现一些问题，是否继续？",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then(() => {
            // 点击图片的同时，点击上传文件的input
            $('#file').click();
            document.getElementById("file").onchange = async function(event) {
                // 获取选中的图片文件
                const file = event.target.files[0];

                // 创建一个新的空白 PDF 文档
                const newPdfDoc = await createPdfDoc();

                // 将图片添加到新的 PDF 文档中
                const image = await toImage(file);
                await addImageToPdfDoc(image, newPdfDoc);

                // 将新的 PDF 文档转换为 Blob 对象
                const pdfBlob = await newPdfDoc.output('blob');

                // 下载 PDF 文件
                const url = URL.createObjectURL(pdfBlob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'output.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            };
        }
    );
// 创建一个新的 PDF 文档对象
    async function createPdfDoc() {
        const doc = new jsPDF('p', 'px', [1000, 1000]);
        return doc;
    }

// 将图片文件转换为 Image 对象
    function toImage(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const img = new Image();
                img.src = reader.result;
                img.onload = () => {
                    resolve(img);
                };
            };
            reader.onerror = (error) => {
                reject(error);
            };
        });
    }

// 将 Image 对象添加到 PDF 文档中
    async function addImageToPdfDoc(image, pdfDoc) {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);
        const dataUrl = canvas.toDataURL('image/jpeg');
        pdfDoc.addImage(dataUrl, 'JPEG', 0, 0, pdfDoc.internal.pageSize.getWidth(), pdfDoc.internal.pageSize.getHeight());
    }

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
async function getUploadComponents(uid,suid){
    var Rdata
    $.ajax({
        url: getURLTest()+"file/download",
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
            document.getElementById("uploadIframe").style.display = "none";
            console.log("getComponents==================================")
            swal(uid+"请求失败")
            console.log(e)
        }
    })
    return Rdata
}
async function UploadFunction(uid,suid,article_note,functionType,numUploads) {

    let non = 0
    if (article_note.length !== 0) {
        for (let i = 0; i < article_note.length; i++) {
                let formdata = new FormData();
                console.log(article_note[i].name + "i===============")
                if(article_note[i].value!==undefined){
                    formdata.append("file", article_note[i].value)
                    UploadForFolders(uid, suid, article_note, formdata,i,functionType,numUploads)
                }
                else{
                    non+=1
                    console.log(non)
                    console.log(article_note.length-1)
                }
                // article_note[i].src = ""
                // article_note[i].href = ""
        }
        if(non===article_note.length){
            await UploadForElements(uid, suid)
        }
    }else{
        if(functionType==="upload"){await UploadForElements(uid, suid)}
        else{addElementsFunction(uid)}
    }
}
async function deleteFunction(uid,suid,func,functionType){
    let judge = false;
    var article_note =  document.getElementsByClassName("upload-img-display")
    if(article_note.length===0){
        let my = $.ajax({
            url:getURLTest()+"file/delete",
            dataType:"json",
            type:"post",
            data:{
                "uid": uid,
                "suid":suid
            },
            success:function (data) {
                console.log(data)
                console.log("删除成功")
                if(functionType==="upload")
                {UploadForElements(uid,suid)}
                else
                {addElementsFunction(uid)}
            },
            error:function (data) {
                document.getElementById("uploadIframe").style.display = "none";
                swal("请求失败")
                console.log(data)
            }
        });
        $.when(my).done(function (){
            UploadForElements(uid,suid)
        })
    }
    else{
        let lst = []
        let getList = $.ajax({
            url: getURLTest()+"file/getFileIdList",
            type: "post",
            dataType: "json",
            data: {
                "fid":uid,
                "sfid":suid
            },
            success: function (data) {
                console.log(data)
                lst = data.details;
            },
            error: function () {
                document.getElementById("uploadIframe").style.display = "none";
                swal("服务器异常")
                console.log("服务器异常");
                lst = null;
            }
        });
        $.when(getList).done(function ()
        {
            let server_fileIdList = lst;
            let fileIdList = [-1]
            for(let m=0;m<article_note.length;m++){
                    fileIdList[m] = article_note[m].id.split("-")[1]
            }
            console.log(fileIdList)
            console.log(server_fileIdList)
            let numUploads = 0
            let numDeletes = 0
            let finishDeletes = 0
            for(let n=0;n<fileIdList.length;n++){
                if(server_fileIdList.indexOf(fileIdList[n])===-1){
                    console.log("上传")
                    numUploads++
                }
            }
            for(let n=0;n<server_fileIdList.length;n++){
                if(fileIdList.indexOf(server_fileIdList[n])===-1) {
                    console.log("删除")
                    numDeletes++

                    deleFileByFileid =$.ajax({
                        url: getURLTest()+"file/deleteByFileid",
                        type: "post",
                        dataType: "json",
                        async:false,
                        data: {
                            "fid":uid,
                            "sfid":suid,
                            "fileid":server_fileIdList[n]
                        },
                        success: function () {

                            finishDeletes++

                            console.log("删除成功")

                        },
                        error: function () {
                            document.getElementById("uploadIframe").style.display = "none";
                            swal("服务器异常")
                            console.log("服务器异常");
                        }

                    });
                }
            }
            if(server_fileIdList.length===0){numUploads=fileIdList.length-1}
            else{numUploads-=1}
            console.log("numUploads=========================")
            console.log(numUploads)
            console.log("numDeletes=========================")
            console.log(numDeletes)
            console.log(article_note)
            if(numDeletes>0){

                $.when(deleFileByFileid).done(function () {

                    console.log(finishDeletes)
                    if(finishDeletes===numDeletes)
                    {func(uid,suid,article_note,functionType,numUploads)}

                })

            }else{
                func(uid,suid,article_note,functionType,numUploads)
            }

        })
    }
}
async function UpdateValueFunction(upload_data,func,uid,suid,functionType) {
    let UVI;
    try {
        let k = 0;
        for (let f = 0; f < document.getElementsByClassName("upload-img-display").length; f++) {
            document.getElementsByClassName("upload-img-display")[f].href = upload_data[f].name
            document.getElementsByClassName("upload-img-display")[f].src = upload_data[f].name
            document.getElementsByClassName("upload-img-display")[f].innerHTML = upload_data[f].originalname
            document.getElementsByClassName("upload-img-display")[f].id = "img"+"-"+upload_data[f].fileid
            // document.getElementsByClassName("upload-img-display")[f].name = upload_data[f].originalname
            // console.log(document.getElementsByClassName("upload-img-display")[f].value)
            document.getElementsByClassName("upload-img-display")[f].onclick = function () {
                window.open(this.src)
            }
            // UVI = await UploadValueImport(upload_data[f].name, f)
            // $.when(UVI).done(function () {
            //     if (func && k === document.getElementsByClassName("upload-img-display").length - 1) {
            //         if(functionType==="upload"){UploadForElements(uid, suid)}
            //         else{addElementsFunction(uid)}
            //     }
            //     k++;
            // })
            //    document.getElementsByClassName("upload-img-display")[f].value = document.getElementsByClassName("hidden-value-uploadReaderValue-childNodes")[f].innerHTML;
        }
        if(functionType==="upload"){await UploadForElements(uid, suid)}
        else{addElementsFunction(uid)}
    } catch (Exception) {
        console.log(Exception)

    }
}
async function SelectValueFunction(upload_data,uid,suid,article_note,i){
    let UpF;
    for (let f = 0; f < upload_data.length(); f++) {
        if (upload_data[f].originalname === article_note[i].name) {
            UpF = await UploadValueImport(upload_data[f].name, i)
            $.when(UpF).done(function () {
                return true;
            })
        }
    }
}
async function UploadValueImport(dataName,f){
    if(document.getElementsByClassName("upload-img-display")[f].value===undefined){
        const blob = await fetch(dataName).then(r => r.blob())
        console.log(blob)
        document.getElementsByClassName("upload-img-display")[f].value = new File([blob], dataName, {type: blob.type})
    }
}
async function UploadForElements(uid,suid){
    $.ajax({
        url: getURLTest() + "textif/alterif",
        type: "post",
        dataType: "json",
        data: {
            "title": $("#title").text(),
            "text": $(".wenzhang_box_article").html(),
            "uid": uid,
            "suid": suid,
            "time": $(".wenzhang_box_content_jieshao_xieti:eq(2)").html(),
        },
        success: function (data) {
            if (data.msg !== 'fail') {
                setTimeout(function () {
                    swal("修改成功");
                    window.location.href = "noteView.html?uid=" + base64(uid) + "&suid=" + base64(suid.toString());
                }, 1000);
            } else {
                console.log("修改失败");
                console.log(data);
            }
        },
        error: function () {
            document.getElementById("uploadIframe").style.display = "none";
            swal("服务器异常");
        }
    });
}
var kp = 0;
function UploadForFolders(uid,suid,article_note,formdata,i,functionType,numUploads){
    let UploadAjax = $.ajax({
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
            document.getElementById("uploadIframe").style.display = "none";
            swal("上传失败")
            console.log(data)
        }
    });
    $.when(UploadAjax).done(function () {
        console.log(kp)
        if (kp === numUploads) {
            console.log("上传成功")
            getUploadComponents(uid, suid).then(
                r =>
                    UpdateValueFunction(r, true,uid,suid,functionType)
            )
        }
        kp++;
    })
}
function addElementsFunction(uid){
    $.ajax({
        url: getURLTest()+"textif/addif",
        type: "post",
        dataType: "json",
        data: {
            "uid": uid,
            // "suid": $(".wenzhang_box_content_jieshao_xieti:eq(0)").html(),
            "time": $(".wenzhang_box_content_jieshao_xieti:eq(2)").html(),
            "title": $("#title").text(),
            "text": $(".wenzhang_box_article").html(),
            "collect": "0"
        },
        success: function (data) {
            if (data.msg !== 'fail') {
                setTimeout(function () {
                    swal("修改成功");
                    window.location.href = "NotBook.html?" + (window.location.href).split('?')[1];
                }, 1000);
            } else {
                swal("修改失败");
                console.log("修改失败");
                console.log(data);
            }
        },
        error: function () {
            document.getElementById("uploadIframe").style.display = "none";
            swal("修改失败");
            console.log("服务器异常");
        }
    });
}


