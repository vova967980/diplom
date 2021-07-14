import React from "react";
import styles from './CatalogButtonStyles.module.sass'
import widthContext from "../HoCs/widthContext";
import Catalog from "../Catalog/Catalog";

class CatalogButton extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {


        const {catalogButtonIsOpen, setCatalogButtonIsOpen} = this.props;

        const changeState = () => {
            if(!catalogButtonIsOpen){
                setCatalogButtonIsOpen(true);
            }else{
                setCatalogButtonIsOpen(false);
            }
        };

        return (
            <div className={styles.buttonContainer} onClick={changeState}>
                <span className={styles.text}>Каталог товаров</span>
                <div className={styles.button} >
                    {
                        catalogButtonIsOpen ?
                            <>
                                <span className={styles.topSpan}></span>
                                <span className={styles.bottomSpan}></span>
                            </>
                            :
                            <>
                                <span></span>
                                <span></span>
                                <span></span>
                            </>
                    }

                </div>

            </div>
        );
    }
}

export default widthContext(CatalogButton);
