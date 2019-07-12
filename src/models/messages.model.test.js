const messagesModel = require('./messages.model');
const messagesDao = require('../daos/messages.dao');

jest.mock('../daos/messages.dao');

describe('messagesModel', () => {
    describe('getMessagesSent', () => {
        it('should return messages', async () => {

            const mockMessagesResult = [
                {"msg":"test msg2","mid":"mid2","receiver":"user3","sender":"user1","ts":102215559},
                {"msg":"test msg","mid":"mid1","receiver":"user2","sender":"user1","ts":102215558}
            ];
 
            messagesDao.getMessagesSent.mockImplementationOnce(() => mockMessagesResult);

            const result = await messagesModel.getMessagesSent('user1');

            expect(result).toEqual(mockMessagesResult);
        });
    });

    describe('getMessagesReceived', () => {
        it('should return messages', async () => {

            const mockMessagesResult = [
                {
                    "msg": "test msg3",
                    "mid": "mid3",
                    "receiver": "user1",
                    "sender": "user2",
                    "ts": 102215579
                }
              ];
 
            messagesDao.getMessagesReceived.mockImplementationOnce(() => mockMessagesResult);

            const result = await messagesModel.getMessagesReceived('user1');

            expect(result).toEqual(mockMessagesResult);
        });
    });

    describe('insert message', () => {
        it('should return empty object (success)', async () => {

            const mockMessagesResult = {};
 
            messagesDao.insert.mockImplementationOnce(() => mockMessagesResult);

            const result = await messagesModel.insert('user1', 'user', 'mid4', 'test insert', 1562969043);

            expect(result).toEqual(mockMessagesResult);
        });
    });

    describe('update message', () => {
        it('should return empty object (success)', async () => {

            const mockMessagesResult = {};
 
            messagesDao.update.mockImplementationOnce(() => mockMessagesResult);

            const result = await messagesModel.updateMessage("user1", 'mid4', 'test update');

            expect(result).toEqual(mockMessagesResult);
        });
    });
})