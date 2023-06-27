let isPlaying = false
let currentSong

const playSong = (url) => {
    if (isPlaying && currentSong === url) {
        document.getElementById('yutu_player').src = 'https://www.youtube.com/embed'
        isPlaying = false
        currentSong = null
        document.querySelectorAll("#icono-play").forEach(icono => icono.classList.remove('d-none'))
        document.querySelectorAll("#icono-pause").forEach(icono => icono.classList.add('d-none'))
    } else {
        const id = url.split("v=")[1]
        console.log(url)
        document.getElementById('yutu_player').src = `https://www.youtube.com/embed/${id}?autoplay=1`
        document.querySelectorAll("#icono-play").forEach(icono => icono.classList.remove('d-none'))
        document.querySelectorAll("#icono-pause").forEach(icono => icono.classList.add('d-none'))
        document.querySelector(`path[url="${url}"]`).classList.add('d-none')
        document.querySelector(`path[url="${url}"]`).nextElementSibling.classList.remove('d-none')
        isPlaying = true
        currentSong = url
        fetch(`https://www.youtube.com/embed/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        }).then(() => { }).catch((err) => {
            playSong(url)
            console.log(err)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se pudo reproducir la canción (No existe o está protegida por derechos de autor)',
            })
        })
    }
}