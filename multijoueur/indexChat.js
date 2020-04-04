//Creation des constantes

const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

//Constantes reprenant le modele UtilisateurChat

const { ajoutUtilisateur, quitteUtilisateur, getUtilisateur, getUtilisateursInRoom } = require('./routes/utilisateursChat');

const router = require('./routes/router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);

//connexion

io.on('connect', (socket) => {
    socket.on('join', ({ name, room }, callback) => {
        const { error, utilisateur } = ajoutUtilisateur({ id: socket.id, name, room });

        if(error) return callback(error);

        socket.join(utilisateur.room);

        socket.emit('message', { utilisateur: 'admin', text: `${utilisateur.name}, welcome in the room :  ${utilisateur.room}.`});
        socket.broadcast.to(utilisateur.room).emit('message', { utilisateur: 'admin', text: `${utilisateur.name} is in the room.` });

        io.to(utilisateur.room).emit('roomData', { room: utilisateur.room, utilisateursChat: getUtilisateursInRoom(utilisateur.room) });

        callback();
    });

    //Envoie de message

    socket.on('sendMessage', (message, callback) => {
        const utilisateur = getUtilisateur(socket.id);

        io.to(utilisateur.room).emit('message', { utilisateur: utilisateur.name, text: message });

        callback();
    });

    //Deconnexion

    socket.on('disconnect', () => {
        const utilisateur = quitteUtilisateur(socket.id);

        if(utilisateur) {
            io.to(utilisateur.room).emit('message', { utilisateur: 'Admin', text: `${utilisateur.name} left the room..` });
            io.to(utilisateur.room).emit('roomData', { room: utilisateur.room, utilisateursChat: getUtilisateursInRoom(utilisateur.room)});
        }
    })
});

 //Verification du port

server.listen(process.env.PORT || 8000, () => console.log(`Serveur fonctionnel`));
