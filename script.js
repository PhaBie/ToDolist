function getFormattedDate(currentDate) {
  var day = currentDate.getDate();
  var month = currentDate.getMonth() + 1;
  var year = currentDate.getFullYear();
  var hours = currentDate.getHours();
  var minutes = currentDate.getMinutes();
  var seconds = currentDate.getSeconds();
  var formattedDate = day + "/" + month + "/" + year + " " + hours + ":" + minutes + ":" + seconds;
  return formattedDate;
}

function saveTasks() {
  var tasks = [];
  var taskList = document.getElementById("taskList").getElementsByTagName("li");
  for (var i = 0; i < taskList.length; i++) {
    var taskText = taskList[i].getElementsByTagName("span")[0].textContent;
    var taskDate = taskList[i].getElementsByTagName("span")[1].textContent;
    var completed = taskList[i].getElementsByTagName("input")[0].checked;
    tasks.push({
      text: taskText,
      date: taskDate,
      completed: completed
    });
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
}



function addTask() {
  var taskInput = document.getElementById("taskInput");
  var taskList = document.getElementById("taskList");
  
  if (taskInput.value.trim() !== "") {
    var li = document.createElement("li");
    var taskText = document.createElement("span");
    var dateText = document.createElement("span");

    li.appendChild(taskText);
    li.appendChild(dateText);

    var currentDate = new Date();
    var formattedDate = getFormattedDate(currentDate); 

    taskText.textContent = taskInput.value;
    dateText.textContent = " Added on: " + formattedDate;

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", function() {
      if (this.checked) {
        li.style.textDecoration = "line-through";
      } else {
        li.style.textDecoration = "none";
      }
      saveTasks(); 
    });

    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function() {
      li.remove();
      saveTasks(); 
    });

    li.appendChild(checkbox);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
    taskInput.value = "";

    saveTasks(); 
  } else {
    alert("Please enter a task!");
  }
}

function loadTasks() {
  var savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    var tasks = JSON.parse(savedTasks);
    var taskList = document.getElementById("taskList");
    taskList.innerHTML = ""; // Clear existing tasks

    tasks.forEach(function(task) {
      var li = document.createElement("li");
      var taskText = document.createElement("span");
      var dateText = document.createElement("span");

      li.appendChild(taskText);
      li.appendChild(dateText);

      taskText.textContent = task.text;
      dateText.textContent = task.date;
      if (task.completed) {
        li.style.textDecoration = "line-through";
      }

      var checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;
      checkbox.addEventListener("change", function() {
        if (this.checked) {
          li.style.textDecoration = "line-through";
        } else {
          li.style.textDecoration = "none";
        }
        saveTasks();
      });

      var deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", function() {
        li.remove();
        saveTasks();
      });

      li.appendChild(checkbox);
      li.appendChild(deleteButton);
      taskList.appendChild(li);
    });
  }
}

// Call loadTasks when the page loads or refreshes
window.addEventListener("load", loadTasks);