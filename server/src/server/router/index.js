const productsController = require( "../controllers/productsController");
const categoriesController = require( "../controllers/categoriesController");
const orderController = require("../controllers/orderController");
const filterController = require("../controllers/filterController");
const express = require('express');
const router = express.Router();

router.post(
    '/createOrder',
    (req,res,next) => {
        console.log(req.body);
        next();
    },
    orderController.newOrder
);

router.get(
    '/products',
    productsController.getAllProducts
);

router.get(
    '/categories',
    categoriesController.getAllCategories
);

router.get(
    '/filters',
    filterController.getAllFilterParams
);

module.exports = router;