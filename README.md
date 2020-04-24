# Web-Screen-Racers
Web Screen Racers is a game that was developed by Serena Buxton under the advisement of Shaun Kane for research purposes in the Superhuman Computing Lab at the University of Colorado Boulder in 2020. The aim of the game is to help individuals learn the basic key commands to operate a screen reader through mini navigation challenges. 
Learning to use a screen reader is hard it requires a high cognitive load due to the lack of visual feedback and the need to use memorized key commands to navigate instead of the mouse. The high cognitive load prevents many people, such as software developers from learning to use a screen reader. The lack of knowledge around a screen reader is unfortunate because it leads to the development of inaccessible software. This game tries to make the learning process easier by providing customization options for visual feedback and the ability to display useful key commands. The application takes the format of a game to try to add an element of fun and engagement.

## Link to live version
https://screen-racers.herokuapp.com/index.html

## Tech Used
JavaScript 
[Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API)
Node JS
HTML 
CSS
Heroku

## The Screen Reader
Web Screen Racers does not use an actual screen reader. It is set up to use the same basic key commands as NVDA. There are many key commands that NVDA uses that this system does not. The speech is generated using javascript and the Web Speech Api. It is set up to say close to the same thing that NVDA would but is not exact.

## Installation 
Download the repository and ensure that you have Node JS downloaded. Run the code using **node server.js**. Then visit local host 5000.

## Future Steps
*Get the tables and forms challenges up and working. This includes adding additional functionality to application screen reader. 
*Running a formal user study and testing how the skills translate to actually using NVDA 
*Adding more challenges and randomly generating challenges so that the user can practice at the same level without having to redo the exact challenge.
*Adding the functionality for the user to specify what screen reader they are wanting to practice and change the key commands accordingly.

## Collaboration 
Feel free to reach out with questions to serenabux@gmail.com