import React, { Suspense, useState } from 'react';

function CodeSplitting() {
    const [result, setResult] = useState(0);
    const inputRefA = React.createRef();
    const inputRefB = React.createRef();
    async function getResult(inputA, inputB) {
        const res = await import('./otherComponents/math').then(math => math.add(+inputA.current.value, +inputB.current.value));
        setResult(res);
    }
    const ExampleReactLazyComponent = React.lazy(() => import('./otherComponents/ExampleReactLazyComponent'));
    const Hello = React.lazy(() => import('./otherComponents/ExampleReactLazyComponent').then(module => (
        { default: module.Hello }
    )));
    const Hello2 = React.lazy(() => import('./otherComponents/Manage'));
    const Hola = React.lazy(() => import('./otherComponents/ExampleReactLazyComponent').then(module => (
        { default: module.Hola }
    )));
    return (
        <div>
            <h2>Code-Splitting</h2>
            <h3>Bundling</h3>
            <p>Most React apps will have their files "bundled" using tools like Webpack, Rollup or Browserify. 
            Bundling is the process of following imported files and merging them into a single file: a "bundle". 
            This bundle can then be included on a webpage to load entire app at once.</p>
            <h3>Code Splitting</h3>
            <p>Budling is great, but as your app grows, your bundle will grow too. 
            Especially if you are including large third-party libraries. 
            You need to keep an eye on the code you are including in your bundle so that you don't accidentally make it so large that your app takes a long time to load.</p>
            <strong>Example import add function from 'math.js' file: </strong>
            <input className="math-input" ref={inputRefA} /> + <input className="math-input" ref={inputRefB} /> = <span>{result ? result : ""}</span>
            <button onClick={() => getResult(inputRefA, inputRefB)}>Solve</button>
            <h3>React.lazy</h3>
            <p>The React.lazy function lets you render a dynamic import as a regular component.</p>
            <Suspense fallback={<div>Loading...</div>}>
                <ExampleReactLazyComponent />
                <div>Test</div>
                <Hello />
                <Hello2 />
                <Hola />
            </Suspense>
            <p>The lazy component should then be rendered inside a Suspense component, 
            which allow us to show some fallback content (such as a loading indicator) while we're waiting for the lazy component to load.</p>
            <h3>Error boundaries</h3>
            <p>If the other module fails to load (for example, due to network failure), 
            it will trigger an error. you can handle these errors to show a nice user experience and manage recovery with 
            Error Boundaries. Once you've created your Error Boundary, you can use it anywhere above your lazy components to display an error state 
            when there's a network error.</p>
            <h3>Route-based code splitting</h3>
            <h3>Named Exports</h3>
            <p>React.lazy currently only supports default exports. 
            If the module you want to import uses named exports, you can create an 
            intermediate module that reexports it as the default. This ensures that tree shaking keeps working and that you don't pull in unused components.</p>
        </div>
    );
}


export default CodeSplitting;