const newTaskInput = document.getElementById("new-task");
const addTaskButton = document.querySelector(".task-row-wrapper button");
const incompleteTasksList = document.getElementById("incompleteTasks");
const completedTasksList = document.getElementById("completed-tasks");

function createDeleteButton() {
  const button = document.createElement("button");
  const img = document.createElement("img");

  button.className = "delete";
  img.src = "./remove.svg";
  img.alt = "Delete task";
  button.appendChild(img);

  return button;
}

function createNewTaskElement(taskTitle) {
  const listItem = document.createElement("li");
  const checkBox = document.createElement("input");
  const label = document.createElement("label");
  const editInput = document.createElement("input");
  const editButton = document.createElement("button");
  const deleteButton = createDeleteButton();

  checkBox.type = "checkbox";

  // Use innerText to automatically escape special characters and prevent XSS
  label.innerText = taskTitle;
  label.className = "task";

  editInput.type = "text";
  editInput.className = "task";

  editButton.innerText = "Edit";
  editButton.className = "edit";

  listItem.append(checkBox, label, editInput, editButton, deleteButton);
  return listItem;
}

function addTask() {
  if (!newTaskInput.value) return;
  const listItem = createNewTaskElement(newTaskInput.value);

  incompleteTasksList.appendChild(listItem);
  bindTaskEvents(listItem);

  newTaskInput.value = "";
}

function editTask() {
  const listItem = this.parentNode;
  const editInput = listItem.querySelector("input[type=text]");
  const label = listItem.querySelector("label");
  const editButton = listItem.querySelector(".edit");
  const isEditMode = listItem.classList.contains("editMode");

  if (isEditMode) {
    label.innerText = editInput.value;
    editButton.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editButton.innerText = "Save";
  }

  listItem.classList.toggle("editMode");
}

function deleteTask() {
  const listItem = this.parentNode;
  const list = listItem.parentNode;
  list.removeChild(listItem);
}

function toggleTaskCompletion() {
  const listItem = this.parentNode;
  const targetList = this.checked ? completedTasksList : incompleteTasksList;
  targetList.appendChild(listItem);
}

function bindTaskEvents(taskListItem) {
  const checkBox = taskListItem.querySelector("input[type=checkbox]");
  const editButton = taskListItem.querySelector("button.edit");
  const deleteButton = taskListItem.querySelector("button.delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = toggleTaskCompletion;
}

function initTasks() {
  addTaskButton.addEventListener("click", addTask);

  const initialTasks = [
    ...incompleteTasksList.children,
    ...completedTasksList.children,
  ];

  initialTasks.forEach(bindTaskEvents);
}

initTasks();
