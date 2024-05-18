/* Add Task */
let form = document.querySelector(".form");
let AddTaskBtn = document.querySelector(".AddBtn");

AddTaskBtn.onclick = function () {
    form.style.top = 0;
}

/* Add To Local Storage */
let Inp = document.querySelector("#TaskInp");
let Add = document.querySelector("#Add");
let tbody = document.querySelector("tbody");
let i = 0;

Add.onclick = function () {
    i++;
    localStorage.setItem(`Task-${i}`, Inp.value);
    let currentDate = new Date();

    let dateString = currentDate.toDateString();

    localStorage.setItem(`currentDate - ${ i }`, dateString);

    addTaskToTable(i, Inp.value); // Call the function to add the task to the table
    form.style.top = "-1000px";
}
// Function to add task to the table
function addTaskToTable(index, task) {
    let CreateRow = document.createElement("tr");
    let Createth1 = document.createElement("th");
    Createth1.innerText = index;
    Createth1.scope = "row";
    let Createtd = document.createElement("td");
    Createtd.innerText = task;
    CreateRow.appendChild(Createth1);
    CreateRow.appendChild(Createtd);

    let currentDate = new Date();
    let dateString = currentDate.toDateString();
    let Createtd2 = document.createElement("td");
    Createtd2.innerText = dateString;
    CreateRow.appendChild(Createtd2);

    let Createtd3 = document.createElement("td");
    let doneIcon = document.createElement("i");
    doneIcon.className = "fa-solid fa-check";
    doneIcon.addEventListener("click", function () {
        let taskIndex = CreateRow.querySelector("th").innerText;
        localStorage.removeItem(`Task-${taskIndex}`);
        localStorage.removeItem(`currentDate-${taskIndex}`);
        CreateRow.remove();
    });

    Createtd3.appendChild(doneIcon);
    CreateRow.appendChild(Createtd3);

    tbody.appendChild(CreateRow);
}


// 

// Function to populate the table with tasks from local storage when the page loads
window.onload = function () {
    for (let j = 1; j <= localStorage.length; j++) {
        let key = localStorage.key(j - 1);
        if (key.includes("Task-")) {
            let taskIndex = key.split("-")[1];
            let task = localStorage.getItem(key);
            addTaskToTable(taskIndex, task);
            if (parseInt(taskIndex) > i) {
                i = parseInt(taskIndex);
            }
        }
    }

};
