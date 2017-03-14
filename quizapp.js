$(document).ready(function(){
	/************ GLOBAL VARIABLES **********/
	var questionArray = [
		{	theQuestion: 'what is the First Amendment about?',
			options: ['property rights', 'freedom of speech', 'bearing arms', 'no searches or serizures without a warrant'],
			theAnswer: 1 }
		,
		{	theQuestion: 'what is the Second Amendment about?',
			options: ['bearing arms', 'trial by jury', 'property rights', 'non-emumerated powers are reserved for the states & people'],
			theAnswer: 0 }
		,
		{	theQuestion: 'what is the Third Amendment about?',
			options: ['trial by jury', 'jury nullification', 'against housing soldiers', 'bearing arms'],
			theAnswer: 2 }
		,
		{	theQuestion: 'what is the Forth Amendment about?',
			options: ['bearing arms', 'against unreasonable searches and seizures', 'freedom of speech', 'against excessive bail, fines, and punishments'],
			theAnswer: 1 }
		,
		{	theQuestion: 'what is the Fith Amendment about?',
			options: ['against self-incrimination', 'bearing arms', 'against housing of soldiers', 'jury nullification'],
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
		$('#feedback').remove();
		var nextQHTML = $('<div id="nextQHTML"><div id="tallyGoesHere"></div><div id="questionGoesHere"></div><ol id="optionsGoHere"></ol></div>')


		if(userAnswers[0]){
			var tally = $('<div id="tally">Your score: <span id="numCorrect"></span> out of <span id="qsSoFar"></span> questions</div>');
			tally.find('span#numCorrect').html(numCorrect);
			tally.find('span#qsSoFar').html(qNumber);
			nextQHTML.find('#tallyGoesHere').html(tally);
		}
		
		// check if it's time to stop
		if(qNumber === questionArray.length){
			nextQHTML.find('#questionGoesHere').html("<p class='end'>This concludes the quiz</p><p class='startOver'><a href='index.html'>Start Over</a></p>");
			$('#buttonsGoHere').remove();
			$('form').append(nextQHTML);
			return;
		}

		var question = $('<p>Question ' + (qNumber + 1) + '</p><h4>' + questionArray[qNumber].theQuestion + '</h4>');
		nextQHTML.find('#questionGoesHere').html(question);
		
		var optionsMenu = $('<div id="options">The options are' + arrayIntoRadioButtons(questionArray[qNumber].options) + '</div>');
		nextQHTML.find('#optionsGoHere').html(optionsMenu);
		
		//launch
		$('form').prepend(nextQHTML);

		//console.log("TODO: show Next giveFeedback button");
		var feedbackButtons = $('<div id="buttons"><button class="giveFeeback" type="submit" disabled>Submit & Get Feedback</button></div>');
		$('#buttonsGoHere').html(feedbackButtons); 

		/**/
		$('input[name="option"]').click(function(event){
   		$('button.giveFeeback').prop("disabled", false); // Element(s) are now enabled.
});
		

	} // showNextQ

	function giveFeedback(qNum){

		$('form #nextQHTML').remove();
		$('#buttonsGoHere').html('');

		var feedbackHTML = $('<div id="feedback"></div>');
		
		if(gradeLatestResponse(qNum)){
			numCorrect++;
			feedbackHTML.html('Correct');
		} else{
			feedbackHTML.html('Wrong, <br />the correct answer is <br />' + getAnswerString(qNum));
		}

		//lauch
		$('form').prepend(feedbackHTML);
		setNextQButtons("Next Question");
	}


	/* HELPER FUNCTIONS */
	function arrayIntoRadioButtons(arrayOfOptions){
		var radioButtons = '';
		for(var i = 0; i < arrayOfOptions.length; i++){
			radioButtons += '<li><input type="radio" name="option" value="' + i + '" id="option'+ i +'" required><label for="option'+ i +'">' + arrayOfOptions[i] + '</label></li>';
		}
		return radioButtons;
	}



	function gradeLatestResponse(qNum){
		console.log(qNum);
		console.log(typeof userAnswers[qNum]);
		console.log(typeof questionArray[qNum].theAnswer);
		if(Number(userAnswers[qNum]) === questionArray[qNum].theAnswer){ 
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
		var nextButtons;
		//console.log('buttonText.toLowerCase(): ' + buttonText.toLowerCase());
		nextButtons = $('<div id="buttons"><button class="nextQ" type="submit">' + buttonText + '</button></div>');
		$('#buttonsGoHere').html(nextButtons);
	}

}); // document .ready function