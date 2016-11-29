function CircleTimer(width, height, timeLimit) {
	this.width = width;
	this.height = height;
	this.radius = (width / 2.5);
	this.timeLimit = timeLimit;

	this.timerCanvas = this.createTimerCanvas();
	this.elapsedSeconds = 0;
}

CircleTimer.prototype.createTimerCanvas = function() {
	var canvas = document.createElement('canvas');
	canvas.setAttribute('id', 'timer');
	canvas.width = this.width;
	canvas.height = this.height;

	return canvas;
}

CircleTimer.prototype.update = function(timeLeft) {
	this.elapsedSeconds++;
	this.draw();
}

CircleTimer.prototype.draw = function() {
	var ctx = this.timerCanvas.getContext('2d');
	ctx.clearRect(0, 0, this.width, this.height);

	this.drawBG(ctx);
//	this.drawRemainderTrack(ctx);
	this.drawTimeDisplay(ctx);
}

CircleTimer.prototype.drawBG = function(ctx) {
	ctx.fillStyle = "#FFF";
	ctx.beginPath();

	var centerX = (this.width / 2);
	var centerY = (this.height / 2);

	ctx.arc(centerX, centerY, this.radius, 0, 2 * Math.PI, false);
	ctx.closePath();
	ctx.fill();
}

CircleTimer.prototype.drawRemainderTrack = function(ctx) {
	var startAngle = (-90 * (Math.PI / 180));
	var multiplier = (360 / this.timeLimit);
	var endAngle = (-90 + (this.elapsedSeconds * multiplier) * (Math.PI / 180)); 
	
	var centerX = (this.width / 2);
	var centerY = (this.height / 2);

	ctx.strokeStyle = "#4E8E8D";
	ctx.beginPath();
	ctx.arc(centerX, centerY, this.radius, startAngle, endAngle, false);
	ctx.lineWidth = 5;
	ctx.stroke();
}

CircleTimer.prototype.drawTimeDisplay = function(ctx) {
	var timeLeft = (this.timeLimit - this.elapsedSeconds);

	var fontSize = this.radius;
	ctx.fillStyle = "#4E8E8D";
	ctx.font = fontSize + "px Antic Slab";

	// ctx.strokeRect(0, 0, this.width, this.height);

	var textWidth = ctx.measureText("" + timeLeft).width;
	var textX = (this.width - textWidth) / 2;
	var textY = (this.height) - (fontSize / 1.1);

	ctx.fillText(timeLeft, textX, textY);
}
