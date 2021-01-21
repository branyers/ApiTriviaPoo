export default class UI {

    static getCategories = (category) => {
        let categoryContainer = document.getElementById("category-container");
        category.forEach(element => {
            categoryContainer.innerHTML += `<option value="${element.id}">${element.name}</option>`
        });

    }

    static getQuestion = (question) => {
        let questionContainer = document.getElementById("questions-container")
        let html = ``
        question.forEach((element, index) => {
            console.log(element)
            html += `<div class="col-md-4">
            <div class="card margin">
                <div class="card-body">
                    <p>${element.question}</p>
                    ${this.getAnswer(element,index)}
                </div>
            </div>  
        </div>`
        })
        questionContainer.innerHTML = html
    }


    static getAnswer(element, index) {
        let correctAnswer = element.correct_answer;
        let incorrectAnswer = element.incorrect_answers;
        let answerType = element.type;
        let html = ``
        let answers = [];
        answers = [...incorrectAnswer]
        answers.splice(Math.floor(Math.random() * (answers.length)), 0, correctAnswer)

        for (let i = 0; i < answers.length; i++) {
            if (answerType == "multiple") {

                html += `
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name='${answers[0]+index}' id='${answers[i]+index}' value='${answers[i]} required'>
                    <label class="form-check-label" for='${answers[i]+index}'>${answers[i]}</label>
                </div>`
            }


            if (answerType == "boolean") {

                html += `
                    <div class="form-check form-check-inline">
                         <input class="form-check-input" type="radio" name='${answers[0]+index}' id='${answers[i]+index}' value='${answers[i]} required'>
                        <label class="form-check-label" for='${answers[i]+index}'>${answers[i]}</label>
                    </div>`
            }
        }

        return html

    }





}