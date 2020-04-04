//Importation des constantes des tailles

import { TAILLE_PLAYER, HAUTEUR_MAP, LARGEUR_MAP } from '../../../config/constants'

const initialState = {
    position: [0,0],
}

//Limitation pour ne pas depasser

function limite(anciennePosition, nouveauPosition) {
    return nouveauPosition[0] >= 0 &&
    nouveauPosition[0] <= LARGEUR_MAP - TAILLE_PLAYER &&
    nouveauPosition[1] >= 0 &&
    nouveauPosition[1] <= HAUTEUR_MAP - TAILLE_PLAYER
        ? nouveauPosition
        : anciennePosition
}

//Nouvelle position

function getNewPosition(anciennePosition, direction) {
    switch(direction) {
        case 'gauche':
            return limite(
                anciennePosition,
                [ anciennePosition[0]-TAILLE_PLAYER, anciennePosition[1] ]
            )

        case 'droit':
            return limite(
                anciennePosition,
                [ anciennePosition[0]+TAILLE_PLAYER, anciennePosition[1] ]
            )

        case 'haut':
            return limite(
                anciennePosition,
                [ anciennePosition[0], anciennePosition[1]-TAILLE_PLAYER ]
            )

        case 'bas':
            return limite(
                anciennePosition,
                [ anciennePosition[0], anciennePosition[1]+TAILLE_PLAYER ]
            )

        default:
            return  [ anciennePosition[0], anciennePosition[1] ]
    }
}

//Changement de position
const playerReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'DEPLACEMENT_PLAYER':
            return {
                ...state,
                position: getNewPosition(state.position, action.payload),
            }

        default:
            return state
    }
}

export default playerReducer
