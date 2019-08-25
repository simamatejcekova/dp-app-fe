import React from 'react';
import TodoItem from'../TodoItem/TodoItem.js';

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
                <form  onSubmit={(e) => this.searchTodo(e)}>
                    <input className={'searchField'} id='search'
                           onChange={(eventSearch) => this.fillSearch(eventSearch)}
                           type={'text'} placeholder={'search'}/>
                    <button className='searchButton' type={'submit'}>search</button>
                </form>
                <div className={'todoListContainer'}>

                    {this.state.searchCount>0 ? (
                        this.state.todos.length>0 ?(
                            this.state.todos.map((_todo,_index)=>{ // podtrzitko patri k mapu, hovori "for each this do that"
                                return(
                                    <TodoItem updateTodoFn ={this.updateTodo} deleteTaskFn={this.deleteTodo} key={_index} todo ={_todo}/>
                                )
                            })
                        ):(
                            <p>nothing found</p>
                        )
                    ):(
                        <p></p>
                    )
                    }
                </div>
            </div>
        );
    }

    fillSearch =(e)=>{
        this.setState({search: e.target.value});
    };

    updateTodo =(todo)=>{
        this.props.updateTodoFn(todo);
    };

    deleteTodo =(todo)=>{
        this.props.deleteTodoFn(todo);
    };

    searchTodo =(e)=>{
        console.log(this.state);
        this.setState({todos: this.props.searchFn(this.state.search), searchCount: this.state.searchCount+1});
        console.log(this.state);
        document.getElementById('search').value='';
        console.log("emptied searchbox");
    };

}
export default SearchList;