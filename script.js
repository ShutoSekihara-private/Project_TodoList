(function () {
  const taskInput = document.getElementById("taskInput");
  const dateInput = document.getElementById("dateInput");
  const addBtn = document.getElementById("addBtn");

  const todoList = document.getElementById("todoList");
  const futureList = document.getElementById("futureList");
  const doneList = document.getElementById("doneList");

  const doneCountEl = document.getElementById("doneCount");
  const rateValueEl = document.getElementById("rateValue");

  const todoEmptyMsg = document.getElementById("todoEmptyMsg");
  const futureEmptyMsg = document.getElementById("futureEmptyMsg");
  const doneEmptyMsg = document.getElementById("doneEmptyMsg");

  const praiseOverlay = document.getElementById("praiseOverlay");
  const praiseText = document.getElementById("praiseText");
  const otsukareText = document.getElementById("otsukareText");

  const praiseWords = [
    "よく頑張った！！", "天才！", "すごい！", "最高！", "えらい！！",
    "ナイス！", "完璧！", "その調子！", "やったね！", "神！！"
  ];

  const confettiColors = ["#ff8fab", "#ffd166", "#8fe3c8", "#a29bfe", "#74b9ff", "#ff6b6b"];
  const STORAGE_KEY = "dekita-todo-app-state-v1";

  // タスク配列
  let tasks = [];

  // 今日の日付文字列（YYYY-MM-DD）
  function todayStr() {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }

  // MM/DD 表示用フォーマット
  function formatDate(dateStr) {
    if (!dateStr) return "";
    const parts = dateStr.split("-");
    if (parts.length < 3) return dateStr;
    return `${parts[1]}/${parts[2]}`;
  }

  // 初期化時に日付入力のデフォルト値を「今日」に設定
  dateInput.value = todayStr();

  // LocalStorage 保存
  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  // LocalStorage 読み込み
  function loadState() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      try {
        tasks = JSON.parse(data);
      } catch (e) {
        tasks = [];
      }
    }
  }

  // 空メッセージ表示切り替え
  function updateEmptyMessages() {
    todoEmptyMsg.style.display = todoList.children.length ? "none" : "block";
    futureEmptyMsg.style.display = futureList.children.length ? "none" : "block";
    doneEmptyMsg.style.display = doneList.children.length ? "none" : "block";
  }

  // バッジ（達成数・達成率）更新
  function updateBadges() {
    const total = tasks.length;
    const done = tasks.filter((t) => t.status === "done").length;
    const rate = total === 0 ? 0 : Math.round((done / total) * 100);

    doneCountEl.textContent = done;
    rateValueEl.textContent = rate;
  }

  // 紙吹雪エフェクト
  function launchConfetti() {
    for (let i = 0; i < 35; i++) {
      const el = document.createElement("div");
      el.className = "confetti";
      el.style.left = Math.random() * 100 + "vw";
      el.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
      
      const size = Math.random() * 8 + 6;
      el.style.width = size + "px";
      el.style.height = size * 1.4 + "px";

      const duration = Math.random() * 1.5 + 1.2;
      el.style.animationDuration = duration + "s";
      el.style.animationDelay = Math.random() * 0.2 + "s";

      document.body.appendChild(el);
      setTimeout(() => el.remove(), (duration + 0.3) * 1000);
    }
  }

  // 褒め言葉ポップアップ
  function triggerPraise() {
    praiseText.textContent = praiseWords[Math.floor(Math.random() * praiseWords.length)];
    praiseOverlay.style.display = "flex";

    launchConfetti();

    setTimeout(() => {
      praiseOverlay.style.display = "none";
    }, 1200);
  }

  // 画面描画
  function render() {
    todoList.innerHTML = "";
    futureList.innerHTML = "";
    doneList.innerHTML = "";

    const today = todayStr();

    tasks.forEach((task) => {
      const li = document.createElement("li");

      if (task.status === "done") {
        li.textContent = task.text;
        doneList.appendChild(li);
      } else {
        const taskMain = document.createElement("div");
        taskMain.className = "task-main";

        const textSpan = document.createElement("span");
        textSpan.className = "task-text";
        textSpan.textContent = task.text;

        const dateSpan = document.createElement("span");
        dateSpan.className = "task-date";
        dateSpan.textContent = formatDate(task.date);

        taskMain.appendChild(textSpan);
        taskMain.appendChild(dateSpan);

        const btnGroup = document.createElement("div");
        btnGroup.className = "btn-group";

        // 完了ボタン
        const completeBtn = document.createElement("button");
        completeBtn.className = "complete-btn";
        completeBtn.textContent = "🌸";
        completeBtn.addEventListener("click", () => {
          task.status = "done";
          saveState();
          render();
          triggerPraise();
        });

        // 削除ボタン
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "✖";
        deleteBtn.addEventListener("click", () => {
          tasks = tasks.filter((t) => t.id !== task.id);
          saveState();
          render();
        });

        btnGroup.appendChild(completeBtn);
        btnGroup.appendChild(deleteBtn);

        li.appendChild(taskMain);
        li.appendChild(btnGroup);

        // 期日が今日なら「今日やること」、それ以外は「今後やること」
        if (task.date === today) {
          todoList.appendChild(li);
        } else {
          futureList.appendChild(li);
        }
      }
    });

    updateEmptyMessages();
    updateBadges();
  }

  // タスク追加処理
  function handleAddTask() {
    const text = taskInput.value.trim();
    const date = dateInput.value || todayStr();

    if (!text) return;

    tasks.push({
      id: Date.now(),
      text: text,
      date: date,
      status: "pending"
    });

    saveState();
    render();

    taskInput.value = "";
    taskInput.focus();
  }

  // イベント登録
  addBtn.addEventListener("click", handleAddTask);
  taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleAddTask();
  });

  // 初期起動
  loadState();
  render();
})();