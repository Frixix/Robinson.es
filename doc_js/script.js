let menuVisible = false;

// =============================
// MENU RESPONSIVE
// =============================

function mostrarOcultarMenu() {

    const nav = document.getElementById("nav");

    if (menuVisible) {
        nav.classList.remove("responsive");
        menuVisible = false;
    } else {
        nav.classList.add("responsive");
        menuVisible = true;
    }

}

function seleccionar() {

    document.getElementById("nav").classList.remove("responsive");
    menuVisible = false;

}

// =============================
// MODAL DESCRIPCION PROYECTO
// =============================

function abrirModal(){

    document.getElementById("modal-inventario").style.display = "flex";

}

function cerrarModal(){

    document.getElementById("modal-inventario").style.display = "none";

}

// =============================
// MODAL GALERIA
// =============================

function abrirGaleria(){

    document.getElementById("modal-galeria").style.display = "flex";

    indiceImagen = 0;

    actualizarGaleria();

}

function cerrarGaleria(){

    document.getElementById("modal-galeria").style.display = "none";

}

function abrirDescripcion(){

    cerrarGaleria();

    document.getElementById("modal-inventario").style.display = "flex";

}

// =============================
// GALERIA DE IMAGENES
// =============================

let imagenesInventario = [

    "img/proyectos/inventario_2.0/inventario_inicio.jpg",
    "img/proyectos/inventario_2.0/entrada_inventario.jpg",
    "img/proyectos/inventario_2.0/salida_inventario.jpg",
    "img/proyectos/inventario_2.0/historial_salidas.jpg"

];

let descripcionesInventario = [

    "Pantalla principal del sistema de inventario.",
    "Módulo de gestión y registro de productos.",
    "Registro de movimientos de salida de inventario.",
    "Historial de operaciones del sistema."

];

let indiceImagen = 0;

// =============================
// ACTUALIZAR IMAGEN
// =============================

function actualizarGaleria(){

    let imagen = document.getElementById("imagen-galeria");

    let descripcion = document.getElementById("descripcion-imagen");

    imagen.src = imagenesInventario[indiceImagen];

    descripcion.textContent = descripcionesInventario[indiceImagen];

}

// =============================
// IMAGEN SIGUIENTE
// =============================

function imagenSiguiente(){

    indiceImagen++;

    if(indiceImagen >= imagenesInventario.length){

        indiceImagen = 0;

    }

    actualizarGaleria();

}

// =============================
// IMAGEN ANTERIOR
// =============================

function imagenAnterior(){

    indiceImagen--;

    if(indiceImagen < 0){

        indiceImagen = imagenesInventario.length - 1;

    }

    actualizarGaleria();

}
