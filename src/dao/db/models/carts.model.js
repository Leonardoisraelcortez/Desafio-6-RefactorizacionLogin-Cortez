import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
    product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
    },
    quantity: Number,
});

const cartsSchema = new mongoose.Schema({
    products: [cartItemSchema],
});

const Carts = mongoose.model('Carts', cartsSchema);

export default Carts;


