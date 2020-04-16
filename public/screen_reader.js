var elements;
var elementsIndex = -1;
var numberOfElements;
var showRead = 0;
var currentElement = document.getElementById("main");
var started = false;
var keystrokes = 0;
var shownElements = [];
var synth = window.speechSynthesis;
var paragraphIndex = 0;
var score = 5;
window.localStorage.setItem('score', JSON.stringify(score));
var lowestDisplay = 0;
window.localStorage.setItem('lowestDisplay', JSON.stringify(0));
var displayKeyCommands = 0;
window.localStorage.setItem('displayKeyCommands', JSON.stringify(0));
let keysPressed = {};
var completeVisual = 0;


function start() {
    started = true;
  }

function deepFirstSearch(node,nodeList) {  
    if (node) {    
        nodeList.push(node);    
        var children = node.children;    
        for (var i = 0; i < children.length; i++) 
        //Each recursion passes down the traversed nodes and the array stored by the nodes
        deepFirstSearch(children[i],nodeList);    
    }    
    return nodeList; 
} 

function getElements(){
    elements = deepFirstSearch(document.getElementById("main"), nodeList = []);
    console.log(elements);
    numberOfElements = elements.length;
}

function speak(text){
    synth.speak(new SpeechSynthesisUtterance(text));
}

function callProperType(direction){
    switch(elements[elementsIndex].localName){
        case "a":{
            speak("link, " + elements[elementsIndex].innerHTML);
            elements[elementsIndex].focus();
            break;
        }
        case "button":{
            speak("button, " + element[elementsIndex].innerHTML);
            elements[elementsIndex].focus();
            break;
        }
        case "li":{
            if(elements[elementsIndex].children.length > 0){
                if(direction == -1){
                    elementsIndex -= 1;
                    callProperType()
                }
                elementsIndex += 1;
                callProperType();
                return;
            }
            else{
                speak("Item: " + elements[elementsIndex].innerHTML);
            }
        }

        case "h1":{
            speak("heading level 1" + elements[elementsIndex].innerHTML);
            break;
        }
        case "h2":{
            speak("heading level 2" + elements[elementsIndex].innerHTML);
            break;
        }
        case "h3":{
            speak("heading level 3" + elements[elementsIndex].innerHTML);
            break;
        }
        case "h4":{
            speak("heading level 4" + elements[elementsIndex].innerHTML);
            break;
        }
        case "h5":{
            speak("heading level 5" + elements[elementsIndex].innerHTML);
            break;
        }
        case "h6":{
            speak("heading level 6" + elements[elementsIndex].innerHTML);
            break;
        }
        case "ul":{
            var numChildren = elements[elementsIndex].children.length;
            speak("list with " + numChildren + " items");
            elementsIndex += 1;
            callProperType();
        }
        default:{
            speak(elements[elementsIndex.innerHTML])
        }
    }
    if(showRead){
        elements[elementsIndex].style.backgroundColor = "#ffffff";
        shownElements.push(elements[elementsIndex])
    }
    if(completeVisual){
        elements[elementsIndex].style.border = "thick solid #FF0000";
        shownElements.push(elements[elementsIndex])
    }
}


function paragraphNext(){
    if(showRead){
        currentElement.style.backgroundColor = '#ffffff';
        shownElements.push(currentElement)
    }
    if(completeVisual){
        elements[elementsIndex].style.border = "thick solid #FF0000";
        shownElements.push(elements[elementsIndex])
    }
    if(currentElement.innerHTML.length - paragraphIndex > 99){
        var str = currentElement.innerHTML.substr(paragraphIndex, (99 + paragraphIndex));
        var wordIndex = str.lastIndexOf(" ");
        speak(str.substr(0, wordIndex));
        paragraphIndex = wordIndex + 1 + paragraphIndex;
    }
    else{
        speak(currentElement.innerHTML.substr(paragraphIndex, currentElement.innerHTML.length));
        paragraphIndex = 0;
    }
}

function paragraphLast(){
    if(showRead){
        currentElement.style.backgroundColor = '#ffffff';
        shownElements.push(currentElement)
    }
    if(completeVisual){
        elements[elementsIndex].style.border = "thick solid #FF0000";
        shownElements.push(elements[elementsIndex])
    }
    if(paragraphIndex - 99 > 0){
        var str = currentElement.innerHTML.substr(paragraphIndex - 99, paragraphIndex)
        var wordIndex = str.indexOf(" ");
        speak(str.substr(wordIndex, paragraphIndex))
        paragraphIndex = paragraphIndex - 99 + wordIndex;
    }
    else{
        speak(currentElement.innerHTML.substr(paragraphIndex, currentElement.innerHTML.length));
        paragraphIndex = 0;
    }
}

function heading(direction){
   var currentIndex = elementsIndex;
   if(elementsIndex < numberOfElements - 1 || elementsIndex > 0){
        elementsIndex += direction;
    }
    else{
        speak("No more content");
        elementsIndex = numberOfElements;
        return;
    }
    while(elements[elementsIndex].localName[0] != 'h' && (elements[elementsIndex].localName[1] != 1 
        || elements[elementsIndex].localName[1] != 2 || elements[elementsIndex].localName[1] != 3 
        || elements[elementsIndex].localName[1] != 4 || elements[elementsIndex].localName[1] != 5 
        || elements[elementsIndex].localName[1] != 6 ))
    {
       elementsIndex += direction;
        if(elementsIndex == numberOfElements || elementsIndex < 0){
            speak("No more headings");
            elementsIndex = currentIndex;
            return;
        }
   }
   currentElement = elements[elementsIndex]
   currentElement.focus()
   speak("Heading level " + elements[elementsIndex].localName[1] + ", "+ elements[elementsIndex].innerHTML);
   if(showRead){
    elements[elementsIndex].style.backgroundColor = "#ffffff";
    shownElements.push(elements[elementsIndex])
   }
   if(completeVisual){
    elements[elementsIndex].style.border = "thick solid #FF0000";
    shownElements.push(elements[elementsIndex])
}
}

function nav(){
    speak("Navigation landmark,");
    if(elements[(elementsIndex + 1)].localName == "ul"){
        elementsIndex += 2;
        speak("list");
    }
    var numChildren = elements[elementsIndex].children.length;
    speak(" with " + numChildren + " items, ")
    callProperType()
}

function followLink(){
    if(elements[elementsIndex].classList.contains('localLink')){
        var currentIndex = elementsIndex;
        var idName = elements[currentIndex].hash.substring(1);
        while(elements[elementsIndex].id != idName){
            elementsIndex += 1;
            if(elementsIndex == numberOfElements){
                elementsIndex = 0;
            }
            if(elementsIndex == currentIndex){
                return;
            }
        }
        if(elements[elementsIndex].localName == 'div'){
            elementsIndex += 1;
        }
        callProperType();
    }
}

function nextElement(){
    if(paragraphIndex == 0){
        if(elementsIndex < numberOfElements - 1){
            elementsIndex += 1;
        }
        else{
            speak("No more content");
            elementsIndex = numberOfElements;
            return;
        }
        while(elements[elementsIndex].localName == "div"){
            elementsIndex += 1;
            if(elementsIndex == numberOfElements){
                speak("No more content");
                elementsIndex = numberOfElements;
                return;
            }
        }
        currentElement = elements[elementsIndex];
        if(currentElement.localName == "p"){
            paragraphNext()
        }
        else if(currentElement.localName == "nav"){
            nav();
        }
        else{
            currentElement.focus();
            callProperType();
        }
    }
    else{
        paragraphNext()
    }
}

function previousElement(){
    if(paragraphIndex == 0){
        if(elementsIndex > 0){
            elementsIndex -= 1;
        }
        else{
            speak("No more content");
            elementsIndex = -1;
            return;
        }
        while(elements[elementsIndex].localName == "div" || elements[elementsIndex].localName =="ul"){
            elementsIndex -= 1;
            if(elementsIndex < 0){
                elementsIndex = -1;
                speak("No more content");
                return;
            }
        }
        currentElement = elements[elementsIndex];
        if(currentElement.localName == 'p'){
            paragraphIndex = currentElement.innerHTML.length - 1;
            paragraphLast();
        }
        callProperType(-1)
    }
    else{
        paragraphLast()
    }
}

function tabKey(direction){
    var currentIndex = elementsIndex;
    if(currentIndex == -1){
        currentIndex = 0;
    }
    if((elementsIndex + direction) < numberOfElements && (elementsIndex + direction) > -1){
         elementsIndex += direction;
     }
     else{
         speak("No more content");
         elementsIndex = numberOfElements;
         return;
     }
     while(elements[elementsIndex].localName != "button" && elements[elementsIndex].localName != "a" &&
     elements[elementsIndex].localName != "input" && elements[elementsIndex].localName != "textarea" && elements[elementsIndex].localName != "selector")
     {
        elementsIndex += direction;
        if(elementsIndex == numberOfElements){
             elementsIndex = 0;
        }
        else if(elementsIndex < 0){
            elementsIndex = numberOfElements - 1;
        }
        if(elementsIndex == currentIndex){
            speak("No tabbable content");
            if(elementsIndex == 0){
                elementsIndex = -1;
            }
            return;
        }
    }
    currentElement = elements[elementsIndex]
    currentElement.focus
    callProperType();
}

function getNextOccurance(direction, tag){
    var currentIndex = elementsIndex;
    var type = tag;
    switch(tag){
        case 'a':{
            type = 'link';
            break;
        }
    }
    if(elementsIndex < numberOfElements - 1 || elementsIndex > 0){
         elementsIndex += direction;
     }
     else{
         speak("No more content");
         elementsIndex = numberOfElements;
         return;
     }
     while(elements[elementsIndex].localName != tag){
        elementsIndex += direction;
        if(elementsIndex == numberOfElements || elementsIndex < 0){
            speak("No more " + type +"s");
            elementsIndex = currentIndex;
            return;
        }
     }
     callProperType();
}

var map = {}; // You could also use an array

onkeydown = onkeyup = function(e){
    e = e || event; // to deal with IE
    map[e.keyCode] = e.type == 'keydown';
    if(started && e.type == 'keydown'){
        synth.cancel();
        keystrokes += 1;
        if(showRead && elementsIndex > 0 && elementsIndex < numberOfElements){
            console.log(elements[elementsIndex])
            elements[elementsIndex].style.backgroundColor = "#000000";
        }
        if(completeVisual && elementsIndex > 0 && elementsIndex < numberOfElements){
            elements[elementsIndex].style.border = 'none';
        }
        document.getElementById("keystorkes").innerHTML = keystrokes;
        if(map['9']  && map['16']){
            //shift + tab
            tabKey(-1);
            e.preventDefault();
        }
        else if (map['16'] && map['72']){
            heading(-1)
        }
        else if(map['16'] && map['75']){
            //shift + k
            getNextOccurance(-1,'a')
            
        }
        else if(map['9']){
            //tab
            tabKey(1);
            e.preventDefault();
        }
        else if(map['13']){
            //enter key
            if(elementsIndex > -1 && elementsIndex < numberOfElements && elements[elementsIndex].localName == 'a'){
                followLink();
            }
            if(document.activeElement == document.getElementById("answerInput") || document.activeElement == document.getElementById("submit")){
                document.getElementById("submit").click();
            }
        }
        else if(map['16']){
            //shift
        }
        else if(map['17']){
            //cntrl
        }
        else if(map['18']){
            //alt
        }
        else if(map['20']){
            //caps lock
        }
        else if(map['49']){
            //1
        }
        else if(map['50']){
            //2
        }
        else if(map['51']){
            //3
        }
        else if(map['52']){
            //4
        }
        else if(map['53']){
            //5
        }
        else if(map['55']){
            //6
        }
        else if (map['38']) {
            //up arrow
            previousElement();
        }
        else if (map['40']) {
            //down arrow
            nextElement();
        }
        else if (map['37']) {
        // left arrow
        }
        else if (map['39']) {
        // right arrow
        }
        else if (map['72']){
            //h key
            heading(1)
        }
        else if (map['75']){
            //k key
            getNextOccurance(1, 'a')
        }
        else if (map['84']){
            //t key
        }
    }
    else if(map['13']){
        //enter key
        if(elementsIndex > -1 && elementsIndex < numberOfElements && elements[elementsIndex].localName == 'a'){
            followLink();
        }
        if(document.activeElement == document.getElementById("answerInput") || document.activeElement == document.getElementById("submit")){
            document.getElementById("submit").click();
        }
    }
}


function setShowRead(type){
    switch(type){
        case "showRead":{
            showRead = 1;
            completeVisual = 0;
            document.getElementById("main").style.backgroundColor = "#000000";
            for(var i=0; i < shownElements.length; i++){
                shownElements[i].style.backgroundColor = "#000000"
            }
            if(lowestDisplay == 0){
                score -= 1;
                lowestDisplay = 1;
            }
            break;
        }
        case "showAll":{
            showRead = 0;
            document.getElementById("main").style.backgroundColor = "#ffffff";
            for(var i=0; i < shownElements.length; i++){
                shownElements[i].style.backgroundColor = "#ffffff"
            }
            score = score - (2 - lowestDisplay);
            lowestDisplay = 2;
            completeVisual = 1;
            break;
        }
        case "black":{
            showRead = 0;
            completeVisual = 0;
            document.getElementById("main").style.backgroundColor = "#000000";
            for(var i=0; i < shownElements.length; i++){
                shownElements[i].style.backgroundColor = "#000000"
            }
            break;
        }
    }
    window.localStorage.setItem('score', JSON.stringify(score));
    window.localStorage.setItem('lowestDisplay', JSON.stringify(lowestDisplay));
}

function showCommands(){
    if(document.getElementById('showCommands').innerHTML == 'Show Useful Key Commands'){
        document.getElementById('keyCommands').style.display = 'inline';
        document.getElementById('showCommands').innerHTML = 'Hide Key Commands';
        if(displayKeyCommands == 0){
            score -= 1;
            displayKeyCommands = 1;
            window.localStorage.setItem('score', JSON.stringify(score));
            window.localStorage.setItem('displayKeyCommands', JSON.stringify(displayKeyCommands));
        }
    }
    else{
        document.getElementById('keyCommands').style.display = 'none';
        document.getElementById('showCommands').innerHTML = 'Show Useful Key Commands';

    }
  }