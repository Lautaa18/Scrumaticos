/* =========================================================
   kanban.js · US-11 Tablero Kanban didáctico
   - Mover tarjetas arrastrando (mouse o dedo) o con los botones.
   - "En proceso" tiene un límite WIP de 2 tarjetas.
   - El estado se guarda en localStorage.
   ========================================================= */
(function () {
  const tablero = document.querySelector("[data-kanban]");
  if (!tablero) return;
  const CLAVE = "scrumaticos-kanban";
  const WIP = 2;
  const COLUMNAS = ["hacer", "proceso", "hecho"];
  const INICIAL = [
    { id: "t1", titulo: "Diseñar el login", detalle: "Prototipo en Figma", col: "hacer" },
    { id: "t2", titulo: "Escribir casos de prueba", detalle: "Plan de pruebas US-12", col: "hacer" },
    { id: "t3", titulo: "Corregir menú en celular", detalle: "Bug reportado por QA", col: "hacer" },
    { id: "t4", titulo: "Programar el buscador", detalle: "Glosario en JS", col: "proceso" },
    { id: "t5", titulo: "Publicar la FAQ", detalle: "Página faq.html", col: "hecho" },
  ];
  const aviso = document.querySelector("[data-aviso-wip]");
  let tarjetas = cargar();

  function cargar() {
    try {
      const guardado = JSON.parse(localStorage.getItem(CLAVE));
      if (Array.isArray(guardado) && guardado.every((t) => COLUMNAS.includes(t.col))) return guardado;
    } catch (e) { /* sin almacenamiento: usar el estado inicial */ }
    return INICIAL.map((t) => ({ ...t }));
  }
  function guardar() {
    try { localStorage.setItem(CLAVE, JSON.stringify(tarjetas)); } catch (e) { /* ignorar */ }
  }
  function enProceso() { return tarjetas.filter((t) => t.col === "proceso").length; }
  function avisar(texto) {
    aviso.textContent = texto;
    aviso.hidden = !texto;
  }
  function mover(id, destino) {
    const t = tarjetas.find((x) => x.id === id);
    if (!t || t.col === destino) return false;
    if (destino === "proceso" && enProceso() >= WIP) {
      avisar(`Límite WIP alcanzado: "En proceso" admite ${WIP} tarjetas. Terminá una antes de empezar otra.`);
      return false;
    }
    t.col = destino;
    avisar("");
    guardar();
    dibujar();
    return true;
  }
  function dibujar() {
    COLUMNAS.forEach((col, i) => {
      const zona = tablero.querySelector(`[data-col="${col}"]`);
      const lista = zona.querySelector("[data-lista]");
      const propias = tarjetas.filter((t) => t.col === col);
      zona.querySelector("output").textContent = col === "proceso" ? `${propias.length} / ${WIP}` : propias.length;
      zona.classList.toggle("esta-llena", col === "proceso" && propias.length >= WIP);
      lista.innerHTML = "";
      propias.forEach((t) => {
        const el = document.createElement("li");
        el.className = "k-tarjeta";
        el.dataset.id = t.id;
        el.innerHTML = `<strong></strong><small></small>
          <div class="k-acciones">
            <button type="button" data-dir="-1" aria-label="Mover a la columna anterior" ${i === 0 ? "disabled" : ""}>◀</button>
            <button type="button" data-dir="1" aria-label="Mover a la columna siguiente" ${i === 2 ? "disabled" : ""}>▶</button>
          </div>`;
        el.querySelector("strong").textContent = t.titulo;
        el.querySelector("small").textContent = t.detalle;
        el.querySelectorAll("[data-dir]").forEach((b) => b.addEventListener("click", () => {
          mover(t.id, COLUMNAS[i + Number(b.dataset.dir)]);
          const nueva = tablero.querySelector(`[data-id="${t.id}"] [data-dir="${b.dataset.dir}"]`);
          (nueva && !nueva.disabled ? nueva : tablero.querySelector(`[data-id="${t.id}"] button:not(:disabled)`))?.focus();
        }));
        el.addEventListener("pointerdown", (e) => iniciarArrastre(e, el));
        lista.append(el);
      });
    });
  }

  /* Arrastre con Pointer Events: funciona con mouse, lápiz y dedo */
  function iniciarArrastre(e, el) {
    if (e.target.closest("button")) return;
    e.preventDefault();
    const fantasma = el.cloneNode(true);
    const caja = el.getBoundingClientRect();
    Object.assign(fantasma.style, { position: "fixed", left: caja.left + "px", top: caja.top + "px", width: caja.width + "px", pointerEvents: "none", zIndex: 50, margin: 0 });
    document.body.append(fantasma);
    el.classList.add("arrastrando");
    const dx = e.clientX - caja.left, dy = e.clientY - caja.top;
    let sobre = null;
    function mov(ev) {
      fantasma.style.left = ev.clientX - dx + "px";
      fantasma.style.top = ev.clientY - dy + "px";
      const col = document.elementFromPoint(ev.clientX, ev.clientY)?.closest("[data-col]");
      if (sobre && sobre !== col) sobre.classList.remove("es-destino");
      sobre = col;
      if (col) col.classList.add("es-destino");
    }
    function fin() {
      document.removeEventListener("pointermove", mov);
      document.removeEventListener("pointerup", fin);
      document.removeEventListener("pointercancel", fin);
      fantasma.remove();
      el.classList.remove("arrastrando");
      if (sobre) { sobre.classList.remove("es-destino"); mover(el.dataset.id, sobre.dataset.col); }
    }
    document.addEventListener("pointermove", mov);
    document.addEventListener("pointerup", fin);
    document.addEventListener("pointercancel", fin);
  }

  document.querySelector("[data-kanban-reiniciar]")?.addEventListener("click", () => {
    tarjetas = INICIAL.map((t) => ({ ...t }));
    guardar();
    avisar("");
    dibujar();
  });
  dibujar();
})();
