import { Router } from 'express';
import { Product } from '../dao/db/models/products.model.js';
import Carts from '../dao/db/models/carts.model.js'

const viewsRouter = Router();

viewsRouter.get('/', (req, res) => {
    res.render('login');
})

viewsRouter.get("/signup", (req, res) => {
    res.render("signup");
});

viewsRouter.get("/home", (req, res) => {
    console.log("req", req);
    const { email, first_name } = req.session;
    res.render("home", { email, first_name });
});

viewsRouter.get('/products', async (req, res) => {
try {
    const products = await Product.find();
    res.render('products', { products });
} catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
}
});

viewsRouter.get('/carts/:cid', async (req, res) => {
try {
    const cartId = req.params.cid;
    const cart = await Carts.findById(cartId);

    if (!cart) {
    res.status(404).json({ error: 'Carrito no encontrado' });
    return;
    }

    res.render('cart', { cart });
} catch (error) {
    res.status(500).json({ error: 'Error al obtener el carrito' });
}
});

viewsRouter.get("/error", (req, res) => {
    res.render("error");
});

export default viewsRouter;

