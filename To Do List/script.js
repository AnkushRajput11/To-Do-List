let taskList = document.getElementById("task-list");
let inputElement = document.getElementById("task-input");
let background = document.getElementsByClassName("main-div")[0];
let menu = document.getElementsByClassName("menu-div")[0];
let listHeading = document.getElementsByClassName("list-heading")[0];
let inputTaskDiv = document.getElementsByClassName("add-task")[0];
let listDiv = document.getElementsByClassName("list")[0];
let scheduledContentDiv = document.getElementById("scheduled-content");

function addTask() {
  let val = document.getElementById("task-input");

  if (val.value !== "") {
    let li = document.createElement("li");
    li.innerHTML = val.value;

    taskList.appendChild(li);
    //scheduled task content

    if (taskList.childElementCount == 1) {
      let newDiv = document.createElement("div");
      newDiv.setAttribute("id", "todayNode");
      newDiv.setAttribute("class", "node");
      scheduledContentDiv.appendChild(newDiv);

      let head = document.createElement("span");
      head.innerHTML = "Today";
      head.setAttribute("class", "node-head");
      newDiv.appendChild(head);

      let newTask = document.createElement("p");
      newTask.innerHTML = val.value;
      newDiv.appendChild(newTask);
    } else {
      let element = document.getElementById("todayNode");
      let newTask = document.createElement("p");
      newTask.innerHTML = val.value;
      if (element) {
        element.appendChild(newTask);
      }
    }

    //
    val.value = "";

    let span1 = document.createElement("span");
    span1.innerHTML = "&#x1F5D1;";
    span1.setAttribute("class", "span1");

    li.appendChild(span1);

    let span2 = document.createElement("span");
    span2.innerHTML = "&#9998;";
    span2.setAttribute("class", "span2");
    li.appendChild(span2);

    let span3 = document.createElement("span");
    span3.innerHTML = "&#x1F4CC;";
    span3.setAttribute("class", "span3");
    li.appendChild(span3);
  }
  saveData();
  //console.log(taskList.innerHTML);
}
function saveData() {
  localStorage.setItem("myTask", taskList.innerHTML);
}
function displayData() {
  taskList.innerHTML = localStorage.getItem("myTask");
}
displayData();

//event listner for edit pin and delete
taskList.addEventListener(
  "click",
  function (event) {
    if (event.target.tagName === "LI") {
      event.target.classList.toggle("checked");
      saveData();
    } else if (event.target.className === "span1") {
      event.target.parentElement.remove();
      saveData();
    } else if (event.target.className === "span3") {
      let arr = document.getElementsByTagName("li");
      let ele = event.target.parentElement;

      if (event.target.id === "pinned") {
        //console.log("1. " + event.target.id);
        event.target.style.backgroundColor = "white";
        event.target.style.color = "transparent";
        event.target.style.textShadow = "0px 0px 0px lightgrey";

        event.target.id = "";
        //console.log("2. " + event.target.id);

        let index = 0;
        for (let i = 0; i < arr.length; i++) {
          // console.log("3. " + arr[i].id);

          if (arr[i] == ele) {
            for (let j = i; j < arr.length; j++) {
              if (arr[j + 1].id === "pinned") {
                let temp = arr[j].innerHTML;
                arr[j].innerHTML = arr[j + 1].innerHTML;
                arr[j + 1].innerHTML = temp;
              } else {
                index = j;
                break;
              }
            }
          }
        }

        arr[index].id = "";
        // console.log("4. " + arr[index].id);
      } else {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] === ele) {
            let temp = arr[i].innerHTML;
            for (let j = i; j > 0; j--) {
              arr[j].innerHTML = arr[j - 1].innerHTML;
              arr[j].id = arr[j - 1].id;
            }
            arr[0].innerHTML = temp;
          }
        }

        let spanEle = document.getElementsByClassName("span3");

        spanEle[0].style.backgroundColor = "#F9E2AF";
        spanEle[0].style.color = "blue";

        spanEle[0].id = "pinned";
        arr[0].id = "pinned";

        // console.log("5. " + arr[0].id);
        //console.log("6. " + spanEle[0].id);
      }

      saveData();
    } else if (event.target.className === "span2") {
      let input = document.createElement("input");
      input.setAttribute("type", "text");
      input.setAttribute("autofocus", "");

      let string = event.target.parentElement.innerHTML;
      let newArr = string.split("<");

      input.value = newArr[0];

      let currentList = event.target.parentElement;
      currentList.appendChild(input);

      input.onkeypress = function (event) {
        if (event.keyCode === 13) {
          newArr[0] = input.value;

          let newInnerHTML = newArr.join("<");

          currentList.innerHTML = newInnerHTML;

          //currentList.removeChild(input);
          //input.remove();
        }
      };
      // input.addEventListener("keypress",function(event){

      // 		newArr[0]=input.value;

      // 	let newInnerHTML = newArr.join('<');
      // 	console.log(newArr.join('<'));

      // 	currentList.innerHTML = newInnerHTML;
      // },false);

      //currentList.removeChild(input);
      saveData();
    }
  },
  false
);

inputElement.addEventListener(
  "click",
  (event) => {
    //console.log("input clicked");
    let ele = document.getElementById("task-button");
    ele.className = "task-button";
  },
  false
);

background.addEventListener(
  "click",
  (event) => {
    let ele = document.getElementById("task-button");
    if (ele.className == "task-button") ele.className = "";
  },
  true
);

inputElement.addEventListener("keypress", (event) => {
  if (event.code == "Enter") {
    addTask();
    inputElement.blur();
  }
});

menu.addEventListener("click", (event) => {
  let ele = event.target;

  if (ele.id == "today" || ele.id == "scheduled") {
    if (ele.className == "") {
      let activeArr = document.getElementsByClassName("menu-active");
      for (let i of activeArr) {
        i.className = "";
      }
      ele.className = "menu-active";

      if (ele.id == "today") {
        listHeading.innerHTML = "Today";
        inputTaskDiv.style.display = "flex";
        listDiv.style.display = "block";
        scheduledContentDiv.style.display = "none";
      } else {
        listHeading.innerHTML = "Scheduled";
        inputTaskDiv.style.display = "none";
        listDiv.style.display = "none";
        scheduledContentDiv.style.display = "flex";
      }
    }
  }
});
