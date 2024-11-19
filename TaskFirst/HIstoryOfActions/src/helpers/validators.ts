import { query, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

class Validator {
    static filterStocks() {
        return [
            query('shopId')
                .optional().isLength({ min: 1 })
                .isString().withMessage('shopId должен быть string типа'),
            query('plu')
                .optional().isLength({ min: 1 })
                .isString().withMessage('plu должен быть string типа'),
            query('action')
                .optional().isLength({ min: 1 })
                .isString().withMessage('action должен быть string типа'),
            query('dateFrom')
                .optional().isLength({ min: 1 })
                .isString().withMessage('dateFrom должен быть string типа'),
            query('dateTo')
                .optional().isLength({ min: 1 })
                .isString().withMessage('dateTo должен быть string типа'),
            query('page')
                .optional()
                .isInt({ min: 0 }).withMessage('page должно быть не отрицательное'),
            query('limit')
                .optional()
                .isInt({ min: 0 }).withMessage('limit должно быть не отрицательное')
        ];
    }

    static handleValidationErrors(req: Request, res: Response, next: NextFunction): void {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        next();
    }
}

export default Validator;
