const taskInput = document.querySelector(".task-input input");

taskInput.addEventListener("keyup", e => {
    let userTask = taskInput.value.trim();
    if (e.key == "Enter" && userTask) {
        // Getting localStorage
        let todos = localStorage.getItem("todo-list");
        todos = todos ? JSON.parse(todos) : []; // Parse or initialize as empty array

        let taskInfo = { name: userTask, status: "pending" };
        todos.push(taskInfo); // Pushing into todo-list array

        // Converting to string and storing
        localStorage.setItem("todo-list", JSON.stringify(todos));
        taskInput.value = ""; // Clear the input field after adding a task
    }
});
