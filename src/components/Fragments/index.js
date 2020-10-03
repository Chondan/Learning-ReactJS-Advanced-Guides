import React from 'react';

function Family() {
    return (
        <React.Fragment>
            <div>Example: Family's member</div>
            <div>Dad</div>
            <div>Mom</div>
            <div>Son</div>
            <div>Daughter</div>
        </React.Fragment>
    );
}
function Columns(props) {
    if (props.type === "header") {
        return (
            <React.Fragment>
                <th>Column1</th>
                <th>Column2</th>
            </React.Fragment>
        );
    }
    return (
        <React.Fragment>
            <td>Data</td>
            <td>Data</td>
        </React.Fragment>
    );
}

function Table() {
    return (
        <>
            <div>Example: Table</div>
            <table>
                <thead>
                    <tr><Columns type="header" /></tr>
                </thead>
                <tbody>
                    <tr><Columns  /></tr>
                </tbody>
            </table>
        </>
    );
}


class Fragments extends React.Component {
    render() {
        return (
            <div>
                <h2>Fragments</h2>
                <p>A common pattern in React is for a component to return 
                multiple elements. Fragments let you group a list of children without addin extra nodes to the DOM.</p>
                <Family />
                <h3>Motivation</h3>
                <p>A common pattern is for a component to return a list of children.</p>
                <Table />
                <h3>Keyed Fragments</h3>
                <p>Fragments declared with the explicit &lt;React.Fragment&gt; syntax may have keys. 
                A use case for this is mapping a collection to an array of fragments.</p>
            </div>
        );
    }
}

export default Fragments;