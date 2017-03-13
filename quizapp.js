$(document).ready(function(){
	var NthQuestion = 0;
	var buttons = $('<div id="buttons"><button class="next">Next Question</button></div>');
	
	$('form').append(buttons);


	//console.log(question0.theQuestion);
	//console.log(questionArray[0].theQuestion);


	var question0 = {
		theQuestion: 'what is the First Amendment about?',
		options: ['1) property rights', '2) freedom of speech', '3) bearing arms', '4) no searches or serizures without a warrant'],
		theAnswer: 1 
	}

	var question1 = {
		theQuestion: 'what is the Second Amendment about?',
		options: ['1) bearing arms', '2) trial by jury', '3) property rights', '4) non-emumerated powers are reserved for the states & people'],
		theAnswer: 0 
	}

	var question2 = {
		theQuestion: 'what is the Fourth Amendment about?',
		options: ['1) trial by jury', '2) self-incirimination', '3) the housing of soldiers', '4) bearing arms'],
		theAnswer: 2 
	}

	var question3 = {
		theQuestion: 'what is the Forth Amendment about?',
		options: ['1) the housing of soldiers', '2) no searches or serizures without a warrant', '3) the housing of soldiers', '4) excessive bail, fines, and punishments'],
		theAnswer: 1 
	}

	var question4 = {
		theQuestion: 'what is the Fith Amendment about?',
		options: ['1) self-incirimination', '2) bearing arms', '3) the housing of soldiers', '4) jury nullification'],
		theAnswer: 0 
	}

	var questionArray = [question0, question1, question2, question3, question4];

	function arrayIntoRadioButtons(arrayOfOptions){
		var radioButtons = '';
		for(var i = 0; i < arrayOfOptions.length; i++){
			radioButtons += '<br />' + arrayOfOptions[i];
		}
		return radioButtons;
	}



	//for(NthQuestion; NthQuestion < 5, NthQuestion++;){
		$('form').on('click', 'button.next', function(){
			event.preventDefault();
			event.stopPropagation();
			$('#questionGoesHere p.start').remove();
			if(NthQuestion === 5){
				$('#questionGoesHere').html("<p class='end'>This concludes the quiz</p><p class='startOver'><a href='index.html'>Start Over</a></p>");
				$('#optionsGoHere').remove();
				$('#buttons').remove();
				return;
			}
			var question = $('<p>This is a multiple choice question number ' + (NthQuestion + 1) + '</p><h4>' + questionArray[NthQuestion].theQuestion + '</h4>');
			$('#questionGoesHere').html(question);
			var options = $('<div id="options">The options are' + arrayIntoRadioButtons(questionArray[NthQuestion].options) + '</div>');
			$('#optionsGoHere').html(options);
			NthQuestion++;
		}); // form.on
	//} // for

	

});