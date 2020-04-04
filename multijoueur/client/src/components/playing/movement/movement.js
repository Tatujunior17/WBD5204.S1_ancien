//Importation du constructeur store

import store from '../../../config/store'

//Direction de deplacement

function handleDirctionMove(e, direction) {
    console.log(`Deplacement ${direction}!`)
    store.dispatch({ type: "DEPLACEMENT_PLAYER", payload: direction})
    e.preventDefault()
}

//revoie des touches de deplacement

function handleKeyDown(e) {
    switch(e.keyCode) {
        case 40:
            handleDirctionMove(e, 'bas')
            return
        case 37:
            handleDirctionMove(e, 'gauche')
            return
        case 39:
            handleDirctionMove(e, 'droit')
            return
        case 38:
            handleDirctionMove(e, 'haut')
            return
        default:
            console.log(e.keyCode)
    }
}

export default function handleMovement(wrappedComponent) {
    window.addEventListener('keydown', (e) => {
        handleKeyDown(e, wrappedComponent)
    })

    return wrappedComponent
}
