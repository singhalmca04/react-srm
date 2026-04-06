import React from 'react';

class Life extends React.Component {
    constructor(){
        super();
        console.log("constructor called");
        this.state = {
            name: "ABCD",
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
                <h2>I am a {this.props.color} Car! of brand {this.props.brand}</h2>
                <h6> Name is {this.state.name}</h6>
                <h6> Age is {this.state.age}</h6>
                <button onClick={this.changeAge}>Change Age</button>
            </div>
        )
    }
}

export default Life;