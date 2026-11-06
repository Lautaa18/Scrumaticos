/* =========================================================
   comparador.js · US-18 Comparador interactivo de metodologías
   La tabla se arma leyendo el arreglo METODOLOGIAS según las
   casillas marcadas. Se necesitan al menos dos para comparar.
   ========================================================= */
const CARACTERISTICAS = [
  ["tipo", "Tipo"],
  ["enfoque", "Enfoque"],
  ["entregas", "Entregas"],
  ["roles", "Roles"],
  ["flexibilidad", "Flexibilidad ante cambios"],
  ["cliente", "Participación del cliente"],
  ["documentacion", "Documentación"],
  ["ideal", "Ideal para"],
];
const METODOLOGIAS = [
  { id: "cascada", nombre: "Cascada", tipo: "Tradicional", enfoque: "Secuencial: una fase por vez", entregas: "Una sola entrega al final", roles: "Jefe de proyecto, analistas, programadores, testers", flexibilidad: "baja", cliente: "baja", documentacion: "Extensa y formal", ideal: "Requisitos estables y bien definidos" },
  { id: "v", nombre: "Modelo en V", tipo: "Tradicional", enfoque: "Secuencial con pruebas por nivel", entregas: "Una sola entrega al final", roles: "Jefe de proyecto, analistas, programadores, testers", flexibilidad: "baja", cliente: "media", documentacion: "Extensa, con planes de prueba", ideal: "Sistemas críticos que exigen verificación" },
  { id: "iterativo", nombre: "Iterativo e incremental", tipo: "Tradicional", enfoque: "Ciclos que agregan funcionalidad", entregas: "Un incremento por iteración", roles: "Jefe de proyecto y equipo de desarrollo", flexibilidad: "media", cliente: "media", documentacion: "Moderada", ideal: "Proyectos grandes que se pueden dividir" },
  { id: "scrum", nombre: "Scrum", tipo: "Ágil", enfoque: "Iterativo en Sprints de 1 a 4 semanas", entregas: "Un incremento por Sprint", roles: "Product Owner, Scrum Master, Developers", flexibilidad: "alta", cliente: "alta", documentacion: "Liviana: backlog e incremento", ideal: "Requisitos cambiantes y entregas frecuentes" },
  { id: "kanban", nombre: "Kanban", tipo: "Ágil", enfoque: "Flujo continuo con límite WIP", entregas: "Continuas, cuando una tarea termina", roles: "Sin roles obligatorios", flexibilidad: "alta", cliente: "media", documentacion: "Mínima: tablero y políticas", ideal: "Soporte, mantenimiento y trabajo continuo" },
  { id: "xp", nombre: "XP", tipo: "Ágil", enfoque: "Iteraciones cortas con prácticas técnicas", entregas: "Pequeñas y frecuentes (1 a 3 semanas)", roles: "Cliente, programadores, coach, tracker", flexibilidad: "alta", cliente: "alta", documentacion: "Mínima: código y pruebas", ideal: "Equipos chicos con foco en calidad del código" },
];
const NIVELES = { alta: "Alta", media: "Media", baja: "Baja" };

(function () {
  const form = document.querySelector("[data-comparador]");
  if (!form) return;
  const salida = document.querySelector("[data-tabla-comparador]");
  const aviso = document.querySelector("[data-aviso-comparador]");

  form.querySelector("fieldset").insertAdjacentHTML("beforeend", METODOLOGIAS.map((m) =>
    `<label class="check"><input type="checkbox" name="metodo" value="${m.id}"> ${m.nombre}</label>`).join(""));

  function celda(valor, clave) {
    if (clave === "flexibilidad" || clave === "cliente") return `<span class="badge ${valor}">${NIVELES[valor]}</span>`;
    return valor;
  }
  function dibujar() {
    const elegidas = METODOLOGIAS.filter((m) => form.querySelector(`input[value="${m.id}"]`).checked);
    if (elegidas.length < 2) {
      salida.innerHTML = "";
      aviso.hidden = false;
      aviso.textContent = elegidas.length === 1
        ? `Elegiste ${elegidas[0].nombre}. Marcá al menos una metodología más para comparar.`
        : "Marcá al menos dos metodologías para ver la tabla comparativa.";
      return;
    }
    aviso.hidden = true;
    salida.innerHTML = `<div class="tabla-wrap"><table class="comparador-tabla">
      <caption class="sr-only">Comparación de ${elegidas.map((m) => m.nombre).join(", ")}</caption>
      <thead><tr><th scope="col">Característica</th>${elegidas.map((m) => `<th scope="col">${m.nombre}</th>`).join("")}</tr></thead>
      <tbody>${CARACTERISTICAS.map(([clave, nombre]) =>
        `<tr><th scope="row">${nombre}</th>${elegidas.map((m) => `<td>${celda(m[clave], clave)}</td>`).join("")}</tr>`).join("")}
      </tbody></table></div>`;
  }
  form.addEventListener("change", dibujar);
  form.addEventListener("reset", () => setTimeout(dibujar));
  dibujar();
})();
