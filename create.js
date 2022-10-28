const aws = require('aws-sdk')

const dynamodb = new aws.DynamoDB; // get the dynamoDB SDK

const dynamoTable = process.env.DynamoDB_TABLE_NAME;

const api_function = {}

api_function.handler = async(event) => {
    console.log(event);

    let response = {};

    try {
        if (event.path=='/users' && event.httpMethod=='POST'){
            response.body = JSON.stringify(await createUser(JSON.parse(event.body)));
        }
        response.statusCode = 200;
    } catch(e) {
        response.body = e;
        response.statusCode = 500;
    }
    return response;

}

api_function.createUser = (item) => {
    return new Promise((resolve,reject) => {
        let params = {
            TableName: dynamoTable,
            Item: item
        }

        dynamodb.putItem(params, function(err,data) {
            if (err) reject(err);
            else resolve(data)
        })
    });
}

/*
event format:
- event.httpMethod = 'POST'
- event.path = '/users'
- event.body = '{\n    "user_id": "BWMP-883",\n    "name": "De Niro"\n}'
*/

module.exports = handler