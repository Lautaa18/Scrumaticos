/* =========================================================
   main.js · Componentes interactivos reutilizables
   - Pestañas ............ US-02 (ISO 9126 vs ISO 25000)
   - Acordeón ............ US-13 (FAQ)
   - Tabla de contenidos . US-08 (Metodologías Ágiles)
   - Perfiles ............ US-16 (efecto hover)
   Cada función revisa si su componente existe en la página.
   ========================================================= */

/* ---------- Pestañas accesibles ---------- */
function iniciarPestanas() {
  document.querySelectorAll("[data-tabs]").forEach((grupo) => {
    const tabs = [...grupo.querySelectorAll('[role="tab"]')];

    function activar(tab, mover) {
      tabs.forEach((t) => {
        const sel = t === tab;
        t.setAttribute("aria-selected", sel);
        t.tabIndex = sel ? 0 : -1;
        document.getElementById(t.getAttribute("aria-controls")).hidden = !sel;
      });
      if (mover) tab.focus();
    }

    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => activar(tab, false));
      tab.addEventListener("keydown", (e) => {
        let destino = null;
        if (e.key === "ArrowRight") destino = tabs[(i + 1) % tabs.length];
        if (e.key === "ArrowLeft") destino = tabs[(i - 1 + tabs.length) % tabs.length];
        if (e.key === "Home") destino = tabs[0];
        if (e.key === "End") destino = tabs[tabs.length - 1];
        if (destino) { e.preventDefault(); activar(destino, true); }
      });
    });
  });
}

/* ---------- Acordeón con animación de altura ---------- */
function iniciarAcordeon() {
  document.querySelectorAll("[data-acordeon]").forEach((acordeon) => {
    const unoPorVez = acordeon.hasAttribute("data-uno-por-vez");
    const botones = [...acordeon.querySelectorAll(".acc-btn")];

    function cambiar(btn, abrir) {
      const panel = document.getElementById(btn.getAttribute("aria-controls"));
      btn.setAttribute("aria-expanded", abrir);
      if (abrir) {
        panel.hidden = false;
        panel.style.height = "0px";
        void panel.offsetHeight; // fuerza reflow para que la transición arranque desde 0
        panel.style.height = panel.scrollHeight + "px";
        panel.addEventListener("transitionend", function fin() {
          if (btn.getAttribute("aria-expanded") === "true") panel.style.height = "auto";
          panel.removeEventListener("transitionend", fin);
        });
      } else {
        // pasar de "auto" a un valor fijo para poder animar el cierre
        panel.style.height = panel.scrollHeight + "px";
        requestAnimationFrame(() => (panel.style.height = "0px"));
        panel.addEventListener("transitionend", function fin() {
          if (btn.getAttribute("aria-expanded") === "false") panel.hidden = true;
          panel.removeEventListener("transitionend", fin);
        });
      }
      // sin animación (prefers-reduced-motion): aplicar estado final
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
        panel.style.height = abrir ? "auto" : "0px";
        panel.hidden = !abrir;
      }
    }

    botones.forEach((btn) => {
      btn.addEventListener("click", () => {
        const abrir = btn.getAttribute("aria-expanded") !== "true";
        if (unoPorVez && abrir) {
          botones.forEach((b) => b !== btn && b.getAttribute("aria-expanded") === "true" && cambiar(b, false));
        }
        cambiar(btn, abrir);
      });
    });
  });
}

/* ---------- Tabla de contenidos dinámica (scrollspy) ---------- */
function iniciarIndice() {
  const toc = document.querySelector("[data-toc]");
  if (!toc) return;
  const enlaces = [...toc.querySelectorAll("a[href^='#']")];
  const secciones = enlaces.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);

  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;
      const id = entrada.target.id;
      enlaces.forEach((a) => {
        const activo = a.getAttribute("href") === "#" + id;
        a.classList.toggle("es-activo", activo);
        if (activo) {
          a.setAttribute("aria-current", "location");
          // en móvil, mantener visible el chip activo
          if (getComputedStyle(toc.querySelector("ol")).display === "flex") {
            a.scrollIntoView({ inline: "center", block: "nearest" });
          }
        } else {
          a.removeAttribute("aria-current");
        }
      });
    });
  }, { rootMargin: "-30% 0px -60% 0px" });

  secciones.forEach((s) => observador.observe(s));
}

/* ---------- Perfiles del equipo: luz que sigue al cursor ---------- */
function iniciarPerfiles() {
  document.querySelectorAll(".perfil").forEach((perfil) => {
    perfil.addEventListener("mousemove", (e) => {
      const r = perfil.getBoundingClientRect();
      perfil.style.setProperty("--x", `${e.clientX - r.left}px`);
      perfil.style.setProperty("--y", `${e.clientY - r.top}px`);
    });
    perfil.addEventListener("mouseenter", () => perfil.classList.add("con-luz"));
    perfil.addEventListener("mouseleave", () => perfil.classList.remove("con-luz"));

    // En pantallas táctiles: botón para ver la motivación
    const btn = perfil.querySelector(".perfil-btn");
    if (btn) {
      btn.addEventListener("click", () => {
        const abierto = perfil.classList.toggle("abierto");
        btn.setAttribute("aria-expanded", abierto);
        btn.textContent = abierto ? "Ocultar motivación" : "Ver motivación";
      });
    }
  });
}

iniciarPestanas();
iniciarAcordeon();
iniciarIndice();
iniciarPerfiles();
