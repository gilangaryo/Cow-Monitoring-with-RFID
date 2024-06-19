
const db = require("../db");

const {
    findCows,
    findCowById,
    insertCow,
    deleteCow,
    editCow,
} = require("./sapi.repository");
const { deleteCowRFID } = require("../rfid/rfid.repository")
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

    if (!(
        newCowData.nama &&
        newCowData.id_rfid &&
        newCowData.tanggal_lahir &&
        newCowData.jenis_kelamin &&
        newCowData.berat &&
        newCowData.harga
    )) {
        throw Error("Some fields are missing");
    } else {
        const cow = await insertCow(newCowData);
        return cow;
    }

};

const deleteCowById = async (id) => {
    const ambil_id_rfid = await getCowById(id);
    const id_rfid = ambil_id_rfid.id_rfid;
    await deleteCowRFID(id_rfid);
    console.log("11111111111111111");
    await deleteCow(id);
    console.log("2222222222222222");

    return;
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