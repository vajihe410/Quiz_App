const list = document.querySelector("ol")
const highestScore = JSON.parse(localStorage.getItem("highestScore")) || []

const content = highestScore.map((score , index) => {
    return`
            <li>
                <span>${index + 1}</span>
                <p>${score.username}</p>
                <span>${score.score}</span>
            
            </li>
        `
        ;
})
list.innerHTML = content.join()