import React from 'react';

class MouseTracker extends React.Component {
    render() {
        return (
            <div>
                <strong>Click and Move the mouse around</strong>
                <Mouse render={mouse => (
                    <Koala mouse={mouse} />
                )} 
                    anotherRender={() => (
                        <div>This is another render.</div>
                    )}
                />
            </div>
        );
    }
}
class Mouse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            x: 0, y: 0
        }
        document.onmousemove = (e) => {
            this.setState({ x: e.clientX, y: e.clientY });
        }
        this.props.render(this.state);
    }
    render() {
        // Instead of providing a static representation of what <Mouse> renders, 
        // use the "render" prop to dynamically determine what to render.
        return (
            <div>
                <p>The current mouse position is ({this.state.x}, {this.state.y})</p>
                {/* <Koala mouse={this.state} /> */}
                {this.props.render(this.state)}
                {this.props.anotherRender()}
            </div>
        );
    }
}
class Koala extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
        }
        document.onclick = () => {
            this.setState(state => ({ isShow: !state.isShow }));
        }
    }
    render() {
        const mouse = this.props.mouse;
        if (this.state.isShow) {
            return (
                <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Koala_climbing_tree.jpg/240px-Koala_climbing_tree.jpg"
                    style={{ position: "absolute", left: mouse.x, top: mouse.y, width: "100px" }}
                    alt="Koala"
                />
            );
        }
        return false;
    }
}


class RenderProp extends React.Component {
    render() {
        return (
            <div>
                <h2>Render Prop</h2>
                <p>The term "render prop" refers to a technique for sharing code 
                between React components using a prop whose value is a function.</p>
                <p>A component with a render prop takes a function that returns a React element and 
                calls it instead of implementing its own render logic</p>
                <h3>Use Render Props for Cross-Cutting-Concerns</h3>
                <MouseTracker />
            </div>
        );
    }
}

export default RenderProp;