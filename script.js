let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const list = document.getElementById("taskList");
  const noTasks = document.getElementById("noTasks");
  list.innerHTML = "";

  if (tasks.length === 0) {
    noTasks.style.display = "block";
  } else {
    noTasks.style.display = "none";
  }

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "task";
    if (task.completed) li.classList.add("completed");

    const span = document.createElement("span");
    span.textContent = task.text;

    const actions = document.createElement("div");
    actions.className = "task-actions";

    const completeBtn = document.createElement("button");
    completeBtn.innerHTML = task.completed ? "✅" : "✔️";
    completeBtn.onclick = () => toggleTask(index);

    const editBtn = document.createElement("button");
    editBtn.innerHTML = "✏️";
    editBtn.onclick = () => editTask(index);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "🗑️";
    deleteBtn.onclick = () => deleteTask(index);

    actions.append(completeBtn, editBtn, deleteBtn);
    li.append(span, actions);
    list.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();

  if (!text) return alert("Task cannot be empty.");

  const exists = tasks.some(task => task.text.toLowerCase() === text.toLowerCase());
  if (exists) return alert("Duplicate task name not allowed!");

  tasks.push({ text, completed: false });
  input.value = "";
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function editTask(index) {
  const newText = prompt("Edit your task:", tasks[index].text);
  if (newText === null) return;

  const trimmed = newText.trim();
  if (!trimmed) return alert("Task cannot be empty.");
  const exists = tasks.some((task, i) => i !== index && task.text.toLowerCase() === trimmed.toLowerCase());
  if (exists) return alert("Duplicate task name not allowed!");

  tasks[index].text = trimmed;
  saveTasks();
  renderTasks();
}

renderTasks();
