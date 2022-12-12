const state = {
    taskList: [],
};




// DOM manipulation
// Below is Needed to add for preview of the card
const taskModel = document.querySelector(".task__modal__body");
const taskContents = document.querySelector(".task__contents");

// querySelector() and querySelectorAll()
// These are used from js to insert any kind of html text which would be reflected on the UI

// getElementById(), getElementByClass(), getElementByTagName()
// These are used when we want to process the user data form html amd use it in js




// Dynamic Modal cards on the home page
const htmlModalContent = ({ id, title, description, type, url }) => {
    const date = new Date(parseInt(id));
    return `
    <div id = ${id}>
    ${
        // img-fluid is used for responsive image

        url && `<img width = '100%' src = ${url} alt = 'Insert your image' class = 'img-fluid place__holder__image mb-3'/>`
        }
    <strong class = 'text-sm text-muted'>Created on ${date.toDateString()}</strong>\
    <h2 class = 'my-3'>${title}</h2>
    <p class = 'lead'>${description}</p>
    <span class = 'badge bg-primary m-1'>${type}</span>
    </div>
    `;
};




// Here we will be updating the local storage (i.e. Modal/Cards will be shown on the Home page UI)
const updateLocalStorage = () => {
    localStorage.setItem('task', JSON.stringify({
        tasks: state.taskList,
    }));
};



// To get the data/cards or modals on UI from the local storage (Browser storage)
const loadInitialData = () => {
    const localStorageCopy = JSON.parse(localStorage.task);

    if (localStorageCopy) state.taskList = localStorageCopy.tasks;

    state.taskList.map((cardData) => {
        taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardData));
    });
};




const handleSubmit = (event) => {
    const id = `${Date.now()}`;
    const input = {
        url: document.getElementById("imageUrl").value,
        title: document.getElementById("taskTitle").value,
        type: document.getElementById("taskType").value,
        description: document.getElementById("taskDescription").value,
    };
    if (input.title === "" || input.type === "" || input.description === "") {
        return alert("Please fill all the fields !!");
    }
    taskContents.insertAdjacentHTML("beforeend", htmlTaskContent({
        // (...) is basically spread operator used below
        ...input,
        id,
    }));
    // Update the taskList for first time
    state.taskList.push({ ...input, id });

    // Updating same on the local storage 
    updateLocalStorage();
};




// empty `` is basically used to return only single data/value 
// `` can be used to insert html code/elements in js  
// htmlTaskContent() to create the card on the UI ie home-page
const htmlTaskContent = ({ id, title, description, type, url }) => `
<div class = 'col-md-6 col-lg-4 mt-3' id = ${id} key = ${id}>
    <div class = 'card shadow-sm task__card'>
        <div class = 'card-header d-flex justify-content-end task__card__header'>
            <button type = 'button' class = 'btn btn-outline-info mr-2' name = ${id}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/ name = '${id}'>
            </svg>
            </button>
            <button type = 'button' class = 'btn btn-outline-danger mr-2' name = ${id}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg>
            </button>
        </div>


        <div class = 'card-body'>

        // here ($) symbole is used to insert js code inside html code 
            ${url && `<img width = '100%' src = ${url} alt = 'Insert your image' class = 'card-image-top md-3 rounded-lg'/>`
            }
            <h4 class = 'task__card__title'>${title}</h4>
            <p class = 'description trim-3-lines text-muted' data-gram_editor = 'false'>${description}</p>

            <div class = 'tags text-white d-flex flex-wrap'>

            // here (.badge) is used to display no. of times the button has been clicked on the UI
                <span class = 'badge bg-primary m-1'>${type}</span>
            </div>
        </div>

        <div class = 'card-footer'>
            <button type = 'button' class = 'btn btn-primary float-right' data-toggle = 'modal' data-target = '#showTask' id = ${id}>Open Task</button>
        </div>
    </div>
</div> 
`;





