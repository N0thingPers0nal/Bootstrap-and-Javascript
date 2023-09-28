let todosArray = [
  { id: 1, name: "Ram", phoneno: 9876543210 },
  { id: 2, name: "Janu", phoneno: 9087654321 },
];
let editId = 0;

const Nameref = document.getElementById("todoInputname");
const Phonenoref = document.getElementById("todoInputphoneno");
const btnref = document.getElementById("btn");
const Name = document.getElementById("todos");

const getRandomNumber = (max = 1000) => {
  return Math.floor(Math.random() * max);
};

const deleteTodo = (id) => {
  todosArray = todosArray.filter((todo) => {
    if (todo.id !== id) {
      return todo;
    }
  });
  render();
};

const editTodo = (id) => {
  editId = id;
  const clickedTodo = todosArray.find((todo) => todo.id === id);
  btnref.innerText = "Edit";
  Nameref.value = clickedTodo.name;
  Phonenoref.value = clickedTodo.phoneno;
};

const render = () => {
  let todosDiv = "";

  for (let ch of todosArray) {
    todosDiv += `<div class="d-flex align-items-center justify-content-between p-2">
                      <p class="fs-5 m-0">${ch.name}</p>
                      <p class="fs-5 m-0">${ch.phoneno}</p>
                      <div>
                        <button onclick="editTodo(${ch.id})" class="btn btn-outline-secondary">Edit</button>
                        <button onclick="deleteTodo(${ch.id})" class="btn btn-outline-danger">Delete</button>
                      </div>
                    </div>`;
  }
  Name.innerHTML = todosDiv;
};

btnref.addEventListener("click", () => {
  if (Nameref.value !== "" && Phonenoref.value !== "") {
    if (editId === 0) {
      todosArray.push({
        id: getRandomNumber(),
        name: Nameref.value,
        phoneno: Phonenoref.value,
      });
      // Nameref.value = "";
    } else {
      todosArray = todosArray.map((todo) => {
        if (todo.id == editId)
          return { ...todo, name: Nameref.value, phoneno: Phonenoref.value };
        else return todo;
      });
    }
    editId = 0;
    Nameref.value = "";
    Phonenoref.value = "";
    btnref.innerText = "Add";
    render();
  } else {
    Nameref.classList.replace("border-info", "is-invalid");
  }
});

Nameref.addEventListener("keyup", () => {
  if (Nameref.value !== "") {
    Nameref.classList.replace("is-invalid", "border-info");
  } else {
    Nameref.classList.replace("border-info", "is-invalid");
  }
});
Phonenoref.addEventListener("keyup", () => {
  if (Phonenoref.value !== "") {
    Phonenoref.classList.replace("is-invalid", "border-onfo");
  } else {
    Phonenoref.classList.replace("border-info", "is-invalid");
  }
});
render();
