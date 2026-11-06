/* =========================================================
   filtros.js · US-04 Herramientas de Calidad
   Botones que muestran solo las tarjetas de una categoría,
   sin recargar la página.
   ========================================================= */
(function () {
  const botones = document.querySelectorAll("[data-filtro]");
  const tarjetas = document.querySelectorAll("[data-categoria]");
  const contador = document.querySelector("[data-contador-filtro]");
  if (!botones.length) return;

  function filtrar(categoria) {
    let visibles = 0;
    tarjetas.forEach((t) => {
      const mostrar = categoria === "todas" || t.dataset.categoria === categoria;
      t.hidden = !mostrar;
      if (mostrar) visibles++;
    });
    botones.forEach((b) => b.setAttribute("aria-pressed", b.dataset.filtro === categoria));
    if (contador) contador.textContent = `Mostrando ${visibles} de ${tarjetas.length} herramientas`;
  }

  botones.forEach((b) => b.addEventListener("click", () => filtrar(b.dataset.filtro)));
  filtrar("todas");
})();
