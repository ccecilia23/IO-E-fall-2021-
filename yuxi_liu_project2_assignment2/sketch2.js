let video;
let pose;
let skeleton;
let angle=0;
let history = [];

function setup(){
	
    createCanvas(windowWidth, windowHeight);
    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
   
       
rectMode(CENTER);  
angleMode(DEGREES);  
    
}


function gotPoses(poses) {
    console.log(poses);
    if (poses.length > 0) {
        pose = poses[0].pose;
        skeleton = poses[0].skeleton;
    }
}


function modelLoaded() {
    console.log('poseNet ready');
}


function draw(){
   
    background(0);
    push();
    translate(video.width, 0);
    scale(-1.0, 1.0);
    image(video, 0, 0, video.width, video.height);
    pop();
    filter(POSTERIZE);   

    
    if(pose){ 
        let v = createVector(pose.nose.x,pose.nose.y);
        
        history.push(v);
        let head = history[history.length-1].copy();
        history.push(head);
        history.shift();
        
   
        
        for(let i = 0; i < history.length-1; i++){
			drawHeadSpace(history[i].x,history[i].y);
            
        }

}  
    
    
}

function drawHeadSpace(x,y){
        
    fill(random(20, 255), random(20, 255), random(10, 255), random(50, 255));
	noStroke();
        ellipse(x, y, random(50, 255));
    if(history.length > 100){
        console.log("more than 100");
        history.splice(0,1);
        }
    }

