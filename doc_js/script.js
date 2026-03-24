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
// DATOS DE PROYECTOS
// =============================

const proyectos = {
    inventario: {
        modalId: "modal-inventario",
        imagenes: [
            "img/proyectos/inventario_2.0/inventario_inicio.jpg",
            "img/proyectos/inventario_2.0/entrada_inventario.jpg",
            "img/proyectos/inventario_2.0/salida_inventario.jpg",
            "img/proyectos/inventario_2.0/historial_salidas.jpg"
        ],
        descripciones: [
            "Pantalla principal del sistema de inventario.",
            "Módulo de gestión y registro de productos.",
            "Registro de movimientos de salida de inventario.",
            "Historial de operaciones del sistema."
        ]
    },

    notestack: {
        modalId: "modal-notestack",
        imagenes: [
            "img/proyectos/Notestack/pantalla_principal.jpg",
            "img/proyectos/Notestack/cuaderno.jpg",
            "img/proyectos/Notestack/cuerpo_Cuaderno.jpg",
            "img/proyectos/Notestack/notas.jpg",
        ],
        descripciones: [
            "Pantalla principal de NoteStack.",
            "Vista de organización de cuadernos.",
            "Gestión y edición de notas dentro de la aplicación.",
            "Sistema de búsqueda de notas y contenido."
        ]
    }
};

// =============================
// VARIABLES DE CONTROL
// =============================

let proyectoActual = "";
let indiceImagen = 0;

// =============================
// MODAL DESCRIPCION PROYECTO
// =============================

function abrirModal(nombreProyecto) {
    cerrarTodosLosModales();

    const proyecto = proyectos[nombreProyecto];
    if (!proyecto) return;

    proyectoActual = nombreProyecto;
    document.getElementById(proyecto.modalId).style.display = "flex";
}

function cerrarModal(nombreProyecto) {
    const proyecto = proyectos[nombreProyecto];
    if (!proyecto) return;

    document.getElementById(proyecto.modalId).style.display = "none";
}

function cerrarTodosLosModales() {
    for (const key in proyectos) {
        const modal = document.getElementById(proyectos[key].modalId);
        if (modal) {
            modal.style.display = "none";
        }
    }
}

// =============================
// MODAL GALERIA
// =============================

function abrirGaleria(nombreProyecto) {
    const proyecto = proyectos[nombreProyecto];
    if (!proyecto) return;

    proyectoActual = nombreProyecto;
    indiceImagen = 0;

    document.getElementById("modal-galeria").style.display = "flex";
    actualizarGaleria();
}

function cerrarGaleria() {
    document.getElementById("modal-galeria").style.display = "none";
}

function abrirDescripcion() {
    cerrarGaleria();

    const proyecto = proyectos[proyectoActual];
    if (!proyecto) return;

    document.getElementById(proyecto.modalId).style.display = "flex";
}

// =============================
// ACTUALIZAR IMAGEN
// =============================

function actualizarGaleria() {
    const proyecto = proyectos[proyectoActual];
    if (!proyecto) return;

    let imagen = document.getElementById("imagen-galeria");
    let descripcion = document.getElementById("descripcion-imagen");

    imagen.src = proyecto.imagenes[indiceImagen];
    descripcion.textContent = proyecto.descripciones[indiceImagen];
}

// =============================
// IMAGEN SIGUIENTE
// =============================

function imagenSiguiente() {
    const proyecto = proyectos[proyectoActual];
    if (!proyecto) return;

    indiceImagen++;

    if (indiceImagen >= proyecto.imagenes.length) {
        indiceImagen = 0;
    }

    actualizarGaleria();
}

// =============================
// IMAGEN ANTERIOR
// =============================

function imagenAnterior() {
    const proyecto = proyectos[proyectoActual];
    if (!proyecto) return;

    indiceImagen--;

    if (indiceImagen < 0) {
        indiceImagen = proyecto.imagenes.length - 1;
    }

    actualizarGaleria();
}