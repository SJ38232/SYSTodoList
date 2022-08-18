function submitTodo(){
	var todoListDiv = document.getElementById("todoListDiv");
	var inputTodo = document.getElementById("inputTodo").value;
	var inputDeadLine = document.getElementById("inputDeadLine").value;
	if(inputDeadLine == ""){
		alert("마감일을 입력해주세요");
		return;
	}
	if(inputTodo.value == ""){
		alert("내용을 입력해주세요");
		return;
	}
	createContent(todoListDiv,transDate(new Date),inputDeadLine,inputTodo,false);
	if(localStorage.getItem("todoList") == null){
		var saveData = [];
		saveData.push(transDate(new Date()) +"/" + inputDeadLine +"/" + inputTodo +"/"+"false");
		localStorage.setItem("todoList",JSON.stringify(saveData));
	}else{
		var saveData = transDate(new Date()) +"/" + inputDeadLine +"/" + inputTodo+"/"+"false";
		loadData = [];
		loadData = JSON.parse(localStorage.getItem("todoList"));
		loadData.push(saveData);
		localStorage.setItem("todoList",JSON.stringify(loadData));
	}
}
function createTodo(todoList){
	var sapList = todoList.split("/");
	var todoListDiv = document.getElementById("todoListDiv");
	var submitDate = sapList[0];
	var inputTodo = sapList[2];
	var deadLine = sapList[1];
	var checked = JSON.parse(sapList[3]);
	createContent(todoListDiv,submitDate,deadLine,inputTodo,checked);
}
function createExpired(expiredList){
	var sapList = expiredList.split("/");
	var todoListDiv = document.getElementById("expiredListDiv");
	var submitDate = sapList[0];
	var inputTodo = sapList[2];
	var deadLine = sapList[1];
	var checked = JSON.parse(sapList[3]);
	createContent(todoListDiv,submitDate,deadLine,inputTodo,checked);
}
function changeCheck(check){
	var table = check.parentElement.parentElement.parentElement;
	var dateTr = table.rows[0];
	var contentTr = table.rows[1];
	var check = table.rows[0].cells[0].firstChild.checked;
	var submitDate = dateTr.cells[1].innerText;
	submitDate = submitDate.substring(6);
	var deadLine = dateTr.cells[2].innerText;
	deadLine = deadLine.substring(6);
	var content = contentTr.firstChild.innerText;
	var data = submitDate+"/"+deadLine+"/"+content;
	var todoList = JSON.parse(localStorage.getItem("todoList"));
	for(i = 0 ; i < todoList.length; i++){
		if(todoList[i].includes(data)){
			temp = todoList[i].split("/");
			todoList[i] = temp[0]+"/"+temp[1]+"/"+temp[2]+"/"+check;
		}
	}
	localStorage.setItem("todoList",JSON.stringify(todoList));
	if(check){
		table.setAttribute("class","done");
	}else{
		table.setAttribute("class","todo");
	}
}

function deleteTodo(button){
	var div = button.parentElement.parentElement.parentElement.parentElement;
	var table = button.parentElement.parentElement.parentElement;
	var dateTr = table.rows[0];
	var contentTr = table.rows[1];
	var check = table.rows[0].cells[0].firstChild.checked;
	var submitDate = dateTr.cells[1].innerText;
	submitDate = submitDate.substring(6);
	var deadLine = dateTr.cells[2].innerText;
	deadLine = deadLine.substring(6);
	var content = contentTr.firstChild.innerText;
	var data = submitDate+"/"+deadLine+"/"+content+"/"+check;
	var todoList = JSON.parse(localStorage.getItem("todoList"));
	for(i = 0 ; i < todoList.length; i++){
		if(data == todoList[i]){
			todoList.splice(i,1);
		}
	}
	localStorage.setItem("todoList",JSON.stringify(todoList));
	
	div.remove();
}
function checkExpired(todoList){
	var sapList = todoList.split("/");
	var sapDeadLine = sapList[1].split("-");
	var deadLine = new Date(sapDeadLine[0],sapDeadLine[1]-1,sapDeadLine[2]);
	var today = new Date();
	today.setHours(0,0,0,0);
	if(deadLine < today){
		return true;
	}else{
		return false;
	}
}
function createContent(targetDiv,submitDate,deadline,content,checked){
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
	checkbox.setAttribute("type","checkbox");
	checkbox.setAttribute("onclick","changeCheck(this)");
	checkbox.checked = checked;
	deleteButton.setAttribute("type","button");
	deleteButton.setAttribute("value","삭제");
	deleteButton.setAttribute("onclick","deleteTodo(this)");
	checkBoxTd.setAttribute("rowspan","2");
	checkBoxTd.setAttribute("class","checkboxTd");
	deleteButtonTd.setAttribute("rowspan","2");
	deleteButtonTd.setAttribute("class","deleteBottonTd");
	submitDateTd.setAttribute("class","dateTd");
	submitDateTd.innerText = "등록일 : "+submitDate;
	deadLineTd.setAttribute("class","dateTd");
	deadLineTd.innerText = "마감일 : "+ deadline;
	contentTd.setAttribute("class","contentTd");
	contentTd.setAttribute("colspan","2");
	contentTd.setAttribute("onclick","contentUpdateMode(this)");
	contentTd.innerText = content;
	if(targetDiv.getAttribute("id") == "expiredListDiv"){
		if(checkbox.checked){
			deleteTodo(deleteButton);
			return;
		} else {
			table.setAttribute("class","expired");
			checkbox.setAttribute("onclick","");
		}
	}else{
		if(checkbox.checked){
			table.setAttribute("class","done");
		}else{
			table.setAttribute("class","todo");
		}
	}
	targetDiv.insertBefore(div,targetDiv.secondChild);
	document.getElementById("inputTodo").value = "";
}
function transDate(date){
	var day = date.getFullYear()+"-"+ (date.getMonth()+1)+"-"+date.getDate();
	return day;
}
window.onload = function(){
	var today = document.getElementById("today");
	today.innerText = "등록일 : "+transDate(new Date()); 
	var todoList = [];
  	if(localStorage.getItem("todoList") !=null || localStorage.getItem("todoList") == ""){
		todoList = JSON.parse(localStorage.getItem("todoList"));
	}
  	for(i = 0; i < todoList.length;i++){
		if(checkExpired(todoList[i])){
			createExpired(todoList[i]);
		}else{
			createTodo(todoList[i]);
		}
	}
}