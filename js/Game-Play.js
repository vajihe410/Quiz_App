const container = document.querySelector(".container")
const loader = document.getElementById("loader")
const Question = document.querySelector(".question p")
const Answers = document.querySelectorAll(".answer button")

const URL = "https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple";

let formatedData = null;
let questionIndex = 0;
let correctAnswer = null;

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
   console.log(data)
   formatedData = formatData(data)
   console.log(formatedData)
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
    Question.innerText = question
    Answers.forEach((button,index )=> {
        button.innerText = answers[index]
    })
}

const checkAnswer = (event,index) => {
    const isCorrect = index === correctAnswer ? true : false;
    console.log(isCorrect)
    if(isCorrect){
        event.target.classList.add("correct-answer")
    }
    else{
        event.target.classList.add("incorrect-answer");
        Answers[correctAnswer].classList.add("correct-answer");
    }
}
Answers.forEach((button,index) => {
    button.addEventListener("click",(event)=>checkAnswer(event, index))
})
window.addEventListener("load",fetchData)