let datosCache = [];
const contenedor = document.getElementById("contenedor-cards");
const searchInput = document.getElementById("searchInput");
const searchMessage = document.getElementById("searchMessage");

const mostrarLoading = (texto) => {
    contenedor.innerHTML = `<div class="loading">${texto}</div>`;
}

const mostrarError = (error) => {
    contenedor.innerHTML = `<div class="error-message">${error}</div>`;
}

const renderizarCards = (datos) => {
    if (!datos || datos.length === 0) {
        contenedor.innerHTML = `<div class="no-results">No se encontraron personajes</div>`;
        return;
    }
    
    contenedor.innerHTML = datos.map(dato => {
        return `
            <div class="card">
                <div class="card-image">
                    <img src="${dato.image}" alt="${dato.name}" loading="lazy">
                </div>
                <div class="card-title">
                    <h2>${dato.name}</h2>
                </div>
                <div class="card-body">
                    <p><i class="fa-solid fa-chart-simple"></i> Estado: ${dato.status}</p>
                    <p><i class="fa-solid fa-id-card-clip"></i> Especie: ${dato.species}</p> 
                    <p><i class="fa-brands fa-reddit-alien"></i> Tipo: ${dato.type || "Desconocido"}</p> 
                </div>           
            </div>
        `
    }).join('');
}

const buscarPersonajes = async (termino) => {
    if (!termino || termino.length < 3) {
        
        if (termino && termino.length < 3) {
            searchMessage.innerHTML = `<i class="fa-brands fa-sistrix"></i> Escribí al menos 3 caracteres para buscar`;
            contenedor.innerHTML = `<div class="loading">Esperando búsqueda...</div>`;
        } else {
            searchMessage.innerHTML = "";
            
            await cargarData();
        }
        return;
    }
    
   
    mostrarLoading(`<i class="fa-brands fa-sistrix"></i> Buscando "${termino}"...`);
    searchMessage.innerHTML = `<i class="fa-brands fa-sistrix"></i> Buscando personajes que coincidan con: "${termino}"`;
    
    try {
        
        const url = `https://rickandmortyapi.com/api/character/?name=${termino}`;
        const response = await fetch(url);
        
        // (e) Manejar errores de red
        if (!response.ok) {
            if (response.status === 404) {
                // (d) Mostrar "No se encontraron resultados"
                searchMessage.innerHTML = `<i class="fa-solid fa-xmark" style="color:red;"></i>No se encontraron personajes con el nombre "${termino}"`;
                renderizarCards([]);
                return;
            }
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        datosCache = data.results;
        
        // (c) Actualizar tarjetas con los resultados
        renderizarCards(datosCache);
        searchMessage.innerHTML = `<i class="fa-solid fa-check-double" style="color:green;"></i> Se encontraron ${datosCache.length} personajes`;
        
    } catch (error) {
        mostrarError(`Error al buscar: ${error.message}`);
        searchMessage.innerHTML = `<i class="fa-solid fa-xmark" style="color:red;"></i> Error: ${error.message}`;
    }
}

// Cargar todos los personajes al inicio
const cargarData = async () => {
    mostrarLoading("Cargando personajes de Rick and Morty...");
    try {
        const response = await fetch("https://rickandmortyapi.com/api/character");
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        const data = await response.json();
        datosCache = data.results;
        renderizarCards(datosCache);
        searchMessage.innerHTML = `<i class="fa-solid fa-people-line"></i> ${datosCache.length} personajes cargados`;
    } catch (error) {
        mostrarError(`No se pudieron cargar los personajes: ${error.message}`);
    }
};

// (a) Event listener con debounce para no saturar la API
let timeoutId;
searchInput.addEventListener("input", (e) => {
    clearTimeout(timeoutId);
    const termino = e.target.value.trim();
    
    // Esperar 500ms después de que el usuario deje de escribir
    timeoutId = setTimeout(() => {
        buscarPersonajes(termino);
    }, 500);
});

// Cargar datos iniciales
cargarData();