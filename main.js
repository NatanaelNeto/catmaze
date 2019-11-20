var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var pcentSpan = document.getElementById("pcentValue");
var slider = document.getElementById("pcent");
var mapSize = 1600;
var density;
var bitMap;
var goalA;
var goalB;
var sA;
var sB;
var toVisit = [];
var visited = [];


var Node = {
    a: null,
    b: null,
    pA: null,
    pB: null,
    type: null,
    h: null,
    g: null,
    v: false,
    c: false
}

randNumber = function(limit){
    var ret = Math.floor(Math.random()*limit);
    return ret;
};

distMapGen = function(a,b,x,y){
    return Math.sqrt( ((Math.pow((x-a),2)) + (Math.pow((y-b),2)) ) );
}

setPCent = function(v){
    pcentSpan.innerHTML = v + "%";
}

startBtn = function(){
    bitMap = new Array(40);
    for(var i = 0; i< 40;i++){
        bitMap[i] = new Array(40);
        for(var j = 0; j < 40; j++){
            bitMap[i][j] = Object.create(Node);
            bitMap[i][j].type = 0;
            bitMap[i][j].a = i;
            bitMap[i][j].b = j;
        }
    }
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0,0,400,400);
    density = Math.floor(mapSize*(slider.value/100));
    for(var i = 0; i < density; i++){
        var a = randNumber(40);
        var b = randNumber(40);
        while(bitMap[a][b].type == 1){
            a = randNumber(40);
            b = randNumber(40);
        }
        bitMap[a][b].type = 1;
    }
    for(var i = 0; i < 40; i++){
        for(var j = 0; j < 40; j++){
            if(bitMap[i][j].type == 1){
                ctx.fillStyle = "#000000";
                ctx.fillRect(i*10,j*10,10,10);
            }
        }
    }
    var a = randNumber(40);
    var b = randNumber(40);

    while(bitMap[a][b].type == 1){
        a = randNumber(40);
        b = randNumber(40);
    }
    bitMap[a][b].type = 2;
    bitMap[a][b].h = 0;
    goalA = a;
    goalB = b;
    ctx.fillStyle = "#ee0000";
    ctx.fillRect(a*10,b*10,10,10);
    while(bitMap[a][b].type == 1 | bitMap[a][b].type == 2){
        a = randNumber(40);
        b = randNumber(40);
    }
    bitMap[a][b].type = 3;
    bitMap[a][b].g = 0;
    sA = a;
    sB = b;
    ctx.fillStyle = "#0000ee";
    ctx.fillRect(a*10,b*10,10,10);
};

insertPQ = function(node){
    if(toVisit.length == 0){
        toVisit.push(node);
    }
    for(var i = 0; i < toVisit.length; i++){
        if((node.h+node.g) <= (toVisit[i].h+toVisit[i].g)){
            toVisit.splice(i,0,node);
            i = toVisit.length+1;
        }else if(i == toVisit.length-1 && ((node.h+node.g) > (toVisit[i].h+toVisit[i].g))){
            toVisit.push(node);
        }
    }
    ctx.fillStyle = "#aaaaaa";
    ctx.fillRect(node.a*10, node.b*10,10,10);
    ctx.fillStyle = "#0000ee";
    ctx.fillRect(sA*10,sB*10,10,10);
    ctx.fillStyle = "#ee0000";
    ctx.fillRect(goalA*10,goalB*10,10,10);
};

startSearch = function(){
    toVisit = [];
    visited = [];
    var goalReached = false;
    
    for(var i = 0; i < 40; i++){
        for(var j = 0; j < 40; j++){
            if(bitMap[i][j].type != 1){
                bitMap[i][j].h = distMapGen(i,j,goalA,goalB);
            }
        }
    }

    bitMap[sA][sB].pA = sA;
    bitMap[sA][sB].pB = sB;
    toVisit.push(bitMap[sA][sB]);
    while(toVisit.length > 0 && !goalReached){
        var aux = toVisit.shift();
        visited.push(aux);
        bitMap[aux.a][aux.b].c = true;
        if(aux.h == 0){
            goalReached = true;
        }else{
            
            if(aux.a-1 >= 0){
                if(aux.b-1 >= 0 && bitMap[aux.a-1][aux.b-1].type != 1 && bitMap[aux.a-1][aux.b].type != 1 && bitMap[aux.a][aux.b-1].type != 1 && !bitMap[aux.a-1][aux.b-1].c){
                    if(!bitMap[aux.a-1][aux.b-1].v){
                        bitMap[aux.a-1][aux.b-1].g = aux.g+1.1;
                        bitMap[aux.a-1][aux.b-1].pA = aux.a;
                        bitMap[aux.a-1][aux.b-1].pB = aux.b;
                        bitMap[aux.a-1][aux.b-1].v = true;
                        insertPQ(bitMap[aux.a-1][aux.b-1]);
                    }else if(bitMap[aux.a-1][aux.b-1].g > (aux.g+1.1)){
                        bitMap[aux.a-1][aux.b-1].g = aux.g+1.1;
                        bitMap[aux.a-1][aux.b-1].pA = aux.a;
                        bitMap[aux.a-1][aux.b-1].pB = aux.b;
                    }
                }
                if(bitMap[aux.a-1][aux.b].type != 1 && !bitMap[aux.a-1][aux.b].c){
                    if(!bitMap[aux.a-1][aux.b].v){
                        bitMap[aux.a-1][aux.b].g = aux.g+1;
                        bitMap[aux.a-1][aux.b].pA = aux.a;
                        bitMap[aux.a-1][aux.b].pB = aux.b;
                        bitMap[aux.a-1][aux.b].v = true;
                        insertPQ(bitMap[aux.a-1][aux.b]);
                    }else if(bitMap[aux.a-1][aux.b].g> (aux.g+1.1)){
                        bitMap[aux.a-1][aux.b].g = aux.g+1;
                        bitMap[aux.a-1][aux.b].pA = aux.a;
                        bitMap[aux.a-1][aux.b].pB = aux.b;
                    }
                }
                if(aux.b+1 < 40 && bitMap[aux.a-1][aux.b+1].type != 1 && bitMap[aux.a-1][aux.b].type != 1 && bitMap[aux.a][aux.b+1].type != 1 && !bitMap[aux.a-1][aux.b+1].c){
                    if(!bitMap[aux.a][aux.b+1].v){
                        bitMap[aux.a][aux.b+1].g = aux.g+1.1;
                        bitMap[aux.a][aux.b+1].pA = aux.a;
                        bitMap[aux.a][aux.b+1].pB = aux.b;
                        bitMap[aux.a][aux.b+1].v = true;
                        insertPQ(bitMap[aux.a][aux.b+1]);
                    }else if(bitMap[aux.a][aux.b+1].g > (aux.g+1.1)){
                        bitMap[aux.a][aux.b+1].g = aux.g+1.1;
                        bitMap[aux.a][aux.b+1].pA = aux.a;
                        bitMap[aux.a][aux.b+1].pB = aux.b;
                    }
                }
            }
            if(aux.b-1 >= 0 && bitMap[aux.a][aux.b-1].type != 1 && !bitMap[aux.a][aux.b-1].c){
                if(!bitMap[aux.a][aux.b-1].v){
                    bitMap[aux.a][aux.b-1].g = aux.g+1;
                    bitMap[aux.a][aux.b-1].pA = aux.a;
                    bitMap[aux.a][aux.b-1].pB = aux.b;
                    bitMap[aux.a][aux.b-1].v = true;
                    insertPQ(bitMap[aux.a][aux.b-1]);
                }else if(bitMap[aux.a][aux.b-1].g > (aux.g+1.1)){
                    bitMap[aux.a][aux.b-1].g = aux.g+1;
                    bitMap[aux.a][aux.b-1].pA = aux.a;
                    bitMap[aux.a][aux.b-1].pB = aux.b;
                }
            }
            if(aux.b+1 < 40 && bitMap[aux.a][aux.b+1].type != 1 && !bitMap[aux.a][aux.b+1].c){
                if(!bitMap[aux.a][aux.b+1].v){
                    bitMap[aux.a][aux.b+1].g = aux.g+1;
                    bitMap[aux.a][aux.b+1].pA = aux.a;
                    bitMap[aux.a][aux.b+1].pB = aux.b;
                    bitMap[aux.a][aux.b+1].v = true;
                    insertPQ(bitMap[aux.a][aux.b+1]);
                }else if(bitMap[aux.a][aux.b+1].g > (aux.g+1.1)){
                    bitMap[aux.a][aux.b+1].g = aux.g+1;
                    bitMap[aux.a][aux.b+1].pA = aux.a;
                    bitMap[aux.a][aux.b+1].pB = aux.b;
                }
            }
            if(aux.a+1 < 40){
                if(aux.b-1 >= 0 && bitMap[aux.a+1][aux.b-1].type != 1 && bitMap[aux.a+1][aux.b].type != 1 && bitMap[aux.a][aux.b-1].type != 1 && !bitMap[aux.a+1][aux.b-1].c){
                    if(!bitMap[aux.a+1][aux.b-1].v){
                        bitMap[aux.a+1][aux.b-1].g = aux.g+1.1;
                        bitMap[aux.a+1][aux.b-1].pA = aux.a;
                        bitMap[aux.a+1][aux.b-1].pB = aux.b;
                        bitMap[aux.a+1][aux.b-1].v = true;
                        insertPQ(bitMap[aux.a+1][aux.b-1]);
                    }else if(bitMap[aux.a+1][aux.b-1].g > (aux.g+1.1)){
                        bitMap[aux.a+1][aux.b-1].g = aux.g+1.1;
                        bitMap[aux.a+1][aux.b-1].pA = aux.a;
                        bitMap[aux.a+1][aux.b-1].pB = aux.b;
                    }
                }
                if(bitMap[aux.a+1][aux.b].type != 1 && !bitMap[aux.a+1][aux.b].c){
                    if(!bitMap[aux.a+1][aux.b].v){
                        bitMap[aux.a+1][aux.b].g = aux.g+1;
                        bitMap[aux.a+1][aux.b].pA = aux.a;
                        bitMap[aux.a+1][aux.b].pB = aux.b;
                        bitMap[aux.a+1][aux.b].v = true;
                        insertPQ(bitMap[aux.a+1][aux.b]);
                    }else if(bitMap[aux.a+1][aux.b].g > (aux.g+1.1)){
                        bitMap[aux.a+1][aux.b].g = aux.g+1;
                        bitMap[aux.a+1][aux.b].pA = aux.a;
                        bitMap[aux.a+1][aux.b].pB = aux.b;
                    }
                }
                if(aux.b+1 < 40 && bitMap[aux.a+1][aux.b+1].type != 1 && bitMap[aux.a+1][aux.b].type != 1 && bitMap[aux.a][aux.b+1].type != 1 && !bitMap[aux.a+1][aux.b+1].c){
                    if(!bitMap[aux.a+1][aux.b+1].v){
                        bitMap[aux.a+1][aux.b+1].g = aux.g+1.1;
                        bitMap[aux.a+1][aux.b+1].pA = aux.a;
                        bitMap[aux.a+1][aux.b+1].pB = aux.b;
                        bitMap[aux.a+1][aux.b+1].v = true;
                        insertPQ(bitMap[aux.a+1][aux.b+1]);
                    }else if(bitMap[aux.a+1][aux.b+1].g > (aux.g+1.1)){
                        bitMap[aux.a+1][aux.b+1].g = aux.g+1.1;
                        bitMap[aux.a+1][aux.b+1].pA = aux.a;
                        bitMap[aux.a+1][aux.b+1].pB = aux.b;
                    }
                }
            }
        }
    }

    var rA = goalA;
    var rB = goalB;
    while(true){
        if(rA == sA){
            if(rB == sB){
                break;
            }
        }
        rA = bitMap[rA][rB].pA;
        rB = bitMap[rA][rB].pB;
        ctx.fillStyle = "#00ee00";
        ctx.fillRect(rA*10,rB*10,10,10);
    }
    ctx.fillStyle = "#0000ee";
    ctx.fillRect(sA*10,sB*10,10,10);
};