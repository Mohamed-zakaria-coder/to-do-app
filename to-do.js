let textInput = document.querySelector("input[type='text']");
let submitButton = document.querySelector("input[type='submit']");
let content = document.querySelector(".content");
let form = document.querySelector("form");
let removeAll;
let contentParent = document.querySelector(".content-parent");
form.onsubmit = function (e) {
  e.preventDefault();
};

let arrOfTasks = [];
if (JSON.parse(localStorage.getItem("tasks"))) {
  arrOfTasks = JSON.parse(localStorage.getItem("tasks"));
}
getData();

let contentDiv = document.querySelectorAll(".content div");

contentDiv.forEach((div) => {
  div.addEventListener("click", function () {
    if (div.classList.contains("done")) {
      div.classList.remove("done");
    } else {
      div.classList.add("done");
    }
  });
});
content.addEventListener("click", function (e) {
  if (e.target.classList.contains("del")) {
    let taskId = e.target.parentElement.getAttribute("id");
    arrOfTasks = arrOfTasks.filter((item) => item.id != taskId);
    addToLocal(arrOfTasks);
    e.target.parentElement.remove();
  }
  if (content.innerHTML.length < 1) {
    removeAll.remove();
  }
});

submitButton.addEventListener("click", function () {
  if (textInput.value !== "") {
    let task = {
      id: Date.now(),
      content: textInput.value,
    };
    arrOfTasks.push(task);
    content.innerHTML = "";
    addElements(arrOfTasks);
    addToLocal(arrOfTasks);
    addRemoveAll();
    textInput.value = "";
  }
});

function addElements(arrOfTasks) {
  arrOfTasks.forEach((task) => {
    let textParent = document.createElement("div");
    textParent.id = task.id;
    let text = document.createElement("span");
    text.textContent = task.content;
    textParent.appendChild(text);
    let delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.className = "del";
    textParent.appendChild(delBtn);
    content.appendChild(textParent);
  });
}

function addToLocal(arrOfTasks) {
  localStorage.setItem("tasks", JSON.stringify(arrOfTasks));
}
function getData() {
  let data = JSON.parse(localStorage.getItem("tasks"));
  if (data) {
    let tasks = data;
    addElements(tasks);
    addRemoveAll();
  }
}

function addRemoveAll() {
  if (content.children.length > 0) {
    if (!document.querySelector(".remove-all")) {
      removeAll = document.createElement("button");
      removeAll.textContent = "Remove-All";
      removeAll.className = "remove-all";
      removeAll && contentParent.appendChild(removeAll);

      removeAll.addEventListener("click", function () {
        content.textContent = "";
        arrOfTasks = [];

        localStorage.clear();
        removeAll.remove();
        console.log(content.innerHTML.length);
      });
    }
  }
}
