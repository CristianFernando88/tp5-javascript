let datosCache = [];
const contenedor = document.getElementById("contenedor-cards");
const mostrarLoading = (texto)=>{
    contenedor.innerHTML = texto;
    
}

const renderizarCards=(datos)=>{
    
    contenedor.innerHTML = datos.map(dato=>{
        return `
            <div class="card">
                <div class="card-image">
                    <img src="${dato.image}" alt="${dato.name}" loading="lazy">
                </div>
                <div class="card-title">
                    <h2>${dato.name}</h2>
                </div>
                <div class="card-body">
                    <p>📊 Estado: ${dato.status}</p>
                    <p>🧬 Especie: ${dato.species}</p> 
                    <p>📌 Tipo: ${dato.type || "Desconocido"}</p> 
                </div>           
            </div>
        `
    }).join();

    
}

const cargarRickAndMorty = async () => {
  /* mostrarLoading("Cargando personajes de Rick and Morty..."); */
//console.log("Cargando personajes de Rick and Morty...");
    mostrarLoading("Cargando personajes de Rick and Morty...");
  try {
    // (a) función async + fetch
    const response = await fetch("https://rickandmortyapi.com/api/character");

    // (b) verificar response.ok
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

    const data = await response.json();
    datosCache = data.results;
    renderizarCards(datosCache);
    console.log(datosCache);
    //renderRickAndMorty(datosCache);

  } catch (error) {
    // (f) mostrar error visible
    mostrarError(`No se pudieron cargar los personajes: ${error.message}`);
  }
};
cargarRickAndMorty();
console.log("api-demo");
console.log(datosCache);