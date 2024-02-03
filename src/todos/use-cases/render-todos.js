import {Todo} from '../models/todo.models.js'; 
import { createTodoHTML } from './create-todo-html.js';

let element;

/** 
 * funciona para mostrar los elementos de la lista
 * @param {String} elementId 
 * @param {Todo} todos 
 */

export const renderTodos = ( elementId , todos = [] ) => {
    if(!element) element = document.querySelector(elementId);

    if(!element) throw new Error(`Element ${elementId} not found`);
    element.innerHTML = '';

    todos.forEach(todo => {
        element.append( createTodoHTML( todo ) );
    });

}

