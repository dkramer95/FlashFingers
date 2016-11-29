// Contains functions for animating elements
var isRunning = false;

// Animations an array of html elements
function Animation(elements) {
	this.elements = elements;
	hideElements(elements);
}

function hideElements(elements) {
	elements.forEach(function(el) {
		el.style.visibility = "hidden";
	});
}

function showElements(elements) {
	elements.forEach(function(el) {
		el.style.visibility = "visible";
	});
}

Animation.prototype.fadeIn = function(duration) {
	var currentOpacity = 0.0;
	const endOpacity = 1.0;
    var animation = this;
	
    if (!isRunning) {
        var fadeTimer = setInterval(function() {
            if (currentOpacity < endOpacity) {
                isRunning = true;
                animation.elements.forEach(function(el) {
                    el.style.visibility = "visible";
                    el.style.opacity = currentOpacity; 
                });
                currentOpacity += 0.015;
            } else {
                isRunning = false;
                clearInterval(fadeTimer);
            }
        }, 20);
    }

//	var fadeTimer = setInterval(function() {
//		if ((currentOpacity < endOpacity)) {
//			this.elements.forEach(function(el) {
//				el.style.opacity = currentOpacity;
//			});
//			currentOpacity += 0.015;
//		} else {
//			clearInterval(fadeTimer);
//			fadeTimer = null;
//		}
//	});
}
