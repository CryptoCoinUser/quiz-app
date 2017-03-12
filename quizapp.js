$(document).ready(function(){
	var NthQuestion = 0;
	var buttons = $('<form><button class="next">Next Question</button></form>');
	
	$('main').append(buttons);

	var questionArray = ['1st Question', '2nd question', '3rd question', '4th question', '5th question'];


	//for(NthQuestion; NthQuestion < 5, NthQuestion++;){
		$('form').on('click', 'button.next', function(){
			event.preventDefault();
			event.stopPropagation();
			if(NthQuestion === 5){
				$('#questionGoesHere').html("<p>This concludes the quiz</p><p><a href='index.html'>Start Over</a></p>");
				$('form').remove();
				return;
			}
			var question = $('<p>This is a multiple choice question number ' + (NthQuestion + 1) + '</p><p>' + questionArray[NthQuestion] + '</p>');
			$('#questionGoesHere').html(question);
			NthQuestion++;
		}); // form.on
	//} // for

	

});