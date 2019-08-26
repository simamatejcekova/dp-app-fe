import React from 'react';
import TodoItem from'../TodoItem/TodoItem.js';
import {withRouter} from 'react-router-dom';
import plus from '../img/plusSign.png';
import moment from "moment";

class TodoList extends React.Component{

    constructor(){
        super();
        this.state ={
            date:'',
            todos:[],
            filterCount:0
        };
    }

    render(){

        const todos = this.state.todos;

        return(
            <div>
                <input className={'dueDateArea'} id='addDueDate'
                       onChange={(eventDueDate) => this.filterTodo(eventDueDate)}
                       type={'date'} min={moment().format("YYYY-MM-DD")} placeholder={'pick date'}/>
                <div className={'todoListContainer'}>
                    {this.state.filterCount>0 ? (
                        this.state.todos.length>0 ?(
                            todos.map((_todo,_index)=>{ // podtrzitko patri k mapu, hovori "for each this do that"
                                return(
                                    <TodoItem updateTodoFn ={this.updateTodo} deleteTaskFn={this.deleteTodo} key={_index} todo ={_todo}/>
                                )
                            })
                        ):(
                            <p className={'search-bubble'}>nothing found</p>
                        )
                    ):(
                        <p></p>
                    )
                    }
                </div>
            </div>
        );
    }

    updateTodo =async (todo)=>{
        await this.props.updateTodoFn(todo);
        await this.setState({todos: await this.props.filterFn(this.state.date)});
    };

    deleteTodo =async (todo)=>{
        await this.props.deleteTodoFn(todo);
        await this.setState({todos: this.props.searchFn(this.state.search)});
    };

    filterTodo = async (date)=>{
        this.setState(date.target.value ? {date: date.target.value} : {date: this.state.date});
        this.setState({todos: await this.props.filterFn(date.target.value), filterCount: this.state.filterCount+1});
    };

}
export default withRouter(TodoList);