import { Router } from 'express';
import actionController from '../controllers/actionController';
const router = Router();
import Validator from '../helpers/validators';

router.get('/history', Validator.filterStocks(), Validator.handleValidationErrors, actionController.history);

export default router;