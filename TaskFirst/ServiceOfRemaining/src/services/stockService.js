const { Stock, Product } = require('../models/models');
const sendToHistoryService = require('../config/rabbitMQ');

class StockServices {
    async createStock(data) {
        const stock = await Stock.create(data);
        const product = await stock.getProduct();
        const message = {
            shopId: stock.shopId,
            plu: product.plu,
            action_date: new Date().toISOString(),
            action: 'Создание запасов',
            details: {
                quantity: stock.shelfQuantity,
                stockId: stock.id,
                description: 'Создан новый запас'
            }
        }
        await sendToHistoryService(message);
        return stock;
    }

    async adjustStock(id, quantity) {
        const stock = await Stock.findByPk(id);
        if (!stock) {
            throw new Error('Товар не найден');
        }
        stock.shelfQuantity += quantity;
        if (stock.shelfQuantity < 0) {
            throw new Error('Не достаточно запасов');
        }
        await stock.save();
        const product = await stock.getProduct();
        const message = {
            shopId: stock.shopId,
            plu: product.plu,
            action_date: new Date().toISOString(),
            action: 'Корректировка запасов',
            details: {
                quantity: quantity,
                newShelfQuantity: stock.shelfQuantity,
                stockId: stock.id,
                description: 'Количество запасов скорректировано'
            }
        };
        await sendToHistoryService(message);
        return stock;
    }

    async getStocks(filters) {
        return await Stock.findAll({
            where: filters,
            attributes: {
                exclude: ['productId', 'createdAt', 'updatedAt']
            },
            include: {
                model: Product,
                as: 'product',
                attributes: ['plu', 'name']
            },
        });
    }
}

module.exports = new StockServices()