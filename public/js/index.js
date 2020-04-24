/**
 * Sets the stars that appear under each completed challenge.
 * The stars correspond to the users top score for that level.
 * @param  {int} score Score for the given level
 * @param  {[type]} id The HTML ID for the challenge
 * @return {void}      
 */
function setStars(score, id){
    var best_stars = "";
    //set filled in stars for the score
	for(var i=0; i < score; i++){
			best_stars += "&#9733;"
    }
    //set unfilled stars for score-5 to show that it was out of 5
    for(var i=0; i < 5-score; i++){
			best_stars += "&#9734"
	}
	document.getElementById(id).classList.remove('margin-bottom-24');
	document.getElementById(id+'-star').innerHTML = best_stars;
}


/**
 * Based on data from local storage enable unlocaked levels by changing CSS classes
 * @param  {Object} arg1 The object containing the data from past challenges. In depth description listed before newUser 
 * @return {Void}   
 */
function enableLevels(pastChallenge){
    var id = "";
    //loop through levels for basic navigation challenges	
    for (var i=0; i<pastChallenge.basic.length; i++){
        if(pastChallenge.basic[i].avaliable == 1){
            id = "basic" + i;
            document.getElementById(id).classList.remove("disabled");
            document.getElementById(id).classList.add("challenge");
            if(pastChallenge.basic[i].score > 0){
                setStars(pastChallenge.basic[i].score, id);
            }
        }
    }

    //loop through levels for tables challenges
    // for (var i=0; i<pastChallenge.tables.length; i++){
    //     if(pastChallenge.tables[i].avaliable == 1){
    //         id = "tables" + i;
    //         document.getElementById(id).classList.remove("disabled");
    //         document.getElementById(id).classList.add("challenge");
    //         if(pastChallenge.tables[i].score > 0){
    //             setStars(pastChallenge.tables[i].score, id);
    //         }
    //     }
    // }

    //loop through levels for forms challenges
    // for (var i=0; i<pastChallenge.forms.length; i++){
    //     if(pastChallenge.forms[i].avaliable == 1){
    //         id = "forms" + i;
    //         document.getElementById(id).classList.remove("disabled");
    //         document.getElementById(id).classList.add("challenge");
    //         if(pastChallenge.forms[i].score > 0){
    //             setStars(pastChallenge.forms[i].score, id);
    //         }
    //     }
    // }
}


/**
 * Populates newChallenge Object with generic data that will get replaced later. 
 * Automatically enables first challenge of each type 
 * Sets newChallenge in local storage
 * @return {void} 
 * 
 * newChallenge Object
 * The newChallenge Object has 3 properties that correspond to the categories for challenges: basic, tables, and forms 
 * Each property is an array of 3 challengeData objects, each array element corresponds to a challenge
 * 
 * challengeData Object
 * The object challengeData has 6 properties: score, time, keystrokes, lowestDisplay, displayKeyCommands, avaliable
 * Score is the score for that challenge, if it has not been completed it is set to 0
 * Time is the amount of time that it took to complete the challenge minutes:seconds, if not completed it is set to an overestimate: 100000000:100000000
 * Keystrokes is the keystrokes to complete the challenge
 * lowestDisplay is set based on the visual feedback option for a challenge, 2 is complete visual feedback, 1 is limited visual feedback, and 0 is no visual feedback
 * displayKeyCommands corresponds to the option to show relevant key commands. 1 is showing key commands, 0 is not showing key commands.
 * Avaliable corresponds to if the challenge is unlocked, 1 if it is and 0 if it isn't
 */
function newUser(){
    var newChallenge =  new Object();
    //Each challenge data is an object that will populate the object 
    var challengeData1 = {score: 0, time: "100000000:100000000" , keystrokes: 1000000000, lowestDisplay: 3, displayKeyCommands: 1, avaliable: 1}
    var challengeData2 = {score: 0, time: "100000000:100000000", keystrokes: 1000000000, lowestDisplay: 3, displayKeyCommands: 1, avaliable: 0}
    newChallenge.tables = [challengeData1, challengeData2, challengeData2];
    newChallenge.basic = [challengeData1, challengeData2, challengeData2];
    newChallenge.forms = [challengeData1, challengeData2, challengeData2];
    window.localStorage.setItem('completedChallenges', JSON.stringify(newChallenge));
}


/**
 * Pulls the levels that the user has completed from local storage and sets level.
 * This function is called upon loading the index page.
 * @return {void}
 */
function getPastChallengeData(){
    var level = JSON.parse(window.localStorage.getItem('level'));
    //if the level exists the user has played before and set the level. 
	if(level){
		document.getElementById("level").innerHTML = "Level: " + level;
    }
    //Otherwise set level to 0 (in the HTML it is already set to 0)
	else{
		window.localStorage.setItem('level', JSON.stringify(0));
    }


    //pull past challenge data from local storage
	var pastChallenge = JSON.parse(window.localStorage.getItem('completedChallenges'));
	if(pastChallenge){
        enableLevels(pastChallenge)
	}
	else{
        newUser();
	}
}


/**
 * Sets the challenge number and the category in local storage so that when it goes to the next page it pulls proper content
 * @param  {Int} challengeNumber Number corresponding to the challenge that was selected by the user
 * @param  {String} challengeType The category that the challenge belongs to (basic, table, form)
 * @return {void}  
 */
function setChallenge(challengeNumber, challengeType){
    window.localStorage.setItem('challenge', JSON.stringify(challengeNumber));
    window.localStorage.setItem('type', JSON.stringify(challengeType));
}