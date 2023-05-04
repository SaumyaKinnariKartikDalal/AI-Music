song1 = "";
song2 = "";
leftwristx = 0;
rightwristx = 0;
leftwristy = 0;
rightwristy = 0;

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
    fill("red");
    stroke("red");
    circle(leftwristx, leftwristy, 10);
    fill("blue");
    stroke("blue");
    circle(rightwristx, rightwristy, 10);
}

function modelLoaded() {
    console.log("poseNet is Initialized");
}

function gotPoses(results) {
    if (results.length>0) {
        console.log(results);
        leftwristx = results[0].pose.leftWrist.x;
        console.log("leftwristx"+leftwristx);
        rightwristx = results[0].pose.rightWrist.x;
        console.log("rightwristx"+rightwristx);
        leftwristy = results[0].pose.leftWrist.y;
        console.log("leftwristy"+leftwristy);
        rightwristy = results[0].pose.rightWrist.y;
        console.log("rightwristy"+rightwristy);
    }
}
