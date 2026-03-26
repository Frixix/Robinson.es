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
            "img/proyectos/Inventario_2.0/inventario_inicio.jpg",
            "img/proyectos/Inventario_2.0/entrada_inventario.jpg",
            "img/proyectos/Inventario_2.0/salida_inventario.jpg",
            "img/proyectos/Inventario_2.0/historial_salidas.jpg"
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

        solven: {
            modalId: "modal-solven",
            imagenes: [
                "img/proyectos/Solven/solven.jpg",
                "img/proyectos/Solven/pantalla-principal.jpg",
                "img/proyectos/Solven/area-de-transacción.jpg",
                "img/proyectos/Solven/filtro-categoria.jpg"
            ],
            descripciones: [
                "Vista general de Solven, app de finanzas personales.",
                "Pantalla principal con resumen de ingresos, gastos y balance.",
                "Área de registro y gestión de transacciones.",
                "Filtros por categoría y tipo de movimiento."
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