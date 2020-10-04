import React, { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);
    if (count < 10) {
        return (
            <button onClick={() => setCount(count + 1)}>Clicked {count} time</button>
        );
    }
    return false;
}
// --- Avoid Reconciliation
class CounterButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            random: 0,
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.random !== nextState.random) {
            return true;
        }
        return false;
    }
    handleClick() {
        this.props.setColor();
        this.setState(state => ({ random: Math.floor(Math.random() * 5) + 1 }));
    }
    render() {
        const styles = { backgroundColor: this.props.color };
        return (
            <button style={styles} onClick={this.handleClick.bind(this)}>Random: {this.state.random}</button>
        );
    }
}
// --- React.PureComponent
class ListOfWords extends React.PureComponent {
    render() {
        return (
            <div>List of words: {this.props.words.join(', ')}</div>
        );
    }
}
class WordAdder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            words: ["test", "hello", ],
            notMutatingWords: ["test", "hello"],
        }
        this.inputRef = React.createRef();
        this.notMutateInputRef = React.createRef();
    }
    addWord() {
        const words = this.state.words;
        words.push(this.inputRef.current.value);
        this.setState({ words: words });
    }
    addWordNotMutate() {
        this.setState(state => (
            { notMutatingWords: state.notMutatingWords.concat([this.notMutateInputRef.current.value]) }
        ));
    }
    render() {
        return (
            <div>
                <div>Example 1: Mutating data</div>
                <input ref={this.inputRef} type="text" />
                <button onClick={this.addWord.bind(this)}>Add</button>
                <div>New array: {this.state.words.join(', ')}</div>
                <ListOfWords words={this.state.words} />
                <p>The component won't update because the old and new values of state will compare as equal, 
                even though the actual words in the array have changed.</p>
                <div>Example 2: Not mutating data</div>
                <input ref={this.notMutateInputRef} type="text" />
                <button onClick={this.addWordNotMutate.bind(this)}>Add</button>
                <div>New array: {this.state.notMutatingWords.join(', ')}</div>
                <ListOfWords words={this.state.notMutatingWords} />
                <p>The simplest way to avoid this problem is to avoid mutating values that you are using as props or state. 
                For example, the handleClick method above could be rewritten using concat. 
                ES6 also supports a spread syntax for arrays which can make this easier.</p>
            </div>
        );
    }
}

class OptimizingPerformance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: "#ddd",
        }
    }
    random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    randomColor() {
        return this.random(0, 255);
    }
    setColor() {
        this.setState({ color: `rgb(${this.randomColor()},${this.randomColor()},${this.randomColor()})`})
    }
    render() {
        return (
            <div>
                <h2>Optimizing Performance</h2>
                <p>Internally, React uses several clever techniques to minimize the number of costly DOM 
                operations required to update the UI. 
                For many applications, using React will lead to a fast user interface without doing much work to specifically optimize for performance. 
                Nevertheless, there are several ways you can speed up your React application.</p>
                <h3>Use the Production Build</h3>
                <p>If you're benchmarking or experiencing performance problems in your React apps, 
                make sure you're testing with the minified production build.</p>
                <Counter />
                <p>This button will be unmounted when it reached 10.</p>
                <h3>Avoid Reconciliation</h3>
                <CounterButton setColor={this.setColor.bind(this)} color={this.state.color} />
                <p>This button will never be updated if it got the same random number. (notice the color of the button)</p>
                <h4>React.PureComponent</h4>
                <p>Most of the time, you can use React.PureComponent instead of writing your own shouldComponentUpdate. 
                It only does a shallow comparison, so you can't use it if the props or state may have been mutated in a way that 
                a shallow comparison would miss.</p>
                <WordAdder />
            </div>
        );
    }
}

export default OptimizingPerformance;