import React, {Component} from 'react';
import styles from './FilterStyle.module.sass'
import {mdiFilter, mdiArrowRight} from '@mdi/js';
import Icon from "@mdi/react";
import Slider from '@material-ui/core/Slider';
import {getFilters, getProducts} from "../../api";
import classNames from 'classnames';

class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            next: `/filters/?categoryId=${this.props.categoryIdInDb}`,
            params: null,
            checkBoxItems: [],
            copyNew: this.props.productsCopy,
            filterIsOpen: true
        };
    }


    loadFilters = () => {
        getFilters(this.state.next).then(value => {
            for (let firm of value.data.rangeFirms) {
                this.setState({
                    checkBoxItems: [
                        ...this.state.checkBoxItems,
                        {
                            id: firm.id,
                            firmName: firm.firmName,
                            isChecked: false
                        }
                    ]
                });
            }
            return this.setState({
                params: {...value.data,},
                marksStatic: {...value.data},
            })
        });
    };

    changeFilterIsOpen = () => {
        this.setState({
            filterIsOpen: !this.state.filterIsOpen
        })
    };


    componentDidMount() {
        this.loadFilters();
    }

    render() {

        const loadFilteredProductsCost = (event, value) => {
            this.props.newProductsFunc(this.props.productsCopy);
            let newProducts = this.props.allProducts;
            let copy = this.state.copyNew;
            let checkBoxes = this.state.checkBoxItems;
            if (value) {
                for (let checkB of checkBoxes) {
                    if (checkB.id === value) {
                        checkB.isChecked = event.target.checked;
                    }
                }
                this.setState({
                    ...this.state,
                    checkBoxItems: checkBoxes
                });
            }
            let isOneOfChecked = false;
            for (let checkBoxItem of checkBoxes) {
                if (checkBoxItem.isChecked === true) {
                    isOneOfChecked = true;
                    break;
                }
            }
            if (isOneOfChecked) {
                newProducts = copy.filter(product => {
                    let tmp = true;
                    for (let item of checkBoxes) {
                        if (item.id === product.Firm.id) {
                            tmp = tmp && item.isChecked;
                        }
                    }
                    return tmp;
                });
            } else {
                newProducts = copy;
            }

            newProducts = newProducts.filter(product => {
                return product.cost >= this.state.params.rangeCost[0].minCost && product.cost <= this.state.params.rangeCost[0].maxCost;
            });

            newProducts = newProducts.filter(product => {
                let tmp = true;
                for (let product_characteristic of product.Product_characteristics) {
                    for (let item of this.state.params.rangeValues) {
                        if (item.Characteristic.characteristicName === product_characteristic.Characteristic.characteristicName) {
                            tmp = tmp && product_characteristic.characteristicValue >= item.minCharacteristicValue && product_characteristic.characteristicValue <= item.maxCharacteristicValue;
                        }
                    }
                }
                return tmp;
            });
            this.props.newProductsFunc(newProducts);
        };


        const handleChange = (event, newValue) => {
            this.setState({
                params: {
                    ...this.state.params,
                    rangeCost: [
                        {
                            minCost: newValue[0],
                            maxCost: newValue[1]
                        }
                    ],

                }
            });
        };
        const handleChangeValue = (event, newValue, index, name) => {
            let rangeValues = this.state.params.rangeValues;
            rangeValues[index] = {
                Characteristic: {
                    characteristicName: name
                },
                minCharacteristicValue: newValue[0],
                maxCharacteristicValue: newValue[1]
            };
            this.setState({
                params: {
                    ...this.state.params,
                    rangeValues: [
                        ...rangeValues
                    ]
                },
            });

        };

        return (
            <>
                {


            this.state.filterIsOpen &&

            <div className={styles.filterContainer}>
                <div className={styles.arrowRightContainer} onClick={this.changeFilterIsOpen}>
                    <Icon path={mdiArrowRight} size={2}/></div>
                <div className={styles.flexRow}>
                    <Icon path={mdiFilter}
                          size={1.5}/>
                    <span>Фильтры</span>
                </div>
                {
                    this.state.params !== null && (
                        <>
                            <div className={styles.itemContainer}>
                                <span>Цена:</span>
                                <Slider
                                    value={[this.state.params.rangeCost[0].minCost, this.state.params.rangeCost[0].maxCost]}
                                    onChange={handleChange}
                                    onChangeCommitted={() => loadFilteredProductsCost()}
                                    valueLabelDisplay="auto"
                                    aria-labelledby="range-slider"
                                    min={this.state.marksStatic.rangeCost[0].minCost}
                                    max={this.state.marksStatic.rangeCost[0].maxCost}
                                    marks={
                                        [
                                            {
                                                value: this.state.marksStatic.rangeCost[0].minCost,
                                                label: this.state.marksStatic.rangeCost[0].minCost + 'грн'
                                            },
                                            {
                                                value: this.state.marksStatic.rangeCost[0].maxCost,
                                                label: this.state.marksStatic.rangeCost[0].maxCost + 'грн'
                                            }
                                        ]
                                    }
                                />
                            </div>
                            {
                                this.state.params.rangeValues.map((item, index) => (
                                    <div key={index} className={styles.itemContainer}>
                                        <span>{item.Characteristic.characteristicName}:</span>
                                        <Slider
                                            value={[item.minCharacteristicValue, item.maxCharacteristicValue]}
                                            onChange={(event, newValues) => handleChangeValue(event, newValues, index, item.Characteristic.characteristicName)}
                                            onChangeCommitted={() => loadFilteredProductsCost()}
                                            valueLabelDisplay="auto"
                                            aria-labelledby="range-slider"
                                            min={this.state.marksStatic.rangeValues[index].minCharacteristicValue}
                                            max={this.state.marksStatic.rangeValues[index].maxCharacteristicValue}
                                            marks={
                                                [
                                                    {
                                                        value: this.state.marksStatic.rangeValues[index].minCharacteristicValue,
                                                        label: this.state.marksStatic.rangeValues[index].minCharacteristicValue + 'грн'
                                                    },
                                                    {
                                                        value: this.state.marksStatic.rangeValues[index].maxCharacteristicValue,
                                                        label: this.state.marksStatic.rangeValues[index].maxCharacteristicValue + 'грн'
                                                    }
                                                ]
                                            }
                                        />
                                    </div>
                                ))
                            }
                        </>
                    )
                }
                <div className={classNames(styles.itemContainer, styles.itemContainerList)}>
                    <span>Бренд: </span>
                    {
                        this.state.params !== null && (this.state.params.rangeFirms.map((item, index) => (
                                <label key={item.id}><input id={item.id}
                                                            onChange={(event, value) => loadFilteredProductsCost(event, item.id)}
                                                            type="checkbox"/>{item.firmName}
                                </label>
                            ))
                        )
                    }
                </div>


            </div>
                }
                {
                    !this.state.filterIsOpen &&
                    <div className={styles.openFilter} onClick={this.changeFilterIsOpen}>
                        <Icon path={mdiFilter}
                              size={1}/>
                        <span>Фильтры</span>
                    </div>
                }
            </>
        );
    }
}

export default Filter;