const messagesDao = require('../daos/messages.dao');

class MessagesModel {
    static getMessagesSent(sender) {
        return messagesDao.getMessagesSent(sender);
    }

    static getMessagesReceived(receiver) {
        return messagesDao.getMessagesReceived(receiver);
    }

    static async insert(sender, receiver, mid, msg, ts) {
        const item = { sender, receiver, mid, msg, ts };

        return messagesDao.insert(item);
    } 

    static async updateMessage(sender, mid, msg) {
        return messagesDao.update(sender, mid, msg);
    };
}

module.exports = MessagesModel;