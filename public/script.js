//HTML에서 Data를 입력받아 새로운 Content 생성
function submitContent() {
    // HTML에서 입력을 받고 조건을 만족하지 못할경우 alert
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
    if (localStorage.getItem("todoList") == null) { // localStorage가 없을 경우 새로 만듬(등록시간/만료시간/내용/체크여부)순서의 string 데이터
        let saveData = [];
        saveData.push(transDate(new Date()) + "/" + inputDeadLine + "/" + inputTodo + "/" + "false");
        localStorage.setItem("todoList", JSON.stringify(saveData));
    }
    else { // localStorage가 있을 경우 기존의 localStorage의 뒤에 붙임 
        let saveData = transDate(new Date()) + "/" + inputDeadLine + "/" + inputTodo + "/" + "false";
        let loadData = [];
        loadData = JSON.parse(localStorage.getItem("todoList"));
        loadData.push(saveData);
        localStorage.setItem("todoList", JSON.stringify(loadData));
    }
}
//todoList에 들어갈 Content를 만듬
function createTodo(todoContent) {
    let sapList = todoContent.split("/"); //(등록시간/만료시간/내용/체크여부)형식을 자름
    let todoListDiv = document.getElementById("todoListDiv");
    let submitDate = sapList[0];
    let deadLine = sapList[1];
    let inputTodo = sapList[2];
    let checked = JSON.parse(sapList[3]);
    createContent(todoListDiv, submitDate, deadLine, inputTodo, checked);
}
//ExpiredList에 들어갈 Content를 만듬
function createExpired(expiredContent) {
    let sapList = expiredContent.split("/"); //(등록시간/만료시간/내용/체크여부)형식을 자름
    let todoListDiv = document.getElementById("expiredListDiv");
    let submitDate = sapList[0];
    let deadLine = sapList[1];
    let inputTodo = sapList[2];
    let checked = JSON.parse(sapList[3]);
    createContent(todoListDiv, submitDate, deadLine, inputTodo, checked);
}
//Content의 Check의 onclick 함수
function changeCheck(check) {
    //check를 기준으로 포함된 테이블 정보 읽음
    let table = check.parentElement.parentElement.parentElement;
    let dateTr = table.rows[0];
    let contentTr = table.rows[1];
    let checked = table.rows[0].cells[0].firstChild.checked;
    let submitDate = dateTr.cells[1].innerText;
    let deadLine = dateTr.cells[2].innerText;
    submitDate = submitDate.substring(6); //(등록일 : )제거
    deadLine = deadLine.substring(6); //(마감일 : )제거
    let content = contentTr.cells[0].innerText;
    let data = submitDate + "/" + deadLine + "/" + content;
    let todoList = JSON.parse(localStorage.getItem("todoList"));
    for (let i = 0; i < todoList.length; i++) {
        if (todoList[i].includes(data)) { //localStorage에 저장된 데이터 변경
            let temp = todoList[i].split("/");
            todoList[i] = temp[0] + "/" + temp[1] + "/" + temp[2] + "/" + checked;
        }
    }
    localStorage.setItem("todoList", JSON.stringify(todoList)); //localStorage에 변경사항 적용
    //check타입에 따라 css 스타일 변경
    if (checked) {
        table.setAttribute("class", "done");
    }
    else {
        table.setAttribute("class", "todo");
    }
}
//Content를 localStorage와 HTML에서 삭제
function deleteContent(button) {
    //button을 기준으로 포함된 테이블 정보 읽음
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
        if (data == todoList[i]) { //일치한 string을 제거하여 localStorage에서 해당 Content삭제
            todoList.splice(i, 1);
        }
    }
    localStorage.setItem("todoList", JSON.stringify(todoList)); //localStorage에 변경사항 적용
    div.remove(); //div 삭제하여  HTML상의 Content 삭제
}
//날짜를 비교하여 만료 여부 확인
function checkExpired(todoContent) {
    let sapList = todoContent.split("/"); //(등록시간/만료시간/내용/체크여부)형식을 자름
    let sapDeadLine = sapList[1].split("-"); //(년-월-일)형식을 자름
    // 현재 시간과 비교하기 위해 자른 데이터를 바탕으로 Date 타입을 생성
    let deadLine = new Date(parseInt(sapDeadLine[0]), parseInt(sapDeadLine[1]) - 1, parseInt(sapDeadLine[2]));
    let today = new Date();
    today.setHours(0, 0, 0, 0); //시간을 0으로 맞춰 조건을 동등하게 맞춤
    if (deadLine < today) {
        return true;
    }
    else {
        return false;
    }
}
//매개변수를 이용하여 새로운 Content 제작
function createContent(targetDiv, submitDate, deadline, content, checked) {
    //Content의 모양을 잡아주기 위해 HTMLDOM들을 생성하여 부모자식관계 형성
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
    //매개변수를 이용하여 내용 설정
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
    deleteButton.setAttribute("onclick", "deleteContent(this)");
    deleteButtonTd.setAttribute("rowspan", "2");
    deleteButtonTd.setAttribute("class", "deleteBottonTd");
    contentTd.setAttribute("class", "contentTd");
    contentTd.setAttribute("colspan", "2");
    contentTd.setAttribute("onclick", "contentUpdateMode(this)");
    contentTd.innerText = content;
    if (targetDiv.getAttribute("id") == "expiredListDiv") {
        if (checkbox.checked) { // expiredList에 속하면서 이미 완료된 Content의 경우 표시할 필요가 없으므로 삭제
            deleteContent(deleteButton);
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
    let insertTarget = targetDiv.childNodes[2]; //역순으로 Content생성
    targetDiv.insertBefore(div, insertTarget);
    document.getElementById("inputTodo").value = ""; // 다음 입력을 위하여 input의 스트링 초기화
}
//Content 내용 수정
function updateContent(content) {
}
//Date 타입을 String으로 변환
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
    //만료 여부를 확인하여 todoList와 expiredList 생성
    for (let i = 0; i < todoList.length; i++) {
        if (checkExpired(todoList[i])) {
            createExpired(todoList[i]);
        }
        else {
            createTodo(todoList[i]);
        }
    }
};
