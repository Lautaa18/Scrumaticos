/* =========================================================
   enlaces.js · US-14 Enlaces de interés
   Genera las tarjetas desde ENLACES y asegura que cada enlace
   externo se abra en otra pestaña con rel="noopener noreferrer".
   ========================================================= */
const ENLACES = [
  { tipo: "web", titulo: "La Guía de Scrum (español)", url: "https://scrumguides.org/docs/scrumguide/v2020/2020-Scrum-Guide-Spanish-European.pdf", desc: "Guía oficial de Scrum 2020, escrita por sus creadores." },
  { tipo: "org", titulo: "Manifiesto Ágil", url: "https://agilemanifesto.org/iso/es/manifesto.html", desc: "Los 4 valores y 12 principios del desarrollo ágil." },
  { tipo: "org", titulo: "Portal ISO 25000", url: "https://iso25000.com/", desc: "Explicación de la familia de normas ISO/IEC 25000 (SQuaRE)." },
  { tipo: "org", titulo: "ISTQB", url: "https://www.istqb.org/", desc: "Organización internacional que certifica testers de software." },
  { tipo: "pdf", titulo: "Syllabus ISTQB Foundation (español)", url: "https://www.sstqb.es/ficheros/sstqb_file100-60ce7b.pdf", desc: "Programa de estudio del nivel básico de pruebas de software." },
  { tipo: "web", titulo: "Atlassian: guía de Kanban", url: "https://www.atlassian.com/es/agile/kanban", desc: "Qué es Kanban, tableros, límites WIP y métricas de flujo." },
  { tipo: "web", titulo: "MDN Web Docs", url: "https://developer.mozilla.org/es/", desc: "Documentación de HTML, CSS y JavaScript que usamos en el sitio." },
  { tipo: "libro", titulo: "Ingeniería de Software — Ian Sommerville", url: "https://www.pearson.com/en-us/subject-catalog/p/software-engineering/P200000003258", desc: "Libro de referencia sobre procesos, modelos y calidad." },
  { tipo: "libro", titulo: "Extreme Programming Explained — Kent Beck", url: "https://www.oreilly.com/library/view/extreme-programming-explained/0321278658/", desc: "El libro que presentó XP y sus prácticas." },
];
const ICONOS_ENLACE = {
  web: { nombre: "Sitio web", svg: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>' },
  pdf: { nombre: "PDF", svg: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 14h8M8 17h5"/>' },
  libro: { nombre: "Libro", svg: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 21V5M8 7h7"/>' },
  org: { nombre: "Organización", svg: '<path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6"/>' },
};

(function () {
  const cont = document.querySelector("[data-enlaces]");
  if (!cont) return;
  ENLACES.forEach((e) => {
    const a = document.createElement("a");
    a.className = "tarjeta enlace-tarjeta";
    a.href = e.url;
    a.innerHTML = `<span class="ico" aria-hidden="true"><svg viewBox="0 0 24 24">${ICONOS_ENLACE[e.tipo].svg}</svg></span>
      <span><span class="tipo">${ICONOS_ENLACE[e.tipo].nombre}</span><h3></h3><p></p></span>`;
    a.querySelector("h3").textContent = e.titulo;
    a.querySelector("p").textContent = e.desc;
    a.setAttribute("aria-label", `${e.titulo} (${ICONOS_ENLACE[e.tipo].nombre}, se abre en una pestaña nueva)`);
    cont.append(a);
  });
  // Apertura segura: cualquier enlace a otro sitio abre en pestaña nueva sin acceso a window.opener
  document.querySelectorAll('a[href^="http"]').forEach((a) => {
    if (new URL(a.href).origin === location.origin) return;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
  });
})();
