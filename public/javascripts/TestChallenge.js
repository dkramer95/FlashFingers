// This should be called to create a challenge text box with the 
// appropriate challenge text

// flag to determine if we're playing a challenge yet
var isPlaying = false;

// seconds into active game
var elapsedSeconds = 0;

// max allowed time for game play
var timeLimit = 60;

var challengeBox = createChallengeBox();
var raceTrack = createRaceTrack();

function createRaceTrack() {
	var raceTrack = new RaceTrack();
	raceTrack.raceCanvas.width = challengeBox.canvas.width;

	// add to document
	document.getElementById('challengeTextView').appendChild(raceTrack.raceCanvas);
	return raceTrack;
}

function playGame() {
	startTimer();
	raceTrack.draw();
}

function createChallengeBox() {
	var challengeBox = new ChallengeEntryBox(new TextStyle('Antic Slab', 40), 750, 50);
		challengeBox.colors({
			errorColor: "#F21",
			correctColor : "#3F7",
			bgColor : "#333",
		});

		window.addEventListener('keypress', function(e) {
			playGame();
			challengeBox.keyPressed(e);
		});
		
		window.addEventListener('keydown', function(e) {
			challengeBox.keyDown(e);
		});

		// window.addEventListener('resize', function(e) {
		// 	alert('resize');	
		// });
	
		// prevent key input from moving around browser window
		disableScrolling();	
		// create the textbox to hold the challenge text
		createChallengeTextBox(challengeBox);	

		return challengeBox;
}

function createChallengeTextBox(challengeBox) {
	var text = document.createElement("p");
	text.setAttribute('id', 'challengeText');
	text.innerHTML = challengeBox.challengeText;
	document.getElementById('challengeTextView').appendChild(challengeBox.canvas);
}


//TODO:: It is known that if window is resized, this breaks down because
// elements cannot be navigated around
//----------------------------------------------------------------------
//
// disables the page from scrolling, which is useful for this game
// because hitting some keys can cause unwanted scroll behavior
function disableScrolling() {
	var body = document.getElementsByTagName('body')[0];
	body.style.position = 'fixed';
	body.style.overflowY = 'scroll';
	body.style.width = '100%';
}

// setup the race track so that progress is correctly shown
function setupRaceTrack() {
	raceTrack.wordCount = challengeBox.words.length;
}

// starts the game timer if we are allowed to play (i.e. we haven't
// already played the current challenge).
function startTimer() {
	if (canPlay()) {
		isPlaying = true;	
		setupRaceTrack();

		// update timer (every second)
		var timer = setInterval(function() {
			update();	
			if (didWinGame() || didRunOutOfTime()) {
				clearInterval(timer);	
				resetGame();
			}
			++elapsedSeconds;
		}, 1000);
	}
}

// called by the timer, this updates all important game info
// every second
function update() {
	updateWPMCounter();
	updateProgress();
	updateTimer();
}

// updates the WPM indicator to the user
function updateWPMCounter() {
	var wpmCounter = document.getElementById("wpmCounter");
	var wpm = getWPM(elapsedSeconds);
	wpmCounter.innerHTML = "WPM: " + wpm;
}

// updates the progress indicator to the user
function updateProgress() {
	raceTrack.setProgress(challengeBox.correctWords);	
}

// updates the timer indicator to the user
function updateTimer() {
	var timerLabel = document.getElementById('timer').childNodes[0];
	var timeLeft = (timeLimit - elapsedSeconds);
	timerLabel.innerHTML = timeLeft;
}

// checks to see if we won the game, and if we did, renders
// the game over dialog to the screen
function didWinGame() {
	var didWin = false;
	if (challengeBox.words.length == 0) {
		var wpm = getWPM(elapsedSeconds);
		renderGameOver(wpm);
		didWin = true;
	}
	return didWin;
}

// Checks to see if we ran out of time, and if we did, renders
// the out of time dialog to the screen
function didRunOutOfTime() {
	var ranOut = false;
	if (elapsedSeconds >= timeLimit) {
		ranOut = true;	
		renderOutOfTime();
	}
	return ranOut;
}

// checks to see if we can play (i.e. haven't played / not playing already)
function canPlay() {
	var canPlay = (!isPlaying && challengeBox.words.length > 0);
	return canPlay;
}

// resets the game
function resetGame() {
	elapsedSeconds = 0;
	isPlaying = false;

	// remove words from challenge to prevent playing, after game is complete
	challengeBox.words = [];
}

// draws the overlay for running out of time
function renderOutOfTime() {
	var overlay = document.createElement("div");
	overlay.setAttribute('id', 'outOfTime');

	var header = document.createElement("h2");
	header.innerHTML = "You ran out of time!";
	overlay.appendChild(header);

	var button = createPlayAgainButton();
	overlay.appendChild(button);

	document.body.appendChild(overlay);
}

// draws the game over screen
function renderGameOver(wpm) {
	// container
	var overlay = document.createElement("div");
	overlay.setAttribute('id', 'gameOver');

	var header = document.createElement("h2");
	header.setAttribute('id', 'gameOverHeader');
	header.innerHTML = "Game Over!";
	overlay.appendChild(header);

	// results label
	var results = document.createElement("p");
	var resultMessage = getResultMessage(wpm);

	results.setAttribute('id', 'gameOverResults');
	results.innerHTML = "WPM: " + wpm + "<br> " + resultMessage;

	var button = createPlayAgainButton();
	overlay.appendChild(button);

	overlay.appendChild(results);
	document.body.appendChild(overlay);
}


// creates a play again button
function createPlayAgainButton() {
	var button = document.createElement("a");
	button.setAttribute('id', 'playAgainButton');
	button.setAttribute('href', '/playChallenge');
	button.innerHTML = "Play another challenge!";

	return button;
}

// gets a message based on the WPM measurement
function getResultMessage(wpm) {
	var msg = "";

	if (wpm >= 110) {
		msg = "Wow! Your fingers are flashy!";	
	} else if (wpm >= 80) {
		msg = "Good job! You're flying!";	
	} else if (wpm >= 60) {
		msg = "You're pretty fast!";	
	} else if (wpm >= 40) {
		msg = "Not too shabby!";	
	} else if (wpm >= 20) {
		msg = "You could improve a little!";	
	} else {
		msg = "You need to practice!!!";
	}
	return msg;
}

// calculates WPM
function getWPM(elapsedSeconds) {
	// protect against / by zero
	elapsedSeconds = (elapsedSeconds == 0) ? 1 : elapsedSeconds;

	var WPM = parseInt((challengeBox.correctWords * 60) / elapsedSeconds);
	return WPM;
}

