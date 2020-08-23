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

solve(2);


function possible(x, y, num){
    //check vertical.
    for(var i = 0; i < array.length; i++){
        if(array[i][x] == num){
            return false;
        }
    }
    //check horizontal.
    for(var i = 0; i < array[y].length; i++){
        if(array[y][i] == num){
            return false;
        }
    }
    //finding the column and row the point is in.
    var xColumn = Math.floor(x / 3);
    var yColumn = Math.floor(y / 3);
    for(var i = yColumn * 3; i <  yColumn * 3 + 3; i++){
        for(var j = xColumn * 3; j < xColumn * 3 + 3; j++){
            if(array[i][j] == num){
                return false;
            }
        }
    }

    return true;
}


function solve(maxSolutions){
    if(solutions >= maxSolutions){
        return;
    }
    //loop through grid.
    for(var y = 0; y <  array.length; y++){
        for(var x = 0; x < array[y].length; x++){
            if(array[y][x] != 0){
                continue;
            }
            for(var n = 1; n < 10; n++){
                if(possible(x, y, n)){
                    array[y][x] = n;
                    solve(maxSolutions);
                    if(solutions < maxSolutions){
                        array[y][x] = 0;
                    }
                }
            }
            return;
        }
    }
    var answer = [];
    for(var y = 0; y <  array.length; y++){
        answer.push([])
        for(var x = 0; x < array[y].length; x++){
            answer[y].push(array[y][x]);
        }
    }
    solutions++;
    console.log(answer);
    
}
