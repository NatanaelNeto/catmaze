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

distMapGen = function(a,b,x,y){
    return Math.sqrt( ((Math.pow((a+x),2)) + (Math.pow((b+y),2)) ) );
}

setPCent = function(v){
    pcentSpan.innerHTML = v + "%";
}

startBtn = function(){
    bitMap = new Array(40);
    distMap = new Array(40);
    for(var i = 0; i< bitMap.length;i++){
        bitMap[i] = new Array(40);
        distMap[i] = new Array(40);
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
    var a = randNumber(40);
    var b = randNumber(40);

    while(bitMap[a][b] == 1){
        a = randNumber(40);
        b = randNumber(40);
    }
    bitMap[a][b] = 2;
    var goalA = a;
    var goalB = b;
    ctx.fillStyle = "#ee0000";
    ctx.fillRect(a*10,b*10,10,10);
    while(bitMap[a][b] == 1 | bitMap[a][b] == 2){
        a = randNumber(40);
        b = randNumber(40);
    }
    bitMap[a][b] = 3;
    var sA = a;
    var sB = b;
    ctx.fillStyle = "#0000ee";
    ctx.fillRect(a*10,b*10,10,10);

    for(var i = 0; i < 40; i++){
        for(var j = 0; j < 40; j++){
            distMap[i][j] = distMapGen(i,j,goalA,goalB);
        }
    }
};