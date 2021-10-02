const addForm = document.querySelector('.add');
const list = document.querySelector('.todos');
const search = document.querySelector('.search input')

// function that generates template
const generateTemplate = todo => {
    
    // manually generate new <li> tag that contains submitted to-do
    const html = `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${todo}</span>
            <i class="fas fa-dumpster delete"></i>
        </li>
    `;

    // add new html code into .todos ul element
    list.innerHTML += html;
};

// add todos
addForm.addEventListener('submit', e => {
    e.preventDefault();                             // prevent page from refreshing after submit
    const todo = addForm.add.value.trim();          // store text from input field and trim
    console.log(todo);

    if(todo.length) {                               // if text has some length, generate template
        generateTemplate(todo);
        addForm.reset();
    }
});

// delete todos
list.addEventListener('click', e => {

    // when something is clicked in the list ('.todos') element, check if what was clicked
    // has a class of '.delete' (which means we are clicking the trash can)
    if (e.target.classList.contains('delete')) e.target.parentElement.remove();
});

// function that filters to-dos
const filterTodos = term => {
Array.from(list.children)                                           // converts list of '.todos' children
                                                                    // (HTML collection) to an array
    .filter(todo => !todo.textContent.toLowerCase().includes(term)) // filter out todos that don't include our search
                                                                    // so that we can apply a '.filtered' class
    .forEach(todo => todo.classList.add('filtered'));               // apply '.filtered' class to hide it
    
    Array.from(list.children)                                       // converts list of '.todos' children
                                                                    // (HTML collection) to an array
    .filter(todo => todo.textContent.toLowerCase().includes(term))  // filter out todos that DO include our search
    .forEach(todo => todo.classList.remove('filtered'));            // remove '.filtered' class to show it
};

// keyup event
search.addEventListener('keyup', () => {
    const term = search.value.trim().toLowerCase();
    filterTodos(term);
});