import React from 'react';
import './TodoItem.css';
import moment from "moment";
import badgeImg from '../img/badge_new.png';




class TodoItem extends React.Component{
    render(){



        const todo = this.props.todo;

        let now = moment();

        let difference = now.diff(todo.createdAt, "minutes");
        let overduedifference = now.diff(todo.dueDate, "days");
        const badge = (difference < 1440) ? <img className={'badge'} src={badgeImg}/> : <p></p>;
        const basedonoverdue = (overduedifference > 0) ? 'speech-bubble overdue' : 'speech-bubble';

        return(
            <div className = {basedonoverdue}>
                <br />
                <form>
                    <div className={'title' + (todo.finished ? ' finished' : '')} onClick={this.markFinished}>{todo.title}{badge}</div>
                    <div className={'task' + (todo.finished ? ' finished' : '')} onClick={this.markFinished}>{todo.text}</div>
                    <button className='deleteButton' id={'finish'} onClick={(e) => this.deleteDisableTodo(e)}>Finish</button>
                    <button className='deleteButton' id={'delete'} onClick={(e) => this.deleteDisableTodo(e)}>Delete</button>
                    <div className={'dueDate'}>Finish till: {todo.dueDate}</div>
                    {todo.priority!=='' ? (<div className ={'priority'}>Priority: {todo.priority}</div>) : (<p></p>)}
                    <div className ={'dateOfCreation'}>Created: {todo.createdAt}</div>
                    {todo.finished===true ? (<div className ={'dateOfCompletion'}>Completed: {todo.completedAt}</div>) : (<p></p>)}
                </form>
                <br />
            </div>
        );
    }

    markFinished = () =>{
        this.props.updateTodoFn(this.props.todo);

    };

    deleteDisableTodo = (e) => {
        if (e.target.id === 'delete') {
            this.props.deleteTaskFn(this.props.todo);
        }else{
            this.markFinished();
        }
    };

}

export default TodoItem;