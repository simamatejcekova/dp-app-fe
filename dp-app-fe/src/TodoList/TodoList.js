import React from 'react';
import TodoItem from'../TodoItem/TodoItem.js';

class TodoList extends React.Component{

    render(){

        const todos = this.props.todos;

        return(
            <div className={'todoListContainer'}>
                {
                    todos.map((_todo,_index)=>{ // podtrzitko patri k mapu, hovori "for each this do that"
                        return(
                            <TodoItem updateTodoFn ={this.updateTodo} deleteTaskFn={this.deleteTodo} key={_index} todo ={_todo}/>
                        )
                    })
                }
            </div>
        );
    }

    updateTodo =(todo)=>{
        this.props.updateTodoFn(todo);
    };

    deleteTodo =(todo)=>{
        this.props.deleteTodoFn(todo);
    };

}
export default TodoList;