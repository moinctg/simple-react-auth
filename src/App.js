

import { GoogleAuthProvider,getAuth, signInWithPopup,  GithubAuthProvider, signOut} from "firebase/auth";
import React, { useState} from 'react';
import './App.css';
import intializeAutentication from './Firebase/FirebaseInitialize' ;



intializeAutentication();
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();


function App() {
  const [user,setUser] = useState({});
  const auth = getAuth()
  const eventHandeler = () =>{
  
    signInWithPopup(auth,googleProvider)
    .then(result=>{
      const {displayName,email,photoURL}= result.user;
      // console.log(result.user)

      const loggedInUser ={

        name:displayName,
        email:email,
        photo:photoURL
      };
      setUser(loggedInUser);
     
    })
    .catch(error=>{
      console.log(error.message);
    })

  }

  const eventHanderGithub = () => {
  signInWithPopup(auth,githubProvider)
  .then(result=> {
    // const user = result.user;
    
     const {displayName,email,photoURL}= result.user;
     // console.log(result.user)

     const loggedInUser ={

       name:displayName,
       email:email,
       photo:photoURL
     };
     setUser(loggedInUser);
    
   })
   .catch(error=>{
     console.log(error.message);

  })

  }

 const eventHandelerSignOut=() =>{
  signOut(auth)
  .then(() => {
    setUser({});
  })

}

  return (
    <div className="App">
      
      {!user.name ?
        <div>
          <button onClick={eventHandeler}>Google Sign-In</button>
          <br />
          <button onClick={eventHanderGithub}>Github Sign-In</button>
          <br />
        </div> :
        <button onClick={eventHandelerSignOut}>Signout</button>}
      <br />
      {

       user.email  && <div>
          <h3>Welcome to,{user.name}</h3>   
          <h3>My Email is:{user.email}</h3>   
          <img src={user.photo} alt=""/>

         </div>

         
     }

     {


        user.name && <div>
          <h3>Welcome to,{user.name}</h3>
          {/* <h3>My Email is:{user.email}</h3> */}
          <img src={user.photo} alt="" />

        </div>

     }

     
    </div>
  );
}

export default App;
