const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const { ajoutUtilisateur, quitteUtilisateur, getUtilisateur, getUtilisateursInRoom } = require('./routes/utilisateursChat');

const router = require('./routes/router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);

io.on('connect', (socket) => {
    socket.on('join', ({ name, room }, callback) => {
        const { error, utilisateur } = ajoutUtilisateur({ id: socket.id, name, room });

        if(error) return callback(error);

        socket.join(utilisateur.room);

        socket.emit('message', { utilisateur: 'admin', text: `${utilisateur.name}, Welcome in :  ${utilisateur.room}.`});
        socket.broadcast.to(utilisateur.room).emit('message', { utilisateur: 'admin', text: `${utilisateur.name} is in the room.` });

        io.to(utilisateur.room).emit('roomData', { room: utilisateur.room, utilisateursChat: getUtilisateursInRoom(utilisateur.room) });

        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const utilisateur = getUtilisateur(socket.id);

        io.to(utilisateur.room).emit('message', { utilisateur: utilisateur.name, text: message });

        callback();
    });

    socket.on('disconnect', () => {
        const utilisateur = quitteUtilisateur(socket.id);

        if(utilisateur) {
            io.to(utilisateur.room).emit('message', { utilisateur: 'Admin', text: `${utilisateur.name} left the room..` });
            io.to(utilisateur.room).emit('roomData', { room: utilisateur.room, utilisateursChat: getUtilisateursInRoom(utilisateur.room)});
        }
    })
});

server.listen(process.env.PORT || 8000, () => console.log(`Serveur fonctionnel`));
