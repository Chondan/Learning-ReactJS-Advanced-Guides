import React from 'react';
import Stories from './OtherComponents/stories';

const MyButton = React.createElement("button", { color: "red" }, "Click me!");
const ReactCreatElementExample = React.createElement("div", { color: "blue", style: {color: "blue"} }, MyButton, <br />, <span>Example: React.CreatElement()</span>);
console.log(ReactCreatElementExample.props);
// --- Using Dot Notation for JSX Type
const MyComponents = {
    DatePicker: function DatePicker(props) {
        return <div>Imagine a {props.color} datepicker here.</div>
    },
    Time: <div>Today is { new Date().toLocaleDateString() }</div>
}
function Foo(props) {
    return <div style={props.style}>{props.children}, How are you?</div>
}
const FooElem = React.createElement(Foo, { style: { color: "yellow", backgroundColor: "green" } }, "Hi");
// --- User-Defined Components Must Be Capitalized
function hello() {
    return <button>Hello, I was assigned to a new capitalized variable</button>;
}
// Or, assign it to a Capitalized variable
const Hello = hello;
// --- Chossing the Type at Runtime
const { PhotoStory, VideoStory } = Stories;
const components = {
    photo: PhotoStory,
    video: VideoStory,
};
function StoryBasedOnProp(props) {
    const SpecificStory = components[props.storyType];
    return <SpecificStory story={props.story} />
}
const curlyBrace = '{}';
// --- Props in JSX
// --- JavaScript Expressions as Props
function Sum(props) {
    const sum = props.numbers.reduce((accumulator, currentValue) => accumulator + currentValue);
    return <div>{props.numbers.join('+ ')} = {sum}</div>
}
function Test(props) {
    if (props.TestDefaultProp) {
        return <div>Test, props defalut to "true"</div>
    }
    return <div>Test, {props.message}</div>
}
const profile = { name: "Chondan", age: 22 };
function Greeting(props) {
    return <div>Hello, My name is {props.name}, I am {props.age} years old.</div>
}
const Button = props => {
    const { msg, ...other } = props;
    const { name } = other;
    return <button onClick={() => alert(`Hi ${name}, ` + msg)} {...other}>Click Me!</button>
}
function ParentComponent(props) {
    return <div>{props.children}</div>
}
function MyItems() {
    // No need to wrap list items in an extra element!
    return [
        <li key="1">Item 1</li>,
        <li key="2">Item 2</li>,
        <li key="3">Item 3</li>
    ]
}
function Item(props) {
    return <li>{props.todo}</li>;
}
function TodoList() {
    const todos = ["finish doc", "submit pr", "playing football"];
    return (
        <ul>
            {todos.map(todo => <Item key={todo} todo={todo} />)}
        </ul>
    )
}
function Repeat(props) {
    const items = Array(10).fill(null).map((item, index) => props.children(index));
    return (
        <div>
            {items}
        </div>
    );
}
function ListOfThings(props) {
    return (
        <Repeat numTimes={props.numTimes}>
            {(index) => <div key={index}>This is item {index} in the list.</div>}
        </Repeat>
    );
}
function Parent(props) {
    return (
        <div>
            {props.children[1]}
        </div>
    )
}
function MessageList(props) {
    return ( 
        props.messages.length > 0 && 
        <div>
            {props.messages.map(msg => <div key={msg}>{msg}</div>)}
        </div>
    );
}



class JSXInDepth extends React.Component {
    render() {
        return (
            <div>
                <h2>JSX In Depth</h2>
                {ReactCreatElementExample}
                <h3>Specifying The React Element Type</h3>
                <p>Capitalized types indicate that the JSX tag is referring to a React Component.</p>
                <h4>React Must Be in Scope</h4>
                <p>Since JSX compiles into calls to React.createElement, 
                the React library must also always be in scope from your JSX code.</p>
                <p>If you don't use a JavaScript bundler and loaded React from a &lt;script&gt; tag, 
                it is already in scope as the React global.</p>
                <h4>Using Dot Notation for JSX Type</h4>
                <p>You can also refer to a React component using dot-notation from within JSX.</p>
                <MyComponents.DatePicker color="blue" />
                {MyComponents.Time}
                <h4>User-Defined Components Must Be Capitalized</h4>
                <p>When an element type starts with a lowercase letter, it refers to a 
                built-in component like &lt;div&gt; or &lt;span&gt; and resulting in a string 'div' or 'span' 
                passed to React.createElement </p>
                {FooElem}
                <p>Or, assign user-defined component with lowercase letter to a new capitalized variable.</p>
                <Hello />
                <h4>Chossing the Type at Runtime</h4>
                <p>You cannot use a general expression as the React element type. 
                If you do want to use a general expression to indicate the type of the element, just assign it to a capitalized variable first. 
                This often comes up when you want to render a different component based on a prop.</p>
                <StoryBasedOnProp storyType="photo" />
                <StoryBasedOnProp storyType="video" />
                <h3>Props in JSX</h3>
                <p>There are several different ways to specify props in JSX.</p>
                <h4>JavaScript expression as Props</h4>
                <p>You can pass any JavaScript expression as a prop, by surrounding it with {curlyBrace}</p>
                <Sum numbers={[1, 2, 3, 4, 5]} />
                <h4>String Literals</h4>
                <Test message="Hello world" />
                <Test message={"Hello world"} />
                <p>When you pass a string literal, its value is HTML-unescaped.</p>
                <h4>Props Default to "True"</h4>
                <p>If you pass no value for a prop, it defalut to true.</p>
                <Test TestDefaultProp={false} />
                <Test TestDefaultProp />
                <h4>Spread Attributes</h4>
                <p>If you already have props as an object, and you want to pass it in JSX, 
                you can use ... as a "spread" operator to pass the whole props object.</p>
                <Greeting {...profile} />
                <Greeting name="Mohamed Salah" age="28" />
                <p>You can also pick specific props that your component will consume while passing all other props using the spread operator.</p>
                <Button msg="How are you doing?" name="Chondan" />
                <h3>Children in JSX</h3>
                <p>In JSX expressions that contain both an opening tag and a closing tag, 
                the content between those tag is passed as a special prop: props.children. 
                There are several different ways to pass children.</p>
                <h4>String Literals</h4>
                <ParentComponent>Hello World!</ParentComponent>
                <p>JSX removes whitespace at the beginning and ending of a line. 
                It also removes blank lines. New lines adjacent to tags are removed: new lines 
                that occur in the middle of string literals are condensed into a single space.</p>
                <p>These three phrases below were written in different way but its give us the same result as you can see.</p>
                <ParentComponent>
                    Hello World
                </ParentComponent>
                <ParentComponent>
                    Hello
                    World
                </ParentComponent>
                <ParentComponent>

                    Hello World
                </ParentComponent>
                <h4>JSX Children</h4>
                <p>You can provide more JSX elements as the children.</p>
                <ParentComponent>
                    <ParentComponent>Hello</ParentComponent>
                    <ParentComponent>Hello again</ParentComponent>
                </ParentComponent>
                <p>A React component can also return an array of elements.</p>
                <ul>
                    <MyItems />
                </ul>
                <h4>JavaScript Expressions as Children</h4>
                <p>You can pass any JavaScript expression as children, by enclsoing it within {curlyBrace}.</p>
                <p>This is often useful for rendering a list of JSX expressions of arbitrary length.</p>
                <TodoList />
                <h4>Functions as Children</h4>
                <p>Normally, JavaScript expressions inserted in JSX will evaluate to a string, a React element, or a list of those things. 
                However, props.children works justi like any other prop in that it can pass any sort of data, 
                not just the sorts that React knows how to render. </p>
                <ListOfThings numTimes={10} />
                <p>props.children returned an array of children</p>
                <Parent>
                    <button>Click me</button>
                    <div>Hello, I am children number 1 (props.children[1]).</div>
                </Parent>
                <h4>Booleans, Null and Undefined Are Ignored</h4>
                <p>false, null, undefined, and true are valid children. 
                They simply don't render.</p>
                <p>This can be useful to conditionally render React elements.</p>
                <p>One caveat is that some "falsy" values, such as the 0 number, are still rendered by React.</p>
                <MessageList messages={["Hi", "What's up?"]} />
                <p>Conversely, if you want a value like false, true, null or undefined to appear in the output, 
                you have to convert it to a string first.</p>
                <p>My JavaScript variable is {String(true)}.</p>
            </div>
        );
    }
}

export default JSXInDepth;