var elements;
var elementsIndex = -1;
var numberOfElements;
var showRead = 0;
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
//used to store keystroks
var map = {}; 

/**
 * Enables the screen reader to work when key commands are used and reads the first element that is present in the challenge area
 * @return {void} 
 */
function start() {
    started = true;
    nextElement();
}

/**
 * Perform a depth first search on the elements that exist in the challenge section in order produce a list of all 
 * elements in order including children. This list is iterated through to mimic a screen reader.
 * @param  {DOM Object} node Current node that is being visited 
 * @param {array of DOM Objects} nodeList List of DOM Objects that the search has visited 
 * @return {array of DOM Objects} Complete list of nodes, inlcuding children nodes that the exist in the challenge area 
 */
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

/**
 * Set elements which is the list of all elements in order and set the total number of elements present
 * @return {void} 
 */
function getElements(){
    elements = deepFirstSearch(document.getElementById("main"), nodeList = []);
    numberOfElements = elements.length;
}

/**
 * Speaks the text using the voice syntesizer api 
 * @param  {string} text The text corresponding to what the screen reader would say
 * @return {void} 
 */
function speak(text){
    synth.speak(new SpeechSynthesisUtterance(text));
}

/**
 * Updates the css for elements based on the chosen visual feedback option
 * @return {void} 
 */
function setVisualFeedback(){
    //Change the background for the element being read to white
    if(showRead){
        elements[elementsIndex].style.backgroundColor = "#ffffff";
        shownElements.push(elements[elementsIndex])
    }
    //Put a red border around the element being read
    if(completeVisual){
        elements[elementsIndex].style.border = "thick solid #FF0000";
        shownElements.push(elements[elementsIndex])
    }
}

/**
 * Deal with a list element by going to the next element if the list has children. 
 * So if progressing down the page go to the child but otherwise it means the child has already been read
 * If no children read the inner html
 * @param {int} direction 1 if navigating down page, -1 if navigating up the page 
 * @return {void} 
 */
function li(direction){
    if(elements[elementsIndex].children.length > 0){
        elementsIndex += direction;
        callProperType(direction)
    }
    else{
        speak("Item: " + elements[elementsIndex].innerHTML);
    }
}


/**
 * Deal with ul element by speaking it is a list with so many children then going to the next element.
 * @param  {int} direction 1 if navigating down page, -1 if navigating up the page
 * @return {void} 
 */
function ul(direction){
    var numChildren = elements[elementsIndex].children.length;
    if(direction == -1){
        speak("exiting list with " + numChildren + " items");
    }
    else{
        speak("list with " + numChildren + " items");
    }
    elements += direction;
    callProperType(direction);
}


/**
 * Deal with nav element by going to the next element in the direction the user is navigating 
 * @param  {int} direction 1 if navigating down page, -1 if navigating up the page
 * @return {void} 
 */
function nav(){
    if(direction == 1){
        speak("Navigation Landmark,");
    }
    else{
        speak("Exiting Navigation Landmark")
    }
    elementsIndex += direction;
    callProperType(direction)
}


/**
 * Deal with paragraphs and the next button by only reading the next 100 elements of the paragraph to mimic what a screen reader would do
 * @return {void} 
 */
function paragraphNext(){
    setVisualFeedback();
    var currentElement = elements[elementsIndex]
    //If the remainder of the string is longer only take a substring of the next 100
    if(currentElement.innerHTML.length - paragraphIndex > 99){
        var str = currentElement.innerHTML.substr(paragraphIndex, (99 + paragraphIndex));
        //Find the last space so that a word is not cut off and set that to the last index
        var wordIndex = str.lastIndexOf(" ");
        speak(str.substr(0, wordIndex));
        //update paragraph index to be the one after where the last space was
        paragraphIndex = wordIndex + 1 + paragraphIndex;
    }
    else{
        speak(currentElement.innerHTML.substr(paragraphIndex, currentElement.innerHTML.length));
        paragraphIndex = 0;
    }
}

/**
 * Deal with paragraphs and the previous button by reading backwords 100 words at a time
 * @return {void} 
 */
function paragraphLast(){
    setVisualFeedback();
    var currentElement = elements[elementsIndex]
    if(paragraphIndex == 0){
        paragraphIndex = currentElement.innerHTML.length;
    }
    //If there is more than 100 words left parse it for the last 100 from the overall paragraph
    if(paragraphIndex - 99 > 0){
        var str = currentElement.innerHTML.substr(paragraphIndex - 99, paragraphIndex)
        //find the first space of this 100 so that no words are cut off 
        var wordIndex = str.indexOf(" ");
        speak(str.substr(wordIndex, paragraphIndex))
        //update the paragraph index by removing 100 and adding the offset of where the last space was
        paragraphIndex = paragraphIndex - 99 + wordIndex;
    }
    else{
        speak(currentElement.innerHTML.substr(0, paragraphIndex));
        paragraphIndex = 0;
    }
}


/**
 * Find the next heading when user is navigating by headings
 * @param {int} direction 1 if navigating down the page and -1 if navigating back up the page  
 * @return {void} 
 */
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
    //check if the element is one of the headings 
    while(elements[elementsIndex].localName[0] != 'h' && (elements[elementsIndex].localName[1] != 1 
        || elements[elementsIndex].localName[1] != 2 || elements[elementsIndex].localName[1] != 3 
        || elements[elementsIndex].localName[1] != 4 || elements[elementsIndex].localName[1] != 5 
        || elements[elementsIndex].localName[1] != 6 ))
    {
       elementsIndex += direction;
       //deal with if there are no more headings 
        if(elementsIndex == numberOfElements || elementsIndex < 0){
            speak("No more headings");
            elementsIndex = currentIndex;
            return;
        }
   }
   speak("Heading level " + elements[elementsIndex].localName[1] + ", "+ elements[elementsIndex].innerHTML);
   setVisualFeedback();
}

/**
 * Sets the proper text to speak for the element type or calls the proper function to handle the element
 * @param  {int} direction The direction that the user is moving, 1 for down the page, -1 for up the page
 * @return {void} 
 */
function callProperType(direction){
    if(elementsIndex < 0 || elementsIndex == numberOfElements){
        speak("No more content");
        return;
    }
    switch(elements[elementsIndex].localName){
        case "a":{
            speak("link, " + elements[elementsIndex].innerHTML);
            break;
        }
        case "button":{
            speak("button, " + element[elementsIndex].innerHTML);
            break;
        }
        case "li":{
            li(direction);
            break;
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
        case "p":{
            if(direction == 1){
                paragraphNext();
            }
            else{
                paragraphLast();
            }
            break;
        }
        case "ul":{
            ul(direction);
            break;
            
        }
        case "nav":{
            nav(direction)
            break;
        }
        case "div":{
            elementsIndex += direction;
            callProperType(direction);
        }
        default:{
            speak(elements[elementsIndex.innerHTML])
        }
    }
    elements[elementsIndex].focus();
    setVisualFeedback();
}

/**
 * Follow a link that leads to somewhere on the given page (such as skip to main link)
 * @return {void} 
 */
function followLink(){
    if(elements[elementsIndex].classList.contains('localLink')){
        var currentIndex = elementsIndex;
        var idName = elements[currentIndex].hash.substring(1);
        //look for the id that the link is supposed to skip to and read it
        while(elements[elementsIndex].id != idName){
            elementsIndex += 1;
            //wrap around to make sure that the element is not before link
            if(elementsIndex == numberOfElements){
                elementsIndex = 0;
            }
            //deal with case that it doesn't exist
            if(elementsIndex == currentIndex){
                return;
            }
        }
        callProperType(1);
    }
}

/**
 * Go to the next element, called when the down arrow key is pressed 
 * @return {void} 
 */
function nextElement(){
    //make sure that user is not currently in a paragraph element
    if(paragraphIndex == 0){
        if(elementsIndex + 1 < numberOfElements){
            elementsIndex += 1;
            callProperType(1);
        }
        //deal with having no more content on the page
        else{
            speak("No more content");
            elementsIndex = numberOfElements;
            return;
        }
    }
    //User is currently navigating a paragraph 
    else{
        paragraphNext()
    }
}


/**
 * Go to the previous element, called when the up arrow key is pressed 
 * @return {void} 
 */
function previousElement(){
    //make sure that the use is 
    if(paragraphIndex == 0){
        if(elementsIndex > 0){
            elementsIndex -= 1;
            callProperType(-1);
        } else{
            speak("No more content");
            elementsIndex = -1;
            return;
        }
    } else{
        paragraphLast()
    }
}

/**
 * Deal with tab key finding the next element that would be tabable, looping back to the beginning or end if necessary
 * NOTE: If user continues to press tab key it will go to content outside challenge area. This could be improved given more time 
 * @param {int} direction 1 if navigating down the page and -1 if navigating up the page
 * @return {void} 
 */
function tabKey(direction){
    var currentIndex = elementsIndex;
    if(currentIndex == -1){
        currentIndex = 0;
    }
    if((elementsIndex + direction) < numberOfElements && (elementsIndex + direction) > -1){
         elementsIndex += direction;
     } else{
         speak("No more content");
         elementsIndex = numberOfElements;
         return;
     }
     //loop through until a element that is tabbable is found
     while(elements[elementsIndex].localName != "button" && elements[elementsIndex].localName != "a" &&
     elements[elementsIndex].localName != "input" && elements[elementsIndex].localName != "textarea" && elements[elementsIndex].localName != "selector")
     {
        elementsIndex += direction;
        //make sure another element could be added and loop back to the beginning if not 
        if(elementsIndex == numberOfElements){
             elementsIndex = 0;
        }
        //if the end 
        else if(elementsIndex < 0){
            elementsIndex = numberOfElements - 1;
        }
        //Chance that no tabbable content exists
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
    callProperType(direction);
}


/**
 * Get the next occurance of a type. Use this function to deal with situations where user presses k button to get links or b to get buttons, etc
 * @param {int} direction 1 if user is navigating down the page, -1 if user is navigating up the page
 * @param {string} tag The element tag corresponding to what to look for, for instance a for links 
 * @return {void} 
 */
function getNextOccurance(direction, tag){
    var currentIndex = elementsIndex;
    var type = tag;
    switch(tag){
        case 'a':{
            type = 'link';
            break;
        }
    }
    //make sure it is possible to increment 
    if(elementsIndex < numberOfElements - 1 || elementsIndex > 0){
         elementsIndex += direction;
     }
     else{
         speak("No more content");
         elementsIndex = numberOfElements;
         return;
     }
     //loop in the given direction to find the next desired element of the type
     while(elements[elementsIndex].localName != tag){
        elementsIndex += direction;
        //ensure it is possible to continue incrementing, if not inform user that there are no more of that type in this direction
        if(elementsIndex == numberOfElements || elementsIndex < 0){
            speak("No more " + type +"s");
            elementsIndex = currentIndex;
            return;
        }
     }
     callProperType(direction);
}

/**
 * Deal with key presses and call proper functions based on key commands 
 * Called when the event key up or key down occurs
 * @param {event} e keyup or keydown
 * @return {void} 
 */
onkeydown = onkeyup = function(e){
    e = e || event; // to deal with IE
    //set in map so that if multiple keys are pressed at one time it will track this 
    map[e.keyCode] = e.type == 'keydown';

    //Dealing with error where the enter key stopped working when the user put in an answer to the challenge answer input
    if(document.activeElement == document.getElementById("answerInput")){
        //enter key
        if(map['13']){
            //cancel the mimic screen reader
            synth.cancel();
            //trigger the click of the submit button
            document.getElementById("submit").click();
        }
        return;
    }

    if(started && e.type == 'keydown'){
        //cancel the speach
        synth.cancel();
        //update keystorkes
        keystrokes += 1;
        document.getElementById("keystorkes").innerHTML = keystrokes;
        
        //reset the visuals to be all black or to have no borer
        if(showRead && elementsIndex > 0 && elementsIndex < numberOfElements){
            console.log(elements[elementsIndex])
            elements[elementsIndex].style.backgroundColor = "#000000";
        }
        if(completeVisual && elementsIndex > 0 && elementsIndex < numberOfElements){
            elements[elementsIndex].style.border = 'none';
        }
        
        //deal with key commands 
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
        //deal with the case when the user is trying to enter information in the challenge submit area 
        if(document.activeElement == document.getElementById("answerInput") || document.activeElement == document.getElementById("submit")){
            document.getElementById("submit").click();
        }
    }
}

/**
 * Change the visual feedback that the user will recieve
 * Called when the user changes their select option in the visual feeback radio buttons  
 * @param {string} type the value of the radio button that is selected
 * @return {void} 
 */
function setShowRead(type){
    switch(type){
        //This option corresponds to the user only seeing what is read by chaning the background of just that element
        case "showRead":{
            showRead = 1;
            completeVisual = 0;
            //make sure that the background is set to black and every element that has been shown is black
            document.getElementById("main").style.backgroundColor = "#000000";
            for(var i=0; i < shownElements.length; i++){
                shownElements[i].style.backgroundColor = "#000000"
            }
            //make sure that there are no borders outlines
            if(elementsIndex > 0 && elementsIndex < numberOfElements){
                elements[elementsIndex].style.border = 'none';
            }
            //update score and variable passed to completion page
            if(lowestDisplay == 0){
                score -= 1;
                lowestDisplay = 1;
            }
            break;
        }

        //case where user wants to have complete visual feedback so seeing all the text and having an outline around what is read
        case "showAll":{
            showRead = 0;
            //set background to white and any elements that have been read to white because they might have an element specific black background
            document.getElementById("main").style.backgroundColor = "#ffffff";
            for(var i=0; i < shownElements.length; i++){
                shownElements[i].style.backgroundColor = "#ffffff"
            }
            if(elementsIndex > 0 && elementsIndex < numberOfElements){
                elements[elementsIndex].style.border = '#FF0000';
            }
            //update score
            score = score - (2 - lowestDisplay);
            lowestDisplay = 2;
            completeVisual = 1;
            break;
        }

        //case where the user doesn't want any visual feedback
        case "black":{
            showRead = 0;
            completeVisual = 0;
            //make sure everything is black and that there is no border
            document.getElementById("main").style.backgroundColor = "#000000";
            if(elementsIndex > 0 && elementsIndex < numberOfElements){
                elements[elementsIndex].style.border = 'none';
            }
            for(var i=0; i < shownElements.length; i++){
                shownElements[i].style.backgroundColor = "#000000"
            }
            break;
        }
    }
    //upadate in local storage
    window.localStorage.setItem('score', JSON.stringify(score));
    window.localStorage.setItem('lowestDisplay', JSON.stringify(lowestDisplay));
}


/**
 * Deals with showing useful key commands or hiding useful key commands
 * Called when the user presses the key to show/hide useful key commands  
 * @return {void} 
 */
function showCommands(){
    //display key commands by adjusting css and update the score
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
    //hide useful key commands 
    else{
        document.getElementById('keyCommands').style.display = 'none';
        document.getElementById('showCommands').innerHTML = 'Show Useful Key Commands';

    }
  }