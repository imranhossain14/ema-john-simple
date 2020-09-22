import React, { useContext, useState } from 'react';

import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './LoginManager';


function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
     isSignedIn : false,
     name : '', 
     email : '',
     error: '',
     photoUrl : ''
  });

  initializeLoginFramework();

  // app.js er context er jonno connect thakar jonno useContext use korlam. useState dile locally use hoto. r ager context er created context ta add kora lagbe
        const [loggedInUser, setLoggedInUser] = useContext(UserContext);
        const history = useHistory();
        const location = useLocation();
        let { from } = location.state || { from: { pathname: "/" } };
        const googleSignIn = () => {
               handleGoogleSignIn() // promise take return korbe
            .then(response => {
              handleResponse(response, true);
            })
            
      }

        const fbSignIn = () => {
              handleFbSignIn()
              .then(response => {
                handleResponse(response, true);
                })    


        }

          const signOut = () => {
                handleSignOut() // promise take return
                .then(response => {
                  handleResponse(response, false);
                  })
                
          }
            const handleSubmit =(event) =>{
              // js vai jotokhn porjonto ei duita condition true na hobe tumi submit hote dio na
              if(newUser && user.email && user.password){

                  createUserWithEmailAndPassword(user.name, user.email, user.password)
                  .then(response => {
                    handleResponse(response, true);
                    })
              }
              if(!newUser && user.email && user.password){

                signInWithEmailAndPassword(user.email, user.password)
                  .then(response => {
                            handleResponse(response, true);
                    })
              }
      //prevent default behaviour of refreshing of submit button
      event.preventDefault();
  }

 
 const handleResponse = (response, redirect) => {
            setUser(response);
            setLoggedInUser(response);
            if(redirect){
              history.replace(from);
            }
 }     

  const handleBlur =(event) =>{
          // console.log(event.target.name, event.target.value);
          //validate
         
          // dhorlam intially tomra sobi sotto
          let isFieldValid = true;
          // jodi email input a type kore tahole ei if a tumi dhuko
          if(event.target.name ==='email'){
             // js vai tumi totokhn porjonto input ta niba na jotokhn porjnto ei expression ta fullfill na hoy 
                const isFormValid = /\S+@\S+\.\S+/.test(event.target.value);
                // console.log(isEmailValid);
          }
            // jodi password input a type kore tahole ei if a tumi dhuko
          if(event.target.name === 'password'){
              // amar duita condition 
                const isPasswordValid = event.target.value.length>6;
                const passwordHasNumber = /\d{1}/.test(event.target.value);
                // duita condition ki valid kina dekho? valid hole tomar isFieldValue te true koro
                isFieldValid = isPasswordValid && passwordHasNumber;
          }
          if(isFieldValid){
            //ager value copy kore rakhbo set korar age
            const newUserInfo = {...user};
            newUserInfo[event.target.name] = event.target.value; 
            // event.target.name -> email hole email er value nibe, password hole password er value nibe
            setUser(newUserInfo);
          }
  }


  return (
   <div  style={{textAlign: 'center'}}>
                
                  {
                      user.isSignedIn ? <button onClick={signOut}>Sign Out</button> :  
                      <button onClick={googleSignIn}>Sign In</button>
                  
                  }
                  <br/>
                  <br/>
                  <button onClick={fbSignIn}>Sign In Using Facebook</button>
                {
                      user.isSignedIn && 
                      <div>
            
                          <p>Welcome, {user.name}!</p>
                          <p>Your email : {user.email}</p>
                          <img src={user.photoUrl} alt="userPhoto"/>
                      </div>
                }
            
              
                    <h1>Our Own Authentication </h1>
                    <input type="checkbox" onChange ={()=> setNewUser(!newUser)} name="newUser" id=""/> 
                    <label htmlFor = "newUser"> New User SIgn Up</label>
              <br/>
                {/* show data in ui */}
                {/* <p>Name : {user.name}</p>
                <p>Email : {user.email}</p>
                <p>Password : {user.password}</p> */}
                
                <form  onSubmit={handleSubmit}>
                    {
                
                           newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="Your Name"/>
                
                    }
                <br/>
                       <input type="email" name ="email" onBlur={handleBlur} placeholder ="Your Email Address" required/>
               <br/>
                        <input type="password" name="password" onBlur={handleBlur} placeholder="Password" required/>
               <br/>
                         <input type="submit" value={ newUser ? "Sign UP" : "Sign In" }/>
          </form>
          <p style = {{color :"red" , textAlign: "center"}}>{user.error}</p>       
          {/* showing error message if user already exits */}
             
              {
                  user.success &&  
                  <p style = {{color :"green" , textAlign: "center"}}>User {newUser ? 'Created' : 'Logged In Successfully'} Successfully</p>
                 
          }
              
              </div>
    );

        }  

export default Login;
