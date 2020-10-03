import React from 'react';

class ErrorBoundaryComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null, 
            errorInfo: null,
            hasError: false,
        }
    }
    static getDerivedStateFromError(error) {
        // When ther is an arror, go to this function first and then go to ComponentDidCatch.
        console.log("getDerivedStateFromError: ", "error");
        // Update state so the next render will show the fallback UI. 
        return { hasError: true };
    }
    componentDidCatch(error, errorInfo) {
        console.log("componentDidCatch: ", "error");
        this.setState({
            error: error,
            errorInfo: errorInfo,
        })
    }
    render() {
        console.log("hasError: ", this.state.hasError);
        if (this.state.hasError && this.state.errorInfo) {
            return (
                <div>
                    <h4>Something went wrong.</h4>
                    <details>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo.componentStack}
                    </details>
                </div>
            );
        }
        return this.props.children;
    }
}
class BuggyCounter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0,
        }
    }
    handleClick = () => {
        this.setState(state => ({ counter: state.counter + 1 }));
    }
    render() {
        if (this.state.counter === 5) {
            throw new Error("I crashed!");
        }
        return (
            <h4 style={{cursor: "pointer", display: "inline", fontSize: "xx-large"}} onClick={this.handleClick}>{this.state.counter}</h4>
        );
    }
}
function ErrorBoundaryExample() {
    return (
        <div>
            <h4>This is an example of error boundaries in React 16.</h4>
            <h4>Click on the numbers to increase the counters.</h4>
            <h4>The counter is programmed to throw when it reaches 5.</h4>
            <div style={{ color: "green" }}>
            <h4>Example 1</h4>
                <p>These two counters are inside the same error boundary. 
                If one crashes, the error boundary will replace both of them.</p>
                <ErrorBoundaryComponent>
                    <BuggyCounter /><br />
                    <BuggyCounter />
                </ErrorBoundaryComponent>
            </div>
            <div style={{ color: "blue" }}>
                <h4>Example 2</h4>
                <p>These two counters are each inside of their own error boundary. 
                So if one crashes, the other is not affected.</p>
                <ErrorBoundaryComponent><BuggyCounter /></ErrorBoundaryComponent><br />
                <ErrorBoundaryComponent><BuggyCounter /></ErrorBoundaryComponent>
            </div>
        </div>
    );
}

function ErrorBoundaries() {
    return (
        <div>
            <h2>Error Boundaries</h2>
            <ErrorBoundaryExample />
            <h3>Where to Place Error Boundaries</h3>
            <p>The granularity of error boundaries is up to you. 
            You may wrap top-level route components to display a "Something went wrong" message to the user, 
            just like server-side frameworks often handle crashes. 
            You may also wrap individual widgets in an error boundary to protect them from crashing the rest ot the application.</p>
            <h3>New Behavior for Uncaught Errors</h3>
            <p>As of React 16, errors that were not caught by 
            any error boundary will result in unmounting of the whole React component tree.</p>
        </div>
    );
}

export default ErrorBoundaries;