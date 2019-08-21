import React from 'react';

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
            <div className={'addTodoContainer'}>
                <form onSubmit={(e) => this.submitTodo(e)}>
                    <div className={'dueDateArea'}>
                        <input id='addDueDate' onChange={(eventDueDate) => this.updateDate(eventDueDate)} type={'date'} placeholder={'due date'}/>
                    </div>
                    <div className={'titleArea'}>
                        <input id='addTodoTitle' onChange={(eventTitle) => this.updateTitle(eventTitle)} type={'text'} placeholder={'title'} />
                    </div>
                    <div className={'descriptionArea'}>
                        <textarea id='addTodoText' onChange={(eventText) => this.updateText(eventText)}  placeholder={'description'} />
                    </div>
                    <button type={'submit'}>add</button>
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