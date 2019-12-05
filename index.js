// Initialize Load Screen
// Must contain button that, when clicked, initiates the quiz. 
let score = 0;
let curIndex = 0;

function beginQuiz(){
    $('.start-quiz').on('click',function(event){
        createQuestion();
        console.log(`beginQuiz initiated`);
    });
}
//Quiz Page 
// Only need to change Section text below <header>
// When loaded, the questionx/total and score
// When loaded, the first question should appear 
function createQuestion(){
    console.log(curIndex)
    console.log('createQuestion ran')
    let question = STORE[curIndex].question;
    console.log(STORE[curIndex].quesiton);    
    const scoreAndCount = $(
    `<p class="question-count">${curIndex}/${STORE.length}</p>
    <p class="score">${score}/${STORE.length}</p>`)
    const questionHTML = 
    $(
    `<form>
    <fieldset>
    <h1>${question}</h1>

    <div class = "selections">

    </div>
    </fieldset>
    <button class="submit" type = "submit">Submit Answer</button>
    <button class="next" type = "next">Next Question</button>
    </form>`
    );
    $('.header').append(scoreAndCount);
    $('section').html(questionHTML);
    $('.next').hide()
    $('.start-quiz').hide();
    createSelections();
}

function createSelections(){
    let currentSelections = STORE[curIndex].selections;
    for (let i=0; i<currentSelections.length;i++){
    $(".selections").append(`<input class="radio" type="radio" name = "selections" id="selections${i}">
    <label for ="selection${i}">${currentSelections[i]}</label><br>
    <span class= "selections${i}></span>`)
    }
    console.log('createSelections ran');
    answerSubmit();
}
// Should be able to submit the question
// Upon submitting, a box should appear indicating "correct/incorrect" and answer
// A "next" button should also appear after submittal of the question
// Clicking "next" should initiate the next quesiton
function answerSubmit(){
    $('.submit').on('click', function(){
        $('.submit').hide();
        console.log('answerSubmit ran');
    });
    questionCheck();
}
function questionCheck(){
    $('.submit').on('click',function(event){
        $('.radio').attr('disabled',true);
        let currentSelection = $("input[name=selections]:checked").val();
        let question = $(STORE.question[curIndex]);    
        if (!currentSelection){
            alert('All men must answer.')
        }
        let answerId = question.selections.findIndex(i=> i === currentSelection);
        if (currentSelection === question.answer){
            // correct. find id of selected
            $('.selections'+answerId).append(`<p>That is correct!</p>`);
            score++;
        }
        if (currentSelection !== question.answer){
            // incorrect
            $('.selections'+answerId).append(`<p>That is not correct. The correct answer is ${STORE[curIndex].answer}</p>`);
            score += 0;
        }
    });
    curIndex++;
    if(curIndex === STORE.length){
        loadFinalPage();
    }
    loadNextQuestion();
    $('.next').show();
    console.log('questionCheck ran');
}
// load the next question when "next" is clicked
function loadNextQuestion(){
    $('.next').on('click',function(){
        createQuestion();
        $('next').hide();
        console.log('loadNextQuestion ran');
    });
}
// Final Page
// Load the final score and nice message
function loadFinalPage(){

    const finalPageHTML = 
    $(
    `<p>Your Score is ${score}/${STORE.length}</p>
    <button class ="restart">Restart Quiz?</button>`
    )
    $('section').html(finalPageHTML);
    curIndex = 0;
    score = 0;
    $('.restart').on('click',function(){
        createQuestion()});
        console.log('loadFinalPage ran');
}
// Restart Quiz? button should be there bringing you back to the beginning of the quiz


function startThisQuiz(){
    beginQuiz();
    // answerSubmit();

}

$(startThisQuiz);