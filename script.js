// LocalStorageからタスクを復元（なければ空配列）
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// DOM要素の取得
const todoForm = document.getElementById("todo-form");
const taskInput = document.getElementById("task-input");
const dueInput = document.getElementById("due-input");
const todoList = document.getElementById("todo-list");
const progressPercentage = document.getElementById("progress-percentage");
const completedCount = document.getElementById("completed-count");
const totalCount = document.getElementById("total-count");
const progressBarFill = document.getElementById("progress-bar-fill");
const toast = document.getElementById("toast");

// タスク保存関数
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// フォーム送信時（タスク追加）
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newTodo = {
    id: Date.now(),
    text: taskInput.value.trim(),
    due: dueInput.value,
    completed: false
  };

  todos.push(newTodo);
  saveTodos();

  taskInput.value = "";
  dueInput.value = "";

  render();
});

// チェック切り替え
function toggleTodo(id) {
  let justCompleted = false;

  todos = todos.map((todo) => {
    if (todo.id === id) {
      const nextStatus = !todo.completed;
      if (nextStatus) justCompleted = true; // 今回完了になったか判定
      return { ...todo, completed: nextStatus };
    }
    return todo;
  });

  saveTodos();
  render();

  if (justCompleted) {
    showToast();
  }
}

// タスク削除
function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  saveTodos();
  render();
}

// アニメーショントースト表示
function showToast() {
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

// 達成率の計算・表示更新
function updateProgress() {
  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  totalCount.textContent = total;
  completedCount.textContent = completed;
  progressPercentage.textContent = `${percentage}%`;
  progressBarFill.style.width = `${percentage}%`;
}

// 一覧描画
function render() {
  todoList.innerHTML = "";

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.className = `todo-item ${todo.completed ? "completed" : ""}`;

    // チェックボックス
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", () => toggleTodo(todo.id));

    // テキスト領域
    const contentDiv = document.createElement("div");
    contentDiv.className = "todo-content";

    const textDiv = document.createElement("div");
    textDiv.className = "todo-text";
    textDiv.textContent = todo.text;

    const dueDiv = document.createElement("div");
    dueDiv.className = "todo-due";
    dueDiv.textContent = `期限: ${todo.due}`;

    contentDiv.appendChild(textDiv);
    contentDiv.appendChild(dueDiv);

    // 削除ボタン
    const delBtn = document.createElement("button");
    delBtn.className = "delete-btn";
    delBtn.textContent = "✕";
    delBtn.addEventListener("click", () => deleteTodo(todo.id));

    li.appendChild(checkbox);
    li.appendChild(contentDiv);
    li.appendChild(delBtn);

    todoList.appendChild(li);
  });

  updateProgress();
}

// 初期起動時の描画
render();