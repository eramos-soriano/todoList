// retrieve tasks from localStorage or initialize an empty array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// creating function to display tasks on page
function renderTasks() {
  const taskItem = document.getElementById("taskItem");

  // clear existing task items
  taskItem.innerHTML = "";

  // display each task
  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");
    listItem.className = "task";
    if (task.completed) {
      listItem.classList.add("completed");
    }
    const taskTitle = document.createElement("span");
    taskTitle.textContent = task.title;
    taskTitle.addEventListener("click", () => toggleTask(index));
    listItem.appendChild(taskTitle);

    const deleteButton = document.createElement("i");
    deleteButton.className = "delete-button";
    deleteButton.classList.add("fas", "fa-trash");
    deleteButton.addEventListener("click", () => deleteTask(index));
    listItem.appendChild(deleteButton);

    taskItem.appendChild(listItem);
  });
}

// function to add new task
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskTitle = taskInput.value.trim();

  if (taskTitle !== "") {
    const newTask = {
      title: taskTitle,
      completed: false,
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks();

    taskInput.value = "";
  }
}

// function to change the completed status of a task
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

// function to delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// function to save tasks to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// display of tasks
renderTasks();