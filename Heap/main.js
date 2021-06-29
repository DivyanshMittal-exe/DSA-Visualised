var p;
var arr= [5,12,3,41,45,13,23,41,313,4,1,41,4];
var heightTotal = Math.floor(Math.log2(arr.length+1)) + 1;

var circleArr = [];

function setup(){
    canvas = createCanvas(10*window.innerWidth/12,10*window.innerHeight/12);
    
    canvas.parent("elefrm");
    
    //textFont(inconsolata);
    //textSize(width / 3);
    textAlign(CENTER, CENTER);
    buildMaxHeap(arr);
    // totalParticles = Math.floor(window.innerWidth/10);
    // for (let i = 0; i < totalParticles; i++) {
    //     parray.push(new Partictle());
    // }
}

function draw(){
    console.log("Works");
    //console.log(heightTotal);
    background(56,23,43);


    for (let i = 0; i < arr.length; i++) {
        //makeBox(i,arr[i]);
        drawBox(i,arr[i]);

    }
    drawCircleArray();
}


function drawBox(i,element){
    position = locationBox(i);
    if(i != 0){
        parentPos = locationBox(gParent(i));
        stroke('rgba(255,255,255,0.1)');
        line(position.x,position.y,parentPos.x,parentPos.y);
    }
    noStroke();
    fill('rgba(255,255,255,0.5)');
    //rect(position.x - 55/2,position.y - 55/2,55,55,20);
    text(element,position.x -55/2,position.y- 55/2,55,55);
}



function locationBox(i){
    
    let elementHeight = Math.floor(Math.log2(i+1)) + 0.5;
    let TotalDis =  Math.pow(2,Math.floor(Math.log2(i+1)));
    let elementDis =   i + 1.5 -  TotalDis;
    let y = height*(elementHeight)/heightTotal;
    let x= width*elementDis/TotalDis;
    
    return createVector(x,y);

}

function sleep(ms) {
    return new Promise(
      resolve => setTimeout(resolve, ms)
    );
  }


class Partictle{
    constructor(){
        this.pos = createVector(random(width),random(height));

        this.vel = createVector(random(-2,2),random(-2,2));

        this.size = 10;
    }

}   


function drawCircleArray(){
    circleArr.forEach(position => {
        noStroke();
        fill('rgba(255,255,255,0.1)');
        
        circle(position.x,position.y,100);
    });
}




function gParent(i){
    return Math.floor((i - 1)/2);
}
function gLeftChild(i){
    return 2*i+1;
}
function gRightChild(i){
    return 2*i+2;
}

function maxHeapify(i,arr){
    l = gLeftChild(i);
    r = gRightChild(i);
    var largest = i;

    if (l < arr.length && arr[l] > arr[largest])
        largest = l;
  
    
    if (r < arr.length && arr[r] > arr[largest])
        largest = r;
  
    
    if (largest != i) {
    
        let temp = arr[i];
        arr[i] = arr[largest];
        arr[largest] = temp;
        maxHeapify(largest,arr);
    }
    
    console.log(arr);
}

async function maxHeapifyVisual(i,arr){
    l = gLeftChild(i);
    r = gRightChild(i);
    var largest = i;

    if (l < arr.length && arr[l] > arr[largest])
        largest = l;
  
    
    if (r < arr.length && arr[r] > arr[largest])
        largest = r;
  
    
    if (largest != i) {
        
        circleArr.push(locationBox(i));
        circleArr.push(locationBox(largest));
        await sleep(1000);

        let temp = arr[i];
        arr[i] = arr[largest];
        arr[largest] = temp;

        circleArr.length = 0;
        //await sleep(300);

        maxHeapifyVisual(largest,arr);
    }
    
    console.log(arr);
}

function buildMaxHeap(arr){
    for (let i = int(arr.length/2); i >= 0; i--){
        console.log("Hi");
        //arr[i] = 0;
        maxHeapify(i,arr);
    }
    console.log(arr)
}

async function HeapInsert(i){
    heightTotal = Math.floor(Math.log2(arr.length+1)) + 1;
    arr.push(i);
    var eleloc = arr.length -1;
    var parloc = gParent(eleloc);
    while(parloc >= 0){
        circleArr.push(locationBox(eleloc));
        await sleep(1000);
        circleArr.pop();
        if(arr[parloc] >= arr[eleloc] ){
            break;
        }else{
            
            let temp = arr[eleloc];
            arr[eleloc] = arr[parloc];
            arr[parloc] = temp;
            
        }
        eleloc = parloc;
        parloc =gParent(eleloc);
    }
    
}

function HeapInsertForm (form) {
    var elem = form.Element.value;
    //alert ("You typed: " + TestVar);
    HeapInsert(int(elem))
}

async function PopMaxHeap(){
    circleArr.push(locationBox(0));
    await sleep(500);
    circleArr.push(locationBox(arr.length - 1));
    await sleep(500);
   
    let temp = arr[0];
    arr[0] = arr[arr.length -1 ];
    arr[arr.length -1] = temp;

    circleArr.pop();
    circleArr.pop();
    await sleep(500);
    arr.pop();

    maxHeapifyVisual(0,arr);

}