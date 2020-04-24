//tracks answer for challenge
var answer = '';
//tracks answer if it is a form
var formAnswer = '';
//ideal keystrokes for the challenge
var idealKeystrokes = 10000000;
//tracks start time
var time = "0:0";
//0 if not started and 1 if started 
var started = 0;


/**
 * Sets the challenge data for basic navigation type.
 * Sets the question, challenge data (html that is displayed in the challenge data area), answer, and ideal keystrokes for the challenge
 * @param  {int} challengeNumber [corresponds to the object number for basic navigation]
 * @return {void} 
 */
function basicData(challengeNumber){
	var code = "";
	var question = "";
	switch(challengeNumber){
		case 0:
			code = `<h1>The Last Five Years Cast for Creekside Theatre</h1>
						<h2>Kyle, Jamie</h2>
							<p>` +
								"This is Kyle's 5th performace at Creekside Theatre. Some past Creekside performances include Guston in Beauty and" + 
								"the Beast, Pippin in Pippin, and Harry the Horse in Guys and Dolls. Other credits of Kyle's include UPS Guy in Legally" +
								"Blonde at the Stewart Dinner Theatre and Don Jon in Much Ado About Nothing at the Colorado Shakespheare Festival. Kyle " +
								"recieved his BFA in theatre from the University of New York. He would like to thank his wife for all of her support." +  
							`</p>
						<h2>Elizebeth, Cathy</h2>
							<p>`+ 
								"This is Elizebeth's first performance at Creekside Theatre. Her past credits include Anita in West Side Story at " +
								"the Prescott, Mrs.Thistletwat in Avenue Q at the Florance Theatre, and ensable in Hairspray at Benton Dinner " +
								"Theatre. She recieved her BFA from Duke. She would like to thank her family and friends.</p>" 
			question = "Where did Elizebeth recieve her BFA?";
			answer = "Duke";
			idealKeystrokes = 10;
			break;
		case 1:
			code = `<a class="skip-main localLink" href="#main_challenge">Skip to main content</a>
					<nav>
						<ul id="challenge_navigation">
							<li class="challenge_nav_item"><a href="#">Nav Item 1</a></li>
							<li class="challenge_nav_item"><a href="#">Nav Item 2</a></li>
							<li class="challenge_nav_item"><a href="#">Nav Item 3</a></li>
							<li class="challenge_nav_item"><a href="#">Nav Item 4</a></li>
						</ul>
					</nav>
					<div id="main_challenge">
						<h1>Dogs</h1>
						<p>Dogs are considered to be man's best friend. They are commen pets in households across America.</p> 
					</div>
				`;
			question = "What is the main headline of this page?";
			answer = "Dogs";
			idealKeystrokes = 7;
			break;
		case 2:
			code = `<h1>Jen Martinez</h1>
					<h5>Contents</h5>
					<ul>
						<li><a href="#childhood" class="localLink">Childhood</a></li>
						<li><a href="#career" class="localLink">Career</a></li>
						<li><a href="#personal" class="localLink">Personal Life</a></li>
					</ul>
					<h2 id='childhood'>Childhood</h2>
					<p>Jen Martinez was born on June 18, 1981. Her parents are Jane and Bill Martinez. She \
					had one brother named Joshua. She spent her childhood in Portland, Oregon. In 1990 her family moved to \
					Buffalo, New York. In 1998 she went to the University of Washington for Computer Science. </p>
					<h2 id='career'>Career</h2>
					<p>Upon graduation Jen began working at IBM. After working on backend development for a while Jen became \
					interested in front-end development. She was able to switch teams at IBM to pursue this intrest. \
					Jen liked her new career and continued getting specialized. She got very interested in accessibility and \
					began to learn more about it. She ended up specializing in accessibility and is still working at IBM.</p>
					<h2>Personal Life</h2>
					<p id='personal'>Jen got married in 2003 to Micheal Tracy. They now have two sons, Griffen and Ethan.  Jen spends a lot of time hiking. \
					She specifically enjoys hiking with her two sons and husband. She also volunteers with the Make a Wish Organinzation. `
			question = "What year did Jen get married?"
			answer = "2003";
			idealKeystrokes = 10;
			break;
	}
	document.getElementById("challengeNum").innerHTML = challengeNumber + 1;
	document.getElementById("main").innerHTML = code;
	document.getElementById("main_instruction").innerHTML = question;
}

/**
 * Sets the challenge data for table navigation type.
 * Sets the question, challenge data (html that is displayed in the challenge data area), answer, and ideal keystrokes for the challenge
 * @param  {int} challengeNumber corresponds to the object number for table navigation
 * @return {void} 
 */
function tableData(challengeNumber){
	var code="";
	var question = "";
	switch(challengeNumber){
		case 0:
			code = `<table>
						<tr>
							<th>Firstname</th>
							<th>Lastname</th>
							<th>Age</th>
						</tr>
						<tr>
							<td>Jill</td>
							<td>Smith</td>
							<td>50</td>
						</tr>
						<tr>
							<td>Amy</td>
							<td>Jackson</td>
							<td>94</td>
						</tr>
						<tr>
							<td>Mary</td>
							<td>Stewart</td>
							<td>38</td>
						</tr>
						<tr>
							<td>Sarah</td>
							<td>Hill</td>
							<td>42</td>
						</tr>
					</table>`;
			question ="How old is Sarah?"
			answer = "42";
			idealKeystrokes = 10;
			break;
		case 1:
			code = `<table>
						<tr>
							<th>Class</th>
							<th>Section</th>
							<th>Room</th>
							<th>Start Time</th>
							<th>End Time</th>
						</tr>
						<tr>
							<th>Bio 100</th>
							<td>1</td>
							<td>116</td>
							<td>10:00</td>
							<td>11:00</td>
						</tr>
						<tr>
							<th>Bio 100</th>
							<td>2</td>
							<td>140</td>
							<td>1:00</td>
							<td>2:00</td>
						</tr>
						<tr>
							<th>Bio 205</th>
							<td>1</td>
							<td>1B20</td>
							<td>5:00</td>
							<td>6:30</td>
						</tr>
						<tr>
							<th>Bio 205</th>
							<td>2</td>
							<td>116</td>
							<td>2:00</td>
							<td>3:30</td>
						</tr>
						<tr>
							<th>Bio 310</th>
							<td>1</td>
							<td>1B20</td>
							<td>8:00</td>
							<td>10:00</td>
							</tr>
						</table>` 
			question = "What room is Bio 205, section 2 in?"
			answer = "116";
			break;
		case 2:
			code = `<table>
						<tr>
							<th colspan='2'>Home</th>
							<th colspan='2'>Away</th>
						</tr>
						<tr>
							<th>Player</th>
							<th>Points Scored</th>
							<th>Player</th>
							<th>Points Scored</th>
						</tr>
						<tr>
							<td>James</td>
							<td>2</td>
							<td>Lucy</td>
							<td>5</td>
						</tr>
						<tr>
							<td>Elizebeth</td>
							<td>1</td>
							<td>Mike</td>
							<td>0</td>
						</tr>
						</table>`;
			question = "Which team scored more?";
			answer = "Away";
			break;

		default:
			alert("Something went wrong. Nothing loaded.")
	}
	document.getElementById("challengeNum").innerHTML = challengeNumber + 1;
	document.getElementById("main").innerHTML = code;
	document.getElementById("main_instruction").innerHTML = question;
}

/**
 * Sets the challenge data for form navigation type.
 * Sets the question, challenge data (html that is displayed in the challenge data area), form answer, and ideal keystrokes for the challenge
 * Note: Question in this situation is actually insturctitons
 * Note: Answer is an array that corresponds to what the user should enter 
 * @param  {int} challengeNumber corresponds to the object number for form navigation
 * @return {void} 
 */
function formData(challengeNumber){
	var code="";
	var question = "";
	switch(challengeNumber){
		case 0:
			code = `<form>
						<label for='textfield1' >First Name: </label>
						<br>
						<input type='text' name='textfield1' id='textfield1' class='formField'>
						<br>
						<label for='textfield2'>Last Name: </label>
						<br>
						<input type='text' name='textfield2' id='textfield2' class='formField'>
						<br>
						<input id='challengeSubmit' type='submit' value='Submit' onclick="return formSetCompletionData()">
					</form>`
			question ="Your name is Matt Nelson"
			formAnswer = ["Matt", "Nelson"]
			break;
		case 1:
			code = 	`<form>
						<h2>Emotion Tracker</h2>
						<label for='name'>Name:</label><input type='text' id='name' name='name' class='formField'>
						<br>
						<label for='name'>Date (mm/dd/yy): </label>
						<input type='text' id='date' name='date' placeholder='mm/dd/yy' class='formField'>
						<br>
						<h5>What emotions are you experiencing</h5>
						<input type='checkbox' id='emotion1' name='emotion' value='Joy' class='selectType'>
						<label for='emotion1' class='selectTypeLabel'>Joy</label><br><input type='checkbox' id='emotion2' name='emotion' value='Sadness' class='selectType'>
						<label for='emotion2'>Sadness</label>
						<br>
						<input type='checkbox' id='emotion3' name='emotion' value='Anger' class='selectType'>
						<label for='emotion3'>Anger</label><br><input type='checkbox' id='emotion4' name='emotion' value='Fear' class='selectType'>
						<label for='emotion4'>Fear</label>
						<br>
						<input type='checkbox' id='emotion5' name='emotion' value='Disgust' class='selectType'>
						<label for='emotion5'>Disgust</label>
						<br>
						<input id='challengeSubmit' type='submit' value='Submit'  onclick="return formSetCompletionData()"onclick='formCheckAnswer()'>
					</form>` 
			question = "On 03/06/2020 Ava Smith was feeling sad and scared"
			formAnswer = ["Ava Smith", "03/06/2020", 'Sadness', 'Fear'];
			break;
		case 2:
			code = `<form>
						<h2>Find something to watch!</h2>
						<h5>What streaming services do you have?</h5>
						<input type='checkbox' id='service1' name='service' value='Netflix' class='formField'>
						<label for='service1'>Netflix</label>
						<br>
						<input type='checkbox' id='service2' name='service' value='Hulu' class='formField'>
						<label for='service2'>Hulu</label>
						<br>
						<input type='checkbox' id='service3' name='service' value='HBO' class='formField'>
						<label for= 'service3'>HBO</label>
						<br>
						<h5>Movie or TV show?</h5>
						<input type='radio' id='tv' name='showType' value='tv'>
						<label for='tv'>TV Show</label>
						<br>
						<input type='radio' id='movie' name='showType' value='movie' class='formField'>
						<label for='female'>Movie</label>
						<br>
						<input type='radio' id='both' name='showType' value='both' class='formField'>
						<label for='both'>Both</label>
						<br>
						<h5>Genre</h5>
						<select id='genere'>
							<option value='all'>All Genres</option>
							<option value='comedy'>Comedy</option>
							<option value='drama'>Drama</option>
							<option value='scifi'>Sci-Fi</option>
							<option value='documentary'>Documentary</option>
							<option value='horror'>Horror</option>
						</select>
						<br>
						<input type='submit' value='Submit'  onclick="return formSetCompletionData()">
					</form>`;
			question = "You are wanting to watch a Sci-Fi movie on either Netflix or HBO";
			formAnswer = ['Netflix', 'HBO', 'movie', 'scifi'];
			break;

		default:
			alert("Something went wrong. Nothing loaded.")
	}
	document.getElementById("challengeNum").innerHTML = challengeNumber + 1;
	document.getElementById("main").innerHTML = code;
	document.getElementById("main_instruction").innerHTML = question;
}


/**
 * Get the challenge number from local storage and based upon challenge number and challenge type call proper function to populate content
 * Also check if it is the first time that the user is using the application and if it is have the instructions pop-up
 * @param  {string} type corresponds to the challenge type: basicNav (basic navigation), table, form
 * @return {void} 
 */
function getData(type){
	const challenge = JSON.parse(window.localStorage.getItem('challenge'));
	switch(type){
		case "basicNav":
			basicData(challenge);
			break;
		case "table":
			tableData(challenge);
			break;
		case "form":
			formData(challenge);
			break;

	}
	//if the variable firstTime doesn't exist in local storage it is the user's first time so present instructions and set firstTime in local storage
	if(!(JSON.parse(window.localStorage.getItem('firstTime')))){
		document.getElementById("outerPopUp").style.display = 'block';
		window.localStorage.setItem('firstTime', JSON.stringify(1));
	}
}


/**
 * Get the time that the user started the challenge at 
 * This function is called when the user presses start
 * @return {void} 
 */
function timer() {
	started = 1;
    time = new Date();
}


/**
 * Checks the answer for basic navigation and tables. If the answer is wrong it sets answer in local storage to 2, otherwise it sets answer in local storage to 1 
 * This function also triggers a pop-up if a user tries to submit before even starting a challenge
 * @return {bool} Return false user did not start challenge, otherwise return true 
 */
function checkAnswer(){
	if(started == 0 || document.getElementById("keystorkes").innerHTML == 0 || document.getElementById("keystorkes").innerHTML == '0'){
		document.getElementById("outerPopUp").style.display = 'block';
		document.getElementById("popupContent").innerHTML = `Remember to start the challenge and navigate through the challenge content before submitting! `;
		return false;
	}
	if(document.getElementById("answerInput").value == answer){
		window.localStorage.setItem('answer', JSON.stringify(1));
	}
	else{
		window.localStorage.setItem('answer', JSON.stringify(2));
	}
	return true;
}

/**
 * Trim the seconds to be less then 60 and to correspond to the time that was taken to complete the challenge since minutes is already considered
 * @param  {int} elapsed is the total number of seconds
 * @return {int}  Seconds based off of minutes already considered 
 */
function TrimSeconds(elapsed) {
    if (elapsed >= 60)
        return TrimSeconds(elapsed - 60);
    return elapsed;
}


/**
 * Calculates the amount of time that is taken to complete the challenge
 * @return {string} A string of the minutes and seconds taken to complete the challenge in the format minnutes:seconds 
 */
function calculateTime(){
	time = new Date() - time;
	var seconds = Math.round(time / 1000);
	var minutes = Math.round(seconds / 60)
	var sec = TrimSeconds(seconds);
	return minutes + ':' + sec;
}


/**
 * Sets data to move to completion page and triggers the move to the completion page 
 * Calls function to check answer and to calculate time
 * Sets time, keystrokes, and ideal keystrokes in local storage to be used in the completion page
 * @return {void} 
 */
function setCompletedData(){
	if(!checkAnswer()){
		return true;
	}
	var t = calculateTime()
	window.localStorage.setItem('time', JSON.stringify(t));
	window.localStorage.setItem('keyStrokes', JSON.stringify(document.getElementById("keystorkes").innerHTML));
	window.localStorage.setItem('idealKeystrokes', JSON.stringify(idealKeystrokes));
	window.location='complete.html';
	return false;
}

/**
 * Runs through the form in the challenge data and makes sure that it properly corresponds to the what should have been entered
 * Populates userAnswer with what the user entered and then compare it to what was supposed to be entered
 * @return {void} 
 */
function formCheckAnswer(){
	const forms = document.getElementById("main").querySelectorAll("form");
	const children = forms[0].childNodes;
	var userAnswer = [];
	//loop through all of the children element of the form tag
	for (var i=0; i < children.length; i++){
		//only pay attention to input and select not the submit button
		if(children[i].localName == "input" && children[i].value!= "Submit" || children[i].localName == "select"){
			//if it is a checkbox or radio check the checked property, only add if it is true
			if(children[i].type == 'checkbox' || children[i].type == 'radio'){
				if(children[i].checked == true){
					userAnswer.push(children[i].value)
				}
			}
			//otherwise add the value to user answer
			else{
				userAnswer.push(children[i].value)
			}
		}
	}
	//ensure that the answer and user answer is the same length
	if(userAnswer.length == formAnswer.length){
		var correct = true;
		//loop through and change correct to false if some do not match
		for(var i=0; i < formAnswer.length; i++){
			if(userAnswer[i] != formAnswer[i]){
				window.localStorage.setItem('answer', JSON.stringify(2));
				correct = false;
				break;
			}
		}
		if(correct){
			window.localStorage.setItem('answer', JSON.stringify(1));
		}
	}
	else{
		window.localStorage.setItem('answer', JSON.stringify(2));
	}
}

/**
 * Makes sure that the challenge has been started, otherwise triggers a popup
 * Calls function to check answer, to calculate time, sets time, keystrokes, and ideal keystrokes in local storage
 * Called when user presses the submit button in the challenge form
 * @return {void} 
 */
function formSetCompletionData(){
	if(started == 0){
		document.getElementById("outerPopUp").style.display = 'block';
		document.getElementById("popupContent").innerHTML = `Remember to start the challenge and navigate through the challenge content before submitting! `;
		return;
	}
	formCheckAnswer()
	var t = calculateTime()
	window.localStorage.setItem('time', JSON.stringify(t));
	window.localStorage.setItem('keyStrokes', JSON.stringify(document.getElementById("keystorkes").innerHTML));
	window.localStorage.setItem('idealKeystrokes', JSON.stringify(idealKeystrokes));
	window.location='complete.html';
	return false;
}


/**
 * Opens a popup which is populated with an instruction message
 * @param  {int} content 1 means that it was the page wide help button, 2 means that it was the visual feedback help button, None means it is from the index page
 * @return {bool}  Return false to keep page from resubmitting for 2
 */
function openPopup(content){
	document.getElementById("outerPopUp").style.display = 'block';
	if(content == 1){
		document.getElementById("popupContent").innerHTML = `Your goal is to answer the challenge question using the submit field. You will find the answer in 
        the blacked out area after pressing start and using the key commands. Remember you can customize your experience using using the menus
        on the left`;
	}
	else if(content == 2){
		document.getElementById("popupContent").innerHTML = `This section controls the amount of visual feedback you recieve while navigating the challenge content.<br><br>
		<span style="margin-top: 24px"><b>No visual feedback:</b> You will only recieve audio feedback <br>
		<b>Limited visual feedback:</b> You will be able to see the content that is being read.<br>
		<b>Complete visula feedback:</b> Youwill be able to see all content and a border will appear around what is read.</span>`;
		return false;
	}
}

/**
 * Close the pop-up
 * @return {void}  
 */
function closePopup(){
	document.getElementById("outerPopUp").style.display = 'none';
}

/**
 * Called when a click occurs. Check to make sure that the click did not have the intention of opening pop-up. If not close pop-up
 * @param  {event} event  is the total number of seconds
 * @return {void} 
 */
window .onclick = function(event) {
	if(!event.target.matches("#CompletedPopup") && !event.target.matches("#index_help_button") && 
	!event.target.matches(".fa-question-circle") && !event.target.matches("submit") && !document.activeElement == document.getElementById("answerInput")
	 && document.getElementById("outerPopUp").style.display == 'block'){
		this.closePopup()
	}
}