const utilisateursChat = [];

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

const getUtilisateur = (id) => utilisateursChat.find((utilisateur) => utilisateur.id === id);

const getUtilisateursInRoom = (room) => utilisateursChat.filter((utilisateur) => utilisateur.room === room);

module.exports = { ajoutUtilisateur, quitteUtilisateur, getUtilisateur, getUtilisateursInRoom };
