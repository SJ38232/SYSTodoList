function submitTodo() {
    let todoListDiv = document.getElementById("todoListDiv");
    let inputTodo = document.getElementById("inputTodo").value;
    let inputDeadLine = document.getElementById("inputDeadLine").value;
    if (inputDeadLine == "") {
        alert("마감일을 입력해주세요");
        return;
    }
    if (inputTodo == "") {
        alert("내용을 입력해주세요");
        return;
    }
    createContent(todoListDiv, transDate(new Date), inputDeadLine, inputTodo, false);
    if (localStorage.getItem("todoList") == null) {
        let saveData = [];
        saveData.push(transDate(new Date()) + "/" + inputDeadLine + "/" + inputTodo + "/" + "false");
        localStorage.setItem("todoList", JSON.stringify(saveData));
    }
    else {
        let saveData = transDate(new Date()) + "/" + inputDeadLine + "/" + inputTodo + "/" + "false";
        let loadData = [];
        loadData = JSON.parse(localStorage.getItem("todoList"));
        loadData.push(saveData);
        localStorage.setItem("todoList", JSON.stringify(loadData));
    }
}
function createTodo(todoContent) {
    let sapList = todoContent.split("/");
    let todoListDiv = document.getElementById("todoListDiv");
    let submitDate = sapList[0];
    let inputTodo = sapList[2];
    let deadLine = sapList[1];
    let checked = JSON.parse(sapList[3]);
    createContent(todoListDiv, submitDate, deadLine, inputTodo, checked);
}
function createExpired(expiredContent) {
    let sapList = expiredContent.split("/");
    let todoListDiv = document.getElementById("expiredListDiv");
    let submitDate = sapList[0];
    let inputTodo = sapList[2];
    let deadLine = sapList[1];
    let checked = JSON.parse(sapList[3]);
    createContent(todoListDiv, submitDate, deadLine, inputTodo, checked);
}
function changeCheck(check) {
    let table = check.parentElement.parentElement.parentElement;
    let dateTr = table.rows[0];
    let contentTr = table.rows[1];
    let checked = table.rows[0].cells[0].firstChild.checked;
    let submitDate = dateTr.cells[1].innerText;
    let deadLine = dateTr.cells[2].innerText;
    submitDate = submitDate.substring(6);
    deadLine = deadLine.substring(6);
    let content = contentTr.cells[0].innerText;
    let data = submitDate + "/" + deadLine + "/" + content;
    let todoList = JSON.parse(localStorage.getItem("todoList"));
    for (let i = 0; i < todoList.length; i++) {
        if (todoList[i].includes(data)) {
            let temp = todoList[i].split("/");
            todoList[i] = temp[0] + "/" + temp[1] + "/" + temp[2] + "/" + checked;
        }
    }
    localStorage.setItem("todoList", JSON.stringify(todoList));
    if (checked) {
        table.setAttribute("class", "done");
    }
    else {
        table.setAttribute("class", "todo");
    }
}
function deleteTodo(button) {
    let div = button.parentElement.parentElement.parentElement.parentElement;
    let table = button.parentElement.parentElement.parentElement;
    let dateTr = table.rows[0];
    let contentTr = table.rows[1];
    let checked = table.rows[0].cells[0].firstChild.checked;
    let submitDate = dateTr.cells[1].innerText;
    let deadLine = dateTr.cells[2].innerText;
    submitDate = submitDate.substring(6);
    deadLine = deadLine.substring(6);
    let content = contentTr.cells[0].innerText;
    let data = submitDate + "/" + deadLine + "/" + content + "/" + checked;
    let todoList = JSON.parse(localStorage.getItem("todoList"));
    for (let i = 0; i < todoList.length; i++) {
        if (data == todoList[i]) {
            todoList.splice(i, 1);
        }
    }
    localStorage.setItem("todoList", JSON.stringify(todoList));
    div.remove();
}
function checkExpired(todoContent) {
    let sapList = todoContent.split("/");
    let sapDeadLine = sapList[1].split("-");
    let deadLine = new Date(parseInt(sapDeadLine[0]), parseInt(sapDeadLine[1]) - 1, parseInt(sapDeadLine[2]));
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    if (deadLine < today) {
        return true;
    }
    else {
        return false;
    }
}
function createContent(targetDiv, submitDate, deadline, content, checked) {
    let div = document.createElement("div");
    let table = document.createElement("table");
    let statusTr = document.createElement("tr");
    let contentTr = document.createElement("tr");
    let checkBoxTd = document.createElement("td");
    let submitDateTd = document.createElement("td");
    let deadLineTd = document.createElement("td");
    let contentTd = document.createElement("td");
    let deleteButtonTd = document.createElement("td");
    let checkbox = document.createElement("input");
    let deleteButton = document.createElement("input");
    table.appendChild(statusTr);
    statusTr.appendChild(checkBoxTd);
    checkBoxTd.appendChild(checkbox);
    statusTr.append(submitDateTd);
    statusTr.append(deadLineTd);
    statusTr.appendChild(deleteButtonTd);
    deleteButtonTd.appendChild(deleteButton);
    contentTr.append(contentTd);
    table.appendChild(contentTr);
    div.appendChild(table);
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("onclick", "changeCheck(this)");
    checkbox.checked = checked;
    checkBoxTd.setAttribute("rowspan", "2");
    checkBoxTd.setAttribute("class", "checkboxTd");
    submitDateTd.setAttribute("class", "dateTd");
    submitDateTd.innerText = "등록일 : " + submitDate;
    deadLineTd.setAttribute("class", "dateTd");
    deadLineTd.innerText = "마감일 : " + deadline;
    deleteButton.setAttribute("type", "button");
    deleteButton.setAttribute("value", "삭제");
    deleteButton.setAttribute("onclick", "deleteTodo(this)");
    deleteButtonTd.setAttribute("rowspan", "2");
    deleteButtonTd.setAttribute("class", "deleteBottonTd");
    contentTd.setAttribute("class", "contentTd");
    contentTd.setAttribute("colspan", "2");
    contentTd.setAttribute("onclick", "contentUpdateMode(this)");
    contentTd.innerText = content;
    if (targetDiv.getAttribute("id") == "expiredListDiv") {
        if (checkbox.checked) {
            deleteTodo(deleteButton);
            return;
        }
        else {
            table.setAttribute("class", "expired");
            checkbox.setAttribute("onclick", "");
        }
    }
    else {
        if (checkbox.checked) {
            table.setAttribute("class", "done");
        }
        else {
            table.setAttribute("class", "todo");
        }
    }
    let insertTarget = targetDiv.childNodes[2];
    targetDiv.insertBefore(div, insertTarget);
    document.getElementById("inputTodo").value = "";
}
function transDate(date) {
    let day = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    return day;
}
window.onload = function () {
    let today = document.getElementById("today");
    today.innerText = "등록일 : " + transDate(new Date());
    let todoList = [];
    if (localStorage.getItem("todoList") != null || localStorage.getItem("todoList") == "") {
        todoList = JSON.parse(localStorage.getItem("todoList"));
    }
    for (let i = 0; i < todoList.length; i++) {
        if (checkExpired(todoList[i])) {
            createExpired(todoList[i]);
        }
        else {
            createTodo(todoList[i]);
        }
    }
};
