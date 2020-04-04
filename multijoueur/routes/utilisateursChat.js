//Creation tableau

const utilisateursChat = [];

//Attribut (identifiant, nom et chambre) pour l'utilisateur chat
//Tout les champs sont mis en minuscules
//Test si les champs sont bien remplies sinon msg erreur

const ajoutUtilisateur = ({ id, name, room }) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existantUtilisateur = utilisateursChat.find((utilisateur) => utilisateur.room === room && utilisateur.name === name);

    if(!name || !room) return { error: 'Username and Room required.' };
    if(existantUtilisateur) return { error: 'Username already connected.' };

    const utilisateur = { id, name, room };

    utilisateursChat.push(utilisateur);

    return { utilisateur };
}

const quitteUtilisateur = (id) => {
    const index = utilisateursChat.findIndex((utilisateur) => utilisateur.id === id);

    if(index !== -1) return utilisateursChat.splice(index, 1)[0];
}

//Recuperation de Utilisateur

const getUtilisateur = (id) => utilisateursChat.find((utilisateur) => utilisateur.id === id);

//Recuperation de Utilisateur dans une chambre

const getUtilisateursInRoom = (room) => utilisateursChat.filter((utilisateur) => utilisateur.room === room);


module.exports = { ajoutUtilisateur, quitteUtilisateur, getUtilisateur, getUtilisateursInRoom };
