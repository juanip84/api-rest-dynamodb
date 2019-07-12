const messagesController = require('./messages.controller');
const messagesModel = require('../models/messages.model');

jest.mock('../models/messages.model');

const sendMock = jest.fn();
const statusMock = jest.fn();
const res = { status: statusMock, send: sendMock };
statusMock.mockImplementation(() => res);

describe('MessagesController', () => {
    describe('getMessagesSent', () => {
        it('should validate sender and return 400 with Sender is mandatory message', async () => {
            const req = { query: {} };

            await messagesController.getMessagesSent(req, res);

            expect(statusMock).toBeCalledWith(400);
            expect(sendMock).toBeCalledWith('Sender is mandatory');
        })

        it('should return 200', async () => {
            const req = { query: { sender: 'user1' } };

            const mockMessagesResult = [
              {"msg":"test msg2","mid":"mid2","receiver":"user3","sender":"user1","ts":102215559},
              {"msg":"test msg","mid":"mid1","receiver":"user2","sender":"user1","ts":102215558}
            ];

            messagesModel.getMessagesSent.mockImplementationOnce(() => mockMessagesResult);

            await messagesController.getMessagesSent(req, res);

            expect(statusMock).toBeCalledWith(200);
            expect(sendMock).toBeCalledWith(expect.objectContaining(mockMessagesResult))
        });
    })

    describe('getMessagesReceived', () => {
      it('should validate sender and return 400 with Receiver is mandatory message', async () => {
          const req = { query: {} };

          await messagesController.getMessagesReceived(req, res);

          expect(statusMock).toBeCalledWith(400);
          expect(sendMock).toBeCalledWith('Receiver is mandatory');
      })

      it('should return 200', async () => {
          const req = { query: { receiver: 'user1' } };

          const mockMessagesResult = [
            {
                "msg": "test msg3",
                "mid": "mid3",
                "receiver": "user1",
                "sender": "user2",
                "ts": 102215579
            }
          ];

          messagesModel.getMessagesReceived.mockImplementationOnce(() => mockMessagesResult);

          await messagesController.getMessagesReceived(req, res);

          expect(statusMock).toBeCalledWith(200);
          expect(sendMock).toBeCalledWith(expect.objectContaining(mockMessagesResult))
      });
  })

  describe('insert message', () => {
    it('should validate sender and return 400 with Users are mandatory', async () => {
        const req = { body:
            {
                "receiver": "user2",
                "mid": "mid4",
                "msg": "test insert",
                "ts": 1562969043
            }
        };

        await messagesController.insert(req, res);

        expect(statusMock).toBeCalledWith(400);
        expect(sendMock).toBeCalledWith('Users are mandatory');
    })

    it('should validate receiver and return 400 with Users are mandatory', async () => {
        const req = { body:
            {
                "sender": "user1",
                "mid": "mid4",
                "msg": "test insert",
                "ts": 1562969043
            }
        };

        await messagesController.insert(req, res);

        expect(statusMock).toBeCalledWith(400);
        expect(sendMock).toBeCalledWith('Users are mandatory');
    })

    it('should validate sender and return 400 with Receiver is mandatory message', async () => {
        const req = { body:
            {
                "sender": "user1",
                "receiver": "user2",
                "mid": "mid4",
                "msg": "test insert",
                "ts": 1562969043
            }
        };

        await messagesController.insert(req, res);

        expect(statusMock).toBeCalledWith(400);
        expect(sendMock).toBeCalledWith('Receiver is mandatory');
    })

    it('should return 200', async () => {
        const req = { body:
            {
                "sender": "user1",
                "receiver": "user2",
                "mid": "mid4",
                "msg": "test insert",
                "ts": 1562969043
            }
        };

        const mockMessagesResult = {}; 

        messagesModel.getMessagesReceived.mockImplementationOnce(() => mockMessagesResult);

        await messagesController.insert(req, res);

        expect(statusMock).toBeCalledWith(200);
    });
    })

    describe('update message', () => {
        it('should validate mid and return 400 with mid or sender are missing', async () => {
            const req = { body: { "msg": "test update", "sender": "user1" }};
    
            await messagesController.updateMessage(req, res);
    
            expect(statusMock).toBeCalledWith(400);
            expect(sendMock).toBeCalledWith('mid or sender are missing');
        })

        it('should validate mid and return 400 with mid or sender are missing', async () => {
            const req = { body: { "msg": "test update", "mid": "mid4" }};
    
            await messagesController.updateMessage(req, res);
    
            expect(statusMock).toBeCalledWith(400);
            expect(sendMock).toBeCalledWith('mid or sender are missing');
        })

        it('should return success', async () => {
            const req = { body: { "msg": "test update", "mid": "mid4", "sender": "user1" }};

            const mockMessagesResult = {}; 

            messagesModel.updateMessage.mockImplementationOnce(() => mockMessagesResult);
    
            await messagesController.updateMessage(req, res);
    
            expect(statusMock).toBeCalledWith(200);
        })

        })
})