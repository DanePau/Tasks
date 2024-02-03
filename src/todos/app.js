import html from './app.html?raw';
import  todoStore, { Filters }  from '../store/todo.store';
import { renderTodos, renderPending} from './use-cases';


const elementIDs = {
    ClearCompletedButton: '.clear-completed',
    todoList: '.todo-list',
    newTodoInput: '#new-todo-input',
    TodoFilters: '.filtro',
    PendingCountLabel: '#pending-count'

}

/**
 * 
 * @param {String} elementId 
 */
export const App = (elementId) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
        renderTodos(elementIDs.todoList, todos);
        updatePendingCount();
    }

    const updatePendingCount = () => {
        renderPending(elementIDs.PendingCountLabel);
    }

   
    // cuando la funcion app se llama   
    (() => {
        const app = document.createElement('div');
        app.innerHTML= html;
        document.querySelector(elementId).append( app );
        displayTodos();
    })();


    // referencias html
    const newDescriptionInput = document.querySelector(elementIDs.newTodoInput);
    const TodoListUl = document.querySelector(elementIDs.todoList);
    const clearCompletedButton = document.querySelector(elementIDs.ClearCompletedButton);
    const filtersLIs = document.querySelectorAll(elementIDs.TodoFilters);

    
    // listeners 
    newDescriptionInput.addEventListener('keyup', (event) => {
        if(event.keyCode !== 13) return;

        if(event.target.value.trim().length === 0) return; // trim: quita los espacios en blancos al inicio y al final

        todoStore.addTodo( event.target.value );
        displayTodos();
        event.target.value = '';

    });


    TodoListUl.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]');
        todoStore.toggleTodo(element.getAttribute('data-id'));   
        displayTodos();
    });


    TodoListUl.addEventListener('click', (event) => {
        const isDestroyElement = event.target.className === 'destroy';      
        const element = event.target.closest('[data-id]');
        if(!element ||!isDestroyElement) return;

        todoStore.deleteTodo(element.getAttribute('data-id')); 
        displayTodos();
    });


    clearCompletedButton.addEventListener('click', () => {
        todoStore.deleteCompleted();
        displayTodos();
    });


    filtersLIs.forEach( element => {
        element.addEventListener('click', (element) => {
            filtersLIs.forEach(el => el.classList.remove('selected'));
            element.target.classList.add('selected');

            switch(element.target.text){
                case 'Todos':
                    todoStore.setFilter(Filters.All);
                break;
                
                case 'Pendientes':
                    todoStore.setFilter(Filters.Pending);
                break;
                
                case 'Completados':
                    todoStore.setFilter(Filters.Completed);
                break;    
            }

            displayTodos();

        })
    });


}
