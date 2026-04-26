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

const toggleTarea = (tituloElement, id) => {
    tituloElement.classList.toggle("tarea-completada");
    const completada = tituloElement.classList.contains("tarea-completada");
    tareas = tareas.map(tarea => {
        if (tarea.id === id) {
            return {...tarea, completada: completada};
        }
        return tarea;
    });
    actualizarContador();
}

const eliminarTarea = (divTarea, id) => {
    divTarea.remove();
    tareas = tareas.filter(tarea => tarea.id !== id);
    actualizarContador();
}

const crearTarea = (tarea) => {
    const divTarea = document.createElement("div");
    divTarea.classList.add("tarea");
    
    const divContenido = document.createElement("div");
    
    const titulo = document.createElement("h3");
    const icono = tarea.completada ? '✓' : '○';
    titulo.innerHTML = `${icono} ${tarea.titulo}`;
    
    if (tarea.completada) {
        titulo.classList.add("tarea-completada");
    }
    
    const handleClick = () => {
        titulo.classList.toggle("tarea-completada");
        const estaCompletada = titulo.classList.contains("tarea-completada");
        const nuevoIcono = estaCompletada ? '✓' : '○';
        titulo.innerHTML = `${nuevoIcono} ${tarea.titulo}`;
        
        tareas = tareas.map(t => {
            if (t.id === tarea.id) {
                return {...t, completada: estaCompletada};
            }
            return t;
        });
        actualizarContador();
    };
    
    titulo.onclick = handleClick;
    divContenido.appendChild(titulo);
    
    const boton = document.createElement("button");
    boton.className = "button";
    boton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    boton.onclick = () => eliminarTarea(divTarea, tarea.id);
    
    divTarea.appendChild(divContenido);
    divTarea.appendChild(boton);
    
    return divTarea;
}

const cargarTareas = () => {
    containerTareas.innerHTML = "";
    tareas.forEach(tarea => {
        containerTareas.appendChild(crearTarea(tarea));
    });
    actualizarContador();
}

const agregarTarea = (e) => {
    e.preventDefault();
    const inputTitulo = document.getElementById("tituloTarea");
    if(inputTitulo.value.trim() === "") return;
    
    const nuevaTarea = {
        id: Date.now(),
        titulo: inputTitulo.value,
        completada: false
    }
    tareas.push(nuevaTarea);
    containerTareas.appendChild(crearTarea(nuevaTarea));
    inputTitulo.value = "";
    actualizarContador();
}

// Esto debe ir UNA sola vez
document.getElementById("todo-form").addEventListener("submit", agregarTarea);

cargarTareas();