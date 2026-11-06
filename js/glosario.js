/* =========================================================
   glosario.js · US-12 Glosario interactivo
   - Lista A-Z generada desde el arreglo TERMINOS.
   - Buscador en tiempo real que ignora mayúsculas y tildes.
   - Índice de letras: las letras sin términos quedan atenuadas.
   ========================================================= */
const TERMINOS = [
  ["Aceptación (pruebas de)", "Pruebas que hace el cliente o usuario para confirmar que el sistema cumple sus necesidades antes de aceptarlo."],
  ["Backlog", "Lista ordenada de todo el trabajo pendiente del producto. En Scrum se llama Product Backlog."],
  ["Bug", "Nombre informal de un defecto: una falla en el software que produce un resultado incorrecto."],
  ["Burndown", "Gráfico que muestra el trabajo pendiente a lo largo del Sprint para ver si el equipo llegará a terminarlo."],
  ["Caja blanca", "Técnica de prueba que diseña los casos mirando el código interno: caminos, condiciones y bucles."],
  ["Caja negra", "Técnica de prueba que diseña los casos a partir de las entradas y salidas esperadas, sin mirar el código."],
  ["Calidad del software", "Grado en que un sistema cumple los requisitos y las expectativas de sus usuarios."],
  ["Cascada", "Modelo de desarrollo secuencial: cada fase empieza cuando termina la anterior."],
  ["Criterios de aceptación", "Condiciones que una historia de usuario debe cumplir para que el Product Owner la acepte."],
  ["Daily Scrum", "Reunión diaria de 15 minutos en la que el equipo revisa el avance hacia el Objetivo del Sprint."],
  ["Defecto", "Imperfección en un producto que hace que no cumpla sus requisitos."],
  ["Definition of Done", "Acuerdo del equipo sobre cuándo un incremento está terminado y cumple la calidad esperada."],
  ["Eficiencia", "Característica de calidad: buen uso del tiempo de respuesta y de los recursos."],
  ["Épica", "Historia de usuario grande que se divide en historias más pequeñas."],
  ["Fiabilidad", "Capacidad del software de mantener su nivel de desempeño durante un tiempo y en ciertas condiciones."],
  ["Historia de usuario", "Descripción corta de una necesidad: «Como [rol], quiero [algo] para [beneficio]»."],
  ["Incremento", "Resultado utilizable que se suma al producto al terminar un Sprint."],
  ["Integración (pruebas de)", "Pruebas que verifican que varios módulos funcionan bien juntos."],
  ["ISO/IEC 25000", "Familia de normas SQuaRE para evaluar la calidad del producto de software. Reemplaza a ISO 9126."],
  ["Iteración", "Ciclo de trabajo de duración fija que produce una versión del producto."],
  ["Kanban", "Método para gestionar el flujo de trabajo visualizando las tareas y limitando el trabajo en curso."],
  ["Linter", "Herramienta de análisis estático que detecta errores y problemas de estilo en el código."],
  ["Mantenibilidad", "Facilidad con la que el software se puede modificar, corregir o mejorar."],
  ["Métrica", "Medida numérica de una característica del software o del proceso, como la densidad de defectos."],
  ["Modelo en V", "Variante de cascada que asocia cada etapa de desarrollo con un nivel de prueba."],
  ["Pair programming", "Práctica de XP en la que dos personas programan juntas en la misma computadora."],
  ["Product Owner", "Rol de Scrum responsable de maximizar el valor del producto y ordenar el Product Backlog."],
  ["Prueba de regresión", "Repetición de pruebas para asegurar que un cambio no rompió algo que ya funcionaba."],
  ["QA (Quality Assurance)", "Aseguramiento de la calidad: actividades preventivas sobre el proceso para evitar defectos."],
  ["Refactorización", "Mejorar la estructura interna del código sin cambiar su comportamiento."],
  ["Scrum", "Marco de trabajo ágil para desarrollar productos en iteraciones cortas llamadas Sprints."],
  ["Scrum Master", "Rol que ayuda al equipo a aplicar Scrum y elimina los impedimentos."],
  ["Sprint", "Iteración de duración fija, de un mes o menos, en la que se crea un incremento."],
  ["TDD", "Desarrollo guiado por pruebas: primero se escribe la prueba y después el código que la hace pasar."],
  ["Unitaria (prueba)", "Prueba de la unidad más pequeña del código, como una función, de forma aislada."],
  ["Usabilidad", "Facilidad con la que las personas aprenden y usan el software."],
  ["Validación", "Comprobar que se construye el producto correcto: que satisface lo que el usuario necesita."],
  ["Velocidad", "Cantidad de puntos de historia que un equipo termina en un Sprint."],
  ["Verificación", "Comprobar que el producto se construye correctamente: que cumple su especificación."],
  ["WIP (Work in Progress)", "Trabajo en curso. Kanban limita cuántas tareas puede haber a la vez en cada columna."],
  ["XP (Extreme Programming)", "Metodología ágil centrada en prácticas técnicas como TDD, integración continua y pair programming."],
];

(function () {
  const lista = document.querySelector("[data-glosario]");
  if (!lista) return;
  const input = document.querySelector("[data-buscar]");
  const letrasNav = document.querySelector("[data-letras]");
  const vacio = document.querySelector("[data-sin-resultados]");
  const estado = document.querySelector("[data-estado-busqueda]");
  const normalizar = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
  const letraDe = (t) => normalizar(t)[0].toUpperCase();
  const ordenados = [...TERMINOS].sort((a, b) => normalizar(a[0]).localeCompare(normalizar(b[0])));

  function dibujar(filtro) {
    const q = normalizar(filtro);
    const visibles = ordenados.filter(([t, d]) => !q || normalizar(t).includes(q));
    const grupos = {};
    visibles.forEach((par) => (grupos[letraDe(par[0])] ||= []).push(par));
    lista.innerHTML = "";
    Object.keys(grupos).forEach((letra) => {
      const sec = document.createElement("section");
      sec.className = "glosario-letra";
      sec.id = "letra-" + letra;
      sec.innerHTML = `<h2>${letra}</h2><dl></dl>`;
      grupos[letra].forEach(([t, d]) => {
        const div = document.createElement("div");
        div.className = "termino";
        const dt = document.createElement("dt"); dt.textContent = t;
        const dd = document.createElement("dd"); dd.textContent = d;
        div.append(dt, dd);
        sec.querySelector("dl").append(div);
      });
      lista.append(sec);
    });
    vacio.hidden = visibles.length > 0;
    estado.textContent = q ? `${visibles.length} ${visibles.length === 1 ? "resultado" : "resultados"}` : `${ordenados.length} términos`;
    // índice: solo navegan las letras con términos visibles
    letrasNav.innerHTML = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((l) =>
      grupos[l] ? `<li><a href="#letra-${l}" aria-label="Ir a la letra ${l}">${l}</a></li>` : `<li><span aria-hidden="true">${l}</span></li>`
    ).join("");
  }
  input.addEventListener("input", () => dibujar(input.value));
  dibujar("");
})();
