var triviaQuestions = [{
	question: "In The Little Mermaid, who is NOT one of Triton’s daughter?",
	answerList: ["Andrina", "Adora", "Attina", "Alana"],
	answer: 1
},{
	question: "Which phrase does the Evil Queen in Snow White actually say??",
	answerList: ["Mirror, mirror, on the wall — who is the fairest of them all?", "Magic mirror, on the wall — who is the fairest one of all?", "Mirror, mirror, on the wall — who is the fairest one of all?", "Magic mirror, on the wall — who is the fairest of them all?"],
	answer: 1
},{
	question: "In the movie Tangled, Flynn Rider is wanted dead or alive according to his wanted poster because he's a...",
	answerList: ["Bandit", "Thief", "Treasonist", "Robber"]
},{
	question: "Who was the first Pixar character added to the Disney Princess line-up?",
	answerList: ["Jessie", "Repunzel", "Merida", "Elsa"],
	answer: 2
},{
	question: "Which glass slipper did Cinderella leave behind at the ball?",
	answerList: ["Left", "Right", "Both", "None"],
	answer: 0
},{
	question: "In Sleeping Beauty, what is the name of Maleficent’s pet raven?",
	answerList: ["Diablo", "Malum", "Mauvais", "Diable"],
	answer: 0
},{
	question: "Finish the lyrics: “Wouldn't you think I'm the girl, the girl who has everything? Look at this trove, treasures untold…”",
	answerList: ["It’s full of gizmos and gadgets galore.","Wonders from all over the world.", "There so much to be known.", "How many wonders can one cavern hold?"],
	answer: 3
},{
	question: "In The Lion King, what side of Scar's face is his scar on?",
	answerList: ["Left", "Right", "Center", "On his nose"],
	answer: 0
},{
	question: "In Frozen, how many brothers does Hans have?",
	answerList: ["7", "9", "12", "15"],
	answer: 2
},{
	question: "In Sleeping Beauty, what do the fairies arm Prince Phillip with to fight Maleficent?",
	answerList: ["Hopper", "Woody", "Marlin", "Buzz Lightyear"],
	answer: 3
},{
	question: "In Aladdin, what does Aladdin, and a reluctant Abu, give to the poor children to eat?",
	answerList: ["Dates", "Cheese", "Bread", "Apples"],
	answer: 2
},{
	question: "On whose shoulders does Dopey stand on in order to dance with Snow White during “The Silly Song” scene?",
	answerList: ["Doc", "Grumpy", "Sneezy", "Happy"],
	answer: 2
},{
	question: "How many years does the Genie say he has been trapped in the lamp? ",
	answerList: ["100 years", "500 years", "1,000 years", "10,000 years"],
	answer: 3
},{
	question: "In Lady and the Tramp, Jim Dear gives his wife Darling, Lady as a gift for…",
	answerList: ["Valentine’s Day", "Her Birthday","For their anniversary", "Christmas"],
	answer: 3
},{
	question: "In The Little Mermaid, what alias does Ursula use when she becomes human?",
	answerList: ["Vanessa"  ,"Alexis", "Sonia", "Amber"],
	answer: 0
}];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14','question15'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Yes, that's right!",
	incorrect: "No, that's not it.",
	endTime: "Out of time!",
	finished: "Alright! Let's see how well you did."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	answered = true;
	
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); 
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	

	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}