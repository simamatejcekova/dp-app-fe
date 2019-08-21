import React from 'react';
import './TodoItem.css';

class TodoItem extends React.Component{
    render(){

        const todo = this.props.todo;
        return(
            <div className = {'todosContainer'}>
                <p>-----------------</p>
                <div className={'dueDate'}>Finish till: {todo.dueDate}</div>
                <div className={'title' + (todo.isFinished ? ' finished' : '')} onClick={this.markFinished}>{todo.title}</div>
                <div className={'task' + (todo.isFinished ? ' finished' : '')} onClick={this.markFinished}>{todo.text}</div>
                <div className ={'dateOfCreation'}>Created: {todo.dateOfCreation}</div>

            </div>
        );
    }

    markFinished = () =>{
        this.props.updateTodoFn(this.props.todo);
    }
}

export default TodoItem;