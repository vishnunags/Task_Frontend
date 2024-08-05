const apiUrl = 'http://ec2-34-205-29-69.compute-1.amazonaws.com:8087/api/tasks'; // Backend API URL

// Fetch and display tasks
async function fetchTasks() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Failed to fetch tasks');
        const tasks = await response.json();
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = ''; // Clear existing tasks

        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task.description;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = () => deleteTask(task.id);

            li.appendChild(deleteButton);
            taskList.appendChild(li);
        });
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

// Add a new task
async function addTask(description) {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ description })
        });
        if (!response.ok) throw new Error('Failed to add task');
        fetchTasks(); // Refresh the task list
    } catch (error) {
        console.error('Error adding task:', error);
    }
}

// Delete a task
async function deleteTask(id) {
    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete task');
        fetchTasks(); // Refresh the task list
    } catch (error) {
        console.error('Error deleting task:', error);
    }
}

// Handle form submission
document.getElementById('taskForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const taskDescription = document.getElementById('taskDescription').value;
    if (taskDescription) {
        addTask(taskDescription);
        document.getElementById('taskDescription').value = ''; // Clear input field
    }
});

// Initial fetch of tasks
fetchTasks();
