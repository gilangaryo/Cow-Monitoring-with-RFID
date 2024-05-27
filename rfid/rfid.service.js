
const db = require("../db");

const {
    findCowById,
    insertCow,
} = require("./rfid.repository");


const getCowById = async (id) => {
    const cow = await findCowById(id);

    if (!cow) {
        throw Error("Cow not found");
    }

    return cow;
};

const createCow = async (newCowData) => {
    console.log(newCowData);
    if (!newCowData.id_rfid) {

    }
    const cow = await insertCow(newCowData);

    return cow;
};


module.exports = {
    getAllCows,
    getCowById,
    createCow,
    deleteCowById,
    editCowById,
};