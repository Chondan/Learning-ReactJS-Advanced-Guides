import React, { Fragment, useState } from 'react';
import DocumentTitle from 'react-document-title';
import { v4 as uuid4 } from 'uuid';

function Form() {
    const [inputValue, setInputValue] = useState("");
    function handleSubmit(e) {
        e.preventDefault();
        console.log(inputValue);
    }
    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                aria-label="name"
                aria-required
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
                name="name"
            />
            <input type="submit" />
        </form>
    );
}
// --- Semantic HTML
// Semantic HTML is the foundation of accessibility in a web application. 
// Using the various HTML elements ro reinforce the meaning of information in our websites will often give us accessibility for free. 
function SemanticTag() {
    return (
        <div>
            <h3>Semantic Tag</h3>
            <base href="https://www.google.com" />
            <a href="#anchor">Google</a>
            <Glossary items={[ { term: "Sport", descriptions: ["Football", "Tennis"] } ]} />
        </div>
    );
}
// Sometimes we break HTML semantics when we add <div> elements to our JSX to make our React code work, 
// especially when working with lists (<ol>, <ul> and <dl>) and the HTML <table>. 
// In these cases we should rather use React Fragments to group together multiple elements. 
function ListItem({ item }) {
    return (
        <Fragment>
            <dt>{item.term}</dt>
            {item.descriptions.map(description => <dd key={uuid4()}>{description}</dd>)}
        </Fragment>
    );
}
function Glossary(props) {
    return (
        <dl>
            {props.items.map(item => (
                <ListItem key={uuid4()}  item={item} />
            ))}
        </dl>
    );
}
// --- Accessible Forms
// ---- Labeling 
// Every HTML form control, such as <input> and <textarea>, 
// needs to be labeled accessibly. 
// * use the label element to associate text with form element explicity. 
// * The for attribute of the label must exactly match the id of the form control. 
function AccessibleForm() {
    return (
        <Fragment>
            <h3>Accessible Form</h3>
            <h4>Labeling</h4>
            <form>
                <label htmlFor="hobbyInput" aria-labelledby="hobbyInput">Hobby: </label>
                <input type="text" id="hobbyInput" name="hobby"></input>
            </form>
            <h4>Notifying the user of errors</h4>
            <p>Error situations need to be understood by all users.</p>
        </Fragment>
    );
}
// --- Focus Control
function FocusControl() {
    return (
        <Fragment>
            <h3 id="focus-control">Focus Control</h3>
            <h4>Keyboard focus and focus outline</h4>
            <form>
                <fieldset>
                    <p>Click this form to access and then press tab to fucus control inputs that were ordered by tabIndex attribute</p>
                    <p><code>Tab</code> for navigate forward</p>
                    <p><code>Shift + Tab</code> for navigate backward</p>
                    <legend>Focus control example</legend>
                    <label>Text: </label>
                    <input tabIndex="1" type="text"/><br/>
                    <label>Item1</label>
                    <input tabIndex="2" type="checkbox"/>
                    <label>Item2</label>
                    <input tabIndex="3" type="checkbox"/><br/>
                    <button tabIndex="3" type="button" onClick={() => alert("clicked")}>Click Me</button><br/>
                    Reade this link about how to control by keyboard and others detail: 
                    <a title="Read here for more details" href="https://www.webaim.org/techniques/keyboard" tabIndex="4">Keyboard Accessibility</a>
                </fieldset>
            </form>
            <h4>Mechanism to skip to desired content</h4>
            <p>Provide a meachanism to allow user to skip past navigation sections in 
            your application as this assists and speeds up keyboard navigation.</p>
            <p>Skiplinks or Skip Navigation Links are hidden navigation links that only 
            become visible when keyboard users interect with the page.</p>
            <h4>Programatically managing focus</h4>
            <p>Our React applications continuously modify the HTML DOM during runtime, 
            sometimes leading to keyboard focus being lost or set to an unexpected element. 
            In order to repair this, we need to programatically nudge the keyboard focus in the right direction.</p>
            <ParentInput />
        </Fragment>
    );
}
function Skiplinks(props) {
    return (
        <Fragment>
            {props.children}
        </Fragment>
    );
    
}
// Sometimes a parent component needs to set focus to an element in a child component.
class ParentInput extends React.Component {
    constructor(props) {
        super(props);
        this.inputElement = React.createRef();
    }
    componentDidMount() {
        this.inputElement.current.focus();
    }
    render() {
        return (
            <>
                <ChildInput placeholder={"Focus me..."} inputRef={this.inputElement} />
                <button onClick={() => alert(this.inputElement.current.value)}>Click Me</button>
            </>
        );
    }
}
function ChildInput(props) {
    return (
        <input ref={props.inputRef} placeholder={props.placeholder} />
    );
}
function MouseAndPointerEvents() {
    return (
        <Fragment>
            <h3>Mouse and pointer events</h3>
            <p>Ensure that all functionality exposed through a mouse or pointer event can 
            also be accessed using the keyboard alone.</p>
            <OuterClickExample />
            <BlurExample />
        </Fragment>
    );
}
class OuterClickExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isOpen: false };
        this.container = React.createRef();
        this.buttonRef = React.createRef();
    }
    onClickOutsideHandler = (e) => {
        if (e.target === this.buttonRef.current) {
            return;
        }
        this.setState({ isOpen: false });
    }
    componentDidMount() {
        window.addEventListener("click", this.onClickOutsideHandler);
    }
    componentWillUnmount() {
        window.removeEventListener("click", this.onClickOutsideHandler);
    }
    render() {
        return (
            <div ref={this.container}>
                <h4>Example 1</h4>
                <p>This may work fine for users with pointer devices, such as a mouse 
                , but operating this with the keyboard alone leads to broken functionality when tabbing to the next element 
                as the window object never receives a click event.</p>
                <button ref={this.buttonRef} onClick={() => this.setState({ isOpen: !this.state.isOpen })}>Select an option</button>
                { this.state.isOpen && (
                    <ul className="outer-click-example-list">
                        <li>Option1</li>
                        <li>Option2</li>
                        <li>Option3</li>
                    </ul>
                )}
                <button>Select me too</button>
                <button>Select me too</button>
            </div>
        );
    }
}
class BlurExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isOpen: false };
        this.timeOutId = null;
    }
    onBlurHandler = () => {
        // We close the popover on the next tick by using setTimeout. 
        // This is neccessary because we need to first check if 
        // another child of the element has received focus as 
        // the blur event fires prior to the new focus event. 
        this.timeOutId = setTimeout(() => {
            this.setState({ isOpen: false });
        });
    }
    onFocusHandler = () => {
        clearTimeout(this.timeOutId);
    }
    render() {
        return (
            <div>
                <h4>Example 2</h4>
                <div 
                    style={{ border: "1px solid black", padding: "5px" }}
                    onBlur={this.onBlurHandler}
                    onFocus={this.onFocusHandler}
                >
                    <button onClick={() => this.setState({ isOpen: !this.state.isOpen })}>Select an option</button>
                    {this.state.isOpen && (
                        <ul className="outer-click-example-list">
                            <li>Option1</li>
                            <li>Option2</li>
                            <li>Option3</li>
                        </ul>
                    )}
                    <input></input>
                </div>
                <button>Select me too</button>
                <button>Select me too</button>
            </div>
        );
    }
}
function MoreComplexWidgets() {
    return (
        <div>
            <h3>More Complex Widgets</h3>
            <p>A more complex user experience should not mean 
            a less accessible one. Whereas accessibility is most easily achieved by coding as close to HTML as possible, </p>
            even the most complex widget can be coded accessibly.
        </div>
    );
}
function OtherPointsForConsideration() {
    return (
        <div>
            <h3>Other Points for Consideratioin</h3>
            <h4>Setting the language</h4>
            <p>Indicate the human language of page texts as screen reader software uses this to 
            select the correct voice setting</p>
            <strong>For example: </strong>If you want to hello in spanish, you can say <em lang="es">Hola, Como estad?</em>
            <h4>Setting the document title</h4>
            <p>Set the document &lt;title&gt; to correctly describe the current page content as 
            this ensures that the user remains aware of the current page context.</p>
            <p>We can set this in React using the React Document Title Component</p>
            <h4>Color contrast</h4>
            <p>Ensure that all readable text on your website has sufficient color contrast to remain maximally 
            readable by users with low vision.</p>
        </div>
    );
}
function DevelopmentAndTestingTools() {
    return (
        <div>
            <h3>Development and Testing Tools</h3>
            <p>There are number of tools we can use to assist in the creation of accessible web application</p>
            <h4>The keyboard</h4>
            <p>By far the easiest and also one of the most important checks is to test if your entire website can 
            be reached and used with the keyboard alone. Do this by: </p>
            <ol>
                <li>Disconnecting your mouse.</li>
                <li>Using <code>Tab</code> and <code>Shift+Tab</code> to browse.</li>
                <li>Using <code>Enter</code> to activate elements.</li>
                <li>Where required, using your keyboard arrow keys to interact with some element, 
                such as menus and dropdowns.</li>
            </ol>
            <h4>Development assistance</h4>
            
        </div>
    );
}



class Accessibility extends React.Component {
    render() {
        return (
            <DocumentTitle title="Accessibility">
            <div>
                <Skiplinks>
                <base href="#" />
                    <a href="#focus-control">Skip to Focus Control</a>
                </Skiplinks>
                <h2>Accessibility</h2>
                <Form />
                <SemanticTag />
                <AccessibleForm />
                <FocusControl />
                <MouseAndPointerEvents />
                <MoreComplexWidgets />
                <OtherPointsForConsideration />
                <DevelopmentAndTestingTools />
            </div>
            </DocumentTitle>
        );
    }
}

export default Accessibility;