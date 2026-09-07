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

  const STORAGE_KEY = 'dekita-todo-app-state-v1';

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
    todoEmptyMsg.style.display = todoList.children.length ? 'none' :