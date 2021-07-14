const querystringConverter = require('sequelize-querystring-converter');
const sqs = require('sequelize-querystring');
const Sequelize = require('sequelize');
const db = require('../models/index');
const Op = Sequelize.Op;

module.exports.getAllProducts = async (req, res, next) => {
    try {
        let products;
        if(req.query.productName){
            products = await db.Products.findAll({
                where: {
                    productName: {
                        [Op.iLike]: '%'+req.query.productName+'%'
                    }
                },
                include: [{
                    model: db.Firms,
                    as: 'Firm',
                },
                    {
                        model: db.Categories,
                        as: 'Category',
                    },
                    {
                        model: db.Product_characteristics,
                        include: [{
                            model: db.Characteristics,
                            include: [
                                {
                                    model: db.Measures
                                }
                            ]
                        }]
                    }

                ],
                order: [
                    ['id','asc'],
                    [{model: db.Product_characteristics},{model: db.Characteristics},'id','asc']
                ]
            });
        }else{
            products = await db.Products.findAll({
                where: req.query,
                include: [{
                    model: db.Firms,
                    as: 'Firm',
                },
                    {
                        model: db.Categories,
                        as: 'Category',
                    },
                    {
                        model: db.Product_characteristics,
                        include: [{
                            model: db.Characteristics,
                            include: [
                                {
                                    model: db.Measures
                                }
                            ]
                        }]
                    }

                ],
                order: [
                    ['id','asc'],
                    [{model: db.Product_characteristics},{model: db.Characteristics},'id','asc']
                ]
            });
        }


        res.send(products);
    } catch (err) {
        next(err);
    }
};