import React from 'react';

class Reconciliation extends React.Component {
    render() {
        return (
            <div>
                <h2>Reconciliation</h2>
                <p>React provides a declarative API so that you don't have to worry about 
                exactly what changes on every update. This makes writing applications a lot easier, 
                but it might not be obvious how this is implemented within React. 
                This article explains the choices we made in React "diffing" algorithm 
                so that component updates are predictable while being fast enough for high-performance apps.</p>
                <h3>Motivation</h3>
                <p>When you use React, at a single point in time you can think of the render() function as 
                creating a tree of React elements. On the next state or props update, that render() function will return a different tree of React elements. 
                React then needs to figure out how to efficiently update the UI to mathch the most recent tree.</p>
                <h3>The Diffing algorithm</h3>
                <p>When diffing two trees, React first compares the two root elements. 
                The behavior is different depending on the types of the root elements.</p>
                <h4>Elements Of Different Types</h4>
                <p>Any components below the root will also get unmounted and have their state destroyed. 
                For example, when diffing.</p>
                <h4>DOM Elements Of The Same Type</h4>
                <p>When comparing tow React DOM elements of the same type, React looks at the attributes of both, 
                keeps the same underlying DOM node, and only updates the changed attributes.</p>
                <h4>Component Elements Of The Same Type</h4>
                <p>When a component updates, the instance stays the same, so that state is maintained across render. 
                React updates the props of the underlying component instance to match the new element, and calls componentWillReceiveProps() and componentWillUpdate() on the 
                underlying instance.</p>
                <h4>Recursing On Children</h4>
                <p>By default, when recursing on the children of a DOM node, 
                React just iterates over both lists of children at the same time and generates a mutation 
                whenever there's a difference.</p>
                <h4>Keys</h4>
                <p>In order to solve this issue, React supports a key attribute. 
                When children have keys, React uses the key to match children in the original tree with children in the subsequent tree.</p>
                <h3>Tradeoffs</h3>
                <p>It is important to remember that the reconciliation algorithm is an implementation detail. 
                React could rerender the whole app on every action; 
                the end result would be the same. Just to be clear, 
                rerender in this context means calling render for all components, 
                it doesn't mean React will unmount and remount them. 
                It will only apply the differences following the rules stated in the previouse sections.</p>
            </div>
        );
    }
}

export default Reconciliation;