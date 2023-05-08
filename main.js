song1 = "";
song2 = "";
leftwristx = 0;
rightwristx = 0;
leftwristy = 0;
rightwristy = 0;
scorelw = 0;
scorerw = 0;

function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(600, 500);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 500);
    if (scorelw > 0.2) {
        fill("red");
        stroke("red");
        circle(leftwristx, leftwristy, 10);
        if (song2.isPlaying()) {
            song2.stop();
            song1.play();
            document.getElementById("song_name").innerHTML = "Song Name: Harry Potter";
        }
        else{
            if (song1.isPlaying()) {
                
            }
            else{
                song1.play();
                song2.stop();
                document.getElementById("song_name").innerHTML = "Song Name: Harry Potter";
            }
        }
    }
    if (scorerw > 0.2) {
        fill("blue");
        stroke("blue");
        circle(rightwristx, rightwristy, 10);
        if (song1.isPlaying()) {
            song1.stop();
            song2.play();
            document.getElementById("song_name").innerHTML = "Song Name: Peter Pan";
        }
        else{
            if (song2.isPlaying()){

            }
            else{
                song2.play();
                song1.stop();
                document.getElementById("song_name").innerHTML = "Song Name: Peter Pan";
            }
        }
    }

}

function modelLoaded() {
    console.log("poseNet is Initialized");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftwristx = results[0].pose.leftWrist.x;
        console.log("leftwristx" + leftwristx);
        rightwristx = results[0].pose.rightWrist.x;
        console.log("rightwristx" + rightwristx);
        leftwristy = results[0].pose.leftWrist.y;
        console.log("leftwristy" + leftwristy);
        rightwristy = results[0].pose.rightWrist.y;
        console.log("rightwristy" + rightwristy);

        scorelw = results[0].pose.keypoints[9].score;
        console.log("scorelw" + scorelw);
        scorerw = results[0].pose.keypoints[10].score;
        console.log("scorerw" + scorerw);
    }
}
