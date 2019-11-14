var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var pcentSpan = document.getElementById("pcentValue");
var slider = document.getElementById("pcent");
var mapSize = 1600;
var density;
var bitMap;

randNumber = function(limit){
    var ret = Math.floor(Math.random()*limit);
    return ret;
};

setPCent = function(v){
    pcentSpan.innerHTML = v + "%";
}

startBtn = function(){
    bitMap = new Array(40);
    for(var i = 0; i< bitMap.length;i++){
        bitMap[i] = new Array(40);
    }
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0,0,400,400);
    density = Math.floor(mapSize*(slider.value/100));
    for(var i = 0; i < density; i++){
        var a = randNumber(40);
        var b = randNumber(40);
        while(bitMap[a][b] == 1){
            a = randNumber(40);
            b = randNumber(40);
        }
        bitMap[a][b] = 1;
    }
    for(var i = 0; i < 40; i++){
        for(var j = 0; j < 40; j++){
            if(bitMap[i][j] == 1){
                ctx.fillStyle = "#000000";
                ctx.fillRect(i*10,j*10,10,10);
            }
        }
    }
};