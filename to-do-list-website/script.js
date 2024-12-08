let task = document.getElementById('task');  
let buttonElement = document.getElementById('add'); 
let displayTask = document.getElementById('to-do-lists');

function displayTaskItem(taskItem, index) {
  let containerDiv = document.createElement('div');
  containerDiv.className = 'task-container';

  let newTaskDiv = document.createElement('div');
  newTaskDiv.className = "tasks";

  let buttonDiv = document.createElement('div');
  buttonDiv.className = 'button-div';
  let deleteButton = document.createElement('button');
  deleteButton.id = "button";
  deleteButton.textContent = 'delete';
  deleteButton.addEventListener('click', function() {
    deleteTask(index);
  });
  
  let updateButton = document.createElement('button');
  updateButton.id = "update-button";
  updateButton.textContent = "Update";
  updateButton.addEventListener('click' , function(){
    updateTask(taskItem,index);
  })

  newTaskDiv.innerHTML = taskItem;
  buttonDiv.appendChild(deleteButton); 
  buttonDiv.appendChild(updateButton); 
  containerDiv.appendChild(newTaskDiv); 
  containerDiv.appendChild(buttonDiv); 
  displayTask.appendChild(containerDiv)
}

window.onload = function() {
  let Savedtasks = JSON.parse(localStorage.getItem('tasks')) || [];
  Savedtasks.forEach((taskItem, index) => displayTaskItem(taskItem, index));
}

function display() {
  let inputValue = task.value;
  if (inputValue) {
    let Savedtasks = JSON.parse(localStorage.getItem('tasks')) || [];
    Savedtasks.push(inputValue);
    localStorage.setItem('tasks', JSON.stringify(Savedtasks));
    
    displayTaskItem(inputValue, Savedtasks.length - 1);
    task.value = '';
  }
}

function deleteTask(index) {
  let Savedtasks = JSON.parse(localStorage.getItem('tasks')) || [];
  Savedtasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(Savedtasks));
  displayTask.innerHTML = '';
  Savedtasks.forEach((taskItem, index) => displayTaskItem(taskItem, index));
}

function updateTask(taskItem,index){
  let newTask = prompt("Update the task:", taskItem);
  if (newTask !== null && newTask.trim() !== "") { let Savedtasks = JSON.parse(localStorage.getItem('tasks')) || []; 
    Savedtasks[index] = newTask; localStorage.setItem('tasks', JSON.stringify(Savedtasks)); 
    displayTask.innerHTML = ''; 
    Savedtasks.forEach((taskItem, index) => displayTaskItem(taskItem, index)); }
}

buttonElement.addEventListener('click', display);
