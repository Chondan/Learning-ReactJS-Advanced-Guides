import React, { useEffect, useRef } from 'react';

function Hello() {
    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current.focus();
    });
    return (
        <>
            <input placeholder="Your name..." ref={inputRef} type="text" />
            <button onClick={() => alert(`Hello ${inputRef.current.value}, How are you doing?`)}>Hi</button>
        </>
    );
}

class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
        }
    }
    incrementCount() {
        this.setState(state => (
            { count: state.count + 1 }
        ));
    }
    render() {
        return (
            <div>Clicks: {this.state.count}</div>
        );
    }
}
class CustomTextInput extends React.Component {
    constructor(props) {
        super(props);
        this.textInput = null;
        this.setTextInputRef = element => {
            this.textInput = element;
        };
        this.focusTextInput = () => {
            if (!this.textInput) {
                return;
            }
            this.textInput.focus();
        }
    }
    render() {
        return (
            <React.Fragment>
                <input type="text" ref={this.setTextInputRef} />
                <button onClick={this.focusTextInput}>Focus the text input</button>
            </React.Fragment>
        );
    }
}
function AnotherCustomTextInput(props) {
    return (
        <input ref={props.inputRefCallback} type="text" />
    );
}
function Parent() {
    let inputRef = null;
    return (
        <div>
            <AnotherCustomTextInput inputRefCallback={el => inputRef = el} />
            <button onClick={() => inputRef.focus()}>Focus the text input</button>
        </div>
    );
}

class RefsAndTheDOM extends React.Component {
    constructor(props) {
        super(props);
        this.counterRef = React.createRef();
    }
    render() {
        return (
            <div>
                <h2>Refs and the DOM</h2>
                <p>Refs provide a way to access DOM nodes or React elements created in 
                the render method.</p>
                <p>In the typical dataflow, props are the only way that parent components interact with their
                children. To modify a child, you re-render it with new props. However, there are a few cases 
                where you need to imperatively modify a child outside of the typical dataflow. 
                The child to be modified could be instance of a React component, or it could be a DOM element. 
                For both of these cases, React provides an escape hatch.</p>
                <h3>When to Use Refs</h3>
                <ul>
                    <li>Managing focus, text selection, or media playback.</li>
                    <li>Triggering imperative animations.</li>
                    <li>Integrating with third-party DOM libraries.</li>
                </ul>
                <strong>Note: Avoid using refs for anything that can be done declaratively.</strong>
                <h3>Creating Refs</h3>
                <Hello />
                <h3>Accessing Refs</h3>
                <p>When a ref is passed to an element in render, a reference to the node becomes accessible at 
                the current attribute of the ref.</p>
                <p>The value of the ref differs depending on the type of the node.</p>
                <ul>
                    <li>When the ref attribute is used on an HTML element, the ref created in the constructor with 
                    React.createRef() receives the underlying DOM element as its current property.</li>
                    <li>When the ref attribute is used on a custom class component, the ref object receives the mounted instance of the component as its current.</li>
                    <li><strong>You may not use the ref attribute on function components because they don't have instances.</strong></li>
                </ul>
                <Counter ref={this.counterRef} />
                <p>The button below is not a member of Counter component and cannot access its state. 
                But we have an alternative way to access them using a ref that receive the instance of Counter component.</p>
                <button onClick={() => this.counterRef.current.incrementCount()}>Increment</button>
                <h4>Refs and Function Components</h4>
                <p>By default, you may not use the ref attribute on function components because 
                they don't have instances.</p>
                <p>If you want to allow people to take a ref to your function component, 
                you can use forwardRef, or you can convert the component to a class.</p>
                <h3>Callback Refs</h3>
                <p>React also supports another way to set refs called "callback refs", which gives more fine-grain 
                control over when refs are set and unset.</p>
                <p>Instead of passing a ref attribute created by createRef(), you pass a function. 
                The function receives the React component instance or HTML DOM element as its argument, which can be stored and accessed elsewhere.</p>
                <CustomTextInput />
                <p>React will call the ref callback with the DOM element when the component mounts, 
                and call it with null when it unmounts. Refs are guranteed to be up-to-date before 
                componentDidMount or componentDidUpdate fires.</p>
                <p>You can pass callback refs between component like you can with object refs that were created with 
                React.createRef()</p>
                <Parent />
            </div>
        );
    }
}

export default RefsAndTheDOM;