let tareas = [
    {id:1, titulo:"Comprar leche", completada:false},
    {id:2, titulo:"Lavar el auto", completada:true},
    {id:3, titulo:"Estudiar para el examen", completada:false}
];
const containerTareas = document.getElementById("container-tareas");

// Contador
const actualizarContador = () => {
    let pendientes = tareas.filter(t => !t.completada).length;
    let contador = document.getElementById("contador");
    if (!contador) {
        contador = document.createElement("p");
        contador.id = "contador";
        document.querySelector("form").after(contador);
    }
    contador.innerText = `Pendientes: ${pendientes}`;
}

const crearTareaHTML = (tarea)=>{
    return `
        <div class="tarea ">
            <div>
                <h3 class="${tarea.completada ? 'tarea-completada' : ''}">${tarea.titulo}</h3>
                <input type="checkbox" onchange="toggleTarea(${tarea.id})" ${tarea.completada ? 'checked' : ''}>
            </div>
            <button class="button" onclick="eliminarTarea(${tarea.id})">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        </div>
    `;
}
const cargarTareas = ()=>{
    containerTareas.innerHTML = "";
    tareas.map(tarea=>{
        containerTareas.innerHTML += crearTareaHTML(tarea);
    }).join("");
    actualizarContador();
}

const toggleTarea = (id)=>{
    tareas = tareas.map(tarea=>{
        if(tarea.id == id){
            return {...tarea, completada: !tarea.completada};
        }
        return tarea;
    });
    cargarTareas();
}

const eliminarTarea = (id)=>{
    tareas = tareas.filter(tarea=>tarea.id != id);
    cargarTareas();
}
const agregarTarea = (e)=>{
    e.preventDefault();
    const inputTitulo = document.getElementById("tituloTarea");
    if(inputTitulo.value.trim() === "") return;
    const nuevaTarea = {
        id: Date.now(),
        titulo: inputTitulo.value,
        completada: false
    }
    tareas.push(nuevaTarea);
    inputTitulo.value = "";
    cargarTareas();
}
cargarTareas();