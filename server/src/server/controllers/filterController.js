const Sequelize = require('sequelize');
const db = require('../models/index');

const Op = Sequelize.Op;

module.exports.getAllFilterParams = async (req, res, next) => {
    try {
        console.log(req.query);
        let filterCost = await db.Products.findAll({
            where: req.query,
            attributes: [
                [Sequelize.fn('max', Sequelize.col('cost')), 'maxCost'],
                [Sequelize.fn('min', Sequelize.col('cost')), 'minCost'],
            ],
        });

        let productsByCategory = await db.Products.findAll({
           where: req.query,
            attributes: ['id']
        }).then(value => {

            let mass = [];
            for(let product of value){
                mass.push(product.dataValues.id)
            }
            return mass
        });

        let filterValues = await db.Product_characteristics.findAll({
            where: {
              productId: {
                  [Op.in]: [...productsByCategory]
              }
            },
            attributes: [
                [Sequelize.fn('max', Sequelize.col('characteristicValue')), 'maxCharacteristicValue'],
                [Sequelize.fn('min', Sequelize.col('characteristicValue')), 'minCharacteristicValue'],
            ],
            include: [{
                model: db.Characteristics,
                attributes: ['characteristicName']
            }
            ],

            group: [
                `Characteristic.id`,
            ]

        });

        let filterFirms = await db.Firms.findAll({
            include: [
                {
                    model: db.Products,
                    where: {
                        id: {
                            [Op.in]: [...productsByCategory]
                        }
                    }
                }
            ]
        });

        res.send({rangeCost: [...filterCost], rangeValues: filterValues, rangeFirms: [...filterFirms]});
    } catch (err) {
        next(err);
    }
};