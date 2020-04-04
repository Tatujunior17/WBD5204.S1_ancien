//Importation des librairies
//Importation des Constructeurs
//Importation du style

import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

import TextContainer from './TextContainer';
import Messages from './Messages/Messages';
import Input from './Input';
import InfoBar from './InfoBar';

import './style/Chat.css';

//Variable Global

let socket;

//Creation de constantes

const Chat = ({ location }) => {

    const [name, setName] = useState('');

    const [room, setRoom] = useState('');

    const [utilisateursChat, setUsers] = useState('');

    const [message, setMessage] = useState('');

    const [messages, setMessages] = useState([]);

    const ENDPOINT = 'localhost:8000';


    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT);

        //Chambre et Utilisateur recuperer

        setRoom(room);
        setName(name);


        //Connection

        socket.emit('join', { name, room }, (error) => {
            if(error) {
                alert(error);
            }
        });
    }, [ENDPOINT, location.search]);

    //Loesque utilisateur ecri un message

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message ]);
        });

        socket.on('roomData', ({ utilisateursChat }) => {
            setUsers(utilisateursChat);
        })

        return () => {
            socket.emit('disconnect');

            socket.off();
        }
    }, [messages])

    const sendMessage = (event) => {
        event.preventDefault();

        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    };

    //Container Principal regroupant les autres composents créés

    return (
        <div className="outerContainer">
            <div className="container-chat">
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            <TextContainer users={utilisateursChat}/>
        </div>
    );
};

export default Chat;
