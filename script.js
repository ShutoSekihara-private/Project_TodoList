* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}

body {
  background-color: #f4f6f8;
  display: flex;
  justify-content: center;
  padding: 40px 16px;
}

.container {
  background: #ffffff;
  width: 100%;
  max-width: 480px;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
}

/* 進捗バー */
.progress-section {
  margin-bottom: 20px;
}

.progress-text {
  font-size: 14px;
  margin-bottom: 6px;
  color: #555;
}

.progress-bar-bg {
  width: 100%;
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  width: 0%;
  background-color: #4caf50;
  transition: width 0.3s ease;
}

/* 入力エリア */
.todo-form {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

.todo-form input[type="text"] {
  flex: 2;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.todo-form input[type="date"] {
  flex: 1.5;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.todo-form button {
  width: 40px;
  height: 38px;
  font-size: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.todo-form button:hover {
  background-color: #0056b3;
}

/* リスト表示 */
.todo-list {
  list-style: none;
}

.todo-item {
  display: flex;
  align-items: center;
  padding: 10px 8px;
  border-bottom: 1px solid #eee;
  gap: 12px;
}

.todo-item input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.todo-content {
  flex: 1;
}

.todo-text {
  font-size: 15px;
  color: #333;
}

.todo-due {
  font-size: 12px;
  color: #888;
}

/* 完了状態 */
.completed .todo-text {
  text-decoration: line-through;
  color: #aaa;
}

.completed .todo-due {
  color: #ccc;
}