const dynamodbRepository = require('../repositories/dynamodb.repository');

class MessagesDao {
    static async getMessagesReceived(receiver, limit) {
        const params = {
            TableName: 'messages',
            IndexName: 'receiver-mid-index', // optional (if querying an index)
            KeyConditionExpression: "receiver = :receiver",
            ExpressionAttributeValues: { // a map of substitutions for all attribute values
                ':receiver': receiver
            },
            ProjectionExpression: 'sender, receiver, mid, ts, msg',
            ScanIndexForward: false, // optional (true | false) defines direction of Query in the index
            Limit: limit // optional (limit the number of items to evaluate)
        };

        const result = await dynamodbRepository.query(params);

        return result.Items;
    }

    static async getMessagesSent(sender, limit=50) {
        const params = {
            TableName: 'messages',
            KeyConditionExpression: "sender = :sender",
            ExpressionAttributeValues: { // a map of substitutions for all attribute values
                ':sender': sender
            },
            ProjectionExpression: 'sender, receiver, mid, ts, msg',
            ScanIndexForward: false, // optional (true | false) defines direction of Query in the index
            Limit: limit
        };

        const result = await dynamodbRepository.query(params);

        return result.Items;
    }
    
    static insert(item) {
        const params = {
            TableName: 'messages',
            Item: item,
            ConditionExpression: 'attribute_not_exists(mid)'
        };

        return dynamodbRepository.put(params);
    }

    /**
     * 
     * @param {String} sender 
     * @param {String} mid 
     * @param {String} msg 
     * @returns Object
     */
    static async update(sender, mid, msg) {
        const params = {
            TableName: 'messages',
            Key: {
                'sender': sender,
                'mid': mid.toString()
            },
            UpdateExpression: `set msg = :msg`,
            ExpressionAttributeValues: {
                ':msg': msg,
            },
            ReturnValues: 'NONE'
        };

        return dynamodbRepository.update(params);
    }
}

module.exports = MessagesDao;