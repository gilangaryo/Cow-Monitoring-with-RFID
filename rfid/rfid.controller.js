const express = require("express");
const router = express.Router();
router.use(express.json());

const {
    getCowByIdRFID,
    createBanned
} = require("./rfid.service");


router.get("/", async (req, res) => {
    try {
        console.log(2 + 2);

        const cowId = req.body.id_rfid;
        const cow = await getCowByIdRFID(cowId);

        console.log(cow);
        res.status(200).send(cow);

    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.post("/", async (req, res) => {
    try {
        const id_rfid = req.body.id_rfid;

        // enek sapine
        const keadaan = await createBanned(id_rfid);
        res.status(200).send({
            status: keadaan,
            message: "Update status sapi sukses",
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
});


module.exports = router;