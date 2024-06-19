const { db, db_cow, db_banned } = require("../db/index.js");

// cari sapi by rfid di database 
const findCow = async (id_rfid) => {
    const getData = db.collection(db_cow);
    const snapshot = await getData.where('id_rfid', '==', id_rfid).get();

    if (snapshot.empty) {
        return null;
    }

    const cow = snapshot.docs[0].data();
    return cow;

};

// cari sapi terbanned di database 
const findBanned = async (id_rfid) => {
    const getData = db.collection(db_banned);
    const snapshot = await getData.where('id_rfid_banned', '==', id_rfid).get();

    if (snapshot.empty) {
        return null;
    }

    const cow = snapshot.docs[0].data();
    return cow;

};

// tambah sapi banned di database 
// const addDataBanned = async (id_rfid, status) => {

// }

// update sapi masuk di database 
const insertCowBanned = async (uid, status, id_rfid) => {

    await db.collection(db_cow).doc(uid).update({
        status: status,
    });

    const banTime = Date.now() + 1 * 5 * 1000;
    const data = {
        id_rfid_banned: id_rfid,
        time: banTime,
        status: status
    };
    await db.collection(db_banned).doc(id_rfid).set(data);
    // await addDataBanned(id_rfid, status);

};

const deleteCowRFID = async (id_rfid) => {
    await db.collection(db_banned).doc(id_rfid).delete();
};
module.exports = {
    findCow,
    insertCowBanned,
    findBanned,
    deleteCowRFID
};