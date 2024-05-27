
const db = require("../db");

const {
    findCows,
    findCowById,
    insertCow,
    deleteCow,
    editCow,
} = require("./sapi.repository");

const getAllCows = async () => {
    const cows = await findCows();

    if (!cows || cows.length === 0) {
        throw new Error("Cows document not found");
    }

    return cows;
};

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

const deleteCowById = async (id) => {
    await getCowById(id);
    await deleteCow(id);
};

const editCowById = async (id, cowData) => {
    await getCowById(id);

    const cow = await editCow(id, cowData)

    return cow;
};

module.exports = {
    getAllCows,
    getCowById,
    createCow,
    deleteCowById,
    editCowById,
};