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
    let taskInput = node.children[1];
    let icon = node.children[3];
    
    node.style.cursor = 'default';
    node.style.backgroundColor = 'rgb(245, 101, 101)';
    
    inputChild.style.cursor = 'default';
    
    
    taskInput.style.cursor = 'default';
    taskInput.style.backgroundColor = 'rgb(245, 101, 101)';
    
    icon.style.visibility = 'visible';
    
    if (!inputChild.checked) cnt--;
    inputChild.checked = true;   
    inputChild.disabled = true;
    
    node.children[2].style.visibility = 'hidden';
    node.children[4].style.visibility = 'hidden';
        
    addCounting(cnt);
}

var notInput = true;

document.addEventListener('click', (e) => {
    if (e.target){
        //Labels clicked
        if (e.target.tagName === 'LABEL') {
            handleCheckTask(e.target.parentNode);
        }
        //List tasks clicked
        if (e.target.id === 'block-div') {
            if (notInput) handleCheckTask(e.target);
        }
        //Checkbox ticked
        if (e.target.id.includes('task')) {
            e.target.checked = false;
            if (notInput) handleCheckTask(e.target.parentNode);
        }
        //Delete icon clicked
        if (e.target.id.includes('trash-icon')) {
            let blockDivNode = e.target.parentNode;
            
            blockDivNode.style.transform = 'translateX(200%)';
            blockDivNode.style.transition = 'transform .5s';
            blockDivNode.style.transitionTimingFunction = 'ease';

            setTimeout(() => {blockDivNode.remove();}, 500);
        }
        //Edit icon clicked
        if (e.target.id.includes('edit-icon')) {
            notInput = false;
            let blockDivNode = e.target.parentNode;
            let taskInp = blockDivNode.children[2];
            let label = blockDivNode.children[1];

            blockDivNode.style.cursor = 'default';
            blockDivNode.style.backgroundColor = 'rgb(245, 101, 101)';

            blockDivNode.children[0].style.cursor = 'default';
            blockDivNode.children[0].disabled = true;
           

            label.style.visibility = 'hidden';

            taskInp.disabled = false;
            taskInp.style.visibility = 'visible';
            taskInp.style.cursor = 'text';
            taskInp.style.backgroundColor = 'rgb(255, 255, 254)';
            taskInp.focus();
            taskInp.select();
            
            e.target.style.visibility = 'hidden';
        }
    }
    
});

//Press enter to save after editing
document.addEventListener('keydown', (e) => {
    if (e.target.id.includes('task-field') && e.keyCode === 13) {
        notInput = true;

        let inputField = e.target;
        let blockDivNode = inputField.parentNode;
        let label = blockDivNode.children[1];
        inputField.value = inputField.value;
        
        label.innerHTML = inputField.value;
        label.style.visibility = '';
        blockDivNode.children[2].style.visibility = 'hidden';
        
        inputField.disabled = true;
        inputField.style.backgroundColor = '';
        inputField.style.cursor = 'pointer';
        
        blockDivNode.style.cursor = 'pointer';
        blockDivNode.style.backgroundColor = '';

        blockDivNode.children[0].style.cursor = 'pointer';
        blockDivNode.children[0].disabled = false;
        
        blockDivNode.children[4].style.visibility = 'visible';

    }
})

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

    let valueField = document.createElement('input');
    valueField.id = 'task-field'+cnt;
    valueField.className = 'task-field';
    valueField.value = inputField.value;
    valueField.disabled = true;

    let icon = document.createElement('span');
    icon.className = 'fas fa-trash icon';
    icon.id = "trash-icon"+cnt;

    let editIcon = document.createElement('span');
    editIcon.className = 'far fa-edit edit-icon';
    editIcon.id = "edit-icon"+cnt;

    div.appendChild(task); //children[0]
    div.appendChild(label);//children[1]
    div.appendChild(valueField);//children[2]
    div.appendChild(icon);//children[3]
    div.appendChild(editIcon);//children[4]
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
