let isPlaying = false
let currentSong

const playSong = (url) => {
    // Pausa
    if (isPlaying && currentSong === url) {
        document.getElementById('yutu_player').src = 'https://www.youtube.com/embed'
        isPlaying = false
        currentSong = null

        // Player
        document.getElementById("yutu_player").classList.remove('smooth-hidden-in')
        document.getElementById("yutu_player").classList.add('smooth-hidden-out')

        // Iconos
        document.querySelectorAll("#icono-play").forEach(icono => icono.classList.remove('d-none'))
        document.querySelectorAll("#icono-pause").forEach(icono => icono.classList.add('d-none'))
        return
    } else if (isPlaying) {

        document.getElementById("yutu_player").classList.remove('smooth-hidden-in')
        document.getElementById("yutu_player").classList.add('smooth-hidden-out')
    }
    // Player
    document.getElementById("yutu_player").classList.remove('smooth-hidden-out')
    document.getElementById("yutu_player").classList.add('smooth-hidden-in')

    const id = url.split("v=")[1].split("&")[0]
    console.log(`Reproduciendo: ${url}`)
    document.getElementById('yutu_player').src = `https://www.youtube.com/embed/${id}?autoplay=1`

    // Ocultar iconos
    document.querySelectorAll("#icono-play").forEach(icono => icono.classList.remove('d-none'))
    document.querySelectorAll("#icono-pause").forEach(icono => icono.classList.add('d-none'))

    // Cambiar icono de canción actual
    document.querySelector(`path[url="${url}"]`).classList.add('d-none')
    document.querySelector(`path[url="${url}"]`).nextElementSibling.classList.remove('d-none')
    isPlaying = true
    currentSong = url


}