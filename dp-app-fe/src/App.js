import React from 'react';
import TodoList from'./TodoList/TodoList.js';
import AddTodo from'./AddTodo/AddTodo.js';
import Navbar from'./Navbar/Navbar.js';
import axios from '../node_modules/axios';
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
          <Navbar/>
          <AddTodo addTaskFn={this.addTask}/>
          <TodoList updateTodoFn={this.updateTodo} todos = {this.state.todos}/>
        </div>

    );
  }

  componentDidMount = async () => {
    // const kralicek = localStorage.getItem('localStorageTodos');
    const kralicek = await axios.get("http://localhost:8080/todos");
    if(kralicek.data){
      console.log(kralicek.data);
      this.setState({todos: kralicek.data}); //setState hovori pristup na kluc(nase to-do), zmaz jeho value a uloz tam tuto novu, ktoru ti podavam
    }
  };

  addTask = async (todo) => {
    let newTask = {
      title: todo.title,
      text: todo.text,
      // 3. add new field due_date: to-do.date, step 4 below
      isFinished: false,
      createdAt: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
      dueDate: todo.dueDate
    };

    console.log(this.state.todos);
    let taskId = await axios.post("http://localhost:8080/todos", newTask);
    newTask.id = taskId.data;
    await this.setState({todos: [...this.state.todos, newTask]
    });

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
