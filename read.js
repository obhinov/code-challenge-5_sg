const aws = require('aws-sdk');

const dynamodb = new aws.DynamoDB; // get the dynamoDB SDK

const dynamoTable = process.env.TABLE_NAME;

const api_function = {};

api_function.handler = async(event) => {
    console.log(event);

    let response = {};

    try {
        if (event.path=='/users' && event.httpMethod=='GET'){
            response.body = JSON.stringify(await api_function.readUsers());
        }
        response.statusCode = 200;
    } catch(e) {
        response.body = JSON.stringify(e);
        response.statusCode = 500;
    }
    console.log(response);
    return response;

};

api_function.readUsers = () => {
    return new Promise((resolve,reject) => {
        let params = {
            TableName: dynamoTable
        };

        dynamodb.scan(params, (err,data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
};

/*
No API request body input required
*/

module.exports = api_function;