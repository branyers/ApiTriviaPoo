import Request from "./Request.js"

let correctAnswer = [];
let SeletectedAnswer = [];
let count = 0;
export default class UI {
    static getCategories = (category) => {
        let categoryContainer = document.getElementById("category-container");
        category.forEach(element => {
            categoryContainer.innerHTML += `<option value="${element.id}">${element.name}</option>`
        });

    }

    static getQuestion = (question) => {
        let questionContainer = document.getElementById("questions-container")
        let buttomContainer = document.getElementById("verification")
        let html = ``
        correctAnswer = [];
        question.forEach((element, index) => {
            let aux = element.correct_answer;
            correctAnswer.push(aux)
            html += `<div class="col-md-4">
            <div class="card margin">
                <div class="card-body">
                    <p>${element.question}</p>
                    ${this.getAnswer(element,index)}
                </div>
            </div>  
        </div>`
        })
        let botton = `<button type="submit" onsubmit="getValidate()" id="sendAnswer" class="btn btn-lg btn-primary bottom-style">Enviar Respuestas</button>`
        questionContainer.innerHTML = html
        buttomContainer.innerHTML = botton
    }



    static getAnswer = (element, index) => {
        let correctAnswer = element.correct_answer;
        let incorrectAnswer = element.incorrect_answers;
        let answerType = element.type;
        console.log(correctAnswer)
        let html = ``
        let answers = [];
        answers = [...incorrectAnswer]
        answers.splice(Math.floor(Math.random() * (answers.length)), 0, correctAnswer)

        for (let i = 0; i < answers.length; i++) {
            if (answerType == "multiple") {

                html += `
                <div class="form-check form-check-inline">
                    <input class="form-check-input input" type="radio" name='${answers[0]+index}' id='${answers[i]+index}' value='${answers[i]}'required>
                    <label class="form-check-label" for='${answers[i]+index}'>${answers[i]}</label>
                </div>`
            }


            if (answerType == "boolean") {

                html += `
                    <div class="form-check form-check-inline">
                         <input class="form-check-input input" type="radio" name='${answers[0]+index}' id='${answers[i]+index}' value='${answers[i]}'required>
                        <label class="form-check-label" for='${answers[i]+index}'>${answers[i]}</label>
                    </div>`
            }
        }

        return html

    }

    // Meotodo que decodifica los elementos con caracteres especiales
    static decode = (arrayElement, iterator) => {
        let elementArray = []
        let dom = document.createElement("textarea")
        dom.innerHTML = arrayElement[iterator]
        let changeValue = dom.value;
        elementArray.splice(iterator, 1, changeValue)
        dom.remove()
        return elementArray;
    }

    static getInputsValue = () => {
        let inputSelected = document.querySelectorAll("input")
        let inputValue = [];
        inputSelected.forEach(element => {
            if (element.checked) {
                inputValue.push(element.value)
            }

        });
        return inputValue;
    }



    static ifFiteredNotExist = () => {
        let container = document.getElementById('questions-container');
        let html = ``
        html = `<div class="alert alert-danger margin" role="alert">Las categoria de preguntas que haz filtrado no esta disponible, intenta con otra..</div>`
        container.innerHTML = html
    }



    static validateInputsradio = () => {
        let flat = false;
        let radioButtons = document.querySelectorAll('input');
        let SeletectedAnswer = []

        radioButtons.forEach((input) => {
            if (input.checked) {
                SeletectedAnswer.push(input.value)
            }
        })

        if (SeletectedAnswer.length == correctAnswer.length) {
            flat = true
        }


        return flat
    }

}



function modalScore(score, amountQuestion) {
    let container = document.getElementById('questions-container');
    let html = ``
    html = `<div class="alert alert-success" role="alert">
    ${`Seleccionaste ` + score + ` respuestas correctas de ` + amountQuestion }
  </div>`

    container.innerHTML = html
}





let bottomSendAnswer = document.getElementById("verification")
bottomSendAnswer.addEventListener("submit", () => {
    let count = 0
    let answerSeleted = [...UI.getInputsValue()]
   
    for (let i = 0; i < correctAnswer.length; i++) {
        let dom = document.createElement("textarea")
        dom.innerHTML = correctAnswer[i]
        let changeValue = dom.value;
        correctAnswer.splice(i, 1, changeValue)

        if (answerSeleted[i] == correctAnswer[i]) {
            count += 1
        }
    }
    if (!UI.validateInputsradio()) {
        alert("Selecciona todas las respuestas antes de enviarlas!!")
    }else{
        modalScore(count,correctAnswer.length)
    }


    console.log(count)
    console.log(answerSeleted)
    console.log(correctAnswer)

})