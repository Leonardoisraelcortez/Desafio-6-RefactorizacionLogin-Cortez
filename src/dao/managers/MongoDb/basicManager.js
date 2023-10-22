import mongoose from 'mongoose';

class BasicManager {
constructor(model) {
    this.Model = model;
}

async create(data) {
    try {
    const newItem = new this.Model(data);
    await newItem.save();
    return newItem;
    } catch (error) {
    console.error(`Error al crear un nuevo elemento: ${error}`);
    }
}

async getById(id) {
    try {
    return await this.Model.findById(id);
    } catch (error) {
    console.error(`Error al obtener elemento por ID: ${error}`);
    return null;
    }
}

async updateById(id, data) {
    try {
    return await this.Model.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
    console.error(`Error al actualizar elemento por ID: ${error}`);
    return null;
    }
}

async deleteById(id) {
    try {
    return await this.Model.findByIdAndRemove(id);
    } catch (error) {
    console.error(`Error al eliminar elemento por ID: ${error}`);
    return null;
    }
}

async getAll() {
    try {
    return await this.Model.find();
    } catch (error) {
    console.error(`Error al obtener todos los elementos: ${error}`);
    return [];
    }
}
}

export default BasicManager;
