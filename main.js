import UI from "./Class/UI.js";
import Request from "./Class/Request.js";
import ListenerRequestGetQuestions from "./Class/Listener.js"

Request.getCategory()
    .then(response => response.json())
    .then(data => UI.getCategories(data.trivia_categories))

ListenerRequestGetQuestions.ListenerRequest()