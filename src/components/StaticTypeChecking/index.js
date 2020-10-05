import React from 'react';

class StaticTypeChecking extends React.Component {
    render() {
        return (
            <div>
                <h2>Static Type Checking</h2>
                <p>Static type checkers like Flow and TypeScript identify certain types of 
                problems before you even run your code. 
                They can also improve developer workflow by adding features like auto-completion. 
                For this reason, we recommend using Flow or TypeScript instead of PropTypes for larger code bases.</p>
                <h3>Flow</h3>
                <h3>TypeScript</h3>
                <h3>Reason</h3>
                <h3>Kotlin</h3>
            </div>
        );
    }
}

export default StaticTypeChecking;