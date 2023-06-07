// Get references to HTML elements
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskItem");

// function to add new task
function addTask() {
    const taskText = taskInput.value;
    if (taskText !== "") {
      const taskItem = document.createElement("li");
      taskItem.innerText = taskText;

      // Add a delete button to the task item
      const deleteButton = document.createElement("button");
      deleteButton.className = "deletebutton";
      deleteButton.innerText = "Delete";
      deleteButton.addEventListener("click", function() {
        taskItem.remove();
        updateLocalStorage();
      });

      taskItem.appendChild(deleteButton);
      taskList.appendChild(taskItem);
      taskInput.value = "";

      updateLocalStorage();
    }
}

// Function to update the tasks in localStorage
function updateLocalStorage() {
    const tasks = [];
    const taskItems = taskList.getElementsByTagName("li");
    for (let i = 0; i < taskItems.length; i++) {
      tasks.push(taskItems[i].innerText);
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
      for (let i = 0; i < tasks.length; i++) {
        const taskItem = document.createElement("li");
        taskItem.innerText = tasks[i];

        // Add a delete button to the task item
        const deleteButton = document.createElement("button");
        deleteButton.className = "deletebutton";
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener("click", function() {
          taskItem.remove();
          updateLocalStorage();
        });

        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);
      }
    }
}

// Event listener for addTaskButton
addTaskButton.addEventListener("click", addTask);

// Event listener for Enter key
taskInput.addEventListener("keydown", function(event) {
  if (event.keyCode === 13) {
    addTask();
  }
});

// Load tasks from localStorage on page load
loadTasks();

// function from jquery library to toggle done-undone list item
// crossing out- uncrossing out item
$(document).ready(function() {
    $("li").click(function() {
        $(this).toggleClass("crossed-out");
        $(this).toggleClass("crossed-out-color");
    });
});