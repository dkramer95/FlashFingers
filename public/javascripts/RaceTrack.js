
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
	canvas.width = 500; 
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

	var width = 30;
	var height = 20;
	
	// calculate progress position
	var x = (this.raceCanvas.width / this.wordCount) * this.progress;
	var y = (this.raceCanvas.height - height) / 2;


	// draw lines
	ctx.fillStyle = "#666";

	// start line
	ctx.fillRect(0, 0, 10, canvasHeight);

	// middle line
	ctx.fillRect(0, canvasHeight / 2, canvasWidth, 2);

	// finish line
	ctx.fillRect(canvasWidth - 10, 0, 10, canvasHeight);

	// draw player
	ctx.fillStyle = "#FF0";
	ctx.fillRect(x, y, width, height);

}
