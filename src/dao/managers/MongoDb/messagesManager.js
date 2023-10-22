import BasicManager from './basicManager.js';
import Message from '../../db/models/messages.model.js';

class MessagesManager extends BasicManager {
constructor() {
    super(Message);
}

async sendMessage(sender, text) {
    try {
    const newMessage = await this.create({ sender, text });
    return newMessage;
    } catch (error) {
    console.error('Error al enviar el mensaje:', error);
    return null;
    }
}

async getAllMessages() {
    try {
    return await this.getAll();
    } catch (error) {
    console.error('Error al obtener todos los mensajes:', error);
    return [];
    }
}

}

export default new MessagesManager();
