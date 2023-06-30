export const validarFormulario = (formulario) => {


}

export const setVistaPrevia = () => {
    const portada = document.querySelector("input[name='portada']").value
    const url = document.querySelector("input[name='url']").value

    if (url) {
        const id = url.split("v=")[1]
        document.getElementById("vista-previa-video").src = `https://www.youtube.com/embed/${id}`
    } else {
        document.getElementById("vista-previa-video").src = ""
    }
    if (portada) {
        document.getElementById("vista-previa-portada").classList.remove("d-none")
        document.getElementById("vista-previa-portada").src = portada
    } else {
        document.getElementById("vista-previa-portada").classList.add("d-none")
    }
}

export const unsetVistaPrevia = () => {
    document.getElementById("vista-previa-video").src = ""
    document.getElementById("vista-previa-portada").classList.add("d-none")
}
