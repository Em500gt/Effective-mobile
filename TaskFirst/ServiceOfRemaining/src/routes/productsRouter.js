const router = require('express').Router();
const productsControllers = require('../controllers/productsController');
const Validator = require('../helpers/validators');

router.route('/')
    .get(Validator.filterStocks(), Validator.handleValidationErrors, productsControllers.getProducts)
    .post(Validator.createProduct(), Validator.handleValidationErrors, productsControllers.createProduct);

module.exports = router;