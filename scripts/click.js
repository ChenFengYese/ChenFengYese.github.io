
window.addEventListener('load', function () {
        let body = document.body;
        let content = ["❤去活出你自己。❤", "❤May all the beauty be blessed❤", "❤愿世上所有美好都能被祝福❤", "❤薪火相传❤", "❤为世上所有的美好而战❤",
            "❤美德不灭❤", "❤风雨犹祝，山海同欢，是承天地之佑❤", "❤星移斗转，沧海桑田，烟火人间依旧❤", "❤功名在我，百岁千秋，勿忘秉烛夜游❤", "❤今古诸事，激荡中流，宏图待看新秀 ❤",
            "❤年岁一箸，山海一壶。❤", "❤阅古话今，几度春秋。❤", "❤炊烟喜乐，柴米朝暮。❤", "❤纤云逐月，尘世系舟。❤", "❤世事易变，匪石弗转❤", "❤谁也没有见过爱情，直到有花束抛向自己。❤",
            "❤与君相别离，不知何日是归期，我如朝露转瞬晞。❤", "❤万商云来，千船继至，百货叠出❤",
            "❤霞彩换花火,花火知我愿❤", "❤我愿入夜空，夜空自甄明❤", "❤不要放弃❤", "❤醒时恐为梦一场，事事俱忘，何处是吾乡❤", "❤星与你消失之日❤", "❤锦筝叹千年，月下渡忘川❤",
            "❤曲高未必人不识❤", "❤自有知音和清词❤", "❤花与月与海❤", "❤天空之城❤", "❤难言的微笑❤", "❤隐形的翅膀❤",
            "❤明天你好❤", "❤regression❤", "❤浮生如梦❤", "❤白鹭归庭❤", "❤一樽还酹江月❤", "❤一梦千宵❤",
            "❤最后一课❤", "回家的路", "❤乡愁如丝❤", "❤驻足在这星空下❤", "❤年年岁岁花相似❤", "❤天空的音符❤",
            "❤花之舞❤", "❤彼女は旅に出る❤", "❤所念皆星河❤"
        ] //自定义内容的数组
        body.addEventListener('click', function (e) {
            let x = e.pageX;
            let y = e.pageY; //当前坐标
            let randContent = Math.ceil(Math.random() * content.length);
            let text = new Text(x, y, randContent);
            let span = document.createElement('span');
            span.style.color = text.getRandom();
            span.style.cssText = " position: absolute;user-select: none;"
                
            text.create(span);
            setTimeout(function () {
                text.out(span)
            }, 1900)
        })

        function Text(x, y, rand) {
            this.x = x;
            this.y = y;
            this.rand = rand;
        }
        Text.prototype.create = function (_this) {
            let body = document.body;
            _this.innerHTML = content[this.rand - 1];
            _this.className = 'text';
            _this.style.top = this.y - 20 + 'px';
            _this.style.left = this.x - 50 + 'px';
            _this.style.animation = 'remove 2s';
            body.appendChild(_this);
            let i = 0;
            setInterval(() => {
                _this.style.top = this.y - 20 - i + 'px';
                i++
            }, 10);
        };
        Text.prototype.out = function (_this) {
            _this.remove()
        };
        //设置随机颜色
        Text.prototype.getRandom = function () {
            let allType = '0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f'; //16进制颜色
            let allTypeArr = allType.split(','); //通过','分割为数组
            let color = '#';
            for (var i = 0; i < 6; i++) {
                //随机生成一个0-16的数
                var random = parseInt(Math.random() * allTypeArr.length);
                color += allTypeArr[random];
            }
            return color; //返回随机生成的颜色
        }
    });
