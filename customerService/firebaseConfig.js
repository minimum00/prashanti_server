var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


// Initialize Firebase
const { getFirestore} = require('firebase-admin/firestore');
// Get Firestore instance
const db = getFirestore();

// Get Storage instance
const storage = admin.storage();

module.exports = {db,storage,admin}