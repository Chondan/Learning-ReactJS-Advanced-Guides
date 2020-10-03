import React, { useEffect, useState } from 'react';

const FancyButton = React.forwardRef( function myFunction(props, ref) {
    return <button ref={ref} {...props}>{props.children}</button>
});

const AnotherButton = React.forwardRef((props, ref) => {
    return <button {...props} ref={ref}>{props.children}</button>;
});

function FancyButtonParent() {
    const buttonRef = React.createRef();
    useEffect(() => {
        buttonRef.current.focus();
    });
    return (
        <FancyButton ref={buttonRef}>Focus me first!</FancyButton>
    );
}

function logProps(WrappedComponent) {
    class LogProps extends React.Component {
        componentDidUpdate(prevProps) {
            console.log("old props: ", prevProps);
            console.log("new props: ", this.props);
        }
        render() {
            const {forwardedRef, ...rest} = this.props;
            return <WrappedComponent ref={forwardedRef} {...rest} />
        }
    }
    function forwardRef(props, ref) {
        return <LogProps {...props} forwardedRef={ref} />;
    }
    // You can even set the function's displayName property to include the component you're wrapping
    const name = WrappedComponent.displayName || WrappedComponent.name;
    console.log(WrappedComponent);
    forwardRef.displayName = `logProps(${name})`;
    return React.forwardRef(forwardRef);
}
const Elem = logProps(AnotherButton);
// set displayName of Elem component
Elem.displayName = "AnotherButton";
function LogPropsExample() {
    const [count, setCount] = useState(0);
    const myRef = React.createRef();
    useEffect(() => {
        myRef.current.style.color = "red";
    });
    return (
        <React.Fragment>
            <span>{count} </span>
            <Elem ref={myRef} count={count} onClick={() => setCount(count + 1)}>ADD</Elem>
        </React.Fragment>
    );
}

class ForwardingRefs extends React.Component {
    render() {
        return (
            <div>
                <h2>Forwarding Refs</h2>
                <p>Ref forwarding is a technique for automatically passing a ref 
                through a component to one of its children. This is typically not neccessay for most 
                components in the application. However, it can be useful for some kinds of components, 
                especailly in reusable component libraries.</p>
                <h3>Forwarding refs to DOM components</h3>
                <FancyButtonParent />
                <h3>Note for component library maintainers</h3>
                <p><strong>When you start using forwardRef in a component library, 
                you should treat it as a breaking change and release a new major version of your library.</strong></p>
                <h3>Forwarding refs in higher-order components</h3>
                <LogPropsExample />
                <h3>Displayin a custom name in DevTools</h3>
                <p>React.forwardRef accepts a render function. 
                React DevTools uses this function to determine what to display for the ref forwarding component.</p>
            </div>
        );
    }
}

export default ForwardingRefs;