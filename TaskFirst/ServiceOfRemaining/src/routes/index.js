const router = require('express').Router();
const productsRouter = require('./productsRouter');
const stockRouter = require('./stockRouter');

router.use('/products', productsRouter);
router.use('/stocks', stockRouter);

module.exports = router;