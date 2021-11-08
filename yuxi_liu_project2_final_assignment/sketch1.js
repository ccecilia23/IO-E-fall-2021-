let video;
let pose;


function setup() {
    createCanvas(600, 500);
    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
	
//	let lang = navigator.language || 'en-US';
	let speechRec = new p5.SpeechRec('en-US', gotSpeech);
	
	let continuous = true;
	let interim = false;
	speechRec.start(continuous, interim);
	
	function gotSpeech(){
		if (speechRec.resultValue) {
			createP(speechRec.resultString);
		}
	}
}


function gotPoses(poses) {
    console.log(poses);
    if (poses.length > 0) {
        pose = poses[0].pose;
    }
}

function modelLoaded() {
    console.log('poseNet ready');
}

function draw() {
        translate(video.width, 0);
        scale(-1.0, 1.0);
        image(video, 0, 0, video.width, video.height);
        pop();


        if (pose) {

        fill(255,0,0);
		noStroke();
        ellipse(pose.nose.x, pose.nose.y+10, 50);
		
		fill(255);
		noStroke();
		ellipse(pose.leftEye.x+10, pose.leftEye.y, 60);
		noStroke();
		ellipse(pose.rightEye.x-10, pose.rightEye.y, 60);
			
		fill(0);
		noStroke();
		ellipse(pose.leftEye.x+10, pose.leftEye.y, 30);
		noStroke();
		ellipse(pose.rightEye.x-10, pose.rightEye.y, 30);
			
		fill(200,100,0);
		noStroke();
		rect(pose.nose.x-35, pose.nose.y+45, 70, 30, 20);
			
		fill(0,0,255);
		noStroke();
		triangle(pose.nose.x, pose.nose.y-300, pose.nose.x+100, pose.nose.y-150, pose.nose.x-100, pose.nose.y-150);
			
        }

    }


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

