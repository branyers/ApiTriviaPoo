import Request from "./Request.js"
import UI from "./UI.js"

export default class Listener {


    static ListenerRequest = () => {
        let form = document.getElementById("form")
        form.addEventListener("submit", (evt) => {
            evt.preventDefault()
            Request.getFullResponse()
                .then(response => response.json())
                .then(data => {
                    if (data.response_code == 1) {
                        UI.ifFiteredNotExist()
                    }
                    if (data.response_code == 0) {
                        UI.getQuestion(data.results)
                    }
                })
        })

    }

}