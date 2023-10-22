import BasicManager from './basicManager.js';
import { Product } from '../../db/models/products.model.js';

class ProductManager extends BasicManager {
    constructor() {
        super(Product);
    }

    async getProducts(limit, skip, filter, sortOptions) {
        try {
            const products = await this.Model.find(filter)
                .sort(sortOptions)
                .skip(skip)
                .limit(limit);

            return products;
        } catch (error) {
            throw error;
        }
    }

    async addProduct(product) {
        try {
            if (!product.title || !product.code || !product.price) {
                throw new Error('El título, el código y el precio son campos obligatorios.');
            }

            const existingProduct = await this.Model.findOne({ code: product.code });
            if (existingProduct) {
                throw new Error('Ya existe un producto con el mismo código.');
            }

            return this.create(product);
        } catch (error) {
            throw error;
        }
    }
}

export default new ProductManager();


