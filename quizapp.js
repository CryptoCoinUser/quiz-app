$(document).ready(function(){
	/************ GLOBAL VARIABLES **********/
	var questionArray = [
		{	theQuestion: 'what is the First Amendment about?',
			options: ['1) property rights', '2) freedom of speech', '3) bearing arms', '4) no searches or serizures without a warrant'],
			theAnswer: 1 }
		,
		{	theQuestion: 'what is the Second Amendment about?',
			options: ['1) bearing arms', '2) trial by jury', '3) property rights', '4) non-emumerated powers are reserved for the states & people'],
			theAnswer: 0 }
		,
		{	theQuestion: 'what is the Third Amendment about?',
			options: ['1) trial by jury', '2) self-incirimination', '3) the housing of soldiers', '4) bearing arms'],
			theAnswer: 2 }
		,
		{	theQuestion: 'what is the Forth Amendment about?',
			options: ['1) the housing of soldiers', '2) against unreasonable searches and seizures', '3) the housing of soldiers', '4) excessive bail, fines, and punishments'],
			theAnswer: 1 }
		,
		{	theQuestion: 'what is the Fith Amendment about?',
			options: ['1) self-incirimination', '2) bearing arms', '3) the housing of soldiers', '4) jury nullification'],
			theAnswer: 0 }
	]

	var qNumber = 0;
	var userAnswers = [];
	var numCorrect = 0;

	/* end global variables */
	
	// initizalize
	setNextQButtons("start quiz");

	/* ALTERNATING EVENTS */
	$('form').on('click', 'button.nextQ', function(){
		event.preventDefault();
		event.stopPropagation();
		showNextQ(qNumber);


	}); // form.on click nextQ

	$('form').on('click', 'button.giveFeeback', function(){
		event.preventDefault();
		event.stopPropagation();
		// record latest answer
		var responseToLatestQ = $('input[name="option"]:checked').val();
		userAnswers.push(responseToLatestQ);
		// show feedback about the latest Q&A
		giveFeedback(qNumber);
		qNumber++;
	}); //form.on click giveFeedback
		
	/* END ALTERNATING EVENTS */

	function showNextQ(qNum){
		//console.log("TODO: remove any giveFeedback html");
		$('#feedback').remove();
		var nextQHTML = $('<div id="nextQHTML"><div id="tallyGoesHere"></div><div id="questionGoesHere"></div><div id="optionsGoHere"></div></div>')


		//console.log("TODO: have some responces? show a tally");
		if(userAnswers[0]){
			var tally = $('<div id="tally">Your score: <span id="numCorrect"></span> out of <span id="qsSoFar"></span> questions</div>');
			tally.find('span#numCorrect').html(numCorrect);
			tally.find('span#qsSoFar').html(qNumber);
			nextQHTML.find('#tallyGoesHere').html(tally);
		}
		
		// check if it's time to stop
		if(qNumber === 5){
			nextQHTML.find('#questionGoesHere').html("<p class='end'>This concludes the quiz</p><p class='startOver'><a href='index.html'>Start Over</a></p>");
			//$('#optionsGoHere').remove();
			$('#buttonsGoHere').remove();
			$('form').append(nextQHTML);
			return;
		}

		var question = $('<p>This is question number ' + (qNumber + 1) + '</p><h4>' + questionArray[qNumber].theQuestion + '</h4>');
		nextQHTML.find('#questionGoesHere').html(question);
		
		//console.log("TODO: lookup next q's options (aka choices) and place it into #optionsGoHere");
		var optionsMenu = $('<div id="options">The options are' + arrayIntoRadioButtons(questionArray[qNumber].options) + '</div>');
		nextQHTML.find('#optionsGoHere').html(optionsMenu);
		
		//launch
		$('form').prepend(nextQHTML);

		//console.log("TODO: show Next giveFeedback button");
		var feedbackButtons = $('<div id="buttons"><button class="giveFeeback" type="submit">Submit & Get Feedback</button></div>');
		$('#buttonsGoHere').html(feedbackButtons); 

	} // showNextQ

	function giveFeedback(qNum){

		//console.log("TODO: remove any showNextQ html");
		$('form #nextQHTML').remove();
		$('#buttonsGoHere').html('');

		var feedbackHTML = $('<div id="feedback"></div>');
		
		
		//console.log("TODO: give feedback on last question");

		//console.log('qNum is ' + qNum);
		//console.log('gradeLatestResponse(qNum) is ' + gradeLatestResponse(qNum));

		if(gradeLatestResponse(qNum)){
			numCorrect++;
			feedbackHTML.html('Correct');
		} else{
			feedbackHTML.html('Wrong, the correct answer is ' + getAnswerString(qNum));
		}

		//lauch
		$('form').prepend(feedbackHTML);


		//console.log("TODO: show nextQ button");

		setNextQButtons("Next Question");
	}


	/* HELPER FUNCTIONS */
	function arrayIntoRadioButtons(arrayOfOptions){
		var radioButtons = '';
		for(var i = 0; i < arrayOfOptions.length; i++){
			radioButtons += '<br /><input type="radio" name="option" value="' + i + '">' + arrayOfOptions[i];
		}
		return radioButtons;
	}



	function gradeLatestResponse(qNum){
		//console.log('gradeLatestResponse: userAnswers[qNum] is ' + userAnswers[qNum] + ' and questionArray[qNum].theAnswer is ' + questionArray[qNum].theAnswer);
		if(userAnswers[qNum] == questionArray[qNum].theAnswer){ //AKIVA, why is == true, as it should be, and === false?
			return true;
		}else {
			return false;
		}
	}

	function getAnswerString(qNum){
		var answerNumber = questionArray[qNum].theAnswer;
		return questionArray[qNum].options[answerNumber];
	}

	function setNextQButtons(buttonText){
			var nextButtons = $('<div id="buttons"><button class="nextQ" type="submit">' + buttonText + '</button></div>');
			$('#buttonsGoHere').html(nextButtons);
	}





	

}); // document .ready function