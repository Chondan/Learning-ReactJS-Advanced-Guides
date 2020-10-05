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
            x: 0, y: 0, scroll: 0, allow: false
        }
        document.onmousemove = (e) => {
            const { scrollTop } = document.documentElement;
            this.setState({ x: e.clientX, y: scrollTop + e.clientY });

        }
        
    }
    handleChange(e) {
        this.setState({ allow: e.target.checked })
    }
    render() {
        // Instead of providing a static representation of what <Mouse> renders, 
        // use the "render" prop to dynamically determine what to render.
        return (
            <div>
                <p>The current mouse position is ({this.state.x}, {this.state.y})</p>
                <input type="checkbox" onChange={this.handleChange.bind(this)} checked={this.state.allow} /> enabel toggle image
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
            if (!this.props.mouse.allow) {
                return;
            }
            this.setState(state => ({ isShow: !state.isShow }));
        }
    }
    render() {
        const mouse = this.props.mouse;
        if (this.state.isShow) {
            return (
                <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Koala_climbing_tree.jpg/240px-Koala_climbing_tree.jpg"
                    style={{ position: "absolute", left: mouse.x, top: mouse.y, width: "100px", height: "auto" }}
                    alt="Koala"
                />
            );
        }
        else {
            return <h1>Hi</h1>
        }
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