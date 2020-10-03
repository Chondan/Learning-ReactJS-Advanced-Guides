import React from 'react';

class OptimizingPerformance extends React.Component {
    render() {
        return (
            <div>
                <h2>Optimizing Performance</h2>
                <p>Internally, React uses several clever techniques to minimize the number of costly DOM 
                operations required to update the UI. 
                For many applications, using React will lead to a fast user interface without doing much work to specifically optimize for performance. 
                Nevertheless, there are several ways you can speed up your React application.</p>
            <h3>Use the Production Build</h3>
            </div>
        );
    }
}

export default OptimizingPerformance;