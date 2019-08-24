import React from 'react';
import './TodoItem.css';


class TodoItem extends React.Component{
    render(){

        const todo = this.props.todo;
        return(
            <div className = {'todoContainer'}>
                <form onSubmit={(e) => this.deleteTodo(e)}>

                    <div className={'dueDate'}>Finish till: {todo.dueDate}</div>
                    <div className={'title' + (todo.finished ? ' finished' : '')} onClick={this.markFinished}>{todo.title}</div>
                    <div className={'task' + (todo.finished ? ' finished' : '')} onClick={this.markFinished}>{todo.text}</div>
                    <div className ={'dateOfCreation'}>Created: {todo.createdAt}</div>

                    <button className='deleteButton' type={'submit'}>Delete</button>
                </form>
            </div>
        );
    }

    markFinished = () =>{
        this.props.updateTodoFn(this.props.todo);
    };

    deleteTodo = (e) => {
        console.log('delete');
        this.props.deleteTaskFn(this.props.todo);
    };

}

export default TodoItem;