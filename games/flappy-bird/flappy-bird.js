var game = document.getElementById("game");
var block = document.getElementById("block");
var hole = document.getElementById("hole");
var character = document.getElementById("character");
var jumping = 0;
var counter = 0;

hole.addEventListener("animationiteration", () => {
    var random = -((Math.random() * 300) + 150);
    hole.style.top = random + "px";
});

game.addEventListener("animationiteration", () => {
    counter++;
    updateCurrentScore(counter / 2);
    updateHighScore(counter);
});

setInterval(function () {
    var characterTop = parseInt(
        window.getComputedStyle(character).getPropertyValue("top")
    );
    if (jumping == 0) {
        character.style.top = characterTop + 3 + "px";
    }
    var blockLeft = parseInt(
        window.getComputedStyle(block).getPropertyValue("left")
    );
    var holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
    var cTop = -(600 - characterTop);
    if (
        characterTop > 580 ||
        (blockLeft < 70 && blockLeft > -50 && (cTop < holeTop || cTop > holeTop + 130))
    ) {
        updateHighScore(counter);
        Swal.fire({
            icon: 'error',
            title: 'Game over!',
            text: `Score: ${(counter / 2)}\nHigh Score:   ${localStorage.getItem("highScore")}`,
            confirmButtonText: "Play Again",
            allowOutsideClick: false,
            background: '#212121',
            color: '#FFFF',
            confirmButtonColor: '#FF4545'
        })
        character.style.top = 100 + "px";
        counter = 0;
    }
}, 10);

function jump() {
    jumping = 1;
    let jumpCount = 0;
    var jumpInterval = setInterval(function () {
        var characterTop = parseInt(
            window.getComputedStyle(character).getPropertyValue("top")
        );
        if (characterTop > 6 && jumpCount < 15) {
            character.style.top = characterTop - 5 + "px";
        }
        if (jumpCount > 20) {
            clearInterval(jumpInterval);
            jumping = 0;
            jumpCount = 0;
        }
        jumpCount++;
    }, 10);
}

function updateCurrentScore(score) {
    document.getElementById("current-score").innerHTML = `Score: <span>${score}</span>`;
}

function updateHighScore(score) {
    var highScore = localStorage.getItem("highScore");
    if (!highScore || score > highScore) {
        localStorage.setItem("highScore", score);
        document.getElementById("high-score").innerHTML = `High Score: <span>${localStorage.getItem("highScore")}</span>`;
    } else {
        document.getElementById("high-score").innerHTML = `High Score: <span>${localStorage.getItem("highScore")}</span>`;
    }
}

updateHighScore(0);
