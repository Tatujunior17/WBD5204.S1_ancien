//Importation des libraires ainsi que du constructeur Player et le style de la page Acceuil
//Importation des constantes des differentes trailles
//Importation Image du joueur

import React from 'react'
import handleMovement from '../playing/movement/movement'
import Player from '../playing/player/player'

import { HAUTEUR_MAP, LARGEUR_MAP } from '../../config/constants'
import './Accueil.css'
import '../layouts/Header'
import Header from "../layouts/Header";

//Definition de la taille de la map
//Appel du constructeur Player

    function Accueil() {
        return (

            <div
                className="map"
                style={{
                    height: HAUTEUR_MAP,
                    width: LARGEUR_MAP,
                }}
            >
                <Player />
            </div>

        )
    }

export default handleMovement(Accueil)

