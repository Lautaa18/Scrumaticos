/* =========================================================
   encuesta.js · US-19 Encuesta de preferencias metodológicas
   Asistente de 6 preguntas. Cada respuesta suma puntos a Scrum,
   Kanban o Cascada; al final se muestra el porcentaje de cada una.
   ========================================================= */
const PREGUNTAS = [
  { texto: "¿Qué tamaño tiene el proyecto?", opciones: [
    { t: "Chico, con alcance cerrado", p: { cascada: 3, scrum: 1, kanban: 1 } },
    { t: "Mediano, con varias funcionalidades por priorizar", p: { cascada: 1, scrum: 3, kanban: 1 } },
    { t: "Es trabajo continuo, sin un final fijo", p: { cascada: 0, scrum: 1, kanban: 3 } } ] },
  { texto: "¿Qué tan estables son los requisitos?", opciones: [
    { t: "Fijos: se conocen desde el inicio", p: { cascada: 3, scrum: 0, kanban: 1 } },
    { t: "Cambian seguido según lo que pide el cliente", p: { cascada: 0, scrum: 3, kanban: 2 } },
    { t: "Llegan pedidos nuevos todo el tiempo", p: { cascada: 0, scrum: 1, kanban: 3 } } ] },
  { texto: "¿Qué tan complejo es el producto?", opciones: [
    { t: "Poco complejo y conocido", p: { cascada: 3, scrum: 1, kanban: 1 } },
    { t: "Complejo, con incertidumbre técnica", p: { cascada: 0, scrum: 3, kanban: 1 } },
    { t: "Tareas parecidas y repetitivas", p: { cascada: 1, scrum: 0, kanban: 3 } } ] },
  { texto: "¿Cada cuánto querés entregar algo funcionando?", opciones: [
    { t: "Una sola vez, al final", p: { cascada: 3, scrum: 0, kanban: 0 } },
    { t: "Cada pocas semanas", p: { cascada: 0, scrum: 3, kanban: 1 } },
    { t: "Apenas cada tarea esté lista", p: { cascada: 0, scrum: 1, kanban: 3 } } ] },
  { texto: "¿Cuánto participa el cliente?", opciones: [
    { t: "Al principio y al final", p: { cascada: 3, scrum: 0, kanban: 1 } },
    { t: "En revisiones periódicas", p: { cascada: 0, scrum: 3, kanban: 1 } },
    { t: "Envía pedidos cuando los necesita", p: { cascada: 0, scrum: 1, kanban: 3 } } ] },
  { texto: "¿Hay fechas de entrega fijas?", opciones: [
    { t: "Sí, una fecha final cerrada con contrato", p: { cascada: 3, scrum: 1, kanban: 0 } },
    { t: "Sí, por iteraciones de duración fija", p: { cascada: 0, scrum: 3, kanban: 0 } },
    { t: "No, se trabaja por prioridad sin fechas fijas", p: { cascada: 0, scrum: 0, kanban: 3 } } ] },
];
const RESUMEN = {
  scrum: "Tu proyecto se beneficia de iteraciones cortas, revisiones con el cliente y un backlog priorizado.",
  kanban: "Tu trabajo es un flujo continuo: visualizá las tareas en un tablero y limitá el trabajo en curso.",
  cascada: "Con requisitos estables y una entrega final, un plan secuencial por fases es suficiente.",
};
const NOMBRES = { scrum: "Scrum", kanban: "Kanban", cascada: "Cascada" };

// Calcula porcentajes enteros que siempre suman 100 (método del mayor resto)
function calcularResultado(respuestas) {
  const total = { scrum: 0, kanban: 0, cascada: 0 };
  respuestas.forEach((r, i) => Object.entries(PREGUNTAS[i].opciones[r].p).forEach(([k, v]) => (total[k] += v)));
  const suma = Object.values(total).reduce((a, b) => a + b, 0);
  const base = Object.entries(total).map(([k, v]) => ({ k, exacto: (v * 100) / suma }));
  base.forEach((b) => (b.pct = Math.floor(b.exacto)));
  let resto = 100 - base.reduce((a, b) => a + b.pct, 0);
  [...base].sort((a, b) => (b.exacto - b.pct) - (a.exacto - a.pct)).forEach((b) => { if (resto-- > 0) b.pct++; });
  return Object.fromEntries(base.map((b) => [b.k, b.pct]));
}

(function () {
  const wiz = document.querySelector("[data-encuesta]");
  if (!wiz) return;
  const barra = wiz.querySelector(".progreso div");
  const pasoTxt = wiz.querySelector("[data-paso]");
  const cuerpo = wiz.querySelector("[data-pregunta]");
  const aviso = wiz.querySelector("[data-aviso-encuesta]");
  const btnAnt = wiz.querySelector("[data-anterior]");
  const btnSig = wiz.querySelector("[data-siguiente]");
  const barraWrap = wiz.querySelector(".progreso");
  let paso = 0;
  let respuestas = [];

  function progreso(valor) {
    barra.style.width = valor + "%";
    barraWrap.setAttribute("aria-valuenow", Math.round(valor));
  }
  function pregunta() {
    const p = PREGUNTAS[paso];
    progreso((paso / PREGUNTAS.length) * 100);
    pasoTxt.textContent = `Pregunta ${paso + 1} de ${PREGUNTAS.length}`;
    cuerpo.innerHTML = `<fieldset class="opciones"><legend>${p.texto}</legend>
      ${p.opciones.map((o, i) => `<label class="opcion"><input type="radio" name="r" value="${i}" ${respuestas[paso] === i ? "checked" : ""}> ${o.t}</label>`).join("")}
    </fieldset>`;
    aviso.hidden = true;
    btnAnt.hidden = paso === 0;
    btnSig.hidden = false;
    btnSig.textContent = paso === PREGUNTAS.length - 1 ? "Ver resultado" : "Siguiente";
    cuerpo.querySelectorAll("input").forEach((inp) => inp.addEventListener("change", () => (aviso.hidden = true)));
  }
  function resultado() {
    progreso(100);
    pasoTxt.textContent = "Resultado";
    const pct = calcularResultado(respuestas);
    const ganadora = Object.keys(pct).reduce((a, b) => (pct[b] > pct[a] ? b : a));
    cuerpo.innerHTML = `<h2>Te recomendamos <span class="degradado">${NOMBRES[ganadora]}</span></h2>
      <p class="suave">${RESUMEN[ganadora]}</p>
      <div class="resultado-barras" data-resultado>
        ${Object.keys(NOMBRES).map((k) => `<div class="res-fila${k === ganadora ? " es-ganadora" : ""}" data-metodo="${k}">
          <strong>${NOMBRES[k]}</strong><div class="res-barra"><div style="width:${pct[k]}%"></div></div><span data-pct>${pct[k]} %</span></div>`).join("")}
      </div>
      <button class="btn" type="button" data-reiniciar>Volver a empezar</button>`;
    btnAnt.hidden = true;
    btnSig.hidden = true;
    cuerpo.querySelector("[data-reiniciar]").addEventListener("click", () => {
      respuestas = [];
      paso = 0;
      pregunta();
      cuerpo.querySelector("input").focus();
    });
  }
  btnSig.addEventListener("click", () => {
    const marcada = cuerpo.querySelector("input:checked");
    if (!marcada) {
      aviso.hidden = false;
      aviso.textContent = "Elegí una opción para continuar.";
      return;
    }
    respuestas[paso] = Number(marcada.value);
    if (paso < PREGUNTAS.length - 1) { paso++; pregunta(); } else { resultado(); }
  });
  btnAnt.addEventListener("click", () => {
    const marcada = cuerpo.querySelector("input:checked");
    if (marcada) respuestas[paso] = Number(marcada.value);
    paso--;
    pregunta();
  });
  pregunta();
})();
