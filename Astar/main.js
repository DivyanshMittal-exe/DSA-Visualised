var cols;
var rows;
var start ;
var end;
var grid;

var path = [];

var side = 33;

var openList = [];
var closedList = [];

var leftpad;
var toppad;

var nosolution = false;

var prob = 0.3;

class Spot{
    constructor(i,j){
        this.x = i;
        this.y = j;
        this.f = 0;
        this.g = 0;
        this.h = 0;
        this.neighbours = [];
        this.prev = undefined;
        this.wall = false;

        if(random(1) < prob){
            this.wall = true;
        }
        

    }
    show(col){
        fill(col);
        if(this.wall){
            fill(0);
        }

        rect(this.x*side + leftpad,this.y*side + toppad,side-1,side-1);
    }
    addNeighbours(grid,ix,jy){
        
            //this.neighbours.push(grid[ix-1][jy]);
        
            // this.neighbours.push(grid[ix+1][jy]);
        
            // this.neighbours.push(grid[ix][jy-1]);
        
            // this.neighbours.push(grid[ix][jy+1]);
        
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

        // if (this.x > 0){
        //     this.neighbours.push(grid[ix-1][jy]);
        // }
        // if (cols > this.x){
        //     this.neighbours.push(grid[ix+1][jy]);

        // }
        // if (this.y > 0){
        //     this.neighbours.push(grid[ix][jy-1]);
        // }
        // if (rows > this.y){
        //     this.neighbours.push(grid[ix][jy+1]);


        // }
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

function setup(){
    let canvas = createCanvas(windowWidth,11*windowHeight/12);
    canvas.class("maze");
    canvas.parent("maze");
    //textFont(inconsolata);
    textSize(20);
    textAlign(CENTER, CENTER);
    cols = Math.floor(width/side);
    rows = Math.floor(height/side);


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

    console.log(grid);

    start = grid[0][0];
    end = grid[cols-1][rows-1];

    start.wall = false;
    end.wall = false;

    openList.push(start);

    leftpad = (width - cols*side)/2;
    toppad = (height - rows*side)/2;

}

function draw(){
    console.log("Works");
    background(0,0,0);


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
            grid[i][j].show(255);
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

