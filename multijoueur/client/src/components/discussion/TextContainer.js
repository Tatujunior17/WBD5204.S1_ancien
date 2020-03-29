import React from 'react';

import onlineIcon from './icons/onlineIcon.png';

import './style/TextContainer.css';

const TextContainer = ({ utilisateurs }) => (
    <div className="textContainer">
        {
            utilisateurs
                ? (
                    <div>
                        <div className="activeContainer">
                            <h2>
                                {utilisateurs.map(({name}) => (
                                    <div key={name} className="activeItem">
                                        {name}
                                        <img alt="Online Icon" src={onlineIcon}/>
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
