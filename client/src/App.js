import './App.css';
import React, {Component, lazy, Suspense, useEffect, useState} from 'react';
import {Switch, Route, HashRouter} from 'react-router-dom';
import AppContext from './store';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";

const fallbackElem = null;
const HomePage = lazy(() => import( './pages/HomePage/HomePage.js' ));

function App() {
    const [catalogButtonIsOpen, setCatalogButtonIsOpen] = useState(null);
    const [basket, setBasket] = useState(null);
    const [basketIsOpen, setBasketIsOpen] = useState(null);
    const [parameters, setParameters] = useState(null);
    const [sumOrder, setSumOrder] = useState(null);
    const [findString, setFindString] = useState('');
    const contextValue = {
        catalogButtonIsOpen, setCatalogButtonIsOpen,
        basket, setBasket,
        basketIsOpen, setBasketIsOpen,
        parameters, setParameters,
        findString, setFindString,
        sumOrder, setSumOrder,
    };

    useEffect(() => {
        if (localStorage.getItem('basket')) {
            setBasket(localStorage.getItem('basket'));
        } else {
            setBasket(JSON.stringify([]));
            localStorage.setItem('basket', JSON.stringify([]));
        }

    }, []);

    return (
        <AppContext.Provider value={contextValue}>
            <div className="appContainer">
                <HashRouter>
                    <Header/>
                    <Suspense fallback={fallbackElem}>
                        <Switch>
                            <Route exact path="/" component={HomePage}/>
                            <Route exact path="/checkout" component={CheckoutPage}/>
                        </Switch>
                    </Suspense>
                    <Footer/>
                </HashRouter>
            </div>
        </AppContext.Provider>
    );
}

export default App;
