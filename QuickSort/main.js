var p;
var arr= [-12,7 ,2 ,4,-1,-6,13,5,11];
var maxe;

var eleHeight = 55

var circleArr = [];

function setup(){
    canvas = createCanvas(10*window.innerWidth/12,11*window.innerHeight/12);
    canvas.parent("qs");
    //textFont(inconsolata);
    textSize(20);
    textAlign(CENTER, CENTER);
    maxe = Math.max(Math.max.apply(Math, arr),-1*Math.min.apply(Math, arr));
    // totalParticles = Math.floor(window.innerWidth/10);
    // for (let i = 0; i < totalParticles; i++) {
    //     parray.push(new Partictle());
    // }
}

function draw(){
    console.log("Works");
    //console.log(heightTotal);
    background(56,23,43);
    //console.log(Math.max.apply(Math, arr));


    for (let i = 0; i < arr.length; i++) {
        //makeBox(i,arr[i]);
        drawBox(i,arr[i]);

    }
    //drawCircleArray();
}


function drawBox(i,element){

    posX = (i+1)*width/(arr.length+2);


    if (element > 0){

        var he = element * (height/2 - 2* eleHeight)/maxe;
        //console.log(maxe)
        //console.log(he);
        noStroke();
        fill('rgba(255,255,255,0.5)');
        rect(posX,height/2 + eleHeight,width/(arr.length+2),he);
        ///rect(posX, height/2 + eleHeight, width/(arr.length+2),he);
    }else{
       

            var he = element * (height/2 - 2* eleHeight)/maxe;
            //console.log(maxe)
            //console.log(he);
            noStroke();
            fill('rgba(255,255,255,0.5)');
            rect(posX,height/2 - eleHeight,width/(arr.length+2),he);
            ///rect(posX, height/2 + eleHeight, width/(arr.length+2),he);
        
    }
    text(element,posX + (width/(arr.length+2)) /4, height/2 - eleHeight/2  ,eleHeight,eleHeight);
    
}

 function partition (low, high)
{
    var pivot = arr[high];
    var i = (low - 1);
 
    for (let j = low; j <= high - 1; j++)
    {
       
        if (arr[j] < pivot)
        {
            //await sleep(100);

            i++; 
            temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    return (i + 1);
}

async function quickSort(low,high)
{
    if (low < high)
    {
        var pi = partition( low, high);
        await sleep(500);

        quickSort( low, pi - 1);
        quickSort( pi + 1, high);
    }
    console.log(arr);
}

function QuickSortRun(){
    quickSort(0,arr.length-1);
}

function Cleararr(){
    arr.length = 0;
}

function AddElement(form){
    var elem = form.Element.value;
    arr.push(elem);
    maxe = Math.max(Math.max.apply(Math, arr),-1*Math.min.apply(Math, arr));
}

function sleep(ms) {
    return new Promise(
      resolve => setTimeout(resolve, ms)
    );
  }