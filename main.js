var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var bitMap = new Array(40);
for(var i = 0; i< bitMap.length;i++){
    bitMap[i] = new Array(40);
}

randNumber = function(limit){
    var ret = Math.floor(Math.random()*limit+3);
    if (ret < 39){
        return ret;
    }
    return 39;
};

startBtn = function(){
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0,0,400,400);
};