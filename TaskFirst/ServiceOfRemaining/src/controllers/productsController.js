const productsServices = require('../services/productsService');

class ProductsControllers {
  async createProduct(req, res) {
    try {
      const { plu, name } = req.body;
      const product = await productsServices.createProduct(plu, name);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getProducts(req, res) {
    try {
      const { name, plu } = req.query;
      const filters = {};
      if (name) {
        filters.name = name;
      }
      if (plu) {
        filters.plu = plu;
      }
      const products = await productsServices.getProducts(filters);
      if (!products.length) {
        return res.status(404).json({ error: 'Нет данных по конкретным фильтрам.' });
      }
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ProductsControllers();