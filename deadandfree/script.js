var langen = {
	id: "en",
	menu: "MENU",
	records: "RECORDS",
	about: "ABOUT US",
	contact: "CONTACT",
	location: "LOCATION",
	imprint: "IMPRINT",
	favrecords: "OUR FAVORITE RECORDS",
	favsongs: "OUR FAVORITE SONGS",
	lang: "SEITE AUF DEUTSCH",
	opening: "OPENING TIMES",
	newsh: "WE'RE STILL HERE!",
	newstext: "	And we have a new website!<br><br> \
				That’s the good news.<br><br> \
				The maybe less good news is:<br><br> \
				We won’t be here forever (as a lot of people were assuming).<br><br> \
				Sometime in early 2018 MR DEAD & MRS FREE will close this door forever after 35 years in business.<br><br> \
				So come here while you can, there are lots of special offers and we are selling parts of our own collections, too.",
	gosearch: "Search our inventory...",
	newstuffpdf: "New in stock [pdf]",
	abouttext: "MR DEAD & MRS FREE have been selling records for 34 years now.<br><br> \
				We sold records before there were CDs or MPs3s or streaming.<br><br> \
				And even in the darkest days of the 90s when CDs seemed to be the only medium in the market, we have always had at least 50% of our turnover with Vinyl.<br><br> \
				Now, with Vinyl “booming” again, we do what we have always done: We sell music (also on CD).<br><br> \
				Sometimes trendy, sometimes obscure, some timeless classics, some new stuff we keep discovering.",
	contacttext: "You want to ask us a question, reserve a record or talk to us about something else? Here is our contact info:",
	phone: "Phone: +49 30 2151449",
	addresstext: "ADDRESS"
}

var langde = {
	id: "de",
	menu: "MENÜ",
	records: "PLATTEN",
	about: "ÜBER UNS",
	contact: "KONTAKT",
	location: "LAGE",
	imprint: "IMPRESSUM",
	favrecords: "UNSERE LIEBLINGPLATTEN",
	favsongs: "UNSERE LIEBLINGSSONGS",
	lang: "PAGE IN ENGLISH",
	opening: "ÖFFUNGSZEITEN",
	newsh: "ES GIBT UNS NOCH!",
	newstext: "	Und wir haben wieder eine Webseite!!<br><br> \
				Das ist die gute Nachricht.<br><br> \
				Die vielleicht nicht ganz so gute:<br><br> \
				Es wird uns doch nicht ewig geben…(was ja viele Leute gehofft haben).<br><br> \
				Anfang 2018 werden MR DEAD & MRS FREE voraussichtlich nach 35 Jahren den Laden dichtmachen.<br><br> \
				Also kommt her, solange wir noch da sind. Es gibt jede Menge Sonderangebote und wir verkaufen auch Teile unserer eigenen Sammlungen.<br><br> \
				<i>Wer sich berufen fühlt und der Wohnungsgesellschaft ein „Konzept“ vorlegen möchte, möge uns gerne kontaktieren.</i>",
	gosearch: "Durchsuchen Sie unser Lager...",
	newstuffpdf: "Neuheiten im Sortiment [pdf]",
	abouttext: "MR DEAD & MRS FREE verkaufen Schallplatten seit 34 Jahren.<br><br> \
				Als es noch keine CDs und MP3s und Streaming gab (und auch noch fast keine Computer und kein Internet…dafür Karteikarten und Fax-Geräte).<br><br> \
				Als es in den 90ern – fast – nur noch CDs gab,  haben wir immer mindestens 50% vom Umsatz mit Schallplatten gemacht. Das kleine gallische Dorf des Vinyls in einem Meer von Silberlingen.<br><br> \
				Und mit dem sogenannten Vinyl-Boom mache wir, was wir immer gemacht haben: Wir verkaufen Musik – auch auf CD. Im Trend oder abseits davon, die ewigen Klassiker und das Neue, das wir immer noch entdecken.",
	contacttext: "Sie wollen uns eine Frage stellen, eine Platte reservieren oder wegen etwas anderem mit uns sprechen? Hier sind unsere Kontaktdaten:",
	phone: "Telefon: 030 2151449",
	addresstext: "ADRESSE"
}

var lang = window["lang" + ( localStorage.getItem("language") || window.navigator.language.slice(0,2) )]; //copies the language pack into the main language object

function chlang() {
	if (lang.id == "en")
		localStorage.setItem("language","de");
	else
		localStorage.setItem("language","en");

	location.reload();
}

function foldnav(el) {
	if (el.parentElement.classList.contains("open")) {
		el.parentElement.classList.remove("open");
	} else {
		el.parentElement.classList.add("open");
	}
}

function scrolltop() {
	return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
}

function scrollleft() {
	return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
}

function getOffset(el) {
	var top, left, rect = el.getBoundingClientRect();

	top = rect.top + scrolltop();
	left = rect.left + scrollleft();

	return {top: top, left:left};
}

function adjustHeadings() {			//Adjust section Headings' CSS to make them be underneath their nav counterpart
	var navEls = document.querySelectorAll("nav a"),
		navElWidths = [],
		hereOffset = 0,
		navElOffsets = [];

	for (var i = 0; i < navEls.length - 1; i++) {
		navElWidths[i] = navEls[i + 1].offsetWidth;
		navElOffsets[i] = hereOffset;
		hereOffset += navElWidths[i];
	};

	var headEls = document.querySelectorAll(".heading span"),
		navWidth = document.querySelector("nav").offsetWidth;

	for (var i = 0; i < headEls.length; i++) {
		headEls[i].style.marginLeft = navElOffsets[i] + "px";
		headEls[i].style.width = navElWidths[i] + "px";
	};

}

var navsticks = 0; //remembers previous sticky status; so that the class only has to me added/removed when the threshold is passed
var opnas = [], activeopnaindex = 0, opnaoffsets = [0];
var headerheight = 0;

function realign() {
	adjustHeadings(); //Adjust section Headings' CSS to make them be underneath their nav counterpart

	headerheight = document.querySelector("header").offsetHeight;

	for (var i = 0; i < opnas.length; i++) {
		opnaoffsets[i + 1] = getOffset(opnas[i]).top;
	}
}

window.addEventListener("resize", function() {
	realign();
});

window.onscroll = function() {
	if ((scrolltop() > headerheight) && (navsticks == 0)) { //for the sticky nav; may be obsolete when moving nav to top
		document.querySelector("nav").classList.add("stickynav");
		navsticks = 1;
	} else if ((scrolltop() <= headerheight) && (navsticks == 1)) {
		document.querySelector("nav").classList.remove("stickynav");
		navsticks = 0;
	};

	if (scrolltop() + 21 != opnaoffsets[activeopnaindex]) {
		if (scrolltop() + 21 < opnaoffsets[activeopnaindex]) {
			activeopnaindex--;
			try { document.body.querySelector("nav a.active").classList.remove("active"); } catch(err) {};
			if (activeopnaindex)
				document.querySelector("nav a:nth-child(" + (activeopnaindex + 2) + ")").classList.add("active");
		} else if (scrolltop() + 21 > opnaoffsets[activeopnaindex + 1]) {
			activeopnaindex++;
			try { document.body.querySelector("nav a.active").classList.remove("active"); } catch(err) {};
			if (activeopnaindex)
				document.querySelector("nav a:nth-child(" + (activeopnaindex + 2) + ")").classList.add("active");
		}
	}
};

var sled, sliderpos = 0, slidertotal;

window.onload = function() {

	opnas = document.body.querySelectorAll(".opnavanchor");
	realign();

	paintPlatten();

	realign();

	setInterval(function(){
		slidergoto("n");
	}, 8000);

	sled = document.querySelector(".slider .sled");
	slidertotal = sled.childElementCount;
};



function slidergoto(dest) {

	document.querySelector(".slider .buttons button.active").classList.remove("active");

	if (dest == 'p') {
		sliderpos--;
		if (sliderpos < 0) sliderpos = slidertotal;
	} else if (dest == 'n') {
		sliderpos = (sliderpos + 1) % slidertotal;
	} else {
		sliderpos = dest;
	}

	sled.style.marginLeft = (sliderpos * -100) + "%";

	document.querySelectorAll(".slider .buttons button")[sliderpos + 1].classList.add("active");
}

function smoothScroll(did) { //scrools smoothly to the top of the element with ID "did" (="destinationID")

	try { document.body.querySelector("nav.open").classList.remove("open"); } catch(err) {};

	try { document.body.querySelector("nav a.active").classList.remove("active"); } catch(err) {};
	document.querySelector("." + did + "link").classList.add("active");  //make the clicked nav-Element stay visually active

	var start = scrolltop(), //get start position (current scroll position)
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
