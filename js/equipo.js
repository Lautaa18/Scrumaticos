/* =========================================================
   equipo.js · Sobre Nosotros (US-16)
   Los perfiles se generan desde el array EQUIPO.
   Para agregar o editar un integrante, modificá solo este array.
   ========================================================= */
const EQUIPO = [
  {
    nombre: "Integrante 1",
    rol: "Product Owner",
    descripcion: "Define las prioridades del Product Backlog y representa las necesidades de quienes usan el portal.",
    motivacion: "Quiere que el contenido sea claro y útil para cualquier estudiante que empiece con calidad de software.",
  },
  {
    nombre: "Integrante 2",
    rol: "Scrum Master",
    descripcion: "Facilita las ceremonias, cuida el proceso y ayuda a remover los impedimentos del equipo.",
    motivacion: "Le interesa aplicar Scrum en un proyecto real y no solo estudiarlo en teoría.",
  },
  {
    nombre: "Integrante 3",
    rol: "Desarrollo",
    descripcion: "Maqueta las páginas en HTML y CSS y se ocupa del diseño responsive y la accesibilidad.",
    motivacion: "Busca mejorar sus habilidades de frontend construyendo un sitio completo.",
  },
  {
    nombre: "Integrante 4",
    rol: "Desarrollo",
    descripcion: "Programa los componentes interactivos en JavaScript: menú, pestañas, acordeón y formularios.",
    motivacion: "Le gusta que el contenido educativo sea interactivo y fácil de recorrer.",
  },
];

(function () {
  const contenedor = document.querySelector("[data-equipo]");
  if (!contenedor) return;

  // "Ana Pérez" -> "AP"
  function iniciales(nombre) {
    return nombre.split(" ").filter(Boolean).slice(0, 2).map((p) => p[0].toUpperCase()).join("");
  }

  contenedor.innerHTML = EQUIPO.map((p, i) => `
    <article class="perfil" tabindex="0">
      <div class="avatar" aria-hidden="true">${iniciales(p.nombre)}</div>
      <h3>${p.nombre}</h3>
      <p class="rol">${p.rol}</p>
      <p class="desc">${p.descripcion}</p>
      <p class="motivacion" id="mot-${i}">${p.motivacion}</p>
      <button class="perfil-btn" aria-expanded="false" aria-controls="mot-${i}">Ver motivación</button>
      <span class="linea" aria-hidden="true"></span>
    </article>`).join("");
})();
