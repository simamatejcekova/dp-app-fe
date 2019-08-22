import React from 'react';
import './TodoItem.css';

class TodoItem extends React.Component{
    render(){

        const todo = this.props.todo;
        return(
            <div className = {'todoContainer'}>

                <div className={'dueDate'}>Finish till: {todo.dueDate}</div>
                <div className={'title' + (todo.finished ? ' finished' : '')} onClick={this.markFinished}>{todo.title}</div>
                <div className={'task' + (todo.finished ? ' finished' : '')} onClick={this.markFinished}>{todo.text}</div>
                <div className ={'dateOfCreation'}>Created: {todo.createdAt}</div>

            </div>
        );
    }

    markFinished = () =>{
        this.props.updateTodoFn(this.props.todo);
    }
}

export default TodoItem;