song1 = "passion.mp3";
song2 = "lofi.mp3";
song1_status = "";
song2_status = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

function preload() {
    song1 = loadSound("passion.mp3");
    song2 = loadSound("lofi.mp3");
}

function setup() {
    canvas =  createCanvas(300, 300);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();

	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);

}

function draw() {
    image(video, 0, 0, 600, 500);
	
	song1_status = song1.isPlaying();
	song2_status = song2.isPlaying();

	fill("#FF0000");
	stroke("#FF0000");

	if(scoreRightWrist > 0.2)
	{ 
		circle(rightWristX,rightWristY,20);

			song2.stop();

		if(song1_status == false)
		{
			song1.play();
			document.getElementById("song_name").innerHTML = "Playing"
		}
	}

	if(scoreLeftWrist > 0.2)
	{
		circle(leftWristX,leftWristY,20);

			song1.stop();

		if(song2_status == false)
		{
			song2.play();
			document.getElementById("song_name").innerHTML = "Playing"
		}
	}


}

function stop() {
    song1.stop();
    song2.stop();
}

function play() {
    song.play();
	song.setVolume(1);
	song.rate(1);
}
//It will play the first song.When wrist is raised,it will play 'song2'//

function modelLoaded() {
    console.log('pose net is initialized');
}

function gotPoses(results) {
    if(results.length > 0)
    {
      console.log(results);
      scoreRightWrist =  results[0].pose.keypoints[10].score;
      scoreLeftWrist =  results[0].pose.keypoints[9].score;
      console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist);
      
      rightWristX = results[0].pose.rightWrist.x;
      rightWristY = results[0].pose.rightWrist.y;
      console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);
  
      leftWristX = results[0].pose.leftWrist.x;
      leftWristY = results[0].pose.leftWrist.y;
      console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);
          
    }
  
}
