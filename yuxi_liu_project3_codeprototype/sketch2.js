let video;
let poseNet;
let pose;
let skeleton;



function setup() {
    createCanvas(windowWidth, windowHeight);
    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
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

function draw() {

   
        background(0);
        push();
        translate(video.width, 0);
        scale(-1.0, 1.0);
        image(video, 0, 0, video.width, video.height);
        pop();

        filter(POSTERIZE);

        if (pose) {
			
			fill(255,0,0);
		noStroke();
        ellipse(pose.nose.x, pose.nose.y+10, 70);
		
		fill(255);
		noStroke();
		ellipse(pose.leftEye.x+10, pose.leftEye.y, 80);
		noStroke();
		ellipse(pose.rightEye.x-10, pose.rightEye.y, 80);
			
		fill(255,100,0);
		noStroke();
		arc(pose.nose.x, pose.nose.y+60, 115, 115, 0, PI);
			
		fill(255,255,0);
		noStroke();
		triangle(pose.nose.x, pose.nose.y-300, pose.nose.x+100, pose.nose.y-150, pose.nose.x-100, pose.nose.y-150);

            for (let i = 0; i < pose.keypoints.length; i++) {
                let x = pose.keypoints[i].position.x;
                let y = pose.keypoints[i].position.y;
                ellipse(x, y, 50, 50);
                fill(255, 0, 0);

//                strokeWeight(15);
//                stroke(155);
            }

            for (let i = 0; i < skeleton.length; i++) {
                let one = skeleton[i][0];
                let two = skeleton[i][1];
                strokeWeight(8);
                stroke(255);
                line(one.position.x, one.position.y, two.position.x, two.position.y);

            }
        }

    
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

