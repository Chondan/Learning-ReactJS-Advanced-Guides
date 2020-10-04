import React from 'react';
import ReactDOM from 'react-dom';

const container = document.createElement('div');
container.id = "container";
container.title = "container";
container.style.cursor = "pointer";
document.body.appendChild(container);

const modalRoot = document.createElement('div');
modalRoot.id = "modal-root";
document.body.appendChild(modalRoot);

class Box extends React.Component {
    render() {
        return ReactDOM.createPortal(
        <div style={{ textAlign: "center" }}>
            <div>Hello world</div>
            <button onClick={() => alert("How are you doing?")}>Click me!</button>
        </div>,
        container);
    }
}
class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.el = document.createElement('div');
    }
    componentDidMount() {
        modalRoot.appendChild(this.el);
    }
    componentWillUnmount() {
        modalRoot.removeChild(this.el);
    }
    render() {
        return ReactDOM.createPortal(
            this.props.children,
            this.el
        );
    }
}
class Parent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { clicks: 0 };
    }
    handleClick() {
        this.setState(state => (
            {
                clicks: state.clicks + 1,
            }
        ))
    }
    render() {
        return (
            <div onClick={this.handleClick.bind(this)}>
                <p>Number of clicks: {this.state.clicks}</p>
                <p>
                    Open up the browser DevTools
                    to observe that the buttonis not a child of the div with
                    the onClick handler.
                </p>
                <Modal>
                    <Child />
                </Modal>
            </div>
        );
    }
}
class Child extends React.Component {
    render() {
        return (
            <div className="modal">
                <button>Click</button>
            </div>
        );
    }
}


class Portals extends React.Component {
    render() {
        return (
            <div>
                <h2>Portals</h2>
                <p>Portals provide a first-class way to render children into a DOM node that exists outside the DOM hierachy of 
                the parent component.</p>
                <strong>Syntax: ReactDOM.createPortal(child, container)</strong>
                <h3>Usage</h3>
                <p>Normally, when you return an element from a component's render method, 
                it's mounted into the DOM as a child of the nearest parent node.</p>
                <p>However ,sometimes it's useful to insert a child into a different location in the DOM.</p>
                <p>A typical use case fo portal is when a parent component has an overflow: hidden or z-index style, 
                but you need the child to visually "break out" of its container. 
                For example, dialogs, hovercards, and tooltips.</p>
                <Box />
                <h3>Event Bubbling Through Portals</h3>
                <p>Even though a portal can be anywhere in the DOM tree, it behaves like a normal React child in 
                every other way. Features like context work exactly the same regardless of whether the child is a portal, 
                as the portal still exists in the React tree regardless of position in the DOM tree.</p>
                <p>This includes event bubbling. <span style={{ color: "blue" }}>An event fired from inside a portal will propogate to ancestors in 
                the containing React tree</span>, even if those elements are not ancestors in the DOM tree. Assuming the following HTML structure.</p>
                <Parent />
            </div>
        );
    }
}

export default Portals;