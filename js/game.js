const container = document.querySelector(".container")
const loader = document.getElementById("loader")
const Question = document.querySelector(".question p")
const Answers = document.querySelectorAll(".answer-text")
const score = document.getElementById("score")
const next = document.getElementById("next-button")
const questionNumber = document.getElementById("question-number")
const finish = document.getElementById("finish-button")

const level = localStorage.getItem("level") || "medium"

const URL = `https://opentdb.com/api.php?amount=10&difficulty=${level}&type=multiple`;

const bonuz = 10
let formatedData = null;
let questionIndex = 0;
let correctAnswer = null;
let scoreNumber = 0;
let isAccepted = true;

const formatData = (questionsData) => {
    const result = questionsData.map(item => {
        const questionObject = {
            question : item.question,
        }
        const answers = [...item.incorrect_answers]
        const indexCorrectAnswer =Math.floor(Math.random()*4)
        answers.splice(indexCorrectAnswer,0,item.correct_answer)
        questionObject.answers = answers
        questionObject.indexCorrectAnswer = indexCorrectAnswer
        return questionObject
    })
    return result
}

const fetchData =async () => {
   const response = await fetch(URL)
   const json = await response.json()
   const data = json.results
   formatedData = formatData(data)
   start()
}

const start = () => {
    showQuestion()
    container.style.display = "block" ;
    loader.style.display = "none"
}

const showQuestion = () => {
    const {question, answers ,indexCorrectAnswer} = formatedData[questionIndex]
    correctAnswer = indexCorrectAnswer
    console.log(correctAnswer)
    Question.innerText = question
    Answers.forEach((button,index )=> {
        button.innerText = answers[index]
    })
    questionNumber.innerText = questionIndex + 1
}

const checkAnswer = (event,index) => {
    if(!isAccepted) return;
    isAccepted = false
    
    const isCorrect = index === correctAnswer ? true : false;
    
    if(isCorrect){
        event.target.classList.add("correct-answer");
        scoreNumber+=bonuz ;
        score.innerText = scoreNumber;
    }
    else{
        event.target.classList.add("incorrect-answer");
        Answers[correctAnswer].classList.add("correct-answer");
    }
}

const nextHandler = () =>{
    questionIndex++
    if(questionIndex < formatedData.length ){
        isAccepted = true;
        removeClasses()
        showQuestion()
    }
    else{
        next.style.display = "none"
    }
   
}
const removeClasses = () => {
    Answers.forEach(button => {
        button.className = "answer-text"
    })
}

const finishHandler = () =>{
    window.localStorage.setItem("score",JSON.stringify(scoreNumber))
    window.location.assign("./end.html")
}

window.addEventListener("load",fetchData)
next.addEventListener("click",nextHandler)
finish.addEventListener("click",finishHandler)
Answers.forEach((button,index) => {
    button.addEventListener("click",(event)=>checkAnswer(event, index))
})
