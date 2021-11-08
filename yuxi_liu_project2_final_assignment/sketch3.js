let video;
let poseNet;
let pose;
let skeleton;
let on;
let startButton;
let speech;


function setup() {
    createCanvas(windowWidth, windowHeight);
    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
	speech = new p5.Speech(voiceReady);

	
	function voiceReady(){
		console.log(speech.voices);
	}


    startButton = createButton('Click here to start the fantastic dance')

        .size(350, 60)
        .style('font-size', '20px')
        .style('color', '#5392f7')
        .style('background-color', "#f8cdcd")
        .style('text-align', 'center')
        .style('transition-duration', '0.4s')
        .style('border', '2px solid rgb(221, 146, 6)')
        .mouseOver(() => (startButton.style('background-color', '#cdf8d4'), (startButton.style('border', '4px solid rgb(221, 146, 6)'))))
        .mouseOut(() => (startButton.style('background-color', "#f8cdcd"), (startButton.style('border', '2px solid rgb(221, 146, 6)'))))
        .position((windowWidth / 2) - 200, windowHeight / 2 - 700, 'relative')
        .mousePressed(turnOn);



}

turnOn = () => {
    on = true;
    startButton.style('display', 'none');
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

    if (on) {
        background(0);
        push();
        translate(video.width, 0);
        scale(-1.0, 1.0);
        image(video, 0, 0, video.width, video.height);
        pop();

        filter(POSTERIZE);

        if (pose) {

            for (let i = 0; i < pose.keypoints.length; i++) {
                let x = pose.keypoints[i].position.x;
                let y = pose.keypoints[i].position.y;
                ellipse(x, y, 25, 25);
                fill(random(10, 255), random(20, 255), random(10, 255), random(70, 150));

                strokeWeight(15);
                stroke(random(20, 255), random(20, 255), random(10, 255), random(50, 130));
            }

            for (let i = 0; i < skeleton.length; i++) {
                let one = skeleton[i][0];
                let two = skeleton[i][1];
                strokeWeight(8);
                stroke(random(10, 255), random(10, 255), random(20, 255), random(150, 225));
                line(one.position.x, one.position.y, two.position.x, two.position.y);

            }
        }

    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function mousePressed(){
	let voices = speech.voices;
	let voice = random(voices);
	console.log(voice.name);
	speech.setVoice(voice.name);
	speech.speak('Come on and Dance');
}


