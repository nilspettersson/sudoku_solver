var array =[[0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0]];

var solutions = 0;


solve(1, array);



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


function solve(maxSolutions, bord){
    if(solutions >= maxSolutions){
        return;
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
                    solve(maxSolutions, bord);
                    if(solutions < maxSolutions){
                        bord[y][x] = 0;
                    }
                }
            }
            return;
        }
    }
    var answer = [];
    for(var y = 0; y <  bord.length; y++){
        answer.push([])
        for(var x = 0; x < bord[y].length; x++){
            answer[y].push(bord[y][x]);
        }
    }
    solutions++;
    console.log(answer);
    
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
