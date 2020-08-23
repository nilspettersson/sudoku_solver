var array =[[0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0]];

console.log(array);

possible(0, 0, 1);

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
    //finding the column and row the point is in
    var xColumn = Math.floor(x / 3);
    var yColumn = Math.floor(y / 3);
    for(var i = yColumn * 3; i <  yColumn * 3 + 3; i++){
        for(var j = xColumn * 3; j < xColumn * 3 + 3; j++){
            if(array[i][j] == num){
                return false;
            }
        }
    }
}
