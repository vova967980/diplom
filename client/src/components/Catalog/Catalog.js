import React from 'react';
import styles from './CatalogStyles.module.sass'
import withContext from "../HoCs/widthContext";
import {getCategories} from "../../api";

class Catalog extends React.Component {
    constructor(props) {
        super(props);
    }



    render() {
        const {setCatalogButtonIsOpen} = this.props;
        const updateParams = (categoryId) => {
            this.props.updateProductsFunc({
                'categoryId': categoryId
            });
            setCatalogButtonIsOpen(false);

        };

        return (
            <ul className={styles.catalogContainer}>
                {
                    this.props.categories.map(category => (
                        <li key={category.id} onClick={() => updateParams(category.id)}>{category.categoryName}</li>
                    ))
                }
            </ul>
        );
    }
}

export default withContext(Catalog);