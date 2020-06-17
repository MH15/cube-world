function all () {
    //get canvas path and canvas 2d render context
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');


    //sphere character
    var sphere = {
        //TODO:stop a glitch where you can slide by all cubes if you don't move at the start
        //make better than this
        x: 199,
        y: 540,
        width: 40,
        height: 40,
        radius: 15,
        speed: 200,
        distMove: 40,
        color: '#393939',
        bgcolor: '#FFFFFF'
    };


    //Score and Stats
    var score = {
        dist: 0,
        row: 1,
        lives: 3,
        status: 'alive',
        isDead: false,
        isPaused: false,
        highscore: localStorage.getItem("highscore"),

        totalDist: localStorage.getItem("totalDist"),
        total: null,
        current: null,

        gamesPlayed: localStorage.getItem("gamesPlayed"), 
        gameCounter: null,

        countAmount: 1.8,
        //Cube Counter
        cubeCounter: 0,
    };
    var chromeScore = {
        boxX: 10,
        boxY: 10,
        x: 50,
        y: 50,
        width: 80,
        height: 60,
        font: '25pt Arial',
        textColor: 'black',
        align: 'center',
        textBaseline: 'center',
        message: score.dist + 'm',
        fill: 'rgb(150, 28, 135)'
    }
    var chromeLives = {
        boxX: 10,
        boxY: 80,
        x: 50,
        y: 102,
        width: 80,
        height: 30,
        font: '15pt Arial',
        textColor: 'black',
        align: 'center',
        textBaseline: 'center',
        message: score.lives + ' lives',
        fill: 'rgb(150, 28, 135)'
    }
    var looseMenu = {
        boxX: 0,
        boxY: 200,

        width: 400,
        height: 120,
        textColor: 'black',
        align: 'center',

        //messageLost: ,
        messageAgain: 'tap here to continue',

        textLostX: 200,
        textLostY: 241,
        baselineLost: 'center',
        fontLost: '30pt Arial',

        textAgainX: 200,
        textAgainY: 285,
        baselineAgain: 'center',
        fontAgain: '15pt Arial',

        fill: 'rgb(150, 28, 135)',
    }

    var youLost = {
        message0: "try again?",
        message1: "HAAA!",
        message2: "game over",
        message3: "da da da...",
        message4: "you loose",
    }

    var pausedMenu = {
        boxX: 0,
        boxY: 200,
        width: 400,
        height: 100,
        textColor: 'black',
        align: 'center',
        baseline: 'center',
        messagePaused: 'Paused',
        messageContinue: 'tap here to continue',
        fontPaused: '30pt Arial',
        fontContinue: '15pt Arial',
        textX: 200,
        textY: 241,
        textContinueY: 285,
        fill: 'rgb(150, 28, 135)',
    }

    //cubes data
    var cubes = {
        //All Cubes
        y1Counter1: 250,
        y1Counter2: 100,
        y1Counter3: -50,
        y1Counter4: -200,
        y1Counter5: -350,
        y1Counter6: -500,

        y2Counter1: -650,
        y2Counter2: -800,
        y2Counter3: -950,
        y2Counter4: -1100,
        y2Counter5: -1250,
        y2Counter6: -1400,

        width: 40,
        height: 40,
        perRow: 5,
        rowCount: 1,
        totalRows: 14,
    }
    //individual cubes
    //no set value: filled by function makeValueX() below
    var cubeDataX = {

    }

    
    //TODO: set random cube generator for endless and level play
    //make shorter than vs.0.1
    function makeValueX(perRow, rowCount, totalRows) {
        //decide whether to keep making cubes or not,
        //if player hasn't beat the high score keep generating cubes

        //check for row
        while (rowCount < totalRows) {
            //if generater hasn't made 5 cubes yet
            //check for cubes
            while (perRow > 0) {
                //create a variable
                indexString = 'row' + rowCount + 'x' + perRow;
                //alert(indexString);
                //set the variable to the random value * 40
                cubeDataX[indexString] = (Math.floor((Math.random() * 10))) * 40;
                //alert(cubeDataX[indexString]);
                //tell the while loop that we have one less left
                perRow = perRow - 1;
            }
            perRow = 5;
            rowCount = rowCount + 1;
        }

        //Test
        //TODO: link to render function
        //COMPLETED: linked to render function
        //TODO: recomment once I test the lives engine
        //alert(cubeDataX.row1x4);
        //alert(cubeDataX.row1x3);
        //alert(cubeDataX.row1x2);
        //alert(cubeDataX.row1x1);
        //alert(cubeDataX.row2x4);
        //alert(cubeDataX.row2x3);
        //alert(cubeDataX.row2x2);
        //alert(cubeDataX.row2x1);
    }

    //compute random X values
    makeValueX(cubes.perRow, cubes.rowCount, cubes.totalRows);
    //makeValueX(5, 1, 7);

    //Get Key Codes
    var keysDown = {};
    window.addEventListener('keydown', function (e) {
        keysDown[e.keyCode] = true;
    });
    window.addEventListener('keyup', function (e) {
        delete keysDown[e.keyCode];
    });

    //move shapes and find keys
    function update(mod) {
        if (score.isDead == false) {
            if (score.isPaused == false) {
                //left arrow
                if (37 in keysDown) {
                    sphere.x -= sphere.speed * mod;
                }
                //up arrow
                if (38 in keysDown) {
                    sphere.y -= sphere.speed * mod;
                }
                //right arrow
                if (39 in keysDown) {
                    sphere.x += sphere.speed * mod;
                }
                //down arrow
                if (40 in keysDown) {
                    sphere.y += sphere.speed * mod;
                        
                }
            }
        }
        

        //keep the sphere on the screen
        //TODO: maybe move in one pixel to fix a hack where you can slide by on the left or right
        //edge without dying

        //right
        if (sphere.x > 400) {
            sphere.x = 400;
        }
        //left
        if (sphere.x < 0) {
            sphere.x = 0;
        }
        //bottom
        if (sphere.y > 600) {
            sphere.y = 600;
        }
        //top
        if (sphere.y < 0) {
            sphere.y = 0;
        }


    }

    //TODO: finish
    var rowCounter;
    function checkIfDead(currentRow, totalRows, perRow) {

        //check if the sphere is touching any cubes
        var currentRow;
        var toleranceBuffer;
        //y set 1
        if (
            cubes.y1Counter1 > (sphere.y - 100) &&
            cubes.y1Counter1 < (sphere.y + 40)
            ) {
                currentRow = "y1Counter1";

        }
        if (
            cubes.y1Counter2 > (sphere.y - 100) &&
            cubes.y1Counter2 < (sphere.y + 40)
            ) {
                currentRow = "y1Counter2";
//
        } 
//
        if (
            cubes.y1Counter3 > (sphere.y - 100) &&
            cubes.y1Counter3 < (sphere.y + 40)
            ) {
                currentRow = "y1Counter3";
//
        }
        if (
            cubes.y1Counter4 > (sphere.y - 100) &&
            cubes.y1Counter4 < (sphere.y + 40)
            ) {
                currentRow = "y1Counter4";
//
        }
        if (
            cubes.y1Counter5 > (sphere.y - 100) &&
            cubes.y1Counter5 < (sphere.y + 40)
            ) {
                currentRow = "y1Counter5";
//
        }
        if (
            cubes.y1Counter6 > (sphere.y - 100) &&
            cubes.y1Counter6 < (sphere.y + 40)
            ) {
                currentRow = "y1Counter6";
//
        }
//
        //y set 2
        if (
            cubes.y2Counter1 > (sphere.y - 100) &&
            cubes.y2Counter1 < (sphere.y + 40)
            ) {
                currentRow = "y2Counter1";
                //sphere.bgcolor = "green";
                //FIX: improve this test spot
//
        }
        if (
            cubes.y2Counter2 > (sphere.y - 100) &&
            cubes.y2Counter2 < (sphere.y + 40)
            ) {
                currentRow = "y2Counter2";
//
        } 
//
        if (
            cubes.y2Counter3 > (sphere.y - 100) &&
            cubes.y2Counter3 < (sphere.y + 40)
            ) {
                currentRow = "y2Counter3";
//
        }
        if (
            cubes.y2Counter4 > (sphere.y - 100) &&
            cubes.y2Counter4 < (sphere.y + 40)
            ) {
                currentRow = "y2Counter4";
//
        }
        if (
            cubes.y2Counter5 > (sphere.y - 100) &&
            cubes.y2Counter5 < (sphere.y + 40)
            ) {
                currentRow = "y2Counter5";
//
        }
        if (
            cubes.y2Counter6 > (sphere.y - 100) &&
            cubes.y2Counter6 < (sphere.y + 40)
            ) {
                currentRow = "y2Counter6";
//
        }
        var rowsForCubes;
        switch (currentRow) {
            case "y1Counter1":
                rowsForCubes = 1;
                break;
            case "y1Counter2":
                rowsForCubes = 2;
                break;
            case "y1Counter3":
                rowsForCubes = 3;
                break;
            case "y1Counter4":
                rowsForCubes = 4;
                break;
            case "y1Counter5":
                rowsForCubes = 5;
                break;
            case "y1Counter6":
                rowsForCubes = 6;
                break;
            case "y2Counter1":
                rowsForCubes = 7;
                break;
            case "y2Counter2":
                rowsForCubes = 8;
                break;
            case "y2Counter3":
                rowsForCubes = 9;
                break;
            case "y2Counter4":
                rowsForCubes = 10;
                break;
            case "y2Counter5":
                rowsForCubes = 11;
                break;
            case "y2Counter6":
                rowsForCubes = 12;
                break;
            default:
                break;
        }
        //tolerance to account for the circular shape of the sphere duh and
        //to make it just a little easier to play
        toleranceBuffer = 3;

        if (
            //first row: need to check for multiple rows in case the user moves the sphere all over
            //TODO: fix and assemble multiple rows
            (
                //check if in the row
                sphere.y + (sphere.radius - toleranceBuffer) > cubes[currentRow] &&
                (sphere.y - (sphere.radius - toleranceBuffer)) < (cubes[currentRow] + 40) &&

                //x values test
                (
                    //cube row1x5
                    sphere.x + (sphere.radius - toleranceBuffer) > cubeDataX["row" + rowsForCubes + "x5"] &&
                    (sphere.x - (sphere.radius - toleranceBuffer)) < (cubeDataX["row" + rowsForCubes + "x5"] + 40)
                    ||

                    //cube row1x4
                    sphere.x + (sphere.radius - toleranceBuffer) > cubeDataX["row" + rowsForCubes + "x4"] &&
                    (sphere.x - (sphere.radius - toleranceBuffer)) < (cubeDataX["row" + rowsForCubes + "x4"] + 40)
                    ||

                    //cube row1x3
                    sphere.x + (sphere.radius - toleranceBuffer) > cubeDataX["row" + rowsForCubes + "x3"] &&
                    (sphere.x - (sphere.radius - toleranceBuffer)) < (cubeDataX["row" + rowsForCubes + "x3"] + 40)
                    ||

                    //cube row1x2
                    sphere.x + (sphere.radius - toleranceBuffer) > cubeDataX["row" + rowsForCubes + "x2"] &&
                    (sphere.x - (sphere.radius - toleranceBuffer)) < (cubeDataX["row" + rowsForCubes + "x2"] + 40)
                    ||

                    //cube row1x1
                    sphere.x + (sphere.radius - toleranceBuffer) > cubeDataX["row" + rowsForCubes + "x1"] &&
                    (sphere.x - (sphere.radius - toleranceBuffer)) < (cubeDataX["row" + rowsForCubes + "x1"] + 40)

                )

            )
            //end second row
        ) { 
            
            sphere.bgcolor = 'red';
            score.status = "dead";
            score.isDead = true;
            //TODO:make a better way to not subtract lives like crazy
            //var touch = false;
//
            ////setTimeout(function() {
            //    touch = true;
            //    console.log(touch);
            ////}, 1000);
            //console.log(touch);
//
            //if (touch == true) {
            //    setTimeout(function() {
            //        
            //    }, 1000)
            //    
            //}

            //score.lives = score.lives - 1;


            //tell the main loop if the player is out of lives
            //if (score.lives <= 0) {
            //    score.status = 'dead';
            //}

            //change background color back to whiter
            setTimeout(function() {
                if (sphere.bgcolor == 'red') {
                    sphere.bgcolor = "#FFFFFF";
                }
            }, 100);

        }
        currentRow++;

        
    }
    //TODO: link to render function
    //Clear the screen for flicker rate
    function clearCanvas() {
        //begin rendering the character
        context.fillStyle = sphere.bgcolor;
        //clear the background
        context.fillRect(0,0,400,800);
    }

    function renderCharacter() {
        //draw the circle player
        context.fillStyle = sphere.color;  

        context.beginPath();
        context.arc(sphere.x, sphere.y, sphere.radius, 0, 2 * Math.PI);
        context.fill();
    }

    //TODO: finish randomness
    function renderCubes() {
        context.fillStyle = 'black';

        //TODO: make for all rows in another external while loop
        //draw the row in a while loop
        while (cubes.perRow > 0) {
            var drawString = "row1" + "x" + cubes.perRow;

            context.fillRect(cubeDataX[indexString], cubes.y1Counter, 40, 40);

            cubes.perRow = cubes.perRow - 1;

            //alert('after subtract=' + cubes.perRow);
            //alert(drawString + "= " + cubeDataX.row1x5);

            //alert('completed loop')
        }

        //if (cubes.y1Counter6 > 600 || cubes.y2Counter1 > 600) {
//
        //}

        if (cubes.y1Counter6 > 600) {
            cubes.y1Counter1 = cubes.y1Counter1 - 1800;
            cubes.y1Counter2 = cubes.y1Counter2 - 1800;
            cubes.y1Counter3 = cubes.y1Counter3 - 1800;
            cubes.y1Counter4 = cubes.y1Counter4 - 1800;
            cubes.y1Counter5 = cubes.y1Counter5 - 1800;
            cubes.y1Counter6 = cubes.y1Counter6 - 1800;
        }
        //first set-
        //refreshes after the second set runs
        context.fillRect(cubeDataX.row1x5, cubes.y1Counter1, 40, 40);
        context.fillRect(cubeDataX.row1x4, cubes.y1Counter1, 40, 40);
        context.fillRect(cubeDataX.row1x3, cubes.y1Counter1, 40, 40);
        context.fillRect(cubeDataX.row1x2, cubes.y1Counter1, 40, 40);
        context.fillRect(cubeDataX.row1x1, cubes.y1Counter1, 40, 40);

        context.fillRect(cubeDataX.row2x5, cubes.y1Counter2, 40, 40);
        context.fillRect(cubeDataX.row2x4, cubes.y1Counter2, 40, 40);
        context.fillRect(cubeDataX.row2x3, cubes.y1Counter2, 40, 40);
        context.fillRect(cubeDataX.row2x2, cubes.y1Counter2, 40, 40);
        context.fillRect(cubeDataX.row2x1, cubes.y1Counter2, 40, 40);

        context.fillRect(cubeDataX.row3x5, cubes.y1Counter3, 40, 40);
        context.fillRect(cubeDataX.row3x4, cubes.y1Counter3, 40, 40);
        context.fillRect(cubeDataX.row3x3, cubes.y1Counter3, 40, 40);
        context.fillRect(cubeDataX.row3x2, cubes.y1Counter3, 40, 40);
        context.fillRect(cubeDataX.row3x1, cubes.y1Counter3, 40, 40);

        context.fillRect(cubeDataX.row4x5, cubes.y1Counter4, 40, 40);
        context.fillRect(cubeDataX.row4x4, cubes.y1Counter4, 40, 40);
        context.fillRect(cubeDataX.row4x3, cubes.y1Counter4, 40, 40);
        context.fillRect(cubeDataX.row4x2, cubes.y1Counter4, 40, 40);
        context.fillRect(cubeDataX.row4x1, cubes.y1Counter4, 40, 40);

        context.fillRect(cubeDataX.row5x5, cubes.y1Counter5, 40, 40);
        context.fillRect(cubeDataX.row5x4, cubes.y1Counter5, 40, 40);
        context.fillRect(cubeDataX.row5x3, cubes.y1Counter5, 40, 40);
        context.fillRect(cubeDataX.row5x2, cubes.y1Counter5, 40, 40);
        context.fillRect(cubeDataX.row5x1, cubes.y1Counter5, 40, 40);

        context.fillRect(cubeDataX.row6x5, cubes.y1Counter6, 40, 40);
        context.fillRect(cubeDataX.row6x4, cubes.y1Counter6, 40, 40);
        context.fillRect(cubeDataX.row6x3, cubes.y1Counter6, 40, 40);
        context.fillRect(cubeDataX.row6x2, cubes.y1Counter6, 40, 40);
        context.fillRect(cubeDataX.row6x1, cubes.y1Counter6, 40, 40);

        if (cubes.y2Counter6 > 600) {
            cubes.y2Counter1 = cubes.y2Counter1 - 1800;
            cubes.y2Counter2 = cubes.y2Counter2 - 1800;
            cubes.y2Counter3 = cubes.y2Counter3 - 1800;
            cubes.y2Counter4 = cubes.y2Counter4 - 1800;
            cubes.y2Counter5 = cubes.y2Counter5 - 1800;
            cubes.y2Counter6 = cubes.y2Counter6 - 1800;
        }
        //second set-
        //loads after the first set runs
        context.fillRect(cubeDataX.row7x5, cubes.y2Counter1, 40, 40);
        context.fillRect(cubeDataX.row7x4, cubes.y2Counter1, 40, 40);
        context.fillRect(cubeDataX.row7x3, cubes.y2Counter1, 40, 40);
        context.fillRect(cubeDataX.row7x2, cubes.y2Counter1, 40, 40);
        context.fillRect(cubeDataX.row7x1, cubes.y2Counter1, 40, 40);

        context.fillRect(cubeDataX.row8x5, cubes.y2Counter2, 40, 40);
        context.fillRect(cubeDataX.row8x4, cubes.y2Counter2, 40, 40);
        context.fillRect(cubeDataX.row8x3, cubes.y2Counter2, 40, 40);
        context.fillRect(cubeDataX.row8x2, cubes.y2Counter2, 40, 40);
        context.fillRect(cubeDataX.row8x1, cubes.y2Counter2, 40, 40);

        context.fillRect(cubeDataX.row9x5, cubes.y2Counter3, 40, 40);
        context.fillRect(cubeDataX.row9x4, cubes.y2Counter3, 40, 40);
        context.fillRect(cubeDataX.row9x3, cubes.y2Counter3, 40, 40);
        context.fillRect(cubeDataX.row9x2, cubes.y2Counter3, 40, 40);
        context.fillRect(cubeDataX.row9x1, cubes.y2Counter3, 40, 40);

        context.fillRect(cubeDataX.row10x5, cubes.y2Counter4, 40, 40);
        context.fillRect(cubeDataX.row10x4, cubes.y2Counter4, 40, 40);
        context.fillRect(cubeDataX.row10x3, cubes.y2Counter4, 40, 40);
        context.fillRect(cubeDataX.row10x2, cubes.y2Counter4, 40, 40);
        context.fillRect(cubeDataX.row10x1, cubes.y2Counter4, 40, 40);

        context.fillRect(cubeDataX.row11x5, cubes.y2Counter5, 40, 40);
        context.fillRect(cubeDataX.row11x4, cubes.y2Counter5, 40, 40);
        context.fillRect(cubeDataX.row11x3, cubes.y2Counter5, 40, 40);
        context.fillRect(cubeDataX.row11x2, cubes.y2Counter5, 40, 40);
        context.fillRect(cubeDataX.row11x1, cubes.y2Counter5, 40, 40);

        context.fillRect(cubeDataX.row12x5, cubes.y2Counter6, 40, 40);
        context.fillRect(cubeDataX.row12x4, cubes.y2Counter6, 40, 40);
        context.fillRect(cubeDataX.row12x3, cubes.y2Counter6, 40, 40);
        context.fillRect(cubeDataX.row12x2, cubes.y2Counter6, 40, 40);
        context.fillRect(cubeDataX.row12x1, cubes.y2Counter6, 40, 40);


        //second pass
        //took out because it flickered and lagged
        //TODO:fix
        //var dist = document.getElementById('dist').innerHTML = "score.dist = " + Math.floor(score.dist/100);

        //var y1y1 = document.getElementById('y1y1').innerHTML = Math.floor(cubes.y1Counter1 / 100);
        //var y1y2 = document.getElementById('y1y2').innerHTML = Math.floor(cubes.y1Counter2 / 100);
        //var y1y3 = document.getElementById('y1y3').innerHTML = Math.floor(cubes.y1Counter3 / 100);
        //var y1y4 = document.getElementById('y1y4').innerHTML = Math.floor(cubes.y1Counter4 / 100);
        //var y1y5 = document.getElementById('y1y5').innerHTML = Math.floor(cubes.y1Counter5 / 100);
        //var y1y6 = document.getElementById('y1y6').innerHTML = Math.floor(cubes.y1Counter6 / 100);

        //var y2y1 = document.getElementById('y2y1').innerHTML = Math.floor(cubes.y2Counter1 / 100);
        //var y2y2 = document.getElementById('y2y2').innerHTML = Math.floor(cubes.y2Counter2 / 100);
        //var y2y3 = document.getElementById('y2y3').innerHTML = Math.floor(cubes.y2Counter3 / 100);
        //var y2y4 = document.getElementById('y2y4').innerHTML = Math.floor(cubes.y2Counter4 / 100);
        //var y2y5 = document.getElementById('y2y5').innerHTML = Math.floor(cubes.y2Counter5 / 100);
        //var y2y6 = document.getElementById('y2y6').innerHTML = Math.floor(cubes.y2Counter6 / 100);
        
    }

    function renderScoreChrome() {
        context.fillStyle = chromeScore.fill;

        if (Math.floor(score.dist/50) >= 100) {
            chromeScore.width = 100;
            chromeScore.x = 60;
            chromeLives.width = 100;
            chromeLives.x = 60;
        } 
        if (Math.floor(score.dist/50) >= 1000) {
            chromeScore.width = 120;
            chromeScore.x = 70;
            chromeLives.width = 120;
            chromeLives.x = 70;
        }

        context.fillRect(chromeScore.boxX, chromeScore.boxY, chromeScore.width, chromeScore.height)

        context.fillStyle = chromeScore.textColor;
        context.font = chromeScore.font;
        context.textAlign = chromeScore.align;
        context.textBaseline = chromeScore.textBaseline;
        context.fillText(Math.floor(score.dist/50) + "m", chromeScore.x, chromeScore.y)
        //static score render
        //context.fillText("0m", chromeScore.x, chromeScore.y)
        //or this:
        //Math.floor(cubes.y1Counter1/100) + "m"
    }
    function renderLivesChrome() {
        context.fillStyle = chromeScore.fill;
        context.fillRect(chromeLives.boxX, chromeLives.boxY, chromeLives.width, chromeLives.height)

        context.fillStyle = chromeLives.textColor;
        context.font = chromeLives.font;
        context.textAlign = chromeLives.align;
        context.textBaseline = chromeLives.textBaseline;
        context.fillText(score.status, chromeLives.x, chromeLives.y)
        //context.fillText(score.lives + " lives", chromeLives.x, chromeLives.y);
        //static lives render
        //context.fillText("3 lives", chromeLives.x, chromeLives.y)
    }
    var randomMessageID = (Math.floor((Math.random() * 4)));
    //interactive sliding pause menu

    var highscoreContainer = document.getElementById('highscore').innerHTML = score.highscore;
    //testing only: document.getElementById("total").innerHTML = localStorage.getItem("totalDist");

    function deadSequence () {
        if (score.isDead == true) {
            context.fillStyle = looseMenu.fill;
            context.fillRect(looseMenu.boxX, looseMenu.boxY, looseMenu.width, looseMenu.height)

            context.fillStyle = looseMenu.textColor;
            context.textAlign = looseMenu.align;

            context.font = looseMenu.fontLost;
            context.textBaseline = looseMenu.baselineLost;

            if (Math.floor(score.dist/50) > score.highscore) {
                var curMessage = "that's a new highscore";
            } else {
                var curMessage = youLost["message" + randomMessageID];
            }

            context.fillText(curMessage, looseMenu.textLostX, looseMenu.textLostY);

            context.font = looseMenu.fontAgain;
            context.textBaseline = looseMenu.baselineLost;
            context.fillText(looseMenu.messageAgain, looseMenu.textAgainX, looseMenu.textAgainY);

            //score.isPaused = true;

            //TODO: add a listener for enter key press to play again
            //maybe something like this
            //if (12 in keysDown) {
            //        score.isPaused=true;
            //            
            //}

            //set and update high score
            //TODO: Fixxxx!!!!
            //document.cookie(value="abc", expires="12/29/2999");
            //console.log(document.cookie);

            document.getElementById('canvas').onclick = function () {
                score.isDead = false;
                var counter = 1;

               // if (!localStorage.getItem("timesDead")) {
               //     score.deadCounter = localStorage.getItem("timesDead");
               //     alert(score.deadCounter);
               //     score.deadCounter = score.deadCounter + counter;
               //     alert(score.deadCounter);
               //     localStorage.setItem("timesDead", score.deadCounter);
////
               // } else {
               //     localStorage.setItem("timesDead", 1);
               //     score.deadCounter = localStorage.getItem("timesDead");
               //     alert(score.deadCounter);
               // }

                //total distance traveled
                score.current = Math.floor(score.dist / 50);
                score.totalDist = localStorage.getItem("totalDist");

                score.totalDist = Number(score.totalDist);
                score.totalDist = score.current + score.totalDist;
                var test = score.totalDist;
                test.toString();
                localStorage.setItem("totalDist", test);

                //total games played
                //score.current = Math.floor(score.dist / 50);
                score.gamesPlayed = localStorage.getItem("gamesPlayed");

                score.gamesPlayed = Number(score.gamesPlayed);
                score.gamesPlayed++;
                var test2 = score.gamesPlayed;
                test2.toString();
                localStorage.setItem("gamesPlayed", test2);

                //alert(localStorage.getItem("totalDist"));

               //console.log(score.isDead);

               //if ((score.totalDist).isNaN() = -1) {
                //alert("fail");
               //}
               location.reload();
            }

            if ((Math.floor(score.dist/50)) > score.highscore) {
                score.highscore = Math.floor(score.dist / 50);
                localStorage.setItem("highscore", score.highscore);
                //document.getElementById('highscore').innerHTML = getItem("highscore");
            }

            //localStorage.setItem("exampleItem", "This is a great example.");

            //localStorage.removeItem("highscore");
            //localStorage.removeItem("totalDist");
            //localStorage.removeItem("gamesPlayed");
        }

        
        //static lives render
        //context.fillText("3 lives", chromeLives.x, chromeLives.y)
    }

    function pauseSequence () {
        //get button
        var pauseButton = document.getElementById('pause');

        //tell the game it's paused
        pauseButton.onclick = function () {
            score.isPaused = true; 
        }

        if (score.isPaused == true) {
            context.fillStyle = pausedMenu.fill;
            context.fillRect(pausedMenu.boxX, pausedMenu.boxY, pausedMenu.width, pausedMenu.height)

            context.fillStyle = pausedMenu.textColor;
            context.textAlign = pausedMenu.align;

            //draw the heading
            context.font = pausedMenu.fontPaused;
            context.textBaseline = pausedMenu.baseline;
            
            context.fillText(pausedMenu.messagePaused, pausedMenu.textX, pausedMenu.textY);

            //draw "keep going" message
            context.font = pausedMenu.fontContinue;
            context.textBaseline = pausedMenu.baseline;

            context.fillText(pausedMenu.messageContinue, pausedMenu.textX, pausedMenu.textContinueY);
        }

        var keepGoing = document.getElementById("keepGoing");
        keepGoing.onclick = function () {
            score.isPaused = false;
        }

    }

    

    //all render functions
    function renderAll () {
        //render game
        renderCharacter();
        renderCubes();
        renderScoreChrome();
        renderLivesChrome();
        deadSequence();
        pauseSequence();
    }

    function updateY () {
        //TODO: fix and assemble a pause button
       
 
        
        //TODO: FIXXXXX!
        if (score.isDead == false) {
            if (score.isPaused == false) {
                cubes.y1Counter1 = cubes.y1Counter1 + score.countAmount;
                cubes.y1Counter2 = cubes.y1Counter2 + score.countAmount;
                cubes.y1Counter3 = cubes.y1Counter3 + score.countAmount;
                cubes.y1Counter4 = cubes.y1Counter4 + score.countAmount;
                cubes.y1Counter5 = cubes.y1Counter5 + score.countAmount;
                cubes.y1Counter6 = cubes.y1Counter6 + score.countAmount;
    ////
                cubes.y2Counter1 = cubes.y2Counter1 + score.countAmount;
                cubes.y2Counter2 = cubes.y2Counter2 + score.countAmount;
                cubes.y2Counter3 = cubes.y2Counter3 + score.countAmount;
                cubes.y2Counter4 = cubes.y2Counter4 + score.countAmount;
                cubes.y2Counter5 = cubes.y2Counter5 + score.countAmount;
                cubes.y2Counter6 = cubes.y2Counter6 + score.countAmount;
    //
                score.dist = score.dist + score.countAmount;
            }
            
        }
        //TODO: make get faster as you go on, use something like this
        score.countAmount = score.countAmount + 0.0005;
//
        if (score.countAmount > 3.0) {
            score.countAmount = 3.0;
        }
        //document.getElementById("countAmountCont").innerHTML = score.countAmount;
        //Uncoment once I get the random cube generator right
    }

    //Put it all together
    function run () {
        //set game speed
        update((Date.now() - time) / 1000);
        
        updateY();
        //check if the sphere is touching a cube
        checkIfDead(cubes.rowCount, cubes.totalRows, cubes.perRow);
        clearCanvas();
        
        //calls a collection of various render functions
        renderAll();

        //TODO: remove once tested
        //context.fillStyle = 'blue';
        //context.fillRect(cubeDataX.row1x4, cubes.yCounter, 40, 40);
        //reset clock
        time = Date.now();
    }

    var time = Date.now();
    setInterval(run, 10);
};

window.onload = function(){
    all();
}
