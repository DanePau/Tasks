import { Todo } from "../models/todo.models.js";
/**
 * 
 * @param {Todo} todo 
 */

export const createTodoHTML = (todo) => {
    
    if(!todo) throw new Error('todo is required');

    const {done, description, id} = todo;

    const html = `
        <div class="view">
            <input class="toggle" type="checkbox" ${ done ? 'checked' : ''}>
            <label>${description}</label>
            <button class="destroy"></button>
        </div>
        `
    ;

    const liElement = document.createElement('li');
    liElement.innerHTML = html;
    liElement.setAttribute('data-id',  id);

    if(done)
    liElement.classList.add('completed');

    return liElement;
}


//  <input class="e dit" value="Create a TodoMVC template"> 