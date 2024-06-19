const express = require("express");

const {
    getAllCows,
    getCowById,
    createCow,
    deleteCowById,
    editCowById,
} = require("./sapi.service");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const cows = await getAllCows();

        res.status(200).send(cows);
    } catch (error) {
        res.status(400).send(error.message);
    }

});

router.get("/:id", async (req, res) => {
    try {
        const cowId = req.params.id;
        console.log(cowId);
        const cow = await getCowById(cowId);

        res.send(cow);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.post("/", async (req, res) => {
    try {
        const newCowData = req.body;
        console.log("bodynya", req.body);

        const cow = await createCow(newCowData);

        res.status(201)
            .send({
                data: cow,
                message: "create cow success",
            });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const cowId = req.params.id;

        const hasil = await deleteCowById(cowId);

        res.status(200).send({
            message: "cow delete success",
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.put("/:id", async (req, res) => {
    const cowId = req.params.id;
    const cowData = req.body;

    if (!(
        cowData.nama &&
        cowData.id_rfid &&
        cowData.tanggal_lahir &&
        cowData.jenis_kelamin &&
        cowData.berat &&
        cowData.harga
    )) {
        return res.status(400).send("Some fields are missing");
    }

    const cow = await editCowById(cowId, cowData);

    res.send({
        data: cow,
        message: "edit cow success",
    });
});

router.patch("/:id", async (req, res) => {
    try {
        const cowId = req.params.id;
        const cowData = req.body;

        const cow = await editCowById(cowId, cowData);

        res.send({
            data: cow,
            message: "edit cow success",
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;