import {
  CSSProperties,
  FormEvent,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import teamLogo from "./assets/logo-equipo.jpg"
import brandLogo from "./assets/logo-scrumaticos.png"
import lautaroAvatar from "./assets/lautaro.gif"
import cascadeDiagram from "./assets/diagrams/modelo-cascada.svg"
import incrementalDiagram from "./assets/diagrams/modelo-incremental.svg"
import iterativeDiagram from "./assets/diagrams/modelo-iterativo.svg"
import vDiagram from "./assets/diagrams/modelo-v.svg"
import { Lightbox, LightboxItem } from "./components/Lightbox"
import { AgilesPage } from "./pages/AgilesPage"
import { ComparatorPage, SurveyPage } from "./pages/InteractivePages"

type NavItem = {
  label: string
  target?: string
  children?: Array<{
    label: string
    available?: boolean
  }>
}

type Page = "home" | "procesos" | "recursos" | "herramientas" | "sdlc" | "agiles" | "comparador" | "encuesta"

type SectionTag = {
  label: string
  available?: boolean
  target?: string
  page?: "herramientas" | "comparador" | "encuesta"
}

type HomeSection = {
  title: string
  description: string
  tags: SectionTag[]
}

const navItems: NavItem[] = [
  { label: "Inicio", target: "inicio" },
  { label: "Historias de Usuario", target: "historias" },
  {
    label: "Gestión de la Calidad del Software",
    children: [
      { label: "Fundamentos", available: true },
      { label: "Técnicas de QA" },
      { label: "Herramientas" },
    ],
  },
  {
    label: "Procesos de Desarrollo",
    children: [{ label: "Modelos Tradicionales", available: true }],
  },
  {
    label: "Metodologías Ágiles",
    children: [
      { label: "Manifiesto Ágil", available: true },
      { label: "Scrum", available: true },
      { label: "Kanban", available: true },
      { label: "XP (Extreme Programming)", available: true },
      { label: "Ágil vs. tradicional", available: true },
    ],
  },
  {
    label: "Recursos y Aprendizaje",
    children: [
      { label: "Glosario", available: true },
      { label: "Preguntas Frecuentes", available: true },
      { label: "Enlaces de Interés", available: true },
      { label: "Ejercicios", available: true },
    ],
  },
  {
    label: "Herramientas Interactivas",
    children: [
      { label: "Herramientas de Calidad", available: true },
      { label: "Comparador", available: true },
      { label: "Encuesta", available: true },
    ],
  },
  { label: "Sobre Nosotros", target: "nosotros" },
  { label: "Contacto", target: "contacto" },
]

const sections: HomeSection[] = [
  {
    title: "Gestión de Calidad",
    description:
      "Fundamentos, técnicas de aseguramiento y herramientas para evaluar software de calidad.",
    tags: [
      { label: "Fundamentos", available: true },
      { label: "Técnicas de QA", available: true },
      { label: "Herramientas", available: true },
    ],
  },
  {
    title: "Procesos de Desarrollo",
    description:
      "SDLC, modelos tradicionales y metodologías ágiles como Scrum, Kanban y XP.",
    tags: [{ label: "SDLC" }, { label: "Modelos Tradicionales" }],
  },
  {
    title: "Metodologías Ágiles",
    description:
      "El Manifiesto Ágil y los marcos más usados: principios, roles, ceremonias y artefactos.",
    tags: [
      { label: "Manifiesto", available: true },
      { label: "Scrum", available: true },
      { label: "Kanban", available: true },
      { label: "XP", available: true },
    ],
  },
  {
    title: "Recursos y Aprendizaje",
    description:
      "Glosario, FAQ, enlaces de interés y ejercicios prácticos para reforzar lo aprendido.",
    tags: [{ label: "Glosario" }, { label: "FAQ" }, { label: "Ejercicios" }],
  },
  {
    title: "Herramientas Interactivas",
    description:
      "Explorá herramientas de calidad, compará metodologías y descubrí qué enfoque se adapta mejor.",
    tags: [
      { label: "Herramientas", available: true, page: "herramientas" },
      { label: "Comparador", available: true, page: "comparador" },
      { label: "Encuesta", available: true, page: "encuesta" },
    ],
  },
  {
    title: "Sobre Nosotros y Contacto",
    description:
      "Conocé al equipo SCrumáticos y envianos tus consultas o feedback.",
    tags: [
      { label: "El equipo", target: "nosotros", available: true },
      { label: "Contacto", target: "contacto", available: true },
    ],
  },
]

const team = [
  {
    initials: "EA",
    name: "Ezequiel",
    role: "Diseñador / UX-UI",
    description:
      "Responsable del aspecto visual, maquetación y experiencia del usuario. Define paleta de colores, tipografías y asegura la accesibilidad del portal.",
  },
  {
    initials: "BL",
    name: "Benjamín",
    role: "Tester / QA",
    description:
      "Guardián de la calidad. Diseña y ejecuta casos de prueba, documenta bugs y valida el Definition of Done antes de aprobar cada entrega.",
  },
  {
    initials: "GV",
    name: "Gonzalo",
    role: "Scrum Master",
    description:
      "Facilita el marco SCRUM, modera ceremonias, administra el tablero de tareas y desbloquea al equipo cuando surgen impedimentos.",
  },
  {
    initials: "LZ",
    name: "Lautaro",
    role: "Programador / Dev",
    description:
      "Da vida al sitio con JavaScript. Desarrolla la interactividad, la maquetación HTML/CSS y las herramientas como el comparador de metodologías.",
    photo: lautaroAvatar,
  },
]

const sdlcStages = [
  {
    number: "01",
    title: "Planificación",
    description:
      "Se define el problema, los objetivos, el alcance, los recursos y la viabilidad del proyecto.",
  },
  {
    number: "02",
    title: "Análisis",
    description:
      "Se relevan y documentan las necesidades del usuario como requisitos claros y verificables.",
  },
  {
    number: "03",
    title: "Diseño",
    description:
      "Se decide la arquitectura, la experiencia de usuario, los datos y la solución técnica.",
  },
  {
    number: "04",
    title: "Desarrollo",
    description:
      "El equipo transforma el diseño en código funcional siguiendo estándares y buenas prácticas.",
  },
  {
    number: "05",
    title: "Pruebas",
    description:
      "Se detectan defectos y se valida que el producto cumpla los requisitos y criterios de calidad.",
  },
  {
    number: "06",
    title: "Despliegue y mantenimiento",
    description:
      "El software se publica, monitorea y mejora a partir de nuevas necesidades y aprendizajes.",
  },
]

const models = [
  {
    id: "cascada",
    index: "01",
    name: "Modelo en cascada",
    summary:
      "Un proceso lineal y secuencial: cada etapa comienza cuando la anterior ha finalizado.",
    advantages: [
      "Simple de comprender y administrar",
      "Documentación y entregables bien definidos",
      "Facilita estimaciones con alcance estable",
    ],
    disadvantages: [
      "Los cambios tardíos tienen alto costo",
      "El usuario ve el producto al final",
      "Los errores pueden descubrirse demasiado tarde",
    ],
    useWhen:
      "Requisitos claros, estables y regulados; proyectos cortos o con tecnología conocida.",
    image: cascadeDiagram,
    imageAlt:
      "Diagrama del modelo en cascada con Requisitos, Diseño, Desarrollo y Pruebas en escalones descendentes",
    imageCaption:
      "El trabajo avanza secuencialmente y cada fase debe cerrarse antes de iniciar la siguiente.",
  },
  {
    id: "modelo-v",
    index: "02",
    name: "Modelo en V",
    summary:
      "Relaciona cada etapa de definición y diseño con una etapa equivalente de prueba y validación.",
    advantages: [
      "Planifica las pruebas desde el inicio",
      "Alta trazabilidad entre requisitos y pruebas",
      "Favorece productos confiables y auditables",
    ],
    disadvantages: [
      "Es rígido ante requisitos cambiantes",
      "Requiere mucha documentación",
      "No produce incrementos tempranos",
    ],
    useWhen:
      "Sistemas críticos, médicos, industriales o financieros donde la validación es prioritaria.",
    image: vDiagram,
    imageAlt:
      "Diagrama en forma de V que relaciona Requisitos y Diseño con Pruebas de sistema y Aceptación",
    imageCaption:
      "Las actividades de definición se verifican con pruebas asociadas.",
  },
  {
    id: "iterativo",
    index: "03",
    name: "Modelo iterativo",
    summary:
      "La solución se construye y refina en ciclos; cada iteración incorpora lo aprendido en la anterior.",
    advantages: [
      "Permite feedback y ajustes tempranos",
      "Reduce incertidumbre progresivamente",
      "Los riesgos aparecen antes",
    ],
    disadvantages: [
      "Puede ser difícil estimar el final",
      "Exige participación frecuente del usuario",
      "Una mala arquitectura genera retrabajo",
    ],
    useWhen:
      "El objetivo está claro, pero los detalles necesitan exploración, prototipos o aprendizaje.",
    image: iterativeDiagram,
    imageAlt:
      "Diagrama circular de Planificar, Construir, Evaluar y Aprender alrededor de un producto",
    imageCaption:
      "Cada ciclo incorpora feedback y produce una versión más completa.",
  },
  {
    id: "incremental",
    index: "04",
    name: "Modelo incremental",
    summary:
      "El producto se entrega por partes funcionales; cada incremento suma capacidades utilizables.",
    advantages: [
      "Entrega valor desde etapas tempranas",
      "Prioriza funciones de mayor impacto",
      "Facilita probar partes más pequeñas",
    ],
    disadvantages: [
      "Requiere una arquitectura modular sólida",
      "La integración puede ser compleja",
      "Demanda planificación entre incrementos",
    ],
    useWhen:
      "El producto puede dividirse en módulos y se busca lanzar primero una versión útil.",
    image: incrementalDiagram,
    imageAlt:
      "Diagrama de bloques crecientes desde una base hasta un producto completo",
    imageCaption: "Cada incremento agrega capacidad utilizable al producto.",
  },
]

function ProcesosPage({
  onBack,
  onOpenSdlc,
}: {
  onBack: () => void
  onOpenSdlc: () => void
}) {
  const [activeModel, setActiveModel] = useState(models[0].id)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const modelLightboxItems: LightboxItem[] = models.map((model) => ({
    src: model.image,
    alt: model.imageAlt,
    title: model.name,
    caption: model.imageCaption,
  }))
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])
  const changeLightbox = useCallback(
    (index: number) => setLightboxIndex(index),
    [],
  )

  useEffect(() => {
    const cards = models
      .map((model) => document.getElementById(model.id))
      .filter((element): element is HTMLElement => Boolean(element))
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveModel(visible.target.id)
      },
      { rootMargin: "-28% 0px -52% 0px", threshold: [0.1, 0.35, 0.65] },
    )
    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  const goToModel = (id: string) => {
    setActiveModel(id)
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <>
      <main id="contenido" className="process-page">
        <section className="process-hero">
          <div className="contenedor">
            <button className="back-link" type="button" onClick={onBack}>
              <span aria-hidden="true">←</span> Volver al portal
            </button>
            <div className="process-hero-grid">
              <div>
                <span className="etiqueta">Procesos de desarrollo</span>
                <h1>
                  Del concepto al{" "}
                  <span className="degradado">software real</span>
                </h1>
                <p className="bajada">
                  Conocé el ciclo de vida del desarrollo de software y los
                  modelos tradicionales que ayudan a transformar una idea en un
                  producto confiable, mantenible y de calidad.
                </p>
                <div className="process-actions">
                  <button className="btn" type="button" onClick={onOpenSdlc}>
                    Explorar el SDLC
                  </button>
                  <a className="secondary-btn" href="#modelos">
                    Comparar modelos
                  </a>
                </div>
              </div>
              <div
                className="orbit-diagram"
                aria-label="Representación circular del ciclo de desarrollo"
              >
                <div className="orbit-core">
                  <b>SDLC</b>
                  <small>Ciclo continuo</small>
                </div>
                {["Planear", "Diseñar", "Construir", "Probar", "Publicar"].map(
                  (stage, index) => (
                    <span
                      className={`orbit-item orbit-${index + 1}`}
                      key={stage}
                    >
                      {stage}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </section>

        <section
          className="process-section"
          id="sdlc"
          aria-labelledby="sdlc-title"
        >
          <div className="contenedor">
            <div className="section-heading">
              <span className="etiqueta">El mapa del proceso</span>
              <h2 id="sdlc-title">Ciclo de Vida del Desarrollo de Software</h2>
              <p className="bajada">
                El SDLC organiza el trabajo en etapas conectadas. Su importancia
                está en reducir riesgos, alinear expectativas y construir
                calidad durante todo el proceso, no solamente al final.
              </p>
            </div>
            <div className="sdlc-path">
              {sdlcStages.map((stage, index) => (
                <article className="stage-card" key={stage.number}>
                  <div className="stage-top">
                    <span>{stage.number}</span>
                    <i aria-hidden="true">
                      {index < sdlcStages.length - 1 ? "→" : "↻"}
                    </i>
                  </div>
                  <h3>{stage.title}</h3>
                  <p>{stage.description}</p>
                </article>
              ))}
            </div>
            <aside className="quality-note">
              <span className="quality-icon" aria-hidden="true">
                ✓
              </span>
              <div>
                <h3>La calidad acompaña cada etapa</h3>
                <p>
                  Revisar requisitos, diseño, código y resultados de prueba
                  evita que los defectos avancen y se vuelvan más costosos.
                </p>
              </div>
            </aside>
          </div>
        </section>

        <section
          className="process-section models-section"
          id="modelos"
          aria-labelledby="models-title"
        >
          <div className="contenedor">
            <div className="section-heading">
              <span className="etiqueta">Estrategias de construcción</span>
              <h2 id="models-title">Modelos tradicionales</h2>
              <p className="bajada">
                No existe un modelo perfecto para todos los proyectos. La
                elección depende de la estabilidad de los requisitos, el riesgo
                y la necesidad de entregar valor temprano.
              </p>
            </div>
            <nav className="model-subnav" aria-label="Modelos tradicionales">
              {models.map((model) => (
                <button
                  className={activeModel === model.id ? "active" : ""}
                  type="button"
                  aria-current={activeModel === model.id ? "true" : undefined}
                  onClick={() => goToModel(model.id)}
                  key={model.id}
                >
                  {model.id === "cascada"
                    ? "Cascada"
                    : model.id === "modelo-v"
                      ? "Modelo en V"
                      : model.id === "iterativo"
                        ? "Iterativo"
                        : "Incremental"}
                </button>
              ))}
            </nav>
            <div className="models-grid">
              {models.map((model, modelIndex) => (
                <article className="model-card" id={model.id} key={model.id}>
                  <div className="model-number">{model.index}</div>
                  <figure className="model-figure">
                    <button
                      type="button"
                      onClick={() => setLightboxIndex(modelIndex)}
                      aria-label={`Ampliar ${model.name}`}
                    >
                      <img
                        src={model.image}
                        alt={model.imageAlt}
                        loading="lazy"
                      />
                    </button>
                    <figcaption>{model.imageCaption}</figcaption>
                  </figure>
                  <h3>{model.name}</h3>
                  <p className="model-summary">{model.summary}</p>
                  <div className="pros-cons">
                    <div className="advantages-box">
                      <h4>
                        <span aria-hidden="true">✓</span> Ventajas
                      </h4>
                      <ul>
                        {model.advantages.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="disadvantages-box">
                      <h4 className="cons">
                        <span aria-hidden="true">✕</span> Desventajas
                      </h4>
                      <ul>
                        {model.disadvantages.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="use-case">
                    <strong>Cuándo utilizarlo</strong>
                    <p>{model.useWhen}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="process-section decision-section"
          aria-labelledby="decision-title"
        >
          <div className="contenedor decision-card">
            <div>
              <span className="etiqueta">Guía rápida</span>
              <h2 id="decision-title">¿Qué modelo elegir?</h2>
              <p>
                Partí del contexto y no de la costumbre. Respondé estas
                preguntas antes de definir tu proceso.
              </p>
            </div>
            <div className="decision-list">
              <div>
                <span>01</span>
                <p>
                  <b>¿Los requisitos son estables?</b> Cascada puede aportar
                  orden y previsibilidad.
                </p>
              </div>
              <div>
                <span>02</span>
                <p>
                  <b>¿La seguridad es crítica?</b> El modelo en V fortalece
                  validación y trazabilidad.
                </p>
              </div>
              <div>
                <span>03</span>
                <p>
                  <b>¿Hay mucha incertidumbre?</b> Iterar permite aprender antes
                  de comprometer toda la solución.
                </p>
              </div>
              <div>
                <span>04</span>
                <p>
                  <b>¿Necesitás entregar pronto?</b> Incremental pone primero
                  las funciones de mayor valor.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Lightbox
        items={modelLightboxItems}
        index={lightboxIndex}
        onChange={changeLightbox}
        onClose={closeLightbox}
      />
    </>
  )
}

const glossaryTerms = [
  {
    term: "Aseguramiento de calidad",
    category: "Calidad",
    definition:
      "Conjunto de actividades planificadas que buscan prevenir defectos y garantizar que el proceso de desarrollo cumpla estándares definidos.",
  },
  {
    term: "Backlog",
    category: "Agilidad",
    definition:
      "Lista ordenada y evolutiva de trabajo pendiente, necesidades, mejoras y defectos.",
  },
  {
    term: "Bug",
    category: "Testing",
    definition:
      "Comportamiento inesperado del software que genera un resultado incorrecto.",
  },
  {
    term: "Caso de prueba",
    category: "Testing",
    definition:
      "Conjunto de condiciones, datos de entrada, pasos y resultados esperados usados para verificar una función del software.",
  },
  {
    term: "Cobertura",
    category: "Testing",
    definition:
      "Medida del alcance de las pruebas sobre requisitos, riesgos, código o escenarios.",
  },
  {
    term: "Criterio de aceptación",
    category: "Agilidad",
    definition:
      "Condición específica y verificable que una funcionalidad debe cumplir para ser aceptada por el usuario o Product Owner.",
  },
  {
    term: "Daily",
    category: "Agilidad",
    definition:
      "Evento diario de Scrum de 15 minutos para inspeccionar el avance y adaptar el plan.",
  },
  {
    term: "Deuda técnica",
    category: "Desarrollo",
    definition:
      "Costo futuro generado al elegir una solución rápida o limitada en lugar de una alternativa más sostenible.",
  },
  {
    term: "Defecto",
    category: "Calidad",
    definition:
      "Diferencia entre el comportamiento esperado y el comportamiento real de un producto de software.",
  },
  {
    term: "Definition of Done",
    category: "Agilidad",
    definition:
      "Acuerdo compartido que establece todas las condiciones necesarias para considerar terminado un incremento.",
  },
  {
    term: "Épica",
    category: "Agilidad",
    definition:
      "Necesidad de gran tamaño que suele dividirse en historias de usuario más pequeñas.",
  },
  {
    term: "Historia de usuario",
    category: "Agilidad",
    definition:
      "Descripción breve de una necesidad expresada desde la perspectiva de quien recibe valor.",
  },
  {
    term: "Incremento",
    category: "Agilidad",
    definition:
      "Resultado usable que suma valor y cumple la Definition of Done.",
  },
  {
    term: "Integración continua",
    category: "Desarrollo",
    definition:
      "Práctica de integrar cambios con frecuencia y verificarlos automáticamente.",
  },
  {
    term: "ISO/IEC 25010",
    category: "Calidad",
    definition:
      "Modelo internacional que define características para evaluar la calidad del producto software.",
  },
  {
    term: "Kanban",
    category: "Agilidad",
    definition:
      "Método para gestionar el flujo visualizando trabajo, limitando WIP y mejorando continuamente.",
  },
  {
    term: "Lead time",
    category: "Agilidad",
    definition:
      "Tiempo total desde que se solicita un elemento hasta que se entrega.",
  },
  {
    term: "Mantenibilidad",
    category: "Calidad",
    definition:
      "Capacidad del software para ser modificado, analizado, probado y mejorado.",
  },
  {
    term: "Métrica",
    category: "Calidad",
    definition:
      "Medida cuantitativa usada para observar y tomar decisiones sobre producto o proceso.",
  },
  {
    term: "Programación en pareja",
    category: "Desarrollo",
    definition:
      "Práctica de XP en la que dos personas trabajan juntas sobre el mismo código.",
  },
  {
    term: "Prueba unitaria",
    category: "Testing",
    definition:
      "Prueba automatizada que verifica una unidad pequeña de comportamiento de forma aislada.",
  },
  {
    term: "Prueba de regresión",
    category: "Testing",
    definition:
      "Verificación de que un cambio reciente no haya afectado funcionalidades que anteriormente operaban correctamente.",
  },
  {
    term: "Refactorización",
    category: "Desarrollo",
    definition:
      "Mejora de la estructura interna del código sin cambiar su comportamiento observable.",
  },
  {
    term: "Requisito funcional",
    category: "Desarrollo",
    definition:
      "Descripción de una acción, servicio o comportamiento que el sistema debe ser capaz de realizar.",
  },
  {
    term: "Requisito no funcional",
    category: "Desarrollo",
    definition:
      "Condición de calidad o restricción del sistema, como rendimiento, seguridad, accesibilidad o disponibilidad.",
  },
  {
    term: "Retrospectiva",
    category: "Agilidad",
    definition:
      "Evento para inspeccionar cómo trabajó el equipo y acordar mejoras concretas.",
  },
  {
    term: "Scrum Master",
    category: "Agilidad",
    definition:
      "Responsabilidad de Scrum que facilita el marco y ayuda a remover impedimentos.",
  },
  {
    term: "Sprint",
    category: "Agilidad",
    definition:
      "Evento de duración fija de un mes o menos en el que se crea valor.",
  },
  {
    term: "TDD",
    category: "Desarrollo",
    definition:
      "Desarrollo guiado por pruebas mediante el ciclo rojo, verde y refactorización.",
  },
  {
    term: "Trazabilidad",
    category: "Calidad",
    definition:
      "Capacidad de relacionar requisitos, decisiones, código y pruebas a lo largo de todo el ciclo de desarrollo.",
  },
  {
    term: "Usabilidad",
    category: "Calidad",
    definition:
      "Capacidad de un producto para ser comprendido, aprendido y usado eficazmente.",
  },
  {
    term: "Validación",
    category: "Testing",
    definition:
      "Proceso de comprobar que el producto construido responde a las necesidades reales de sus usuarios.",
  },
  {
    term: "Verificación",
    category: "Testing",
    definition:
      "Proceso de comprobar que cada resultado del desarrollo cumple las especificaciones establecidas.",
  },
  {
    term: "WIP",
    category: "Agilidad",
    definition:
      "Trabajo en progreso; limitarlo ayuda a reducir esperas y mejorar el flujo.",
  },
  {
    term: "XP",
    category: "Agilidad",
    definition:
      "Extreme Programming, enfoque ágil con prácticas técnicas y feedback frecuente.",
  },
]

const faqs = [
  {
    question: "¿Calidad y testing significan lo mismo?",
    answer:
      "No. El testing es una actividad de evaluación y detección de defectos. La calidad es un enfoque más amplio que incluye procesos, prevención, requisitos, diseño, desarrollo, pruebas y mejora continua.",
  },
  {
    question: "¿Cuándo deberían comenzar las pruebas?",
    answer:
      "Desde el inicio. Revisar requisitos y diseños también es probar. Cuanto antes se detecta un problema, menor suele ser el costo de corregirlo.",
  },
  {
    question: "¿Un software sin errores tiene buena calidad?",
    answer:
      "No necesariamente. También debe ser útil, seguro, accesible, mantenible, eficiente y responder a las necesidades del usuario.",
  },
  {
    question: "¿Las metodologías ágiles eliminan la documentación?",
    answer:
      "No. Proponen crear la documentación necesaria y valiosa, evitando producir documentos extensos que no ayudan a construir, usar o mantener el producto.",
  },
  {
    question: "¿Qué modelo de desarrollo conviene usar?",
    answer:
      "Depende del contexto. Requisitos estables pueden favorecer modelos secuenciales; la incertidumbre y la necesidad de feedback suelen favorecer ciclos iterativos o incrementales.",
  },
  {
    question: "¿Quién es responsable de la calidad?",
    answer:
      "Todo el equipo. QA aporta técnicas especializadas, pero analistas, diseñadores, desarrolladores, responsables de producto y usuarios participan en la construcción de calidad.",
  },
]

const learningLinks = [
  {
    type: "Organización",
    title: "ISTQB",
    description:
      "Programa internacional de certificación y materiales fundamentales sobre pruebas de software.",
    href: "https://www.istqb.org/",
  },
  {
    type: "Web",
    title: "Scrum.org",
    description:
      "Recursos, evaluaciones y rutas de aprendizaje sobre Scrum profesional.",
    href: "https://www.scrum.org/",
  },
  {
    type: "Web",
    title: "ISO/IEC 25010",
    description:
      "Modelo internacional para comprender y evaluar las características de calidad del producto.",
    href: "https://iso25000.com/index.php/en/iso-25000-standards/iso-25010",
  },
  {
    type: "Libro",
    title: "Software Engineering at Google",
    description:
      "Libro abierto sobre prácticas de ingeniería, escalabilidad, pruebas y mantenimiento de software.",
    href: "https://abseil.io/resources/swe-book",
  },
  {
    type: "Web",
    title: "Martin Fowler",
    description:
      "Artículos de referencia sobre arquitectura, refactoring, entrega continua y diseño de software.",
    href: "https://martinfowler.com/",
  },
  {
    type: "Organización",
    title: "Ministry of Testing",
    description:
      "Comunidad global con artículos, cursos, eventos y experiencias de profesionales de testing.",
    href: "https://www.ministryoftesting.com/",
  },
  {
    type: "Organización",
    title: "Agile Alliance",
    description:
      "Organización internacional con artículos, eventos y recursos sobre agilidad.",
    href: "https://www.agilealliance.org/",
  },
  {
    type: "Web",
    title: "Kanban Guide",
    description:
      "Guía oficial y abierta para aplicar Kanban en equipos y organizaciones.",
    href: "https://kanbanguides.org/",
  },
  {
    type: "Web",
    title: "Manifiesto Ágil",
    description:
      "Los cuatro valores y doce principios que dieron origen al movimiento ágil.",
    href: "https://agilemanifesto.org/iso/es/manifesto.html",
  },
  {
    type: "PDF",
    title: "Scrum Guide en español",
    description:
      "Documento oficial de Scrum 2020 en formato PDF y traducción al español.",
    href: "https://scrumguides.org/docs/scrumguide/v2020/2020-Scrum-Guide-Spanish-Latin-South-American.pdf",
  },
]

const exercises = [
  {
    type: "Análisis",
    prompt:
      "Un formulario acepta un correo sin arroba. ¿Qué tipo de elemento documentarías?",
    solution:
      "Es un defecto: el resultado real incumple la validación esperada para el campo.",
    rubric:
      "Identifica el defecto, describe pasos para reproducirlo e incluye resultado esperado y real.",
  },
  {
    type: "Testing",
    prompt:
      "El equipo necesita comprobar que una nueva función no rompió el inicio de sesión. ¿Qué prueba corresponde?",
    solution:
      "Una prueba de regresión vuelve a verificar comportamiento existente después de un cambio.",
    rubric:
      "Selecciona regresión y justifica la relación entre el cambio y las funciones existentes.",
  },
  {
    type: "Proceso",
    prompt:
      "Los requisitos todavía son inciertos y el cliente necesita revisar avances frecuentes. ¿Qué enfoque es más apropiado?",
    solution:
      "Iterar y entregar incrementos permite aprender del feedback y adaptar la solución.",
    rubric:
      "Relaciona incertidumbre con ciclos cortos, feedback y capacidad de adaptación.",
  },
  {
    type: "Caso abierto",
    prompt:
      "Una tienda en línea recibe reportes de compras duplicadas durante picos de tráfico. Proponé un plan inicial de calidad.",
    solution:
      "Priorizar el incidente, recopilar evidencia, reproducir bajo carga, revisar idempotencia del pago, crear pruebas automatizadas y monitorear la corrección.",
    rubric:
      "Incluye diagnóstico, riesgo para el usuario, pruebas funcionales y de carga, prevención y verificación posterior.",
  },
  {
    type: "Caso abierto",
    prompt:
      "Un equipo tiene ocho tareas en proceso y ninguna termina a tiempo. ¿Cómo aplicarías Kanban para mejorar el flujo?",
    solution:
      "Visualizar bloqueos, fijar un límite WIP menor, dejar de comenzar tareas, colaborar para terminar las actuales y medir cycle time y throughput.",
    rubric:
      "Propone limitar WIP, terminar antes de empezar, explicitar políticas y observar al menos una métrica.",
  },
]

type LearningLinkType = "Web" | "PDF" | "Libro" | "Organización"

function LinkTypeIcon({ type }: { type: LearningLinkType }) {
  if (type === "PDF")
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 2h8l4 4v16H6zM14 2v5h5M8 17h8M8 13h5" />
      </svg>
    )
  if (type === "Libro")
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 4h7a3 3 0 0 1 3 3v13a3 3 0 0 0-3-3H4zM20 4h-3a3 3 0 0 0-3 3v13a3 3 0 0 1 3-3h3z" />
      </svg>
    )
  if (type === "Organización")
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 21h18M5 21V9h14v12M8 13h2M14 13h2M8 17h2M14 17h2M4 9l8-6 8 6" />
      </svg>
    )
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
    </svg>
  )
}

function SafeLink({
  href,
  children,
  className,
}: {
  href: string
  children: ReactNode
  className?: string
}) {
  const isSafe = (() => {
    try {
      return new URL(href).protocol === "https:"
    } catch {
      return false
    }
  })()
  if (!isSafe) return null
  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(event) => {
        try {
          if (new URL(href).protocol !== "https:") event.preventDefault()
        } catch {
          event.preventDefault()
        }
      }}
    >
      {children}
    </a>
  )
}

function ResourcesPage({ onBack }: { onBack: () => void }) {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("Todos")
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [linkType, setLinkType] = useState("Todos")
  const [openSolutions, setOpenSolutions] = useState<Set<number>>(new Set())

  const normalizeText = (value: string) =>
    value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
  const normalizedQuery = normalizeText(query.trim())
  const filteredTerms = glossaryTerms
    .filter(
      (item) =>
        (category === "Todos" || item.category === category) &&
        normalizeText(`${item.term} ${item.definition}`).includes(
          normalizedQuery,
        ),
    )
    .sort((a, b) => a.term.localeCompare(b.term, "es"))
  const groupedTerms =
    filteredTerms.reduce<Record<string, typeof glossaryTerms>>(
      (groups, item) => {
        const letter = normalizeText(item.term).charAt(0).toUpperCase()
        groups[letter] = [...(groups[letter] ?? []), item]
        return groups
      },
      {},
    )
  const availableLetters = new Set(
    filteredTerms.map((item) =>
      normalizeText(item.term).charAt(0).toUpperCase(),
    ),
  )
  const visibleLinks = learningLinks.filter(
    (link) => linkType === "Todos" || link.type === linkType,
  )

  return (
    <main id="contenido" className="resources-page">
      <section className="resources-hero">
        <div className="contenedor">
          <button className="back-link" type="button" onClick={onBack}>
            <span aria-hidden="true">←</span> Volver al portal
          </button>
          <div className="resources-hero-content">
            <span className="etiqueta">Recursos y aprendizaje</span>
            <h1>
              Aprender, practicar y{" "}
              <span className="degradado">seguir creciendo</span>
            </h1>
            <p className="bajada">
              Un espacio para consultar conceptos, resolver dudas y poner a
              prueba tus conocimientos sobre calidad y desarrollo de software.
            </p>
            <nav
              className="resource-shortcuts"
              aria-label="Secciones de recursos"
            >
              <a href="#glosario">
                <b>01</b>
                <span>Glosario</span>
              </a>
              <a href="#preguntas">
                <b>02</b>
                <span>Preguntas frecuentes</span>
              </a>
              <a href="#enlaces">
                <b>03</b>
                <span>Enlaces de interés</span>
              </a>
              <a href="#ejercicios">
                <b>04</b>
                <span>Ejercicios prácticos</span>
              </a>
            </nav>
          </div>
        </div>
      </section>

      <section className="learning-section glossary-section" id="glosario">
        <div className="contenedor">
          <div className="learning-heading">
            <div>
              <span className="etiqueta">Diccionario esencial</span>
              <h2>Glosario de software</h2>
              <p className="bajada">
                Definiciones claras para comprender el lenguaje de calidad,
                testing, agilidad y desarrollo.
              </p>
            </div>
            <span className="result-count">
              {filteredTerms.length} términos
            </span>
          </div>
          <div className="glossary-tools">
            <label className="glossary-search">
              <span aria-hidden="true">⌕</span>
              <span className="sr-only">Buscar un término</span>
              <input
                type="search"
                placeholder="Buscar un término..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>
            <div
              className="category-filters"
              aria-label="Filtrar por categoría"
            >
              {["Todos", "Calidad", "Testing", "Desarrollo", "Agilidad"].map(
                (item) => (
                  <button
                    className={category === item ? "active" : ""}
                    type="button"
                    aria-pressed={category === item}
                    onClick={() => setCategory(item)}
                    key={item}
                  >
                    {item}
                  </button>
                ),
              )}
            </div>
          </div>
          <nav className="alphabet-index" aria-label="Índice alfabético">
            {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => {
              const enabled = availableLetters.has(letter)
              return (
                <button
                  type="button"
                  disabled={!enabled}
                  onClick={() =>
                    document
                      .getElementById(`glossary-${letter}`)
                      ?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                  key={letter}
                >
                  {letter}
                </button>
              )
            })}
          </nav>
          {filteredTerms.length ? (
            <div className="glossary-groups">
              {Object.keys(groupedTerms)
                .sort()
                .map((letter) => (
                  <section
                    className="glossary-letter-group"
                    id={`glossary-${letter}`}
                    key={letter}
                  >
                    <div className="letter-separator">
                      <span>{letter}</span>
                      <i />
                    </div>
                    <div className="glossary-grid">
                      {groupedTerms[letter].map((item) => (
                        <article className="term-card" key={item.term}>
                          <span>{item.category}</span>
                          <h3>{item.term}</h3>
                          <p>{item.definition}</p>
                        </article>
                      ))}
                    </div>
                  </section>
                ))}
            </div>
          ) : (
            <div className="empty-results">
              <b>Sin resultados</b>
              <p>
                Probá con otra palabra o seleccioná una categoría diferente.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="learning-section faq-section" id="preguntas">
        <div className="contenedor faq-layout">
          <div className="learning-heading sticky-heading">
            <div>
              <span className="etiqueta">Respuestas directas</span>
              <h2>Preguntas frecuentes</h2>
              <p className="bajada">
                Aclaramos las dudas más comunes para ayudarte a conectar los
                conceptos con la práctica.
              </p>
            </div>
          </div>
          <div className="faq-list">
            {faqs.map((item, index) => {
              const isOpen = openFaq === index
              return (
                <article
                  className={`faq-item ${isOpen ? "open" : ""}`}
                  key={item.question}
                >
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                    >
                      <span>{item.question}</span>
                      <i aria-hidden="true">{isOpen ? "−" : "+"}</i>
                    </button>
                  </h3>
                  {isOpen && <p>{item.answer}</p>}
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="learning-section links-section" id="enlaces">
        <div className="contenedor">
          <div className="learning-heading">
            <div>
              <span className="etiqueta">Para seguir explorando</span>
              <h2>Enlaces de interés</h2>
              <p className="bajada">
                Fuentes confiables, libros abiertos y comunidades para
                profundizar tu aprendizaje.
              </p>
            </div>
          </div>
          <div className="link-filters" aria-label="Filtrar enlaces por tipo">
            {["Todos", "Web", "PDF", "Libro", "Organización"].map((type) => (
              <button
                className={linkType === type ? "active" : ""}
                type="button"
                aria-pressed={linkType === type}
                onClick={() => setLinkType(type)}
                key={type}
              >
                {type}
              </button>
            ))}
          </div>
          <div className="links-grid">
            {visibleLinks.map((link) => (
              <SafeLink
                className="learning-link"
                href={link.href}
                key={link.title}
              >
                <div>
                  <span className="link-type">
                    <i>
                      <LinkTypeIcon type={link.type as LearningLinkType} />
                    </i>
                    {link.type}
                  </span>
                  <i aria-hidden="true">↗</i>
                </div>
                <h3>{link.title}</h3>
                <p>{link.description}</p>
              </SafeLink>
            ))}
          </div>
          <p className="external-note">
            Los enlaces se abren en una pestaña nueva y pertenecen a sus
            respectivas organizaciones.
          </p>
        </div>
      </section>

      <section className="learning-section exercises-section" id="ejercicios">
        <div className="contenedor">
          <div className="learning-heading exercise-heading">
            <div>
              <span className="etiqueta">Momento de practicar</span>
              <h2>Ejercicios y casos prácticos</h2>
              <p className="bajada">
                Analizá cada situación antes de revelar la solución y compará tu
                respuesta con la pauta de evaluación.
              </p>
            </div>
          </div>
          <div className="exercise-list">
            {exercises.map((exercise, index) => (
              <article className="exercise-card" key={exercise.prompt}>
                <div className="exercise-number">
                  Caso {String(index + 1).padStart(2, "0")}
                </div>
                <span className="exercise-type">{exercise.type}</span>
                <h3>{exercise.prompt}</h3>
                <button
                  className="solution-toggle"
                  type="button"
                  aria-expanded={openSolutions.has(index)}
                  aria-controls={`solution-${index}`}
                  onClick={() =>
                    setOpenSolutions((current) => {
                      const next = new Set(current)
                      if (next.has(index)) next.delete(index)
                      else next.add(index)
                      return next
                    })
                  }
                >
                  {openSolutions.has(index)
                    ? "Ocultar solución"
                    : "Mostrar solución"}
                  <span aria-hidden="true">
                    {openSolutions.has(index) ? "−" : "+"}
                  </span>
                </button>
                {openSolutions.has(index) && (
                  <div className="exercise-solution" id={`solution-${index}`}>
                    <div>
                      <strong>Solución orientativa</strong>
                      <p>{exercise.solution}</p>
                    </div>
                    <div>
                      <strong>Pauta de evaluación</strong>
                      <p>{exercise.rubric}</p>
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

type ToolCategory = "Bug Trackers" | "Linters" | "Test Management"

const qualityTools: {
  name: string
  category: ToolCategory
  description: string
  useCase: string
  tags: string[]
  href: string
}[] = [
  {
    name: "Jira",
    category: "Bug Trackers",
    description:
      "Plataforma para registrar incidencias, asignar responsables y visualizar el avance del trabajo.",
    useCase:
      "Equipos que necesitan flujos personalizables y trazabilidad completa.",
    tags: ["Incidencias", "Workflow", "Reportes"],
    href: "https://www.atlassian.com/software/jira",
  },
  {
    name: "GitHub Issues",
    category: "Bug Trackers",
    description:
      "Seguimiento de errores y tareas conectado directamente con repositorios, ramas y pull requests.",
    useCase:
      "Proyectos de software que ya trabajan dentro del ecosistema GitHub.",
    tags: ["Git", "Colaboración", "Automatización"],
    href: "https://github.com/features/issues",
  },
  {
    name: "Bugzilla",
    category: "Bug Trackers",
    description:
      "Sistema de código abierto especializado en registrar, buscar y administrar defectos.",
    useCase:
      "Organizaciones que buscan una solución madura, configurable y autogestionada.",
    tags: ["Open source", "Defectos", "Trazabilidad"],
    href: "https://www.bugzilla.org/",
  },
  {
    name: "ESLint",
    category: "Linters",
    description:
      "Analiza código JavaScript y TypeScript para detectar errores y aplicar reglas de estilo.",
    useCase:
      "Proyectos web que necesitan consistencia y prevención temprana de errores.",
    tags: ["JavaScript", "TypeScript", "Reglas"],
    href: "https://eslint.org/",
  },
  {
    name: "Pylint",
    category: "Linters",
    description:
      "Examina código Python, identifica problemas y asigna una puntuación de calidad configurable.",
    useCase:
      "Equipos Python que quieren estandarizar código y detectar malas prácticas.",
    tags: ["Python", "Estándares", "Métricas"],
    href: "https://pylint.readthedocs.io/",
  },
  {
    name: "SonarQube",
    category: "Linters",
    description:
      "Inspección continua para detectar bugs, vulnerabilidades, duplicación y deuda técnica.",
    useCase:
      "Equipos que necesitan análisis profundo integrado a su pipeline de entrega.",
    tags: ["Calidad", "Seguridad", "CI/CD"],
    href: "https://www.sonarsource.com/products/sonarqube/",
  },
  {
    name: "TestRail",
    category: "Test Management",
    description:
      "Centraliza casos, planes, ejecuciones y resultados de prueba con reportes en tiempo real.",
    useCase:
      "Equipos QA que gestionan ciclos de prueba estructurados y auditorías.",
    tags: ["Casos", "Ejecuciones", "Reportes"],
    href: "https://www.testrail.com/",
  },
  {
    name: "Zephyr",
    category: "Test Management",
    description:
      "Gestión de pruebas integrada con Jira para planificar, ejecutar y medir cobertura.",
    useCase:
      "Organizaciones que desean conectar testing y seguimiento de incidencias.",
    tags: ["Jira", "Cobertura", "Trazabilidad"],
    href: "https://smartbear.com/test-management/zephyr/",
  },
  {
    name: "Qase",
    category: "Test Management",
    description:
      "Espacio colaborativo para diseñar casos, organizar ejecuciones y analizar resultados.",
    useCase: "Equipos modernos que combinan pruebas manuales y automatizadas.",
    tags: ["Colaboración", "API", "Integraciones"],
    href: "https://qase.io/",
  },
]

function ToolIcon({ category }: { category: ToolCategory }) {
  if (category === "Bug Trackers") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M16 18h16v15a8 8 0 0 1-16 0V18Z" />
        <path d="M18 18a6 6 0 0 1 12 0M11 24h5M32 24h5M12 34h5M31 34h5M24 13V8" />
        <path d="M16 27h16M24 27v13" />
      </svg>
    )
  }

  if (category === "Linters") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="m24 6 16 9v18l-16 9-16-9V15l16-9Z" />
        <path d="m16 25 5 5 11-12" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <rect x="10" y="8" width="28" height="34" rx="4" />
      <path d="M18 8v6h12V8M17 23h14M17 30h9M17 37h12" />
      <path d="m29 29 2 2 4-5" />
    </svg>
  )
}

function QualityToolsPage({ onBack }: { onBack: () => void }) {
  const [activeCategory, setActiveCategory] = useState<"Todas" | ToolCategory>(
    "Todas",
  )

  const visibleTools =
    activeCategory === "Todas"
      ? qualityTools
      : qualityTools.filter((tool) => tool.category === activeCategory)

  const categoryDescriptions: Record<ToolCategory, string> = {
    "Bug Trackers":
      "Registran defectos, responsables, prioridades y estados para que ningún problema pierda trazabilidad.",
    Linters:
      "Analizan el código automáticamente y detectan errores, inconsistencias y riesgos antes de ejecutar el software.",
    "Test Management":
      "Organizan casos, planes y resultados para conocer qué se probó, cómo y con qué resultado.",
  }

  return (
    <main id="contenido" className="tools-page">
      <section className="tools-hero">
        <div className="contenedor">
          <button className="back-link" type="button" onClick={onBack}>
            <span aria-hidden="true">←</span> Volver al portal
          </button>
          <div className="tools-hero-grid">
            <div>
              <span className="etiqueta">Herramientas interactivas</span>
              <h1>
                Herramientas que impulsan la{" "}
                <span className="degradado">calidad</span>
              </h1>
              <p className="bajada">
                Una introducción práctica a las soluciones que ayudan a
                gestionar pruebas, seguir defectos y analizar la calidad del
                código durante todo el desarrollo.
              </p>
              <a className="btn" href="#catalogo">
                Explorar herramientas
              </a>
            </div>
            <div
              className="tools-console"
              aria-label="Flujo de herramientas de calidad"
            >
              <div className="console-top">
                <span />
                <span />
                <span />
                <small>quality.pipeline</small>
              </div>
              <div className="console-body">
                <div>
                  <b>01</b>
                  <span>Analizar código</span>
                  <i>passed</i>
                </div>
                <div>
                  <b>02</b>
                  <span>Ejecutar pruebas</span>
                  <i>passed</i>
                </div>
                <div>
                  <b>03</b>
                  <span>Registrar defecto</span>
                  <i>tracked</i>
                </div>
                <div>
                  <b>04</b>
                  <span>Medir calidad</span>
                  <i>ready</i>
                </div>
              </div>
              <div className="console-score">
                <strong>94</strong>
                <span>Quality score</span>
                <div>
                  <i />
                </div>
              </div>
            </div>
          </div>
          <div className="tools-summary" aria-label="Resumen del catálogo">
            <div>
              <strong>9</strong>
              <span>Herramientas</span>
            </div>
            <div>
              <strong>3</strong>
              <span>Categorías</span>
            </div>
            <div>
              <strong>100%</strong>
              <span>Enfoque en calidad</span>
            </div>
          </div>
        </div>
      </section>

      <section className="tools-intro">
        <div className="contenedor">
          <div className="section-heading">
            <span className="etiqueta">Tres funciones, un objetivo</span>
            <h2>¿Cómo acompañan al proceso?</h2>
            <p className="bajada">
              Cada familia resuelve una necesidad distinta. Juntas crean un
              flujo de prevención, verificación y mejora continua.
            </p>
          </div>
          <div className="tool-categories">
            {(Object.keys(categoryDescriptions) as ToolCategory[]).map(
              (category, index) => (
                <article key={category}>
                  <div className="category-icon">
                    <ToolIcon category={category} />
                  </div>
                  <span>0{index + 1}</span>
                  <h3>{category}</h3>
                  <p>{categoryDescriptions[category]}</p>
                </article>
              ),
            )}
          </div>
        </div>
      </section>

      <section
        className="tools-catalog"
        id="catalogo"
        aria-labelledby="catalog-title"
      >
        <div className="contenedor">
          <div className="catalog-heading">
            <div>
              <span className="etiqueta">Catálogo interactivo</span>
              <h2 id="catalog-title">Encontrá la herramienta adecuada</h2>
            </div>
            <p>
              Mostrando <strong>{visibleTools.length}</strong> de{" "}
              {qualityTools.length}
            </p>
          </div>
          <div
            className="tool-filters"
            aria-label="Filtrar herramientas por categoría"
          >
            {([
              "Todas",
              "Bug Trackers",
              "Linters",
              "Test Management",
            ] as const).map((category) => (
              <button
                className={activeCategory === category ? "active" : ""}
                type="button"
                aria-pressed={activeCategory === category}
                onClick={() => setActiveCategory(category)}
                key={category}
              >
                {category}
                <span>
                  {category === "Todas"
                    ? qualityTools.length
                    : qualityTools.filter((tool) => tool.category === category)
                        .length}
                </span>
              </button>
            ))}
          </div>
          <div className="tools-grid" aria-live="polite">
            {visibleTools.map((tool) => (
              <article className="quality-tool-card" key={tool.name}>
                <div className="tool-card-top">
                  <div className="tool-icon">
                    <ToolIcon category={tool.category} />
                  </div>
                  <span>{tool.category}</span>
                </div>
                <h3>{tool.name}</h3>
                <p>{tool.description}</p>
                <div className="tool-tags">
                  {tool.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <div className="tool-use">
                  <strong>Ideal para</strong>
                  <p>{tool.useCase}</p>
                </div>
                <a href={tool.href} target="_blank" rel="noopener noreferrer">
                  Sitio oficial <span aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="tool-flow-section">
        <div className="contenedor tool-flow">
          <div>
            <span className="etiqueta">Flujo recomendado</span>
            <h2>La herramienta correcta, en el momento correcto</h2>
          </div>
          <div className="flow-steps">
            <div>
              <span>01</span>
              <b>Prevenir</b>
              <small>El linter detecta riesgos al escribir código.</small>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span>02</span>
              <b>Verificar</b>
              <small>El gestor organiza pruebas y evidencias.</small>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span>03</span>
              <b>Resolver</b>
              <small>El bug tracker acompaña el defecto hasta su cierre.</small>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

const detailedSdlcStages = [
  {
    name: "Requisitos",
    short: "Comprender",
    description:
      "El equipo identifica el problema, las necesidades de los usuarios, el alcance y las condiciones que deberá cumplir la solución.",
    activities: [
      "Entrevistar usuarios y partes interesadas",
      "Documentar requisitos funcionales y de calidad",
      "Definir criterios de aceptación verificables",
    ],
    deliverable: "Especificación de requisitos",
    question: "¿Qué problema debemos resolver?",
  },
  {
    name: "Diseño",
    short: "Planificar",
    description:
      "Se transforma lo aprendido en una solución técnica: arquitectura, experiencia de usuario, datos, componentes e integraciones.",
    activities: [
      "Diseñar arquitectura y modelo de datos",
      "Crear flujos, wireframes y prototipos",
      "Evaluar riesgos y decisiones técnicas",
    ],
    deliverable: "Diseño de la solución",
    question: "¿Cómo vamos a construirlo?",
  },
  {
    name: "Desarrollo",
    short: "Construir",
    description:
      "Los diseños se convierten en código funcional siguiendo estándares, control de versiones y prácticas de revisión.",
    activities: [
      "Implementar funcionalidades",
      "Revisar código entre integrantes",
      "Integrar componentes de forma continua",
    ],
    deliverable: "Software ejecutable",
    question: "¿La solución funciona como fue diseñada?",
  },
  {
    name: "Pruebas",
    short: "Verificar",
    description:
      "Se comprueba que el producto cumpla requisitos, sea confiable y responda correctamente ante escenarios esperados y excepcionales.",
    activities: [
      "Diseñar y ejecutar casos de prueba",
      "Registrar y seguir defectos",
      "Validar criterios de aceptación",
    ],
    deliverable: "Evidencias y reporte de calidad",
    question: "¿Construimos el producto correcto?",
  },
  {
    name: "Despliegue",
    short: "Entregar",
    description:
      "La versión aprobada se prepara y publica en el ambiente productivo de forma controlada, medible y reversible.",
    activities: [
      "Preparar ambiente y configuración",
      "Automatizar la publicación",
      "Monitorear la salida a producción",
    ],
    deliverable: "Versión disponible para usuarios",
    question: "¿Cómo entregamos valor con seguridad?",
  },
  {
    name: "Mantenimiento",
    short: "Mejorar",
    description:
      "El software se observa y evoluciona: se corrigen incidentes, optimiza rendimiento y agregan mejoras según nuevas necesidades.",
    activities: [
      "Monitorear métricas e incidentes",
      "Corregir defectos en producción",
      "Priorizar mejoras y nuevas versiones",
    ],
    deliverable: "Producto estable y evolucionado",
    question: "¿Qué aprendemos para la próxima iteración?",
  },
]

function SdlcPage({
  onBack,
  onOpenProcesses,
}: {
  onBack: () => void
  onOpenProcesses: () => void
}) {
  const [activeStage, setActiveStage] = useState(0)
  const stage = detailedSdlcStages[activeStage]

  const selectStage = (index: number) => {
    setActiveStage(index)
    document
      .getElementById("detalle-sdlc")
      ?.scrollIntoView({ behavior: "smooth", block: "nearest" })
  }

  return (
    <main id="contenido" className="sdlc-page">
      <section className="sdlc-hero">
        <div className="contenedor">
          <button className="back-link" type="button" onClick={onBack}>
            <span aria-hidden="true">←</span> Volver al portal
          </button>
          <div className="sdlc-hero-copy">
            <span className="etiqueta">Ciclo de vida del software</span>
            <h1>
              Seis etapas, un proceso de{" "}
              <span className="degradado">mejora continua</span>
            </h1>
            <p className="bajada">
              El SDLC organiza la construcción de software desde la necesidad
              inicial hasta su evolución en producción. Explorá cada etapa para
              comprender su propósito, actividades y resultados.
            </p>
            <a className="btn" href="#timeline-sdlc">
              Recorrer el ciclo
            </a>
          </div>
          <div className="sdlc-cycle-mark" aria-hidden="true">
            <span>SDLC</span>
            <i />
            <i />
            <i />
          </div>
        </div>
      </section>

      <section
        className="sdlc-timeline-section"
        id="timeline-sdlc"
        aria-labelledby="timeline-title"
      >
        <div className="contenedor">
          <div className="section-heading">
            <span className="etiqueta">Timeline interactivo</span>
            <h2 id="timeline-title">De la idea a la evolución</h2>
            <p className="bajada">
              Seleccioná una etapa o utilizá los controles para avanzar paso a
              paso. El recorrido iluminado muestra el progreso dentro del ciclo.
            </p>
          </div>

          <div
            className="sdlc-timeline"
            style={
              {
                "--timeline-progress": `${(activeStage / (detailedSdlcStages.length - 1)) * 100}%`,
                "--timeline-scale":
                  activeStage / (detailedSdlcStages.length - 1),
              } as CSSProperties
            }
          >
            {detailedSdlcStages.map((item, index) => (
              <button
                className={`${index === activeStage ? "active" : ""} ${
                  index < activeStage ? "complete" : ""
                }`}
                type="button"
                aria-current={index === activeStage ? "step" : undefined}
                onClick={() => selectStage(index)}
                key={item.name}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <b>{item.name}</b>
                <small>{item.short}</small>
              </button>
            ))}
          </div>

          <article className="sdlc-detail" id="detalle-sdlc" aria-live="polite">
            <div className="sdlc-detail-index">
              <span>Etapa</span>
              <strong>{String(activeStage + 1).padStart(2, "0")}</strong>
              <small>de 06</small>
            </div>
            <div className="sdlc-detail-main">
              <span className="etiqueta">{stage.short}</span>
              <h2>{stage.name}</h2>
              <p>{stage.description}</p>
              <blockquote>{stage.question}</blockquote>
            </div>
            <div className="sdlc-detail-tasks">
              <h3>Actividades clave</h3>
              <ul>
                {stage.activities.map((activity) => (
                  <li key={activity}>
                    <span aria-hidden="true">✓</span>
                    {activity}
                  </li>
                ))}
              </ul>
              <div>
                <small>Resultado principal</small>
                <strong>{stage.deliverable}</strong>
              </div>
            </div>
          </article>

          <div className="timeline-controls">
            <button
              type="button"
              disabled={activeStage === 0}
              onClick={() => selectStage(activeStage - 1)}
            >
              <span aria-hidden="true">←</span> Etapa anterior
            </button>
            <span>
              {activeStage + 1} / {detailedSdlcStages.length}
            </span>
            <button
              type="button"
              disabled={activeStage === detailedSdlcStages.length - 1}
              onClick={() => selectStage(activeStage + 1)}
            >
              Siguiente etapa <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </section>

      <section className="sdlc-importance">
        <div className="contenedor">
          <div className="section-heading">
            <span className="etiqueta">Por qué importa</span>
            <h2>Calidad construida desde el comienzo</h2>
          </div>
          <div className="importance-grid">
            <article>
              <span>01</span>
              <h3>Reduce riesgos</h3>
              <p>
                Permite detectar incertidumbres y defectos antes de que sean
                costosos.
              </p>
            </article>
            <article>
              <span>02</span>
              <h3>Alinea al equipo</h3>
              <p>
                Define objetivos, responsabilidades y resultados esperados en
                cada etapa.
              </p>
            </article>
            <article>
              <span>03</span>
              <h3>Hace visible la calidad</h3>
              <p>
                Integra verificaciones y evidencia durante todo el proceso, no
                solo al final.
              </p>
            </article>
          </div>
          <button
            className="secondary-btn sdlc-process-link"
            type="button"
            onClick={onOpenProcesses}
          >
            Ver todos los procesos de desarrollo{" "}
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </section>
    </main>
  )
}

const userStories = [
  {
    id: "US-04",
    area: "Herramientas interactivas",
    title: "Herramientas de Calidad",
    description:
      "Catálogo de gestores de pruebas, defectos y análisis automático de calidad.",
    tags: ["Grilla visual", "Filtros", "Validación"],
    target: "tools",
  },
  {
    id: "US-05",
    area: "Ciclo de vida",
    title: "Timeline interactivo del SDLC",
    description:
      "Recorrido por las seis etapas, desde requisitos hasta mantenimiento.",
    tags: ["Seis etapas", "Paso a paso", "Responsive"],
    target: "sdlc",
  },
  {
    id: "US-06",
    area: "Procesos de desarrollo",
    title: "Navegación de modelos",
    description:
      "Subnavegación sticky con seguimiento automático del modelo visible.",
    tags: ["Sticky", "Observer", "Ventajas"],
    target: "models",
  },
  {
    id: "US-07",
    area: "Procesos de desarrollo",
    title: "Ilustraciones y Lightbox",
    description:
      "Diagramas SVG ampliables, navegación por teclado y foco accesible.",
    tags: ["SVG", "Lightbox", "Teclado"],
    target: "models",
  },
  {
    id: "US-09",
    area: "Metodologías ágiles",
    title: "Galería de esquemas ágiles",
    description:
      "Sprint, Kanban y XP explicados mediante ilustraciones vectoriales.",
    tags: ["Retina", "Galería", "Caption"],
    target: "agile-gallery",
  },
  {
    id: "US-10",
    area: "Scrum",
    title: "Scrum en detalle",
    description:
      "Tabs accesibles y laboratorio de Sprint configurable de una a cuatro semanas.",
    tags: ["Roles", "Eventos", "Sprint"],
    target: "scrum",
  },
  {
    id: "US-11",
    area: "Kanban",
    title: "Tablero Kanban didáctico",
    description:
      "Movimiento de tarjetas, límite WIP, persistencia y métricas de flujo.",
    tags: ["Drag & drop", "WIP", "localStorage"],
    target: "kanban",
  },
  {
    id: "US-12",
    area: "Recursos",
    title: "Glosario A–Z",
    description:
      "Más de treinta conceptos agrupados, filtrables y normalizados.",
    tags: ["A–Z", "Búsqueda", "Sin tildes"],
    target: "glossary",
  },
  {
    id: "US-14",
    area: "Recursos",
    title: "Enlaces seguros",
    description: "Biblioteca filtrable con validación HTTPS e iconos por tipo.",
    tags: ["SafeLink", "PDF", "Filtros"],
    target: "links",
  },
  {
    id: "US-15",
    area: "Aprendizaje",
    title: "Casos con solución",
    description:
      "Ejercicios y casos abiertos con solución y pauta ocultas por defecto.",
    tags: ["Casos", "Solución", "Pauta"],
    target: "exercises",
  },
  {
    id: "US-18",
    area: "Herramientas interactivas",
    title: "Comparador de metodologías",
    description:
      "Tabla dinámica para contrastar enfoques, entregas, roles y riesgos.",
    tags: ["Checkboxes", "Tabla", "Datos JS"],
    target: "comparator",
  },
  {
    id: "US-19",
    area: "Herramientas interactivas",
    title: "Encuesta de recomendación",
    description:
      "Wizard de seis preguntas con porcentajes para Scrum, Kanban y Cascada.",
    tags: ["Wizard", "Progreso", "Resultado"],
    target: "survey",
  },
]

const storyAreaIcons: Record<string, ReactNode> = {
  "Herramientas interactivas": (
    <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z" />
  ),
  "Ciclo de vida": (
    <>
      <path d="M21 12a9 9 0 1 1-3-6.7" />
      <path d="M21 4v5h-5" />
    </>
  ),
  "Procesos de desarrollo": (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
      <path d="M10 6.5h4a3 3 0 0 1 3 3V14" />
    </>
  ),
  "Metodologías ágiles": (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 4v4M20 12h-4M12 20v-4M4 12h4" />
    </>
  ),
  Scrum: (
    <>
      <path d="M4 12a8 8 0 0 1 14.5-4.6" />
      <path d="M20 12a8 8 0 0 1-14.5 4.6" />
      <path d="M18.5 3v4.4h-4.4M5.5 21v-4.4h4.4" />
    </>
  ),
  Kanban: (
    <>
      <rect x="3" y="4" width="5" height="16" rx="1.5" />
      <rect x="10" y="4" width="5" height="11" rx="1.5" />
      <rect x="17" y="4" width="4" height="7" rx="1.5" />
    </>
  ),
  Recursos: (
    <>
      <path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z" />
      <path d="M4 21V5M8 7h7M8 11h5" />
    </>
  ),
  Aprendizaje: (
    <>
      <path d="m2 9 10-5 10 5-10 5z" />
      <path d="M6 11v5c3 2.5 9 2.5 12 0v-5" />
    </>
  ),
}

export default function App() {
  const [page, setPage] = useState<Page>("home")
  const [menuOpen, setMenuOpen] = useState(false)
  const [openGroup, setOpenGroup] = useState<string | null>(null)
  const [messageLength, setMessageLength] = useState(0)
  const [successMessage, setSuccessMessage] = useState("")
  const menuArea = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const closeMenu = (event: MouseEvent) => {
      if (!menuArea.current?.contains(event.target as Node)) setMenuOpen(false)
    }
    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false)
    }

    document.addEventListener("mousedown", closeMenu)
    document.addEventListener("keydown", closeWithEscape)
    return () => {
      document.removeEventListener("mousedown", closeMenu)
      document.removeEventListener("keydown", closeWithEscape)
    }
  }, [])

  const scrollTo = (id: string) => {
    if (page !== "home") {
      setPage("home")
      window.setTimeout(
        () =>
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }),
        0,
      )
      setMenuOpen(false)
      return
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setMenuOpen(false)
  }

  const openProcesses = (target?: string) => {
    setPage("procesos")
    setMenuOpen(false)
    window.setTimeout(() => {
      if (target)
        document.getElementById(target)?.scrollIntoView({ behavior: "smooth" })
      else window.scrollTo({ top: 0, behavior: "smooth" })
    }, 0)
  }

  const openSdlc = () => {
    setPage("sdlc")
    setMenuOpen(false)
    window.setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0)
  }

  const openResources = (target?: string) => {
    setPage("recursos")
    setMenuOpen(false)
    window.setTimeout(() => {
      if (target)
        document.getElementById(target)?.scrollIntoView({ behavior: "smooth" })
      else window.scrollTo({ top: 0, behavior: "smooth" })
    }, 0)
  }

  const openTools = () => {
    setPage("herramientas")
    setMenuOpen(false)
    window.setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0)
  }

  const openPage = (
    nextPage: "agiles" | "comparador" | "encuesta",
    target?: string,
  ) => {
    setPage(nextPage)
    setMenuOpen(false)
    window.setTimeout(() => {
      if (target)
        document.getElementById(target)?.scrollIntoView({ behavior: "smooth" })
      else window.scrollTo({ top: 0, behavior: "smooth" })
    }, 0)
  }

  const openStory = (target: string) => {
    if (target === "tools") openTools()
    if (target === "sdlc") openSdlc()
    if (target === "models") openProcesses("modelos")
    if (target === "agile-gallery") openPage("agiles", "galeria-agil")
    if (target === "scrum") openPage("agiles", "scrum")
    if (target === "kanban") openPage("agiles", "kanban")
    if (target === "glossary") openResources("glosario")
    if (target === "links") openResources("enlaces")
    if (target === "exercises") openResources("ejercicios")
    if (target === "comparator") openPage("comparador")
    if (target === "survey") openPage("encuesta")
  }

  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get("nombre")).trim()
    setSuccessMessage(
      `¡Gracias, ${name}! Recibimos tu mensaje y te vamos a responder pronto.`,
    )
    form.reset()
    setMessageLength(0)
  }

  return (
    <div className="app-shell">
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>

      <header className="site-header">
        <button
          className="logo"
          type="button"
          onClick={() => scrollTo("inicio")}
          aria-label="SCrumáticos, ir al inicio"
        >
          <img src={brandLogo} alt="" />
        </button>

        <div ref={menuArea}>
          <button
            className="menu-btn"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="menu-principal"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
          </button>

          <nav
            id="menu-principal"
            className={`menu ${menuOpen ? "menu-abierto" : ""}`}
            aria-label="Principal"
            aria-hidden={!menuOpen}
          >
            <ul>
              {navItems.map((item) => (
                <li key={item.label}>
                  {item.children ? (
                    <>
                      <button
                        className="menu-grupo"
                        type="button"
                        aria-expanded={openGroup === item.label}
                        onClick={() =>
                          setOpenGroup((group) =>
                            group === item.label ? null : item.label,
                          )
                        }
                      >
                        {item.label}
                        <span className="flecha" aria-hidden="true">
                          ▼
                        </span>
                      </button>
                      <ul className="submenu" hidden={openGroup !== item.label}>
                        {item.children.map((child) => (
                          <li key={child.label}>
                            {item.label === "Procesos de Desarrollo" ? (
                              <button
                                className="menu-link"
                                type="button"
                                onClick={() =>
                                  child.label === "SDLC"
                                    ? openSdlc()
                                    : openProcesses("modelos")
                                }
                              >
                                {child.label}
                              </button>
                            ) : item.label === "Recursos y Aprendizaje" ? (
                              <button
                                className="menu-link"
                                type="button"
                                onClick={() => {
                                  const targets: Record<string, string> = {
                                    Glosario: "glosario",
                                    "Preguntas Frecuentes": "preguntas",
                                    "Enlaces de Interés": "enlaces",
                                    Ejercicios: "ejercicios",
                                  }
                                  openResources(targets[child.label])
                                }}
                              >
                                {child.label}
                              </button>
                            ) : item.label === "Metodologías Ágiles" ? (
                              <button
                                className="menu-link"
                                type="button"
                                onClick={() =>
                                  openPage(
                                    "agiles",
                                    child.label === "Scrum"
                                      ? "scrum"
                                      : child.label === "Kanban"
                                        ? "kanban"
                                        : "galeria-agil",
                                  )
                                }
                              >
                                {child.label}
                              </button>
                            ) : item.label === "Herramientas Interactivas" ? (
                              <button
                                className="menu-link"
                                type="button"
                                onClick={() =>
                                  child.label === "Comparador"
                                    ? openPage("comparador")
                                    : child.label === "Encuesta"
                                      ? openPage("encuesta")
                                      : openTools()
                                }
                              >
                                {child.label}
                              </button>
                            ) : (
                              <span
                                className={`menu-link ${
                                  child.available ? "" : "proximamente"
                                }`}
                                aria-disabled={!child.available}
                              >
                                {child.label}
                                {!child.available && (
                                  <small>Próximamente</small>
                                )}
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <button
                      className="menu-link"
                      type="button"
                      onClick={() => item.target && scrollTo(item.target)}
                    >
                      {item.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {page === "procesos" ? (
        <ProcesosPage onBack={() => scrollTo("inicio")} onOpenSdlc={openSdlc} />
      ) : page === "recursos" ? (
        <ResourcesPage onBack={() => scrollTo("inicio")} />
      ) : page === "herramientas" ? (
        <QualityToolsPage onBack={() => scrollTo("inicio")} />
      ) : page === "sdlc" ? (
        <SdlcPage
          onBack={() => scrollTo("inicio")}
          onOpenProcesses={() => openProcesses()}
        />
      ) : page === "agiles" ? (
        <AgilesPage onBack={() => scrollTo("inicio")} />
      ) : page === "comparador" ? (
        <ComparatorPage onBack={() => scrollTo("inicio")} />
      ) : page === "encuesta" ? (
        <SurveyPage onBack={() => scrollTo("inicio")} />
      ) : (
        <main id="contenido">
          <section className="hero" id="inicio" aria-labelledby="titulo-hero">
            <div className="contenedor">
              <span className="etiqueta">Gestión de calidad de software</span>
              <h1 id="titulo-hero" className="degradado">
                Sistema de
                <br />
                Gestión de Calidad
              </h1>
              <p className="bajada">
                Un portal dedicado a la educación y difusión de conocimientos
                sobre gestión de calidad del software, metodologías ágiles y
                tradicionales. Contenido claro, ejemplos prácticos y
                herramientas interactivas para estudiantes y profesionales.
              </p>

              <div className="grilla-secciones">
                {sections.map((section) => {
                  const externalUrl =
                    section.title === "Gestión de Calidad"
                      ? "https://www.figma.com/make/lfoI9FXAnNmsgNc8hXkKb0/Crear-HTML-solicitado?t=mg0nztph23rd6J5C-1"
                      : null

                  const content = (
                    <>
                      <h2>{section.title}</h2>
                      <p>{section.description}</p>
                      <div className="tags">
                        {section.tags.map((tag) =>
                          tag.label === "Fundamentos" ? (
                            <span className="tag" key={tag.label}>
                              {tag.label}
                            </span>
                          ) : tag.target &&
                            section.title !== "Sobre Nosotros y Contacto" ? (
                            <button
                              className="tag"
                              type="button"
                              key={tag.label}
                              onClick={() => scrollTo(tag.target!)}
                            >
                              {tag.label}
                            </button>
                          ) : "page" in tag ? (
                            <button
                              className="tag"
                              type="button"
                              key={tag.label}
                              onClick={() => {
                                if (tag.page === "herramientas") openTools()
                                if (tag.page === "comparador")
                                  openPage("comparador")
                                if (tag.page === "encuesta")
                                  openPage("encuesta")
                              }}
                            >
                              {tag.label}
                            </button>
                          ) : (
                            <span
                              className={`tag ${
                                tag.available ? "" : "proximamente"
                              }`}
                              title={tag.available ? undefined : "Próximamente"}
                              key={tag.label}
                            >
                              {tag.label}
                            </span>
                          ),
                        )}
                      </div>
                    </>
                  )

                  return section.title === "Procesos de Desarrollo" ? (
                    <button
                      className="tarjeta tarjeta-link"
                      type="button"
                      onClick={() => openProcesses()}
                      key={section.title}
                    >
                      {content}
                    </button>
                  ) : section.title === "Recursos y Aprendizaje" ? (
                    <button
                      className="tarjeta tarjeta-link"
                      type="button"
                      onClick={() => openResources()}
                      key={section.title}
                    >
                      {content}
                    </button>
                  ) : section.title === "Metodologías Ágiles" ? (
                    <button
                      className="tarjeta tarjeta-link"
                      type="button"
                      onClick={() => openPage("agiles")}
                      key={section.title}
                    >
                      {content}
                    </button>
                  ) : section.title === "Herramientas Interactivas" ? (
                    <article className="tarjeta" key={section.title}>
                      {content}
                    </article>
                  ) : section.title === "Sobre Nosotros y Contacto" ? (
                    <button
                      className="tarjeta tarjeta-link"
                      type="button"
                      onClick={() => scrollTo("nosotros")}
                      key={section.title}
                    >
                      {content}
                    </button>
                  ) : externalUrl ? (
                    <a
                      className="tarjeta tarjeta-link"
                      href={externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      key={section.title}
                    >
                      {content}
                    </a>
                  ) : (
                    <article className="tarjeta" key={section.title}>
                      {content}
                    </article>
                  )
                })}
              </div>
            </div>

            <div className="ondas" aria-hidden="true">
              <svg viewBox="0 0 1440 600" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="onda1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#3B0F8C" stopOpacity=".55" />
                    <stop offset="1" stopColor="#4C1DA8" stopOpacity=".9" />
                  </linearGradient>
                  <linearGradient id="onda2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#5B21B6" stopOpacity=".6" />
                    <stop offset="1" stopColor="#4C1DA8" />
                  </linearGradient>
                </defs>
                <path
                  className="onda onda-uno"
                  d="M0,220 C300,160 600,300 900,330 C1150,355 1300,200 1440,60 L1440,600 L0,600 Z"
                  fill="url(#onda1)"
                />
                <path
                  className="onda onda-dos"
                  d="M0,480 C260,300 560,260 860,330 C1100,385 1300,360 1440,280 L1440,600 L0,600 Z"
                  fill="url(#onda2)"
                />
              </svg>
            </div>
          </section>

          <section
            className="bloque user-stories"
            id="historias"
            aria-labelledby="t-historias"
          >
            <div className="contenedor">
              <div className="stories-heading">
                <div>
                  <span className="etiqueta">Trabajo realizado</span>
                  <h2 id="t-historias">
                    Historias de <span className="degradado">usuario</span>
                  </h2>
                  <p className="bajada">
                    Un registro visual de las funcionalidades que vamos
                    construyendo. Cada historia reúne su objetivo, sus
                    requerimientos y el resultado implementado.
                  </p>
                </div>
                <div className="stories-progress">
                  <strong>{userStories.length}</strong>
                  <span>historias completadas</span>
                </div>
              </div>

              <div className="stories-grid">
                {userStories.map((story) => (
                  <button
                    className="story-card"
                    type="button"
                    onClick={() => openStory(story.target)}
                    key={story.id}
                  >
                    <div className="story-card-top">
                      <span className="story-id">{story.id}</span>
                      <span className="story-status">
                        <i aria-hidden="true" /> Completada
                      </span>
                    </div>
                    <div className="story-area-row">
                      <span className="story-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24">{storyAreaIcons[story.area]}</svg>
                      </span>
                      <span className="story-area">{story.area}</span>
                    </div>
                    <h3>{story.title}</h3>
                    <p>{story.description}</p>
                    <ul>
                      {story.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                    <span className="story-link">
                      Ver historia implementada <i aria-hidden="true">→</i>
                    </span>
                  </button>
                ))}
              </div>

              <div className="next-story">
                <span>Próxima entrega</span>
                <div>
                  <i aria-hidden="true">+</i>
                  <p>
                    Las próximas historias de usuario aparecerán en esta sección
                    a medida que las vayamos desarrollando.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section
            className="bloque"
            id="nosotros"
            aria-labelledby="t-nosotros"
          >
            <div className="contenedor">
              <div className="nosotros-intro">
                <img
                  className="logo-equipo"
                  src={teamLogo}
                  alt="Los cuatro integrantes de SCrumáticos trabajando sobre un tablero Scrum"
                  loading="lazy"
                />
                <div>
                  <span className="etiqueta">El equipo</span>
                  <h2 id="t-nosotros">
                    Sobre <span className="degradado">nosotros</span>
                  </h2>
                  <p className="bajada">
                    Somos SCrumáticos, un equipo de estudiantes que trabaja con
                    Scrum para construir un portal sobre gestión de la calidad
                    del software y metodologías de desarrollo.
                  </p>
                </div>
              </div>

              <div className="equipo">
                {team.map((member) => (
                  <article className="perfil" tabIndex={0} key={member.name}>
                    {member.photo ? (
                      <img
                        className="avatar"
                        src={member.photo}
                        alt={`Avatar de ${member.name}`}
                      />
                    ) : (
                      <div className="avatar" aria-hidden="true">
                        {member.initials}
                      </div>
                    )}
                    <h3>{member.name}</h3>
                    <p className="rol">{member.role}</p>
                    <p className="desc">{member.description}</p>
                    <span className="linea" aria-hidden="true" />
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section
            className="bloque contacto"
            id="contacto"
            aria-labelledby="t-contacto"
          >
            <div className="contenedor">
              <span className="etiqueta">Escribinos</span>
              <h2 id="t-contacto">
                <span className="degradado">Contacto</span>
              </h2>
              <p className="bajada">
                ¿Tenés una duda, una sugerencia o encontraste un error? Completá
                el formulario y te respondemos a la brevedad.
              </p>

              <form className="formulario tarjeta" onSubmit={submitContact}>
                <div className="campo">
                  <label htmlFor="c-nombre">Nombre</label>
                  <input
                    id="c-nombre"
                    name="nombre"
                    type="text"
                    autoComplete="name"
                    required
                    minLength={2}
                  />
                </div>

                <div className="campo">
                  <label htmlFor="c-email">Email</label>
                  <input
                    id="c-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                  />
                </div>

                <div className="campo">
                  <label htmlFor="c-motivo">Motivo</label>
                  <select id="c-motivo" name="motivo" required defaultValue="">
                    <option value="" disabled>
                      Elegí una opción
                    </option>
                    <option value="consulta">Consulta</option>
                    <option value="sugerencia">Sugerencia</option>
                    <option value="error">Reportar un error</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div className="campo campo-ancho">
                  <label htmlFor="c-mensaje">Mensaje</label>
                  <textarea
                    id="c-mensaje"
                    name="mensaje"
                    rows={6}
                    required
                    minLength={10}
                    maxLength={500}
                    onChange={(event) =>
                      setMessageLength(event.target.value.length)
                    }
                  />
                  <div className="campo-pie">
                    <span />
                    <span className="contador">{messageLength} / 500</span>
                  </div>
                </div>

                <div className="campo-ancho">
                  <button className="btn" type="submit">
                    Enviar mensaje
                  </button>
                </div>
                {successMessage && (
                  <p className="form-ok campo-ancho" role="status">
                    {successMessage}
                  </p>
                )}
              </form>
            </div>
          </section>
        </main>
      )}

      <footer className="site-footer">
        <div className="footer-card">
          <div className="footer-main">
            <div className="footer-brand">
              <button
                className="footer-logo"
                type="button"
                onClick={() => scrollTo("inicio")}
                aria-label="SCrumáticos, volver al inicio"
              >
                <img src={brandLogo} alt="SCrumáticos" />
              </button>
              <p>
                Aprendemos, colaboramos y mejoramos para entregar software de
                calidad.
              </p>
              <div
                className="footer-values"
                aria-label="Valores de SCrumáticos"
              >
                <span>Planificamos</span>
                <span>Colaboramos</span>
                <span>Adaptamos</span>
              </div>
            </div>

            <div className="footer-column">
              <h2>Contenido</h2>
              <button type="button" onClick={() => scrollTo("inicio")}>
                Inicio
              </button>
              <button type="button" onClick={() => scrollTo("inicio")}>
                Gestión de calidad
              </button>
              <button type="button" onClick={() => openProcesses()}>
                Procesos de desarrollo
              </button>
              <button type="button" onClick={() => scrollTo("inicio")}>
                Metodologías ágiles
              </button>
              <button type="button" onClick={() => openResources()}>
                Recursos y aprendizaje
              </button>
              <button type="button" onClick={openTools}>
                Herramientas de calidad
              </button>
              <button type="button" onClick={() => scrollTo("historias")}>
                Historias de usuario
              </button>
            </div>

            <div className="footer-column">
              <h2>SCrumáticos</h2>
              <button type="button" onClick={() => scrollTo("nosotros")}>
                Sobre nosotros
              </button>
              <button type="button" onClick={() => scrollTo("nosotros")}>
                Nuestro equipo
              </button>
              <button type="button" onClick={() => scrollTo("contacto")}>
                Contacto
              </button>
              <button type="button" onClick={() => openResources()}>
                Recursos educativos
              </button>
            </div>

            <div className="footer-standards">
              <h2>Nuestro enfoque</h2>
              <div className="standard-grid">
                <span>
                  <b>QA</b>
                  Calidad
                </span>
                <span>
                  <b>S</b>
                  Scrum
                </span>
                <span>
                  <b>ISO</b>
                  25010
                </span>
                <span>
                  <b>∞</b>
                  Mejora
                </span>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>
              © {new Date().getFullYear()} SCrumáticos. Todos los derechos
              reservados.
            </p>
            <div>
              <button type="button" onClick={() => scrollTo("contacto")}>
                Contacto
              </button>
              <span aria-hidden="true">•</span>
              <span>Privacidad</span>
              <span aria-hidden="true">•</span>
              <span>Accesibilidad</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
