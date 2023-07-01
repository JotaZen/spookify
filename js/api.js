import { getDocs, getDoc, collection, onSnapshot, addDoc, deleteDoc, doc, query, where, orderBy, updateDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js"
import db from "./firestore.js";
import { volverAInicio } from "./perfilCancion.js";
import { validarData } from "./formulario.js";

export const consultarDB = async (coleccion) => {
    const querySnapshot = await getDocs(collection(db, coleccion));
    return querySnapshot;
}

export const suscribirseABDD = async (callback, id, condicion) => {
    const q = !id ? query(collection(db, "canciones"), orderBy("nombre")) : query(collection(db, "canciones"), where("id", "==", id));
    onSnapshot(q, callback)
}

export const agregarCancion = async (cancion) => {
    console.log(cancion)
    const resultado = validarData(cancion)
    if (!resultado.valid) {
        Swal.fire({
            icon: 'error',
            color: 'white',
            background: '#181818',
            title: 'Error al agregar',
            text: resultado.errores.join("\n"),
            position: 'top-end',
            toast: true,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        return;
    }
    const cancionFormateada = {
        nombre: cancion.nombre ? cancion.nombre.trim() : null,
        autor: cancion.autor ? cancion.autor.trim() : null,
        album: cancion.album ? cancion.album.trim() : null,
        duracion: parseInt(cancion.duracion || 0) || null,
        fecha: (cancion.fecha == "Sin fecha" || !cancion.fecha) ? null : cancion.fecha,
        fecha_ingreso: new Date().toISOString(),
        portada: cancion.portada ? cancion.portada.trim() : null,
        color: cancion.color == "#000000" ? null : cancion.color,
        url: cancion.url ? cancion.url.trim() : null,
    }

    try {

        await addDoc(collection(db, 'canciones'), cancionFormateada);
        Swal.fire({
            icon: 'success',
            color: 'white',
            background: '#181818',
            title: `${cancionFormateada.nombre || "Sin Título"} agregado`,
            position: 'top-end',
            toast: true,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
    } catch (e) {
        Swal.fire({
            icon: 'error',
            color: 'white',
            background: '#181818',
            title: 'Error al agregar ' + (cancion.nombre || "Sin Título"),
            position: 'top-end',
            toast: true,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
    }
}

export const editarCancion = async (cancionEditada, id) => {
    const resultado = validarData(cancionEditada)
    console.log(resultado)
    if (!resultado.valid) {
        Swal.fire({
            icon: 'error',
            color: 'white',
            background: '#181818',
            title: 'Error al editar',
            text: resultado.errores.join("\n"),
            position: 'top-end',
            toast: true,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        return
    }

    const cancionFormateada = {
        nombre: cancionEditada.nombre ? cancionEditada.nombre.trim() : null,
        autor: cancionEditada.autor ? cancionEditada.autor.trim() : null,
        album: cancionEditada.album ? cancionEditada.album.trim() : null,
        duracion: parseInt(cancionEditada.duracion || 0) || null,
        fecha: cancionEditada.fecha == "Sin fecha" ? null : cancionEditada.fecha,
        // fecha_ingreso: cancionEditada.fecha_ingreso || new Date().toISOString(),
        portada: cancionEditada.portada ? cancionEditada.portada.trim() : null,
        color: cancionEditada.color == "#000000" ? null : cancionEditada.color,
        url: cancionEditada.url ? cancionEditada.url.trim() : null,
    }
    if (!cancionEditada.fecha_ingreso) {
        Object.assign(cancionFormateada, { fecha_ingreso: new Date().toISOString() })
    }

    console.log("Editando: ", cancionFormateada)
    const cancion = doc(db, "canciones", id);
    await updateDoc(cancion, cancionFormateada).then(() => {
        Swal.fire({
            icon: 'success',
            color: 'white',
            background: 'green',
            title: "Canción: " + cancionFormateada.nombre + " editada",
            position: 'top-end',
            toast: true,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
    }).catch((error) => {
        Swal.fire({
            icon: 'error',
            color: 'white',
            background: '#181818',
            title: 'Error al editar',
            text: resultado.errores.join("\n"),
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            toast: true,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
    })

}

export const eliminarCancion = async (id) => {

    const cancionRef = doc(db, "canciones", id);
    const cancion = await getDoc(cancionRef);
    if (!cancion.exists()) {
        Swal.fire({
            icon: 'error',
            color: 'white',
            background: '#181818',
            title: 'No existe la canción',
            position: 'top-end',
            toast: true,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        return
    } else if (cancion.data().favorito) {
        Swal.fire({
            icon: 'error',
            color: 'white',
            background: '#181818',
            title: 'No se puede eliminar una canción favorita',
            position: 'top-end',
            toast: true,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        return
    }
    await Swal.fire({
        title: '¿Estás seguro?',
        icon: 'warning',
        color: 'white',
        background: '#181818',
        showCancelButton: true,
        confirmButtonColor: 'teal',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Eliminar'
    }).then((result) => {
        if (result.isConfirmed) {
            deleteDoc(cancionRef).then(() => {
                Swal.fire({
                    icon: 'success',
                    color: 'white',
                    background: 'green',
                    title: 'Canción eliminada',
                    showConfirmButton: false,
                    timer: 3000,
                    toast: true,
                    timerProgressBar: true,
                    position: 'top-end',
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
                volverAInicio()
            }).catch((error) => {
                Swal.fire({
                    icon: 'error',
                    color: 'white',
                    background: '#181818',
                    title: 'Error al eliminar',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
            })
        }
    })


}

export const editarFavorito = async (id, agregar = true) => {
    const cancion = doc(db, "canciones", id);

    await updateDoc(cancion, {
        favorito: agregar ? 1 : 0
    });
}
