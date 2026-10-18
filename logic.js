let userInput=document.getElementById('user-input')
let addbtn=document.getElementById('btn')
let todoContainer=document.getElementById('todo')
let saveButton=document.getElementById('saveButton')

let mainContainer=document.getElementById('container')
let tasks=[
    {
        task:"Learn JavaScript",
        uniqueId:1
    },
    {
        task:"Learn Css",
        uniqueId:2
    }
]

saveButton.onclick=()=>{
    console.log(tasks)
    localStorage.setItem("TasksCreated",JSON.stringify(tasks))
}

function getItemFromTodoList(){
    let contentstringified=localStorage.getItem("TasksCreated")
    let parsedcontent=JSON.parse(contentstringified)

    if (parsedcontent===null){
        return []
    }
    else{
        return parsedcontent
    }
 }
tasks=getItemFromTodoList()
function todoDelete(x,y){
    let listItem=document.getElementById(x)
    todoContainer.removeChild(listItem)
    let taskIndex = tasks.findIndex(function(eachTask) {
        return eachTask.uniqueId === y;
    })
    console.log(taskIndex)
    tasks.splice(taskIndex,1)
    
}
function check_checked(check,label,l){
    let checkbox=document.getElementById(check)
    let label_content=document.getElementById(label)
    label_content.classList.toggle("is_checked")
    l.classList.toggle("todo-1-background")
    l.classList.toggle("todo-1-background-checked")
}

let uniqueTaskCount=tasks.length
function appendtodo(tasks){
    let list=document.createElement('li')
    let todoElement="todo"+tasks.uniqueId
    list.id=todoElement
    list.classList.add('todo-1','d-flex','flex-row',"todo-1-background")
    todoContainer.appendChild(list)

    let checkbox=document.createElement('input')
    checkbox.type='checkbox'
    checkbox.classList.add('checkbox-class')
    let checkbox_id= "newitem"+tasks.uniqueId
    checkbox.id= checkbox_id

    let label=document.createElement('label')
    label_id="label"+tasks.uniqueId
    label.classList.add("label-class")
    label.id=label_id
    label.setAttribute('for',checkbox_id)
    label.textContent=tasks.task

    let trashIcon=document.createElement('i')
    trashIcon.classList.add("fa-solid" ,"fa-trash","trash")
    trashIcon.onclick=function(){
        todoDelete(todoElement,tasks.uniqueId)
    }
    list.appendChild(checkbox)
    list.appendChild(label)
    list.appendChild(trashIcon)
    
    
    console.log(label.id)
    console.log(checkbox.id)

    checkbox.onclick=function(){
        check_checked(checkbox.id,label.id,list)

    }   
}
console.log(todoContainer)
addbtn.onclick=function(){

    if (userInput.value===''){
        alert("Enter Some task in the tab")
    }
    else{
        let userInputValue=userInput.value
        uniqueTaskCount=uniqueTaskCount+1
        let newTasks={
            task: userInputValue,
            uniqueId:uniqueTaskCount
        }
        tasks.push(newTasks)
        appendtodo(newTasks)
        userInput.value=''
    }
}

for (let i of tasks){
    appendtodo(i)
}