// Variables
var buttonColours = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// Play sound
function playSound(name) {
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

// Animate button
function animatePress(currentColour) {
    $('#' + currentColour).addClass('pressed');
    setTimeout(function() {
        $('#' + currentColour).removeClass('pressed');
    }, 100);
}

// Next color
function nextSequence() {
    // Clear user pattern
    userClickedPattern = [];

    // Next level
    level++;
    $('#level-title').text('Level ' + level);

    // Random color
    randomNumber = Math.floor(Math.random() * 4);
    randomChosenColour = buttonColours[randomNumber];

    // Add to list
    gamePattern.push(randomChosenColour);

    // Show button, play sound
    $('#' + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

// User color
$('.btn').on('click', function() {
    if (started) {
        // Add to list
        var userChosenColour = $(this).attr('id');
        userClickedPattern.push(userChosenColour);

        // Animate button, play sound
        animatePress(userChosenColour);
        playSound(userChosenColour);

        // Check if correct
        checkAnswer()
    }
    
});

// Compare colors
function checkAnswer() {
    for (i=0; i<userClickedPattern.length; i++) {
        // If wrong color,
        if (gamePattern[i] != userClickedPattern[i]) {
            // Play sound
            var audio = new Audio('sounds/wrong.mp3');
            audio.play();

            // Flash red background
            $('body').addClass('game-over');
            setTimeout(() => {
                $('body').removeClass('game-over');
            }, 200);

            // Update title
            $('#level-title').text('Game Over, Press Any Key to Restart');

            // Reset game
            started = false;
            level = 0;
            gamePattern = [];
        }
    }

    // If game didn't stop, continue
    if (started == true && gamePattern.length == userClickedPattern.length) {
        setTimeout(nextSequence, 1000);
    }

}

// Start game
$(document).on('keypress', function() {
    if (!started) {
        $('#level-title').text('Level ' + level);
        nextSequence();
        started = true;
    }
});
