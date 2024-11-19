const { body, query, validationResult, param } = require('express-validator');

class Validator {
    static createProduct() {
        return [
            body('plu')
                .notEmpty().withMessage('plu не определен')
                .isString().withMessage('plu должен быть string типа'),
            body('name')
                .notEmpty().withMessage('name не определен')
                .isString().withMessage('name должен быть string типа'),
        ];
    }

    static createStock() {
        return [
            body('productId')
                .notEmpty().withMessage('productId не определен')
                .isInt().withMessage('productId должен быть integer типа'),
            body('shopId')
                .notEmpty().withMessage('shopId не определен')
                .isString().withMessage('shopId должен быть string типа'),
            body('shelfQuantity')
                .notEmpty().withMessage('shelfQuantity не определен')
                .isInt({ min: 0 }).withMessage('shelfQuantity должен быть положительный'),
            body('orderQuantity')
                .notEmpty().withMessage('orderQuantity не определен')
                .isInt({ min: 0 }).withMessage('orderQuantity должен быть положительный'),
        ];
    }

    static updateStockQuantity() {
        return [
            param('id')
                .notEmpty().withMessage('id не определен')
                .isInt().withMessage('id должен быть integer типа'),
            body('quantity')
                .notEmpty().withMessage('quantity не определен')
                .isInt().withMessage('quantity должен быть integer типа'),
        ];
    }

    static filterStocks() {
        return [
            query('plu')
                .optional().isLength({ min: 1 })
                .isString().withMessage('plu должен быть string типа'),
            query('name')
                .optional().isLength({ min: 1 })
                .isString().withMessage('name должен быть string типа'),
            query('shopid')
                .optional().isLength({ min: 1 })
                .isInt().withMessage('Shop IDдолжен быть integer типа'),
            query('shelfQuantityFrom')
                .optional()
                .isInt({ min: 0 }).withMessage('Значение должно быть не отприцательное'),
            query('shelfQuantityTo')
                .optional()
                .isInt({ min: 0 }).withMessage('Значение должно быть не отприцательное'),
            query('orderQuantityFrom')
                .optional()
                .isInt({ min: 0 }).withMessage('Значение должно быть не отприцательное'),
            query('orderQuantityTo')
                .optional()
                .isInt({ min: 0 }).withMessage('Значение должно быть не отприцательное'),
        ];
    }

    static handleValidationErrors(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
}

module.exports = Validator;