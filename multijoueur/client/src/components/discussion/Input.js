//Importation de la librairie
//Importation du style

import React from 'react';

import './style/Input.css';

//Creation du champs du message

const Input = ({ setMessage, sendMessage, message }) => (
    <form className="form">
        <input
            className="input"
            type="text"
            placeholder="Write a message."
            value={message}
            onChange={({ target: { value } }) => setMessage(value)}
            onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
        />
        <button className="sendButton" onClick={e => sendMessage(e)}>Send</button>
    </form>
)

export default Input;
