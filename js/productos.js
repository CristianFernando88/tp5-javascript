
const productos = [
{ id: 1, nombre: "Laptop Gaming", precio: 850000, categoria: "Electrónica", enStock: true },
{ id: 2, nombre: "Mouse Inalámbrico", precio: 25000, categoria: "Accesorios", enStock: true },
{ id: 3, nombre: "Teclado Mecánico", precio: 65000, categoria: "Accesorios", enStock: false },
{ id: 4, nombre: "Monitor 24''", precio: 210000, categoria: "Electrónica", enStock: true },
{ id: 5, nombre: "Silla Gamer", precio: 280000, categoria: "Muebles", enStock: true },
{ id: 6, nombre: "Auriculares Bluetooth", precio: 45000, categoria: "Accesorios", enStock: false },
{ id: 7, nombre: "Webcam 4K", precio: 89000, categoria: "Electrónica", enStock: true },
{ id: 8, nombre: "Micrófono USB", precio: 55000, categoria: "Accesorios", enStock: true }
];

//let productos_filtrados=[];


const crearCardProducto=(producto)=>{
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML=`
        <h2>${producto.nombre}</h2>
        <div>
            <span>${producto.precio}</span>
            <p>${producto.categoria}</p>
        </div>
    `
    return card;
}

const cargarCardsProducto = (productos)=>{
        const contenedor = document.getElementById("container-cards");
        contenedor.innerHTML="";
    
        contenedor.innerHTML = productos.map(producto=>`
        <div class="product-card">
            <div class="card-title">
                <h2>${producto.nombre}</h2>
            </div>
            <div class="card-body">
                <p>$<span>${producto.precio}</span></p>
                <p>${producto.categoria}</p>
            </div>
            <div class="card-footer">
                ${producto.enStock ?
                    `<span style="color:green;">En Stock</span>`:
                    `<span style="color:red;">Agotado</span>`
                }
            </div>
        </div>
        `).join("");
        
    }

const select = document.getElementById("select-categoria");
const precio_range = document.getElementById("precioRange");
const valor_precio_maximo = document.getElementById("valorPrecioMaximo");
const valor_precio_actual = document.getElementById("valorPrecioActual");
const input_search = document.getElementById("inputSearch");

const actualizarPrecioMaximo = (productos)=>{
    console.log("actualizando precio maximo");
    let precio_maximo=productos.reduce((max,prod)=>prod.precio>max?prod.precio:max,0);
    console.log(precio_maximo);
    console.log(precio_range);
    valor_precio_maximo.textContent = precio_maximo;
    precio_range.setAttribute('max', precio_maximo);
    valor_precio_actual.textContent = precio_range.value > precio_maximo ? precio_maximo : precio_range.value;
};


const filtrarPorCategoria = (productos, categoria) => {
    if (!categoria) return productos;
    let productos_filtrados = productos.filter(prod => prod.categoria === categoria);
    return productos_filtrados;
}

const filtrarPorPrecio = (productos, precioMax) => {
    if (!precioMax) return productos;
    return productos.filter(prod => prod.precio <= parseInt(precioMax));
}

const filtrarPorNombre = (productos, nombre) => {
    if (!nombre) return productos;
    const nombreLower = nombre.toLowerCase();
    return productos.filter(prod => 
        prod.nombre.toLowerCase().includes(nombreLower)
    );
}

const filtradoGeneral = () => {
    const categoria = select.value;
    const precioMax = precioRange.value;
    const nombre = inputSearch.value;
    let productosFiltrados = [...productos]; 
    //actualizarPrecioMaximo(productosFiltrados);
    productosFiltrados = filtrarPorCategoria(productosFiltrados, categoria);
    productosFiltrados = filtrarPorNombre(productosFiltrados, nombre);
    actualizarPrecioMaximo(productosFiltrados);
    productosFiltrados = filtrarPorPrecio(productosFiltrados, precioMax);
    
    
    /* actualizarMaximoRange(productosFiltrados); */
    
    
    cargarCardsProducto(productosFiltrados);
}


select.addEventListener("change",(e)=>{
    let seleccion = e.target.value;
    filtradoGeneral()
})

precio_range.addEventListener("input",(e)=>{
    const precio = e.target.value;
    valor_precio_actual.textContent = precio;
    filtradoGeneral();
})

input_search.addEventListener("input",(e)=>{
    filtradoGeneral();
})
window.addEventListener("load",()=>{
    
    filtradoGeneral();
    
})

