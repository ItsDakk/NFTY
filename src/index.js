import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// Importing BaseLine from MUI -> This is for the NavBar
import CssBaseline from '@mui/material/CssBaseline';
import CustomThemeProvider from './context/ThemeContext';
import AppContextProvider from './context/AppContext';
import LoginForm from './forms/LoginForm';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CustomThemeProvider>
      <AppContextProvider>
        <CssBaseline/>
        <App />
      </AppContextProvider>
    </CustomThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

/* 
  Using the CSSBaseLine will help normalize the website, in case someone on an older website is trying to view
  they will be able to see the page correcltly
*/
