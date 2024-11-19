import knex from 'knex';
import { HistoryQueryParams, HistoryQuery } from '../interface/historyQuery.interface';
import knexConfig from '../config/knexfile';

class ActionService {
    private db = knex(knexConfig);

    async getHistory(queryParams: HistoryQueryParams) {
        const {
            shopId,
            plu,
            action,
            dateFrom,
            dateTo,
            page = 1,
            limit = 10,
        } = queryParams;

        const offset = (Number(page) - 1) * Number(limit);

        const baseQuery = this.db('actions').modify((query) => {
            if (shopId) {
                query.where('shopId', shopId);
            }
            if (plu) {
                query.where('plu', plu);
            }
            if (action) {
                query.where('action', action);
            }
            if (dateFrom) {
                query.where('action_date', '>=', new Date(dateFrom));
            }
            if (dateTo) {
                query.where('action_date', '<=', new Date(dateTo));
            }
        });

        const results = await baseQuery
            .clone()
            .offset(offset)
            .limit(Number(limit))
            .select('*');

        const totalQuery = await baseQuery.clone().count('* as count').first();

        return {
            total: totalQuery?.count || 0,
            page: Number(page),
            limit: Number(limit),
            results,
        };
    }

    async saveHistory(data: HistoryQuery) {
        try {
            await this.db('actions').insert({
                shopId: data.shopId,
                plu: data.plu,
                action: data.action,
                action_date: data.action_date,
                details: JSON.stringify(data.details)
            }
            )
            console.log('Всё успешно сохранено');
        }
        catch (error) {
            console.error('Ошибка сохранения в БД:', error);
        }
    }
}

export default new ActionService();