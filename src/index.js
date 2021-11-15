import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './index.css';

import App from './App';
import Login from './pages/Login';

const Root = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}></Route>
                <Route path="/login" element={<Login />}/>
            </Routes>
        </BrowserRouter>
    )
};

ReactDOM.render(<Root />, document.getElementById('root'));
