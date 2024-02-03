import { Todo } from "../todos/models/todo.models.js";

export const Filters = {
    All: 'all',
    Completed: 'completed',
    Pending: 'pending'
}

const state = {
    todos: [
        // ejemplo de tareas (tareas por defecto)
        new Todo ('Regar las plantas'),
        new Todo ('Hacer las compras'),
        new Todo ('Cocinar'), 
    ],
    filter: Filters.All,  // all
}

const initStore = () => {
    loadStore();
    console.log('store init :)');
}



const loadStore = () => {
   if(!localStorage.getItem('state')) return;

   const {todos = [], filter = Filters.All} = JSON.parse(localStorage.getItem('state'));
   state.todos  = todos;
   state.filter = filter;
}

const saveStateToLocalStorage = () => {
    localStorage.setItem('state', JSON.stringify(state));
}


const getTodos = (filter = Filters.All) => {
    switch (filter) {
        case Filters.All:
            return [...state.todos];
        
        case Filters.Completed:
            return state.todos.filter(todo => todo.done);

        case Filters.Pending:
            return state.todos.filter(todo => !todo.done);
        
        default:
            throw new Error(`Option ${filter} is not valid`);
    }
}


/**
 * 
 * @param {String} description 
 */
const addTodo = (description) => {
    if(!description) throw new Error('description is required');
    state.todos.push(new Todo(description));

    saveStateToLocalStorage();
}

/**
 * sirve para cambiar el estado de un todo
 * @param {String} todoId 
 */
const toggleTodo = ( todoId ) => {

    state.todos = state.todos.map(todo => {
        if(todo.id === todoId){
            todo.done = !todo.done;
        }
        return todo;
    })
    saveStateToLocalStorage();
}


/**
 * sirve para borrar un todo
 * @param {String} todoId 
 */
const deleteTodo = ( todoId ) => {
    state.todos = state.todos.filter(todo => todo.id !== todoId);
    saveStateToLocalStorage();
}


/**
 * sirve para borrar todos los completados
 * @param {String} todoId 
 */
const deleteCompleted = ( todoId ) => {
    state.todos = state.todos.filter(todo => !todo.done);
    saveStateToLocalStorage();
}



/**
 * funcion para cambiar el filtro 
 * @param {Filters} newFilter 
 */
const setFilter = ( newFilter = Filters.All) => {
    state.filter = newFilter;
    saveStateToLocalStorage();
}


const getCurrentFilter = () => {
    return state.filter;
}


export default{
    initStore,
    loadStore,
    toggleTodo,
    deleteTodo,
    deleteCompleted,
    setFilter,
    getCurrentFilter,
    getTodos,
    addTodo
};

