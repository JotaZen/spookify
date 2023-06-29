import { agregarCancion, consultarDB, eliminarCancion, suscribirseABDD } from "./api.js";
import { tarjeta } from "./canciones.js";
import db from "./firestore.js";
import { getDocs, collection, onSnapshot } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js"
import { mostrarCancion, volverAInicio } from "./perfilCancion.js";

window.addEventListener("DOMContentLoaded", async () => {
    // Consultar DB y mostrar canciones
    suscribirseABDD((canciones) => {
        // const canciones = await consultarDB("canciones");
        const grilla = document.querySelector(".songs-grid div.row");
        let contenido = ""
        canciones.forEach(cancion => {
            contenido += `
                <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 pb-4">
                    ${tarjeta(cancion.data(), cancion.id)}
                </div> 
             `
        })
        grilla.innerHTML = contenido;
        document.querySelectorAll(".cancion-card").forEach((cancion) => {
            cancion.addEventListener("click", async (e) => {
                e.preventDefault();
                e.stopPropagation();
                const idCancion = e.currentTarget.dataset.id;
                mostrarCancion(idCancion);
            })
        })

    })
    // eliminarCancion("https://www.youtube.com/watch?v=wcRWttA4o9M")
})

// Asignar eventos
document.getElementById("boton-flecha-volver").addEventListener("click", () => {
    volverAInicio();
})