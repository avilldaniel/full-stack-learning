// @dev establish what to do with text input field
const input = document.querySelector('input');
const ul = document.querySelector('ul');
let currentInput = '';
input.addEventListener('input', e => {
    currentInput = e.target.value;
});

// @dev dynamically modify list of To-Do's once user clicks button
const button = document.getElementById('mainButton');
// const finHTML = `<button type="button"><img src="images\\star.png"/></button>`;
// const revHTML = `<button><img src="images\\undo.png"/></button>`;
button.addEventListener('click', () => {
    if (currentInput != '') {
        // append input text to new li element
        const node = document.createElement('li');              // create <li> node
        let textNode = document.createTextNode(currentInput);   // create text node
        node.appendChild(textNode);                             // append text to <li>

        // append fin to new button element
        const finNode = document.createElement('button');       // create <button> node
        let imgNode = document.createElement('img');            // create <img> node
        finNode.type = 'button';                                // set node type
        finNode.appendChild(imgNode)                            // append <img> node to <button>
            .setAttribute('src', 'images\\star.png');
        node.appendChild(finNode);                              // append <button> node to <li>
        // event listener if star is clicked
        finNode.addEventListener('click', () => {               // show action as done when star is clicked
            textNode.textContent += ': Done.';
        });

        // append revert to new button element
        let tempStr = textNode.textContent;
        console.log(textNode.textContent);
        const revNode = document.createElement('button');       // create <button> node
        imgNode = document.createElement('img');                // create <img> node
        revNode.type = 'button';                                // set node type
        revNode.appendChild(imgNode)                            // append <img> node to <button>
            .setAttribute('src', 'images\\undo.png');
        node.appendChild(revNode);                              // append <button> node to <li>
        // event listener if undo is clicked
        revNode.addEventListener('click', () => {               // show action as done when star is clicked
            textNode.textContent = tempStr;
        });

        // finally, append finished li element
        document.getElementById('myList').appendChild(node);    // append <li> to <ul> with id="myList"

        // prepare for next text input
        document.getElementById('myInput').value = '';          // clear input field after button press
        currentInput = '';                                      // reset currentInput
    }
});