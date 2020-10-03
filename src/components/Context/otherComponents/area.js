import React from 'react';
import ThemedButton from './themed-button';
import { ThemeContext, themes } from './theme-context';

function Toolbar(props) {
    return (
        <ThemedButton onClick={props.onclick}>
            Change Theme
        </ThemedButton>
    );
}

class Area extends React.Component {
    constructor(props) {
        super(props);
        this.changeTheme = this.changeTheme.bind(this);
        this.state = {
            theme: themes.light,
            toggleTheme: this.changeTheme,
        }
    }
    changeTheme() {
        const changeToTheme = this.state.theme === themes.light ? themes.dark : themes.light;
        this.setState({ theme: changeToTheme });
    }
    render() {
        return (
            <div style={{ backgroundColor: this.state.theme.background, padding: "20px" }}>
                <ThemeContext.Provider value={this.state}>
                    <Toolbar />
                </ThemeContext.Provider>
            </div>
        );
    }
}

export default Area;