var statsCanvas
var ctx;

function main() {
    ctx = statsCanvas.getContext("2d");
        ctx.font = "30px Antic Slab";
        ctx.fillStyle = "#4E8E8D";

		drawText("Highest WPM", 150);
		drawText("Average WPM", 300);
}

function drawText(text, y) {
	var textWidth = ctx.measureText(text).width;
	var centerX = getCenterX(textWidth);
	ctx.fillText(text, centerX, y);
}

function getCenterX(width) {
	var centerX = (statsCanvas.width - width) / 2;
	return centerX;
}

var interval = setInterval(function(){
    if (document.readyState == "complete") {
        clearInterval(interval);
        statsCanvas = document.getElementById("statsCanvas")
        main();
    }
}, 10);
