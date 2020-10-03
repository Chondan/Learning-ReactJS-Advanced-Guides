import React from 'react';

function ExampleReactLazyComponent() {
    return (
        <React.Fragment>
            <div style={{ color: "blue" }}>Example React.lazy</div>
        </React.Fragment>
    );
}

function Hello() {
    return (
        <div>
            Hello, I am a lazy component.
        </div>
    );
}

function Hello2() {
    return (
        <div>
            Hello again, I am a lazy component.
        </div>
    );
}

function Hola() {
    return (
        <div>
            Hola, Como estad?
        </div>
    );
}

export default ExampleReactLazyComponent;
export { Hello, Hello2, Hola };