/*import fs from "fs";

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        this.products = [];
        this.nextpid = 1;
    }

    async initialize() {
        try {
            const data = await fs.promises.readFile(this.path, { encoding: "utf-8" });
            this.products = JSON.parse(data);
            if (this.products.length > 0) {
                this.nextpid = Math.max(...this.products.map((product) => product.pid)) + 1;
            }
        } catch (error) {
            console.error("Error al leer el archivo de productos:", error);
        }
    }

    async saveToFile() {
        try {
            const data = JSON.stringify(this.products, null, 2);
            await fs.promises.writeFile(this.path, data);
        } catch (error) {
            console.error("Error al guardar en el archivo de productos:", error);
        }
    }

    addProduct(product) {
        console.log("Agregando un nuevo producto:", product);
        console.log("title:", product.title);
        console.log("description:", product.description);
        console.log("code:", product.code);
        console.log("price:", product.price);
        console.log("status:", product.status);
        console.log("stock:", product.stock);
        console.log("category:", product.category);
        console.log("thumbnail:", product.thumbnail);
        if (
            !product.title ||
            !product.description ||
            !product.code ||
            !product.price ||
            !product.status ||
            !product.stock ||
            !product.category ||
            !product.thumbnail
        ) {
            console.error("Todos los campos son obligatorios");
            return;
        }

        if (
            this.products.some(
                (existingProduct) => existingProduct.code === product.code
            )
        ) {
            console.error("Ya existe un producto con el mismo código");
            return;
        }

        product.pid = this.nextpid++;
        this.products.push(product);
        this.saveToFile();
    }

    getProducts(limit) {
        return this.products;
    }

    getProductBypid(pid) {
        const product = this.products.find((p) => p.pid === pid);
        if (!product) {
            console.error("Producto no encontrado");
            return null;
        }
        return product;
    }

    updateProduct(pid, updatedProduct) {
        const index = this.products.findIndex((p) => p.pid === pid);
        if (index === -1) {
            console.error("Producto no encontrado");
            return;
        }
        updatedProduct.pid = pid;
        this.products[index] = updatedProduct;
        this.saveToFile();
    }

    deleteProduct(pid) {
        const index = this.products.findIndex((p) => p.pid === pid);
        if (index === -1) {
            console.error("Producto no encontrado");
            return;
        }

        this.products.splice(index, 1);
        this.saveToFile();
    }
}

const productManager = new ProductManager("./productos.json");
export default productManager;*/