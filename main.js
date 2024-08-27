const formElement= document.querySelector('form');
const ListeElement=document.querySelector('.to-do-liste')
const allesLoschenButton=document.querySelector('#loschen')
const darkmodeElement=document.querySelector('#toggle')
const sucheInputElement=document.querySelector('#search')
function myCreateLi(input){
    let newTask=document.createElement('li')
    newTask.innerHTML=`
    ${input} <i class="fa-solid fa-check"> </i><i class="fa-solid fa-trash"></i> 
    `
     ListeElement.append(newTask)
 
}

function addTask(){
formElement.onsubmit=(event)=>{
    event.preventDefault();
    const input=event.target.elements.task.value
myCreateLi(input)
if(localStorage.getItem('tasks')==null){
    localStorage.setItem('tasks', JSON.stringify([input]))
}
else{
    let elements=JSON.parse(localStorage.getItem('tasks'))
    elements.push(input)
    localStorage.setItem('tasks', JSON.stringify(elements))
}
formElement.reset()

}}







function removeTask(){
    ListeElement.onclick=(event)=>{

        if(event.target.matches('.fa-trash')){
            let removedElement=event.target.closest('li').innerText;
            event.target.closest('li').remove()
            let elements=JSON.parse(localStorage.getItem('tasks'))
            console.log(removedElement);
            const index=elements.findIndex(el=>el==removedElement)
elements.splice(index,1)
            console.log(elements);
            localStorage.setItem('tasks', JSON.stringify(elements))
        }
        else if(event.target.matches('.fa-check')){
            event.target.closest('li').style.textDecoration=' line-through';
          
        }
    }
}



function allesLoschen() {
    allesLoschenButton.onclick=()=>{
      
        localStorage.removeItem('tasks')
        
    ListeElement.innerHTML=''
    }
    
}


function zeigenDisplay() {
    let elements=JSON.parse(localStorage.getItem('tasks'))
    console.log(elements);
    if(elements){
    for (let x of elements){
        myCreateLi(x)
    }}
    addTask()
    removeTask()
    allesLoschen()
}

zeigenDisplay()


darkmodeElement.onclick=()=>{
    console.log(document.body);
    document.body.classList.toggle('dark')
}
// sucheElement.addEventListener('input', event=>{

//    const element=event.target.closest('input').value;
   
//    let array=Array.from(document.querySelectorAll('li'))
//    console.log('element in input',element);
   
//    array=array.filter( el=> {
//     console.log('el in array', el.innerText, el.innerText.length);
//     console.log('indexof', el.innerText.indexOf(element));
//     if(el.innerText.indexOf(element)!=-1 && element .length!=0){

//         el.style.color='red'}
//     else{
//         el.style.color=''
//     }})

// }
// )


// function suche(element, array){

//   const regex= new RegExp(element.value, 'gi')
// const filterArr=  array.filter(task=>task.match(regex) )
// return filterArr
// }
function displaySuche() {
const currentArray=JSON.parse(localStorage.getItem('tasks'))
const sucheInputElement=document.querySelector('#search')
ListeElement.innerHTML=''
let result=currentArray.map(task=>{
   
    const regex=new RegExp(sucheInputElement.value, 'gi');

    if(regex.test(task)){
 task=task.replace(regex,
`<span class='hl'>${sucheInputElement.value}</span>`)
    }
myCreateLi(task)
   
return task
})
console.log(result);

console.log('value', this.value);
sucheInputElement.reset()
}



sucheInputElement.addEventListener('input', displaySuche);