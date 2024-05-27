const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

const serviceAccount = require('./sapi.json');

initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();

const db_cow = 'sapi';
module.exports = { db, db_cow };