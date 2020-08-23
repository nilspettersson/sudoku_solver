var array =[[5,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,3,4,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0]];

var solutions = 0;
var solved = false;

var bord = generateBord(22);
console.log(bord);

solved = false;


var bordSolve2 = [];
for(var i = 0; i < 9; i++){
    bordSolve2.push([]);
    for(var j = 0; j < 9; j++){
        bordSolve2[i].push(0);
    }
}
for(var i = 0; i <  bord.length; i++){
    for(var j = 0; j < bord[i].length; j++){
        bordSolve2[i][j] = bord[i][j];
    }
}

isSolvable(bordSolve2);
console.log(bordSolve2);


function generateBord(numberAmount){
    var bord = [];
    for(var y = 0; y < 9; y++){
        bord.push([]);
        for(var x = 0; x < 9; x++){
            bord[y].push(0);
        }
    }
    while(numberAmount > 0){
        var x = parseInt(Math.random()*9, 10);
        var y = parseInt(Math.random()*9, 10);
        var n = parseInt(Math.random()*9, 10) + 1;
        if(possible(x, y, n, bord) && bord[y][x] == 0){
            bord[y][x] = n;

            //temp bord.
            var bordSolve = [];
            for(var i = 0; i < 9; i++){
                bordSolve.push([]);
                for(var j = 0; j < 9; j++){
                    bordSolve[i].push(0);
                }
            }
            for(var i = 0; i <  bord.length; i++){
                for(var j = 0; j < bord[i].length; j++){
                    bordSolve[i][j] = bord[i][j];
                }
            }
            //check if the bord can be solved.
            if(isSolvable(bordSolve)){
                numberAmount--;
            }
            else{
                bord[y][x] = 0;
            }
        }
    }
    return bord;
}

function possible(x, y, num, bord){
    //check vertical.
    for(var i = 0; i < bord.length; i++){
        if(i == y){
            continue;
        }
        if(bord[i][x] == num){
            return false;
        }
    }
    
    //check horizontal.
    for(var i = 0; i < bord[y].length; i++){
        if(i == x){
            continue;
        }
        if(bord[y][i] == num){
            return false;
        }
    }
    //finding the column and row the point is in.
    var xColumn = Math.floor(x / 3);
    var yColumn = Math.floor(y / 3);
    for(var i = yColumn * 3; i <  yColumn * 3 + 3; i++){
        for(var j = xColumn * 3; j < xColumn * 3 + 3; j++){
            if(i == y && j == x){
                continue;
            }
            if(bord[i][j] == num){
                return false;
            }
        }
    }

    return true;
}


/*function solve(maxSolutions, bord){
    if(solutions >= maxSolutions){
        return true;
    }
    //loop through grid.
    for(var y = 0; y <  bord.length; y++){
        for(var x = 0; x < bord[y].length; x++){
            if(bord[y][x] != 0){
                continue;
            }
            for(var n = 1; n < 10; n++){
                if(possible(x, y, n, bord)){
                    bord[y][x] = n;
                    if(solve(maxSolutions, bord)){
                        return true;
                    }

                    if(solutions < maxSolutions){
                        bord[y][x] = 0;
                    }
                    else{
                        return true;
                    }
                }
            }
            return false;
        }
    }
    var answer = [];
    for(var y = 0; y <  bord.length; y++){
        answer.push([])
        for(var x = 0; x < bord[y].length; x++){
            answer[y].push(bord[y][x]);
        }
    }
    console.log(answer);
    solutions++;
    return true;
    
}*/

function isSolvable(bord){
    if(solved){
        return true;
    }
    //loop through grid.
    for(var y = 0; y <  bord.length; y++){
        for(var x = 0; x < bord[y].length; x++){
            if(bord[y][x] != 0){
                continue;
            }
            for(var n = 1; n < 10; n++){
                if(possible(x, y, n, bord)){
                    bord[y][x] = n;
                    if(isSolvable(bord)){
                        return true;
                    }

                    if(solved == false){
                        bord[y][x] = 0;
                    }
                    else{
                        return true;
                    }
                }
            }
            return false;
        }
        
    }
    console.log("works");
    //console.log(bord);
    var answer = [];
    for(var y = 0; y <  bord.length; y++){
        answer.push([])
        for(var x = 0; x < bord[y].length; x++){
            answer[y].push(bord[y][x]);
        }
    }
    
    solved = true;

    return true;
    
}


function isValid(bord){
    for(var y = 0; y <  bord.length; y++){
        for(var x = 0; x < bord[y].length; x++){
            if(possible(x, y, bord[y][x], bord) == false){
                console.log(x + "  " + y + "  num:" + bord[y][x]);
                return false;
            }
        }
    }
    return true;
}
