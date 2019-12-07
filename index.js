
let score = 0;
let curIndex = 0;

// Initialize Load Screen:
// Must contain button that, when clicked, initiates the quiz. 
function beginQuiz(){
    $('.start-quiz').on('click',function(event){
        event.preventDefault();
        createQuestion();
        // console.log(`beginQuiz initiated`);
    });
}
//Quiz Page:Only need to change Section text below <header>
// load and update the count and score
function updateScore(){
    const scoreAndCount = 
    `<p class="question-count">Question number: ${curIndex+1}/${STORE.length}</p>
    <p class="score">Current Score: ${score}/${STORE.length}</p>`;
    $('.scoreUpdate').html(scoreAndCount);
} 

// When loaded, the first question should appear 
function createQuestion(){
    let question = STORE[curIndex].question;
    console.log(question);    
    updateScore(); //call to load the initial score
    const questionHTML = 
    `<form>
    <fieldset class = "field">
        <h2>${question}</h2>
        <div class = "options">
        </div>
    </fieldset>
    <button class="submit" type = "submit">SUBMIT ANSWER</button>
    <button class="next" type = "submit">NEXT</button>
    </form>`;

    $('section').html(questionHTML);
    $('.next').hide()
    $('.start-quiz').hide();
    createSelections();
}
// loads the selctions(input type radio)
function createSelections(){
    let currentSelections = STORE[curIndex].selections;
    for (let i=0; i<currentSelections.length;i++){
    $(".options").append(`<input class = "radio-input" type="radio" name = "selections" value = "${currentSelections[i]}"  id = "selections${i}">
    <label class = "radio" for ="selections${i}">${currentSelections[i]}</label><br>
    <span id = "selection${i}"></span>`);
    }
    questionCheck();
}
// Should be able to submit the question. lock the radios after submitting
// Upon submitting, a box should appear indicating "correct/incorrect" and answer
// A "next" button should also appear after submittal of the question
// Clicking "next" should initiate the next quesiton
function questionCheck(){
    $('.submit').on('click',function(event){
        $('.submit').hide();
        $('.next').show();
        event.preventDefault();
        console.log(curIndex)
        let currentSelection = $('input[name="selections"]:checked').val();

        if (!currentSelection){
            alert('All men must answer.')
            $('.submit').show();
            $('.next').hide();
            return;
        }
        $('.radio-input').prop('disabled', true);
        // answerId is the location of the selected answer
        let answerId = STORE[curIndex].selections.findIndex(i=> i === currentSelection);
        // create a variable for the ID of the selected answer span element
        let id = '#selection'+answerId;
        if (currentSelection === STORE[curIndex].answer){
            // correct
            $(`${id}`).append(`That is correct!<br>`);
            $(`${id}`).addClass('correctAnswer'); //to be able to edit the boxes in css
            console.log('.selection'+answerId)
            score++;
            updateScore();
            curIndex++;
        }
        else{
            // incorrect
            console.log('incorrect')
            $(`${id}`).append(`That is not correct. The correct answer is ${STORE[curIndex].answer}<br>`);
            $(`${id}`).addClass('wrongAnswer');//to be able to edit the boxes in css
            score += 0;
            updateScore();
            curIndex++;
            
        }
    });
    
    loadNextQuestion();
    // if we have reached the last question, the final page should load instead of the next question
    if(curIndex === STORE.length){
        loadFinalPage();
    }
}
// load the next question when "next" is clicked
function loadNextQuestion(){
    $('.next').on('click',function(event){
        event.preventDefault();
        if(curIndex === STORE.length){
            loadFinalPage();
            return true;
        }
        else{
        createQuestion();
        $('next').hide();
        }
    });
}
// Final Page:
// Load the final score and message
function loadFinalPage(){
    saying = phraseOut();
    $('.scoreUpdate').html(saying);
    const finalPageHTML = 
    `<p>Your Score is ${score}/${STORE.length}</p>
    <button class ="restart">RESTART QUIZ</button>`;
    $('section').html(finalPageHTML);
    curIndex = 0;
    score = 0;
    // Restart Quiz? button should be there bringing you back to the beginning of the quiz
    $('.restart').on('click',function(event){
        event.preventDefault();
        createQuestion()});
        console.log('loadFinalPage ran');
}

// create the message based off of the score
function phraseOut(){
    if (score === 0){
        return 'Valar morghulis. Nice try...';
    }
    else if(score === STORE.length){
        return 'You drink and you know things. Congratulations!';
    }
    else{
        return 'When you play the game of thrones, you win or you die. Try again?';
    }
}
function start(){
    beginQuiz();
    questionCheck()
    createSelections();
    createSelections();
}
$(start);
