const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const db = require('../../models/index');


module.exports.orderCreation = async (data) => {
    const newOrder = await db.Orders.create(data);

    if (!newOrder) {
        throw new ServerError('server error on order creation');
    } else {
        return newOrder.get({plain: true});
    }
};

module.exports.orderProductsCreation = async (data) => {
    const orderProducts = await db.Order_products.bulkCreate(data);

    if (!orderProducts) {
        throw new ServerError('server error on order creation');
    } else {
        return orderProducts;
    }
};