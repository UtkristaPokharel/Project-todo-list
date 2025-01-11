// document.addEventListener("DOMContentLoaded", () => {

const taskInput = document.querySelector(".task-input input");
taskBox = document.getElementById("task-box");

// Getting localStorage
let todos = JSON.parse(localStorage.getItem("todo-list")) || [];


function showTodo() {
    let li = "";
    if (todos) {
        todos.forEach((todo, id) => {
            let isCompleted = todo.status == "completed" ? "checked" : "";
            li += `<li class="task">
				<label for="${id}">
					<input onclick="updateStatus(this)"type="checkbox" id="${id}"${isCompleted}>
					<p class="${isCompleted}">${todo.name}</p>
					<button class="delete-btn">Delete</button>
				</label>
			</li>`;
        });
    }
    taskBox.innerHTML = li;
}

showTodo();

function updateStatus(select) {
    let taskName = select.nextElementSibling;

    if (select.checked) {
        taskName.classList.add("checked");
        //updating to completed when checkbox is clicked
        todos[select.id].status = "completed";
    } else {
        taskName.classList.remove("checked");
        //updating to pending when checkbox is clicked
        todos[select.id].status = "pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos));
}

taskInput.addEventListener("keyup", e => {
    let userTask = taskInput.value.trim();
    if (e.key == "Enter" && userTask) {


        if (!todos) {
            todos = [];//Parse empty array if todos is not there

        }
        taskInput.value = ""; // Clear the input field after adding a task
        let taskInfo = { name: userTask, status: "pending" };
        todos.push(taskInfo); // Pushing into todo-list array

        // Converting to string and storing
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo();
    }
});

// });
