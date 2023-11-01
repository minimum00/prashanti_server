const {db,storage,admin} = require('../firebaseConfig.js')
const {doc,getDoc,updateDoc,setDoc,collection,query,where} = require('firebase-admin/firestore')
const   {
        createUserWithEmailAndPassword,
        getAuth,
        signInWithEmailAndPassword,
        signOut
        } 
        = require('firebase-admin/auth')
const { response } = require('express')

const auth = admin.auth()




const booking = async(req,res) =>{
    let dataBT = 0
    let dataDoc = 0
    const query1 = await admin.firestore().collection('BloodTestBookings')
    .where('date','==','4/10/2023')
    .get().then(result => {
        console.log('api staring')
        result.forEach((doc) => {
            dataBT += 1 
        });
    })
    .catch((err) =>{
        console.log(err)
    })

    const query2 = await admin.firestore().collection('DoctorBookings')
    .where('date','==','4/10/2023')
    .get().then(result => {
        console.log('api staring')
        result.forEach((doc) => {
            dataDoc += 1 
        });
    })
    .catch((err) =>{
        console.log(err)
    })


    res.status(200).json({BloodTest:dataBT,Doctor:dataDoc})
}


module.exports = {
    booking
}