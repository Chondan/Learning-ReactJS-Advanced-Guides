import React, { useState } from 'react';
import Area from './otherComponents/area';
// Context lets us pass a value deep into the component tree
// without explicity threading it through every component. 
// Create a context for the current theme (with "light" as default)
// * The defaultValue argument is only used when a component does not have a matching Provider above it in the tree. 

const ThemeContext = React.createContext({ theme: "LIGHT" });
const UserContext = React.createContext( {name: "Guest" });
UserContext.displayName = "UserContext";
function Toobar() {
    const [theme, setTheme] = useState("DARK");
    function handleChange(e) {
        setTheme(e.target.value);
    }
    return (
        <>
            <input type="radio" name="theme" value="DARK" checked={theme==="DARK"} onChange={handleChange} />
            <label>Dark theme</label>
            <input type="radio" name="theme" value="LIGHT" checked={theme==="LIGHT"} onChange={handleChange} />
            <label>Light theme</label><br />
            <ThemeContext.Provider value="overriden value">
                <ThemeContext.Provider value={{ theme }}>
                    <ThemedButton />
                </ThemeContext.Provider>
            </ThemeContext.Provider>
        </>
    );   
}
class ThemedButton extends React.Component {
    // static contextType = ThemeContext;
    changeTheme = () => {
        if (this.context.theme === "DARK") {
            document.body.style.background = "black";
            document.body.style.color = "white";
        } else {
            document.body.style.background = "white";
            document.body.style.color = "black";
        }
    }
    componentDidMount() {
        console.log("componentDidMount: ", this.context);
        this.setState({ changeThemeTo: this.context.theme });
    }
    componentDidUpdate() {
        console.log("componentDidUpdate: ", this.context);
    }
    render() {
        return (
            <button onClick={this.changeTheme}>Change theme to {this.context.theme}</button>
        );
    }
}
ThemedButton.contextType = ThemeContext;
function LoginPage() {
    const [lastGuest, setLastGuest] = useState({ name: "Guest" });
    const userInputRef = React.createRef();
    function onSubmmitHandler() {
        if (userInputRef.current.value === "") {
            return;
        }
        setLastGuest({ name: userInputRef.current.value });
        userInputRef.current.value = "";
        userInputRef.current.focus();
    }
    return (
        <UserContext.Provider value={lastGuest}>
            <Form ref={{ userInputRef }} onSubmit={onSubmmitHandler} legend="Login" label={{ username: "UserName", password: "Password" }} />
        </UserContext.Provider>
    );
}
const Form = React.forwardRef((props, ref) => {
    return (
        <UserContext.Consumer>
            {obj => (
                <form onSubmit={e => {
                    e.preventDefault();
                    props.onSubmit();
                }}>
                    <fieldset>
                        <legend>{props.legend}</legend>
                        <label>{props.label.username}: </label>
                        <input placeholder={`${obj.name}...`} ref={ref.userInputRef} /><br />
                        <label>{props.label.password}: </label>
                        <input /><br />
                        <input type="submit" />
                    </fieldset>
                </form>
            )}
        </UserContext.Consumer>
    );
});
const CoinContext = React.createContext(50);
const UsernameContext = React.createContext("Guest");
class ShoppingPage extends React.Component {
    render() {
        return (
            <UserTab />
        );
    }
}
class UserTab extends React.Component {
    render() {
        return (
            <UserStatus />
        );
    }
}
class UserStatus extends React.Component {
    render() {
        return (
            <UsernameContext.Consumer>
                {username => (
                    <CoinContext.Consumer>
                        {coin => (
                            <div>
                                <div>name: {username}</div>
                                <div>coin: {coin}</div>
                            </div>
                        )}
                    </CoinContext.Consumer>
                )}
            </UsernameContext.Consumer>
        );
    }
}
const CaveatExampleContext = React.createContext({ something: "something" });
function CaveatExample() {
    const [number, setNumber] = useState(Math.random().toFixed(2));
    return (
        <React.Fragment>
            <CaveatExampleContext.Provider value={"contextValue"}>
                <CaveatExampleChild />
            </CaveatExampleContext.Provider>
            <span>number: {number} </span>
            <button onClick={() => setNumber(Math.random().toFixed(2))}>Change number</button>
        </React.Fragment>
    );
}
function CaveatExampleChild() {
    return (
        <CaveatExampleLastChild />
    )
}
function CaveatExampleLastChild() {
    console.log("re-render");
    return (
        <CaveatExampleContext.Consumer>
            {obj => (
                <div>Context: {obj.something}</div>
            )}
        </CaveatExampleContext.Consumer>
    );
}

function Context() {
    return (
        <div>
            <h2>Context</h2>
            <p>Context provide a way to pass data through the component tree without 
            having to pass props down manually at every level.</p>
            <p>In a typical React application, data is passed top-down (parent to child) via props, 
            but this can be cumbersome for certain types of props (e.g. locale preference, UI theme) 
            that are required by many components within an application. 
            Context provides a way to share values like these between components without having to explicity pass a 
            prop through every level of the tree.</p>
            <h3>When to Use Context</h3>
            <p>Context is designed to share data that can be considered "global" for a tree of React components, 
            such as the current authenticated user, theme, or preferred language.</p>
            <Toobar />
            <LoginPage />
            <h3>API</h3>
            <ul>
                <li>React.createContext</li>
                <li>React.Provider</li>
                <li>Class.contextType</li>
                <li>or set <code>static contextType = Mycontext inside the class</code></li>
                <li>Context.Consumer</li>
                <li>Context.displayName</li>
                <p>Context object accepts a displayName string property. 
                React DevTools uses this string to determine what to display for the context. </p>
            </ul>
            <h3>Example: Dynamic Context</h3>
            <Area />
            <h3>Updating Context from a Nested Component</h3>
            <p>It is often neccesary to update the context from a component 
            that is nested somewhere deeply in the component tree. In this case you can pass a function down through 
            the context to allow consumers to update the context.</p>
            <h3>Consuming Multiple Contexts</h3>
            <p>To keep context re-rendering fast, React needs to make each context consumer a separate node in the tree.</p>
            <ShoppingPage />
            <h3>Caveats</h3>
            <p>Because context uses reference identity to determine when to re-render, 
            there are some gotchas that could trigger unintentional renders in consumers 
            when a provider's parent re-renders.</p>
            <p>To get around this, lift the value in to the parent's state.</p>
            <CaveatExample />
        </div>
    );
}

export default Context;