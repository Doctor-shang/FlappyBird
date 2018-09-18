(function(){
    var Background = window.Background = function(){
        this.image = game.B.bg_day; //背景图片
        this.x = 0; //背景位置
        this.speed = 3; //根据算法,速度必须是288的因数,234都可以,
    }
    //渲染
    Background.prototype.init = function(){
        game.ctx.fillStyle = '#4ec0ca'; //补背景
        game.ctx.fillRect(0,0,game.canvas.width,0.7*game.canvas.height);
        game.ctx.fillStyle = '#5ee270'; //补树林
        game.ctx.fillRect(0,0.7*game.canvas.height,game.canvas.width,0.3*game.canvas.height);
        //渲染背景
        game.ctx.drawImage(this.image,this.x,0.75*game.canvas.height-350);
        game.ctx.drawImage(this.image,288+this.x,0.75*game.canvas.height-350);
        game.ctx.drawImage(this.image,576+this.x,0.75*game.canvas.height-350);
        game.ctx.drawImage(this.image,864+this.x,0.75*game.canvas.height-350);
        game.ctx.drawImage(this.image,1152+this.x,0.75*game.canvas.height-350);
    }
    //移动
    Background.prototype.move = function(){
        this.x-=this.speed;
        if (this.x == -288) { //当背景后退一张图的距离就还原背景
            this.x =0;
        }
    }
})()
