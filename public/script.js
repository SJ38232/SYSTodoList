function submitTodo(){
	var todoListDiv = document.getElementById("todoListDiv");
	var inputTodo = document.getElementById("inputTodo").value;
	var inputDeadLine = document.getElementById("inputDeadLine").value;
	var div = document.createElement("div");
	var table = document.createElement("table");
	var statusTr = document.createElement("tr");
	var contentTr = document.createElement("tr");
	var checkBoxTd = document.createElement("td");
	var submitDateTd = document.createElement("td");
	var deadLineTd = document.createElement("td");
	var contentTd = document.createElement("td");
	var deleteButtonTd = document.createElement("td");
	var checkbox = document.createElement("input");
	var deleteButton = document.createElement("input");
	if(inputDeadLine == ""){
		alert("마감일을 입력해주세요");
		return;
	}
	if(inputTodo.value == ""){
		alert("내용을 입력해주세요");
		return;
	}
	checkbox.setAttribute("type","checkbox");
	checkbox.setAttribute("onclick","completeCheck(this)");
	deleteButton.setAttribute("type","button");
	deleteButton.setAttribute("value","삭제");
	deleteButton.setAttribute("onclick","deleteTodo(this)");
	table.setAttribute("class","todo");
	checkBoxTd.setAttribute("rowspan","2");
	checkBoxTd.setAttribute("class","checkboxTd");
	deleteButtonTd.setAttribute("rowspan","2");
	deleteButtonTd.setAttribute("class","deleteBottonTd");
	table.appendChild(statusTr);
	statusTr.appendChild(checkBoxTd);
	checkBoxTd.appendChild(checkbox);
	statusTr.append(submitDateTd);
	statusTr.append(deadLineTd);
	submitDateTd.setAttribute("class","dateTd");
	submitDateTd.innerText = "등록일 : "+transDate(new Date())
	deadLineTd.setAttribute("class","dateTd");
	deadLineTd.innerText = "마감일 : "+ inputDeadLine;
	statusTr.appendChild(deleteButtonTd);
	deleteButtonTd.appendChild(deleteButton);
	table.appendChild(contentTr);
	contentTr.append(contentTd);
	contentTd.setAttribute("class","contentTd");
	contentTd.setAttribute("colspan","2");
	contentTd.setAttribute("onclick","contentUpdateMode(this)");
	contentTd.innerText = inputTodo;
	div.appendChild(table);
	todoListDiv.insertBefore(div,todoListDiv.secondChild);
	
	if(localStorage.getItem("todoList") == null){
		var saveData = transDate(new Date()) +"/" + inputDeadLine +"/" + inputTodo;
		localStorage.setItem("todoList",saveData);
	}else{
		var saveData = ","+ transDate(new Date()) +"/" + inputDeadLine +"/" + inputTodo;
		loadData = localStorage.getItem("todoList");
		saveData = loadData + saveData;
		saveData = saveData.slice(0, -1);
		localStorage.setItem("todoList",saveData);
	}
}
function completeCheck(check){
	if(check.checked){
		var table = check.parentElement.parentElement.parentElement;
		table.setAttribute("class","done");
	}else{
		var table = check.parentElement.parentElement.parentElement;
		table.setAttribute("class","todo");
	}
}
function transDate(date){
	var day = date.getFullYear()+"-"+ (date.getMonth()+1)+"-"+date.getDate();
	return day;
}
function deleteTodo(button){
	var div = button.parentElement.parentElement.parentElement.parentElement;
	div.remove();
}
function parseLocalStorage(){
	var loadData = localStorage.getItem("todoList");
	var todoList = loadData.split(",");
	return todoList;
}
function checkExpired(todoList){
	var sapList = todoList.split("/");
	var sapDeadLine = sapList[1].split("-");
	var deadLine = new Date(sapDeadLine[0],sapDeadLine[1]-1,sapDeadLine[2]);
	var today = new Date();
	if(deadLine < today){
		return true;
	}else{
		return false;
	}
}
function createTodo(todoList){
	var sapList = todoList.split("/");
	var todoListDiv = document.getElementById("todoListDiv");
	var inputTodo = sapList[2];
	var inputDeadLine = sapList[1];
	var div = document.createElement("div");
	var table = document.createElement("table");
	var statusTr = document.createElement("tr");
	var contentTr = document.createElement("tr");
	var checkBoxTd = document.createElement("td");
	var submitDateTd = document.createElement("td");
	var deadLineTd = document.createElement("td");
	var contentTd = document.createElement("td");
	var deleteButtonTd = document.createElement("td");
	var checkbox = document.createElement("input");
	var deleteButton = document.createElement("input");
	checkbox.setAttribute("type","checkbox");
	checkbox.setAttribute("onclick","completeCheck(this)");
	deleteButton.setAttribute("type","button");
	deleteButton.setAttribute("value","삭제");
	deleteButton.setAttribute("onclick","deleteTodo(this)");
	table.setAttribute("class","todo");
	checkBoxTd.setAttribute("rowspan","2");
	checkBoxTd.setAttribute("class","checkboxTd");
	deleteButtonTd.setAttribute("rowspan","2");
	deleteButtonTd.setAttribute("class","deleteBottonTd");
	table.appendChild(statusTr);
	statusTr.appendChild(checkBoxTd);
	checkBoxTd.appendChild(checkbox);
	statusTr.append(submitDateTd);
	statusTr.append(deadLineTd);
	submitDateTd.setAttribute("class","dateTd");
	submitDateTd.innerText = "등록일 : "+ sapList[0];
	deadLineTd.setAttribute("class","dateTd");
	deadLineTd.innerText = "마감일 : "+ inputDeadLine;
	statusTr.appendChild(deleteButtonTd);
	deleteButtonTd.appendChild(deleteButton);
	table.appendChild(contentTr);
	contentTr.append(contentTd);
	contentTd.setAttribute("class","contentTd");
	contentTd.setAttribute("colspan","2");
	contentTd.setAttribute("onclick","contentUpdateMode(this)");
	contentTd.innerText = inputTodo;
	div.appendChild(table);
	todoListDiv.insertBefore(div,todoListDiv.secondChild);
}
function createExpired(expiredList){
	var sapList = expiredList.split("/");
	var todoListDiv = document.getElementById("expiredListDiv");
	var inputTodo = sapList[2];
	var inputDeadLine = sapList[1];
	var div = document.createElement("div");
	var table = document.createElement("table");
	var statusTr = document.createElement("tr");
	var contentTr = document.createElement("tr");
	var checkBoxTd = document.createElement("td");
	var submitDateTd = document.createElement("td");
	var deadLineTd = document.createElement("td");
	var contentTd = document.createElement("td");
	var deleteButtonTd = document.createElement("td");
	var checkbox = document.createElement("input");
	var deleteButton = document.createElement("input");
	checkbox.setAttribute("type","checkbox");
	checkbox.setAttribute("onclick","completeCheck(this)");
	deleteButton.setAttribute("type","button");
	deleteButton.setAttribute("value","삭제");
	deleteButton.setAttribute("onclick","deleteTodo(this)");
	table.setAttribute("class","expired");
	checkBoxTd.setAttribute("rowspan","2");
	checkBoxTd.setAttribute("class","expiredcheckboxTd");
	deleteButtonTd.setAttribute("rowspan","2");
	deleteButtonTd.setAttribute("class","expireddeleteBottonTd");
	table.appendChild(statusTr);
	statusTr.appendChild(checkBoxTd);
	checkBoxTd.appendChild(checkbox);
	statusTr.append(submitDateTd);
	statusTr.append(deadLineTd);
	submitDateTd.setAttribute("class","expireddateTd");
	submitDateTd.innerText = "등록일 : "+ sapList[0];
	deadLineTd.setAttribute("class","expireddateTd");
	deadLineTd.innerText = "마감일 : "+ inputDeadLine;
	statusTr.appendChild(deleteButtonTd);
	deleteButtonTd.appendChild(deleteButton);
	table.appendChild(contentTr);
	contentTr.append(contentTd);
	contentTd.setAttribute("class","expiredcontentTd");
	contentTd.setAttribute("colspan","2");
	contentTd.setAttribute("onclick","contentUpdateMode(this)");
	contentTd.innerText = inputTodo;
	div.appendChild(table);
	todoListDiv.insertBefore(div,todoListDiv.secondChild);
}
window.onload = function(){
	var today = document.getElementById("today");
	today.innerText = "등록일 : "+transDate(new Date()); 
  	var rawList = parseLocalStorage();
  	for(i = 0; i < rawList.length;i++){
		if(checkExpired(rawList[i])){
			createExpired(rawList[i]);
		}else{
			createTodo(rawList[i]);
		}
	}
}