/* =========================================================
   subnav.js · US-06 Navegación interna de Modelos Tradicionales
   Marca el modelo visible y baja suave al hacer clic.
   ========================================================= */
(function () {
  const nav = document.querySelector("[data-subnav]");
  if (!nav) return;
  const enlaces = [...nav.querySelectorAll("a")];
  const secciones = enlaces.map((a) => document.querySelector(a.getAttribute("href")));

  function marcar(id) {
    enlaces.forEach((a) => {
      const activo = a.getAttribute("href") === "#" + id;
      a.classList.toggle("es-activo", activo);
      activo ? a.setAttribute("aria-current", "location") : a.removeAttribute("aria-current");
    });
  }
  enlaces.forEach((a) => a.addEventListener("click", (e) => {
    e.preventDefault();
    const id = a.getAttribute("href").slice(1);
    const suave = !matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(id).scrollIntoView({ behavior: suave ? "smooth" : "auto" });
    history.replaceState(null, "", "#" + id);
    marcar(id);
  }));
  const obs = new IntersectionObserver((ents) => {
    ents.forEach((en) => en.isIntersecting && marcar(en.target.id));
  }, { rootMargin: "-35% 0px -55% 0px" });
  secciones.forEach((s) => obs.observe(s));
  if (location.hash) marcar(location.hash.slice(1));
})();
