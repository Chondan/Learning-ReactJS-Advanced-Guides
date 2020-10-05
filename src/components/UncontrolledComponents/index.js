import React from 'react';

class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.inputRef = React.createRef();
    }
    handleSubmit(e) {
        e.preventDefault();
        console.log(`Hello ${this.inputRef.current.value}, How are you doing?`);
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name: <input defaultValue="Your Name" ref={this.inputRef} type="text" />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}
class FileInput extends React.Component {
    constructor(props) {
        super(props);
        this.fileInputRef = React.createRef();
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.fileInputRef.current.files[0]) {
            return;
        }
        alert(
            `Selected file - ${this.fileInputRef.current.files[0].name}`
        );
    }
    render() {
        return (
            <form onSubmit={e => this.handleSubmit(e)}>
                <label>
                    Upload file: <input ref={this.fileInputRef} type="file" />
                </label>
                <button type="submit">Submit</button>
            </form>
        );
    }
}

class UncontrolledComponents extends React.Component {
    render() {
        return (
            <div>
                <h2>Uncontrolled Components</h2>
                <p>In most cases, we recomment using controlled components to 
                implement forms. In a controlled component, 
                form data is handled by a React component. 
                The alternative is uncontrolled conponents, where form data is handled by the DOM itself.</p>
                <NameForm />
                <h3>Default Values</h3>
                <p>In the React rendering lifecycle, the value attribute on form elements will override the value in 
                the DOM. With an uncontrolled component, you often want React to specify the initial value, 
                but leave subsequent updates uncontrolled. To handle this case, you can specify a 
                defaultValue attribute instead of value.</p>
                <h3>The file input Tag</h3>
                <p>In React, an &lt;input type="file" /&gt; is always an uncontrolled component because its value 
                can only be set by a user, and not programmatically.</p>
                <FileInput />
            </div>
        );
    }
}

export default UncontrolledComponents;