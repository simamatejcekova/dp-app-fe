import React from 'react';
import TodoList from'./TodoList/TodoList.js';
import AddTodo from'./AddTodo/AddTodo.js';
import moment from "moment";

import './App.css';

class App extends React.Component{

  constructor(){
    super();
    this.state = {
      todos: []
    };
  }

  render(){
    return(
        <div>
          <AddTodo addTaskFn={this.addTask}/>
          <TodoList updateTodoFn={this.updateTodo} todos = {this.state.todos}/>
        </div>
    );
  }

  componentDidMount = () => {
    const kralicek = localStorage.getItem('localStorageTodos');
    if(kralicek){
      const savedTodos = JSON.parse(kralicek);
      this.setState({todos: savedTodos}); //setState hovori pristup na kluc(nase to-do), zmaz jeho value a uloz tam tuto novu, ktoru ti podavam
      console.log('bar' + this.state.todos);
    }else{
      console.log('No todos');
    }
  };

  addTask = async (todo) => {
    await this.setState({todos: [...this.state.todos, {
        title: todo.title,
        text: todo.text,
        // 3. add new field due_date: to-do.date, step 4 below
        // isFinished: false,
        // dateOfCreation: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
        dueDate: todo.dueDate
      }]
    });
    console.log(this.state.todos);
    let todosString = JSON.stringify(this.state.todos);
    localStorage.setItem('localStorageTodos', todosString); //pristupime do kniznice(localStorage), zalozime policu s nazvom LocalStorageTodos a vlozime do nich todos (ktore su uz stringami)
    console.log(localStorage.getItem('localStorageTodos'));
//todo change from localstorage to post call
  };

  updateTodo = async (todo) => {
    const newTodos = this.state.todos.map(_todo => {
      if(todo === _todo)
        return{
          title: todo.title,
          text: todo.text,
          isFinished: !todo.isFinished,
          dateOfCreation: todo.dateOfCreation,
          dueDate: todo.dueDate
        };
      //4.add dueDate: to-do.dueDate to return
      else
        return _todo

    });
    await this.setState({todos:newTodos});
    let updatedTodoString = JSON.stringify(this.state.todos);
    localStorage.setItem('localStorageTodos', updatedTodoString);

  }
}
export default App;
