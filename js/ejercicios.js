/* Crear un archivo js/ejercicios.js con los siguientes ejercicios resueltos (cada uno como
una función con const + arrow function): (a) calcularPromedio(notas): recibe un array de
números y retorna el promedio usando reduce(), (b) filtrarAprobados(alumnos): recibe un
array de objetos {nombre, nota} y retorna solo los que tienen nota >= 6 usando filter(), (c)
formatearAlumnos(alumnos): recibe el mismo array y retorna un array de strings "Nombre: X
- Nota: Y" usando map(), (d) buscarAlumno(alumnos, nombre): usa find() para buscar
por nombre. Cada función debe estar probada con console.log(). */

const calcularPromedio = (notas)=>{
    let suma = notas.reduce((acu,act)=>{
        return acu+=act;
    },0);
    return suma/notas.length;
}

const notas = [5,3,5,2,5,2];
console.log(calcularPromedio(notas));

/* (b) filtrarAprobados(alumnos): recibe un
array de objetos {nombre, nota} y retorna solo los que tienen nota >= 6 usando filter() */

const alumnos = [
    {nombre:'Joaquin',nota:8},
    {nombre:'Alejo',nota:6},
    {nombre:'Daniela',nota:4},
    {nombre:'Sheila',nota:9},
    {nombre:'Valeria',nota:4},
    {nombre:'Antonella',nota:9},
    {nombre:'Cristian',nota:5}
]

const filtrarAprobados = (alum)=>{
    return alum.filter(alu=>alu.nota>=6);
}

const aprobados = filtrarAprobados(alumnos);

console.log(aprobados);

/* (c)formatearAlumnos(alumnos): recibe el mismo array y retorna un array de strings "Nombre: X
- Nota: Y" usando map(), (d) buscarAlumno(alumnos, nombre): usa find() para buscar
por nombre. Cada función debe estar probada con console.log(). */

const formatearAlumnos = (alumnos)=>{
    return alumnos.map(alumno=>{
        return `Nombre: ${alumno.nombre} - ${alumno.nota}`
    });
}

console.log(formatearAlumnos(aprobados));
console.log(formatearAlumnos(alumnos));