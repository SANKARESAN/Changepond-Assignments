
import React, { Component } from 'react';

class CounterComp extends Component{

    constructor(){
        super();
        this.state = {
            count : 0
        }
    }
    changeStateincrement = ()=>{
        this.setState((prevState)=>({count:prevState.count+1}));
    }

    changeStatedecrement = ()=>{
        this.setState((prevState)=>({count:prevState.count-1}));
    }

    changeStatereset = ()=>{
        this.setState((prevState)=>({count:prevState.count=0}));
    }

    render() {
        return (
           <div>
                <p>count:{this.state.count}</p>
                <button onClick={()=>this.changeStateincrement()}>count++</button>
                <button onClick={()=>this.changeStateincrement()}>count--</button>
                <button onClick={()=>this.changeStateincrement()}>reset</button>
            </div>
        ); 
    }
}

export default CounterComp;
