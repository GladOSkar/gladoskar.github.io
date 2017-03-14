var database = {
	"lieblingsplatten": [
		{
			"url": "img/AlbumArt/sampha.png",
			"artist": "Sampha",
			"album": "Process",
			"text": "",
			"vid": "https://www.youtube.com/embed/_NSuIYwBxu4"
		},
		{
			"url": "img/AlbumArt/fink.png",
			"artist": "Fink",
			"album": "Fink's Sunday Night Blues Club, Vol. 1",
			"text": "In Vinyl leider erst ab dem 14.4.2017 erhältlich",
			"vid": "https://www.youtube.com/embed/j63QBuIA4wM"
		},
		{
			"url": "img/AlbumArt/nikkilane.png",
			"artist": "Nikki Lane",
			"album": "Highway Queen",
			"text": "",
			"vid": "https://www.youtube.com/embed/zcvQL8_ZP20"
		},
		{
			"url": "img/AlbumArt/michaelkiwanuka.png",
			"artist": "Michael Kiwanuka",
			"album": "Love And Hate",
			"text": "",
			"vid": "https://www.youtube.com/embed/aMZ4QL0orw0"
		},
		{
			"url": "img/AlbumArt/leonardcohen.png",
			"artist": "Leonard Cohen",
			"album": "You Want It Darker",
			"text": "",
			"vid": "https://www.youtube.com/embed/v0nmHymgM7Y"
		},
		{
			"url": "img/AlbumArt/lutherdickinson.png",
			"artist": "Luther Dickinson",
			"album": "Blues & Ballads (A Folksinger's Songbook)",
			"text": "",
			"vid": "https://www.youtube.com/embed/8KWk-Dso3HA"
		}
	],
	"lieblingssongs": [

	]
}

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
