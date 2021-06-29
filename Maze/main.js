var cols;
var rows;
var start ;
var end;
var grid;

var path = [];

var side = 30;

var openList = [];
var closedList = [];

var leftpad;
var toppad;

var nosolution = false;


var madeMaze = false;
 


var mazeCurrent;
var mazeColor = [];
var mazeStack = [];
var VisitedNodes = [];
var mazeGrid;
var mazeCol;
var mazeRow;



class MazeElement{
    constructor(i,j){
        this.x = i;
        this.y = j;
        this.neighbours = [];
        this.visited = false;
    }
    addNeighbours(){
        if (this.x > 0){
            this.neighbours.push(mazeGrid[this.x-1][this.y]);
        }
        if (mazeCol - 1> this.x){
            this.neighbours.push(mazeGrid[this.x+1][this.y]);
        }
        if (this.y > 0){
            this.neighbours.push(mazeGrid[this.x][this.y-1]);
        }
        if (mazeRow -1 > this.y){
            this.neighbours.push(mazeGrid[this.x][this.y+1]);
        }
    }
}



class Spot{
    constructor(i,j){
        this.x = i;
        this.y = j;
        this.f = 0;
        this.g = 0;
        this.h = 0;
        this.neighbours = [];
        this.prev = undefined;
        this.wall = true;

        this.inMazeStack = false;

        // if(random(1) < prob){
        //     this.wall = true;
        // }
        

    }
    show(col){
        fill(col);
        if(this.wall){
            fill(0);
        }

        rect(this.x*side + leftpad,this.y*side + toppad,side-1,side-1);
    }
    addNeighbours(grid,ix,jy){

        if (this.x > 0){
            this.neighbours.push(grid[this.x-1][this.y]);
        }
        if (cols - 1> this.x){
            this.neighbours.push(grid[this.x+1][this.y]);
        }
        if (this.y > 0){
            this.neighbours.push(grid[this.x][this.y-1]);
        }
        if (rows -1 > this.y){
            this.neighbours.push(grid[this.x][this.y+1]);
        }
    }
}

function  heuristic(start,end){
    var d = dist(start.x,start.y,end.x,end.y);
    return d;

}

function removeFromArr(elemnt, array){
    for (let i = array.length -1; i >=0; i--) {
        if(array[i] == elemnt){
            array.splice(i,1);
        }
        
    }
}




function makeNotwall(mazeEle){
    var xco = 2*mazeEle.x;
    var yco = 2*mazeEle.y;
    grid[xco][yco].wall = false;
}

function destroyWall(mazeEle,newEle){
    var xco = 2*mazeEle.x;
    var yco = 2*mazeEle.y;
    var xcon = 2*newEle.x;
    var ycon = 2*newEle.y;

    var xf = (xco + xcon)/2;
    var yf = (yco + ycon)/2;


    grid[xf][yf].wall = false;
}


function setup(){
    createCanvas(window.innerWidth,11*window.innerHeight/12);
    //textFont(inconsolata);
    textSize(20);
    textAlign(CENTER, CENTER);
    cols = Math.floor(width/side);
    rows = Math.floor(height/side);

    leftpad = (width - cols*side)/2;
    toppad = (height - rows*side)/2;

    
    if((cols % 2) == 0){
        cols-=1;
        leftpad+=side/2;
    }
    if((rows %2) == 0){
        rows -= 1;
        toppad+=side/2;
    }

    console.log(rows);

    grid = new Array(cols);

    for (let i = 0; i < cols; i++) {
        grid[i] = new Array(rows);   
    }
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = new Spot(i,j);
        }   
    }
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].addNeighbours(grid,i,j);
        }   
    }

    //Maze GRID
    mazeCol = Math.floor(cols/2) + 1;
    mazeRow = Math.floor(rows/2) + 1;

    mazeGrid = new Array(mazeCol);

    for (let i = 0; i < mazeCol; i++) {
        mazeGrid[i] = new Array(mazeRow);   
    }
    for (let i = 0; i < mazeCol; i++) {
        for (let j = 0; j < mazeRow; j++) {
            mazeGrid[i][j] = new MazeElement(i,j);
        }   
    }
    for (let i = 0; i < mazeCol; i++) {
        for (let j = 0; j < mazeRow; j++) {
            mazeGrid[i][j].addNeighbours();
        }   
    }





    console.log(grid);

    start = grid[0][0];
    end = grid[cols-1][rows-1];

    start.wall = false;
    end.wall = false;

    openList.push(start);

    mazeCurrent = mazeGrid[0][0];
    mazeCurrent.visited = true;
    mazeCurrent.inMazeStack = true; 
    VisitedNodes.push(mazeCurrent);
    makeNotwall(mazeCurrent);



}

function draw(){
    console.log("Works");
    background(0,0,0);

    if(madeMaze){
        soolveMaze();

    }else{
        makeMaze();
    }
}

function makeMaze(){
    frameRate(24);
    if(VisitedNodes.length < mazeRow*mazeCol){

        newnbrarr =[];
        for (let i = 0; i < mazeCurrent.neighbours.length; i++) {
            if (mazeCurrent.neighbours[i].visited == false){
                newnbrarr.push(mazeCurrent.neighbours[i]);
            }
        }


        if(newnbrarr.length > 0){
            var inde = Math.floor(Math.random(1)*3*newnbrarr.length) % newnbrarr.length;

            mazeStack.push(mazeCurrent);

            var newMazeEle =newnbrarr[inde];

            //mazeCurrent.neighbours.splice(inde);

            // for (var i = 0; i < newMazeEle.neighbours.length;i++){
            //     if(newMazeEle.neighbours[i] == mazeCurrent){
            //         newMazeEle.neighbours.splice(i)
            //     }
            // }


            makeNotwall(newMazeEle);
            destroyWall(mazeCurrent,newMazeEle);
            mazeCurrent = newMazeEle;
            mazeCurrent.visited = true;
            mazeCurrent.inMazeStack = true;
            VisitedNodes.push(mazeCurrent);



        }else if(mazeStack.length > 0){

            mazeCurrent.inMazeStack = false;
            mazeCurrent = mazeStack.pop();
            // removeFromArr(mazeCurrent,mazeStack);
            // removeFromArr(mazeCurrent,mazeColor);

        }
    }else{
        madeMaze =true;
    }

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            if(grid[i][j].wall){
                grid[i][j].show(0);
            }else
            {
                grid[i][j].show(255);
            }
        }   
    }
   

    for (let i = 0; i < mazeCol; i++) {
        for (let j = 0; j < mazeRow; j++) {
            if(mazeGrid[i][j].inMazeStack){
                grid[2*i][2*j].show(color(255,0,0));
                for(let k = 0; k < mazeGrid[i][j].neighbours.length;k++){
                    if(mazeGrid[i][j].neighbours[k].inMazeStack){
                       xlo = mazeGrid[i][j].neighbours[k].x + i;
                       ylo = mazeGrid[i][j].neighbours[k].y + j;
                       grid[xlo][ylo].show(color(255,0,0));
                    }
                }
            }    
        }   
    }

    // for (let i = 0; i < mazeColor.length; i++) {
    //     mazeColor[i].show(color(255,0,0));
        
    // }

}








function soolveMaze(){
    if(openList.length > 0){
        var winner = 0;
        for (let i = 0; i < openList.length; i++) {
           if (openList[i].f < openList[winner].f) {
               winner = i;
           }
            
        }
        var current =  openList[winner];
        if (end == current) {

            

            noLoop();

            console.log("Done");
        }
        removeFromArr(current,openList)
        closedList.push(current);

        var nbrs = current.neighbours;

        for (let i = 0; i < nbrs.length; i++) {
            var nbr = nbrs[i];
            if(!closedList.includes(nbr) && !nbr.wall){
                var tempg = current.g + 1;

                if(openList.includes(nbr)){
                      if(tempg < nbr.g){
                          nbr.g = tempg
                      }
                }else{
                    nbr.g = tempg;
                    openList.push(nbr);
                }

                nbr.h = heuristic(nbr,end);
                nbr.f = nbr.g + nbr.h;
                nbr.prev = current;
            }
            
        }

    }else{
        nosolution = true;
        alert("No Solution");
        noLoop();
    }

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            if(grid[i][j].wall){
                grid[i][j].show(0);
            }else{
                grid[i][j].show(255);
            }
        }   
    }


    
    for (let i = 0; i < closedList.length; i++) {
        closedList[i].show(color(255,0,0))  
    }
    for (let i = 0; i < openList.length; i++) {
        openList[i].show(color(0,255,0))  
    }

    if (!nosolution) {
        path = [];
        var temp = current;
        path.push(current);
        while(temp.prev){
            path.push(temp.prev);
            temp = temp.prev;
        }
    }
    for (let i = 0; i <path.length; i++) {
        path[i].show(color(0,0,255))  
    }
}

