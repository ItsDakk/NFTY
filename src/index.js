import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// Importing BaseLine from MUI -> This is for the NavBar
import CssBaseline from '@mui/material/CssBaseline';
// Importing from MUI
import { ThemeProvider } from '@mui/material/styles';
// Importing primary theme from the folder we created
import primaryTheme from './themes/primaryTheme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={primaryTheme}>
      <CssBaseline/>
      <App />
    </ThemeProvider>
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
