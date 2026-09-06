(function(){
  const taskInput = document.getElementById('taskInput');
  const dateInput = document.getElementById('dateInput');
  const addBtn = document.getElementById('addBtn');

  const todoList = document.getElementById('todoList');
  const futureList = document.getElementById('futureList');
  const doneList = document.getElementById('doneList');

  const doneCountEl = document.getElementById('doneCount');
  const rateValueEl = document.getElementById('rateValue');

  const todoEmptyMsg = document.getElementById('todoEmptyMsg');
  const futureEmptyMsg = document.getElementById('futureEmptyMsg');
  const doneEmptyMsg = document.getElementById('doneEmptyMsg');

  const praiseOverlay = document.getElementById('praiseOverlay');
  const praiseText = document.getElementById('praiseText');
  const otsukareText = document.getElementById('otsukareText');

  const praiseWords = [
    'よく頑張った！！','天才！','すごい！','最高！','えらい！！',
    'ナイス！','完璧！','その調子！','やったね！','神！！'
  ];

  const confettiColors = ['#ff8fab','#ffd166','#8fe3c8','#a29bfe','#74b9ff','#ff6b6b'];

  let doneCount = 0;
  let totalCount = 0;

  function todayStr(){
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth()+1).padStart(2,'0');
    const day = String(d.getDate()).padStart(2,'0');
    return `${y}-${m}-${day}`;
  }

  function formatDate(dateStr){
    const [y,m,d] = dateStr.split('-');
    return `${m}/${d}`;
  }

  function updateEmptyMessages(){
    todoEmptyMsg.style.display = todoList.children.length ? 'none' : 'block';
    futureEmptyMsg.style.display = futureList.children.length ? 'none' : 'block';
    doneEmptyMsg.style.display = doneList.children.length ? 'none' : 'block';
  }

  function updateStats(){
    doneCountEl.textContent = doneCount;
    const rate = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;
    rateValueEl.textContent = rate;
  }

  function buildTaskLi(text, dateStr){
    const li = document.createElement('li');

    const main = document.createElement('div');
    main.className = 'task-main';

    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = text;
    main.appendChild(span);

    if(dateStr){
      const dateSpan = document.createElement('span');
      dateSpan.className = 'task-date';
      dateSpan.textContent = '期日: ' + formatDate(dateStr);
      main.appendChild(dateSpan);
    }

    const btnGroup = document.createElement('div');
    btnGroup.className = 'btn-group';

    const completeBtn = document.createElement('button');
    completeBtn.className = 'complete-btn';
    completeBtn.textContent = '✓';
    completeBtn.setAttribute('aria-label','完了');

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '✕';
    deleteBtn.setAttribute('aria-label','削除');

    btnGroup.appendChild(completeBtn);
    btnGroup.appendChild(deleteBtn);

    li.appendChild(main);
    li.appendChild(btnGroup);

    deleteBtn.addEventListener('click', () => {
      li.remove();
      totalCount = Math.max(0, totalCount - 1);
      updateStats();
      updateEmptyMessages();
    });

    completeBtn.addEventListener('click', () => completeTask(li, text));

    return li;
  }

  function addTask(){
    const text = taskInput.value.trim();
    if(!text) return;

    const dateStr = dateInput.value; // '' or 'YYYY-MM-DD'
    const li = buildTaskLi(text, dateStr);

    if(dateStr && dateStr > todayStr()){
      futureList.appendChild(li);
    } else {
      todoList.appendChild(li);
    }

    totalCount++;

    taskInput.value = '';
    dateInput.value = '';
    taskInput.focus();

    updateStats();
    updateEmptyMessages();
  }

  function completeTask(li, text){
    li.remove();

    const doneLi = document.createElement('li');
    doneLi.textContent = text;
    doneList.insertBefore(doneLi, doneList.firstChild);

    doneCount++;
    updateStats();
    updateEmptyMessages();
    showPraise();
  }

  function showPraise(){
    const word = praiseWords[Math.floor(Math.random() * praiseWords.length)];
    praiseText.textContent = word;
    praiseOverlay.style.display = 'flex';

    // アニメーション再スタートのためのリセット
    praiseText.style.animation = 'none';
    otsukareText.style.animation = 'none';
    void praiseText.offsetWidth;
    praiseText.style.animation = '';
    otsukareText.style.animation = '';

    spawnConfetti();

    setTimeout(() => {
      praiseOverlay.style.display = 'none';
    }, 1100);
  }

  function spawnConfetti(){
    const count = 40;
    for(let i = 0; i < count; i++){
      const conf = document.createElement('div');
      conf.className = 'confetti';
      const size = 6 + Math.random() * 8;
      conf.style.width = size + 'px';
      conf.style.height = (size * 0.4 + 4) + 'px';
      conf.style.left = Math.random() * 100 + 'vw';
      conf.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)];
      const duration = 1.4 + Math.random() * 1.2;
      conf.style.animationDuration = duration + 's';
      conf.style.animationDelay = (Math.random() * 0.3) + 's';
      document.body.appendChild(conf);
      setTimeout(() => conf.remove(), (duration + 0.5) * 1000);
    }
  }

  addBtn.addEventListener('click', addTask);
  taskInput.addEventListener('keydown', (e) => {
    if(e.key === 'Enter'){
      e.preventDefault();
      addTask();
    }
  });

  updateEmptyMessages();
  updateStats();
})();