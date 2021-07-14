const Sequelize = require('sequelize');
const db = require('../models/index');

module.exports.getAllCategories = async (req, res, next) => {
    try {
        const categories = await db.Categories.findAll();

        res.send(categories);
    } catch (err) {
        next(err);
    }
};