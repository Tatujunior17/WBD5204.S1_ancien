//Importation de la livrairie
//Importation de l'image
//Importation du style

import React from 'react';

import onlineIcon from './icons/onlineIcon.png';

import './style/TextContainer.css';

//Creation du container

const TextContainer = ({ utilisateursChat }) => (
    <div className="textContainer">
        {
            utilisateursChat
                ? (
                    <div>
                        <div className="activeContainer">
                            <h2>
                                {utilisateursChat.map(({name}) => (
                                    <div key={name} className="activeItem">
                                        {name}
                                        <img alt="Online" src={onlineIcon}/>
                                    </div>
                                ))}
                            </h2>
                        </div>
                    </div>
                )
                : null
        }
    </div>
);

export default TextContainer;
