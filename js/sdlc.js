/* =========================================================
   sdlc.js · US-05 Ciclo de vida del software
   - Las etapas se iluminan a medida que aparecen al hacer scroll.
   - Clic en una etapa (o en su botón) la resalta y baja suave.
   ========================================================= */
(function () {
  const etapas = [...document.querySelectorAll(".etapa")];
  if (!etapas.length) return;
  const botones = document.querySelectorAll("[data-ir-etapa]");

  function activar(id, desplazar) {
    etapas.forEach((e) => e.classList.toggle("es-activa", e.id === id));
    botones.forEach((b) => b.setAttribute("aria-pressed", b.dataset.irEtapa === id));
    const etapa = document.getElementById(id);
    etapa.classList.add("es-visible");
    if (desplazar) {
      const suave = !matchMedia("(prefers-reduced-motion: reduce)").matches;
      etapa.scrollIntoView({ behavior: suave ? "smooth" : "auto", block: "center" });
    }
  }

  const obs = new IntersectionObserver((entradas) => {
    entradas.forEach((en) => en.isIntersecting && en.target.classList.add("es-visible"));
  }, { threshold: 0.4 });
  etapas.forEach((e) => {
    obs.observe(e);
    e.querySelector(".etapa-num").addEventListener("click", () => activar(e.id, false));
    e.querySelector(".etapa-cuerpo").addEventListener("click", () => activar(e.id, false));
  });
  botones.forEach((b) => b.addEventListener("click", () => activar(b.dataset.irEtapa, true)));
})();
