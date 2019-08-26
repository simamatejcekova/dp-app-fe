import React from 'react';
import TodoItem from'../TodoItem/TodoItem.js';
import {withRouter} from 'react-router-dom';
import plus from '../img/plusSign.png';

class TodoList extends React.Component{

    render(){

        const todos = this.props.todos;

        return(
            <div className={'todoListContainer'}>
                <div className={'speech-bubble'}>
                    <img className={'plusSign'} src={plus} alt={'add new todo'} margin={'200px;'} onClick={() => this.imageClick()}/>
                </div>
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

    imageClick(){
        this.nextPath('/add');

    }
    nextPath(path){
        this.props.history.push(path);
    }

    updateTodo =(todo)=>{
        this.props.updateTodoFn(todo);
    };

    deleteTodo =(todo)=>{
        this.props.deleteTodoFn(todo);
    };

}
export default withRouter(TodoList);