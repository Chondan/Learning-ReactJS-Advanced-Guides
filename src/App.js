import React from 'react';
// import Accessibility from './components/Accessibility/index';
// import CodeSplitting from './components/CodeSplitting/index';
// import Context from './components/Context/index';
// import ErrorBoundaries from './components/ErrorBoundaries/index';
// import ForwardingRefs from './components/ForwardingRefs/index';
// import Fragments from './components/Fragments/index';
// import HigherOrderComponents from './components/HigherOrderComponents';
import IntegratingWithOtherLibraries from './components/IntegratingWithOtherLibraries/index';
// import JSXInDepth from './components/JSXInDepth/index';
import OptimizingPerformance from './components/OptimizingPerformance/index';

class App extends React.Component {
    render() {
        return (
            <div>
                <h1>React Advanced Guides</h1>
                {/* <Accessibility /> */}
                {/* <CodeSplitting /> */}
                {/* <Context /> */}
                {/* <ErrorBoundaries /> */}
                {/* <ForwardingRefs /> */}
                {/* <Fragments /> */}
                {/* <HigherOrderComponents /> */}
                <IntegratingWithOtherLibraries />
                {/* <JSXInDepth /> */}
                <OptimizingPerformance />
            </div>
        );
    }
}

export default App;