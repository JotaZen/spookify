export const validarFormulario = (formulario) => {


}
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
        const id = url.split("v=")[1].split("&")[0]
        divVideo.src = `https://www.youtube.com/embed/${id}`
        aparecer(divVideo)
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
    const divVideo = document.getElementById("vista-previa-video")
    const divPortada = document.getElementById("vista-previa-portada")
    desaparecer(divVideo)
    desaparecer(divPortada)
    document.getElementById("vista-previa-video").src = ""
}

export const validarData = (data) => {
    if (!data.nombre || !data.autor) {
        return false
    }
    else if (data.duracion && parseInt(data.duracion) == NaN) {
        return false
    }
    return true

}