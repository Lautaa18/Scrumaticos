/* =========================================================
   scrum.js · US-10 Diagrama interactivo del Sprint
   El usuario elige la duración del Sprint (1 a 4 semanas) y hace
   clic en un evento para ver su duración sugerida y su objetivo.
   Las duraciones máximas siguen la Guía Scrum 2020 (para un Sprint
   de un mes) y se reducen en proporción para Sprints más cortos.
   ========================================================= */
(function () {
  const lab = document.querySelector("[data-sprint-lab]");
  if (!lab) return;

  // minutos máximos para un Sprint de 4 semanas
  const EVENTOS = {
    planning: { nombre: "Sprint Planning", max4: 480, objetivo: "Definir el Objetivo del Sprint, elegir los elementos del Product Backlog y planificar cómo convertirlos en un incremento." },
    daily:    { nombre: "Daily Scrum", fijo: 15, objetivo: "Inspeccionar el avance hacia el Objetivo del Sprint y adaptar el plan del día. Se hace todos los días, a la misma hora y en el mismo lugar." },
    review:   { nombre: "Sprint Review", max4: 240, objetivo: "Mostrar el incremento a los interesados, recibir su opinión y adaptar el Product Backlog." },
    retro:    { nombre: "Sprint Retrospective", max4: 180, objetivo: "Revisar cómo trabajó el equipo (personas, procesos y herramientas) y acordar mejoras para el próximo Sprint." },
  };
  let semanas = 2;
  let actual = null;
  const crono = lab.querySelector("[data-cronograma]");
  const info = lab.querySelector("[data-evento-info]");
  const botonesSemana = lab.querySelectorAll("[data-semanas]");
  const botonesEvento = lab.querySelectorAll("[data-evento]");

  function formato(min) {
    if (min < 60) return `${min} minutos`;
    const h = Math.floor(min / 60), m = min % 60;
    return `${h} ${h === 1 ? "hora" : "horas"}${m ? ` y ${m} minutos` : ""}`;
  }
  function duracion(ev) {
    const e = EVENTOS[ev];
    if (e.fijo) return `${formato(e.fijo)} por día`;
    return `hasta ${formato(Math.round((e.max4 * semanas) / 4))}`;
  }
  function dibujarCronograma() {
    const dias = semanas * 5;
    crono.style.setProperty("--dias", Math.min(dias, 10));
    crono.innerHTML = Array.from({ length: dias }, (_, i) => {
      const etiqueta = i === 0 ? "Plan" : i === dias - 1 ? "Rev/Retro" : "Daily";
      return `<span class="dia" title="Día ${i + 1}">${etiqueta}</span>`;
    }).join("");
  }
  function mostrar(ev) {
    actual = ev;
    botonesEvento.forEach((b) => b.setAttribute("aria-pressed", b.dataset.evento === ev));
    const e = EVENTOS[ev];
    info.hidden = false;
    info.innerHTML = `<h3>${e.nombre}</h3>
      <p class="duracion">Duración sugerida: <span data-duracion>${duracion(ev)}</span> (Sprint de ${semanas} ${semanas === 1 ? "semana" : "semanas"})</p>
      <p>${e.objetivo}</p>`;
  }
  botonesSemana.forEach((b) => b.addEventListener("click", () => {
    semanas = Number(b.dataset.semanas);
    botonesSemana.forEach((x) => x.setAttribute("aria-pressed", x === b));
    dibujarCronograma();
    if (actual) mostrar(actual);
  }));
  botonesEvento.forEach((b) => b.addEventListener("click", () => mostrar(b.dataset.evento)));
  dibujarCronograma();
})();
