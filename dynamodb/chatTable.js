//dynamodb/chatTable.js

// const {DynamoDBClient, CreateTableCommand} = require('@aws-sdk/client-dynamodb');
//
// const client = new DynamoDBClient({region : 'us-east-1'})
//
// const createChatTable = async () => {
//     const params = {
//         TableName: 'Chats',
//         KeySchema: [{AttributeName: 'chatId', KeyType: 'HASH'}],
//         AttributeDefinitions: [{AttributeName: 'chatId', AttributeType: 'S'}],
//         ProvisionedThroughput: {
//             ReadCapacityUnits: 5,
//             WriteCapacityUnits: 5,
//         },
//     }
//     try{
//         const command = new CreateTableCommand(params);
//         const response = await client.send(command);
//         console.log('Chat table created successfully:', response);
//     } catch(error){
//         console.error('Error creating chat table:', error.message);
//     }
// }
//
// createChatTable();