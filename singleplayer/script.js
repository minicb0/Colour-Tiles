//declaring color arrays
var t3e_colorArray;
var t5e_colorArray;
var t4m_colorArray;
var t6m_colorArray;
var t5h_colorArray;
var t7h_colorArray;
var colorArraays = [];

let n; //n is the bigger grid size in each mode n=5 for easy, n=6 for medium, n=7 for hard
let d; //d is difficulty level for each mode d=1 for easy, d=3 for medium, d=5 for hard

function colorArrayFunction() {
    //easy mode 3x3 and 5x5 grid with total 6 different colors
    t3e_colorArray = ['#ae3c60', '#df473c', '#f3c33c', '#255e79', '#267778', '#82b4bb', '#ae3c60', '#df473c', '#f3c33c', '#255e79', '#267778', '#82b4bb'];
    t5e_colorArray = ['#ae3c60', '#df473c', '#f3c33c', '#255e79', '#267778', '#82b4bb', '#ae3c60', '#df473c', '#f3c33c', '#255e79', '#267778', '#82b4bb', '#ae3c60', '#df473c', '#f3c33c', '#255e79', '#267778', '#82b4bb', '#ae3c60', '#df473c', '#f3c33c', '#255e79', '#267778', '#82b4bb'];

    //medium mode 4x4 and 6x6 grid with total 7 different colors
    t4m_colorArray = ['#ae3c60', '#df473c', '#f3c33c', '#255e79', '#267778', '#82b4bb', '#bfff00', '#ae3c60', '#df473c', '#f3c33c', '#255e79', '#267778', '#82b4bb', '#bfff00', '#ae3c60', '#df473c', '#f3c33c', '#255e79', '#267778', '#82b4bb', '#bfff00'];
    t6m_colorArray = ['#ae3c60', '#df473c', '#f3c33c', '#255e79', '#267778', '#82b4bb', '#bfff00', '#ae3c60', '#df473c', '#f3c33c', '#255e79', '#267778', '#82b4bb', '#bfff00', '#ae3c60', '#df473c', '#f3c33c', '#255e79', '#267778', '#82b4bb', '#bfff00', '#ae3c60', '#df473c', '#f3c33c', '#255e79', '#267778', '#82b4bb', '#bfff00', '#ae3c60', '#df473c', '#f3c33c', '#255e79', '#267778', '#82b4bb', '#bfff00'];

    //hard mode 5x5 and 7x7 grid with total 8 different colors
    t5h_colorArray = ['#ae3c60', '#df473c', '#f3c33c', '#255e79', '#267778', '#82b4bb', '#bfff00', '#5e34c7', '#ae3c60', '#df473c', '#f3c33c', '#255e79', '#267778', '#82b4bb', '#bfff00', '#5e34c7', '#ae3c60', '#df473c', '#f3c33c', '#255e79', '#267778', '#82b4bb', '#bfff00', '#5e34c7', '#ae3c60', '#df473c', '#f3c33c', '#255e79', '#267778', '#82b4bb', '#bfff00', '#5e34c7', '#ae3c60', '#df473c', '#f3c33c', '#255e79', '#267778', '#82b4bb', '#bfff00', '#5e34c7'];
    t7h_colorArray = ['#ae3c60', '#df473c', '#f3c33c', '#255e79', '#267778', '#82b4bb', '#bfff00', '#5e34c7', '#ae3c60', '#df473c', '#f3c33c', '#255e79', '#267778', '#82b4bb', '#bfff00', '#5e34c7', '#ae3c60', '#df473c', '#f3c33c', '#255e79', '#267778', '#82b4bb', '#bfff00', '#5e34c7', '#ae3c60', '#df473c', '#f3c33c', '#255e79', '#267778', '#82b4bb', '#bfff00', '#5e34c7', '#ae3c60', '#df473c', '#f3c33c', '#255e79', '#267778', '#82b4bb', '#bfff00', '#5e34c7', '#ae3c60', '#df473c', '#f3c33c', '#255e79', '#267778', '#82b4bb', '#bfff00', '#5e34c7'];

    colorArrays = [
        "", "", "", "", t3e_colorArray, "", t5e_colorArray, t4m_colorArray, "", t6m_colorArray, t5h_colorArray, "", t7h_colorArray
    ]
}
colorArrayFunction();

var newgame = document.getElementById("newgame");
var start = document.getElementById("start");
var input = document.getElementById("yourName");
var difficulty = document.getElementById("difficulty")
var difficultyLevel = document.getElementById("difficulty").value;
var countdownTimer = document.querySelector("#timer")

//sounds
var tapSound = document.getElementById("tap");
var finishSound = document.getElementById("finish");

//highscores variable
var highCount = document.getElementById("highCount");
var highTime = document.getElementById("highTime");
var highName = document.getElementById("highName");
var modeSelected = document.getElementById("modeSelected");

//pop up window
var popup = document.getElementById("popup");
var demo = document.getElementById("demo");
var popupImg = document.getElementById("gif");
var caption = document.getElementById("caption");
var close = document.getElementById("close");

var count = 0;
var startTime;
var x; // for time interval
var timetaken;
var smallGrid_randomArray = [];
var bigGrid_centreArray = [];

//setting local storage initially
if (localStorage.getItem("bestScores_easy") === null) {
    localStorage.setItem("bestScores_easy", JSON.stringify([
        {
            "hscore": 0,
            "hplayerName": "N/A",
            "hmoveCount": "-",
            "htimeTaken": "-"
        }
    ]));
}
if (localStorage.getItem("bestScores_medium") === null) {
    localStorage.setItem("bestScores_medium", JSON.stringify([
        {
            "hscore": 0,
            "hplayerName": "N/A",
            "hmoveCount": "-",
            "htimeTaken": "-"
        }
    ]));
}
if (localStorage.getItem("bestScores_hard") === null) {
    localStorage.setItem("bestScores_hard", JSON.stringify([
        {
            "hscore": 0,
            "hplayerName": "N/A",
            "hmoveCount": "-",
            "htimeTaken": "-"
        }
    ]));
}

// n*n grid
function grid(n, d) {
    var tableContainer = document.getElementById("table-container");
    let div = document.createElement("div");
    div.id = "table" + n + "Div";
    tableContainer.appendChild(div)
    let table = document.createElement("table");
    table.id = "table" + n;
    table.classList = "table"

    div.appendChild(table);
    var rowLength = n;
    var columnLength = n;

    //creating table rows
    for (let i = 0; i < rowLength; i++) {
        let row = document.createElement("tr");
        row.id = "t" + n + "row" + (i + 1);

        table.appendChild(row);

        //creating table data
        for (let j = 0; j < columnLength; j++) {
            let cell = document.createElement("td");
            // let cellText = document.createTextNode(i * rowLength + j + 1);
            // let cellText = document.createTextNode((i + 1) + "" + (j + 1));
            let random = Math.floor(Math.random() * colorArrays[(n + d)].length)
            // console.log(random);
            let color = colorArrays[(n + d)][random];
            colorArrays[(n + d)].splice(random, 1);
            cell.style.backgroundColor = color;
            // cell.id = ("t" + n + "_tile" + (i * rowLength + j + 1));
            cell.id = ("t" + n + "_tile" + (i + 1) + "" + (j + 1));
            cell.classList.add("tile");
            // cell.appendChild(cellText);
            row.appendChild(cell);
        }
    }
}

//On the page load, it will start with Easy Mode
n = 5;
d = 1;
grid((n - 2), d); //4
grid(n, d); //6

function tileSwap() {

    //pushing colors of 3x3 grid to smallGrid_randomArray
    smallGrid_randomArray = []
    for (let i = 1; i < (n - 2) + 1; i++) {
        for (let j = 1; j < (n - 2) + 1; j++) {
            smallGrid_randomArray.push(document.getElementById("t" + (n - 2) + "_tile" + i + "" + j).style.backgroundColor)
        }
    }

    //declaring black empty tiles
    var emptyRow = n;
    var emptyColumn = n;

    //adding event listerner to all tiles of big grid
    for (let row = 1; row < (n + 1); row++) {
        for (let column = 1; column < (n + 1); column++) {
            document.getElementById('t' + n + '_tile' + row + "" + column).addEventListener('click', () => {
                if ((emptyColumn == column && Math.abs(emptyRow - row) == 1) || (emptyRow == row && Math.abs(emptyColumn - column) == 1)) {
                    count++;
                    tapSound.play();
                    document.getElementById("moveCounter").innerHTML = "Move Count - " + count;

                    //swapping the empty tile and adjacent tile
                    [document.getElementById("t" + n + "_tile" + row + "" + column).innerHTML, document.getElementById("t" + n + "_tile" + emptyRow + "" + emptyColumn).innerHTML] = [document.getElementById("t" + n + "_tile" + emptyRow + "" + emptyColumn).innerHTML, document.getElementById("t" + n + "_tile" + row + "" + column).innerHTML];
                    [document.getElementById("t" + n + "_tile" + row + "" + column).style.backgroundColor, document.getElementById("t" + n + "_tile" + emptyRow + "" + emptyColumn).style.backgroundColor] = [document.getElementById("t" + n + "_tile" + emptyRow + "" + emptyColumn).style.backgroundColor, document.getElementById("t" + n + "_tile" + row + "" + column).style.backgroundColor]

                    //declaring new row and coloumn to emptyTile after swapping
                    emptyRow = row
                    emptyColumn = column
                }

                //pushing colors of center of 5x5 grid to bigGrid_centreArray
                bigGrid_centreArray = []
                for (let i = 2; i < n; i++) {
                    for (let j = 2; j < n; j++) {
                        bigGrid_centreArray.push(document.getElementById("t" + n + "_tile" + i + "" + j).style.backgroundColor)
                    }
                }
            })
        }
    }
}

//pop up window
demo.onclick = function () {
    popup.style.display = "block";
    popupImg.src = "../assets/demo.gif";
    newgame.style.zIndex = "0"
    close.classList.remove("hide");
    caption.style.paddingTop = "0px";
    caption.innerHTML = "For Easy Mode: Given a 5x5 grid made with tiles of 6 different colors, the goal is to try and make this 3x3 grid in its center. Out of the 25 tiles, one will be empty which can be swapped with any of the four adjacent tiles. <br> P.S. High Scores are based on move count alone.";
}

close.addEventListener('click', () => {
    popup.style.display = "none";
})

//adding event listeners to start button
start.addEventListener('click', () => {
    //taking user name input
    userName = input.value;

    //taking time of start
    startTime = new Date().getTime();
    x = setInterval(myTimer, 10);

    //disabling name input and start button after starting the game
    input.disabled = true;
    start.disabled = true;

    //adding black border to center of 5x5 grid on clicking start button to highlight it
    for (let i = 2; i < n; i++) {
        for (let j = 2; j < n; j++) {
            document.getElementById("t" + n + "_tile" + i + "" + j).style.border = "2px solid rgb(19, 18, 18)"
        }
    }

    //calling the function so the tiles can be swapped only after clicking start button
    tileSwap();
})

//adding event listener to select option to switch between easy medium hard
difficulty.addEventListener('change', () => {
    gameStopInBetween();
    //make the new table with some different generated color
    difficultyLevel = document.getElementById("difficulty").value;
    if (difficultyLevel === "easy") {
        n = 5;
        d = 1;
        grid((n - 2), d); //4
        grid(n, d); //6
    }
    if (difficultyLevel === "medium") {
        n = 6;
        d = 3;
        grid((n - 2), d); //7
        grid(n, d); //9
    }
    if (difficultyLevel === "hard") {
        n = 7;
        d = 5;
        grid((n - 2), d); //10
        grid(n, d); //12
    }
    //updating high score for the selected option
    updateHighScore();
    colorArrayFunction();
})

//adding event listeners to newGame button
newgame.addEventListener('click', () => {
    gameStopInBetween();
    //make the new table with some different generated colors
    grid((n - 2), d);
    grid(n, d);
    colorArrayFunction();
})

function gameStopInBetween() {
    //closing popup if new game button is clicked after won
    popup.style.display = "none";

    //making all the color arrays filled again
    colorArrayFunction();

    //making the start button and input enable again
    start.disabled = false;
    input.disabled = false;

    //stoping the timer
    clearInterval(x);

    //display the time to 0 again
    document.getElementById("timer").innerHTML = "Timer - 00:00:000"

    //display the move count 0 again
    count = 0;
    document.getElementById("moveCounter").innerHTML = "Move Count - " + count;

    //removing the already formed tables
    document.getElementById("table" + n).remove();
    document.getElementById("table" + (n - 2)).remove();
    document.getElementById("table" + (n - 2) + "Div").remove();
    document.getElementById("table" + n + "Div").remove();
}

//Timer
function myTimer() {
    var nowTime = new Date().getTime();
    timetaken = nowTime - startTime;

    var mSeconds = Math.floor((timetaken % (1000)));
    var seconds = Math.floor((timetaken % (1000 * 60)) / 1000);
    var minute = Math.floor((timetaken % (1000 * 60 * 60)) / (1000 * 60));

    //shows 09 instead 9 seconds and minutes
    if (mSeconds < 10) {
        mSeconds = "00" + mSeconds;
    }
    if (mSeconds < 100 & mSeconds > 9) {
        mSeconds = "0" + mSeconds
    }
    if (seconds < 10) {
        seconds = "0" + seconds
    }
    if (minute < 10) {
        minute = "0" + minute
    }
    // console.log(timetaken)
    document.getElementById("timer").innerHTML = "Timer - " + minute + ":" + seconds + ":" + mSeconds;

    // if both the small grid and center grid of big grid matches, declare win
    if (smallGrid_randomArray.join() == bigGrid_centreArray.join()) {
        //score is only factor to decide the highscore and it is based on move count, less the move count - more the score - good highscore
        score = 1 / (count)

        if (difficultyLevel === "easy") {
            if (hscore_easy[0].hscore < score) {
                localStorage.setItem("bestScores_easy", JSON.stringify([
                    {
                        "hscore": score,
                        "hplayerName": userName,
                        "hmoveCount": count,
                        "htimeTaken": Math.floor(timetaken / 1000)
                    }
                ]));
            }
        }
        if (difficultyLevel === "medium") {
            if (hscore_medium[0].hscore < score) {
                localStorage.setItem("bestScores_medium", JSON.stringify([
                    {
                        "hscore": score,
                        "hplayerName": userName,
                        "hmoveCount": count,
                        "htimeTaken": Math.floor(timetaken / 1000)
                    }
                ]));
            }
        }
        if (difficultyLevel === "hard") {
            if (hscore_hard[0].hscore < score) {
                localStorage.setItem("bestScores_easy", JSON.stringify([
                    {
                        "hscore": score,
                        "hplayerName": userName,
                        "hmoveCount": count,
                        "htimeTaken": Math.floor(timetaken / 1000)
                    }
                ]));
            }
        }
        updateHighScore();

        setTimeout(() => {
            finishSound.play();
            // console.log("won");
            clearInterval(x);
            popup.style.display = "block";
            popupImg.src = "";
            close.classList.add("hide");
            caption.style.paddingTop = "150px";
            caption.style.textAlign = "center";
            caption.innerHTML = "Congrats " + userName + "! You won! <br> Move Count: " + count + "<br> Time taken: " + (Math.floor(timetaken / 1000) + " seconds");
            newgame.style.zIndex = "1";
        }, 100)
    }
}

//local storage
var hscore_easy = JSON.parse(localStorage.getItem("bestScores_easy"))
var hscore_medium = JSON.parse(localStorage.getItem("bestScores_medium"))
var hscore_hard = JSON.parse(localStorage.getItem("bestScores_hard"))

function updateHighScore() {
    hscore_easy = JSON.parse(localStorage.getItem("bestScores_easy"))
    hscore_medium = JSON.parse(localStorage.getItem("bestScores_medium"))
    hscore_hard = JSON.parse(localStorage.getItem("bestScores_hard"))

    if (difficultyLevel === "easy") {
        highCount.innerHTML = hscore_easy[0].hmoveCount;
        highName.innerHTML = hscore_easy[0].hplayerName;
        highTime.innerHTML = hscore_easy[0].htimeTaken;
        modeSelected.innerHTML = "Easy"
    }
    if (difficultyLevel === "medium") {
        highCount.innerHTML = hscore_medium[0].hmoveCount;
        highName.innerHTML = hscore_medium[0].hplayerName;
        highTime.innerHTML = hscore_medium[0].htimeTaken;
        modeSelected.innerHTML = "Medium"
    }
    if (difficultyLevel === "hard") {
        highCount.innerHTML = hscore_hard[0].hmoveCount;
        highName.innerHTML = hscore_hard[0].hplayerName;
        highTime.innerHTML = hscore_hard[0].htimeTaken;
        modeSelected.innerHTML = "Hard"
    }
}

updateHighScore();

//sounds 
var unmute = document.getElementById("unmute");
var mute = document.getElementById("mute")
unmute.addEventListener('click', () => {
    mute.classList.remove("hide")
    unmute.classList.add("hide")
    tapSound.muted = true;
    finishSound.muted = true;
})
mute.addEventListener('click', () => {
    mute.classList.add("hide")
    unmute.classList.remove("hide")
    tapSound.muted = false;
    tapSound.play();
    finishSound.muted = false;
})

//dark mode
var darkMode = document.getElementById("darkMode");
darkMode.addEventListener('click', () => {
    // console.log(darkMode.innerHTML)
    if (darkMode.innerHTML == "Light Mode") {
        document.body.style.backgroundColor = "rgb(206, 203, 203)"
        document.body.style.color = "black"
        darkMode.style.color = "white"
        darkMode.style.backgroundColor = "black"
        darkMode.innerHTML = "Dark Mode"
    } else if (darkMode.innerHTML == "Dark Mode") {
        document.body.style.backgroundColor = "rgb(19, 19, 19)"
        document.body.style.color = "white"
        darkMode.style.color = "black"
        darkMode.style.backgroundColor = "white"
        darkMode.innerHTML = "Light Mode"
    }
})
