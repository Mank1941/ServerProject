import express, { json, urlencoded}  from 'express';
import http from 'http';
import { Server } from 'socket.io';
import bodyParser from 'body-parser';

import * as chatroom from './chatroom/chatroom.js';
import { closeDBConnection, connectToDB } from './util/mongo_db.mjs';

import groceryRoutes from './groceryList/groceryRoutes.mjs';

// Create an Express app and a HTTP server
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 3000;
const HOST = ``

// Define the path to serve static files
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicPath = path.join(__dirname, '/../public/');

console.log(`Static files will be served from ${publicPath}`);
// app.use(json());
// app.use(urlencoded({extended: true}));
app.use(express.static(publicPath));
app.use(bodyParser.json());

// Grocery List Routes
app.use('/grocery', groceryRoutes);

let running_server;

export async function createServer(hostType){
    try {
        chatroom.setup(io);
        await connectToDB();

        process.on('SIGINT', () => {
            console.info('SIGINT signal received')
            running_server.close(async function() {
                let msg = await closeDBConnection();
                console.log(msg);
                chatroom.clearStoreFile();
                process.exit(0);
            })
            // process.exit(32);
        });

        if (hostType == 'local') {
            running_server = server.listen(PORT, () => {
                console.log(`Example app listening at http://localhost:${PORT}`);
            });
        } else {
            running_server = server.listen(PORT, HOST, () => {
                console.log(`Server is running on ${HOST}:${PORT}`);
            });
        }        
    } catch (error) {
        console.log(error);
    }
}

