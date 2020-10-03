import React from 'react';

const themes = {
    light: {
        foreground: "#000",
        background: "#eee",
    },
    dark: {
        foreground: "#fff",
        background: "#222",
    }
};
const ThemeContext = React.createContext({ 
    theme: themes.dark,
    toggleTheme: function() {}
});

export { ThemeContext, themes };
