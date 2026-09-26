/* =========================================================
   equipo.js · Sobre Nosotros (US-16)
   Los perfiles se generan desde el array EQUIPO.
   Para agregar o editar un integrante, modificá solo este array.
   "foto" es opcional: si no está, se muestran las iniciales.
   "motivacion" es opcional: si está vacía, no se muestra el botón.
   ========================================================= */
const EQUIPO = [
  {
    nombre: "Ezequiel",
    iniciales: "EA",
    rol: "Diseñador / UX-UI",
    descripcion: "Responsable del aspecto visual, maquetación y experiencia del usuario. Define paleta de colores, tipografías y asegura la accesibilidad del portal.",
    motivacion: "",
  },
  {
    nombre: "Benjamín",
    iniciales: "BL",
    rol: "Tester / QA",
    descripcion: "Guardián de la calidad. Diseña y ejecuta casos de prueba, documenta bugs y valida el Definition of Done antes de aprobar cada entrega.",
    motivacion: "",
  },
  {
    nombre: "Gonzalo",
    iniciales: "GV",
    rol: "Scrum Master",
    descripcion: "Facilita el marco SCRUM, modera ceremonias, administra el tablero de tareas y desbloquea al equipo cuando surgen impedimentos.",
    motivacion: "",
  },
  {
    nombre: "Lautaro",
    iniciales: "LZ",
    rol: "Programador / Dev",
    descripcion: "Da vida al sitio con JavaScript. Desarrolla la interactividad, la maquetación HTML/CSS y las herramientas como el comparador de metodologías.",
    motivacion: "",
    foto: "img/lautaro.jpg",
  },
];

(function () {
  const contenedor = document.querySelector("[data-equipo]");
  if (!contenedor) return;

  function avatar(p) {
    if (p.foto) return `<img class="avatar" src="${p.foto}" alt="Avatar de ${p.nombre}" width="88" height="88">`;
    return `<div class="avatar" aria-hidden="true">${p.iniciales}</div>`;
  }

  function motivacion(p, i) {
    if (!p.motivacion) return "";
    return `<p class="motivacion" id="mot-${i}">${p.motivacion}</p>
      <button class="perfil-btn" aria-expanded="false" aria-controls="mot-${i}">Ver motivación</button>`;
  }

  contenedor.innerHTML = EQUIPO.map((p, i) => `
    <article class="perfil" tabindex="0">
      ${avatar(p)}
      <h3>${p.nombre}</h3>
      <p class="rol">${p.rol}</p>
      <p class="desc">${p.descripcion}</p>
      ${motivacion(p, i)}
      <span class="linea" aria-hidden="true"></span>
    </article>`).join("");
})();
