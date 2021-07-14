import React from 'react';
import Styles from './BasketMoreStyle.module.sass'
import withContext from "../HoCs/widthContext";
import { mdiClose } from '@mdi/js';
import Icon from "@mdi/react";
import {NavLink} from "react-router-dom";

function BasketMore(props) {

    const {basket, setBasket ,setBasketIsOpen, sumOrder, setSumOrder} = props;
    const deleteItemWithIdx = (index) => {
        let newMass =[];
        for (let i = 0; i < JSON.parse(basket).length; i++){
            if(i !== index){ newMass.push(JSON.parse(basket)[i]); }}
        setBasket(JSON.stringify(newMass));
        localStorage.setItem('basket', JSON.stringify(newMass));
    };
    const sumOreder = () => {
        let sum = 0;
        for (let item of JSON.parse(basket)){
            sum += item.cost;
        }
        setSumOrder(sum);
        return sum
    };

    return (
        <div className={Styles.mainContainer}>
            {JSON.parse(basket).map( (item, index) => (
                    <div className={Styles.basketItem} key={index}>
                        <span className={Styles.imageWrapper}><img src={item.productImageUrl} alt=""/></span>
                        <span className={Styles.productName}>{item.productName}</span>
                        <span className={Styles.tyr}>-</span>
                        <span className={Styles.tyr}>{item.cost} грн</span>
                        <Icon onClick={() => deleteItemWithIdx(index)} className={Styles.close} path={mdiClose} size={0.8}/>
                    </div>
                ))}
            {JSON.parse(basket).length === 0 ?
                    <div className={Styles.doOrderContainer}>Корзина пуста</div>
                    :
                    <div className={Styles.doOrderContainer}>
                        <span>Сумма заказа: {sumOreder()}грн</span>
                        <NavLink to='/checkout'><button onClick={()=>{setBasketIsOpen(false)}}>Оформить заказ</button></NavLink>
                    </div>}
        </div>
    );
}

export default withContext(BasketMore);