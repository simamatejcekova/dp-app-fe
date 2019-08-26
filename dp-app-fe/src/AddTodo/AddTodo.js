import React from 'react';
import {withRouter} from 'react-router-dom';
import './AddTodo.css';
import moment from 'moment';

class AddTodo extends React.Component{

    constructor(){
        super();
        this.state ={
            title:'',
            text:'',
            priority:''

        };
    }

    render(){

        return(
            <div className='form'>
                <form  onSubmit={(e) => this.submitTodo(e)}>
                    <div>
                        <input className={'dueDateArea'} id='addDueDate'
                               onChange={(eventDueDate) => this.updateDate(eventDueDate)}
                               type={'date'} min={moment().format("YYYY-MM-DD")} placeholder={'due date'} required
                        />
                    </div>
                    <div>
                        <input className={'titleArea'} id='addTodoTitle'
                               onChange={(eventTitle) => this.updateTitle(eventTitle)}
                               type={'text'} placeholder={'title'} required
                        />
                    </div>
                    <div >
                        <textarea className={'descriptionArea'} id='addTodoText'
                                  onChange={(eventText) => this.updateText(eventText)}
                                  type={'text'} placeholder={'description'} />
                    </div>
                    <div >
                        <select className={'pickPriority'} id='choosePriority'
                                  onChange={(option) => this.updatePriority(option)}>
                            <option>PRIORITY</option>
                            <option>high</option>
                            <option>mid</option>
                            <option>low</option>
                        </select>
                        <button className='addButton' type={'submit'}>ADD TODO</button>
                    </div>
                </form>
            </div>

        );
    }
    // 1. add date with id='addDate'
    nextPath(path){
        this.props.history.push(path);
    }

    updatePriority = async (e) =>{
        if(e.target.value !== 'PRIORITY'){
        await this.setState({priority: e.target.value});
        }
    };

    updateTitle = async (e) =>{
        await this.setState({title: e.target.value});
    };

    updateText = async (e) =>{
        await this.setState({text: e.target.value});
    };
    // 2. add setState updateDate...  3. see app.js
    updateDate = async (e) =>{
        await this.setState({dueDate: e.target.value});
    };


    submitTodo = (e) => {
        e.preventDefault();
        console.log('submit', this.state);
        this.props.addTaskFn(this.state);
        // document.getElementById('addTodoTitle').value='';
        // document.getElementById('addTodoText').value='';
        // document.getElementById('addDueDate').value='';
        this.nextPath('/');
    }

}
export default withRouter(AddTodo);