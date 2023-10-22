import { Router } from "express";
import ProductManager from "../dao/managers/MongoDb/productManager.js";
import { Product } from '../dao/db/models/products.model.js';

const productsRouter = Router();

productsRouter.get('/', async (req, res) => {
    try {
        const { limit = 10, page = 1, sort, query, category, availability } = req.query;

        const filter = {};

        if (query) {
            filter.campo = 10;
        }

        if (category) {
            filter.categoria = category;
        }
        if (availability) {
            filter.disponibilidad = availability === 'disponible';
        }

        const skip = (page - 1) * limit;
        const sortOptions = {};

        if (sort) {
            sortOptions.precio = sort === 'asc' ? 1 : -1;
        }

        const products = await ProductManager.getProducts(limit, skip, filter, sortOptions);
        const totalProducts = await Product.countDocuments(filter);

        const totalPages = Math.ceil(totalProducts / limit);
        const hasPrevPage = page > 1;
        const hasNextPage = page < totalPages;

        const prevLink = hasPrevPage ? `/productos?limit=${limit}&page=${page - 1}` : null;
        const nextLink = hasNextPage ? `/productos?limit=${limit}&page=${page + 1}` : null;

        const response = {
            status: 'success',
            payload: products,
            totalPages,
            prevPage: hasPrevPage ? page - 1 : null,
            nextPage: hasNextPage ? page + 1 : null,
            page,
            hasPrevPage,
            hasNextPage,
            prevLink,
            nextLink,
        };

        res.json(response);
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

productsRouter.get('/:pid', async (req, res) => {
try {
    const productpid = req.params.pid;
    const product = await ProductManager.getProductBypid(productpid);
    if (product) {
    res.json(product);
    } else {
    res.status(404).json({ error: 'Producto no encontrado' });
    }
} catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' });
}
});

productsRouter.post('/', async (req, res) => {
try {
    const newProduct = req.body;
    await ProductManager.addProduct(newProduct);
    res.status(201).json({ message: 'Producto agregado con éxito' });
} catch (error) {
    console.error("Error al agregar el producto:", error);
    res.status(500).json({ error: 'Error al agregar el producto' });
}
});

productsRouter.put('/:pid', async (req, res) => {
try {
    const productpid = req.params.pid;
    const updatedProduct = req.body;
    await ProductManager.updateProduct(productpid, updatedProduct);
    res.status(200).json({ message: 'Producto actualizado con éxito' });
} catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto' });
}
});

productsRouter.delete('/:pid', async (req, res) => {
try {
    const productpid = req.params.pid;
    await ProductManager.deleteProduct(productpid);
    res.status(204).send();
} catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
}
});

export default productsRouter;
