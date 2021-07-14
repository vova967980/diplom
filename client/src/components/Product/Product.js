import React from 'react';
import styles from './ProductStyle.module.sass'
import withContext from "../HoCs/widthContext";

function Product(props) {
    const {basket, setBasket} = props;
    const addToBasket = () => {
        setBasket(JSON.stringify([props.product,...JSON.parse(basket)]));
        localStorage.setItem('basket',JSON.stringify([props.product,...JSON.parse(basket)]));
    };
    return (
        <div className={styles.productContainer}>
            <div className={styles.imageWrapper}>
                <img src={props.product.productImageUrl} alt=""/>
            </div>
            <div className={styles.tovar}>
                <span className={styles.nameProduct}>{props.product.productName}</span>
                <span className={styles.cina}>Цена:</span>
                <span className={styles.cinaValue}>{props.product.cost} грн</span>
            </div>
            <div className={styles.characteristicsContainer}>
                <span className={styles.cina}>Характеристики:</span>
                {
                    props.product.Product_characteristics.map( productCharacteristic => (
                            <span key={productCharacteristic.id}>{productCharacteristic.Characteristic.characteristicName}: {productCharacteristic.characteristicValue} {productCharacteristic.Characteristic.Measure.measureName}</span>
                        )
                    )
                }
                <span>Бренд: {props.product.Firm.firmName}</span>
            </div>
             <button className={styles.toBasketBtn} onClick={addToBasket}>В корзину</button>
        </div>
    );
}
export default withContext(Product);