import React from 'react';
import styles from './HStyle.module.sass'
import CatalogButton from "../CatalogButton/CatalogButton";
import FindString from "../FindString/FindString";
import Basket from "../Basket/Basket";
import withContext from "../HoCs/widthContext";
import BasketMore from "../BasketMore/BasketMore";

class Header extends React.Component{
    constructor(props) {
        super(props);
    }
render () {
    const {catalogButtonIsOpen, basketIsOpen} = this.props;

        return (
            <div className={styles.headerContainer}>
                <div onClick={() => {
                    window.location = '/'
                }} className={styles.label}>ButTechno</div>
                <div className={styles.subBottomContainer}>
                    <CatalogButton/>
                    <FindString/>
                    <Basket/>
                    {
                        basketIsOpen && <BasketMore/>
                    }
                </div>
            </div>
        );
    }
}
export default withContext(Header);