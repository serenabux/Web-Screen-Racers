//object to keep track of the information for the challenge the user just completed
var pageInfo = new Object();
//object to keep track of the best the user has in each category for the challenge
var bestInfo = new Object();

/**
 * Gets data from local storage that was set in the challenge the user just comppleted and set it in pageInfo object
 * @return {void}  
 */
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

/**
 * Adjusts score based on keystrokes. If it is within 10% of the ideal give the user the point otherwise take away from the score
 * @return {void}  
 */
function calculateScore(){
	if(pageInfo.keystrokes > pageInfo.idealKeystrokes + Math.round(pageInfo.idealKeystrokes *.1)){
		pageInfo.score = pageInfo.score - 1;
	}
	if(pageInfo.keystrokes == 0){
		pageInfo.score = pageInfo.score - 1;
	}
}

/**
 * Enable the next challenge for the type based on the challenge that the user completed.
 * Update in the local storage object completed challenge so that it will be enabled if the user flips back to the home page 
 * @return {void}  
 */
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

/**
 * Sets the stars that show up for the times when it is out of 5 stars. Set a filled star for each point recieved and unfilled for the remaining.
 * @param  {int} score Users score, between 0 and 5
 * @param {string} setLocation The id for the element that the stars are being set in 
 * @return {void} 
 */
function setStars(score, setLocation){
	var stars = "";
	//set filled stars 
	for(var i=0; i < score; i++){
		stars += "&#9733;"
	//set unfilled stars 
	}for(var i=0; i < 5-score; i++){
		stars += "&#9734"
	}
	document.getElementById(setLocation).innerHTML = stars;
}

/**
 * Figure out what the best time was for the user to complete the challenge and set it based on id for the best time spot
 * @param  {string} time1 first time that needs to be compared
 * @param {string} time2 second time that needs to be compared
 * @return {array of strings} Return an array corresponging to best time [minutes, seconds] 
 */
function bestTime(time1, time2){
	var t1 = time1.split(":");
	var t2 = time2.split(":");
	var t = ""
	//compare minutes
	if(parseInt(t1[0]) > parseInt(t2[0])){
		t = t2;
	}
	//if minutes are the same compare seconds
	else if(parseInt(t1[0]) == parseInt(t2[0]) && parseInt(t1[1]) > parseInt(t2[1])){
		t = t2;
	}
	else{
		t = t1;
	}
	document.getElementById("best_time").innerHTML = t[0] + " minutes, " + t[1] + " seconds";
	return t;
}

/**
 * Set the text to show up for the visual feedback that the user used during challenge and the best
 * @param  {int} lowestDisplay The number corresponding to what visual feedback the user recieved 
 * @param {string} setLocation The id that corresponds to the HTML element of where to set the text in the page
 * @return {void}
 */
function setVisualFeedback(lowestDisplay, setLocation){
	var display = "";
	switch(lowestDisplay){
		case(0):{
			display = "No Visual Feedback";
			break;
		}
		case(1):{
			display = "Limited Visual Feedback";
			break;
		}
		default:{
			display =  "Complete Visual Feedback";
			break;
		}
	}
	document.getElementById(setLocation).innerHTML = display;
}

/**
 * Set text in completion page regarding if the user displayed userful key commands 
 * @param  {int} displayKeyCommands 1 if user displayed key commands, otherwise 0
 * @param {string} setLocation the html id for the area that this text will be set
 * @return {void} 
 */
function setDisplayKeyCommandFeedback(displayKeyCommands, setLocation){
	var c = "Keyboard Commands Hidden";
	if(displayKeyCommands == 1){
		c = "Display Keyboard Commands"
	}
	document.getElementById(setLocation).innerHTML = c;
}


/**
 * Pulls the data of the best from each category from past challenges and sets up page to display the best the user has done for each section
 * @return {void}  
 */
function getPastChallengeData(){
	var pastChallenge = JSON.parse(window.localStorage.getItem('completedChallenges'));
	var type = pageInfo.type;
	var challengeNum = pageInfo.challenge;
	var challengeSpecificInfo = pastChallenge.basic[challengeNum];
	//get the proper data for challenge based on the challenge number and the challenge type
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

	//Compare the infomation for each best to how the user did and update categories where the user did better
	if(challengeSpecificInfo){
		if(challengeSpecificInfo.score < pageInfo.score){
			challengeSpecificInfo.score = pageInfo.score;
		}
		if(challengeSpecificInfo.keystrokes > pageInfo.keystrokes && pageInfo.keystrokes > 0){
			challengeSpecificInfo.keystrokes = pageInfo.keystrokes;
		}
		if(challengeSpecificInfo.displayKeyCommands > pageInfo.displayKeyCommands){
			challengeSpecificInfo.displayKeyCommands = pageInfo.displayKeyCommands;
		}
		if(challengeSpecificInfo.lowestDisplay > pageInfo.lowestDisplay){
			challengeSpecificInfo.lowestDisplay = pageInfo.lowestDisplay;
		}

		//Set dispaly for the best in the GUI
		document.getElementById("best_keystrokes").innerHTML = challengeSpecificInfo.keystrokes;
		var t = bestTime(challengeSpecificInfo.time, pageInfo.time);
		challengeSpecificInfo.time = t[0] + ':' + t[1];
		setVisualFeedback(challengeSpecificInfo.lowestDisplay, "best_visual");
		setDisplayKeyCommandFeedback(challengeSpecificInfo.displayKeyCommands, "best_keyboard_commands")
		setStars(challengeSpecificInfo.score, "best_score")
	}
	//store updated data
	window.localStorage.setItem('completedChallenges', JSON.stringify(pastChallenge));
}

/**
 * Set the single stars for each category of the challenge 
 * @return {void} 
 */
function setSpecificStars(){
	document.getElementById("complete_star").innerHTML = "&#9733";
	if(pageInfo.keystrokes <= pageInfo.idealKeystrokes && pageInfo.keystrokes > 0){
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

/**
 * Update the user's level based on user's performace 
 * @return {void} 
 */
function setLevel(){
	if(pageInfo.score == 5){
		pageInfo.level += 2
	}
	else if(pageInfo.score > 0){
		pageInfo.level+=1
	}
}


/**
 * Set up the completion page by filling it with appropriate text and stars 
 * Called on load of complete.hmtl 
 * @return {void} 
 */
function setUpPage(){
	getData();
	calculateScore();
	getPastChallengeData();
	enableNextLevel();
	//if the answer the user gave was correct
	if(pageInfo.answer == 1){
		document.getElementById("success").innerHTML = "Good Job!";
		document.getElementById("nextChallengeButton").onclick = newChallenge;
		setStars(pageInfo.score, "score");
		setLevel();
		setSpecificStars();
	}
	//if the answer the user gave was not correct
	else{
		document.getElementById("success").innerHTML = "Try Again";
		document.getElementById("nextChallengeButton").style.display = "none";
		document.getElementById("challenge_completed").innerHTML = "Challenge Not Completed"
	}
	//set the data for each of the stars and the buttons
	document.getElementById("ideal_keystrokes").innerHTML = pageInfo.idealKeystrokes;
	document.getElementById("keystrokes").innerHTML = pageInfo.keystrokes;
	setVisualFeedback(pageInfo.lowestDisplay, "visual_feedback");
	setDisplayKeyCommandFeedback(pageInfo.displayKeyCommands, "displayKeyboard");
	var t = pageInfo.time.split(":"); 
	document.getElementById("time").innerHTML = t[0] + " minutes, " + t[1] + " seconds";;
	document.getElementById("level").innerHTML = "Level: " + pageInfo.level;
	document.getElementById("redoButton").onclick = returnToPreviousChallenge;
	window.localStorage.setItem('level', JSON.stringify(pageInfo.level));
	document.getElementById("redoButton").onclick = returnToPreviousChallenge;
}

/**
 * Triggers the link for the next challenge based on the challenge that the user just completed
 * @return {void}  
 */
function newChallenge(){
	const nextChallengeNum = (pageInfo.challenge + 1)%3;
	window.localStorage.setItem('challenge', JSON.stringify(nextChallengeNum));
	if(nextChallengeNum == 0){
		switch(pageInfo.type){
			case "basicNav":
				//TODO: change back to tables when tables is enables 
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

/**
 * Called when the retry button is pressed. Automatically trigger the link for the challenge that the user just completed 
 * @return {void}  
 */
function returnToPreviousChallenge(){
	var link = pageInfo.type + ".html"
	window.location = link;
}