const { checkExpired } = require("../utilities/expiredTime");

const {
    findCow,
    insertCowBanned,
    findBanned
} = require("./rfid.repository");

// cek rfid ada atau tidak atau null
const getCowByIdRFID = async (id_rfid) => {
    const cow = await findCow(id_rfid);

    if (!cow) {
        throw Error("RFID tidak ditemukan!");
    }

    return cow;
};

// sistem cek status sapi boleh scan atau tidak
// menghindari double post rfid 
const createBanned = async (id_rfid) => {

    const dbSapi = await getCowByIdRFID(id_rfid);
    const uid = dbSapi.uid;
    const status = dbSapi.status;

    if (status === undefined || status === null) {
        throw new Error('status tidak ada!');
    }
    if (!uid) {
        throw new Error('UID tidak ada!');
    }
    const cow = await findBanned(id_rfid);

    if (cow === null) {
        console.log("sapi baru terdaftar masuk");
        await insertCowBanned(uid, status, id_rfid);
        return { message: 'sapi baru terdaftar', status: status };
    }
    const remainingTime = cow.time;
    const waktu = await checkExpired(remainingTime);


    if (waktu.remainingTime > 0) {
        throw Error("Masih dibanned. Waktu = " + waktu.remainingTime);
    } else {

        const statusRFID = await updateStatusRFID(uid, status, id_rfid);
        return statusRFID;
    }

};


// cek status sapi, awalnya diluar atau didalam
const updateStatusRFID = async (uid, status, id_rfid) => {

    if (status === false) {
        const keadaan = "masuk";
        status = true;

        await insertCowBanned(uid, status, id_rfid);
        return keadaan;
    } else {
        const keadaan = "keluar";
        status = false;
        await insertCowBanned(uid, status, id_rfid);
        return keadaan;
    }
};



module.exports = {
    getCowByIdRFID,
    updateStatusRFID,
    createBanned
};