document.addEventListener("DOMContentLoaded", () => {

    // Initialization of variables and DOM elements
    const taskInput = document.querySelector(".task-input input"); 
    const taskBox = document.getElementById("task-box"); 
    const filters = document.querySelectorAll(".filters span"); 
    const clearAll = document.querySelector(".clear-btn"); 

    // Retrieve the existing todo list from localStorage or initialize as an empty array
    let todos = JSON.parse(localStorage.getItem("todo-list")) || [];

    // Add event listeners to filter buttons
    filters.forEach(btn => {
        btn.addEventListener("click", () => {
            // Highlight the active filter button
            document.querySelector("span.active").classList.remove("active");
            btn.classList.add("active");

            // Display tasks based on the selected filter
            showTodo(btn.id);
        });
    });

    // Function to display tasks based on the filter
    function showTodo(filter) {
        let li = ""; 

        // Loop through the todos array and generate HTML for tasks
        if (todos) {
            todos.forEach((todo, id) => {
                let isCompleted = todo.status == "completed" ? "checked" : ""; // Check if the task is completed

                // Only include tasks that match the selected filter
                if (filter == todo.status || filter == "all") {
                    li += `<li class="task">
				<label for="${id}">
					<input onclick="updateStatus(this)" type="checkbox" id="${id}"${isCompleted}>
					<p class="${isCompleted}">${todo.name}</p>
					<button onclick="deleteTask(${id})" class="delete-btn">Delete</button>
				</label>
			</li>`;
                }
            });
        }

        // Display tasks or a message if no tasks are available
        taskBox.innerHTML = li || `<span>You don't have any tasks</span>`;
    }

    // Display all tasks initially
    showTodo("all");

    // Function to delete a specific task
    function deleteTask(deletetodo) {
        todos.splice(deletetodo, 1); // Remove the task from the array
        localStorage.setItem("todo-list", JSON.stringify(todos)); // Update localStorage
        showTodo("all"); // Refresh the task list
    }

    // Add event listener to the "Clear All" button to delete all tasks
    clearAll.addEventListener("click", () => {
        todos.splice(0, todos.length); // Clear the todos array
        localStorage.setItem("todo-list", JSON.stringify(todos)); // Update localStorage
        showTodo("all"); // Refresh the task list
    });

    // Make deleteTask globally accessible for inline onclick calls
    window.deleteTask = deleteTask;

    // Function to update the status (completed or pending) of a task
    function updateStatus(select) {
        let taskName = select.nextElementSibling; // Getting second element 

        if (select.checked) {
            taskName.classList.add("checked"); 
            todos[select.id].status = "completed"; 
        } else {
            taskName.classList.remove("checked"); 
            todos[select.id].status = "pending"; 
        }
        localStorage.setItem("todo-list", JSON.stringify(todos)); // Update localStorage
    }

    // Make updateStatus globally accessible for inline onclick calls
    window.updateStatus = updateStatus;

    // Add event listener to the input field for adding tasks
    taskInput.addEventListener("keyup", e => {
        let userTask = taskInput.value.trim(); // Get the entered task and remove extra spaces

        // Check if the "Enter" key is pressed and the input is not empty
        if (e.key == "Enter" && userTask) {
            // If todos is null, initialize it
            if (!todos) {
                todos = [];
            }

            // Clear the input field after adding the task
            taskInput.value = ""; 

            // Create a task object with default "pending" status
            let taskInfo = { name: userTask, status: "pending" };

            // Pushing to todo array
            todos.push(taskInfo);

            // Update localStorage with the new task list
            localStorage.setItem("todo-list", JSON.stringify(todos));

            // Refresh the task list to include the new task
            showTodo("all");
        }
    });
});
