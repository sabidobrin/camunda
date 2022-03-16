import React, { Component } from "react";
import items from "./items";

export default class FrameworksPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            frameworks: items
        };
    }

    onChange = (e) => {
        this.setState({ inputValue: e.target.value });
    }

    filter (inputValue, items) {
        const filtered = items.filter(item => {
            return item.title.toLowerCase().includes(inputValue.toLowerCase())
              || item.description.toLowerCase().includes(inputValue.toLowerCase());
        });

        return (
            filtered.length > 0 ?
                filtered.map(item => {
                    return (<li key={item.title} className="framework">
                    <b>{item.title}</b><br/>{item.description}<br/><br/>
                    </li>);
                })
                : <span>No results found.</span>
        );
    }

    render() {
        const { inputValue, frameworks } = this.state;
        return (<>
            <h1>Frameworks</h1>
            <input type="text" placeholder="Filter ..." id="filter-field" value={inputValue} onChange={this.onChange} />
            <ul id="frameworks">
              {this.filter(inputValue, frameworks)}
            </ul>
        </>);
    }
}
