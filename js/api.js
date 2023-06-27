import { getDocs, collection, onSnapshot } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js"
import db from "./firestore.js";

export const consultarDB = async (coleccion) => {
    const querySnapshot = await getDocs(collection(db, coleccion));
    // const datos = querySnapshot.docs.map((doc) => ({
    //     id: doc.id,
    //     ...doc.data(),
    // }));
    return querySnapshot;
}

export const suscribirseABDD = async (callback) => {
    onSnapshot(collection(db, 'canciones'), callback)
}

export const agregarCancion = async (cancion) => {}
