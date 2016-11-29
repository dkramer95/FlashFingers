// Contains functions for animating elements

// Animations an array of html elements
function Animation(elements) {
	this.elements = elements;
	this.isRunning = false;
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

// creates a fade animation of all the elements within this animation
Animation.prototype.fade = function(duration, startOpacity, delta, endCondition) {
	const intervalTime = 20;
	var currentOpacity = startOpacity;
	var fadeDelta = ((1.0 / duration) * intervalTime) * Math.sin(delta);
	var animation = this;

	if (!animation.isRunning) {
		var fadeTimer = setInterval(function() {
			if (endCondition(currentOpacity)) {
				animation.isRunning = true;
				animation.elements.forEach(function(el) {
					el.style.visibility = "visible";
					el.style.opacity = currentOpacity;	
				});
				currentOpacity += fadeDelta;
			} else {
				animation.isRunning = false;
				clearInterval(fadeTimer);
			}
		}, intervalTime);
	}
}

// fades in all elements for the specified duration
Animation.prototype.fadeIn = function(duration) {
	this.fade(duration, 0.0, 1, function(opacity) {
		return opacity < 1.0;
	});
}

// fade out all elements for the specified duration
Animation.prototype.fadeOut = function(duration) {
	this.fade(duration, 1.0, -1, function(opacity) {
		return opacity > 0.0;
	});
}
