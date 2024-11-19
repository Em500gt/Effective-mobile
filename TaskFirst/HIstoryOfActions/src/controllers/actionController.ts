import { Request, Response } from 'express';
import actionService from '../services/actionServices';
import { HistoryQueryParams } from '../interface/historyQuery.interface';

class ActionController {
    async history(req: Request, res: Response): Promise<void> {
        try {
            const queryParams = req.query as HistoryQueryParams;
            const data = await actionService.getHistory(queryParams);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: 'Ошибка сервера' });
        }
    }
}

export default new ActionController();