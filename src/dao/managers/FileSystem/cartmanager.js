/*import fs from 'fs';

class CartManager {
constructor(filePath) {
    this.path = filePath;
    this.carts = [];
    this.nextId = 1;
}

async initialize() {
    try {
    const data = await fs.promises.readFile(this.path, { encoding: 'utf-8' });
    this.carts = JSON.parse(data);
    if (this.carts.length > 0) {
        this.nextId = Math.max(...this.carts.map((cart) => cart.id)) + 1;
    }
    } catch (error) {
    console.error('Error al leer el archivo de carritos:', error);
    }
}

async saveToFile() {
    try {
    const data = JSON.stringify(this.carts, null, 2);
    await fs.promises.writeFile(this.path, data);
    } catch (error) {
    console.error('Error al guardar en el archivo de carritos:', error);
    }
}

createCart() {
    const newCart = {
    id: this.nextId++,
    products: [],
    };
    this.carts.push(newCart);
    this.saveToFile();
    return newCart;
}

getCartById(cartId) {
    return this.carts.find((cart) => cart.id === cartId);
}

addProductToCart(cartId, productId, quantity = 1) {
    const cart = this.getCartById(cartId);
    if (!cart) {
    console.error('Carrito no encontrado');
    return null;
    }

    const existingProduct = cart.products.find((item) => item.product === productId);
    if (existingProduct) {
    existingProduct.quantity += quantity;
    } else {
    cart.products.push({ product: productId, quantity });
    }

    this.saveToFile();
    return cart;
}
}

const cartManager = new CartManager('./carritos.json');
export default cartManager;*/