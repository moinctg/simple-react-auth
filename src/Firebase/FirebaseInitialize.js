import { initializeApp } from "firebase/app";
import firebaseConfig from './Firebase.config';


// Initialize Firebase

const intializeAutentication = ()=>{
    initializeApp(firebaseConfig);
}


export default intializeAutentication;