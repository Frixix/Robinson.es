// =============================
// MENU RESPONSIVE
// =============================

let menuVisible = false;

function mostrarOcultarMenu() {
    const nav = document.getElementById("nav");
    if (!nav) return;

    menuVisible = !menuVisible;
    nav.classList.toggle("responsive", menuVisible);
}

function seleccionar() {
    const nav = document.getElementById("nav");
    if (!nav) return;

    nav.classList.remove("responsive");
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
            "Gestión y registro de productos.",
            "Control de salidas de inventario.",
            "Historial de operaciones."
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
            "Organización de cuadernos.",
            "Búsqueda de notas.",
            "Edición de contenido."
        ]
    },

    // 💰 SOLVEN (finanzas personales, ya coherente)
    solven: {
        modalId: "modal-solven",
        imagenes: [
            "img/proyectos/solven/pantalla-principal.jpg",
            "img/proyectos/solven/area-de-transacción.jpg",
            "img/proyectos/solven/filtro-categoria.jpg",
            "img/proyectos/solven/historial-transacciones.jpg"
            
            
            
        ],
        descripciones: [
            "Dashboard principal con resumen financiero.",
            "Visualización del balance general.",
            "Registro y gestión de ingresos y gastos.",
            "Resumen de movimientos y estado financiero."
        ]
    }
};

// =============================
// ESTADO GLOBAL
// =============================

const estado = {
    proyectoActual: null,
    indiceImagen: 0
};

// =============================
// HELPERS
// =============================

const getProyecto = (nombre) => proyectos[nombre] ?? null;

const getElemento = (id) => document.getElementById(id);

// =============================
// MODALES
// =============================

function abrirModal(nombreProyecto) {
    const proyecto = getProyecto(nombreProyecto);
    if (!proyecto) return;

    cerrarTodosLosModales();

    estado.proyectoActual = nombreProyecto;

    const modal = getElemento(proyecto.modalId);
    if (modal) modal.style.display = "flex";
}

function cerrarModal(nombreProyecto) {
    const proyecto = getProyecto(nombreProyecto);
    if (!proyecto) return;

    const modal = getElemento(proyecto.modalId);
    if (modal) modal.style.display = "none";
}

function cerrarTodosLosModales() {
    Object.values(proyectos).forEach(({ modalId }) => {
        const modal = getElemento(modalId);
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

    const modal = getElemento("modal-galeria");
    if (modal) modal.style.display = "flex";

    actualizarGaleria();
}

function cerrarGaleria() {
    const modal = getElemento("modal-galeria");
    if (modal) modal.style.display = "none";
}

function abrirDescripcion() {
    cerrarGaleria();

    if (!estado.proyectoActual) return;

    abrirModal(estado.proyectoActual);
}

function actualizarGaleria() {
    const proyecto = getProyecto(estado.proyectoActual);
    if (!proyecto) return;

    const imagen = getElemento("imagen-galeria");
    const descripcion = getElemento("descripcion-imagen");

    if (!imagen || !descripcion) return;

    imagen.src = proyecto.imagenes[estado.indiceImagen];
    descripcion.textContent = proyecto.descripciones[estado.indiceImagen];
}

function cambiarImagen(direccion) {
    const proyecto = getProyecto(estado.proyectoActual);
    if (!proyecto) return;

    const total = proyecto.imagenes.length;

    estado.indiceImagen =
        (estado.indiceImagen + direccion + total) % total;

    actualizarGaleria();
}

const imagenSiguiente = () => cambiarImagen(1);
const imagenAnterior = () => cambiarImagen(-1);

// =============================
// UX EXTRA (PRO LEVEL)
// =============================

// Cerrar con ESC
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        cerrarGaleria();
        cerrarTodosLosModales();
    }
});

// Cerrar al hacer click fuera del modal
window.addEventListener("click", (e) => {
    document.querySelectorAll(".modal").forEach(modal => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});