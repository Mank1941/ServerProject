// import Message from "/scr/message.mjs";
import Message from "./messages.mjs";

$(document).ready(() => {
    let socket = io.connect();

    // let username = $("#usernameInput").val();

    socket.on('userStatus', (message) => {
        // console.log(message)
        displayMessage(message);
    })

    socket.on('incoming', (msg) => {
        $(msg).appendTo('#messageBoard');
    })

    socket.on('onLoad', (data) => {
        $('#messageBoard').html(data)
    })

    $('#sendMessageBtn').click(() => {
        let messageText = $("#messageInput").val();

        let username = $("#usernameInput").val().trim();
        
        // If the username is empty, set it to "anon"
        if (!username) {
            username = "anon";
        }

        let data = new Message(username, messageText);
        
        if(data.message === ""){
            alert("Please leave a valid message")
        } else {
            $("#messageInput").val('')
            socket.emit('message', data)
        }
    })  
    
    function displayMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('userStatus');
        messageElement.textContent = message;
        $('#messageBoard').append(messageElement);
    }
});