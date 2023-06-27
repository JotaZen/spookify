import { consultarDB, suscribirseABDD } from "./api.js";
import { tarjeta } from "./canciones.js";
import db from "./firestore.js";

window.addEventListener("DOMContentLoaded", async () => {

    suscribirseABDD((canciones) => {
        // const canciones = await consultarDB("canciones");
        const grilla = document.querySelector(".songs-grid div.row");

        let contenido = ""
        canciones.forEach(cancion => {

            contenido += `
                <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 pb-4">
                    ${tarjeta(cancion.data())}
                </div> 
             `

        })


        grilla.innerHTML = contenido;
    })
})