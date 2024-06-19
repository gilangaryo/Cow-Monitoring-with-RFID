const { db, db_cow } = require("../db/index.js");

const findCows = async () => {
    const getData = db.collection('sapi');
    const snapshot = await getData.get();

    if (snapshot.empty) {
        return [];
    }

    const cows = snapshot.docs.map(doc => {
        const data = doc.data();

        return { ...data };
    });

    return cows;
};

const findCowById = async (id) => {

    const uid = id;

    const getData = db.collection(db_cow).doc(id);
    const doc = await getData.get();

    return doc.data();
};

const insertCow = async (cowData) => {
    const cow = await db.collection(db_cow).add({
        nama: cowData.nama,
        id_rfid: cowData.id_rfid,
        tanggal_lahir: cowData.tanggal_lahir,
        jenis_kelamin: cowData.jenis_kelamin,
        berat: cowData.berat,
        harga: cowData.harga,
        status: true,
        created_time: new Date()
    });

    const uid = cow.id;
    await db.collection(db_cow).doc(uid).update({
        uid: uid,
    });

    return cow;
};

const deleteCow = async (id) => {
    await db.collection(db_cow).doc(id).delete();
};

const editCow = async (id, cowData) => {
    const cow = await db.collection(db_cow).doc(id).update(
        cowData
    );

    return cow;
};

module.exports = {
    findCows,
    findCowById,
    insertCow,
    deleteCow,
    editCow
};