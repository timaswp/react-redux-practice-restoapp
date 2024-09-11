import React from 'react';
import { MainPage, CartPage, ItemPage } from '../pages';
import AppHeader from '../app-header';
import { Routes, Route } from 'react-router-dom';

import Background from './food-bg.jpg';

const App = () => {
    return (
        <div style={{background: `url(${Background}) center center/cover no-repeat`}} className="app">
            <AppHeader/>
            <Routes>
                <Route path='/' Component={MainPage}/>
                <Route path='/cart' Component={CartPage}/>
                <Route path='/:id' Component={ItemPage}/>
            </Routes>
        </div>
    )
}

export default (App);