var oldRect;	//stores the previous position of the open card for the closing animation

function expand(platte) {							//opening animation for cards
	
	oldRect = platte.getBoundingClientRect();		//get start dimensions, also stores the previous position of the open card for the closing animation
	
	var card = platte.cloneNode(true);				//create a clone that can be positioned absolute on the page
	
	card.classList.add("card");						//add the class for opened cards
	card.style.top = oldRect.top + "px";			//put the clone to the starting position
	card.style.left = oldRect.left + "px";
	card.style.height = oldRect.height + "px";		//set the clones starting dimensions
	card.style.width = oldRect.width + "px";
	card.onclick = false;							//remove the event listener
	document.body.appendChild(card);				//paint it to the dom
	
	card.style.transition = "all .4s ease-in-out";	//add the transition now so it doesn't move on the first paint
	
	setTimeout(function () { //move clone to destination position, dimensions & Shadows (could be redone with class) (delayed to wait until transition is set)
		card.classList.add("expanded");
	}, 10);
}

function retract(platte) { //closing animation
	card = document.querySelector("body > .platte.card"); //find open card
	card.classList.remove("expanded");
	card.style.top = oldRect.top + "px"; //move back to previously saved position
	card.style.left = oldRect.left + "px";
	card.style.height = oldRect.height + "px"; //set back to previously saved dimensions
	card.style.width = oldRect.width + "px";
	setTimeout(function() {
		document.body.removeChild(card); //delete clone
	}, 410);
}

function paintPlatte(info, parent) {
	parent.innerHTML += [
		"<div class=\"platte\" onclick=\"expand(this)\">\n<div class=\"cover\" style=\"background:url(",
		info.url,
		");\"></div>\n<div class=\"desc\">\n<span class=\"artist\">",
		info.artist,
		"</span>\n<span class=\"album\">",
		info.album,
		"</span>\n</div>\n<p>",
		info.text,
		"</p>\n<iframe class=\"vid\" src=\"",
		info.vid,
		"\" frameborder=\"0\" allowfullscreen></iframe>\n<button class=\"closebtn\" onclick=\"retract(this)\">&times;</button>\n</div>\n"
	].join("");
}

function paintPlatten() { //will add the necessary html for every record into its respective container
	database.lieblingsplatten.forEach(function (platte) {
		paintPlatte(platte, window.lieblingsplatten);
	});

	database.lieblingssongs.forEach(function (platte) {
		paintPlatte(platte, window.lieblingssongs);
	});
}
