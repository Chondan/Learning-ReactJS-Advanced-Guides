import React from 'react';
import { ThemeContext } from './theme-context';

class ThemedButton extends React.Component {
    render() {
        let props = this.props;
        let theme = this.context.theme;
        return (
            <button 
                {...props}
                style={{ color: theme.foreground, backgroundColor: theme.background }}
                onClick={this.context.toggleTheme}
            >{props.children}</button>
        );
    }
}
ThemedButton.contextType = ThemeContext;

export default ThemedButton;