
// creates a new Challenge Entry text box
function ChallengeEntryBox(textStyle, width, height) {
	this.textStyle = textStyle;
	this.width = width;
	this.height = height;

	this.canvas = this.createCanvas(width, height);
	this.textBuffer = "";
	this.correctWords = 0;

	// default colors
	this.colors({
		errorColor : "#F00",
		correctColor : "#0F0",
		bgColor : "#000"
	});
}

// color styling for this challenge entry box
ChallengeEntryBox.prototype.colors = function(colors) {
	this.errorColor 	= colors['errorColor'];
	this.correctColor 	= colors['correctColor'];
	this.bgColor 		= colors['bgColor'];
}

// creates a text style object
function TextStyle(fontFamily, fontSize, color) {
	this.fontFamily = fontFamily;
	this.fontSize = fontSize;
	this.color = color;
}

// Creates the canvas needed for drawing stuff to the screen
ChallengeEntryBox.prototype.createCanvas = function(width, height) {
	var canvas = document.createElement("canvas");	
	canvas.width = width;
	canvas.height = height;

	canvas.style.border = "1px solid #333";

	canvas.setAttribute('id', 'entryBoxCanvas');
	return canvas;
}

// Draws contents of text box to the screen
ChallengeEntryBox.prototype.draw = function() {
	var ctx = this.canvas.getContext('2d');

	this.drawText(ctx);
	this.drawCursor(ctx);
}

// initial starting offset from the left edge
var offsetX = 10;

// Draws text to the screen
ChallengeEntryBox.prototype.drawText = function(ctx) {
	var x = offsetX;
	var y = (this.height + this.textStyle.fontSize) / 2.5;

	ctx.fillStyle = this.bgColor; 
	ctx.fillRect(0, 0, this.width, this.height);

	ctx.font = this.textStyle.fontSize + "px " + this.textStyle.fontFamily;
	ctx.fillStyle = this.textStyle.color;
	ctx.fillText(this.textBuffer, x, y);
}

// Draws the text cursor to the screen
ChallengeEntryBox.prototype.drawCursor = function(ctx) {
	var textWidth = ctx.measureText(this.textBuffer).width;
	var cursorWidth = 10;
	var cursorHeight = this.height - 10;
	var cursorX = (textWidth) + offsetX;
	var cursorY = (this.height - cursorHeight) / 2;
	ctx.fillRect(cursorX, cursorY, cursorWidth, cursorHeight);
}

// Adds this to the page of a website
ChallengeEntryBox.prototype.addToPage = function() {
	document.body.appendChild(this.canvas);
}

// Key press handler
ChallengeEntryBox.prototype.keyPressed = function(e) {
	switch (e.keyCode) {
		case 32:	// spacebar
			if (this.clearIfValid()) {
				// we don't want to add a space to the word!
				return;	
			}
	}
	var letterPressed = String.fromCharCode(e.keyCode);
	this.textBuffer += letterPressed;
	this.advance();
}

// Handler function for pressing backspace key
ChallengeEntryBox.prototype.backSpace = function(e) {
	if (this.textBuffer.length > 0) {
		this.textBuffer = this.textBuffer.substr(0, this.textBuffer.length - 1);
	}
	this.advance();
}

// sets the source challenge text, which is used for validating
// the words we type
ChallengeEntryBox.prototype.sourceText = function(text) {
	this.challengeText = text;
	this.words = text.split(" ").reverse();
}

ChallengeEntryBox.prototype.currentWord = function() {
	var wordCount = this.words.length;
	var word = this.words[wordCount - 1];
	return word;
}

// clears out the active word if it is the correct next word in
// the source challenge text
ChallengeEntryBox.prototype.clearIfValid = function() {
	var nextWord = this.words.pop();
	var didClear = false;

	if (this.textBuffer == nextWord) {
		this.textStyle.color = this.correctColor;
		this.textBuffer = "";
		this.draw();
		this.correctWords++;
		didClear = true;
		updateWordIndicator();
	} 
	// word is incorrect -- put back
	else {
		this.words.push(nextWord);
	}
	return didClear;
}

// checks every keystroke to ensure that whatever entered is matching
// the current word in the challenge text, or if the user mistake it
// makes sure that it is visible
ChallengeEntryBox.prototype.advance = function() {
	var nextWord = this.words.pop();
	
	// in the middle of typing, but it is correct so far	
	if (this.textBuffer == nextWord.substr(0, this.textBuffer.length)) {
		this.textStyle.color = this.correctColor; 
	}
	// word is incorrect somehow
	else {
		this.textStyle.color = this.errorColor; 
	}
	this.words.push(nextWord);
	this.draw();
}

// special handler for keydown event
ChallengeEntryBox.prototype.keyDown = function(e) {
	switch (e.keyCode) {
		case 8:		// backspace key
			this.backSpace();
			break;
	}
}

