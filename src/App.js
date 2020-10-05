import React from 'react';
import Accessibility from './components/Accessibility/index';
import CodeSplitting from './components/CodeSplitting/index';
import Context from './components/Context/index';
import ErrorBoundaries from './components/ErrorBoundaries/index';
import ForwardingRefs from './components/ForwardingRefs/index';
import Fragments from './components/Fragments/index';
import HigherOrderComponents from './components/HigherOrderComponents';
import IntegratingWithOtherLibraries from './components/IntegratingWithOtherLibraries/index';
import JSXInDepth from './components/JSXInDepth/index';
import OptimizingPerformance from './components/OptimizingPerformance/index';
import Portals from './components/Portals/index';
import ProfilerAPI from './components/ProfilerAPI';
import Reconciliation from './components/Reconciliation/index';
import RefsAndTheDOM from './components/RefsAndTheDOM/index';
import RenderProp from './components/RenderProp/index';
import StaticTypeChecking from './components/StaticTypeChecking/index';
import StrictMode from './components/StrictMode/index';
import TypecheckingWithPropTypes from './components/TypecheckingWithPropTypes/index';
import UncontrolledComponents from './components/UncontrolledComponents/index';

class App extends React.Component {
    render() {
        return (
            <div>
                <h1>React Advanced Guides</h1>
                <Accessibility />
                <CodeSplitting />
                <Context />
                <ErrorBoundaries />
                <ForwardingRefs />
                <Fragments />
                <HigherOrderComponents />
                <IntegratingWithOtherLibraries />
                <JSXInDepth />
                <OptimizingPerformance />
                <Portals />
                <ProfilerAPI />
                <Reconciliation />
                <RefsAndTheDOM />
                <RenderProp />
                <StaticTypeChecking />
                <StrictMode />
                <TypecheckingWithPropTypes />
                <UncontrolledComponents />
            </div>
        );
    }
}

export default App;