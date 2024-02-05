var introEl= document.getElementById("intro")
var questionSectionEl= document.getElementById("question-section")
var initialInputEl=document.getElementById("initial-input")
var highscoreEl=document.getElementById("highscore")
var startQuizEl= document.getElementById("start-quiz")
var questionTitleEl= document.getElementById("question-title")
var choiceListEl= document.getElementById("choice-list")
var timerEl= document.getElementById("timer")
var messageEl=document.getElementById("message") 
var scoreEl=document.getElementById("score")
var setIntervalId
var timeRemaining=questionData.length * 15
var index=0


function startQuiz(){
    introEl.classList.add("hide")
    questionSectionEl.classList.remove("hide")
    renderQuestion()

    setIntervalId=setInterval(startTimer , 1000 )
}
function renderQuestion(){
    messageEl.innerHTML=""
    questionTitleEl.textContent=questionData[index].title
    choiceListEl.textContent=""
    
    for(var i=0; i<questionData[index].choices.length; i++ ){
        var li=document.createElement("li")    
        var button=document.createElement("button") 
        button.textContent=questionData[index].choices[i]
        li.appendChild(button)
        choiceListEl.appendChild(li)

    }


}
function startTimer(){
    timerEl.textContent=timeRemaining--
}

function nextQuestion(event){
    var currentChoiceBtn= event.target
    var solution=questionData[index].solution
    index++
    if(index < questionData.length){
          questionData
         if(currentChoiceBtn.textContent ===solution){
            messageEl.innerHTML="<h4>Correct!</h4>"

         }else{
            messageEl.innerHTML="<h4>Wrong!</h4>"
            timeRemaining=timeRemaining-10
         }

         setTimeout( renderQuestion,500)
        
    }else{
     
        endQuiz()
    }
 
}

function endQuiz(){
     clearInterval(setIntervalId)
     questionSectionEl.classList.add("hide")
     initialInputEl.classList.remove("hide")
     scoreEl.textContent=timerEl.textContent
}
startQuizEl.addEventListener("click",startQuiz)
choiceListEl.addEventListener("click",nextQuestion)