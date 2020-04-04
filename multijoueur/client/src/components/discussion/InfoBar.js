//Importation de la librairie
//Importation des images
//Importation du style

import React from 'react';

import onlineIcon from './icons/onlineIcon.png';
import closeIcon from './icons/closeIcon.png';

import './style/InfoBar.css';

//Creation de la barre info
//Image de la room en lign en vert
//Image de la croix pour quitter, revoie à la page accueil

const InfoBar = ({ room }) => (
    <div className="infoBar">
        <div className="leftInnerContainer">
            <img className="onlineIcon" src={onlineIcon} alt="Online" />
            <h3>{room}</h3>
        </div>
        <div className="rightInnerContainer">
            <a href="/accueil"><img src={closeIcon} alt="Close" /></a>
        </div>
    </div>
)


export default InfoBar;
