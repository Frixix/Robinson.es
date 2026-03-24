// =============================
// MENU RESPONSIVE
// =============================

let menuVisible = false;

function mostrarOcultarMenu() {
    const nav = document.getElementById("nav");
    menuVisible = !menuVisible;
    nav.classList.toggle("responsive", menuVisible);
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
            "img/proyectos/Notestack/notas.jpg",
            "img/proyectos/Notestack/cuerpo_cuaderno.jpg"
        ],
        descripciones: [
            "Pantalla principal de NoteStack.",
            "Vista de organización de cuadernos.",
            "Sistema de búsqueda de notas y contenido.",
            "Gestión y edición de notas dentro de la aplicación."
        ]
    }
};

// =============================
// ESTADO DE GALERÍA
// =============================

const estado = {
    proyectoActual: "",
    indiceImagen: 0
};

// =============================
// HELPERS
// =============================

function getProyecto(nombre) {
    return proyectos[nombre] ?? null;
}

function getModal(id) {
    return document.getElementById(id);
}

// =============================
// MODALES DE PROYECTO
// =============================

function abrirModal(nombreProyecto) {
    const proyecto = getProyecto(nombreProyecto);
    if (!proyecto) return;

    cerrarTodosLosModales();
    estado.proyectoActual = nombreProyecto;
    getModal(proyecto.modalId).style.display = "flex";
}

function cerrarModal(nombreProyecto) {
    const proyecto = getProyecto(nombreProyecto);
    if (!proyecto) return;

    getModal(proyecto.modalId).style.display = "none";
}

function cerrarTodosLosModales() {
    Object.values(proyectos).forEach(({ modalId }) => {
        const modal = getModal(modalId);
        if (modal) modal.style.display = "none";
    });
}

// =============================
// GALERÍA
// =============================

function abrirGaleria(nombreProyecto) {
    const proyecto = getProyecto(nombreProyecto);
    if (!proyecto) return;

    estado.proyectoActual = nombreProyecto;
    estado.indiceImagen = 0;

    getModal("modal-galeria").style.display = "flex";
    actualizarGaleria();
}

function cerrarGaleria() {
    getModal("modal-galeria").style.display = "none";
}

function abrirDescripcion() {
    cerrarGaleria();
    const proyecto = getProyecto(estado.proyectoActual);
    if (!proyecto) return;

    getModal(proyecto.modalId).style.display = "flex";
}

function actualizarGaleria() {
    const proyecto = getProyecto(estado.proyectoActual);
    if (!proyecto) return;

    getModal("imagen-galeria").src = proyecto.imagenes[estado.indiceImagen];
    getModal("descripcion-imagen").textContent = proyecto.descripciones[estado.indiceImagen];
}

function cambiarImagen(direccion) {
    const proyecto = getProyecto(estado.proyectoActual);
    if (!proyecto) return;

    const total = proyecto.imagenes.length;
    estado.indiceImagen = (estado.indiceImagen + direccion + total) % total;
    actualizarGaleria();
}

function imagenSiguiente() { cambiarImagen(1);  }
function imagenAnterior()  { cambiarImagen(-1); }