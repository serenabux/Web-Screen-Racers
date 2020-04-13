var answer = '';
var formAnswer = '';
var idealKeystrokes = 10000000;


function setStars(score, id){
	var best_stars = "";
	for(var i=0; i < score; i++){
			best_stars += "&#9733;"
	}for(var i=0; i < 5-score; i++){
			best_stars += "&#9734"
	}
	document.getElementById(id).classList.remove('margin-bottom-24');
	document.getElementById(id+'-star').innerHTML = best_stars;
}

function getPastChallengeData(){
	var level = JSON.parse(window.localStorage.getItem('level'));
	if(level){
		document.getElementById("level").innerHTML = "Level: " + level;
	}
	else{
		window.localStorage.setItem('level', JSON.stringify(0));
	}
	var pastChallenge = JSON.parse(window.localStorage.getItem('completedChallenges'));
	if(pastChallenge){
		var id = "";	
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
		for (var i=0; i<pastChallenge.tables.length; i++){
			if(pastChallenge.tables[i].avaliable == 1){
				id = "tables" + i;
				document.getElementById(id).classList.remove("disabled");
				document.getElementById(id).classList.add("challenge");
				if(pastChallenge.tables[i].score > 0){
					setStars(pastChallenge.tables[i].score, id);
				}
			}
		}
		for (var i=0; i<pastChallenge.forms.length; i++){
			if(pastChallenge.forms[i].avaliable == 1){
				id = "forms" + i;
				document.getElementById(id).classList.remove("disabled");
				document.getElementById(id).classList.add("challenge");
				if(pastChallenge.forms[i].score > 0){
					setStars(pastChallenge.forms[i].score, id);
				}
			}
		}
	}
	else{
		var newChallenge =  new Object();
		var challengeData1 = {score: 0, time: 100000000, keystrokes: 1000000000, lowestDisplay: 3, displayKeyCommands: 1, avaliable: 1}
		var challengeData2 = {score: 0, time: 100000000, keystrokes: 1000000000, lowestDisplay: 3, displayKeyCommands: 1, avaliable: 0}
		newChallenge.tables = [challengeData1, challengeData2, challengeData2];
		newChallenge.basic = [challengeData1, challengeData2, challengeData2];
		newChallenge.forms = [challengeData1, challengeData2, challengeData2];
		window.localStorage.setItem('completedChallenges', JSON.stringify(newChallenge));
	}
}

function basicData(challengeNumber){
	var code = "";
	var question = "";
	switch(challengeNumber){
		case 0:
			code = `<h1>The Last Five Years Cast for Creekside Theatre</h1>
						<h2>Kyle, Jamie</h2>
							<p>This is Kyle's 5th performace at Creekside Theatre. Some past Creekside performances include Guston in Beauty and 
							the Beast, Pippin in Pippin, and Harry the Horse in Guys and Dolls. Other credits of Kyle's include UPS Guy in Legally
							Blonde at the Stewart Dinner Theatre and Don Jon in Much Ado About Nothing at the Colorado Shakespheare Festival. Kyle 
							recieved his BFA in theatre from the University of New York. He would like to thank his wife for all of her support.
							</p>
						<h2>Elizebeth, Cathy</h2>
							<p>This is Elizebeth's first performance at Creekside Theatre. Her past credits include Anita in West Side Story at
							the Prescott, Mrs.Thistletwat in Avenue Q at the Florance Theatre, and ensable in Hairspray at Benton Dinner Theatre. 
							She recieved her BFA from Duke. She would like to thank her family and friends.</p>
			`
			question = "Where did Elizebeth recieve her BFA?";
			answer = "Duke";
			break;
		case 1:
			code = `<a class="skip-main" href="#main_challenge">Skip to main content</a>
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
			break;
		case 2:
			code = `<h1>Jen Martinez</h1>
					<h5>Contents</h5>
					<ul>
						<li><a href="">Childhood</a></li>
						<li><a href="">Career</a></li>
						<li><a href="">Personal Life</a></li>
					</ul>
					<h2 id='childhood'>Childhood</h2>
					<p>Jen Martinez was born on June 18, 1981. Her parents are Jane and Bill Martinez. She
					had one brother named Joshua. She spent her childhood in Portland, Oregon. In 1990 her family moved to 
					Buffalo, New York. In 1998 she went to the University of Washington for Computer Science. </p>
					<h2 id='career'>Career</h2>
					<p>Upon graduation Jen began working at IBM. After working on backend development for a while Jen became 
					interested in front-end development. She was able to switch teams at IBM to pursue this intrest. 
					Jen liked her new career and continued getting specialized. She got very interested in accessibility and 
					began to learn more about it. She ended up specializing in accessibility and is still working at IBM.</p>
					<h2>Personal Life</h2>
					<p id='personal'>Jen got married in 2003 to Micheal Tracy. They now have two sons, Griffen and Ethan.  Jen spends a lot of time hiking. 
					She specifically enjoys hiking with her two sons and husband. She also volunteers with the Make a Wish Organinzation. `
			question = "What organization does Jen volunteer for in her free time?"
			answer = "Make a Wish";
			break;
	}
	document.getElementById("challengeNum").innerHTML = challengeNumber + 1;
	document.getElementById("main").innerHTML = code;
	document.getElementById("main_instruction").innerHTML = question;
}


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
						<input id='challengeSubmit' type='submit' value='Submit' onclick="return stopPython(), formCheckAnswer()">
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
						<input id='challengeSubmit' type='submit' value='Submit'  onclick="return stopPython(), formCheckAnswer()"onclick='formCheckAnswer()'>
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
						<input type='submit' value='Submit'  onclick="return stopPython(), formCheckAnswer()">
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
}

function setChallenge(challengeNumber, challengeType){
  window.localStorage.setItem('challenge', JSON.stringify(challengeNumber));
  window.localStorage.setItem('type', JSON.stringify(challengeType));
  window.localStorage.setItem('idealKeystrokes', JSON.stringify(idealKeystrokes));
}


function checkAnswer(){
	if(document.getElementById("answerInput").value == answer){
		window.localStorage.setItem('answer', JSON.stringify(1));
	}
	else{
		window.localStorage.setItem('answer', JSON.stringify(2));
	}
	window.localStorage.setItem('keyStrokes', JSON.stringify(document.getElementById("keystorkes").innerHTML));
	window.location='complete.html';
}

function formCheckAnswer(){
	console.log("called!")
	const forms = document.getElementById("main").querySelectorAll("form");
	const children = forms[0].childNodes;
	var userAnswer = [];
	for (var i=0; i < children.length; i++){
		if(children[i].localName == "input" && children[i].value!= "Submit" || children[i].localName == "select"){
			if(children[i].type == 'checkbox' || children[i].type == 'radio'){
				if(children[i].checked == true){
					userAnswer.push(children[i].value)
				}
			}
			else{
				userAnswer.push(children[i].value)
			}
		}
	}
	if(userAnswer.length == formAnswer.length){
		var correct = true;
		for(var i=0; i < formAnswer.length; i++){
			if(userAnswer[i] != formAnswer[i]){
				window.localStorage.setItem('answer', JSON.stringify(0));
				correct = false;
			}
		}
		if(correct){
			window.localStorage.setItem('answer', JSON.stringify(1));
		}
	}
	else{
		window.localStorage.setItem('answer', JSON.stringify(0));
	}
	window.location='complete.html';
	return false;
}