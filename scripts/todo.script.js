const btn = document.getElementById('btn');
const inputField = document.getElementById('field');
const date = document.getElementById('today-date');
const listTasks = document.getElementById('list');
const counter = document.getElementById('counter');


const WeekDays = {
    'Mon': 'Monday',
    'Tue': 'Tuesday',
    'Wed': 'Wednesday',
    'Thu': 'Thursday',
    'Fri': 'Friday',
    'Sat': 'Saturday',
    'Sun': 'Sunday'
}

const Months = {
    'Jan': '01',
    'Feb': '02',
    'Mar': '03',
    'Apr': '04',
    'May': '05',
    'Jun': '06',
    'Jul': '07',
    'Aug': '08',
    'Sep': '09',
    'Oct': '10',
    'Nov': '11',
    'Dec': '12'
}
//Initialize counter to count tasks
let cnt =0;

//Add tasks
const addTaskToList = async () => {
    if (inputField.value === '') {   
        window.history.back();
    }
    else {
        await addTasks(cnt);
        addCounting(cnt+1);
        cnt++;
        inputField.value='';
        inputField.focus();
    }
    
}

btn.addEventListener('click', addTaskToList);

//Press enter to add tasks
inputField.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        btn.click();
    }
})

//Click anywhere on the task bar to mark the task completed
const handleCheckTask = (node) => {
    let inputChild = node.children[0];
    let label = node.children[1];
    let icon = node.children[2];
    node.style.cursor = 'default';
    inputChild.style.cursor = 'default';
    label.style.cursor = 'default';
    icon.style.visibility = 'visible';
    if (!inputChild.checked) cnt--;
    inputChild.checked = true;   
    addCounting(cnt);
    inputChild.disabled = true;
    node.style.backgroundColor = 'rgb(245, 101, 101)';
}

document.addEventListener('click', (e) => {
    if (e.target){
        if (e.target.tagName === 'LABEL') {
            handleCheckTask(e.target.parentNode);
        }
        if (e.target.id === 'block-div') {
            handleCheckTask(e.target);
        }
        if (e.target.id.includes('task')) {
            e.target.checked = false;
            handleCheckTask(e.target.parentNode);
        }
        if (e.target.tagName === 'SPAN') {
            let blockDivNode = e.target.parentNode;
            blockDivNode.style.transform = 'translateX(200%)';
            blockDivNode.style.transition = 'transform .5s';
            blockDivNode.style.transitionTimingFunction = 'ease';
            setTimeout(() => {blockDivNode.remove();}, 500);
        }
    }
    
});

//Add present weekday and date

const now = Date.now();
let datenow = new Date(now);
datenow = datenow.toString().slice(0,15);



//Handle add task to the list
const addTasks = (cnt) => {
    let div = document.createElement('div');
    div.id = 'block-div';
    let task = document.createElement('input');
    task.setAttribute('type', 'checkbox');
    task.id = 'task'+cnt;
    task.class = 'tasks';
    let label = document.createElement('label');
    label.setAttribute('for', 'task'+cnt);
    label.innerHTML = inputField.value;
    let icon = document.createElement('span');
    icon.className = 'fas fa-trash icon';
    div.appendChild(task);
    div.appendChild(label);
    div.appendChild(icon);
    listTasks.appendChild(div);
    
}

//Count the pending tasks
const addCounting = (cnt) => {
    if (cnt>0) counter.innerHTML = `You have ${cnt} pending tasks`;
    else { counter.innerHTML = 'No task pending!'; }
}

//transform date to the right form

const toDate = (str) => {
    let weekday = str.slice(0,3); 
    let month = str.slice(4,7);
    let day = str.slice(8,10);
    let year = str.slice(11);
    return WeekDays[weekday] + ', ' + day + '-' + Months[month] + '-' + year;
}

date.innerHTML = toDate(datenow);
