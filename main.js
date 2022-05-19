song1= "";
song2= "";

LeftWristX= 0;
LeftWristY= 0;

RightWristX= 0;
RightWristY= 0;

scoreLeftWrist= 0;
SOfTS= ""; 

function preload(){
	song1= loadSound("Alone.mp3");
	song2= loadSound("Industry Baby.mp3");
}

function setup(){
	canvas= createCanvas(400, 400);
	canvas.center();

	video= createCapture(VIDEO);
	video.hide();

	poseNet= ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function modelLoaded(){
	console.log("PoseNet Is Initialized");
}

function gotPoses(results){
	if(results.length > 0){
		scoreLeftWrist= results[0].pose.keypoints[9].score;
		LeftWristX= results[0].pose.leftWrist.x;
		LeftWristY= results[0].pose.leftWrist.y;

		RightWristX= results[0].pose.rightWrist.x;
		RightWristY= results[0].pose.rightWrist.y;
	}
}

function draw(){
	image(video, 0, 0, 400, 400);
	SOfTS= song1.isPlaying();
	fill("chartreuse");
	stroke("chartreuse");

	if(scoreLeftWrist > 0.2){
		circle(LeftWristX, LeftWristY, 20);
		song2.stop();
		if(SOfTS == "false"){
			song1.play();
			document.getElementById("song_name_h3").innerHTML= "Playing Song 'Alone' Right Now";
		}
	}
}

function play(){
	song.play();
	song.setVolume(1);
	song.rate(1);
}