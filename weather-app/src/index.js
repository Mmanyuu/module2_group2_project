import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import Appcopy from './Appcopy';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    {/* This is coded for testing purpose of the introduction page */}
    {/* { Once we  merge the code in the Appcopy.js to App.jsthen for the introduction ques this can be reverted back to <APP />} */}
    {/* <Appcopy /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
