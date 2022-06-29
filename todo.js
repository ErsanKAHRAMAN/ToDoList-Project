// All Elements
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoLıst = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners(){ // all events

form.addEventListener("submit",addTodo);
document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
secondCardBody.addEventListener("click",deleteTodo);
filter.addEventListener("keyup",filterTodo);
clearButton.addEventListener("click",clearAllTodos);


}
function clearAllTodos(e){

    if(confirm("Are you sure to delete all the todos?")){
        // todoLıst.innerHTML = ""; //slow
        while(todoLıst.firstElementChild != null){
            todoLıst.removeChild(todoLıst.firstElementChild);
        }
    }

    localStorage.removeItem("todos");




}









function filterTodo(e){

const filter = e.target.value.toLowerCase();
const listItems = document.querySelectorAll(".list-group-item"); 

listItems.forEach(function(listitem){
    const text = listitem.textContent.toLowerCase();
    if(text.indexOf(filter) === -1){ //not found
        listitem.setAttribute("style","display: none !important");
    }
    else{
        listitem.setAttribute("style","display: block");
    }

});




}




function deleteTodoFromStorage(deleteTodo){

    let todos = getStorageFromTodo();
    todos.forEach(function(todo,index){
        if(todo === deleteTodo){
            todos.splice(index,1); // delete the value from array.
        }

    })

    localStorage.setItem("todos",JSON.stringify(todos));



}



function deleteTodo(e){

    if(e.target.className === "fa fa-remove"){

        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success","Başarıyla kaldırıldı.");
    }



}



function loadAllTodosToUI(){

    let todos = getStorageFromTodo();
    todos.forEach(function(todo){
    addTodoToUI(todo);

});

}



function addTodo(e){

    const newTodo = todoInput.value.trim();

    if(newTodo === ""){
          
    showAlert("danger","Lütfen bir todo giriniz");

    }
    else{

        showAlert("success","başarıyla todo eklendi.")
        addTodoToUI(newTodo); 
        addTodoToLocal(newTodo);

    }

   



    e.preventDefault();
}





function getStorageFromTodo(newTodo){ //getting todos from storage

let todos;

if(localStorage.getItem("todos") === null){
    todos = [];

}
else{

   todos = JSON.parse(localStorage.getItem("todos"));

}

return todos;


}
function addTodoToLocal(newTodo){ //convert to array

    let todos = getStorageFromTodo();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));


}

function showAlert(type,message){
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    firstCardBody.appendChild(alert);
    setTimeout(function(){
        alert.remove();
    },1000);

}



function addTodoToUI(newTodo){ //pass string value to UI as list item
// creating list
const listItem = document.createElement("li");

// creating link
const link = document.createElement("a");
link.href = "#";
link.className = "delete-item";
link.innerHTML = "<i class = 'fa fa-remove'></i>";
listItem.className = "list-group-item d-flex justify-content-between";
//Text Node
listItem.appendChild(document.createTextNode(newTodo));
listItem.appendChild(link);

//listitem to todoList
todoLıst.appendChild(listItem);
todoInput.value = "";

console.log(listItem);



}