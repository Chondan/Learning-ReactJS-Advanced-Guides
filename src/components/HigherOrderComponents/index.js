import React, { useState } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';

function Greeting(props) {
    return (
        <React.Fragment>
            <input placeholder="Name..." name="name" onChange={props.onChange} /><br />
            <span>{props.greetingMsg}</span><br />
        </React.Fragment>
    );
}
function generateGreeting(WrappedComponent, getGreeting) {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.handleChange = this.handleChange.bind(this);
            this.state = {
                name: "",
            }
        }
        handleChange(e) {
            const { name, value } = e.target;
            this.setState({
                [name]: value,
            });
        }
        render() {
            return (
                <WrappedComponent onChange={this.handleChange} greetingMsg={getGreeting(this.state.name)}  />
            );
        }
    }
}
const HelloGreeting = generateGreeting(Greeting, (name) => `Hello ${name}, How are you doing?`);
const HolaGreeting = generateGreeting(Greeting, (name) => `Hola ${name}, Como estad?`);
function withIncrementCount(WrappedComponent, displayName) {
    class EnhancedComponent extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                count: 0
            }
        }
        incrementCount = () => {
            this.setState(prevState => ({ count: prevState.count + 1 }))
        }
        render() {
            const { age, ...rest } = this.props;
            return (
                <WrappedComponent count={this.state.count} incrementCount={this.incrementCount} {...rest} />
            );
        }
    }
    EnhancedComponent.displayName = displayName;
    return EnhancedComponent;
}
function Button(props) {
    return (
        <button onClick={props.incrementCount}>Clicked {props.count} time.</button>
    );
}
const ButtonWithIncrementCount = withIncrementCount(Button, "ButtonWithIncrementCount");
function Heading(props) {
    const styles = { display: "inline-block", cursor: "pointer" };
    return (
        <h4 style={{...styles}} onMouseOver={props.incrementCount}>{props.name} hovered {props.count} time.</h4>
    )
}
const HeadingWithIncrementCount = withIncrementCount(Heading, "HeadingWithIncrementCount");
class HOCInsideRenderMethod extends React.Component {
    render() {
        const Enhance = withIncrementCount(Button, "HOCInsideRender");
        return (
            <Enhance />
        );
    }
}
class Car extends React.Component {
    static hello() {
        return "Hello, How are you doing?";
    }
    hi() {
        return "Hi";
    }
    static anotherHello() {
        return "Hello again.";
    }
    render() {
        return (
            <div>
                <h5>{this.props.greetingMsg || Car.hello()}, I am a car component.{this.props.endingMsg}</h5>
            </div>
        );
    }
}
function withSpeedUp(WrappedComponent, endingMsg) {
    class EnhancedComponent extends React.Component {
        render() {
            
            return (
                <WrappedComponent greetingMsg={EnhancedComponent.hello()} endingMsg={this.props.endingMsg} />
            );
        }
    }
    // you could copy the methods onto the container before returning it
    EnhancedComponent.hello = WrappedComponent.hello;
    console.log(typeof EnhancedComponent.hello === "undefined");
    // you can use hoist-non-react-statics to automatically copy all non-React static methods
    hoistNonReactStatic(EnhancedComponent, WrappedComponent);
    console.log(typeof EnhancedComponent.anotherHello === "undefined");
    return EnhancedComponent;
}
const EnhancedCar = withSpeedUp(Car);

function HigherOrderComponents() {
    const [num, setNum] = useState(0);
    return (
        <div>
            <h2>Higher-OrderComponents</h2>
            <button onClick={() => setNum(Math.random())}>REFRESH</button><span style={{ display: "none" }}>{num}</span>
            <p>A higher-order component (HOC) is an advanced technique in React 
            for reusing component logic. HOCs are not part of the React API, per se. 
            They are a pattern that emerges from React's compositional nature.</p>
            <HelloGreeting />
            <HolaGreeting /><br />
            <ButtonWithIncrementCount name="Chondan" age={22} /><br />
            <HeadingWithIncrementCount name="Chondan" /><br />
            <h3>Don't Use HOCs Inside the render Methond</h3>
            <p>If the component returned from render is indentical (===) to the component from the previous render, React recursively 
            updates the subtree by diffing it with the new one. 
            If they're not equal, the previous subtree is unmounted completely.</p>
            <strong>Example: Click the button and then click REFRESH button on the top and see what's happend.</strong><br />
            <HOCInsideRenderMethod />
            <h3>Static Method Must Be Copied Over</h3>
            <Car />
            <EnhancedCar endingMsg="I' am faster." />
        </div>
    );
}

export default HigherOrderComponents;