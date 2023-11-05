import express from 'express';
import mongoose from 'mongoose';
import productsRouter from './router/products.router.js';
import cartsRouter from './router/carts.router.js';
import { engine } from 'express-handlebars';
import router from './router/views.router.js';
import { __dirname } from './utils.js';
import { Server } from 'socket.io';
import ProductManager from './dao/managers/MongoDb/productManager.js';
import cartmanager from './dao/managers/MongoDb/cartmanager.js';
import dbConnection from './dao/db/configDB.js';
import cookieParser from 'cookie-parser';
import viewsRouter from './router/views.router.js';
import session from 'express-session';
import FileStore from 'session-file-store';
import MongoStore from 'connect-mongo';
import usersRouter from './router/users.router.js';

const app = express();

const URI =
"mongodb+srv://leonardoisraelcortez:xOvbuIBDknKVq0Ge@micluster.vjzdtbr.mongodb.net/ecommerce?retryWrites=true&w=majority";

app.use(
    session({
        secret: "secreto",
        cookie: {
            maxAge: 60 * 60 * 1000,
        },
        store: new MongoStore({
            mongoUrl: URI,
        }),
    })
);

(async () => {
try {
    await dbConnection;
    const PORT = 8080;
    app.listen(PORT, () => {
    console.log(`Escuchando al puerto ${PORT}`);
    });
} catch (error) {
    console.error('Error de conexión a la base de datos:', error);
}
})();

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
console.log('Conexión exitosa a MongoDB');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.engine('handlebars', engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use('/', router);

app.use("/api/users", usersRouter);
app.use('/', viewsRouter)


app.get('/products', async (req, res) => {
try {
    const products = await ProductManager.getAll();
    res.render('products', { products });
} catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
}
});

app.get('/carts/:cid', async (req, res) => {
try {
    const cartId = req.params.cid;
    const cart = await cartmanager.getById(cartId);

    if (!cart) {
    res.status(404).json({ error: 'Carrito no encontrado' });
    return;
    }

    res.render('cart', { cart });
} catch (error) {
    res.status(500).json({ error: 'Error al obtener el carrito' });
}
});

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.use(passport.initialize());
app.use(passport.session());

const PORT = 3000;

const httpServer = app.listen(PORT, () => {
console.log(`Escuchando al puerto ${PORT}`);
});

const socketServer = new Server(httpServer);

const realtimeProductsNamespace = socketServer.of('/realtimeproducts');

realtimeProductsNamespace.on('connection', async (socket) => {
console.log('Cliente de real conectado');

try {
    const products = await ProductManager.getAll();
    socket.emit('updateProducts', products);
} catch (error) {
    console.error('Error al obtener productos:', error);
}

socket.on('createProduct', async (newProduct) => {
    try {
    await ProductManager.addProduct(newProduct);
    const updatedProducts = await ProductManager.getAll();
    realtimeProductsNamespace.emit('updateProducts', updatedProducts);
    } catch (error) {
    console.error('Error al crear un producto:', error);
    }
});

socket.on('deleteProduct', async (productId) => {
    try {
    await ProductManager.deleteById(productId);
    const updatedProducts = await ProductManager.getAll();
    realtimeProductsNamespace.emit('updateProducts', updatedProducts);
    } catch (error) {
    console.error('Error al eliminar un producto:', error);
    }
});

socket.on('disconnect', () => {
    console.log('Cliente de real desconectado');
});
});

//const fileStore = FileStore(session);
//app.use(session({
//    secret: "secreto",
//    cookie: {
//        maxAge: 60 + 60 + 1000,
//    },
//    store: new fileStore(
//        {
//            path: __dirname + '/sessions',
//        }
//    ),
//}));

