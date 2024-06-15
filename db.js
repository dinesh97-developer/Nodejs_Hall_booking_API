import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();

const mongoServer = process.env.MONGO_URL ;
const localServer = process.env.LOCAL_URL ;

async function dbConnection(){
    try{
        const client = new MongoClient(mongoServer);
        await client.connect();
        console.log('DataBase Connected');
        return client;

    }catch(err){
        console.log(`Error Connecting Server: ${err}`);
    }
}

// Initializing DB
export const client = await dbConnection();