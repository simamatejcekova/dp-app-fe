import React from 'react';
import TodoItem from'../TodoItem/TodoItem.js';

class SearchList extends React.Component{

    constructor(){
        super();
        this.state ={
            search:'',
            todos:[]
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

                    {
                        this.state.todos.map((_todo,_index)=>{ // podtrzitko patri k mapu, hovori "for each this do that"
                            return(
                                <TodoItem updateTodoFn ={this.updateTodo} deleteTaskFn={this.deleteTodo} key={_index} todo ={_todo}/>
                            )
                        })
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
        console.log("starting search");
        this.setState({todos: this.props.searchFn(this.state.search)});
        console.log(this.state.todos);
        document.getElementById('search').value='';
        console.log("emptied searchbox");
    };

}
export default SearchList;