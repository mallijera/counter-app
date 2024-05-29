import React, { Component } from 'react';

class Counter extends Component {
    // state = {
    //     value: this.props.counter.value
    //     //tags: []       
    // };
    
    // imageUrl: 'https://picsum.photos/200'
    //<img src={this.state.imageUrl} alt=""/>

    // { this.state.tags.length === 0 && 'Please create a new tag'}
    //         {this.renderTags()}
   

    // renderTags() {
    //     if(this.state.tags.length === 0 ) 
    //     return <p>There are no tags</p>
    //     return <ul> 
    //         {this.state.tags.map(tag => <li key={tag}>{ tag }</li>)}
    //         </ul>
    // }
//One way to access this
    // constructor () {
    //     super();
    //     this.handleIncreement = this.handleIncreement.bind(this);
    // }

    // handleIncreement(){
    //     console.log('Increement clicked', this);
    //     // obj.method();
    //     //function(); this will not be defined / called
    // }

    // handleIncreement = () =>{
    //     //console.log('Increement clicked', product);
    //     this.setState({ value: this.state.value + 1 })
    // }


    // doHandleIncreement = () => {
    //     this.handleIncreement({ id: 1});
    // }

    componentDidUpdate(prevProps, prevState) {
        //new state or new props will be there becz this is after the DOM Update
        //WE can retrieve the prevstate and prevprops as well
        console.log ('Counter - Updated');
        // console.log ('prevProps', prevProps);
        // console.log ('prevStates', prevState);
    }

    componentWillUnmount() {
        console.log ('Counter - UnMount');
    }

    render() { 
        console.log('Counter - Rendered');
        return (
        <div>
             <span className={this.getBadgeClasses()}>
                {this.formatCount()}</span>
            <button onClick={() => this.props.onIncreement(this.props.counter)} className='btn btn-secondary btn-sm'>+</button>
            <button onClick={() => this.props.onDecreement(this.props.counter)} className='btn btn-secondary btn-sm m-2' 
            disabled={this.props.counter.value === 0 ? 'disabled' : ''}>-</button>
            <button onClick={() => this.props.onDelete(this.props.counter.id)} className="btn btn-danger btn-sm m-2">X</button>
        </div>
        );
    }

    getBadgeClasses() {
        let classes = "badge m-2 badge-";
        classes += (this.props.counter.value === 0) ? "warning" : "primary";
        return classes;
    }

formatCount() {
    const {value} = this.props.counter;
    return value === 0 ? 'Zero' : value;
 }
 
}
 
export default Counter;