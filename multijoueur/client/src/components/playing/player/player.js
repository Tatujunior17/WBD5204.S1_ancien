//Importation de la librairie react ainis que redux

import React from 'react'
import { connect } from 'react-redux'
import playerDeplacement from './player.png'


//Envoie des actions au container

function mapDispatchToProps(dispatch) {
    return {
        move: (direction) => {
            dispatch({ type: 'DEPLACEMENT_PLAYER', payload: direction })
        }
    }
}

//Envoie des variables au container

function mapStateToProps(state) {
    return {
        position: state.player.position
    }
}

function Player(props) {
    return (
        <div
            style={{
                position: 'relative',
                top: props.position[1],
                left: props.position[0],
                backgroundImage: `url('${playerDeplacement}')`,
                width: '40px',
                height: '52px',
            }}
        >&nbsp;</div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)
