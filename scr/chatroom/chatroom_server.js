import fs from 'fs';
import path from 'path';


const __dirname = path.dirname(new URL(import.meta.url).pathname);
const storeFilePath = __dirname + '/store.html';

export function setup(io) {
    // Handle socket connections
    io.on('connection', (socket) => {
      // Broadcast when a new user joins
      socket.broadcast.emit('userStatus', 'A new user has joined the chat');
      console.log('A user connected to chatroom');
  
      // Read chat history from file and emit to the new user
      fileRead(socket);
  
      // Listen for messages from the client
      socket.on('message', (data) => {
        // Format message
        let messageData = `<div><strong>${data.author}:</strong> ${data.message}</div>`;
  
        // Write message to file
        writeFile(messageData, socket);
      });
    });
  
    // Handle disconnection
    io.on('disconnect', () => {
      console.log('User disconnected');
    });
  }

  export function writeFile(dataToStore, socket) {
    fs.appendFile(storeFilePath, dataToStore, (err) => {
      if (err) {
        console.log(err, 1);
      } else {
        socket.broadcast.emit('incoming', dataToStore);
        socket.emit('incoming', dataToStore);
      }
    });
  }
  
  export function fileRead(socket) {
    fs.readFile(storeFilePath, (err, data) => {
      if (err) console.log(err, 1);
      else socket.emit('onLoad', data.toString());
    });
  }
  
  export function clearStoreFile() {
    fs.writeFile(storeFilePath, '', (err) => {
      if (err) console.error('Error clearing store.html:', err);
      else console.log('store.html cleared');
    });
  }