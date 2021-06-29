var p;
var arr= [9,8,7,6,5,4,3,2,1];
var heightarray = [0,0,0,0,0,0,0,0,0];
var maxe;

var levels;

var eleHeight = 55

var circleArr = [];

function setup(){
    canvas = createCanvas(10*window.innerWidth/12,11*window.innerHeight/12);
    canvas.parent("merges");
    
    textSize(20);
    textAlign(CENTER, CENTER);
    maxe = Math.max(Math.max.apply(Math, arr),-1*Math.min.apply(Math, arr));

    levels = int(Math.log2(arr.length))+5;
    
}

function draw(){
    console.log("Works");
    background(56,23,43);


    for (let i = 0; i < arr.length; i++) {
        //makeBox(i,arr[i]);
        drawBox(i,arr[i]);

    }
}


function drawBox(i,element){

    posX = (i+1)*width/(arr.length+2);


    if (element > 0){

        var he = element * (height/2 - 2* eleHeight)/maxe;
        he/= levels;

        var yheight = (height*(heightarray[i] + 1/2) + eleHeight)/levels;
        
        noStroke();
        fill('rgba(255,255,255,0.5)');
        rect(posX,yheight,width/(arr.length+2),he);
        
    }else{
       

            var he = element * (height/2 - 2* eleHeight)/maxe;

            he/= levels;

            var yheight = (height*(heightarray[i] + 1/2) - eleHeight)/levels;
            noStroke();
            fill('rgba(255,255,255,0.5)');
            rect(posX,yheight,width/(arr.length+2),he);
            
        
    }
    var yheight = (height*(heightarray[i] + 1/2) - eleHeight/2)/levels;
    text(element,posX + (width/(arr.length+2)) /4, yheight ,eleHeight/levels,eleHeight/levels);
    
}


function QuickSortRun(){
    srt(0,arr.length-1);
}

function Cleararr(){
    arr.length = 0;
    heightarray.length = 0;
}

function AddElement(form){
    var elem = form.Element.value;
    arr.push(elem);
    heightarray.push(0);
    maxe = Math.max(Math.max.apply(Math, arr),-1*Math.min.apply(Math, arr));
    levels = int(Math.log2(arr.length))+1;
}

function sleep(ms) {
    return new Promise(
      resolve => setTimeout(resolve, ms)
    );
  }


function movedown(low,high){
    for (let i = low; i <= high; i++) {
        heightarray[i] += 1 ;
        
    }
}
function moveup(low,high){
    for (let i = low; i <= high; i++) {
        heightarray[i] -=1 ;
        
    }
}

// function merge(low,mid,high)
//     {
        
//         for (let i=high-1; i>mid; i--)
//         {
//             let j, last = arr[mid];
//             for (j=mid-1; j >= low && arr[j] > arr[i]; j--)
//                 arr[j+1] = arr[j];
//             if (j != mid-1 || last > arr[i])
//             {
//                 arr[j+1] = arr[i];
//                 arr[i] = last;
//             }
//         }
//     }

function merge( start, mid, end)
    {
    var start2 = mid + 1;
 
    if (arr[mid] <= arr[start2]) {
        return;
    }
 
    while (start <= mid && start2 <= end) {
 
        if (arr[start] <= arr[start2]) {
            start++;
        }
        else {
            var value = arr[start2];
            var index = start2;
 
            while (index != start) {
                arr[index] = arr[index - 1];
                index--;
            }
            arr[start] = value;

            start++;
            mid++;
            start2++;
        }
    }
}

async function srt(low,high){

    var mid = int((low+high)/2);
    if (low < high){



        movedown(low,mid);
        await sleep(300);
        srt(low,mid);
        await sleep(300);
        


        await sleep(500);
        movedown(mid+1,high);
        await sleep(300);
        srt(mid+1,high);


        moveup(low,mid);
        //await sleep(300);
        moveup(mid+1,high);

        merge(low,mid,high);
         
    }
    
    
}