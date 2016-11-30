
// Creates a simple racetrack

function RaceTrack() {
	this.raceCanvas = createRaceCanvas();

	this.progress = 0;	// words completed
	this.wordCount = 0;

	this.draw();
}

function createRaceCanvas() {
	var canvas = document.createElement('canvas');
	canvas.setAttribute('id', 'raceCanvas');
	canvas.height = 40;

	canvas.style.display = "block";
	canvas.style.border = "1px solid #333";

	return canvas;
}

RaceTrack.prototype.setProgress = function(progress) {
	this.progress = progress;
}

// draws the racetrack
RaceTrack.prototype.draw = function() {
	var ctx = this.raceCanvas.getContext('2d');
	var canvasWidth = this.raceCanvas.width;
	var canvasHeight = this.raceCanvas.height;

	ctx.fillStyle = "#222";
	ctx.fillRect(0, 0, canvasWidth, canvasHeight);

	this.drawLines(ctx, canvasWidth, canvasHeight);
	this.drawPlayer(ctx, canvasWidth, canvasHeight);
}

// draws the race track lines
RaceTrack.prototype.drawLines = function(ctx, canvasWidth, canvasHeight) {
	const lineWidth = 30;
	const lineGap = 10;
	const lineHeight = 10;

	var lineCount = (canvasWidth) / (lineWidth + lineGap);

	var lineX = 0;
	var lineY = (canvasHeight - lineHeight) / 2;

	ctx.fillStyle = "#EF4";

	for (var j = 0; j < lineCount; ++j) {
		ctx.fillRect(lineX, lineY, lineWidth, lineHeight);
		lineX += lineWidth + lineGap;
	}

	ctx.fillStyle = "#666";
	
	// starting line
	ctx.fillRect(0, 0, 10, canvasHeight);

	// finish line
	ctx.fillRect(canvasWidth - 10, 0, 10, canvasHeight);
}

function getRandomSprite() {
	var spriteNum = parseInt(Math.random() * spriteCount);
	return spriteNum;
}

// generate random sprite
var spriteCount = 4;
var spriteNum = getRandomSprite();

// sprite image needed to draw from
var spriteImg = document.createElement("img");
spriteImg.setAttribute('src', '/images/KawaiiCats.png');

// draws the player sprite onto the race track
RaceTrack.prototype.drawPlayer = function(ctx, canvasWidth, canvasHeight) {
	// sprite dimensions
	const spriteWidth = 64;
	const spriteHeight = 40;

	// offset in sprite sheet
	var offsetX = (spriteNum * spriteWidth);
	var offsetY = 0;

	var playerX = (canvasWidth / this.wordCount) * this.progress;
	var playerY = (canvasHeight - spriteHeight) / 2;

	// draw sprite
	ctx.drawImage(spriteImg, offsetX, offsetY, spriteWidth, spriteHeight,
				  playerX, playerY, spriteWidth, spriteHeight);
}
