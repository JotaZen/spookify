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
            <img class="card-img-top imagen-cancion" style="box-shadow: 0px 2px 4px -1px ${cancion.color || "tranparent"};" src="${cancion.portada || "./public/img/no-img.png"}" alt="${cancion.nombre || "Sin Título"}" />
        </div>
        <div class="card-body">
            <p class="card-title titulo-cancion">${cancion.nombre || "Sin Título"}</p>
            <p class="card-text nombre-autor">
                ${cancion.autor || "Anónimo"}
            </p>
            </div>
        <button id="favorite-button" data-id="${id}" class="${cancion.favorito ? "favorite-button-true" : "favorite-button-false"}">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="favorite-button-star" viewBox="0 0 16 16"> 
                <path d="M7.22303 0.665992C7.32551 0.419604 7.67454 0.419604 7.77702 0.665992L9.41343 4.60039C9.45663 4.70426 9.55432 4.77523 9.66645 4.78422L13.914 5.12475C14.18 5.14607 14.2878 5.47802 14.0852 5.65162L10.849 8.42374C10.7636 8.49692 10.7263 8.61176 10.7524 8.72118L11.7411 12.866C11.803 13.1256 11.5206 13.3308 11.2929 13.1917L7.6564 10.9705C7.5604 10.9119 7.43965 10.9119 7.34365 10.9705L3.70718 13.1917C3.47945 13.3308 3.19708 13.1256 3.25899 12.866L4.24769 8.72118C4.2738 8.61176 4.23648 8.49692 4.15105 8.42374L0.914889 5.65162C0.712228 5.47802 0.820086 5.14607 1.08608 5.12475L5.3336 4.78422C5.44573 4.77523 5.54342 4.70426 5.58662 4.60039L7.22303 0.665992Z" fill="currentColor" /> 
            </svg>
        </button>  
    </div>
    `
}

