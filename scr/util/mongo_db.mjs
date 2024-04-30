import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { });
var db;

export async function connectToDB() {
    try {
        // Connect the client to the server
        await client.connect();

        db = client.db('VinnicomeBoyz');
        console.log("Connected successfully to mongoDB");  
    } catch (error) {
        throw error; 
    }
}

export async function getDb() {
    return db;
}

export async function closeDBConnection(){
    await client.close();
    return 'Connection closed';
};

export default { connectToDB, getDb, closeDBConnection}
