/* =========================================================
   modal.js · Ventanas modales y Lightbox reutilizables
   - US-03: tarjetas de pruebas que abren un modal con detalles
   - US-07 / US-09: diagramas que se amplían a pantalla completa
   Usa <dialog>: cierra con la X, con Esc y con un clic afuera.
   ========================================================= */
(function () {
  // Cierra el diálogo al hacer clic en el fondo (fuera del contenido)
  function cerrarAlClicAfuera(dialogo) {
    dialogo.addEventListener("click", (e) => {
      const r = dialogo.querySelector("[data-contenido]") || dialogo;
      const caja = r.getBoundingClientRect();
      const afuera = e.clientX < caja.left || e.clientX > caja.right || e.clientY < caja.top || e.clientY > caja.bottom;
      if (e.target === dialogo || afuera) dialogo.close();
    });
  }

  /* ---------- Modal de detalles (US-03) ---------- */
  const modal = document.getElementById("modal-detalle");
  if (modal) {
    const titulo = modal.querySelector("h2");
    const cuerpo = modal.querySelector("[data-cuerpo]");
    let origen = null;
    document.querySelectorAll("[data-detalle]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const plantilla = document.getElementById(btn.dataset.detalle);
        titulo.textContent = btn.querySelector("h3").textContent;
        cuerpo.replaceChildren(plantilla.content.cloneNode(true));
        origen = btn;
        btn.setAttribute("aria-expanded", "true");
        modal.showModal();
      });
    });
    modal.querySelector(".modal-cerrar").addEventListener("click", () => modal.close());
    modal.addEventListener("close", () => {
      if (origen) { origen.setAttribute("aria-expanded", "false"); origen.focus(); }
    });
    cerrarAlClicAfuera(modal);
  }

  /* ---------- Lightbox (US-07 y US-09) ---------- */
  const figuras = document.querySelectorAll("[data-lightbox]");
  if (!figuras.length) return;
  const lb = document.createElement("dialog");
  lb.className = "lightbox";
  lb.setAttribute("aria-label", "Imagen ampliada");
  lb.innerHTML = `<button class="modal-cerrar" type="button" aria-label="Cerrar imagen">×</button>
    <div class="lightbox-cuerpo"><figure data-contenido><img alt=""><figcaption></figcaption></figure></div>`;
  document.body.append(lb);
  const img = lb.querySelector("img");
  const pie = lb.querySelector("figcaption");
  let origen = null;
  figuras.forEach((btn) => {
    btn.addEventListener("click", () => {
      const fuente = btn.querySelector("img");
      img.src = fuente.src;
      img.alt = fuente.alt;
      pie.textContent = btn.closest("figure").querySelector("figcaption")?.textContent || "";
      origen = btn;
      lb.showModal();
    });
  });
  lb.querySelector(".modal-cerrar").addEventListener("click", () => lb.close());
  lb.addEventListener("close", () => origen && origen.focus());
  cerrarAlClicAfuera(lb);
})();
