const Base_URL = "https://opentdb.com";

export default class request {
    static getCategory() {
        let url = `${Base_URL}/api_category.php`;
        return fetch(url)
    }

    static getValueForm() {
        let amountQuesion = document.getElementById("amountQuestion").value;
        let category = document.getElementById("category-container").value;
        let dificulty = document.getElementById("dificult").value;
        let type = document.getElementById("type").value;

        return [amountQuesion, category, dificulty, type]
    }


    static getFullResponse() {
        let [amountQuestions, category, dificulty, type] = this.getValueForm()
        let url = `${Base_URL}/api.php?amount=${amountQuestions}${(category != 'anyCategory'?'&category='+category:"")}${(dificulty != 'anyDificulty'?'&difficulty='+dificulty:"")}${type != 'anyType'?'&type='+type:""}`;
        return fetch(url)
    }



}