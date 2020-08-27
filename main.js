/*var array =[[5,5,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,3,4,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0]];


var bord = generateBord(26);
console.log(bord);

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

console.log(isSolvable(bordSolve2));
console.log(bordSolve2);
*/



function init(){

    var sudoku = document.getElementsByClassName("sudoku")[0];

    for(var i = 0; i < 9; i++){
        var row = document.createElement("tr");
        row.classList.add("row");    
        if((i+1) % 3 == 0){
            row.classList.add("row-divider");
        }
        for(var j = 0; j < 9; j++){
            var cell = document.createElement("td");
            cell.classList.add("cell");
            if((j+1) % 3 == 0){
                cell.classList.add("cell-divider");
            }

            var input = document.createElement("input");
            input.classList.add("cell-input");
            input.type = "text";
            input.maxLength = "1";
            input.oninput= function (){
                this.value=this.value.replace(/[^1-9]/g,'');
            };
            cell.append(input);

            row.append(cell);
        }
        sudoku.append(row);
    }
    

    document.getElementById("clear").onclick = function(){clear()};
    document.getElementById("generate").onclick = function(){generate()};
    document.getElementById("solve").onclick = function(){solve()};


}

function clear(){
    var rows = document.getElementsByClassName("row");
    for(var i = 0; i < rows.length; i++){
        var row = document.getElementsByClassName("row")[i];
        for(var j = 0; j < row.childNodes.length; j++){
            row.childNodes[j].childNodes[0].value = "";
        }
    }
}

function generate(){
    clear();
    var bord = generateBord(20);

    var rows = document.getElementsByClassName("row");
    for(var i = 0; i < rows.length; i++){
        var row = document.getElementsByClassName("row")[i];
        for(var j = 0; j < row.childNodes.length; j++){
            if(bord[i][j] == 0){
                continue;
            }
            row.childNodes[j].childNodes[0].value = bord[i][j];
        }
    }
}



function solve(){
    var bord = [];
    var rows = document.getElementsByClassName("row");
    for(var i = 0; i < rows.length; i++){
        bord.push([]);
        var row = document.getElementsByClassName("row")[i];
        for(var j = 0; j < row.childNodes.length; j++){
            if(row.childNodes[j].childNodes[0].value == ""){
                bord[i].push(0);
            }
            else{
                var value = parseInt(row.childNodes[j].childNodes[0].value, 10);
                bord[i].push(value);
            }
        }
    }

    if(isSolvable(bord) == 1){
        var rows = document.getElementsByClassName("row");
        for(var i = 0; i < rows.length; i++){
            var row = document.getElementsByClassName("row")[i];
            for(var j = 0; j < row.childNodes.length; j++){
                if(bord[i][j] == 0){
                    continue;
                }
                row.childNodes[j].childNodes[0].value = bord[i][j];
            }
        }
    }
    else{
        console.log("could not solve sudoku");
    }


}




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
            if(isSolvable(bordSolve) == 1){
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

function isSolvable(bord, depth = 0){
    if(depth == 0 && isValid(bord) == false){
        return 2;
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
                    
                    var status = isSolvable(bord, depth + 1);
                    if(status == 1){
                        return 1;
                    }
                    else if(status == 2){
                        bord[y][x] = 0;
                    }
                }
            }
            if(depth == 0){
                return 2;
            }
            return 0;
        }
        
    }

    return 1;
}


function isValid(bord){
    for(var y = 0; y <  bord.length; y++){
        for(var x = 0; x < bord[y].length; x++){
            if(bord[y][x] == 0){
                continue;
            }
            if(possible(x, y, bord[y][x], bord) == false){
                return false;
            }
        }
    }
    return true;
}
