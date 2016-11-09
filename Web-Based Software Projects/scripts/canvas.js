var statsCanvas
var ctx;

function main() {
    ctx = statsCanvas.getContext("2d");
        ctx.font = "30px Arial";
        ctx.strokeText("Words Per Minute",27,100);
        ctx.strokeText("Accuracy",85,250);
}

var interval = setInterval(function(){
    if (document.readyState == "complete") {
        clearInterval(interval);
        statsCanvas = document.getElementById("statsCanvas")
        main();
    }
}, 10);