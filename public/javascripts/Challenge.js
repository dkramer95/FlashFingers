var scriptsLoaded = 0;
var challenge = null;

// loads all required scripts needed for the game
function loadScripts() {
    var scripts = ['ChallengeEntry', 'Animate', 'Timer', 'RaceTrack'];
    scripts.forEach(function(s) {
        var script = document.createElement('script');
        script.src = 'javascripts/' + s + '.js';
        document.head.appendChild(script);

		// make sure all required scripts are loaded before we
		// create the challenge
		script.onload = function() {
			++scriptsLoaded;

			if (scriptsLoaded == scripts.length) {
				challenge = new Challenge(text);	
			}
		}
    });
}

// load scripts when window loads
window.onload = function() {
	loadScripts();
	console.log('scripts loaded..');
}

// instance of this challenge
var instance = null;

// Creates a new challenge
function Challenge(text) {
	console.log('creating challenge: ' + text);
    instance = this,
	this.originalText = text,
	this.isPlaying = false,
    
    // are we ready to play?
    this.isReady = false,
	
    // seconds into active game
	this.elapsedSeconds = false,

    // max allowed time limit
	this.timeLimit = 60,
    this.timeRemaining = this.timeLimit,
    this.container = document.getElementById('challengeContainer'),
    this.timer = this.createTimerView(),
    this.wpmCounter = this.createWPMCounter(),
    this.challengeBox = this.createChallengeBox(),
	this.raceTrack = this.createRaceTrack(),
    this.textView = this.createTextView(),
    this.startIndex = 0,
    this.endIndex = 0,
    
    this.canPlay = true,
        
    // finish up
    this.initBeginState();

	console.log('challenge instance created');
}

// starting key listener to beginn game play
var beginKeyListener = function(e) {
    if (e.keyCode == 32) {
        var header = document.getElementById('beginTypingHeader');
        header.style.display = "none";
        
        instance.beginPlay();
    }
}

// initializes the very beginning state of the game prior
// to playing the actual game
Challenge.prototype.initBeginState = function() {
    var challenge = this;
    challenge.hideElements();
    window.addEventListener('keypress', beginKeyListener);
}

// begins game play
Challenge.prototype.beginPlay = function() {
    window.removeEventListener('keypress', beginKeyListener);
    this.timer.draw();
    this.initView();
    this.initControls();
    this.start();
}

// hides all game elements
Challenge.prototype.hideElements = function() {
    var elementsToHide = [this.timer.timerCanvas, this.textView, this.wpmCounter];
    elementsToHide.forEach(function(el) {
        el.style.visibility = "hidden";
    })
}

Challenge.prototype.createWPMCounter = function() {
    var wpmCounter = document.createElement('h2');
    wpmCounter.setAttribute('id', 'wpmCounter');
    wpmCounter.innerHTML = "WPM:  ";
    wpmCounter.style.visibility = "visible";
    this.append(wpmCounter);
    return wpmCounter;
}

Challenge.prototype.start = function() {
    var challenge = this;
    if (!challenge.canPlay) { return; }
    
    challenge.updateWordIndicator();
    var timer = setInterval(function() {
        console.log('timer tick');
        challenge.update();
        if (challenge.didWinGame() || challenge.ranOutOfTime()) {
            clearInterval(timer);
            timer = null;
            challenge.canPlay = false;
            challenge.clearGame();
        } else {
            challenge.timerTick();
        }
    }, 1000);
}

Challenge.prototype.clearGame = function() {
    this.elapsedSeconds = 0;
    this.isPlaying = false;
    
    this.challengeBox.words = [];
}

// Called every second to update timer stuff
Challenge.prototype.timerTick = function() {
    this.timeRemaining--;
    this.elapsedSeconds++;
    this.timer.update(this.timeRemaining);
}

Challenge.prototype.didWinGame = function() {
    var didWin = false;
	if (this.challengeBox.words.length == 0) {
		var wpm = this.getWPM(this.elapsedSeconds);
		renderGameOver(wpm);
		didWin = true;
	}
	return didWin;
}

Challenge.prototype.ranOutOfTime = function() {
    var ranOut = false;
	if (this.elapsedSeconds >= this.timeLimit) {
		ranOut = true;	
		renderOutOfTime();
	}
	return ranOut;
}

Challenge.prototype.updateWPMCounter = function() {
    var wpm = this.getWPM();
    this.wpmCounter.innerHTML = "WPM: " + wpm;
}

// initializes the view of this challenge 
Challenge.prototype.initView = function() {    
    var animation = new Animation([this.timer.timerCanvas, this.textView, this.wpmCounter]);
    animation.fadeIn(1000);
}

Challenge.prototype.initControls = function() {
	var challenge = this;
	window.addEventListener('keypress', function(e) {
		challenge.challengeBox.keyPressed(e);
	});

	window.addEventListener('keydown', function(e) {
		challenge.challengeBox.keyDown(e);
	});
    console.log('listeners added');
}

Challenge.prototype.update = function() {
    var challenge = this;
    challenge.raceTrack.setProgress(challenge.challengeBox.correctWords);
    challenge.raceTrack.draw();
    challenge.updateWPMCounter();
}

Challenge.prototype.madeProgress = function() {
    var madeProgress = (this.challengeBox.correctWords > this.raceTrack.progress);
    return madeProgress;
}

Challenge.prototype.updateWordIndicator = function() {
    var curWord = this.challengeBox.currentWord();
    var text = this.getHighlightedString(this.originalText, curWord);
    
    var textElement = this.textView.firstChild;
    
    textElement.innerHTML = text;
    
    // these elements disappear for some reason, so we have to re-append them
    // every time we update text
    textElement.appendChild(this.challengeBox.canvas);
    textElement.appendChild(this.raceTrack.raceCanvas);
}

Challenge.prototype.getHighlightedString = function(sourceText, curWord) {
    this.startIndex = sourceText.indexOf(curWord, this.endIndex);
    this.endIndex = (this.startIndex + curWord.length);
    
	// create string with highlighting
	var resultStr = "";
	var highlightedStr = '<span id="wordHighlight">' + sourceText.substr(this.startIndex, curWord.length) + '</span>';
	resultStr = sourceText.substr(0, this.startIndex) + highlightedStr + sourceText.substr(this.endIndex);

	return resultStr;
}

// Creates the text view that displays the challenge text
Challenge.prototype.createTextView = function() {
    var textBox = document.createElement('div');
    textBox.setAttribute('id', 'challengeTextBox');
    
    var textView = document.createElement('p');
    textView.setAttribute('id', 'challengeTextView');
    textView.innerHTML = this.originalText;
    textBox.appendChild(textView);
    
    textView.appendChild(this.challengeBox.canvas);
    textView.appendChild(this.raceTrack.raceCanvas);
    
    this.append(textBox);
    return textBox;
}

Challenge.prototype.append = function(element) {
    this.container.appendChild(element);
}

// creates the timer view of this challenge
Challenge.prototype.createTimerView = function() {
    var timer = new CircleTimer(100, 100, this.timeLimit);
    timer.draw();
    this.append(timer.timerCanvas);
    return timer;
}

// Creates the text box for text entry of a challenge
Challenge.prototype.createChallengeBox = function() {
	var challengeBox = new ChallengeEntryBox(new TextStyle('Antic Slab', 40), 750, 50);
		challengeBox.colors({
			errorColor: "#E11",
			correctColor : "#2B1",
			bgColor : "#EEE",
		});
	challengeBox.sourceText(this.originalText);
    return challengeBox;
}

Challenge.prototype.createRaceTrack = function() {
    var raceTrack = new RaceTrack();
    raceTrack.wordCount = this.originalText.split(" ").length;
    raceTrack.raceCanvas.width = this.challengeBox.canvas.width;
    raceTrack.draw();
    return raceTrack;
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

// creates a play again button
function createPlayAgainButton() {
	var button = document.createElement("a");
	button.setAttribute('id', 'playAgainButton');
	button.setAttribute('href', '/playChallenge');
	button.innerHTML = "Play another challenge!";

	return button;
}

// calculates WPM
Challenge.prototype.getWPM = function() {
    this.elapsedSeconds = (this.elapsedSeconds == 0) ? 1 : this.elapsedSeconds;
    
	var WPM = parseInt((this.challengeBox.correctWords * 60) / this.elapsedSeconds);
	return WPM;
}
