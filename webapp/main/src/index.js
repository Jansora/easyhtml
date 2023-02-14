import React from 'react';

// import './components/styled/semantic-ui-css/semantic.css'
import App from './App';
import './index.css';
import {createRoot} from "react-dom/client";

createRoot(document.querySelector('#root')).render(<App/>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
