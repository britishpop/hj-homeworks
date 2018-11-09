const undoneTasks = document.getElementsByClassName("undone")[0];
const doneTasks = document.getElementsByClassName("done")[0];
const tasks = document.querySelectorAll("label input");

for (let task of tasks) {
  task.addEventListener("input", moveTask);
}

function moveTask (event) {
  const currentTask = event.target;
  const currentTaskParent = event.target.parentNode;
  const movedTask = currentTaskParent.parentNode.removeChild(currentTaskParent);
  if (!currentTask.checked) {
    undoneTasks.appendChild(movedTask);
    currentTask.checked = false;
  } else {
    doneTasks.appendChild(movedTask);
    currentTask.checked = true;
  }
}
