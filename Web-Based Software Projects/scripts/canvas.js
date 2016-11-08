var statsCanvas
var ctx;

function main() {
    ctx = statsCanvas.getContext("2d");
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(200,0,400,400);
        ctx.font = "30px Arial";
        ctx.strokeText("Stats",100,50);
}

var interval = setInterval(function(){
    if (document.readyState == "complete") {
        clearInterval(interval);
        statsCanvas = document.getElementById("statsCanvas")
        main();
    }
}, 10);