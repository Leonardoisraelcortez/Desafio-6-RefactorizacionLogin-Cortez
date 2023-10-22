import mongoose from 'mongoose';
import BasicManager from './basicManager.js';
import CartsModel from '../../db/models/carts.model.js';

class CartsManager extends BasicManager {
constructor(model) {
    super(model);
}

async addProductToCart(cartId, productId, quantity) {
    try {
    const cart = await this.getById(cartId);
    if (!cart) {
        throw new Error('Carrito no encontrado');
    }

    const product = await Product.findById(productId);
    if (!product) {
        throw new Error('Producto no encontrado');
    }

    cart.products.push({ product: productId, quantity });
    await cart.save();
    return cart;
    } catch (error) {
    throw error;
    }
}

async updateProductQuantityInCart(cartId, productId, newQuantity) {
    try {
    const cart = await this.getById(cartId);
    if (!cart) {
        throw new Error('Carrito no encontrado');
    }

    const productToUpdate = cart.products.find(product => product.product.toString() === productId);
    if (!productToUpdate) {
        throw new Error('Producto no encontrado en el carrito');
    }

    // Actualiza la cantidad del producto
    productToUpdate.quantity = newQuantity;
    await cart.save();
    return cart;
    } catch (error) {
    throw error;
    }
}

async removeProductFromCart(cartId, productId) {
    try {
    const cart = await this.getById(cartId);
    if (!cart) {
        throw new Error('Carrito no encontrado');
    }

    cart.products = cart.products.filter(product => product.product.toString() !== productId);
    await cart.save();
    return cart;
    } catch (error) {
    throw error;
    }
}
}

export default CartsManager;


