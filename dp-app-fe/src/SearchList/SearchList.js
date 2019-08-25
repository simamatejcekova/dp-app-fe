import React from 'react';
import TodoItem from'../TodoItem/TodoItem.js';
import './SearchList.css'

class SearchList extends React.Component{

    constructor(){
        super();
        this.state ={
            search:'',
            todos:[],
            searchCount:0
        };
    }

    render(){

        return(
            <div>
                <input className={'search-bubble'} id='search'
                       onChange={(eventSearch) => this.searchTodo(eventSearch)}
                       type={'text'} placeholder={'search'}/>
                <div className={'todoListContainer'}>
                    {this.state.searchCount>0 ? (
                        this.state.todos.length>0 ?(
                            this.state.todos.map((_todo,_index)=>{ // podtrzitko patri k mapu, hovori "for each this do that"
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

    updateTodo =(todo)=>{
        this.props.updateTodoFn(todo);
    };

    deleteTodo =(todo)=>{
        this.props.deleteTodoFn(todo);
    };

    searchTodo =(e)=>{
        this.setState({search: e.target.value});
        this.setState({todos: this.props.searchFn(this.state.search), searchCount: this.state.searchCount+1});
    };

}
export default SearchList;