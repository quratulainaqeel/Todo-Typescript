import "./style.css";

interface Todo {
  title: string;
  iscompleted: boolean;
  readonly id: string;
}

const todos: Array<Todo> = [];
const TodosContainer = document.querySelector(
  ".todosContainer"
) as HTMLDivElement;
const todoInput = document.getElementsByName("title")[0] as HTMLInputElement;
const MyForm = document.getElementById("myform") as HTMLFormElement;

MyForm.onsubmit = (e: SubmitEvent) => {
  e.preventDefault();

  const todo: Todo = {
    title: todoInput.value,
    iscompleted: false,
    id: String(Math.random() * 1000),
  };

  todos.push(todo);
  todoInput.value = "";
  renderTodos(todos);
};

const renderTodos = (todosList: Todo[]) => {
  TodosContainer.innerHTML = "";
  todosList.map((item) => {
    generateTodoItem(item.title, item.iscompleted, item.id);
  });
};

const generateTodoItem = (title: string, isCompeleted: boolean, id: string) => {
  const todo = document.createElement("div") as HTMLDivElement;
  todo.className = "todo";

  // creating a checkbox
  const checkbox = document.createElement("input") as HTMLInputElement;
  checkbox.setAttribute("type", "checkbox");
  checkbox.className = "isCompeleted";
  checkbox.checked = isCompeleted;

  checkbox.onchange = () => {
    todos.find((item) => {
      item.id === id ? item.iscompleted = checkbox.checked : false;
    });
    paragraph.className = checkbox.checked ? "textcut" : "";
  };
  
  // creating p for title
  const paragraph = document.createElement("p") as HTMLParagraphElement;
  paragraph.innerText = title;
  paragraph.className = isCompeleted ? "textcut" : "";

  // creating delete button
  const btn = document.createElement("button") as HTMLButtonElement;
  btn.innerText = "X";
  btn.className = "deletebtn";
  btn.onclick = () => {
    deleteTodo(id);
  };

  // Appending all to TodoItems
  todo.append(checkbox, paragraph, btn);
  TodosContainer.append(todo);
};

const deleteTodo = (id: string) => {
  const idx = todos.findIndex((item) => item.id === id);
  todos.splice(idx, 1);
  console.log(todos);
  renderTodos(todos);
};
