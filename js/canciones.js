export const tarjeta = (cancion, id) => {
    const onclick = cancion.url ? `onclick="event.stopPropagation(); playSong('${cancion.url}')" ` : "";
    return `
    <div class="card bg-card text-white h-100 cancion-card" data-id="${id}">
        <div class="position-relative">
            <button class="play-button ${cancion.url ? "" : "play-btn-disabled"}" ${onclick}>
                <svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24">
                      <path id="icono-play" url="${cancion.url}" d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
                      <path id="${cancion.url ? "icono-pause" : ""}" class="d-none" d="M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7H5.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-2.6z"></path>  
                </svg>
            </button>    
            <img class="card-img-top imagen-cancion" src="${cancion.portada || "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png"}" alt="${cancion.nombre || "Sin Título"}" />
        </div>
        <div class="card-body">
            <p class="card-title titulo-cancion">${cancion.nombre || "Sin Título"}</p>
            <p class="card-text nombre-autor">
            ${cancion.autor || "Anónimo"}
            </p>
        </div>
    </div>
    `
}

