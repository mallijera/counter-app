import React, { Component } from 'react';
import Counters from './components/counters';
import NavBar from './components/navBar';




class App extends Component {

  state = { 
    counters: [
        {id: 1, value:4},
        {id: 2, value:0},
        {id: 3, value:0},
        {id: 4, value:0},
    ]
 };

 constructor() {
   //called Only once during the instance of the class
   //initialize the properties
   //props has to pass it as parameter
   super();
   console.log('App - Constructor');
 }

 componentDidMount() {
   //Ajax call
  //After rendered into DOM
  console.log('App - Mounted');
 }

 handleDelete = (counterId) =>{
    //console.log('event handler called', counterId);
    const counters = this.state.counters.filter(c=>c.id !== counterId);
    this.setState({counters});
};

handleReset = () => {
    const counters = this.state.counters.map (c => {
        c.value = 0;
        return c;
    });
    this.setState({counters});
}

handleIncreement = counter => {
    console.log('counter', counter);
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = {...counter};
    counters[index].value++;
    this.setState({counters});
}

handleDecreement = counter => {
  console.log('counter', counter);
  const counters = [...this.state.counters];
  const index = counters.indexOf(counter);
  counters[index] = {...counter};
  counters[index].value--;
  this.setState({counters});
}

  render() { 
    console.log('App - Rendered');
    return ( 
      <React.Fragment>
      <NavBar totalCounters={this.state.counters.filter( c => c.value > 0).length} />
      <main className="container">
        <Counters 
        counters={this.state.counters}
        onReset={this.handleReset} 
        onIncreement={this.handleIncreement} 
        onDecreement={this.handleDecreement}
        onDelete={this.handleDelete}
        />
      </main>
      </React.Fragment>
     );
  }
}
 
export default App;
