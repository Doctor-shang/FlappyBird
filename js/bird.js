(function(){
    var Bird = window.Bird = function(){
        this.color = rm.getrm(0,3);
        this.birdArr = [
            [game.B.bird0_0,game.B.bird0_1,game.B.bird0_2],
            [game.B.bird1_0,game.B.bird1_1,game.B.bird1_2],
            [game.B.bird2_0,game.B.bird2_1,game.B.bird2_2]
        ];
        this.y = game.canvas.height * (1-0.618); //起始位置
        this.x = game.canvas.width * (1-0.618); //起始位置
        this.type = 0; //鸟的状态
        this.add = 1; //每帧增加
    }
    Bird.prototype.init = function(){
        this.T = this.y - 10; //鸟的上边界
        this.R = this.x + 15;
        this.B = this.y + 10;
        this.L = this.x - 15;
        game.ctx.save(); //保存ctx
        game.ctx.translate( this.x,this.y);
        game.ctx.rotate(Math.PI/180 * this.type*3) //根据type的值判断鸟的旋转
        if(game.fno % 6 == 0 || game.fno % 6 == 1){ //根据帧数判断翅膀状态
            game.ctx.drawImage(this.birdArr[this.color][0], -17, -12);
        }else if(game.fno % 6 == 2 || game.fno % 6 == 3){
            game.ctx.drawImage(this.birdArr[this.color][1], -17, -12);
        }else if(game.fno % 6 == 4 || game.fno % 6 == 5){
            game.ctx.drawImage(this.birdArr[this.color][2], -17, -12);
        }
        game.ctx.restore(); //还原ctx
    }
    Bird.prototype.move = function(){
        //掉落算法
        this.type++; //调整鸟的状态
        this.y += this.type * this.add;
    }
    Bird.prototype.jump = function(){
        var that = this;
        addEventListener('click',function(){
            that.type = -11
        })
    }
})()
