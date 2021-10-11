let noseX = 0;
let noseY = 0;
let difference = 0;
let rightWristX = 0;
let leftWristX = 0;
// image(video, 0, 0, width / 2, height);
// translate(width, 0);
// scale(-1.0, 1.0);
// image(video, 0, 0, width, height);
function setup() {
  video = createCapture(VIDEO);
  video.size(550, 500);

  canvas = createCanvas(550, 500);
  canvas.position(560, 150);

  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on("pose", gotPoses);
}

function modelLoaded() {
  console.log("PoseNet is initialized!");
}

function gotPoses(results) {
  if (results.length > 0) {
    console.log(results);
    noseX = results[0].pose.nose.x;
    noseY = results[0].pose.nose.y;
    console.log("nose X = ", noseX, " nose Y = ", noseY);

    leftWristX = results[0].pose.leftWrist.x;
    rightWristX = results[0].pose.rightWrist.x;
    difference = floor(leftWristX - rightWristX);
    console.log(
      "left Wrist X = ",
      leftWristX,
      "right Wrist X = ",
      rightWristX,
      "difference = ",
      difference
    );
  }
}

function draw() {
  document.getElementById("square_side").innerHTML =
    "Width and Height of the square will be " + difference + " px";
  background("#D8BFD8");
  fill("#66CDAA");
  stroke("#66CDAA");
  square(noseX, noseY, difference);
}
