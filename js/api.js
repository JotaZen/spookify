import { getDocs, collection, onSnapshot, addDoc, deleteDoc, doc, query, where } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js"
import db from "./firestore.js";

export const consultarDB = async (coleccion) => {
    const querySnapshot = await getDocs(collection(db, coleccion));
    // const datos = querySnapshot.docs.map((doc) => ({
    //     id: doc.id,
    //     ...doc.data(),
    // }));
    return querySnapshot;
}


export const suscribirseABDD = async (callback, id) => {
    id ? onSnapshot(collection(db, 'canciones', id), callback) : onSnapshot(collection(db, 'canciones'), callback)
}

export const agregarCancion = async (cancion) => {
    try {
        await addDoc(collection(db, 'canciones'), cancion);
        Swal.fire({
            icon: 'success',
            color: 'white',
            background: '#181818',
            title: 'Canción agregada',
            showConfirmButton: false,
            timer: 1500
        })
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export const editarCancion = async (cancion) => {

}

export const eliminarCancion = async (id) => {

    const docsRef = await collection(db, 'canciones');
    const q = await query(docsRef, where("url", "==", id));

    const docu = await getDocs(q)
    docu.forEach((docuenena) => {
        deleteDoc(doc(db, "canciones", docuenena.id));
        console.log(docuenena.id)
    }
    )
}
