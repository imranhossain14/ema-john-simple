import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebas.config';

export const initializeLoginFramework = () =>{
    if(firebase.apps.length ===0){
        firebase.initializeApp(firebaseConfig);
    }
}


// sign in Google

export const handleGoogleSignIn = () =>{
const googleProvider = new firebase.auth.GoogleAuthProvider();
  return  firebase.auth().signInWithPopup(googleProvider)
    .then(response => {
      const { displayName,  photoUrl, email } = response.user ;
      const signInUser ={
        name : displayName,
        email : email,
        photoUrl : photoUrl,
        success : true
        
      }
      return signInUser;
    })
    

     //jodi fail hoy
     .catch(err =>{
       console.log(err);
       console.log(err.message);

     }) 
}

//Facebook sign in 

export const handleFbSignIn =() =>{
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      user.success = true;
      return user;
      console.log('fb user after sign',user);
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }


  // firebase signout handler

  export const handleSignOut =() => {
    return firebase.auth().signOut()
    .then(res => {
      // Sign-out successful.
      const signOutUser ={
        inSignIn: true,
        
        name : '', 
        email : '',
        photoUrl : '',
        password : '',
        error : '',
        success : false
      }
      return signOutUser;
    }).catch(function(error) {
      // An error happened.
    });
  }

  export const createUserWithEmailAndPassword = (name, email, password) =>{
            // for firbase user creation
         return firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(response =>{
              const newUserInfo = response.user;
              newUserInfo.error = '';
              newUserInfo.success = true;
              updateUserName(name);
              return newUserInfo;
              
              // user name ta submit er sathe sathe pathaya dilam call kore
              
            })
            .catch((error) =>{
      
              // Handle Errors here.
              const newUserInfo = {};
              newUserInfo.error =error.message;
              newUserInfo.success = false;
              return newUserInfo;
      
              // var errorCode = error.code;
              // var errorMessage = error.message;
              // console.log(errorMessage, errorCode);
              
              // ...
            });
  }

  export const signInWithEmailAndPassword = (email, password) => {
   
     // jodi new user na hoy tahole sign in er bebostha kore dibo
     
        return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(response => {
          const newUserInfo = response.user;
          newUserInfo.error = '';
          newUserInfo.success = true;
            return newUserInfo;
        })
        .catch(function(error) {
          // Handle Errors here.
          const newUserInfo = {};
          newUserInfo.error =error.message;
          newUserInfo.success = false;
          return newUserInfo;
        });
  }


  const updateUserName = (name) => {
    var user = firebase.auth().currentUser;

      user.updateProfile({
        displayName: name,
       
      }).then(function() {
        // Update successful.
        console.log("user name updated successfully");
      }).catch(function(error) {
        // An error happened.
        console.log(error);
      });
  }
