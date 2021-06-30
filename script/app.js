"use strict"

// Selectors

const todoList = document.querySelector(".todo-list");
const todoInput = document.querySelector(".todo-input");
const addButton = document.querySelector(".todo-button");
const filterTodos = document.querySelector(".filter-todo");
const deleteCompleted = document.querySelector(".delete-completed");
const modalOverlay = document.querySelector(".modal-overlay");
const modalWindow = document.querySelector(".modal");
const modalInput = document.querySelector(".modal__input");
const modalOk = document.querySelector(".modal__button-ok");
const modalCancel = document.querySelector(".modal__button-cancel");
const helperAdd = document.querySelector(".helper_add");
const helperDelete = document.querySelector(".helper_delete");
const helperEdit = document.querySelector(".helper_edit");

let todoArray = [];

// Displaying Local Storage
if (localStorage.getItem("myTodos")) {
	todoArray = JSON.parse(localStorage.getItem("myTodos"));
	displayTodos();
}

// Event Listeners
addButton.addEventListener("click", creatingTodoObj);
todoList.addEventListener("change", checkChanging);
modalOk.addEventListener("click", editSubmitting);
modalCancel.addEventListener("click", editCancelling);
modalOverlay.addEventListener("mousedown", overlayHiding);
todoList.addEventListener("click", listChanging);
filterTodos.addEventListener("click", todoFiltration);
deleteCompleted.addEventListener("click", deletingCompleted);


// Functions
function displayTodos() {
	todoList.innerHTML = "";

	todoArray.forEach(function(item, i){
		item.id = i;
		// create li
		let todoLi = document.createElement("li");
		todoLi.classList.add("todo-li");
		todoLi.setAttribute("id", `${i}`);
		todoLi.innerText = item.todo;

		// create div and append it
		let todoDiv = document.createElement("div");
		todoDiv.classList.add("todo-div");
		todoLi.append(todoDiv);

		// create checkbox and append it
		let checkbox = document.createElement("input");
		checkbox.classList.add("checkbox");
		checkbox.setAttribute("id", `inp_${i}`);
		checkbox.setAttribute("type", "checkbox");
		if (item.checked === true) {
			checkbox.setAttribute("checked", "");
		}
		let checkLabel = document.createElement("label");
		checkLabel.classList.add("checkbox-label");
		checkLabel.setAttribute("for", `inp_${i}`);
		checkLabel.setAttribute("title", "Done!");
		todoDiv.append(checkbox);
		todoDiv.append(checkLabel);

		// create edit button and append it
		let editButton = document.createElement("button");
		editButton.classList.add("edit-btn");
		editButton.setAttribute("data-id", `${i}`);
		editButton.setAttribute("title", "Edit");
		editButton.innerHTML = '<i class="fas fa-pen"></i>';
		todoDiv.append(editButton);

		// create delete button and append it
		let deleteButton = document.createElement("button");
		deleteButton.classList.add("delete-btn");
		deleteButton.setAttribute("title", "Delete");
		deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
		todoDiv.append(deleteButton);

		// append li to ul
		todoList.prepend(todoLi);
	});

	filterTodos.selectedIndex = 0;
}

function creatingTodoObj(e) {
	e.preventDefault();

	let trimmedValue = todoInput.value.trim();
	if (!trimmedValue) {
		todoInput.value = "";
		return;
	}

	let todoItem = {
		todo: trimmedValue,
		checked: false,
	};

	todoArray.push(todoItem);
	displayTodos();
	localStorage.setItem("myTodos", JSON.stringify(todoArray));

	todoInput.value = "";
	helperAdd.style.opacity = "1";
	helperAdd.style.zIndex = "5";
	setTimeout(function() {
		helperAdd.style.opacity = "0";
		helperAdd.style.zIndex = "-1";
	}, 500);
}

function todoFiltration(e) {
	let inputs = todoList.getElementsByTagName('input');
		for (let inp of inputs) {
			switch(e.target.value) {
				case "all":
					inp.closest("li").style.display = "flex";
					break;
				case "completed":
					if (inp.hasAttribute('checked')) {
						inp.closest("li").style.display = "flex";
					} else {
						inp.closest("li").style.display = "none";
					}
					break;
				case "uncompleted":
					if (inp.hasAttribute('checked')) {
						inp.closest("li").style.display = "none";
					} else {
						inp.closest("li").style.display = "flex";
					}
					break;
			}
		}
}

function deletingCompleted(e) {
	e.preventDefault();

	let uncheckedArray = todoArray.filter(function(item) {
		return item.checked == false;
	});
	let checkedArray = todoArray.filter(function(item) {
		return item.checked == true;
	});

	if (checkedArray.length > 0) {
		helperDelete.style.opacity = "1";
		helperDelete.style.zIndex = "5";
		let asd = setTimeout(function(){
			helperDelete.style.opacity = "0";
			helperDelete.style.zIndex = "-1";
		}, 500);
	}

	todoArray = uncheckedArray;

	displayTodos();
	localStorage.setItem("myTodos", JSON.stringify(todoArray));
	
	if (todoArray.length === 0) localStorage.removeItem("myTodos");
}

function listChanging(e) {
	let target = e.target;
	if (!target.closest("li")) return;
	let itemId = target.closest("li").getAttribute("id");
	let targetId = target.getAttribute("data-id");
	if (target.classList[0] === "delete-btn") {
		todoArray.forEach(function(item, i) {
			if (item.id == itemId) {
				todoArray.splice(i, 1);
			}
		});
		
		displayTodos();
		localStorage.setItem("myTodos", JSON.stringify(todoArray));

		if (todoArray.length === 0) localStorage.removeItem("myTodos");

		helperDelete.style.opacity = "1";
		helperDelete.style.zIndex = "5";
		setTimeout(function() {
			helperDelete.style.opacity = "0";
			helperDelete.style.zIndex = "-1";
		}, 500);
	}

	if (target.classList[0] === "edit-btn") {
		todoArray.forEach(function(item, i) {
			if (item.id == itemId) {
				modalOk.setAttribute("data-id", `${i}`);
			}
		});
		modalOverlay.classList.add("modal-overlay_visible");
		modalWindow.classList.add("modal_visible");
		modalInput.value = target.closest("li").innerText;
		modalInput.focus();
		modalInput.select();
	}
}

function checkChanging(e) {
	let idInput = e.target.getAttribute("id");
	todoArray.forEach(function(item, i) {
		if (idInput == `inp_${i}`) {
			item.checked = !item.checked;
		}
	});

	displayTodos();
	localStorage.setItem("myTodos", JSON.stringify(todoArray));
}

function editSubmitting(e) {
			e.preventDefault();

			let target = e.target;
			let editWindow = modalInput.value;
			let targetId = target.getAttribute("data-id");
			todoArray.forEach(function(item){
				if (item.id == targetId && editWindow) {
					let trimmedEdit = editWindow.trim();
					if (trimmedEdit) {
						item.todo = trimmedEdit;
					}
				}
			});

			displayTodos();
			localStorage.setItem("myTodos", JSON.stringify(todoArray));

			modalInput.value = "";
			modalOverlay.classList.remove("modal-overlay_visible");
			modalWindow.classList.remove("modal_visible");

			helperEdit.style.opacity = "1";
			helperEdit.style.zIndex = "5";
			setTimeout(function() {
				helperEdit.style.opacity = "0";
				helperEdit.style.zIndex = "-1";
			}, 500);
}


function editCancelling(e) {
			e.preventDefault();

			modalOverlay.classList.remove("modal-overlay_visible");
			modalWindow.classList.remove("modal_visible");	
}


function overlayHiding(e){
			if (e.target !== modalOverlay) {
				return
			} else {
				modalOverlay.classList.remove("modal-overlay_visible");
				modalWindow.classList.remove("modal_visible");
			}
}