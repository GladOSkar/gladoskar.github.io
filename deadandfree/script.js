var database = {
	"lieblingsplatten": [
		{
			"url": "http://lorempixel.com/160/160/abstract/1",
			"artist": "Die Schnullibullis",
			"album": "Go Away!"
		},
		{
			"url": "http://lorempixel.com/160/160/abstract/2",
			"artist": "Die Ostfriesen",
			"album": "Moin Moin"
		},
		{
			"url": "http://lorempixel.com/160/160/abstract/3",
			"artist": "Die Soundsos",
			"album": "Wie geht's?"
		}
	],
	"lieblingssongs": [
		{
			"url": "http://lorempixel.com/160/160/abstract/4",
			"artist": "Die Schnullibullis",
			"album": "Go Away!"
		},
		{
			"url": "http://lorempixel.com/160/160/abstract/5",
			"artist": "Die Ostfriesen",
			"album": "Moin Moin"
		},
		{
			"url": "http://lorempixel.com/160/160/abstract/6",
			"artist": "Die Soundsos",
			"album": "Wie geht's?"
		}
	]
}

var langen = {
	id: "en",
	records: "RECORDS",
	about: "ABOUT US",
	contact: "CONTACT",
	location: "LOCATION",
	imprint: "IMPRINT",
	favrecords: "OUR FAVORITE RECORDS",
	favsongs: "OUR FAVORITE SONGS",
	lang: "SEITE AUF DEUTSCH",
	sale: "SALE!",
	close: "CLOSE",
	saletext: "We'll close during the next months, until then our inventory is on sale!",
	gosearch: "Search our inventory...",
	abouttext: "We are a little Record Store in Berlin-Schöneberg. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
	contacttext: "You want to ask us a question, reserve a record or talk to us about something else? Here is our contact info:",
	phone: "Phone: +49 30 2151449",
	addresstext: "Our store is located here:"
}

var langde = {
	id: "de",
	records: "PLATTEN",
	about: "ÜBER UNS",
	contact: "KONTAKT",
	location: "LAGE",
	imprint: "IMPRESSUM",
	favrecords: "UNSERE LIEBLINGPLATTEN",
	favsongs: "UNSERE LIEBLINGSSONGS",
	lang: "PAGE IN ENGLISH",
	sale: "WIR MACHEN SCHLUSSVERKAUF!",
	close: "SCHLIEßEN",
	saletext: "In den nächsten Monaten werden wir schließen, bis dahin sind alle Angebote stark reduziert!",
	gosearch: "Durchsuchen Sie unser Inventar...",
	abouttext: "Wir sind ein kleiner Schallplattenladen in Berlin-Schöneberg. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
	contacttext: "Sie wollen uns eine Frage stellen, eine Platte reservieren oder wegen etwas anderem mit uns sprechen? Hier sind unsere Kontaktdaten:",
	phone: "Telefon: 030 2151449",
	addresstext: "Unser Laden befindet sich hier:"
}

if (!(localStorage.getItem("language"))) {
	localStorage.setItem("language", window.navigator.language.slice(0, 2))
}

var lang = window["lang" + localStorage.getItem("language")]; //copies the language pack into the main language object

function chlang() {
	if (lang.id == "en")
		localStorage.setItem("language","de");
	else
		localStorage.setItem("language","en");

	location.reload();
}

function getOffset(el) {
    var _x = 0;
    var _y = 0;
    while(el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return {top: _y,left: _x};
}

var oldRect; //stores the previous position of the open card for the closing animation

function expand(platte) { //opening animation for cards
	var offset = getOffset(platte); //get start position
	var rect = platte.getBoundingClientRect(); //get start dimensions
	console.log(offset);
	console.log(rect);
	oldRect = { //store the previous position of the open card for the closing animation
		top: offset.top,
		left: offset.left,
		height: rect.height,
		width: rect.width
	}
	var card = platte.cloneNode(true); //create a clone that can be positioned absolute on the page
	card.classList.add("card"); //add the class for opened cards
	card.style.top = offset.top + "px"; //put the clone to the starting position
	card.style.left = offset.left + "px";
	card.style.height = rect.height + "px"; //set the clones starting dimensions
	card.style.width = rect.width + "px";
	card.onclick = false; //remove the event listener
	document.body.appendChild(card); //paint it to the dom
	card.style.transition = "all .4s ease-in-out"; //add the transition now so it doesn't move on the first paint
	setTimeout(function () { //move clone to destination position, dimensions & Shadows (could be redone with class) (delayed to wait until transition is set)
		card.style.boxShadow = "0px 0px 160px 0px";
		card.style.left = "84px";
		card.style.top = "84px";
		card.style.width = "calc(100% - 168px)";
		card.style.height = "calc(100% - 168px)";
	}, 10);
}

function retract(platte) { //closing animation
	card = document.querySelector("body > .platte.card"); //find open card
	//card.classList.remove("card");
	card.style.top = oldRect.top + "px"; //move back to previously saved position
	card.style.left = oldRect.left + "px";
	card.style.height = oldRect.height + "px"; //set back to previously saved dimensions
	card.style.width = oldRect.width + "px";
	setTimeout(function() {
		document.body.removeChild(card); //delete clone
	}, 410);
}

function paintPlatte(info, parent) {
	var html = [
		"<div class=\"platte\" onclick=\"expand(this)\">\n<div class=\"cover\" style=\"background:url(",
		info.url,
		");\"></div>\n<div class=\"desc\">\n<span class=\"artist\">",
		info.artist,
		"</span>\n<span class=\"album\">",
		info.album,
		"</span>\n</div>\n<button class=\"closebtn\" onclick=\"retract(this)\">",
		lang.close,
		"</button>\n</div>\n"
	].join("");
	parent.innerHTML += html;
}

function paintPlatten() { //will add the necessary html for every record into its respective container
	database.lieblingsplatten.forEach(function (platte) {
		paintPlatte(platte, window.lieblingsplatten);
	});

	database.lieblingssongs.forEach(function (platte) {
		paintPlatte(platte, window.lieblingssongs);
	});
}

function adjustHeadings() { //Adjust section Headings' CSS to make them be underneath their nav counterpart
	var navEls = document.querySelectorAll("nav a"),
		navElWidths = [],
		hereOffset = 0,
		navElOffsets = [];

	for (var i = 0; i < navEls.length; i++) {
		navElWidths[i] = navEls[i].offsetWidth;
		navElOffsets[i] = hereOffset;
		hereOffset += navElWidths[i];
	};

	console.log(navElWidths);
	console.log(navElOffsets);

	var headEls = document.querySelectorAll(".heading span"),
		navWidth = document.querySelector("nav").offsetWidth;
	
	for (var i = 0; i < headEls.length; i++) {
		headEls[i].style.marginLeft = ((navElOffsets[i] / navWidth) * 100) + "%";
		headEls[i].style.width = "calc(" + ((navElWidths[i] / navWidth) * 100) + "% - 32px)";
	};

}

var navsticks = 0, updatenav = 1; //remembers previous sticky status; so that the class only has to me added/removed when the threshold is passed
var opnas, activeopnaindex, opnaoffsets = [];
var headerheight = 0;

window.addEventListener("resize", function() {
	adjustHeadings();
	headerheight = document.querySelector("header").offsetHeight;
	for (var i = 0; i < opnas.length; i++) {
		opnaoffsets[i + 1] = getOffsetTop(opnas[i]);
	}
});

window.onscroll = function() {
	if ((document.body.scrollTop > headerheight) && (navsticks == 0)) { //for the sticky nav; may be obsolete when moving nav to top
		document.querySelector("nav").classList.add("stickynav");
		navsticks = 1;
	} else if ((document.body.scrollTop <= headerheight) && (navsticks == 1)) {
		document.querySelector("nav").classList.remove("stickynav");
		navsticks = 0;
	};
	
	if (updatenav && (document.body.scrollTop + 21 != opnaoffsets[activeopnaindex])) {
		if (document.body.scrollTop + 21 < opnaoffsets[activeopnaindex]) {
			activeopnaindex--;
			try { document.body.querySelector("nav a.active").classList.remove("active"); } catch(err) {};
			if (activeopnaindex)
				document.querySelector("nav a:nth-child(" + (activeopnaindex) + ")").classList.add("active");
		} else if (document.body.scrollTop + 21 > opnaoffsets[activeopnaindex + 1]) {
			activeopnaindex++;
			try { document.body.querySelector("nav a.active").classList.remove("active"); } catch(err) {};
			if (activeopnaindex)
				document.querySelector("nav a:nth-child(" + (activeopnaindex) + ")").classList.add("active");
		}
	}
};

window.onload = function() {
	adjustHeadings(); //Adjust section Headings' CSS to make them be underneath their nav counterpart
	
	headerheight = document.querySelector("header").offsetHeight;
	
	opnas = document.body.querySelectorAll(".opnavanchor");
	opnaoffsets[0] = 0;
	for (var i = 0; i < opnas.length; i++) {
		opnaoffsets[i + 1] = opnas[i].offsetTop;
	}
	activeopnaindex = 0;
};

function smoothScroll(did) { //scrools smoothly to the top of the element with ID "did" (="destinationID")
	try { document.body.querySelector("nav a.active").classList.remove("active"); } catch(err) {};
	document.getElementById(did).classList.add("active");  //make the clicked nav-Element stay visually active
	
	var start = window.pageYOffset, //get start position (current scroll position)
		dest = document.getElementById(did).offsetTop; //get destination position (absolute top of dest element)
	if (dest > (document.body.offsetHeight - window.innerHeight)) { //if the destination view is past the end of the page, only move to the end of the page, so the animation does not end abruptly
		dest = (document.body.offsetHeight - window.innerHeight)
	}
	var prg = 0, //time progress in s
		diff = (dest - start); //distance to move
	
	var scroll = setInterval(function () { //loop every .02 seconds
		prg += 0.02; //increment time by .02 seconds
		window.scrollTo(0, start + (easeinout(prg) * diff)); //scroll to position for current time progress (0 is for horizontal scrolling, position = start + progress * distance)
	}, 20);

	setTimeout(function () { //wait for 1 second (and a little bit), then stop loop
		clearInterval(scroll);
	}, 1010)

}

function easeinout(x) { //time-to-progress-ratio function for smooth scrolling; returns progress as integer 0<=y<=1
	return ((x * x) / ((x * x) + ((1 - x) * (1 - x))));
}
