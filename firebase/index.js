import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCc-uoQ0NVCeKr6lt9VcUrBBoqK2vxN6Zg",
    authDomain: "commerse-481c9.firebaseapp.com",
    databaseURL: "https://commerse-481c9-default-rtdb.firebaseio.com",
    projectId: "commerse-481c9",
    storageBucket: "commerse-481c9.appspot.com",
    messagingSenderId: "796356547514",
    appId: "1:796356547514:web:cded4aaaef8531fc2d4383",
    measurementId: "G-RDK2ZZKEGK"
};

const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const firestore = getFirestore(app)
export default app