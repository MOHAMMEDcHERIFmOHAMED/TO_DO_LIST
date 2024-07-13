
let input = document.querySelector('.input');
let submit = document.querySelector('.add');
let taskdiv = document.querySelector('.tasks');

// empty array to store the tasks 

let arroftasks = [] ;
if(localStorage.getItem("tasks")){
    arroftasks = JSON.parse(localStorage.getItem("tasks"));
}
getDataFromLocalStoreg();
// _____ ADD TASKS 

submit.onclick = function (){
    if(input!== ""){
        addtasktoarray(input.value); // add task to array 
        input.value = "" ;
    }
}

//  delete task from tasks div
taskdiv.addEventListener("click" , (e)=>{
//  DELETE BUTTON 
if(e.target.classList.contains("del")){
    //  remove element from page 
    e.target.parentElement.remove();
    // remove task from local storeg
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    e.target.parentElement.remove();
}
// task element 
if(e.target.classList.contains("task")){
    toggleStatus(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");

}

});

// update status

function toggleStatus(taskid){
for(i=0 ; i< arroftasks.length ; i++){
 if(arroftasks[i].id == taskid){
        if(arroftasks[i].complete == false){
            arroftasks[i].complete = true ;
        }else{
            arroftasks[i].complete = false ;
        }
        break;
    }

}
addDataToLocalStoreg(arroftasks);
};

function deleteTaskWith(taskID) {
    // Convert taskID to a number before comparison
    const numericTaskID = Number(taskID);
    // Filter out the task with the given taskID
    arroftasks = arroftasks.filter((task) => task.id !== numericTaskID);
    addDataToLocalStoreg(arroftasks);
    // Refresh the displayed tasks
    addElementsfrom(arroftasks);
}

function  addtasktoarray(data){
    const newNOde = {
        id :Date.now(),
        DATA :data,
        complete :false,
    }
    arroftasks.push(newNOde);
    // console.log(arroftasks);
    addElementsfrom(arroftasks);
    // add tasks to local storeg 
    addDataToLocalStoreg(arroftasks);

}

function addElementsfrom(arroftasks){
    // empty tasks div 
    taskdiv.innerHTML = '';
    arroftasks.forEach((task) => {
        let div = document.createElement("div");
        div.className = "task";
        // check if task done
        if(task.complete){
            div.className = " task done";
        }
        div.setAttribute("data-id" , task.id);
        div.appendChild(document.createTextNode(task.DATA));
        let span = document.createElement("span");
        span.className  = "del";
        span.appendChild(document.createTextNode("delete"));
        div.appendChild(span);
        // add task div to the tasks container 
        taskdiv.appendChild(div);
        // console.log(taskdiv);
    });

}

function  addDataToLocalStoreg(arroftasks){
    window.localStorage.setItem("tasks" , JSON.stringify(arroftasks));
}

function getDataFromLocalStoreg(){
    let data = window.localStorage.getItem("tasks");
    if(data){
        let tasks = JSON.parse(data);
        addElementsfrom(tasks);
    }
}