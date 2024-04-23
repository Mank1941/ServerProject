import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import * as chatroom from './chatroom/chatroom.js';

// Create an Express app and a HTTP server
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 3000;
// const HOST = ``

// Define the path to serve static files
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicPath = path.join(__dirname, '/../public/s');

console.log(`Static files will be served from ${publicPath}`);
app.use(express.static(publicPath));

chatroom.setup(io);

process.on('SIGINT', () => {
    console.info('SIGINT signal received')
    running_server.close(async function() {
        console.log('Server closed');
        chatroom.clearStoreFile();
        process.exit(0);
    })
    // process.exit(32);
})

// Start the server
var running_server = server.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
    // console.log(`Server is running on ${HOST}:${PORT}`);
});



