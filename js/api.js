import { getDocs, collection, onSnapshot, addDoc, deleteDoc, doc, query, where, orderBy, updateDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js"
import db from "./firestore.js";

export const consultarDB = async (coleccion) => {
    const querySnapshot = await getDocs(collection(db, coleccion));
    // const datos = querySnapshot.docs.map((doc) => ({
    //     id: doc.id,
    //     ...doc.data(),
    // }));
    return querySnapshot;
}


export const suscribirseABDD = async (callback, id, condicion) => {
    const q = !id ? query(collection(db, "canciones"), orderBy("nombre")) : query(collection(db, "canciones"), where("id", "==", id));
    onSnapshot(q, callback)
}
// query(collection(db, 'canciones'), orderBy("fecha_ingreso"))
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

export const editarCancion = async (id, llave, valor) => {
    const cancion = doc(db, "canciones", id);
    await updateDoc(cancion, {
        [llave]: valor
    });

}

export const eliminarCancion = async (id) => {
    deleteDoc(doc(db, "canciones", docuenena.id));
}

export const editarFavorito = async (id, agregar = true) => {

    const cancion = doc(db, "canciones", id);

    await updateDoc(cancion, {
        favorito: agregar ? 1 : 0
    });
}
