import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyCEpHqFiitI6OwSIervIYtgKYZGN22nkI8",
  authDomain: "enventory-management-439c3.firebaseapp.com",
  projectId: "enventory-management-439c3",
  storageBucket: "enventory-management-439c3.appspot.com",
  messagingSenderId: "906032659701",
  appId: "1:906032659701:web:a524615a7a78db7f5499bc",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth