let isPlaying = false
let currentSong

const playSong = (url) => {
    if (isPlaying && currentSong === url) {
        document.getElementById('yutu_player').src = 'https://www.youtube.com/embed'
        isPlaying = false
        currentSong = null

        // Player
        document.getElementById("yutu_player").classList.remove('smoth-hidden-in')
        document.getElementById("yutu_player").classList.add('smoth-hidden-out')

        // Iconos
        document.querySelectorAll("#icono-play").forEach(icono => icono.classList.remove('d-none'))
        document.querySelectorAll("#icono-pause").forEach(icono => icono.classList.add('d-none'))
        return
    } else if (isPlaying) {
        document.getElementById("yutu_player").classList.remove('smoth-hidden-in')
        document.getElementById("yutu_player").classList.add('smoth-hidden-out')
    }
    // Player
    document.getElementById("yutu_player").classList.remove('smoth-hidden-out')
    document.getElementById("yutu_player").classList.add('smoth-hidden-in')

    const id = url.split("v=")[1]
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
    // fetch(`https://www.youtube.com/embed/${id}`, {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Access-Control-Allow-Origin': '*',
    //     }
    // }).then(() => { }).catch((err) => {
    //     playSong(url)
    //     console.log(err)
    //     Swal.fire({
    //         icon: 'error',
    //         title: 'Oops...',
    //         text: 'No se pudo reproducir la canción (No existe o está protegida por derechos de autor)',
    //     })
    // })

}