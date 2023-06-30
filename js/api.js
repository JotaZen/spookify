import { getDocs, getDoc, collection, onSnapshot, addDoc, deleteDoc, doc, query, where, orderBy, updateDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js"
import db from "./firestore.js";
import { volverAInicio } from "./perfilCancion.js";
import { validarData } from "./formulario.js";

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
    console.log(cancion)
    if (!validarData(cancion)) {
        Swal.fire({
            icon: 'error',
            color: 'white',
            background: '#181818',
            title: 'Error al agregar',
            position: 'top-end',
            toast: true,
            showConfirmButton: false,
            timer: 2200,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        return;
    }
    const cancionFormateada = {
        nombre: cancion.nombre || null,
        autor: cancion.autor || null,
        album: cancion.album || null,
        duracion: parseInt(cancion.duracion || 0) || null,
        fecha: (cancion.fecha == "Sin fecha" || !cancion.fecha) ? null : cancion.fecha,
        fecha_ingreso: new Date().toISOString(),
        portada: cancion.portada || null,
        color: cancion.color == "#000000" ? null : cancion.color,
        url: cancion.url || null,
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
            timer: 2200,
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
            timer: 2200,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
    }
}

export const editarCancion = async (cancionEditada, id) => {

    if (!validarData(cancionEditada)) {
        Swal.fire({
            icon: 'error',
            color: 'white',
            background: '#181818',
            title: 'Error al editar',
            position: 'top-end',
            toast: true,
            showConfirmButton: false,
            timer: 2200,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        return
    }

    const cancionFormateada = {
        nombre: cancionEditada.nombre || null,
        autor: cancionEditada.autor || null,
        album: cancionEditada.album || null,
        duracion: parseInt(cancionEditada.duracion || 0) || null,
        fecha: cancionEditada.fecha == "Sin fecha" ? null : cancionEditada.fecha,
        // fecha_ingreso: cancionEditada.fecha_ingreso || new Date().toISOString(),
        portada: cancionEditada.portada || null,
        color: cancionEditada.color == "#000000" ? null : cancionEditada.color,
        url: cancionEditada.url || null,
    }
    if (!cancionFormateada.fecha_ingreso) {
        Object.assign(cancionFormateada, { fecha_ingreso: new Date().toISOString() })
    }

    console.log("Editando: ", cancionFormateada)
    const cancion = doc(db, "canciones", id);
    await updateDoc(cancion, cancionFormateada).then(() => {
        Swal.fire({
            icon: 'success',
            color: 'white',
            background: 'green',
            title: 'Canción editada',
            position: 'top-end',
            toast: true,
            showConfirmButton: false,
            timer: 2200,
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
            position: 'top-end',
            showConfirmButton: false,
            timer: 2200,
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
            timer: 2200,
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
            timer: 2200,
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
                    timer: 2200,
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
                    timer: 2200,
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
