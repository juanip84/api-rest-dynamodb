const messagesModel = require('../models/messages.model');
const xid	= require('xid-js');

const isValidString = value => {
    return typeof value === "string" && value.trim().length > 0
}

const generateUuid = () => {
	// generate an uuid
	return xid.next();
};

class MessagesController {
    static async getMessagesSent(req, res) {
        const callId = generateUuid();
        const { sender } = req.query;

        console.log('Call %s %s id: %s', req.method,req.url, callId);
        
		if (!isValidString(sender)) {
            console.log('call id: %s error:%s', callId, JSON.stringify('Error missing params'));
            return res.status(400).send('Sender is mandatory');
        }

        try {
            const result = await messagesModel.getMessagesSent(sender);

            console.log('Call id: %s response: %s', callId, JSON.stringify(result));

            res.status(200).send(result);
        } catch (error) {
            console.log("error: ", error);
            res.status(500).send('Internal Server Error');
        }
    }

    static async getMessagesReceived(req, res) {
        const callId = generateUuid();
        const { receiver } = req.query;

        console.log('Call %s %s id: %s', req.method,req.url, callId);
        
		if (!isValidString(receiver)) {
            console.log('call id: %s error:%s', callId, JSON.stringify('Error missing params'));
            return res.status(400).send('Receiver is mandatory');
        }

        try {
            const result = await messagesModel.getMessagesReceived(receiver);

            console.log('Call id: %s response: %s', callId, JSON.stringify(result));

            res.status(200).send(result);
        } catch (error) {
            console.log("error: ", error);
            res.status(500).send('Internal Server Error');
        }
    }

    static async insert(req, res) {
        const { sender, receiver, mid, msg, ts } = req.body;
        const callId = generateUuid();

        console.log('Call %s %s id: %s body: %s', req.method,req.url, callId, JSON.stringify(req.body));

		if (!isValidString(sender) || !isValidString(receiver)) {
            console.log('call id: %s error:%s', callId, JSON.stringify('Users are missing'));
            return res.status(400).send('Users are mandatory');
        }

		if (!isValidString(mid) || !isValidString(msg) || ts === undefined) {
            console.log('call id: %s error:%s', callId, JSON.stringify('Missing info'));
            return res.status(400).send('Message info is incomplete');
        }

		try {
            await messagesModel.insert(sender, receiver, mid, msg, ts); 

            console.log('Call id: %s response: %s', callId, 'Message inserted');
            res.status(200).send('Message inserted');
		} catch (error) {
            console.log('call id: %s error:%s', callId, error);

            res.status(500).send('Internal Server Error');
        }
    }

    static async updateMessage(req, res) {
        const { mid, msg, sender } = req.body;
        const callId = generateUuid();

        console.log('Call %s %s id: %s body: %s params: %s', req.method,req.url, callId, JSON.stringify(req.body), JSON.stringify(req.params));

        if (!isValidString(msg)) {
            console.log('call id: %s error:%s', callId, 'msg is missing');
            return res.status(400).send('msg is missing, nothing to update');
        }

        if (mid === undefined || !isValidString(sender)) {
            console.log('call id: %s error:%s', callId, 'mid or sender are missing');
            return res.status(400).send('mid or sender are missing');
        }
        
		try {
            await messagesModel.updateMessage(sender, mid.toString(), msg); 

            console.log('call id:%s result:%s ', callId, 'Message updated');
            res.status(200).send('Message updated');
		} catch (error) {
            console.log('call id: %s error:%s', callId, error);
            
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = MessagesController;