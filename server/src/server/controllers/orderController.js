const orderQueries = require("./queries/orderQueries");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require('../models/index');

module.exports.newOrder = async (req, res, next) => {
    try {
        const newOrder = await orderQueries.orderCreation(req.body);

/*        const products = await db.Products.findAll({
            where: {
                id: {
                    [Op.or]: [...req.body.productsId]
                }
            }
        });*/

        let data = [];
        req.body.productsId.forEach(p =>{
            data.push({'orderId': newOrder.id, 'productId': p})
        });
        console.log(data);
        const orderProducts = await orderQueries.orderProductsCreation(data);

        res.send(orderProducts);
    }catch (err) {
        next(err);
    }
};



