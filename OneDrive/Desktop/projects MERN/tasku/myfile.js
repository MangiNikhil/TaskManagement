const cardcontainer = document.querySelector(".cardcont");
let globalArray = [];
const cardGenerator = (myObj1) => {
  return `
    <div id="${myObj1.id}" class="col-sm-6 my-2 col-md-4 col-lg-4 ms-auto me-auto">
      <div class="card">
        <div class="card-header input-group d-flex justify-content-end gap-2">
        <button  id="${myObj1.id}" name="${myObj1.id}" class="btn btn-outline-success" onclick="editCard.apply(this, arguments)" > <i class="fas fa-pencil-alt"></i>  </button>
          <button id="${myObj1.id}" class="btn btn-outline-danger" onclick="deleteCard.apply(this, arguments)"><i class="fas fa-trash-alt"></i>  </button>
        </div>
        <div class="card-body">
          <img class="card-img-top"
            src=${myObj1.url}
            alt="sampleimage">
            <p hidden id="hidden">${myObj1.id}</p>
          <h5 class="card-title my-2 text-primary"> ${myObj1.taskTitle} </h5>
          <p class="card-text"> ${myObj1.description} </p>
          <button class="sbt btn btn-primary">${myObj1.taskType}  </button>
        </div>
      </div>
    </div>
  `;
};
const blankTheModalForm = ()=>{
    document.getElementById("Url").value="";
    document.getElementById("TaskTitle").value="";
    document.getElementById("TaskType").value="";
    document.getElementById("Description").value="";
}
function     saveToLocalStorage(){
    localStorage.setItem("Nikhil0529", JSON.stringify({ cards: globalArray })); 
}
const loadData = () => {
    const cardList1 =localStorage.getItem("Nikhil0529"); ///JSON.parse(localStorage.getItem("Nikhil0529")).cards;
    const taskCards = JSON.parse(cardList1);
    const cardList=taskCards.cards;
//   // Get local storage obj
//   const data1 = localStorage.getItem("Nikhil0529");
//   // Convert the array into an object  const cardList = JSON.parse(localStorage.getItem("Nikhil0529")).cards;
//   if (!data1) return;
//   const {taskCards} = JSON.parse(data1);
//   storedData = taskCards.cards;
  // Loop over the array and display cards
  cardList.map(function (dataLoad) {
    cardcontainer.insertAdjacentHTML("beforeend", cardGenerator(dataLoad));
    globalArray.push(dataLoad);
  });
};
function addNewCard() {
  const myObj = {
    id: ` ${Date.now()} `,
    url: document.getElementById("Url").value,
    taskTitle: document.getElementById("TaskTitle").value,
    taskType: document.getElementById("TaskType").value,
    description: document.getElementById("Description").value,
  };
 // console.log(myObj);
 blankTheModalForm;
 globalArray.push(myObj);
  saveToLocalStorage();

  const cp1 = cardGenerator(myObj);
  cardcontainer.insertAdjacentHTML("beforeend",cp1 );
 
}
const deleteCard = (event) => {
    const targetID = event.target.getAttribute("name");
    const elementType = event.target.tagName; 
    const removeTask = globalArray.filter((task) => {
    task.id !== targetID ;
    {
        if(task.id !== targetID )   console.log(task);
    }
   
});
    globalArray = removeTask;  
    saveToLocalStorage();
    // access DOM to remove card
    if (elementType === "BUTTON") {
      return cardcontainer.removeChild(
        event.target.parentNode.parentNode.parentNode
      );
    } else {
      return cardcontainer.removeChild(
        event.target.parentNode.parentNode.parentNode.parentNode
      );
    }

  };
  window.onload = loadData;
  const editCard = (event) => {
    const elementType = event.target.tagName;
    console.log("elementType")
    console.log(elementType)
    let taskTitle;
    let taskDescription;
    let parentElement;
    let submitButton;
    
    if (elementType === "BUTTON") {
      parentElement = event.target.parentNode.parentNode;
    } else {
      parentElement = event.target.parentNode.parentNode.parentNode;
    }
    
    taskTitle = parentElement.querySelector(".card-title");
    taskDescription = parentElement.querySelector(".card-text");
    submitButton = parentElement.querySelector(".sbt");
    taskTitle.setAttribute("contenteditable", "true");
    taskDescription.setAttribute("contenteditable", "true");
    submitButton.setAttribute("onclick", "saveEdit.apply(this,arguments)");
    submitButton.innerHTML = "Save Changes";
  };


  
  const saveEdit = (event) => {
    const hiddenElement = event.target.parentNode.parentNode.querySelector('#hidden');
    const targetID = hiddenElement.innerHTML;
    console.log(targetID)
    const elementType = event.target.tagName;
    let parentElement;
    if (elementType === "BUTTON") {
      parentElement = event.target.parentNode.parentNode;
    } else {
      parentElement = event.target.parentNode.parentNode.parentNode;
    }  
    const taskTitle = parentElement.querySelector(".card-title");
    const taskDescription = parentElement.querySelector(".card-text");
    const submitButton = parentElement.querySelector(".sbt");
    const updatedData = {  
      title :     taskTitle.innerHTML,
      description :   taskDescription.innerHTML,
    };  
    console.log({ updatedData, targetID });
    globalArray.map((task) => {
      if (task.id === targetID) {
          task.taskTitle=updatedData.title;
          task.description=updatedData.description;
          console.log(  "hellooooooooooooooooo"  );
          console.log(  task.id  );
          console.log(  task.description  );
          console.log(  task.taskTitle  );

        }
    });
    saveToLocalStorage();
    taskTitle.setAttribute("contenteditable", "false");
    taskDescription.setAttribute("contenteditable", "false");
    submitButton.innerHTML = "Open Task";
  }