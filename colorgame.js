//variables
var numSquares = 6;
var squares = document.querySelectorAll('.square');
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector('#message');
var h1 = document.querySelector('h1');
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll('.mode');


//Setting up
function init() {

    //Adding event listeners to easy and hard buttons
    for (var i=0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function() {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");

            if(this.textContent === "Easy") {
                numSquares = 3
            }
            else {
                numSquares = 6
            }
            reset();
        })
    }
    //Adding event listeners for resetButton
    resetButton.addEventListener('click', function() {
        reset();
    })

    reset();
}

//Resetups the page when game mode is changed or player clicks retry
function reset() {
    //generate new colors
    colors = pickColor(numSquares);

    //pick new random colors
    pickedColor = colors[randomColor()];

    //updating page
    changeSquares();
    messageDisplay.textContent = '';
    h1.style.background = 'steelblue';
    resetButton.textContent = 'New Colors';
    colorDisplay.textContent = pickedColor;
}

//Changes color of squares and adds event listeners
function changeSquares() {
    for (var i =0; i < squares.length; i++) {

        if(colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        
            // add click listeners
            squares[i].addEventListener("click", function() {
                // grab color of clicked square and compare with picked color
                if (this.style.backgroundColor === pickedColor) {
                    messageDisplay.textContent = 'Correct!';
                    changeColors(this.style.backgroundColor);
                    h1.style.backgroundColor = pickedColor;
                    resetButton.textContent = 'Play Again?';
                }
                else {
                    this.style.backgroundColor = "#232323";
                    messageDisplay.textContent = 'Try Again!';
                }
            })
        }

        else {
            squares[i].style.display = "none";
        }
    }
}


//Changes color of all squares to the same color
function changeColors(color) {
    for (var i =0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
    }
}


//Picks a list of random colors
function pickColor(num) {

    var lst = [];
    
    for (var i = 0; i < num; i++) {
        var col = "rgb(";
        col += String(Math.floor(Math.random() * 255 + 1)) + ", ";
        col += String(Math.floor(Math.random() * 255 + 1)) + ", ";
        col += String(Math.floor(Math.random() * 255 + 1)) + ")";

        lst.push(col);
    }

    return lst;
}

//Picks a random color from the list of colors
function randomColor () {
    var num = Math.floor(Math.random() * colors.length)
    return num
}

init();

