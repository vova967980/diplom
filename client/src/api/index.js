import axios from 'axios';
import React from "react";

const config = {
    baseURL: 'http://localhost:3001/',
    headers: {
        'Content-type': 'application/json',
    },
};
const axiosInstance = axios.create(config);

const getQuery = async (url) => {
    try {
        const response = await axiosInstance.get(url);
        return response;

    } catch (e) {
        throw e;
    }
};

const createOrder = async (url, data) => {
  try {
      const response = await axiosInstance.post(url, data);
      return response


  }  catch (e) {
      throw e;
  }
};

export const getProducts = async (url) => getQuery(url);
export const getCategories = async (url) => getQuery(url);
export const getFilters = async (url) => getQuery(url);
export const createNewOrder = async (url, data) => createOrder(url, data);

/*const authenticateUser = async ( url, data ) => {
    try {
        const response = await axiosInstance.post( url, data );
        const {data: {refresh, access}} = response;
        sessionStorage.setItem( ACCESS_TOKEN_KEY, access );
        localStorage.setItem( REFRESH_TOKEN_KEY, refresh );
        return response;
    } catch (e) {
        throw e;
    }
};

export const loginUser = async data => authenticateUser( '/auth/login/', data );*/
