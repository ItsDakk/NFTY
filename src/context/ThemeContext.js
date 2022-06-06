import {useState, createContext} from 'react';
import {ThemeProvider} from '@mui/material/styles';
import getTheme from '../themes/base';

// Not a default export so needs to have the same name
export const ThemeContext = createContext({
    // Whatever our current theme is
    currentTheme: 'primaryTheme',
    setTheme: null
})

// This is our version of the ThemeProvider that React offers
const CustomThemeProvider = ({children})=>{
    /* 
        This is to set the theme to whichever theme was in localStorage by grabbing it by the appTheme key,
        or if there is no theme saved then we are setting it to the primaryTheme
    */
    const currentTheme = localStorage.getItem('appTheme') || 'primaryTheme'

    /* 
        Creating a state that will hold the theme that user has selected.
        This is also going to hold the initial theme. themeName will always default to the current theme
    */
    const [themeName, _setThemeName] = useState(currentTheme)

    // This is using string theme to use in our base.js page
    const theme = getTheme(themeName)

    // We are using another setTheme here so we can set our own theme and this will run _setThemeName on the name
    const setThemeName=(name) =>{
        // We are saving the themeName to there localStorage with this line of code 
        localStorage.setItem('appTheme', name)
        // Below is what's actually getting out the theme
        _setThemeName(name)
    }

    const values = {
        /* 
            This is going to things that we want to make accessible outside of our componenet. 
            All of the items that we want to inject to information being passed through the children
        */
        currentTheme:themeName,
        setTheme:setThemeName
    }

    // Building out our theme provider 
    return(
        <ThemeContext.Provider value={values}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    )

}

export default CustomThemeProvider