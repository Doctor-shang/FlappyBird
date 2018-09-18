//生成随机数
(function (win) {
    function Random(){}; //声明构造函数
    Random.prototype.getrm=function (min,max){ //给构造函数的原型对象添加方法,节省内存
        return Math.floor(Math.random() * (max - min) + min) //通过min,max,来控制随机数的取值范围,并返回随机数
    }
    win.rm = new Random() //把构造函数实例化并且传入全局环境
})(window); //生成自调用函数并且传入window,使之创建一个全局对象
// 例: console.log(rm.getrm(0,10)) 
//直接调用全局变量下的rm函数里的getrm并传入min,max参数即可生成相应的随机数