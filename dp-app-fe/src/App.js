import React from 'react';
import { HashRouter, Switch, Route } from "react-router-dom";
import TodoList from'./TodoList/TodoList.js';
import AddTodo from'./AddTodo/AddTodo.js';
import Navbar from'./Navbar/Navbar.js';
import SearchList from'./SearchList/SearchList.js';
import axios from 'axios';
import moment from "moment";
import Fuse from '../node_modules/fuse.js';
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
        <HashRouter>
          <div className ="App">
            <Navbar/>

            <div>
              <Switch>
                <Route
                    path ="/"
                    exact
                    render={() =>(
                        <TodoList updateTodoFn={this.updateTodo}
                                  deleteTodoFn={this.deleteTask}
                                  todos = {this.state.todos}/>
                    ) }
                />
                <Route
                    path="/add"
                    render={() => <AddTodo addTaskFn={this.addTask}/> }

                />
                <Route
                    path={"/search"}
                    render={()=><SearchList updateTodoFn={this.updateTodo}
                                            deleteTodoFn={this.deleteTask}
                                            searchFn={this.searchTodos}
                        // todos = {this.state.todos}
                    />}
                />
              </Switch>
            </div>
          </div>
        </HashRouter>
    );
  }

  componentDidMount = async () => {
    // const kralicek = localStorage.getItem('localStorageTodos');
    const kralicek = await axios.get("http://localhost:8080/todos");
    if(kralicek.data){
      this.setState({todos: kralicek.data}); //setState hovori pristup na kluc(nase to-do), zmaz jeho value a uloz tam tuto novu, ktoru ti podavam
    }
  };

  searchTodos = (searchPattern) => {
    let options = {
      shouldSort: true,
      threshold: 0.2,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 2,
      keys: [
        "title",
        "text",
        "dueDate"
      ]
    };
    let fuse = new Fuse(this.state.todos, options); // "list" is the item array
    let result = fuse.search(searchPattern);
    return result;
  };

  addTask = async (todo) => {
    let newTask = {
      title: todo.title,
      text: todo.text,
      // 3. add new field due_date: to-do.date, step 4 below
      finished: false,
      createdAt: moment().format("MMM DD, YYYY, h:mm:ss a"),
      dueDate: todo.dueDate,
      priority: todo.priority
    };
    console.log(newTask);
    let taskId = await axios.post("http://localhost:8080/todos", newTask);
    newTask.id = taskId.data;
    await this.setState({todos: [...this.state.todos, newTask]
    });

  };

  deleteTask = async (todo) => {
    axios.delete("http://localhost:8080/todos/" + todo.id);

    const newTodos = this.state.todos.map(_todo => {
          if(todo === _todo) {
            return null; //i have to return SOMETHING, even if i dont want to have anything in place of the todo
          }
          else
            return _todo
          //
        }
    );
    await this.setState({todos:newTodos.filter(Boolean)}); //by using .filter(Boolean), I get rid of the null I returned on line 81
  };

  updateTodo = async (todo) => {
    const newTodos = this.state.todos.map(_todo => {
      if(todo === _todo) {
        axios.patch("http://localhost:8080/todos/" + todo.id, {finished: !todo.finished});
        return {
          title: todo.title,
          text: todo.text,
          finished: !todo.finished,
          createdAt: todo.createdAt,
          dueDate: todo.dueDate,
          completedAt: moment().format("MMM DD, YYYY, h:mm:ss a"),
          priority: todo.priority
        };
      }
      //4.add dueDate: to-do.dueDate to return
      else
        return _todo

    });
    await this.setState({todos:newTodos});
  };
}
export default App;
