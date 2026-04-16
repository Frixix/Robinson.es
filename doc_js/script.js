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

const proyectosData = {
    inventario: {
        modalId: "modal-inventario",
        imagenes: [
            "/img/proyectos/Inventario_2.0/inventario_inicio.jpg",
            "/img/proyectos/Inventario_2.0/entrada_inventario.jpg",
            "/img/proyectos/Inventario_2.0/salida_inventario.jpg",
            "/img/proyectos/Inventario_2.0/historial_salidas.jpg"
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
            "/img/proyectos/Notestack/pantalla_principal.jpg",
            "/img/proyectos/Notestack/cuaderno.jpg",
            "/img/proyectos/Notestack/notas.jpg",
            "../img/proyectos/Notestack/cuerpo_cuaderno.jpg"
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
            "/img/proyectos/Solven/solven.jpg",
            "/img/proyectos/Solven/pantalla-principal.jpg",
            "/img/proyectos/Solven/area-de-transacción.jpg",
            "/img/proyectos/Solven/filtro-categoria.jpg"
        ],
        descripciones: [
            "Vista general de Solven.",
            "Resumen de ingresos y gastos.",
            "Gestión de transacciones.",
            "Filtros por categoría."
        ]
    },

    blackblade: {
        modalId: "modal-blackblade",
        imagenes: [
            "../img/proyectos/blackblade/inicio.jpg",
            "../img/proyectos/blackblade/servicios.jpg",
            "../img/proyectos/blackblade/agendar-cita.jpg",
            "../img/proyectos/blackblade/galeria.jpg",
            "../img/proyectos/blackblade/ubicación.jpg",
            "../img/proyectos/blackblade/agendar-cita.jpg",
            "../img/proyectos/blackblade/footer.jpg"
        ],
        descripciones: [
            "Pantalla principal del sitio BlackBlade con presentación visual y llamado a la acción.",
            "Sección de servicios donde se detallan los cortes y tratamientos disponibles.",
            "Formulario para agendar citas de manera rápida y sencilla.",
            "Galería de trabajos realizados que muestra resultados y estilos.",
            "Sección de ubicación con mapa y datos del local.",
            "Sistema de reserva de citas con interfaz amigable para el usuario.",
            "Pie de página con información adicional, redes sociales y contacto."
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

const getProyecto = (nombre) => proyectosData[nombre] ?? null;
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
    Object.values(proyectosData).forEach(({ modalId }) => {
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
// EVENTOS GLOBALES
// =============================

// ESC para cerrar
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        cerrarGaleria();
        cerrarTodosLosModales();
    }
});

// Click fuera del modal
window.addEventListener("click", (e) => {
    document.querySelectorAll(".modal").forEach(modal => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});

// =============================
// MENU RESPONSIVE (EVENTOS)
// =============================

const navResponsive = document.getElementById('nav-responsive');
const nav = document.getElementById('nav');

if (navResponsive && nav) {
    navResponsive.addEventListener('click', () => {
        nav.classList.toggle('responsive');
    });
}

// Cerrar menú al hacer click
const navLinks = document.querySelectorAll('nav ul li a');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (nav && nav.classList.contains('responsive')) {
            nav.classList.remove('responsive');
        }
    });
});

// =============================
// FILTROS DE PROYECTOS (FIX)
// =============================

const filtroBtns = document.querySelectorAll('.filtro-btn');
const proyectosCards = document.querySelectorAll('.card-proyecto');
const noProyectos = document.getElementById('no-proyectos');
const gridProyectos = document.getElementById('grid-proyectos');

function filtrarProyectos(categoria) {
    let visibles = 0;

    proyectosCards.forEach(card => {
        const categorias = card.getAttribute('data-categoria');

        if (categoria === 'todos' || categorias.includes(categoria)) {
            card.style.display = 'block';
            visibles++;
        } else {
            card.style.display = 'none';
        }
    });

    if (visibles === 0) {
        noProyectos.style.display = 'block';
        if (gridProyectos) gridProyectos.style.minHeight = '300px';
    } else {
        noProyectos.style.display = 'none';
        if (gridProyectos) gridProyectos.style.minHeight = 'auto';
    }
}

filtroBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filtroBtns.forEach(b => b.classList.remove('activo'));
        btn.classList.add('activo');

        const filtro = btn.getAttribute('data-filter');
        filtrarProyectos(filtro);
    });
});

// =============================
// SCROLL HEADER
// =============================

window.addEventListener('scroll', () => {
    const header = document.querySelector('.contenedor-header');
    if (!header) return;

    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(30, 35, 38, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.backgroundColor = '#1e2326';
        header.style.backdropFilter = 'none';
    }
});

// =============================
// ANIMACIONES
// =============================

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
});

document.querySelectorAll('.card-proyecto').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = '0.6s';

    observer.observe(card);
});