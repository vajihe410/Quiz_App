const scoreEle = document.getElementById("score")
const saveButton = document.getElementById("save")
const username = document.getElementById("username")

const highestScore = JSON.parse(localStorage.getItem("highestScore")) || []
const score = JSON.parse(localStorage.getItem("score"))

scoreEle.innerText = score;

const saveHandler = () => {
    if(!username.value && !score){
        alert("Invalid username or score")
    }
    else{
        const finalScore = {username : username.value , score : score}

        highestScore.push(finalScore)
        highestScore.sort((a,b) => b.score - a.score)
        highestScore.splice(10)

        localStorage.setItem("highestScore" , JSON.stringify(highestScore))
        localStorage.removeItem("score")
        window.location.assign("./index.html")
    }
}

saveButton.addEventListener("click",saveHandler)

