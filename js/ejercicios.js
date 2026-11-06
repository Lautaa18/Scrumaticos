/* =========================================================
   ejercicios.js · US-15 Botón Mostrar/Ocultar solución
   Las soluciones arrancan ocultas (atributo hidden en el HTML).
   ========================================================= */
(function () {
  document.querySelectorAll("[data-solucion]").forEach((btn) => {
    const panel = document.getElementById(btn.getAttribute("aria-controls"));
    btn.addEventListener("click", () => {
      const abrir = btn.getAttribute("aria-expanded") !== "true";
      btn.setAttribute("aria-expanded", abrir);
      panel.hidden = !abrir;
      btn.textContent = abrir ? "Ocultar solución" : "Mostrar solución";
    });
  });
})();
