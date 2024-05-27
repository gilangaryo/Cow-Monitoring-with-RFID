const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 4040;

// const dbConfig = {
//   host: 'localhost',
//   user: 'id15364585_esp_board',
//   password: 'Abhishek#54321',
//   database: 'id15364585_esp_data'
// };

const api_key_value = '#54321';

// Create a MySQL connection pool
// const pool = mysql.createPool(dbConfig);

// Parse incoming request bodies in a middleware before your handlers
app.use(express.json());

app.post('/', (req, res) => {
    const api_key = req.body.api_key;
    if (api_key === api_key_value) {
        res.send(req.body);

        // const SensorData = req.body.SensorData;
        // const LocationData = req.body.LocationData;
        // const value1 = req.body.value1;
        // const value2 = req.body.value2;
        // const value3 = req.body.value3;

        // pool.getConnection((err, connection) => {
        //   if (err) {
        //     res.status(500).send('Error occurred while connecting to the database');
        //     return;
        //   }

        //   const sql = 'INSERT INTO ESPData (SensorData, LocationData, value1, value2, value3) VALUES (?, ?, ?, ?, ?)';
        //   const values = [SensorData, LocationData, value1, value2, value3];

        //   connection.query(sql, values, (error, results) => {
        //     connection.release(); // Release the connection

        //     if (error) {
        //       res.status(500).send('Error occurred while inserting data into the database');
        //       return;
        //     }

        //     res.send('New record created successfully');
        //   });
        // });
    } else {
        res.status(403).send('Wrong API Key');
    }
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
