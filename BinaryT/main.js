var p;
var arr= [12,5,18,2,9,15,19,13,17];
var heightTotal = 1;

var circleArr = [];
var parentNode;

var setupomp = false;


function makemaxheight(height){
    if (height + 2 > heightTotal){
        heightTotal = height + 2;
    }
}

class Node{

    constructor(val){
        this.val = val;
        this.left = undefined;
        this.right = undefined;

        this.height;
        //this.width;
        this.loc;
    }

    // addLeftChild(left){
    //     this.left = left;
    // }
    // addRightChild(right){
    //     this.right = right;
    // }

    search(element){
        if (this.val == element){
            return true;
        }else if(!this.left && !this.right){
            return false;
        }else if(element < this.val){
            if(!this.left){
                return false;
            }else{
                this.left.search(element);
            }
        }else if(element > this.val){
            if(!this.right){
                return false;
            }else{
                this.right.search(element);
            }
        }
    }

    async addElement(element){
        if(setupomp){
            circleArr.push(locationBox(this.getthei()));
            await sleep(300);
            circleArr.pop();
        }
        if(element < this.val){
            if(!this.left){
                this.left = new Node;
                this.left.val = element;
                this.left.height = this.height + 1;
                //this.left.width = this.width /2;
                this.left.loc = this.loc *2;

                makemaxheight(this.height + 1);

            }else{
                if(setupomp){
                    circleArr.push(locationBox(this.left.getthei()));
                    await sleep(300);
                    circleArr.pop();
                }
                this.left.addElement(element);
                
            }
        }else if(element >= this.val){
            if(!this.right){
                this.right = new Node;
                this.right.val = element;
                this.right.height = this.height + 1;
                //this.right.width = this.width /2;
                this.right.loc = this.loc *2 + 1;

                makemaxheight(this.height + 1);

            }else{
                if(setupomp){
                    circleArr.push(locationBox(this.right.getthei()));
                    await sleep(300);
                    circleArr.pop();
                }
                console.log(circleArr);
                this.right.addElement(element);
                
            }
        }
        
        
    }

    getthei(){
        return pow(2,this.height) + this.loc - 1;
    }

    render(){
        drawBox(this.getthei(),this.val);

        if(this.left){
            var position = locationBox(this.getthei());
            var lcpos = locationBox(this.left.getthei());
            stroke('rgba(255,255,255,0.1)');
            line(position.x,position.y,lcpos.x,lcpos.y);
            this.left.render();
        }
        if(this.right){
            var position = locationBox(this.getthei());
            var lcpos = locationBox(this.right.getthei());
            stroke('rgba(255,255,255,0.1)');
            line(position.x,position.y,lcpos.x,lcpos.y);
            this.right.render();
        }
    }



}


function getheightTotal(){
    return heightTotal;
}




function setup(){
    setupomp = false;
    createCanvas(window.innerWidth,window.innerHeight);
    textAlign(CENTER, CENTER);
    
    parentNode = new Node;
    parentNode.val = arr[0];
    parentNode.height = 0;
    //parentNode.width = width;
    parentNode.loc = 0;
    for (let i = 1; i < arr.length; i++) {
        parentNode.addElement(arr[i]);        
    }
     
    console.log(parentNode);
    setupomp = true;
}

function draw(){

    //frameRate(1);
    //console.log("Works");
    console.log(heightTotal);
    background(56,23,43);

    
    parentNode.render();


    drawCircleArray();
}


function drawBox(i,element){
    position = locationBox(i);
    noStroke();
    fill('rgba(255,255,255,0.5)');
    //rect(position.x - 55/2,position.y - 55/2,55,55,20);
    text(element,position.x -55/2,position.y- 55/2,55,55);
}



function locationBox(i){
    
    let elementHeight = Math.floor(Math.log2(i+1)) + 0.5;
    let TotalDis =  Math.pow(2,Math.floor(Math.log2(i+1)));
    let elementDis =   i + 1.5 -  TotalDis;
    let y = height*(elementHeight)/getheightTotal();
    let x= width*elementDis/TotalDis;
    
    return createVector(x,y);

}

function sleep(ms) {
    return new Promise(
      resolve => setTimeout(resolve, ms)
    );
  }



function drawCircleArray(){
    circleArr.forEach(position => {

        noStroke();
        fill('rgba(255,255,255,0.1)');
        console.log("HI");
        circle(position.x,position.y,100);
    });
}

function addelement(form){
    var elem = form.Element.value;

    if(parentNode.val ==  "NULL"){
        parentNode.val = elem;
    }else{
        parentNode.addElement(elem);
    }
}


function cleararr(){
    parentNode.val = "NULL";
    parentNode.left = undefined;
    parentNode.right = undefined;
}