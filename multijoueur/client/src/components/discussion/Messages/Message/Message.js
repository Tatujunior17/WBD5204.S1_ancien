//Imporation librairies
//Importation du style

import React from 'react';

import './Message.css';

import ReactEmoji from 'react-emoji';

const Message = ({ message: { text, utilisateur }, name }) => {
    let utilisateurActuel = false;

    //Enlver les espacement avec Trim()

    const espaceNom = name.trim().toLowerCase();

    if(utilisateur === espaceNom) {
        utilisateurActuel = true;
    }

    return (
        utilisateurActuel
            ? (
                <div className="messageContainer justifyEnd">
                    <p className="sentText pr-10">{espaceNom}</p>
                    <div className="messageBox backgroundBlue">
                        <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
                    </div>
                </div>
            )
            : (
                <div className="messageContainer justifyStart">
                    <div className="messageBox backgroundLight">
                        <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
                    </div>
                    <p className="sentText pl-10 ">{utilisateur}</p>
                </div>
            )
    );
}

export default Message;
