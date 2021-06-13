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
    //easy mode
    t3e_colorArray = ['#ae3c60', '#df473c', '#f3c33c', '#255e79', '#267778', '#82b4bb', '#ae3c60', '#df473c', '#f3c33c', '#255e79', '#267778', '#82b4bb'];
    t5e_colorArray = ['#ae3c60', '#df473c', '#f3c33c', '#255e79', '#267778', '#82b4bb', '#ae3c60', '#df473c', '#f3c33c', '#255e79', '#267778', '#82b4bb', '#ae3c60', '#df473c', '#f3c33c', '#255e79', '#267778', '#82b4bb', '#ae3c60', '#df473c', '#f3c33c', '#255e79', '#267778', '#82b4bb'];

    //medium mode
    t4m_colorArray = ['#ae3c60', '#df473c', '#f3c33c', '#255e79', '#267778', '#82b4bb', '#bfff00', '#ae3c60', '#df473c', '#f3c33c', '#255e79', '#267778', '#82b4bb', '#bfff00', '#ae3c60', '#df473c', '#f3c33c', '#255e79', '#267778', '#82b4bb', '#bfff00'];
    t6m_colorArray = ['#ae3c60', '#df473c', '#f3c33c', '#255e79', '#267778', '#82b4bb', '#bfff00', '#ae3c60', '#df473c', '#f3c33c', '#255e79', '#267778', '#82b4bb', '#bfff00', '#ae3c60', '#df473c', '#f3c33c', '#255e79', '#267778', '#82b4bb', '#bfff00', '#ae3c60', '#df473c', '#f3c33c', '#255e79', '#267778', '#82b4bb', '#bfff00', '#ae3c60', '#df473c', '#f3c33c', '#255e79', '#267778', '#82b4bb', '#bfff00'];

    //hard mode
    t5h_colorArray = ['#ae3c60', '#df473c', '#f3c33c', '#255e79', '#267778', '#82b4bb', '#bfff00', '#5e34c7', '#ae3c60', '#df473c', '#f3c33c', '#255e79', '#267778', '#82b4bb', '#bfff00', '#5e34c7', '#ae3c60', '#df473c', '#f3c33c', '#255e79', '#267778', '#82b4bb', '#bfff00', '#5e34c7', '#ae3c60', '#df473c', '#f3c33c', '#255e79', '#267778', '#82b4bb', '#bfff00', '#5e34c7', '#ae3c60', '#df473c', '#f3c33c', '#255e79', '#267778', '#82b4bb', '#bfff00', '#5e34c7'];
    t7h_colorArray = ['#ae3c60', '#df473c', '#f3c33c', '#255e79', '#267778', '#82b4bb', '#bfff00', '#5e34c7', '#ae3c60', '#df473c', '#f3c33c', '#255e79', '#267778', '#82b4bb', '#bfff00', '#5e34c7', '#ae3c60', '#df473c', '#f3c33c', '#255e79', '#267778', '#82b4bb', '#bfff00', '#5e34c7', '#ae3c60', '#df473c', '#f3c33c', '#255e79', '#267778', '#82b4bb', '#bfff00', '#5e34c7', '#ae3c60', '#df473c', '#f3c33c', '#255e79', '#267778', '#82b4bb', '#bfff00', '#5e34c7', '#ae3c60', '#df473c', '#f3c33c', '#255e79', '#267778', '#82b4bb', '#bfff00', '#5e34c7'];

    colorArrays = [
        "", "", "", "", t3e_colorArray, "", t5e_colorArray, t4m_colorArray, "", t6m_colorArray, t5h_colorArray, "", t7h_colorArray
    ]
}
colorArrayFunction();

var newgame = document.getElementById("newgame");
var p1start = document.getElementById("p1start");
var p2start = document.getElementById("p2start");
var p1input = document.getElementById("p1yourName");
var p2input = document.getElementById("p2yourName");
var difficulty = document.getElementById("difficulty");
var difficultyLevel = document.getElementById("difficulty").value;

//sounds
var tapSound = document.getElementById("tap");
var finishSound = document.getElementById("finish");

//pop up window
var popup = document.getElementById("popup");
var demo = document.getElementById("demo");
var popupImg = document.getElementById("gif");
var caption = document.getElementById("caption");
var close = document.getElementById("close");

//declaring player's credentials
var p1userName;
var p2userName;
var p1moveCount;
var p2moveCount;
var p1timetaken;
var p2timetaken;
var p1score;
var p2score;

//at the start of the game player 1 will be displayed with no message
document.getElementById("p1won").classList.remove("wonMsg");

var count = 0;
var startTime;
var x;
var y;
var smallGrid_randomArray = []
var bigGrid_centreArray = []
var p2_smallGrid = []
var p2_bigGrid = []

// n*n grid
function grid(n, d) {
    colorArrayFunction();
    var tableContainer = document.getElementById("p1table-container");
    let div = document.createElement("div");
    div.id = "p1table" + n + "Div";
    tableContainer.appendChild(div)
    let table = document.createElement("table");
    table.id = "p1table" + n;
    table.classList = "table"

    div.appendChild(table);
    var rowLength = n;
    var columnLength = n;

    //creating table rows
    for (let i = 0; i < rowLength; i++) {
        let row = document.createElement("tr");
        row.id = "p1t" + n + "row" + (i + 1);

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
            cell.id = ("p1t" + n + "_tile" + (i + 1) + "" + (j + 1));
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

function colorsOfP2() {
    p2_smallGrid = []
    for (let i = 1; i < (n - 2) + 1; i++) {
        for (let j = 1; j < (n - 2) + 1; j++) {
            p2_smallGrid.push(document.getElementById("p1t" + (n - 2) + "_tile" + i + "" + j).style.backgroundColor);
        }
    }

    p2_bigGrid = []
    for (let i = 1; i < n + 1; i++) {
        for (let j = 1; j < n + 1; j++) {
            p2_bigGrid.push(document.getElementById("p1t" + n + "_tile" + i + "" + j).style.backgroundColor);
        }
    }
}
colorsOfP2();

function solution(p) {
    smallGrid_randomArray = []
    for (let i = 1; i < (n - 2) + 1; i++) {
        for (let j = 1; j < (n - 2) + 1; j++) {
            smallGrid_randomArray.push(document.getElementById("p" + p + "t" + (n - 2) + "_tile" + i + "" + j).style.backgroundColor)
        }
    }

    bigGrid_centreArray = []
    for (let i = 2; i < n; i++) {
        for (let j = 2; j < n; j++) {
            bigGrid_centreArray.push(document.getElementById("p" + p + "t" + n + "_tile" + i + "" + j).style.backgroundColor)
        }
    }

}

function tileSwap(p) {

    //declaring black empty tiles
    var emptyRow = n;
    var emptyColumn = n;

    //adding event listerner to all tiles of big grid
    for (let row = 1; row < (n + 1); row++) {
        for (let column = 1; column < (n + 1); column++) {
            document.getElementById("p" + p + "t" + n + '_tile' + row + "" + column).addEventListener('click', () => {
                if ((emptyColumn == column && Math.abs(emptyRow - row) == 1) || (emptyRow == row && Math.abs(emptyColumn - column) == 1)) {
                    count++;
                    tapSound.play();
                    document.getElementById("p" + p + "moveCounter").innerHTML = "Move Count - " + count;

                    //swapping the empty tile and adjacent tile
                    [document.getElementById("p" + p + "t" + n + "_tile" + row + "" + column).innerHTML, document.getElementById("p" + p + "t" + n + "_tile" + emptyRow + "" + emptyColumn).innerHTML] = [document.getElementById("p" + p + "t" + n + "_tile" + emptyRow + "" + emptyColumn).innerHTML, document.getElementById("p" + p + "t" + n + "_tile" + row + "" + column).innerHTML];
                    [document.getElementById("p" + p + "t" + n + "_tile" + row + "" + column).style.backgroundColor, document.getElementById("p" + p + "t" + n + "_tile" + emptyRow + "" + emptyColumn).style.backgroundColor] = [document.getElementById("p" + p + "t" + n + "_tile" + emptyRow + "" + emptyColumn).style.backgroundColor, document.getElementById("p" + p + "t" + n + "_tile" + row + "" + column).style.backgroundColor]

                    //declaring new row and coloumn to emptyTile after swapping
                    emptyRow = row
                    emptyColumn = column
                }

                solution(p);
            })
        }
    }
}

//player 2
function gridp2t1(n) {
    colorsOfP2();

    var tableContainer = document.getElementById("p2table-container");
    let div = document.createElement("div");
    div.id = "p2table" + n + "Div";
    tableContainer.appendChild(div)
    let table = document.createElement("table");
    table.id = "p2table" + n;
    table.classList = "table"

    div.appendChild(table);
    var rowLength = n;
    var columnLength = n;

    //creating table rows
    for (let i = 0; i < rowLength; i++) {
        let row = document.createElement("tr");
        row.id = "p2t" + n + "row" + (i + 1);

        table.appendChild(row);

        //creating table data
        for (let j = 0; j < columnLength; j++) {
            let cell = document.createElement("td");
            // let cellText = document.createTextNode(i * rowLength + j + 1);
            // let cellText = document.createTextNode((i + 1) + "" + (j + 1));
            let color = p2_smallGrid[i * rowLength + j];
            cell.style.backgroundColor = color;
            // cell.id = ("t" + n + "_tile" + (i * rowLength + j + 1));
            cell.id = ("p2t" + n + "_tile" + (i + 1) + "" + (j + 1));
            cell.classList.add("tile");
            // cell.appendChild(cellText);
            row.appendChild(cell);
        }
    }
}

function gridp2t2(n) {
    colorsOfP2();
    var tableContainer = document.getElementById("p2table-container");
    let div = document.createElement("div");
    div.id = "p2table" + n + "Div";
    tableContainer.appendChild(div)

    let table = document.createElement("table");
    table.id = "p2table" + n;
    table.classList = "table"

    div.appendChild(table);
    var rowLength = n;
    var columnLength = n;

    //creating table rows
    for (let i = 0; i < rowLength; i++) {
        let row = document.createElement("tr");
        row.id = "p2t" + n + "row" + (i + 1);

        table.appendChild(row);

        //creating table data
        for (let j = 0; j < columnLength; j++) {
            let cell = document.createElement("td");
            // let cellText = document.createTextNode(i * rowLength + j + 1);
            // let cellText = document.createTextNode((i + 1) + "" + (j + 1));
            let color = p2_bigGrid[i * rowLength + j];
            cell.style.backgroundColor = color;
            // cell.id = ("t" + n + "_tile" + (i * rowLength + j + 1));
            cell.id = ("p2t" + n + "_tile" + (i + 1) + "" + (j + 1));
            cell.classList.add("tile");
            // cell.appendChild(cellText);
            row.appendChild(cell);
        }
    }
}

//On the page load, it will start with Easy Mode
gridp2t1((n - 2))
gridp2t2(n)

//on the page load, player 2 will be disabled
document.getElementById("player2").classList.add("disabled")

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

p1start.addEventListener('click', () => {
    count = 0;
    solution(1);

    //adding black border to center of nxn grid on clicking start button to highlight it
    for (let i = 2; i < n; i++) {
        for (let j = 2; j < n; j++) {
            document.getElementById("p1t" + n + "_tile" + i + "" + j).style.border = "1.5px solid rgb(19, 18, 18)"
        }
    }
    //taking user name input
    p1userName = p1input.value;

    //taking time of start
    startTime = new Date().getTime();
    x = setInterval(p1timer, 1);

    //disabling name input and start button after starting the game
    p1input.disabled = true;
    p1start.disabled = true;

    //calling the function so the tiles can be swapped only after clicking start button
    tileSwap(1);
})

p2start.addEventListener('click', () => {
    count = 0;
    solution(2);

    //adding black border to center of nxn grid on clicking start button to highlight it
    for (let i = 2; i < n; i++) {
        for (let j = 2; j < n; j++) {
            document.getElementById("p2t" + n + "_tile" + i + "" + j).style.border = "1.5px solid rgb(19, 18, 18)";
        }
    }
    //taking user name input
    p2userName = p2input.value;

    //taking time of start
    startTime = new Date().getTime();
    y = setInterval(p2timer, 1);

    //disabling name input and start button after starting the game
    p2input.disabled = true;
    p2start.disabled = true;

    //calling the function so the tiles can be swapped only after clicking start button
    tileSwap(2);
})

difficulty.addEventListener('change', () => {
    gameStopInBetween();
    difficultyLevel = document.getElementById("difficulty").value;
    if (difficultyLevel === "easy") {
        n = 5;
        d = 1;
        grid((n - 2), d); //4
        grid(n, d); //6
        gridp2t1((n - 2))
        gridp2t2(n)
    }
    if (difficultyLevel === "medium") {
        n = 6;
        d = 3;
        grid((n - 2), d); //7
        grid(n, d); //9
        gridp2t1((n - 2))
        gridp2t2(n)
    }
    if (difficultyLevel === "hard") {
        n = 7;
        d = 5;
        grid((n - 2), d); //10
        grid(n, d); //12
        gridp2t1((n - 2))
        gridp2t2(n)
    }
    colorArrayFunction();
})

newgame.addEventListener('click', () => {
    gameStopInBetween();
    grid((n - 2), d); //10
    grid(n, d); //12
    gridp2t1((n - 2))
    gridp2t2(n)
    colorArrayFunction();
})

function gameStopInBetween() {
    //closing popup if new game button/difficulty level is changed is clicked after won
    popup.style.display = "none";
    document.getElementById("player1").classList.remove("disabled");
    document.getElementById("player2").classList.add("disabled");
    document.getElementById("p1won").classList.remove("wonMsg");
    document.getElementById("p2won").classList.add("wonMsg");
    document.getElementById("p1won").innerHTML = ""
    document.getElementById("p2won").innerHTML = "Wait for Player 1 to finish";

    //making all the color arrays filled again
    colorArrayFunction();
    colorsOfP2();

    //making the start button and input enable again
    p1start.disabled = false;
    p1input.disabled = false;

    //stoping the timer   
    clearInterval(x);
    clearInterval(y);

    //display the time to 0 again
    document.getElementById("p1timer").innerHTML = "Timer - 00:00:000"
    document.getElementById("p2timer").innerHTML = "Timer - 00:00:000"

    //display the move count 0 again
    count = 0;
    document.getElementById("p1moveCounter").innerHTML = "Move Count - " + count;
    document.getElementById("p2moveCounter").innerHTML = "Move Count - " + count;

    //removing the already formed tables
    document.getElementById("p1table" + n).remove();
    document.getElementById("p1table" + (n - 2)).remove();
    document.getElementById("p1table" + (n - 2) + "Div").remove();
    document.getElementById("p1table" + n + "Div").remove();
    document.getElementById("p2table" + n).remove();
    document.getElementById("p2table" + (n - 2)).remove();
    document.getElementById("p2table" + (n - 2) + "Div").remove();
    document.getElementById("p2table" + n + "Div").remove();
}

//Timer
function p1timer() {
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
    document.getElementById("p1timer").innerHTML = "Timer - " + minute + ":" + seconds + ":" + mSeconds;

    // if both the small grid and center grid of big grid matches, declare win
    if (smallGrid_randomArray.join() === bigGrid_centreArray.join()) {
        //score is only factor to decide the highscore and it is based on move count, less the move count - more the score - good highscore
        p1score = (1 / count);
        p1moveCount = count;
        p1timetaken = timetaken;

        setTimeout(() => {
            // console.log("won");
            clearInterval(x);
            document.getElementById("p1won").classList.add("wonMsg")
            document.getElementById("p2won").classList.remove("wonMsg")
            document.getElementById("p2won").innerHTML = ""
            document.getElementById("player1").classList.add("disabled")
            document.getElementById("player2").classList.remove("disabled")
            finishSound.play();
            document.getElementById("p1won").innerHTML = "Congrats " + p1userName + "! You finished! <br> Move Count: " + count + "<br> Time taken: " + (Math.floor(timetaken / 1000) + " seconds");
        }, 100)
    }
}


function p2timer() {
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
    document.getElementById("p2timer").innerHTML = "Timer - " + minute + ":" + seconds + ":" + mSeconds;

    if (smallGrid_randomArray.join() === bigGrid_centreArray.join()) {
        //score is only factor to decide the highscore and it is based on move count, less the move count - more the score - good highscore
        p2score = (1 / count);
        p2moveCount = count;
        p2timetaken = timetaken;

        setTimeout(() => {
            finishSound.play();
            // console.log("won");
            clearInterval(y);
            document.getElementById("p2won").classList.add("wonMsg")
            document.getElementById("player2").classList.add("disabled")
            document.getElementById("p2won").innerHTML = "Congrats " + p2userName + "! You won! <br> Move Count: " + count + "<br> Time taken: " + (Math.floor(timetaken / 1000) + " seconds");

            popup.style.display = "block";
            popupImg.src = "";
            close.classList.add("hide");
            caption.style.paddingTop = "150px";
            caption.style.textAlign = "center";
            if (p1score > p2score) {
                caption.innerHTML = "Player 1 Won!<br><br> Congrats " + p1userName + "! You won! <br> Move Count: " + p1moveCount + "<br> Time taken: " + (Math.floor(p1timetaken / 1000) + " seconds");
            } else if (p2score > p1score) {
                caption.innerHTML = "Player 2 Won!<br><br> Congrats " + p2userName + "! You won! <br> Move Count: " + p2moveCount + "<br> Time taken: " + (Math.floor(p2timetaken / 1000) + " seconds");
            }
            newgame.style.zIndex = "1";
        }, 100)
    }
}

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

//dark Mode
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