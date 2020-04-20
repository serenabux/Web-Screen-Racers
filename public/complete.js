var pageInfo = new Object();
var bestInfo = new Object();

function getData(){
	pageInfo.challenge = JSON.parse(window.localStorage.getItem('challenge'));
	pageInfo.type = JSON.parse(window.localStorage.getItem('type'));
	pageInfo.score= JSON.parse(window.localStorage.getItem('score'));
	pageInfo.keystrokes = JSON.parse(window.localStorage.getItem('keyStrokes'));
	pageInfo.time = JSON.parse(window.localStorage.getItem('time'));
	pageInfo.answer = JSON.parse(window.localStorage.getItem('answer'));
	pageInfo.lowestDisplay = JSON.parse(window.localStorage.getItem('lowestDisplay'));
	pageInfo.displayKeyCommands = JSON.parse(window.localStorage.getItem('displayKeyCommands'));
	pageInfo.idealKeystrokes = JSON.parse(window.localStorage.getItem('idealKeystrokes'));
	pageInfo.level = JSON.parse(window.localStorage.getItem('level'));
}

function calculateScore(){
	if(pageInfo.keystrokes > pageInfo.idealKeystrokes + Math.round(pageInfo.idealKeystrokes *.1)){
		pageInfo.score - 1;
	}
}

function enableNextLevel(){
	const challengeNum = pageInfo.challenge;
	const challengeType = pageInfo.type;
	var enabledChallenges = JSON.parse(window.localStorage.getItem('completedChallenges'));
	if(challengeNum<2){
		switch(challengeType){
			case "basicNav":{
				enabledChallenges.basic[challengeNum+1].avaliable = 1;
				break
			}
			case "tables":{
				enabledChallenges.tables[challengeNum+1].avaliable = 1;
				break;
			}
			case "forms":{
				enabledChallenges.forms[challengeNum+1].avaliable = 1;
			}
			default: break;
		}
	}
	window.localStorage.setItem('completedChallenges', JSON.stringify(enabledChallenges));
}

function getPastChallengeData(){
	var pastChallenge = JSON.parse(window.localStorage.getItem('completedChallenges'));
	var type = pageInfo.type;
	var challengeNum = pageInfo.challenge;
	var challengeSpecificInfo = pastChallenge.basic[challengeNum];
	switch(type){
		case "tables":{
			challengeSpecificInfo = pastChallenge.tables[challengeNum];
			break;
		}
		case "forms":{
			challengeSpecificInfo = pastChallenge.forms[challengeNum];
			break;
		}
		case "basicNav":{
			challengeSpecificInfo = pastChallenge.basic[challengeNum];
			break;
		}
		default: break;
	}

	if(challengeSpecificInfo){
		if(challengeSpecificInfo.score < pageInfo.score){
			challengeSpecificInfo.score = pageInfo.score;
		}
		if(challengeSpecificInfo.keystrokes > pageInfo.keystrokes){
			challengeSpecificInfo.keystrokes = pageInfo.keystrokes;
		}
		if(challengeSpecificInfo.displayKeyCommands > pageInfo.displayKeyCommands){
			challengeSpecificInfo.displayKeyCommands = pageInfo.displayKeyCommands;
		}
		if(challengeSpecificInfo.lowestDisplay > pageInfo.lowestDisplay){
			challengeSpecificInfo.lowestDisplay = pageInfo.lowestDisplay;
		}
		console.log(challengeSpecificInfo.time)
		var t1 = challengeSpecificInfo.time.split(":");
		var t2 = pageInfo.time.split(":");
		if(parseInt(t1[0]) > parseInt(t2[0])){
			challengeSpecificInfo.time = pageInfo.time;
		}
		else if(parseInt(t1[0]) == parseInt(t2[0]) && parseInt(t1[1]) > parseInt(t2[1])){
			challengeSpecificInfo.time = pageInfo.time;
		}
		var display = "";
		switch(challengeSpecificInfo.lowestDisplay){
			case(0):{
				display = "No Visual Feedback";
				break;
			}
			case(1):{
				display = "Limited Visual Feedback";
				break;
			}
			default:{
				display = "Complete Visual Feedback";
				break;
			}
		}
		var c = "";
		switch(challengeSpecificInfo.displayKeyCommands){
			case(0)
		}
		document.getElementById("best_time").innerHTML = challengeSpecificInfo.time;
		document.getElementById("best_keystrokes").innerHTML = challengeSpecificInfo.keystrokes;
		document.getElementById("best_keyboard_commands").innerHTML = challengeSpecificInfo.displayKeyCommands;
		document.getElementById("best_visual").innerHTML = display;
		var best_stars = "";
		for(var i=0; i < challengeSpecificInfo.score; i++){
			best_stars += "&#9733;"
		}for(var i=0; i < 5-challengeSpecificInfo.score; i++){
			best_stars += "&#9734"
		}
		document.getElementById("best_score").innerHTML = best_stars
		;
	}
	console.log(pastChallenge);
	window.localStorage.setItem('completedChallenges', JSON.stringify(pastChallenge));
}

function setStars(){
	document.getElementById("complete_star").innerHTML = "&#9733";
	if(pageInfo.keystrokes <= pageInfo.idealKeystrokes ){
		document.getElementById("keystroke_star").innerHTML = "&#9733";
	}
	if(pageInfo.displayKeyCommands === 0){
		document.getElementById("keyboard_commands_star").innerHTML = "&#9733";
	}
	if(pageInfo.lowestDisplay === 0){
		document.getElementById("visual_star").innerHTML = "&#9733 &#9733";
	} else if(pageInfo.lowestDisplay === 1){
		document.getElementById("visual_star").innerHTML = "&#9733 &#9734"
	}
}

function setVisualFeedback(){
	switch(pageInfo.lowestDisplay){
		case(2): {
			document.getElementById("visual_feedback").innerHTML = "Complete Visual Feedback";
			break;
		}
		case(1): {
			document.getElementById("visual_feedback").innerHTML = "Limited Visual Feedback";
			break;
		}
		default:
			document.getElementById("visual_feedback").innerHTML = "No Visual Feedback";
	}
}

function setKeyCommands(){
	if(pageInfo.displayKeyCommands == 0){
		document.getElementById("displayKeyboard").innerHTML = "Keyboard Commands Hidden";
	}
}


function setUpPage(){
	getData();
	calculateScore();
	getPastChallengeData();
	enableNextLevel();
	console.log(pageInfo);
	if(pageInfo.answer == 1){
		document.getElementById("success").innerHTML = "Good Job!";
		document.getElementById("nextChallengeButton").onclick = newChallenge;
		var stars = ""
		for(var i=0; i < pageInfo.score; i++){
			stars += "&#9733; "
		}for(var i=0; i < 5-pageInfo.score; i++){
			stars += "&#9734"
		}

		document.getElementById("score").innerHTML = stars;
		if(pageInfo.score == 5){
			pageInfo.level += 2
		}
		else if(pageInfo.score > 0){
			pageInfo.level+=1
		}
		setStars();
	}
	else{
		document.getElementById("success").innerHTML = "Try Again";
		document.getElementById("nextChallengeButton").style.display = "none";
		document.getElementById("challenge_completed").innerHTML = "Challenge Not Completed"
	}
	document.getElementById("ideal_keystrokes").innerHTML = pageInfo.idealKeystrokes;
	document.getElementById("redoButton").onclick = returnToPreviousChallenge;
	document.getElementById("keystrokes").innerHTML = pageInfo.keystrokes;
	setVisualFeedback();
	setKeyCommands();
	const minutes = Math.floor(pageInfo.time / 60); 
	const seconds = pageInfo.time - minutes * 60;
	document.getElementById("time").innerHTML = pageInfo.time;
	// document.getElementById("time").innerHTML = minutes + " minutes, " + seconds + " seconds";
	document.getElementById("level").innerHTML = "Level: " + pageInfo.level;
	window.localStorage.setItem('level', JSON.stringify(pageInfo.level));
}

function newChallenge(){
	const nextChallengeNum = (pageInfo.challenge + 1)%3;
	window.localStorage.setItem('challenge', JSON.stringify(nextChallengeNum));
	if(nextChallengeNum == 0){
		switch(pageInfo.type){
			case "basicNav":
				//TODO: change back to tables
				pageInfo.type = "index";
				break;
			case "tables":
				pageInfo.type = "forms";
				break;
			case "forms":
				pageInfo.type = "index";
				break;
			default:
				pageInfo.type = "index"	
		}
	}
	window.location=pageInfo.type + ".html";
}

function returnToPreviousChallenge(){
	var link = pageInfo.type + ".html"
	window.location = link;
}