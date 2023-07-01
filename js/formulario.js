
export const aparecer = (elemento) => {
    elemento.classList.remove("smooth-hidden-out")
    elemento.classList.add("smooth-hidden-in")
}
export const desaparecer = (elemento) => {
    elemento.classList.remove("smooth-hidden-in")
    elemento.classList.add("smooth-hidden-out")
}

export const setVistaPrevia = () => {
    const portada = document.querySelector("input[name='portada']").value
    const url = document.querySelector("input[name='url']").value

    const divVideo = document.getElementById("vista-previa-video")
    const divPortada = document.getElementById("vista-previa-portada")

    if (url) {
        try {
            const id = url.split("v=")[1].split("&")[0]
            divVideo.src = `https://www.youtube.com/embed/${id}`
            aparecer(divVideo)
        } catch {
            desaparecer(divVideo)
            setTimeout(() => {
                divVideo.src = ""
            }, 500);
        }
    } else {
        desaparecer(divVideo)
        setTimeout(() => {
            divVideo.src = ""
        }, 500);
    }
    if (portada) {
        aparecer(divPortada)
        divPortada.src = portada
    } else {
        desaparecer(divPortada)
    }
}

export const unsetVistaPrevia = () => {
    // Quitar vista previa
    const divVideo = document.getElementById("vista-previa-video")
    const divPortada = document.getElementById("vista-previa-portada")
    desaparecer(divVideo)
    desaparecer(divPortada)
    document.getElementById("vista-previa-video").src = ""
}

export const validarData = (data) => {
    // console.log(/^(http(s)??\:\/\/)?(www\.)?((youtube\.com\/watch\?v=)|(youtu.be\/))([a-zA-Z0-9\-_])+/.test(data.url))
    const resultado = {
        errores: [],
        valid: true
    }
    if (!data.nombre || !(data.nombre.trim())) {
        resultado.errores.push("El nombre es obligatorio")
        resultado.valid = false
    }
    if (!data.autor || !(data.autor.trim())) {
        resultado.errores.push("El autor es obligatorio")
        resultado.valid = false
    }
    console.log(parseInt(data.duracion))
    if (data.duracion && (!parseInt(data.duracion) || parseInt(data.duracion) < 0)) {
        resultado.errores.push("La duración debe ser un número válido")
        resultado.valid = false
    }
    if (data.url && !/^(http(s)??\:\/\/)?(www\.)?((youtube\.com\/watch\?v=)|(youtu.be\/))([a-zA-Z0-9\-_])+/.test(data.url)) {
        resultado.errores.push("La Url del video no es válida")
        resultado.valid = false
    }

    return resultado

}

