import { agregarCancion, consultarDB, editarFavorito, eliminarCancion, suscribirseABDD } from "./api.js";
import { tarjeta } from "./canciones.js";
import db from "./firestore.js";
import { getDocs, collection, onSnapshot, query } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js"
import { mostrarCancion, volverAInicio } from "./perfilCancion.js";
import { setVistaPrevia, unsetVistaPrevia } from "./formulario.js";

let sortFunction = (a, b) => {
    return (new Date(b.fecha_ingreso).getTime() || 0) - (new Date(a.fecha_ingreso).getTime() || 0)
}

window.addEventListener("DOMContentLoaded", async () => {

    const generarGrid = (canciones, sortFunction2 = sortFunction
    ) => {
        const grilla = document.querySelector(".songs-grid div.row");
        let contenido = ""

        const arrayCanciones = canciones.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        arrayCanciones.sort(sortFunction2);

        arrayCanciones.forEach(cancion => {
            contenido += `
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-2 pb-4">
                    ${tarjeta(cancion, cancion.id)}
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
    }
    // Consultar DB y mostrar canciones
    suscribirseABDD((canciones) => { generarGrid(canciones, sortFunction) })


    // mostrarCancion("fuK5DeSW8pU3pIUmaMsy");

    const formulario = document.getElementById("formulario-canciones");
    formulario.addEventListener("submit", async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(formulario));
        console.log(data)
        const botonAgregar = document.querySelector(".boton-agregar");
        botonAgregar.disabled = true;
        botonAgregar.classList.add("rotate-45");
        await agregarCancion(data).then(() => {
            formulario.reset();
            unsetVistaPrevia();
        })
        botonAgregar.classList.remove("rotate-45");
        botonAgregar.disabled = false;

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

    // Ordenar canciones
    const selectOrdenar = document.getElementById("select-ordenar");
    selectOrdenar.addEventListener("change", async (e) => {
        e.preventDefault();
        console.log(e.target.value)
        switch (e.target.value) {
            case "1":
                sortFunction = (a, b) => a.nombre.toLowerCase().localeCompare(b.nombre.toLowerCase());
                break;
            case "2":
                sortFunction = (a, b) => b.nombre.toLowerCase().localeCompare(a.nombre.toLowerCase());
                break;
            case "3":
                sortFunction = (a, b) => { return (new Date(b.fecha_ingreso).getTime() || 0) - (new Date(a.fecha_ingreso).getTime() || 0) };
                break;
            case "4":
                sortFunction = (a, b) => { return (new Date(a.fecha_ingreso).getTime() || 0) - (new Date(b.fecha_ingreso).getTime() || 0) };
        }
        suscribirseABDD((canciones) => { generarGrid(canciones, sortFunction) })
    })

})
// Asignar eventos
document.getElementById("boton-flecha-volver").addEventListener("click", () => {
    volverAInicio();
})
document.getElementById("boton-inicio-sidebar").addEventListener("click", () => {
    volverAInicio();
})



