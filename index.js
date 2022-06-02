// doneListUpdate();
initiate();
let text = document.getElementById("text");
let addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", function () {
  let text = document.getElementById("text");
  let textVal = text.value;
  if (textVal.trim() != 0) {
    if (localStorage.getItem("pendingTodo") == null) {
      var array = [];
      array.push(textVal);
      localStorage.setItem("pendingTodo", JSON.stringify(array));
    } else {
      var arrStr = localStorage.getItem("pendingTodo");
      array = JSON.parse(arrStr);
      if (array.indexOf(textVal) === -1) {
        array.push(textVal);
      }
      localStorage.setItem("pendingTodo", JSON.stringify(array));
    }
    initiate();
  }

  text.value = "";
});

//update the list
function initiate() {
  if (localStorage.getItem("pendingTodo") == null) {
    array = [];
    localStorage.setItem("pendingTodo", JSON.stringify(array));
  } else {
    arrStr = localStorage.getItem("pendingTodo");
    array = JSON.parse(arrStr);
    let html = "";
    array.forEach((item, index) => {
      if (array.indexOf(item) === -1) {
        array.push(item);
      }
      html +=
        `
      <span><input type="checkbox" name="checkbox" id="pendingItemNo_` +
        index +
        `" class="pendingItems" onchange="moveToDone(event)" value = ${item}>${item}</span><br>
      `;
    });

    document.getElementById("pending").innerHTML = html;
  }

  if (localStorage.getItem("doneTodo") == null) {
    array = [];
    localStorage.setItem("doneTodo", JSON.stringify(array));
  } else {
    arrStr = localStorage.getItem("doneTodo");
    array = JSON.parse(arrStr);
    let html = "";
    array.forEach((item, index) => {
      if (array.indexOf(item) === -1) {
        array.push(item);
      }
      html +=
        `
      <span><input type="checkbox" onchange="moveToPending(event)" checked name="checkbox" id="doneItemNo_` +
        index +
        `" class="doneItems" value = ${item}>${item}</span><button onclick="removeTodo(event)">x</button><br>
      `;
    });

    document.getElementById("done").innerHTML = html;
  }
}

function moveToDone(event){
    console.log(event);
    var val = event.target.value;
    var pending = localStorage.getItem("pendingTodo");
    pending = JSON.parse(pending);
    var done = localStorage.getItem("doneTodo");
    done = JSON.parse(done);
    done.push(val);
    pending.splice(pending.indexOf(val), 1);
    localStorage.setItem("pendingTodo", JSON.stringify(pending));
    localStorage.setItem("doneTodo", JSON.stringify(done));
    initiate();
}

function moveToPending(event){
    console.log(event);
    var val = event.target.value;
    var pending = localStorage.getItem("pendingTodo");
    pending = JSON.parse(pending);
    var done = localStorage.getItem("doneTodo");
    done = JSON.parse(done);
    pending.push(val);
    done.splice(done.indexOf(val), 1);
    localStorage.setItem("pendingTodo", JSON.stringify(pending));
    localStorage.setItem("doneTodo", JSON.stringify(done));
    initiate();
}

// var checkboxElements = document.querySelectorAll("input[type = 'checkbox'] ");
// for (var i = 0; i < checkboxElements.length; i++) {
//   checkboxElements[i].addEventListener("click", (e) => {
//     console.log(e.target.value);
//     let doneVal = e.target.value;
//     if (localStorage.getItem("doneTodo") == null) {
//       newArr = [];
//       newArr.push(doneVal);
//       localStorage.setItem("doneTodo", JSON.stringify(newArr));
//     } else {
//       arrStr = localStorage.getItem("doneTodo");
//       newArr = JSON.parse(arrStr);
//       newArr.push(doneVal);
//       localStorage.setItem("doneTodo", JSON.stringify(newArr));
//     }

//     doneListUpdate();
//   });
// }
// function doneListUpdate() {
//   if (localStorage.getItem("doneTodo") == null) {
//     newArr = [];
//     localStorage.setItem("doneTodo", JSON.stringify(newArr));
//   } else {
//     arrStr = localStorage.getItem("doneTodo");
//     newArr = JSON.parse(arrStr);
//     let doneeList = "";
//     newArr.forEach((t, index) => {
//       doneeList += `
//             <br><label><input type="checkbox" name="check" id="check2" class="check2" checked>${t}<button class="crossbtn" id="crossbtn" onclick ="removeTodo(${index})">x</button></label>
//             `;
//     });
//     document.getElementById("done").innerHTML = doneeList;
//   }
// }
function removeTodo(index) {
  arrStr = localStorage.getItem("doneTodo");
  newArr = JSON.parse(arrStr);
  newArr.splice(index, 1);
  localStorage.setItem("doneTodo", JSON.stringify(newArr));
  initiate();
}
