(function(){
    var Land = window.Land = function(){
        this.image = game.B.land; //大地图片
        this.bg = new Background();
        this.x = 0;
        this.speed = this.bg.speed + 1;
    }
    Land.prototype.move = function(){
        this.x -= this.speed;
        if(this.x == -288){
            this.x = 0;
        }
    }
    Land.prototype.init = function(){
        game.ctx.drawImage(this.image,0+this.x,game.canvas.height-112);
        game.ctx.drawImage(this.image,288+this.x,game.canvas.height-112);
        game.ctx.drawImage(this.image,576+this.x,game.canvas.height-112);
        game.ctx.drawImage(this.image,864+this.x,game.canvas.height-112);
        game.ctx.drawImage(this.image,1152+this.x,game.canvas.height-112);
    }
})()