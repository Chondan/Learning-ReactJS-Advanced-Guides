import React from 'react';
import PropTypes from 'prop-types';

class Greeting extends React.Component {
    render() {
        return (
            <div>
                <div>Hello, {this.props.name}</div>
            </div>
        );
    }
}
Greeting.propTypes = {
    name: PropTypes.string
};
class ParentRequireSingleChild extends React.Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}
ParentRequireSingleChild.propTypes = {
    children: PropTypes.element.isRequired
};
class Hola extends React.Component {
    render() {
        return (
            <div>
                Hola {this.props.name}, Como estad?
            </div>
        );
    }
}
Hola.defaultProps = {
    name: "Chondan"
};
class Gender extends React.Component {
    render() {
        return (
            <div>Your gender is {this.props.gender}</div>
        );
    }
}
Gender.propTypes = {
    gender: PropTypes.oneOf(["male", "female"]).isRequired
}

class TypeCheckingWithPropTypes extends React.Component {
    render() {
        return (
            <div>
                <h2>Typechecking With PropTypes</h2>
                <p>As your app grows, you can catch a lot of bugs with typechecking. 
                For some applications, you can use JavaScript extensions like Flow or TypeScript to typecheck your whole application. 
                But even if you don't use those, React has some built-in typechecking abilities. 
                To run typechecking on the props for a component, you can assign the special propTypes property.</p>
                <h3>PropTypes</h3>
                <Greeting name={"Chondan"} />
                <h3>Requiring Single Child</h3>
                <ParentRequireSingleChild>
                    <div>How are you doing?</div>
                </ParentRequireSingleChild>
                <h3>Default Prop Values</h3>
                <Hola />
                <Gender gender="male" />
            </div>
        );
    }
}

export default TypeCheckingWithPropTypes;