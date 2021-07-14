import React from 'react';
import styles from './FindStringStyle.module.sass'
import withContext from "../HoCs/widthContext";

function FindString(props) {


    const {findString, setFindString} = props;

    const changeContextFindString = (event) => {
                setFindString(event.target.value);
    };

    return (
        <>
            <input className={styles.findString} onChange={changeContextFindString} type="text" placeholder="Поиск товаров"/>
        </>
    );
}

export default withContext(FindString);