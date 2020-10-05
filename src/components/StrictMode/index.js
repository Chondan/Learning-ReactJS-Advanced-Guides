import React from 'react';

class Component1 extends React.Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
    }
    componentDidMount() {
        this.inputRef.current.focus();
    }
    render() {
        return (
            <div>
                <input placeholder="focus me..." ref={this.inputRef} type="text" />
            </div>
        );
    }
}

class StrictMode extends React.Component {
    render() {
        return (
            <div>
                <h2>Strict Mode</h2>
                <React.StrictMode>
                    <Component1 />
                </React.StrictMode>
            </div>
        );
    }
}

export default StrictMode;