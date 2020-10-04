import React, { Profiler, useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);
    return (
        <button onClick={() => setCount(count + 1)}>Clicks: {count}</button>
    );
}


class ProfilerAPI extends React.Component {
    constructor(props) {
        super(props);
        this.divRef = React.createRef();
    }
    random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    update() {
        if (!this.divRef.current) {
            return;
        }
        const color = `rgb(${this.random(0, 255)}, ${this.random(0, 255)}, ${this.random(0, 255)})`;
        this.divRef.current.innerHTML = "updated";
        this.divRef.current.style.backgroundColor = color;
        this.divRef.current.style.textAlign = "center";
    }
    onRenderCallback(id, phase, actualDuration, baseDuration, startTime, commitTime, interactions) {
        console.log("id: ", id);
        console.log("phase: ", phase);
        console.log("actualDuration: ", actualDuration);
        console.log("baseDuration: ", baseDuration);
        console.log("startTime: ", startTime);
        console.log("commitTime: ", commitTime);
        console.log("interactions: ", interactions);
    }
    render() {
        return (
            <div>
                <h2>Profiler API</h2>
                <p>The Profiler measures how often a React application renders and what the "cost" of rendering is. 
                Its purpose is to help identify parts of an application that are slow and may benefit from 
                optimizations such as memoization.</p>
                <h3>Usage</h3>
                <p>A Profiler can be added anywhere in a React tree to measure the cost of rendering that part of the tree. 
                It requires two props: an id (string) and an <span>onRender callback (function) which React calls any time a component within 
                the tree "commits" an update.</span></p>
                <Profiler 
                    id="Counter-parent"
                    onRender={this.onRenderCallback.bind(this)}
                >
                    <Profiler 
                        id="Counter"
                        onRender={this.update.bind(this)}
                        
                    >
                        <Counter />
                    </Profiler>
                </Profiler>
                <div ref={this.divRef}></div>
                <p>Pofiler components can also be nested to measure different components within the same subtree.</p>
            </div>
        );
    }
}

export default ProfilerAPI;