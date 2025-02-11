// importar las funciones de firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js"
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const url = new URLSearchParams(window.location.search);
const apiKey = await url.get('key');

const firebaseConfig = {
    apiKey: "AIzaSyBHgX4GNvN9rOcMnM6HqmsRQX5AInd2YmU", // Te la regalo usala, pero literal puedes sacar una gratis por que querrias esta xd 
    authDomain: "biblitecamusical.firebaseapp.com",
    projectId: "biblitecamusical",
    storageBucket: "biblitecamusical.firebasestorage.app",    
    messagingSenderId: "476549013944",
    appId: "1:476549013944:web:6aff6572085db0f9f22f4d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export default db;
