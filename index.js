const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const PORT = 5001;

const app = express();

app.use(express.json());

app.use(morgan('dev'))
app.use(morgan(':date[web]'))


app.use(cors());


const sapiController = require("./sapi/sapi.controller.js");
const rfidController = require("./rfid/rfid.controller.js");

app.use("/sapi", sapiController);
app.use("/rfid", rfidController);

app.listen(PORT, () => {
    console.log('Server running port: ', PORT);
});

