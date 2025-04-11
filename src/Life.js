import React from 'react';

class Life extends React.Component {
    constructor(){
        super();
        console.log("constructor called");
        this.state = {
            name: "ABC",
            age: 25
        }
    }
    componentDidMount() {
        console.log("Mount called");
    }
    componentDidUpdate() {
        console.log("Update called");
    }
    componentWillUnmount() {
        console.log("Unmount called");
    }
    changeAge = () => {
        this.setState({age: this.state.age + 1});
        
    }
    render() {
        return(
            <div>
                <h1>Hello</h1>
                <h6> Name is {this.state.name}</h6>
                <h6> Age is {this.state.age}</h6>
                <button onClick={this.changeAge}>Change Age</button>
            </div>
        )
    }
}

export default Life;