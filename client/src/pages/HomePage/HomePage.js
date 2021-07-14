import React from 'react';
import defStyles from '../defaultPageStyles.module.sass'
import styles from './HomePageStyles.module.sass'
import Product from "../../components/Product/Product";
import {getCategories, getProducts} from "../../api";
import {Component} from "react";
import withContext from "../../components/HoCs/widthContext";
import Catalog from "../../components/Catalog/Catalog";
import Filter from "../../components/Filter/Filter";

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            productsCopy: [],
            next: '/products/',
            isFetching: false,
            categories: [],
            categoriesUrl: '/categories/',
            categoryIdFilter: null,
            findString: '',
        };
    }

    loadProducts = (parameters) => {

        if (parameters) {

            let tmpNext = `products/?categoryId=${parameters.categoryId}`;
            this.props.setFindString('');
            this.setState({
                products: [],
                productsCopy: [],
                next: `products/?categoryId=${parameters.categoryId}`,
                categoryIdFilter: parameters.categoryId,
                findString: '',
            });

            this.setState({isFetching: true});
            getProducts(tmpNext).then(value => {

                return this.setState({
                        products: [...value.data],
                        productsCopy: [...value.data],
                        isFetching: false
                    },
                );
            }).catch((e) => this.setState({isFetching: false}));

        } else if(this.props.findString !== ''){
            let tmpNext = `products/?productName=${this.props.findString}`;
            this.setState({
                products: [],
                productsCopy: [],
                next: `products/?productName=${this.props.findString}`,
                categoryIdFilter: null
            });
            this.setState({isFetching: true});
            getProducts(tmpNext).then(value => {

                return this.setState({
                        products: [...value.data],
                        productsCopy: [...value.data],
                        isFetching: false
                    },
                );
            }).catch((e) => this.setState({isFetching: false}));


        }else {
            let tmpNext = '/products/';
            this.setState({
                next: '/products/',
                isFetching: true
            });
            getProducts(tmpNext).then(value => {
                console.log(value.data);
                return this.setState({
                        products: [...value.data],
                        isFetching: false
                    },
                );
            }).catch((e) => this.setState({isFetching: false}))
        }
    };
    newProducts = (products) => {
        this.setState({
            products: [
                ...products
            ]
        })
    };

    loadCategories = () => {
        getCategories(this.state.categoriesUrl).then(value => {
            return this.setState(
                {
                    categories: [...value.data]
                }
            )
        })
    };

    componentDidMount() {
        this.loadCategories();
        this.loadProducts();
    }


    render() {
        const {catalogButtonIsOpen, findString} = this.props;

        if(this.state.findString !== findString){

            this.setState({
               findString: findString
            });
            this.loadProducts();
        }

        return (
            <>
                <div className={defStyles.mainContainer}>
                    <div className={styles.productsContainer}>
                        {
                            this.state.isFetching ?
                                <div className={styles.loadingContainer}>
                                    <img src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" alt=""/>
                                </div>
                                :
                                this.state.products.length === 0 ?
                                    <div className={styles.loadingContainer}>Товаров не найдено</div>
                                    :
                                    this.state.products.map(product => (
                                        <Product product={product} key={product.id}/>
                                    ))
                        }
                    </div>
                    {
                        catalogButtonIsOpen &&
                        <Catalog categories={this.state.categories} updateProductsFunc={this.loadProducts}/>
                    }
                    {
                    this.state.categoryIdFilter !== null && this.state.productsCopy.length !== 0 && this.state.findString === '' &&
                    <Filter categoryIdInDb={this.state.categoryIdFilter}
                            firstProductInCategory={this.state.products[0]} newProductsFunc={this.newProducts}
                            allProducts={this.state.products} productsCopy={this.state.productsCopy}/>
                    }

                </div>
            </>
        );
    }
}

export default withContext(HomePage);