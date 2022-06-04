CITY_song="";
ROLLING_song="";
rightWrist_x = 0;
rightWrist_y = 0;
leftWrist_x = 0;
leftWrist_y = 0;
scoreleftWrist = 0;
scorerightWrist = 0;
song_CITY = "";
song_ROLLING = "";

function setup(){
    canvas = createCanvas(600,530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);
}

function preload(){
    CITY_song = loadSound("CITY.mp3");
    ROLLING_song = loadSound("ROLLING.mp3");
}

function draw(){
    image(video,0,0,600,530);

    fill("#00ff00");
    stroke("#ff0000");

    song_CITY = CITY_song.isPlaying();
    console.log(song_CITY);

    song_ = ROLLING_song.isPlaying();
    console.log(song_ROLLING);

    if(scoreleftWrist > 0.2){
        circle(leftWrist_x,leftWrist_y,20);
        ROLLING_song.stop();
        if(songCITY == false){
            CITY_song.play();
        }
        else{
            console.log("Song Name: City Of Angels");
            document.getElementById("song_id").innerHTML = "Song Name: City of Angels";
        }
    }

    if(scorerightWrist > 0.2){
        circle(rightWrist_x,rightWrist_y,20);
        CITY_song.stop();
        if(song_ROLLING == false){
            ROLLING_song.play();
        }
        else{
            console.log("Song Name: Get Rolled LOL");
            document.getElementById("song_id").innerHTML = "Song Name: Get Rolled LOL";
        }
    }
}

function modelLoaded(){
    console.log("poseNet Is now stealing your data...");
}

function gotposes(results){
    if(results.length > 0){
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);

        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log(scorerightWrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);
    }
}