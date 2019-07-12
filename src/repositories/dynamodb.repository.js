const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient({
    service: new AWS.DynamoDB({ apiVersion: '2012-08-10' })
})

/**
 * Helper to unify outside request logging for tracing
 * @param {string} method 
 * @param {Object} params 
 */
const manageRequest = (method, params) => {
    return new Promise((resolve, reject) => {
        dynamodb[method](params, (error, response) => {
            if (error) {
                reject(error);
            } else {
                resolve(response);
            }
        })
    });
}

class DynamodbRepository {

    static get(params) {
        return manageRequest('get', params);
    }

    static query(params) {
        return manageRequest('query', params);
    }

    static update(params) {
        return manageRequest('update', params);
    }

    static put(params) {
        return manageRequest('put', params);
    }

    static delete(params) {
        return manageRequest('delete', params);
    }
}

module.exports = DynamodbRepository;