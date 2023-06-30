import { agregarCancion, consultarDB, editarFavorito, eliminarCancion, suscribirseABDD } from "./api.js";
import { tarjeta } from "./canciones.js";
import db from "./firestore.js";
import { getDocs, collection, onSnapshot, query } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js"
import { mostrarCancion, volverAInicio } from "./perfilCancion.js";
import { setVistaPrevia, unsetVistaPrevia } from "./formulario.js";

window.addEventListener("DOMContentLoaded", async () => {
    // Consultar DB y mostrar canciones
    suscribirseABDD((canciones) => {
        // const canciones = await consultarDB("canciones");
        const grilla = document.querySelector(".songs-grid div.row");
        let contenido = ""

        canciones.forEach(cancion => {
            contenido += `
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-2 pb-4">
            ${tarjeta(cancion.data(), cancion.id)}
            </div> 
            `
        })
        grilla.innerHTML = contenido;
        // Ver como juntar con el de abajo
        const botonFavorito = document.querySelectorAll("#favorite-button")
        botonFavorito.forEach((boton) => {
            boton.addEventListener("click", async (e) => {
                e.stopPropagation();
                e.preventDefault();
                const idCancion = e.currentTarget.dataset.id;
                if (e.currentTarget.classList.contains("favorite-button-true")) {
                    e.currentTarget.classList.remove("favorite-button-true")
                    e.currentTarget.classList.add("favorite-button-false")
                    await editarFavorito(idCancion, false)
                } else {
                    e.currentTarget.classList.remove("favorite-button-false")
                    e.currentTarget.classList.add("favorite-button-true")
                    await editarFavorito(idCancion, true)
                }
            })
        })
        //
        document.querySelectorAll(".cancion-card").forEach((cancion) => {
            cancion.addEventListener("click", async (e) => {
                e.preventDefault();
                e.stopPropagation();
                const idCancion = e.currentTarget.dataset.id;
                mostrarCancion(idCancion);
            })
        })
    })

    const formulario = document.getElementById("formulario-canciones");
    formulario.addEventListener("submit", async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(formulario));
        console.log(data)

    })
    document.querySelectorAll(".vista-previa-setter").forEach((input) => {
        input.addEventListener("blur", async (e) => {
            setVistaPrevia()
        })
    })
    document.getElementById("boton-limpiar-click").addEventListener("click", () => {
        formulario.reset();
        unsetVistaPrevia();
    })
})

// Asignar eventos
document.getElementById("boton-flecha-volver").addEventListener("click", () => {
    volverAInicio();
})



