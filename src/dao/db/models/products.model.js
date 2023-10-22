import { Schema, model } from 'mongoose';

const productsSchema = new Schema({
title: {
    type: String,
    required: true,
},
description: String,
code: {
    type: String,
    required: true,
    unique: true,
},
price: {
    type: Number,
    required: true,
},
status: String,
stock: {
    type: Number,
    default: 1,
},
category: String,
thumbnail: String,
});

export const Product = model('Product', productsSchema);


