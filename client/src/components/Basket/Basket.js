import React from 'react';
import withContext from "../HoCs/widthContext";
import styles from "./BasketStyle.module.sass"
import Icon from '@mdi/react'
import {mdiShopping} from '@mdi/js';
import {Component} from "react";

class Basket extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {basket, setBasket, basketIsOpen, setBasketIsOpen} = this.props;
        const lengthBasket = () => {
            return JSON.parse(basket).length;
        };
        const changeBasketIsOpen = () => {
                setBasketIsOpen(!basketIsOpen);
        };

        return (
            <>
                <div className={styles.basketContainer} onClick={changeBasketIsOpen}>
                    <Icon className={styles.icon} path={mdiShopping} size={3}/>
                    {
                        JSON.parse(basket) !== null && JSON.parse(basket).length !== 0 &&
                        <div className={styles.kolItems}>{lengthBasket()}</div>
                    }
                </div>
            </>
        )
    }
}

export default withContext(Basket)