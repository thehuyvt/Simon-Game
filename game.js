let gamePattern = [];

let buttonColours = ["red", "blue", "green", "yellow"];

let userCLickedPattern = [];

let level = 0;

function nextSequence(){
    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColours = buttonColours[randomNumber];
    gamePattern.push(randomChosenColours);
    $("#" + randomChosenColours).fadeOut(100).fadeIn(100);
    playSound(randomChosenColours);
    $("#level-title").text("Level " + level);
    level ++;
    userCLickedPattern = [];
}

function playSound(nameSound){
    var audio = new Audio("./sounds/"+ nameSound + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("." + currentColour).addClass("pressed");
    setTimeout(function(){
        $("." + currentColour).removeClass("pressed");
    }, 100);
    
}

function checkAnswer(currentLevel){
    if(userCLickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");
        if(userCLickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }else{
        console.log("wrong");
        var audio = new Audio("./sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200)
        $("#level-title").text("Game Over, Press Any Key to Restart");
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    nextSequence();
}

$(".btn").click(function(){
    var id = $(this).attr("id");
    let userChosenColour = id;
    userCLickedPattern.push(userChosenColour);
    animatePress(id);
    playSound(id);

    checkAnswer(userCLickedPattern.length-1);
})

$(document).keydown(function(e){
    if($("#level-title").text() == "Press A Key to Start"){
        setTimeout(function(){
            nextSequence(); 
        }, 500)     
    }else if($("#level-title").text() == "Game Over, Press Any Key to Restart"){
        startOver(); 
    }
})











