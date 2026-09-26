/* =========================================================
   layout.js · Header, menú desplegable y footer compartidos
   US-01 [JS]: menú hamburguesa dinámico + resaltado de sección activa
   Para agregar una página nueva: completá su "href" en NAV.
   Si "href" es null, se muestra como "Próximamente" (sin enlace roto).
   ========================================================= */
const NAV = [
  { label: "Inicio", href: "index.html", id: "inicio" },
  {
    label: "Gestión de la Calidad del Software",
    hijos: [
      { label: "Fundamentos", href: "fundamentos.html", id: "fundamentos" },
      { label: "Técnicas de QA", href: null, id: "tecnicas" },
      { label: "Herramientas", href: null, id: "herramientas" },
    ],
  },
  {
    label: "Procesos de Desarrollo",
    hijos: [
      { label: "SDLC", href: null, id: "sdlc" },
      { label: "Modelos Tradicionales", href: null, id: "tradicionales" },
      { label: "Metodologías Ágiles", href: "agiles.html", id: "agiles" },
    ],
  },
  {
    label: "Metodologías Ágiles",
    hijos: [
      { label: "Manifiesto Ágil", href: "agiles.html#manifiesto", id: "agiles", ancla: true },
      { label: "Scrum", href: "agiles.html#scrum", id: "agiles", ancla: true },
      { label: "Kanban", href: "agiles.html#kanban", id: "agiles", ancla: true },
      { label: "XP (Extreme Programming)", href: "agiles.html#xp", id: "agiles", ancla: true },
      { label: "Ágil vs. tradicional", href: "agiles.html#comparativa", id: "agiles", ancla: true },
    ],
  },
  {
    label: "Recursos y Aprendizaje",
    hijos: [
      { label: "Glosario", href: null, id: "glosario" },
      { label: "Preguntas Frecuentes", href: null, id: "faq" },
      { label: "Enlaces de Interés", href: null, id: "enlaces" },
      { label: "Ejercicios", href: null, id: "ejercicios" },
    ],
  },
  {
    label: "Herramientas JS",
    hijos: [
      { label: "Comparador", href: null, id: "comparador" },
      { label: "Encuesta", href: null, id: "encuesta" },
    ],
  },
  { label: "Sobre Nosotros", href: "index.html#nosotros", id: "inicio", ancla: true },
  { label: "Contacto", href: "index.html#contacto", id: "inicio", ancla: true },
];

(function () {
  const paginaActual = document.body.dataset.page;

  function enlace(item) {
    if (!item.href) {
      return `<span class="menu-link proximamente" aria-disabled="true">${item.label} <small>Próximamente</small></span>`;
    }
    const actual = item.id === paginaActual && !item.ancla ? ' aria-current="page"' : "";
    return `<a class="menu-link" href="${item.href}"${actual}>${item.label}</a>`;
  }

  function construirMenu() {
    return NAV.map((item, i) => {
      if (!item.hijos) return `<li>${enlace(item)}</li>`;
      const activo = item.hijos.some((h) => h.id === paginaActual);
      const subId = `submenu-${i}`;
      return `<li>
        <button class="menu-grupo${activo ? " es-activo" : ""}" aria-expanded="${activo}" aria-controls="${subId}">
          ${item.label}<span class="flecha" aria-hidden="true">▼</span>
        </button>
        <ul class="submenu" id="${subId}"${activo ? "" : " hidden"}>
          ${item.hijos.map((h) => `<li>${enlace(h)}</li>`).join("")}
        </ul>
      </li>`;
    }).join("");
  }

  const header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML = `
    <a class="skip-link" href="#contenido">Saltar al contenido</a>
    <a class="logo" href="index.html" aria-label="SCrumáticos, ir al inicio">
      <img src="img/logo-scrumaticos.png" alt="" width="182" height="24">
    </a>
    <button class="menu-btn" aria-expanded="false" aria-controls="menu-principal" aria-label="Abrir menú">
      <span></span>
    </button>
    <nav id="menu-principal" class="menu" aria-label="Principal" hidden>
      <ul>${construirMenu()}</ul>
    </nav>`;
  document.body.prepend(header);

  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.textContent = `Gestión de Calidad de Software · SCrumáticos · ${new Date().getFullYear()}`;
  document.body.append(footer);

  // ---- Comportamiento del menú ----
  const btn = header.querySelector(".menu-btn");
  const menu = header.querySelector(".menu");

  function abrir() {
    menu.hidden = false;
    btn.setAttribute("aria-expanded", "true");
    btn.setAttribute("aria-label", "Cerrar menú");
  }
  function cerrar(devolverFoco) {
    menu.hidden = true;
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-label", "Abrir menú");
    if (devolverFoco) btn.focus();
  }

  btn.addEventListener("click", () => (menu.hidden ? abrir() : cerrar(false)));

  // Submenús: se abre uno a la vez
  menu.querySelectorAll(".menu-grupo").forEach((grupo) => {
    grupo.addEventListener("click", () => {
      const abierto = grupo.getAttribute("aria-expanded") === "true";
      menu.querySelectorAll(".menu-grupo").forEach((g) => {
        g.setAttribute("aria-expanded", "false");
        document.getElementById(g.getAttribute("aria-controls")).hidden = true;
      });
      if (!abierto) {
        grupo.setAttribute("aria-expanded", "true");
        document.getElementById(grupo.getAttribute("aria-controls")).hidden = false;
      }
    });
  });

  // Cerrar el menú al elegir un enlace
  menu.querySelectorAll("a.menu-link").forEach((a) => a.addEventListener("click", () => cerrar(false)));

  // Cerrar con Escape o clic afuera
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !menu.hidden) cerrar(true);
  });
  document.addEventListener("click", (e) => {
    if (!menu.hidden && !menu.contains(e.target) && !btn.contains(e.target)) cerrar(false);
  });
})();
