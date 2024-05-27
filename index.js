const express = require('express');
const cors = require('cors');

const PORT = 5001;
const db = require("./db/index.js");

const app = express();
app.use(express.json());
app.use(cors());

const sapiController = require("./sapi/sapi.controller.js");
const rfidController = require("./rfid/rfid.controller.js");

app.use("/sapi", sapiController);
app.use("/rfid", rfidController);

app.listen(PORT, () => {
    console.log('Example app listening on port', PORT);
});

