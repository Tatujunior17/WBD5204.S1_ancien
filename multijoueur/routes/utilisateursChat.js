const utilisateurs = [];

const ajoutUtilisateur = ({ id, name, room }) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existantUtilisateur = utilisateurs.find((utilisateur) => utilisateur.room === room && utilisateur.name === name);

    if(!name || !room) return { error: 'Username and Room required.' };
    if(existantUtilisateur) return { error: 'Username already connected.' };

    const utilisateur = { id, name, room };

    utilisateurs.push(utilisateur);

    return { utilisateur };
}

const quitteUtilisateur = (id) => {
    const index = utilisateurs.findIndex((utilisateur) => utilisateur.id === id);

    if(index !== -1) return utilisateurs.splice(index, 1)[0];
}

const getUtilisateur = (id) => utilisateurs.find((utilisateur) => utilisateur.id === id);

const getUtilisateursInRoom = (room) => utilisateurs.filter((utilisateur) => utilisateur.room === room);

module.exports = { ajoutUtilisateur, quitteUtilisateur, getUtilisateur, getUtilisateursInRoom };
