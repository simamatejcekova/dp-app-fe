import React from 'react';
import './AddTodo.css';

class AddTodo extends React.Component{

    constructor(){
        super();
        this.state ={
            title:'',
            text:''

        };
    }

    render(){
        return(
            <div className='form'>
                <form  onSubmit={(e) => this.submitTodo(e)}>
                    <div>
                        <input className={'dueDateArea'} id='addDueDate' onChange={(eventDueDate) => this.updateDate(eventDueDate)} type={'date'} placeholder={'due date'}/>
                    </div>
                    <div>
                        <input className={'titleArea'} id='addTodoTitle' onChange={(eventTitle) => this.updateTitle(eventTitle)} type={'text'} placeholder={'title'} />
                    </div>
                    <div >
                        <textarea className={'descriptionArea'} id='addTodoText' onChange={(eventText) => this.updateText(eventText)}  placeholder={'description'} />
                    </div>
                    <button className='addButton' type={'submit'}>add</button>
                </form>
            </div>

        );
    }
    // 1. add date with id='addDate'


    updateTitle = (e) =>{
        this.setState({title: e.target.value});
    };

    updateText = (e) =>{
        this.setState({text: e.target.value});
    };
    // 2. add setState updateDate...  3. see app.js
    updateDate = (e) =>{
        this.setState({dueDate: e.target.value});
    };


    submitTodo = (e) => {
        e.preventDefault();
        console.log('submit', this.state);
        this.props.addTaskFn(this.state);
        document.getElementById('addTodoTitle').value='';
        document.getElementById('addTodoText').value='';
        document.getElementById('addDueDate').value='';
    }

}
export default AddTodo;