//场景管理器
(function(){
    var SceneManager = window.SceneManager = function () {
        //1表示欢迎界面,2表示游戏界面,3表示结算界面
        this.sceneNum = 1;
        this.logoY = -48;
        this.logo = game.B.logo;
        this.btn = game.B['button_play'];
        this.jiaocheng = game.B.jiaocheng;
        this.touming = 1;
        this.toumingisdown = true;
        this.btnY = game.canvas.height;
        this.bg = new Background();
        this.land = new Land();
        this.pipe = new Pipe();
        this.downstep = -3

        this.bindEvent();
    }
    SceneManager.prototype.init = function(){
        switch (this.sceneNum) {
            case 1:
                //清屏
                game.ctx.clearRect(0,0,game.canvas.width,game.canvas.height)
                this.bg.init();
                this.land.init();
                game.ctx.drawImage(game.bird.birdArr[0][0],game.canvas.width/2 - 17,game.canvas.height*0.38)
                game.ctx.drawImage(this.logo,game.canvas.width/2 - 89,this.logoY);
                game.ctx.drawImage(this.btn,game.canvas.width/2 - 58,this.btnY);
                break;
            case 2:
                this.bg.init();
                this.land.init();
                game.bird.init();
                game.ctx.save();
                game.ctx.globalAlpha = this.touming;
                game.ctx.drawImage(this.jiaocheng,game.canvas.width/2-57,100);
                game.ctx.restore();
                break;
            case 3:
                this.bg.init();
                if (game.fno%50 == 0) {
                    new Pipe();
                }
                for (let i = 0; i < game.pipeArr.length; i++) {
                    game.pipeArr[i].init()
                }
                this.land.init();
                game.bird.init();
                //渲染分数
                var scorelength = game.score.toString().length; //分数的位数
                for (let i = 0; i < scorelength; i++) {
                    game.ctx.drawImage(game.B['num' + game.score.toString().charAt(i)]  ,game.canvas.width/2 - scorelength*17 + 34*i , 50);
                }
                break;
            case 4:
                this.bg.init();
                if (game.fno%50 == 0) {
                    new Pipe();
                }
                for (let i = 0; i < game.pipeArr.length; i++) {
                    game.pipeArr[i].init()
                }
                this.land.init();
                game.bird.init();
                //渲染分数
                var scorelength = game.score.toString().length; //分数的位数
                for (let i = 0; i < scorelength; i++) {
                    game.ctx.drawImage(game.B['num' + game.score.toString().charAt(i)]  ,game.canvas.width/2 - scorelength*17 + 34*i , 50);
                }
                if (this.downstep > 20) {
                    game.ctx.drawImage(game.B.gg,game.canvas.width/2-102,game.canvas.height*0.25);
                }
                //奖牌和分数和再来一局
                if (this.downstep > 50) {
                    game.ctx.drawImage(game.B.jiesuan,game.canvas.width/2-119,game.canvas.height*0.4);
                    for (let i = 0; i < scorelength; i++) {
                        game.ctx.drawImage(game.B['num' + game.score.toString().charAt(i)]  ,game.canvas.width/2 + 80 - scorelength*17 + 17*i ,game.canvas.height*0.4+34,12,22);
                    }
                    if (game.score >= 80) {
                        game.ctx.drawImage(game.B.medals1,game.canvas.width/2-88,game.canvas.height*0.4 + 42);
                    }else if(game.score >= 50){
                        game.ctx.drawImage(game.B.medals2,game.canvas.width/2-88,game.canvas.height*0.4 + 42);
                    }else if(game.score >= 20){
                        game.ctx.drawImage(game.B.medals3,game.canvas.width/2-88,game.canvas.height*0.4 + 42);
                    }else{
                        game.ctx.fillStyle = '#000';
                        game.ctx.fillText('木有奖牌',game.canvas.width/2-95,game.canvas.height*0.4 + 69);
                    }
                    game.ctx.drawImage(this.btn,game.canvas.width/2-58,game.canvas.height*0.6);
                }

                break;
        
            default:
                break;
        }
    }
    SceneManager.prototype.update = function(){
        //根据场景编号,决定渲染内容
        switch (this.sceneNum) {
            case 1:
                if (this.logoY < game.canvas.height*0.25) {
                    this.logoY+=5;
                }
                if (this.btnY > game.canvas.height*0.5) {
                    this.btnY-=8;
                }
                break;
            case 2:
                if (this.toumingisdown) {
                    this.touming -= 0.1;
                }else{
                    this.touming += 0.1
                }
                if(this.touming < 0.1 || this.touming > 1){
                    this.toumingisdown = !this.toumingisdown
                }
                break;
            case 3:
                this.bg.move();
                this.land.move();
                game.bird.move();
                for (let i = 0; i < game.pipeArr.length; i++) {
                    game.pipeArr[i].move()
                    
                }
                //当管子多于5根时,删除最早出现的管子,避免后期运算量大
                if (game.pipeArr.length > 5) {
                    game.pipeArr.shift();
                }
                break;
            case 4:
                this.downstep ++;
                game.bird.y+=this.downstep*3
                break;
        
            default:
                break;
        }
    }
    //切换场景的方法
    SceneManager.prototype.enter = function(num){
        this.sceneNum = num;
        switch (this.sceneNum) {
            case 1:
                this.logoY = -48;
                this.btnY = game.canvas.height;
                break;
            case 2:
                break;
            case 3:
                game.fno = 0;
                break;
            case 4:
                break;
            default:
                break;
        }
    }
    //添加监听
    SceneManager.prototype.bindEvent = function(){
        var that = this;
        game.canvas.onclick = function(event){
            //获取鼠标位置
            var mouseX = event.clientX;
            var mouseY = event.clientY;
            switch (that.sceneNum) {
                case 1:
                    if (mouseX >= game.canvas.width/2 - 52 && mouseX <= game.canvas.width/2 + 52 && mouseY >= that.btnY + 3 && mouseY <= that.btnY + 61) {
                        game.bird.y = game.canvas.height * (1-0.618); //鸟的数据复原
                        game.bird.x = game.canvas.width * (1-0.618);
                        that.enter(2)
                    }
                    break;
                case 2:
                    that.enter(3);
                    game.pipeArr = [];
                    game.fno = 0;
                    game.bird.jump()
                    break;
                case 3:
                    
                    break;
                case 4:
                    if (mouseX >= game.canvas.width/2 - 52 && mouseX <= game.canvas.width/2 + 52 && mouseY >= game.canvas.height*0.6 + 3 && mouseY <= game.canvas.height*0.6 + 61) {
                        that.enter(1);
                        that.downstep = -3;
                        game.fno = 0;
                        game.score = 0;
                        clearInterval(game.timer)
                        // game.bird.type = 0
                        game.start()
                    }
                    break;
            
                default:
                    break;
            }
        }
    }
})()