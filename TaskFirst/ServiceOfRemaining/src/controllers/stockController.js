const stockServices = require('../services/stockService');
const { Op } = require('sequelize');

class StockControllers {
  async createStock(req, res) {
    try {
      const { productId, shopId, shelfQuantity, orderQuantity } = req.body;

      const stock = await stockServices.createStock({ productId, shopId, shelfQuantity, orderQuantity });
      res.status(201).json(stock);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async increaseStock(req, res) {
    try {
      const { id } = req.params;
      const { quantity } = req.body;

      const stock = await stockServices.adjustStock(id, quantity);
      res.status(200).json(stock);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async decreaseStock(req, res) {
    try {
      const { id } = req.params;
      const { quantity } = req.body;

      const stock = await stockServices.adjustStock(id, -quantity);
      res.status(200).json(stock);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getStocks(req, res) {
    try {
      const { shopId, plu, shelfQuantityFrom, shelfQuantityTo, orderQuantityFrom, orderQuantityTo } = req.query;
      const filters = {};

      if (shopId) {
        filters.shopId = shopId;
      }
      if (plu) {
        filters['$product.plu$'] = plu;
      }

      if (shelfQuantityFrom || shelfQuantityTo) {
        filters.shelfQuantity = { [Op.between]: [shelfQuantityFrom || 0, shelfQuantityTo || Infinity] };
      }
      if (orderQuantityFrom || orderQuantityTo) {
        filters.orderQuantity = { [Op.between]: [orderQuantityFrom || 0, orderQuantityTo || Infinity] };
      }

      const stocks = await stockServices.getStocks(filters);

      if (!stocks.length) {
        return res.status(404).json({ error: 'Нет данных по конкретным фильтрам.' });
      }

      res.status(200).json(stocks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new StockControllers();