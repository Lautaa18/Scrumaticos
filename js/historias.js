/* =========================================================
   historias.js · Sección "Historias de usuario" del inicio
   Para sumar una historia nueva, agregala a HISTORIAS.
   - estado: "completada" (tiene enlace) o "desarrollo"
   - enlace: página o ancla donde se ve implementada
   ========================================================= */
const HISTORIAS = [
  { id: "US-01", area: "Navegación", titulo: "Menú de navegación dinámico", descripcion: "Menú hamburguesa compartido entre páginas con resaltado de la sección activa.", tags: ["Hamburguesa", "Submenús", "Página activa"], estado: "completada", enlace: "#contenido" },
  { id: "US-02", area: "Gestión de calidad", titulo: "ISO 9126 vs ISO 25000", descripcion: "Pestañas accesibles para comparar los estándares de calidad del software.", tags: ["Pestañas", "Teclado", "ISO"], estado: "completada", enlace: "calidad.html#t-estandares" },
  { id: "US-03", area: "Gestión de calidad", titulo: "Técnicas de aseguramiento", descripcion: "Niveles y tipos de prueba con tarjetas que abren un detalle en un modal.", tags: ["Modal", "Caja negra", "Táctil"], estado: "completada", enlace: "calidad.html#tecnicas" },
  { id: "US-04", area: "Herramientas interactivas", titulo: "Herramientas de Calidad", descripcion: "Catálogo de gestores de pruebas, defectos y análisis automático de calidad.", tags: ["Grilla visual", "Filtros", "Validación"], estado: "completada", enlace: "calidad.html#herramientas" },
  { id: "US-05", area: "Ciclo de vida", titulo: "Timeline interactivo del SDLC", descripcion: "Recorrido por las seis etapas, desde requisitos hasta mantenimiento.", tags: ["Seis etapas", "Paso a paso", "Responsive"], estado: "completada", enlace: "procesos.html#sdlc" },
  { id: "US-06", area: "Procesos de desarrollo", titulo: "Navegación de modelos", descripcion: "Subnavegación sticky con seguimiento automático del modelo visible.", tags: ["Sticky", "Observer", "Ventajas"], estado: "completada", enlace: "procesos.html#tradicionales" },
  { id: "US-07", area: "Procesos de desarrollo", titulo: "Ilustraciones y Lightbox", descripcion: "Diagramas SVG ampliables, navegación por teclado y foco accesible.", tags: ["SVG", "Lightbox", "Teclado"], estado: "completada", enlace: "procesos.html#cascada" },
  { id: "US-08", area: "Metodologías ágiles", titulo: "Índice de Metodologías Ágiles", descripcion: "Tabla de contenidos que acompaña la lectura de Manifiesto, Scrum, Kanban y XP.", tags: ["Índice", "Anclas", "Sección activa"], estado: "completada", enlace: "agiles.html" },
  { id: "US-09", area: "Metodologías ágiles", titulo: "Galería de esquemas ágiles", descripcion: "Sprint, Kanban y XP explicados mediante ilustraciones vectoriales.", tags: ["Retina", "Galería", "Caption"], estado: "completada", enlace: "agiles.html#scrum" },
  { id: "US-10", area: "Scrum", titulo: "Scrum en detalle", descripcion: "Tabs accesibles y laboratorio de Sprint configurable de una a cuatro semanas.", tags: ["Roles", "Eventos", "Sprint"], estado: "completada", enlace: "agiles.html#scrum-detalle" },
  { id: "US-11", area: "Kanban", titulo: "Tablero Kanban didáctico", descripcion: "Movimiento de tarjetas, límite WIP, persistencia y métricas de flujo.", tags: ["Drag & drop", "WIP", "localStorage"], estado: "completada", enlace: "agiles.html#kanban-detalle" },
  { id: "US-12", area: "Recursos", titulo: "Glosario A–Z", descripcion: "Más de treinta conceptos agrupados, filtrables y normalizados.", tags: ["A–Z", "Búsqueda", "Sin tildes"], estado: "completada", enlace: "recursos.html#glosario" },
  { id: "US-13", area: "Recursos", titulo: "Preguntas frecuentes", descripcion: "Acordeón accesible con las dudas más comunes sobre calidad y metodologías.", tags: ["Acordeón", "Accesible", "FAQ"], estado: "completada", enlace: "recursos.html#faq" },
  { id: "US-14", area: "Recursos", titulo: "Enlaces seguros", descripcion: "Biblioteca filtrable con validación HTTPS e iconos por tipo.", tags: ["SafeLink", "PDF", "Filtros"], estado: "completada", enlace: "recursos.html#enlaces" },
  { id: "US-15", area: "Aprendizaje", titulo: "Casos con solución", descripcion: "Ejercicios y casos abiertos con solución y pauta ocultas por defecto.", tags: ["Casos", "Solución", "Pauta"], estado: "completada", enlace: "recursos.html#ejercicios" },
  { id: "US-16", area: "Equipo", titulo: "Perfiles del equipo", descripcion: "Tarjetas de cada integrante con rol, institución y efecto al pasar el mouse.", tags: ["Hover", "Perfiles", "Responsive"], estado: "completada", enlace: "index.html#nosotros" },
  { id: "US-17", area: "Equipo", titulo: "Formulario de contacto", descripcion: "Validación de campos, contador de caracteres y confirmación en pantalla.", tags: ["Validación", "Accesible", "Contador"], estado: "completada", enlace: "index.html#contacto" },
  { id: "US-18", area: "Herramientas interactivas", titulo: "Comparador de metodologías", descripcion: "Tabla dinámica para contrastar enfoques, entregas, roles y riesgos.", tags: ["Checkboxes", "Tabla", "Datos JS"], estado: "completada", enlace: "interactivas.html#comparador" },
  { id: "US-19", area: "Herramientas interactivas", titulo: "Encuesta de recomendación", descripcion: "Wizard de seis preguntas con porcentajes para Scrum, Kanban y Cascada.", tags: ["Wizard", "Progreso", "Resultado"], estado: "completada", enlace: "interactivas.html#encuesta" },
];

/* Íconos por área (trazos SVG de 24×24) */
const ICONOS_AREA = {
  "Navegación": '<path d="M4 6h16M4 12h16M4 18h10"/>',
  "Gestión de calidad": '<path d="M12 3 4 6v6c0 4.5 3.4 8 8 9 4.6-1 8-4.5 8-9V6z"/><path d="m9 12 2 2 4-4"/>',
  "Herramientas interactivas": '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z"/>',
  "Ciclo de vida": '<path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 4v5h-5"/>',
  "Procesos de desarrollo": '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><path d="M10 6.5h4a3 3 0 0 1 3 3V14"/>',
  "Metodologías ágiles": '<circle cx="12" cy="12" r="8"/><path d="M12 4v4M20 12h-4M12 20v-4M4 12h4"/>',
  "Scrum": '<path d="M4 12a8 8 0 0 1 14.5-4.6"/><path d="M20 12a8 8 0 0 1-14.5 4.6"/><path d="M18.5 3v4.4h-4.4M5.5 21v-4.4h4.4"/>',
  "Kanban": '<rect x="3" y="4" width="5" height="16" rx="1.5"/><rect x="10" y="4" width="5" height="11" rx="1.5"/><rect x="17" y="4" width="4" height="7" rx="1.5"/>',
  "Recursos": '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 21V5M8 7h7M8 11h5"/>',
  "Aprendizaje": '<path d="m2 9 10-5 10 5-10 5z"/><path d="M6 11v5c3 2.5 9 2.5 12 0v-5"/>',
  "Equipo": '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',
};

(function () {
  const grilla = document.querySelector("[data-historias]");
  if (!grilla) return;

  function tarjeta(h) {
    const completada = h.estado === "completada";
    const estado = completada
      ? '<span class="historia-estado"><i aria-hidden="true"></i> Completada</span>'
      : '<span class="historia-estado es-desarrollo"><i aria-hidden="true"></i> En desarrollo</span>';
    const pie = completada
      ? '<span class="historia-link">Ver historia implementada <i aria-hidden="true">→</i></span>'
      : '<span class="historia-link es-proxima">Próximamente en el portal</span>';
    const contenido = `
      <div class="historia-top">
        <span class="historia-id">${h.id}</span>
        ${estado}
      </div>
      <div class="historia-area">
        <span class="historia-icono" aria-hidden="true"><svg viewBox="0 0 24 24">${ICONOS_AREA[h.area] || ""}</svg></span>
        <span>${h.area}</span>
      </div>
      <h3>${h.titulo}</h3>
      <p>${h.descripcion}</p>
      <ul class="historia-tags">${h.tags.map((t) => `<li>${t}</li>`).join("")}</ul>
      ${pie}`;
    return completada
      ? `<li><a class="historia" href="${h.enlace}">${contenido}</a></li>`
      : `<li><article class="historia es-desarrollo">${contenido}</article></li>`;
  }

  grilla.innerHTML = HISTORIAS.map(tarjeta).join("");

  const total = HISTORIAS.filter((h) => h.estado === "completada").length;
  const contador = document.querySelector("[data-historias-total]");
  if (contador) contador.textContent = total;
  const deTotal = document.querySelector("[data-historias-de]");
  if (deTotal) deTotal.textContent = `de ${HISTORIAS.length} completadas`;
})();
