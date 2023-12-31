const {db,storage,admin} = require('../firebaseConfig.js')
const {doc,getDoc,updateDoc,setDoc,collection,query,where} = require('firebase-admin/firestore')
const   {
        createUserWithEmailAndPassword,
        getAuth,
        signInWithEmailAndPassword,
        signOut
        } 
        = require('firebase-admin/auth')

const auth = admin.auth()




const signup = async(req,res) =>{

    const {username,email,password,number} = req.body
    console.log(number)
    try{

        const response = await auth.createUser({
            email: email,
            password: password,
            displayName:username,
        })
        const userId = response.uid
        console.log(userId)
        const userRef = db.collection('users').doc(`${userId}`)
        
        try{
            await userRef.set({
                email:email,
                username:username,
                phoneNumber:number
            }) 
        }
        catch(err){
            console.log(err)
        }
    }
    catch(err){
        console.log(err)
    }
}

const postlogin = async(req,res)=>{
    const {email,password} = req.body
    const auth = getAuth()
    console.log(req.body)
   try{
     await signInWithEmailAndPassword(auth,email,password)
     .then(async (userCred) =>{
        console.log('user logged in')
        const userID = userCred.user.uid
        const userRef = doc(db,'users',`${userID}`)
        const docSnap = await getDoc(userRef)
        const userData = docSnap.data()

        auth.currentUser.getIdToken()
        .then((token) =>{
            res.cookie('jwt',token)
            res.status(200).json({token:token,userData:userData.username})
            console.log(token)
        })
     })
   }
   catch(err){
    console.log(err)
    res.sendStatus(401)
   }

}

const UserLogOut = async(req, res) => {
    try{
            res.clearCookie('jwt');
           
            await signOut(auth);
      
            return res.status(200).json({ message: 'User logged out successfully' });
          
      
       
    } catch(error) {
        console.error(error);
        return res.status(500).json({ error: 'Something went wrong' });
    }
}

const getUserDetail = async(req,res) =>{
    const {id} = req.query
    const userRef = doc(db,'users',`${id}`)
   try{
        await getDoc(userRef)
        .then((userInfo) =>{
            console.log(userInfo.data())
            const username = userInfo.data().username
            res.status(200).json({username:username})
        })
        .catch(err => console.log(err))
    }
    catch(err){
        console.log(err)
    }
}


module.exports = {
    postlogin,
    signup,
    UserLogOut,
    getUserDetail
}