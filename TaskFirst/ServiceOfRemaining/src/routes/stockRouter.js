const router = require('express').Router();
const stockControllers = require('../controllers/stockController');
const Validator = require('../helpers/validators');

router.route('/')
    .get(Validator.filterStocks(), Validator.handleValidationErrors, stockControllers.getStocks)
    .post(Validator.createStock(), Validator.handleValidationErrors, stockControllers.createStock);

router.patch('/:id/decrease', Validator.updateStockQuantity(), Validator.handleValidationErrors, stockControllers.decreaseStock);
router.patch('/:id/increase', Validator.updateStockQuantity(), Validator.handleValidationErrors, stockControllers.increaseStock);

module.exports = router;