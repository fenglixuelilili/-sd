(function(){
    // 收集信息
    var canvas = document.getElementById("canvas")
    let ctx = canvas.getContext("2d");
    // let $ = document.querySelector.bind(this)
    let btn = document.querySelector("#btn")
    let btn_jpg = document.querySelector("#btn_jpg")
    let erWM_img_url,uploadImg
    let erweiFn = document.querySelector("#erWM")
    let imgfn = document.querySelector("#uploadImg")
    erweiFn.onchange = erWM
    imgfn.onchange = xmTanUploadImg
    function xmTanUploadImg(obj) {
        var file = this.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) { //成功读取文件
            uploadImg = e.target.result
        };
    }
    function erWM(obj){
        let file = this.files[0]
        let render = new FileReader()
        render.readAsDataURL(file)
        render.onload = function(e){
            erWM_img_url = e.target.result
        }
    }
    // 点击开始画图
    btn.onclick = function(){
        ctx.clearRect(0,0,canvas.width,canvas.height)
        canvas.style.display = "block"
        let title = document.querySelector("#title").value.trim()
        let content = document.querySelector("#content").value.trim()
        if(title.length==0 || title.length > 8){
            alert("标题不能为空或者超过了8个字")
            return
        }
        if(content.length==0){
            alert("内容不能为空")
            return
        }
        //调用画图工具
        img(erWM_img_url,160,160,553,773,{text_str:title,x:20,y:400,font_size:18,font_style:"黑体",isBold:true,isText:true,limitWidth:false,maxWidth:0,maxHeight:0})
        img(uploadImg,734,734,0,0,{text_str:content,x:18,y:420,font_size:12,font_style:"黑体",isBold:false,isText:true,limitWidth:true,maxWidth:242,maxHeight:60})
        // 清空文本框 和 图片
        document.querySelector("#title").value = ''
        document.querySelector("#content").value = ''
        document.querySelector("#uploadImg").outerHTML = document.querySelector("#uploadImg").outerHTML 
        document.querySelector("#erWM").outerHTML = document.querySelector("#erWM").outerHTML 
    }
    // 点击保存成图片
    btn_jpg.onclick = function(){
        // console.log("保存")
        let src = canvas.toDataURL();
        let img = document.querySelector("#img")
        img.src=src
        console.log(src)
    }
    // 图片转以及绘图工具函数
    function img(url,width,height,x,y,textObj = {text_str:"您什么也没写",x:0,y:0,font_size:20,font_style:"微软雅黑",isBold:true,isText:true,limitWidth:false,maxWidth:0,maxHeight:0}){
        let imgObj = new Image()
        imgObj.src = url
        console.log(imgObj)
        imgObj.onload = function(){
            ctx.drawImage(imgObj, x/2, y/2,parseInt(width/2),parseInt(height/2));
        }
        ctx.beginPath()
        // 绘制文字
        if(textObj.isText){
            ctx.fillStyle = "#000"
            // 是否加粗
            let bold = textObj.isBold ? 'bold' : ''

            // 设置文字样式
            ctx.font = `${bold} ${textObj.font_size}px ${textObj.font_style}`;
            console.log(`${bold} ${textObj.font_size}px ${textObj.font_style}`)

            // 开始绘制
            if(!textObj.limitWidth){
                ctx.fillText(textObj.text_str,textObj.x,textObj.y)
            }else{
                // 每行的文字
                let num = 18
                // 第几行
                let line = 1
                // 剩余文字
                let str = textObj.text_str
                // 剩余长度
                let strLength = ctx.measureText(textObj.text_str).width

                //如果长度太短的话则直接绘制
                console.log(strLength,textObj.maxWidth)
                if(strLength < textObj.maxWidth){
                    ctx.fillText(textObj.text_str,textObj.x,textObj.y,textObj.maxWidth,textObj.maxHeight)
                    return
                }

                while(strLength > textObj.maxWidth){
                    console.log("绘制长的")
                    ctx.fillText(str.substr(0,num),textObj.x,textObj.y + (line*textObj.font_size),textObj.maxWidth,textObj.maxHeight)
                    line++
                    str = str.substr(num)
                    strLength = ctx.measureText(str).width
                    
                }
                // ctx.fillText(textObj.text_str,textObj.x,textObj.y,textObj.maxWidth,textObj.maxHeight)
            }
        }
    }

})(window)