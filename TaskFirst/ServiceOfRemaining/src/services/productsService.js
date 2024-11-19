const { Product } = require('../models/models');

class ProductsServices {
    async createProduct(plu, name) {
        return await Product.create({ plu, name });
    }

    async getProducts(filters) {
        return await Product.findAll({ where: filters });
    }
}

module.exports = new ProductsServices()