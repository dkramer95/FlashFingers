// This should be called to create a challenge text box with the 
// appropriate challenge text

// flag to determine if we're playing a challenge yet
var isPlaying = false;

// seconds into active game
var elapsedSeconds = 0;

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

// starts the game timer and keeps track of the WPM of the current challenge
function startTimer() {
	if (!isPlaying && challengeBox.words.length > 0) {
		isPlaying = true;
		raceTrack.wordCount = challengeBox.words.length;
		var timer = setInterval(function() {
			++elapsedSeconds;

			// calculate words completed
			var wpmCounter = document.getElementById("wpmCounter");
			var wpm = getWPM(elapsedSeconds);
			wpmCounter.innerHTML = "WPM: " + wpm;

			updateProgress();

			if (challengeBox.words.length == 0) {
				clearInterval(timer);
				renderGameOver(wpm);
				elapsedSeconds = 0;
				isPlaying = false;
			}
		}, 1000);
	}
}

function updateProgress() {
	raceTrack.setProgress(challengeBox.correctWords);	
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

	var button = document.createElement("a");
	button.setAttribute('id', 'playAgainButton');
	button.setAttribute('href', '/playChallenge');
	button.innerHTML = "Play another challenge!";
	overlay.appendChild(button);

	overlay.appendChild(results);
	document.body.appendChild(overlay);
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
	var WPM = parseInt((challengeBox.correctWords * 60) / elapsedSeconds);
	return WPM;
}

