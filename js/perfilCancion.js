import { getDocs, collection, onSnapshot, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js"
import db from "./firestore.js"
import { tarjeta } from "./canciones.js"

let mostrandoCancion = false

export const mostrarCancion = async (idCancion) => {
    if (mostrandoCancion) {
        console.log("entro")
        document.querySelector(".songs-grid").classList.remove("d-none")
        document.querySelector(".perfil-cancion").classList.add("d-none")
        mostrandoCancion = false
        return
    }
    mostrandoCancion = true
    document.querySelector(".songs-grid").classList.add("d-none")
    document.querySelector(".perfil-cancion").classList.remove("d-none")

    document.querySelector(".perfil-cancion").innerHTML = "Cargando"
    document.getElementById("titulo-grid").innerHTML = ``
    const cancionPerfil = await getDoc(doc(db, 'canciones', idCancion));

    document.getElementById("titulo-grid").innerHTML = `${cancionPerfil.data().nombre || "Sin Título"}`
    document.querySelector(".perfil-cancion").innerHTML = tarjeta(cancionPerfil.data(), cancionPerfil.id)
}

export const volverAInicio = () => {
    document.querySelector(".songs-grid").classList.remove("d-none")
    document.querySelector(".perfil-cancion").classList.add("d-none")
    document.getElementById("titulo-grid").innerHTML = "Lista de Canciones"
    mostrandoCancion = false
}