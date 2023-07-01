import { getDocs, collection, onSnapshot, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js"
import db from "./firestore.js"
import { tarjeta } from "./canciones.js"
import { editarCancion, editarFavorito, eliminarCancion } from "./api.js"
import { aparecer, desaparecer } from "./formulario.js"

let mostrandoCancion = false

const perfilCancion = (cancion, id) => {
    let fecha = "Sin fecha"
    let fecha_ingreso = cancion.fecha_ingreso ? cancion.fecha_ingreso?.split("T")[0] : ""
    if (cancion.fecha) {
        try {
            fecha = cancion.fecha.toDate()
            fecha = fecha.toISOString().split("T")[0]
            fecha = fecha.split("-").reverse().join("-")
        } catch (e) {
            fecha = cancion.fecha
        }
    }
    const onclick = cancion.url ? `onclick="event.stopPropagation(); playSong('${cancion.url}')" ` : "";
    return `
    <div class="h-100 w-100">
        <div id="cancion-banner" class="">
            <img width="192" height="192" src="${cancion.portada || "./public/img/no-img.png"}" alt="" class="">
            <div id="banner-info" class="d-flex flex-column align-content-center">
                <p class="mt-3">Canción ${fecha_ingreso ? '<i> - Agregada el ' + fecha_ingreso.split("-").reverse().join("-") + " a las " + cancion.fecha_ingreso?.split("T")[1].split(".")[0] + '</i>' : ""}</p>
                <h1 class="text-white">${cancion.nombre}</h1>
                <p class="mb-3">
                ${cancion.autor}${cancion.album ? " • <i>" + cancion.album + "</i>" : ""}${" • " + fecha.split("-").reverse().join("-")}${cancion.duracion ? " • " + (Math.floor(cancion.duracion / 60)) : ""}${cancion.duracion ? ":" + (cancion.duracion % 60) : ""}
                </p >
            </div >
        </div>
        <div id="play-perfil">
            <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex justify-content-between align-items-center">
                    <button class="play-button-perfil ${cancion.url ? "" : "play-btn-disabled"}" ${onclick}>
                        <svg role="img" height="32" width="32" aria-hidden="true" viewBox="0 0 24 24">
                            <path id="icono-play" url="${cancion.url}" d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path> 
                            <path id="${cancion.url ? "icono-pause" : ""}" class="d-none" d="M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7H5.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-2.6z"></path>  
                        </svg>
                    </button>          
                </div>
                <button id="favorite-button-perfil" data-id="${id}" class="${cancion.favorito ? "favorite-button-true-perfil" : "favorite-button-false-perfil"}"
                data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Favorito"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="favorite-button-star" viewBox="0 0 16 16"> 
                        <path d="M7.22303 0.665992C7.32551 0.419604 7.67454 0.419604 7.77702 0.665992L9.41343 4.60039C9.45663 4.70426 9.55432 4.77523 9.66645 4.78422L13.914 5.12475C14.18 5.14607 14.2878 5.47802 14.0852 5.65162L10.849 8.42374C10.7636 8.49692 10.7263 8.61176 10.7524 8.72118L11.7411 12.866C11.803 13.1256 11.5206 13.3308 11.2929 13.1917L7.6564 10.9705C7.5604 10.9119 7.43965 10.9119 7.34365 10.9705L3.70718 13.1917C3.47945 13.3308 3.19708 13.1256 3.25899 12.866L4.24769 8.72118C4.2738 8.61176 4.23648 8.49692 4.15105 8.42374L0.914889 5.65162C0.712228 5.47802 0.820086 5.14607 1.08608 5.12475L5.3336 4.78422C5.44573 4.77523 5.54342 4.70426 5.58662 4.60039L7.22303 0.665992Z" fill="currentColor" /> 
                    </svg>
                </button>   
                <button id="dots-button-perfil" data-id="${id}" class="" >
                    <svg role="img" height="48" width="48" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" class="Svg-sc-ytk21e-0 haNxPq">
                        <path d="M4.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm15 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z">
                        </path>
                    </svg>
                </button>  
            </div>  
            <div class="d-flex justify-content-between align-items-center" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Eliminar">
                <button id="eliminar-button-perfil" data-id="${id}" class="rotate-45">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="favorite-button-star" viewBox="0 0 16 16"> 
                        <path d="M15.25 8a.75.75 0 0 1-.75.75H8.75v5.75a.75.75 0 0 1-1.5 0V8.75H1.5a.75.75 0 0 1 0-1.5h5.75V1.5a.75.75 0 0 1 1.5 0v5.75h5.75a.75.75 0 0 1 .75.75z"></path>
                    </svg>
                </button>  
            </div> 
        </div>
        <form id="editar-datos">
            <div id="contenedor-formulario-perfil" class="px-5 mx-5 pt-5">
                <input type="hidden" name="id" value="${id}" />
                <div class="p-1"></div>
                <!-- TITULO -->
                <div class="form-floating">
                  <input
                    id="titulo-input-floating no-placeholder"
                    autocomplete="off"
                    type="text"
                    class="form-control no-placeholder"
                    placeholder="ph"
                    name="nombre"
                    required
                    oninvalid="this.setCustomValidity('El nombre es obligatorio')"
                    oninput="setCustomValidity('')"
                    title="El nombre es obligatorio"
                    value="${cancion.nombre || ""}"
                  />
                  <label class="form-label" for="titulo-input-floating"
                    >Título</label
                  >
                </div>
                <div class="p-1"></div>
                <!-- AUTOR -->
                <div class="form-floating">
                  <input
                    id="artista-input-floating"
                    autocomplete="off"
                    type="text"
                    class="form-control no-placeholder"
                    placeholder="Artista"
                    name="autor"
                    required
                    oninvalid="this.setCustomValidity('El artista es obligatorio')"
                    oninput="setCustomValidity('')"
                    title="El artista es obligatorio"
                    value="${cancion.autor || ""}"
                  />
                  <label class="form-label" for="artista-input-floating"
                    >Artista</label
                  >
                </div>
                <div class="p-1"></div>
                <!-- ALBUM -->
                <div class="form-floating">
                  <input
                    autocomplete="off"
                    type="text"
                    class="form-control no-placeholder"
                    placeholder="Albúm"
                    name="album"
                    value="${cancion.album || ""}"
                  />
                  <label class="form-label">Albúm</label>
                </div>
                <div class="p-1"></div>
                <!-- DURACION -->
                <div class="form-floating">
                  <input
                    autocomplete="off"
                    type="text"
                    inputmode="numeric"
                    class="form-control no-placeholder"
                    placeholder="Duración"
                    name="duracion"
                    onkeypress="return /\\d/.test(String.fromCharCode(event.keyCode || event.which))"
                    value="${cancion.duracion || ""}"
                  />
                  <label class="form-label">Duración</label>
                </div>
                <div class="p-1"></div>
                <!-- FECHA -->
                <div class="form-floating">
                  <input
                    id="fecha-input-floating"
                    class="form-control no-placeholder"
                    autocomplete="off"
                   
                    ${fecha == "Sin fecha" ? 'type="text" ' + 'onfocus="(this.type=' + "'" + "date'" + ')"' : 'type="date"'}
                    onblur = "if(!this.value && ${fecha == "Sin fecha"})this.type='text'"
                    placeholder = "Fecha de Publicación"
                    name = "fecha"
                    value = "${fecha == "Sin fecha" ? "" : fecha}"
                        />
                        <label class="form-label" for="fecha-input-floating">
                            Fecha de Publicación
                        </label>
                </div >

                <div class="p-1"></div>
                <hr />
                <!--URL -->
                <div class="form-floating">
                  <input
                    autocomplete="off"
                    type="text"
                    class="form-control vista-previa-setter no-placeholder"
                    placeholder="Link de Youtube"
                    name="url"
                    oninvalid="this.setCustomValidity('Introduce una url válida')"
                    oninput="setCustomValidity('')"
                    value="${cancion.url || ""}"
                  />
                  <label class="form-label">Link de Youtube</label>
                </div>
                <div class="p-1"></div>
                <!--PORTADA -->
                <div class="form-floating">
                  <input
                    autocomplete="off"
                    type="text"
                    class="form-control vista-previa-setter no-placeholder"
                    placeholder="Link de la portada"
                    name="portada"
                    value="${cancion.portada || ""}"
                  />
                  <label class="form-label">Link de la portada</label>
                </div>
                <div class="p-1"></div>
                <!-- COLOR -->
                <div class="form-floating w-100">
                  <input
                    autocomplete="off"
                    type="color"
                    inputmode="numeric"
                    class="form-control no-placeholder form-control-color w-100"
                    placeholder="Color"
                    name="color"
                    value="${cancion.color || ""}"
                  />
                  <label class="form-label">Fondo</label>
                </div>
                <div class="p-1"></div>
                <div class="position-relative">
                    <div id="boton-editar-cancion">
                        <button id="boton-editar-cancion-click" type="submit">
                        Editar canción
                        </button>
                    </div>
                </div>
            </div >
            </form >
            <div class="p-5"></div>
        </div >
    `
}

export const mostrarCancion = async (idCancion) => {
    if (mostrandoCancion) {
        document.querySelector(".songs-grid").classList.remove("d-none")
        document.querySelector(".perfil-cancion").classList.add("d-none")
        mostrandoCancion = false
        return
    }
    mostrandoCancion = true
    //Escoder grid y mostrar perfil
    document.querySelector(".songs-grid").classList.add("d-none")
    document.querySelector(".perfil-cancion").classList.remove("d-none")

    //Cambiar color de fondo
    const biblioRef = document.querySelector(".biblioteca")
    biblioRef && biblioRef.classList.add("biblioteca-2")
    biblioRef && biblioRef.classList.remove("biblioteca")


    // Esconder form
    desaparecer(document.getElementById("boton-limpiar"))
    document.getElementById("formulario-canciones").reset()
    desaparecer(document.getElementById("contenedor-formulario"))
    desaparecer(document.querySelector(".boton-agregar"))
    document.getElementById("titulo-grid").classList.add("d-none")

    //Mostrar perfil
    document.querySelector(".perfil-cancion").innerHTML = ""
    const cancionPerfil = await getDoc(doc(db, 'canciones', idCancion));
    // Color de fondo o aleatorio
    document.querySelector(".biblioteca-2").style.backgroundColor = cancionPerfil.data().color ||
        `rgb( ${Math.floor(255 * Math.random())}, ${Math.floor(255 * Math.random())}, ${Math.floor(255 * Math.random())},${Math.floor(100 * Math.random())})`

    document.querySelector(".perfil-cancion").innerHTML = perfilCancion(cancionPerfil.data(), cancionPerfil.id)

    // Favorito
    const botonFav = document.getElementById("favorite-button-perfil")
    botonFav.addEventListener("click", async (e) => {
        e.stopPropagation();
        e.preventDefault();
        const idCancion = e.currentTarget.dataset.id;
        if (e.currentTarget.classList.contains("favorite-button-true-perfil")) {
            e.currentTarget.classList.remove("favorite-button-true-perfil")
            e.currentTarget.classList.add("favorite-button-false-perfil")
            await editarFavorito(idCancion, false)
        } else {
            e.currentTarget.classList.remove("favorite-button-false-perfil")
            e.currentTarget.classList.add("favorite-button-true-perfil")
            await editarFavorito(idCancion, true)
        }
    })

    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

    // Eliminar
    document.getElementById("eliminar-button-perfil").addEventListener("click", async (e) => {
        e.stopPropagation();
        e.preventDefault();
        eliminarCancion(idCancion)
    })

    const formularioEditar = document.getElementById("editar-datos");
    formularioEditar.addEventListener("submit", async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(formularioEditar));
        const botonEditar = document.getElementById("boton-editar-cancion-click");
        botonEditar.disabled = true;
        botonEditar.innerText = "Editando..."
        await editarCancion(data, idCancion).then(() => {
            mostrandoCancion = false
            mostrarCancion(idCancion)
        })
        botonEditar.innerText = "Editar canción"
        botonEditar.disabled = false;
    })

}

export const volverAInicio = () => {
    // Reestablece todo
    document.querySelector(".songs-grid").classList.remove("d-none")
    document.querySelector(".perfil-cancion").classList.add("d-none")
    document.getElementById("titulo-grid").classList.remove("d-none")
    aparecer(document.getElementById("contenedor-formulario"))
    aparecer(document.querySelector(".boton-agregar"))
    aparecer(document.getElementById("boton-limpiar"))
    const biblio2 = document.querySelector(".biblioteca-2")
    if (biblio2) {
        biblio2.classList.add("biblioteca")
        biblio2.classList.remove("biblioteca-2")
        biblio2.style.backgroundColor = ""
    }

    mostrandoCancion = false
}