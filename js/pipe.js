(function(){
    var Pipe = window.Pipe = function(){
        this.pipe1t = game.B.pipe1t;
        this.pipe1b = game.B.pipe1b;
        this.pipe2t = game.B.pipe2t;
        this.pipe2b = game.B.pipe2b;
        this.bg = new Background();
        this.x = game.canvas.width;
        this.speed = this.bg.speed + 1;
        this.juli = 120; //两根管子间的距离
        this.alreadypass = false; //是否已经被越过
        this.height = rm.getrm((game.canvas.height-112) * 0.2 ,(game.canvas.height-112) * 0.7 );
        game.pipeArr.push(this); //把自身推入pipeArr数组
    }
    Pipe.prototype.move = function(){
        //移动
        this.x -= this.speed;

        //碰撞检测
        if (game.bird.R > this.x && game.bird.L < this.x + 52) {
            if(game.bird.T < this.height || game.bird.B > this.height + this.juli){
                game.sm.enter(4);
                
            }
        }
        if(game.bird.T < 0 || game.bird.B > game.canvas.height-112){
            game.sm.enter(4);
        }

        //加分
        if (game.bird.L > this.x + 52 && !this.alreadypass) { //小鸟越过了管子并且管子的alreadypass为false
            game.score++; //加分
            this.alreadypass = true; //标记已经越过
        }
        
    }
    Pipe.prototype.init = function(){
        game.ctx.drawImage(this.pipe1t, this.x,this.height - 500);
        game.ctx.drawImage(this.pipe1b, this.x,this.height + this.juli);
    }
})()