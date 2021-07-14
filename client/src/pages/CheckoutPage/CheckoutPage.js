import React from 'react';
import defStyles from "../defaultPageStyles.module.sass";
import style from './CheckoutPageSyles.module.sass'
import withContext from "../../components/HoCs/widthContext";
import Icon from "@mdi/react";
import {mdiClose} from "@mdi/js";
import {NavLink} from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {createNewOrder} from "../../api";

function CheckoutPage(props) {

    const {basket, setBasket, sumOrder} = props;

    if (basket){
        if(JSON.parse(basket).length <= 0){
            window.location = '/';
        }
    }

    return (
        <div className={defStyles.mainContainer}>

            <Formik
                initialValues={{ customerEmail: '',  customerName: '',customerSurname: '',customerPatronymic: '',customerCity: '',customerPhoneNumber: '',}}
                validate={values => {
                    const errors = {};

                    if(!values.customerName){
                        errors.customerName= 'Имя это обязательное поле!';
                    }
                    if(!values.customerSurname){
                        errors.customerSurname= 'Фамилия это обязательное поле';
                    }
                    if(!values.customerPatronymic){
                        errors.customerPatronymic= 'Отчество это обязательное поле!';
                    }
                    if(!values.customerCity){
                        errors.customerCity= 'Город доставки это обязательное поле!';
                    }
                    if(!values.customerPhoneNumber){
                        errors.customerPhoneNumber= 'Номер телефона это обязательное поле!';
                    }
                    if (!values.customerEmail) {
                        errors.customerEmail = 'Email это обязательное поле';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.customerEmail)
                    ) {
                        errors.customerEmail = 'Invalid email address';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true);
                    values.cost = sumOrder;
                    values.productsId = [];
                    JSON.parse(basket).forEach(item => {
                        values.productsId.push(item.id);
                    });

                   /* for(let i=0; i<JSON.parse(basket).length; i++ ){


                    }*/


                    createNewOrder('/createOrder/', values).then(value => {
                        window.alert("Заказ принят. Ожидайте звонка оператора!");
                        setBasket(JSON.stringify([]));
                        localStorage.setItem('basket', '[]');
                        //window.location = '/';
                    });

                    setSubmitting(false);
                }}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                      /* and other goodies */
                  }) => (
                    <form className={style.checkoutContainer} onSubmit={handleSubmit}>
                        <div className={style.headerOrderCreation}><span>Оформление заказа</span><NavLink to="/"><Icon className={style.close} path={mdiClose} size={1.2} /></NavLink></div>
                        <div className={style.products}>
                            <span><b>Товары:</b></span>
                            {
                                basket && JSON.parse(basket).map( (item, index) => (
                                    <span className={style.productName}  key={index}>{item.productName}</span>
                                ))
                            }
                            <span>Сумма заказа: {sumOrder}грн</span>
                        </div>
                        <input className={style.inputStyles}
                               type="text"
                               name="customerSurname"
                               placeholder='Фамилия'
                               onChange={handleChange}
                               onBlur={handleBlur}
                               value={values.customerSurname}
                        />
                        {errors.customerSurname && touched.customerSurname && errors.customerSurname}
                        <input className={style.inputStyles}
                               type="text"
                               name="customerName"
                               placeholder='Имя'
                               onChange={handleChange}
                               onBlur={handleBlur}
                               value={values.customerName}
                        />
                        {errors.customerName && touched.customerName && errors.customerName}
                        <input className={style.inputStyles}
                               type="text"
                               name="customerPatronymic"
                               placeholder='Отчество'
                               onChange={handleChange}
                               onBlur={handleBlur}
                               value={values.customerPatronymic}
                        />
                        {errors.customerPatronymic && touched.customerPatronymic && errors.customerPatronymic}
                        <input className={style.inputStyles}
                               type="text"
                               name="customerCity"
                               placeholder='Город доставки'
                               onChange={handleChange}
                               onBlur={handleBlur}
                               value={values.customerCity}
                        />
                        {errors.customerCity && touched.customerCity && errors.customerCity}
                        <input className={style.inputStyles}
                            type="email"
                            name="customerEmail"
                            placeholder='Email'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.customerEmail}
                        />
                        {errors.customerEmail && touched.customerEmail && errors.customerEmail}
                        <input className={style.inputStyles}
                               type="text"
                               name="customerPhoneNumber"
                               placeholder='Номер телефона'
                               onChange={handleChange}
                               onBlur={handleBlur}
                               value={values.customerPhoneNumber}
                        />
                        {errors.customerPhoneNumber && touched.customerPhoneNumber && errors.customerPhoneNumber}

                        <button className={style.checkoutButton} type="submit" disabled={isSubmitting}>
                            Оформить заказ!
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    );
}

export default withContext(CheckoutPage);