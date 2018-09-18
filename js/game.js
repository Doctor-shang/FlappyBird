(function(win){
    function Game(){
        //得到画布
        this.canvas = $('#mycanvas').get(0);
        this.ctx = this.canvas.getContext('2d')
        this.jsonurl = '../a.json'; //json文件位置
        this.fno = 0; //帧序号
        this.pipeArr = []; //管子数组
        this.score = 0; //记录分数
        this.imgarr = [
            {"name": "bg_day","url": "./Images/bg_day.png"},
            {"name": "bird0_0","url": "./Images/bird0_0.png"},
            {"name": "bird0_1","url": "./Images/bird0_1.png"},
            {"name": "bird0_2","url": "./Images/bird0_2.png"},
            {"name": "bird1_0","url": "./Images/bird1_0.png"},
            {"name": "bird1_1","url": "./Images/bird1_1.png"},
            {"name": "bird1_2","url": "./Images/bird1_2.png"},
            {"name": "bird2_0","url": "./Images/bird2_0.png"},
            {"name": "bird2_1","url": "./Images/bird2_1.png"},
            {"name": "bird2_2","url": "./Images/bird2_2.png"},
            {"name": "button_play","url": "./Images/button_play.png"},
            {"name": "land","url": "./Images/land.png"},
            {"name": "pipe1t","url": "./Images/pipe_down.png"},
            {"name": "pipe1b","url": "./Images/pipe_up.png"},
            {"name": "pipe2t","url": "./Images/pipe_down.png"},
            {"name": "pipe2b","url": "./Images/pipe_up.png"},
            {"name": "num0","url": "./Images/font_048.png"},
            {"name": "num1","url": "./Images/font_049.png"},
            {"name": "num2","url": "./Images/font_050.png"},
            {"name": "num3","url": "./Images/font_051.png"},
            {"name": "num4","url": "./Images/font_052.png"},
            {"name": "num5","url": "./Images/font_053.png"},
            {"name": "num6","url": "./Images/font_054.png"},
            {"name": "num7","url": "./Images/font_055.png"},
            {"name": "num8","url": "./Images/font_056.png"},
            {"name": "num9","url": "./Images/font_057.png"},
            {"name": "logo","url": "./Images/title.png"},
            {"name": "jiaocheng","url": "./Images/tutorial.png"},
            {"name": "gg","url": "./Images/text_game_over.png"},
            {"name": "jiesuan","url": "./Images/score_panel.png"},
            {"name": "medals0","url": "./Images/medals_0.png"},
            {"name": "medals1","url": "./Images/medals_1.png"},
            {"name": "medals2","url": "./Images/medals_2.png"},
            {"name": "medals3","url": "./Images/medals_3.png"}
        ]
        var that = this; //使上下文一直为this
        this.already(function(){
            that.start();
        })
    }
    Game.prototype.init = function(){ //初始化canvas
        this.canvas.width = document.documentElement.clientWidth;
        this.canvas.height = document.documentElement.clientHeight;
    }
    Game.prototype.already = function(callback){ //加载图片
        this.B = {}; //图片对象
        var readyimg = 0; //加载完成的图片数目
        var that = this; 
        //http请求
        
                for (let i = 0; i < this.imgarr.length; i++) {
                    that.B[this.imgarr[i].name] = new Image(); //设置键名并new信图片
                    that.B[this.imgarr[i].name].src = this.imgarr[i].url; //设置路径
                    that.B[this.imgarr[i].name].onload = function(){
                        readyimg++; //计数
                        that.ctx.clearRect(0,0,that.canvas.width,that.canvas.height); //清屏
                        var txt = '正在加载资源'+readyimg+'/'+that.imgarr.length+'请稍后'; //设置文本
                        that.ctx.font = '20px  黑体'; //设置字体
                        that.ctx.textAlign = 'center'; //居中
                        that.ctx.fillText(txt,that.canvas.width/2,that.canvas.height * (1 - 0.618)); //提示文字
                        if(readyimg == that.imgarr.length){
                            callback()
                        }
                    }
                }
            
        
    }
    //game类只负责渲染场景管理器,不负责更新各种演员
    Game.prototype.start = function(){ //游戏初始化
        
        this.sm = new SceneManager()
        this.bird = new Bird();
        var that = this;

        this.timer = setInterval(function(){
            //清屏
            that.ctx.clearRect(0,0,that.canvas.width,that.canvas.height);

            that.sm.init();
            that.sm.update();
            //帧编号
            that.fno++;
            that.ctx.font = '16px 微软雅黑';
            that.ctx.textAlign = 'left';
            // that.ctx.fillStyle = '#000';
            // that.ctx.fillText('帧编号' + that.fno,10,20);
            // that.ctx.fillText('场景编号' + that.sm.sceneNum,10,40);
        },40);
    }
    win.game = new Game()
})(window)













// var mycanvas = document.getElementById('mycanvas'); //拿到canvas
// var ctx = mycanvas.getContext('2d'); //拿到上下文

// mycanvas.width = document.documentElement.clientWidth; //设置canvas的宽高为屏幕的宽高
// mycanvas.height = document.documentElement.clientHeight;

// //资源对象
// var B = {}
// //完成加载的图片数量
// var readyimg = 0;
// //外置json来配置并管理资源
// var xhr = new XMLHttpRequest();
// xhr.onreadystatechange = function () {
//     if (xhr.readyState == 4) {
//         // alert(xhr.responseText) 
//         //现在传来的东西是字符串,要转换为对象
//         var birdimg = JSON.parse(xhr.responseText);
//         for (let i = 0; i < birdimg.images.length; i++) {
//             //把Images里的几个name值变为bird的几个键名
//             B[birdimg.images[i].name] = new Image();
//             //http请求来几张图片
//             B[birdimg.images[i].name].src = birdimg.images[i].url
//             //添加监听事件
//             B[birdimg.images[i].name].onload = function () {
//                 readyimg++;
//                 //清屏
//                 ctx.clearRect(0, 0, mycanvas.width, mycanvas.height);
//                 //显示加载进度
//                 ctx.fillText("正在加载第" + readyimg + '/' + birdimg.images.length + '张图片', 100, 100)
//                 //判断是否全部加载完成
//                 if (readyimg == birdimg.images.length) {
//                     //开始主函数
//                     start()
//                 }
//             }
//         }
//     }
// }
// xhr.open("get", "./Images/a.json", true);
// xhr.send(null);

// function start() {
//     var fno = 0;
//     var step = 0;
//     setInterval(function () {
//         fno++;
//         if (step == 3) {
//             step = 0
//         }
//         //清屏
//         ctx.clearRect(0, 0, mycanvas.width, mycanvas.height);
//         ctx.font = '10px,宋体'; //设置字体
//         ctx.fillText(fno, 10, 10); //显示帧数
//         console.log(step)
//         ctx.drawImage(B.bird, 52 * step, 0, 52, 45, 50, 50, 52, 45)
//         step++;
//     }, 50)
// }