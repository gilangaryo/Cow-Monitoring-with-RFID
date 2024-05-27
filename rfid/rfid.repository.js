const { db, db_cow } = require("../db/index.js");

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
    });
    const uid = cow.id;
    await db.collection(db_cow).doc(uid).update({
        uid: uid,
    });

    return cow;
};


module.exports = {
    findCowById,
    insertCow
};