// Casos de estudio redactados por agentes de Antigravity a partir del código de cada repo.
// Revisa y ajusta el texto cuando quieras.

export interface CaseStudy {
  overview: string;
  challenge: string;
  solution: string;
  features: { title: string; text: string }[];
  role: string[];
  tools: { name: string; use: string }[];
  platform: string;
}

export const cases: Record<string, CaseStudy> = {
  "galenna": {
    "overview": "Instituto Galenna es una plataforma web integral creada para un centro médico especializado en endometriosis, piso pélvico y cirugía ginecológica robótica liderado por el Dr. Armando Gómez Castro. Está diseñada para orientar a pacientes que buscan atención especializada y facilitar el seguimiento clínico por parte del equipo médico y administrativo.",
    "challenge": "El centro necesitaba una presencia digital clara para comunicar sus tratamientos especializados, recibir tráfico desde redes sociales y ofrecer un tamizaje inicial de riesgo ginecológico. Además, requería centralizar en un mismo entorno el registro de prospectos, la consulta de citas médicas y el monitoreo diario de síntomas de dolor pélvico.",
    "solution": "Se construyó una aplicación web full-stack con Next.js 16 (App Router) y TypeScript que integra el sitio institucional, vistas tipo bio-link y un portal clínico privado. El backend se resolvió mediante Route Handlers conectados a una base de datos MySQL con control de acceso por roles (paciente, médico y super administrador), empleando tokens JWT con Jose y cifrado de contraseñas con bcryptjs. En el frontend se implementó un sistema visual con Tailwind CSS v4 y efectos glassmorphism, animaciones con Framer Motion y manejo del estado de autenticación con Zustand.",
    "features": [
      {
        "title": "Portal clínico por roles",
        "text": "Acceso diferenciado con JWT para pacientes, médicos y administradores según sus permisos en la plataforma."
      },
      {
        "title": "Monitoreo diario de dolor",
        "text": "Registro de dolor menstrual, sexual, intestinal y urinario con conteo de rachas para evaluación médica."
      },
      {
        "title": "Gestión de citas médicas",
        "text": "Visualización de citas con fecha, hora, especialista, sede y estado tanto para pacientes como para doctores."
      },
      {
        "title": "Test de riesgo ginecológico",
        "text": "Evaluación interactiva que calcula puntaje y nivel de riesgo, almacenando prospectos para contacto clínico."
      },
      {
        "title": "Sitio institucional y bio links",
        "text": "Páginas informativas de servicios, equipo y planes anuales con SEO configurado y vista para redes sociales."
      }
    ],
    "role": [
      "Diseño UI y maquetación responsiva",
      "Desarrollo Frontend",
      "Desarrollo Backend y API REST",
      "Autenticación y modelado de datos"
    ],
    "tools": [
      {
        "name": "Next.js",
        "use": "Framework full-stack para páginas web y rutas de la API"
      },
      {
        "name": "React",
        "use": "Construcción de componentes modulares y vistas cliente"
      },
      {
        "name": "TypeScript",
        "use": "Tipado estático en interfaz, estado y endpoints del servidor"
      },
      {
        "name": "Tailwind CSS",
        "use": "Estilos responsivos, paleta de marca y efecto glassmorphism"
      },
      {
        "name": "MySQL2",
        "use": "Consultas SQL para usuarios, citas, prospectos y reportes"
      },
      {
        "name": "Framer Motion",
        "use": "Animaciones de entrada en secciones e interacciones UI"
      },
      {
        "name": "Zustand",
        "use": "Gestión del estado de sesión del usuario en el cliente"
      },
      {
        "name": "Jose",
        "use": "Firma y verificación de tokens JWT para control de roles"
      },
      {
        "name": "bcryptjs",
        "use": "Cifrado y validación segura de contraseñas de usuarios"
      }
    ],
    "platform": "Web"
  },
  "oraldentalplus": {
    "overview": "Landing page desarrollada para Oraldentalplus, una clínica de odontología integral ubicada en Barranquilla, Colombia. El sitio está dirigido a pacientes que buscan información clara sobre tratamientos de implantología, estética dental, ortodoncia y periodoncia, facilitando el agendamiento de citas.",
    "challenge": "La clínica necesitaba una presencia digital actual que explicara procedimientos odontológicos complejos de manera visual y comprensible para los pacientes. Asimismo, requería presentar sus casos clínicos reales, mejorar su visibilidad en búsquedas locales en Barranquilla y ofrecer un canal directo para solicitar valoraciones.",
    "solution": "Se desarrolló una aplicación web con Next.js 15, React 19, TypeScript y Tailwind CSS 4 bajo una estética oscura que resalta el material fotográfico de la clínica. Para ilustrar la estructura de un implante dental, se implementó un visor 3D interactivo con Three.js y React Three Fiber cargado dinámicamente en el cliente para no afectar la carga inicial. La experiencia incorpora animaciones vinculadas al scroll y transiciones suaves con Motion, además de optimización de imágenes con el componente nativo de Next.js. También se configuraron metadatos SEO regionales (es_CO), etiquetas Open Graph, Vercel Analytics e integración directa con WhatsApp.",
    "features": [
      {
        "title": "Visor 3D de implante",
        "text": "Modelo GLB interactivo con vista ensamblada o explosionada y selección anatómica de corona, pilar y tornillo."
      },
      {
        "title": "Animación guiada por scroll",
        "text": "Sección interactiva que sincroniza el cierre mandibular, el zoom y la aparición de textos con el desplazamiento."
      },
      {
        "title": "Catálogo de especialidades y casos",
        "text": "Presentación de tratamientos de implantología, estética y ortodoncia con galería clínica y efectos hover."
      },
      {
        "title": "Contacto directo por WhatsApp",
        "text": "Botón flotante personalizable con mensaje predefinido y sección dedicada para agendar consultas odontológicas."
      },
      {
        "title": "SEO local para Barranquilla",
        "text": "Configuración de metadatos en español de Colombia, tarjetas Open Graph, Twitter Cards y Vercel Analytics."
      }
    ],
    "role": [
      "Diseño UI e Interacción",
      "Desarrollo Frontend",
      "Integración 3D",
      "Optimización SEO"
    ],
    "tools": [
      {
        "name": "Next.js 15",
        "use": "Framework web con App Router, carga dinámica y SEO"
      },
      {
        "name": "React 19",
        "use": "Construcción de componentes y manejo de estado en UI"
      },
      {
        "name": "TypeScript",
        "use": "Tipado estático de componentes y nodos del modelo 3D"
      },
      {
        "name": "Three.js y React Three Fiber",
        "use": "Renderizado interactivo del implante dental 3D (.glb)"
      },
      {
        "name": "React Three Drei",
        "use": "Controles de órbita, carga GLTF, sombras e iluminación"
      },
      {
        "name": "Tailwind CSS 4",
        "use": "Sistema de estilos utilitarios y variables de tema"
      },
      {
        "name": "Motion",
        "use": "Animaciones de entrada y transiciones ligadas al scroll"
      },
      {
        "name": "Lucide React",
        "use": "Iconografía consistente en secciones clínicas y contacto"
      },
      {
        "name": "Vercel Analytics",
        "use": "Seguimiento de tráfico y visitas en producción"
      }
    ],
    "platform": "Web"
  },
  "subline": {
    "overview": "Subline es una aplicación móvil para iOS y Android enfocada en la generación automática y edición de subtítulos para videos directamente desde el teléfono. Está diseñada para creadores de contenido y editores que necesitan transcribir audio y ajustar segmentos de texto sin depender de programas de escritorio ni servicios en la nube.",
    "challenge": "Subtitular videos desde dispositivos móviles suele exigir subir archivos pesados a servidores externos o trabajar con interfaces poco precisas para sincronizar tiempos. El reto consistió en procesar el reconocimiento de voz de manera local en el dispositivo y construir un editor táctil fluido capaz de controlar tiempos, silencios y formato por segmento.",
    "solution": "Keyner construyó la aplicación con React Native, Expo y TypeScript, integrando whisper.rn junto con un extractor de audio para ejecutar la transcripción directamente en el teléfono. Para garantizar fluidez al editar videos largos, implementó una línea de tiempo multipista virtualizada en bloques de 15 segundos y controles deslizantes animados con Reanimated. Además, estructuró el estado reactivo del editor con Jotai y diseñó una capa de persistencia local combinando SQLite con archivos JSON para guardar proyectos, ajustes y marcas en centésimas de segundo.",
    "features": [
      {
        "title": "Transcripción local con Whisper",
        "text": "Extracción del audio del video y reconocimiento de voz en el dispositivo mediante whisper.rn."
      },
      {
        "title": "Línea de tiempo multipista",
        "text": "Pistas de video, audio y texto con zoom, desplazamiento sincronizado y virtualización por bloques."
      },
      {
        "title": "Formato parametrizable de subtítulos",
        "text": "Ajuste de máximo de caracteres, duración mínima, separación en fotogramas y modo de doble línea."
      },
      {
        "title": "Controles táctiles de precisión",
        "text": "Selector tipo regla animado con Reanimated y respuesta háptica para calibrar valores en el editor."
      },
      {
        "title": "Persistencia local de proyectos",
        "text": "Almacenamiento en SQLite y archivos JSON con migraciones automáticas para conservar cada edición."
      }
    ],
    "role": [
      "Diseño UI y tema oscuro",
      "Desarrollo móvil en React Native",
      "Integración de audio e IA local",
      "Persistencia y estado de datos"
    ],
    "tools": [
      {
        "name": "Expo & React Native",
        "use": "Base móvil multiplataforma y navegación con Expo Router"
      },
      {
        "name": "TypeScript",
        "use": "Tipado estático para modelos de proyectos, rutas y UI"
      },
      {
        "name": "whisper.rn",
        "use": "Motor nativo para transcripción de voz a texto local"
      },
      {
        "name": "expo-video-audio-extractor",
        "use": "Extracción de pistas de audio desde archivos de video"
      },
      {
        "name": "React Native Reanimated",
        "use": "Animaciones fluidas en la línea de tiempo y controles"
      },
      {
        "name": "expo-sqlite",
        "use": "Base de datos local para proyectos, ajustes y migraciones"
      },
      {
        "name": "Jotai",
        "use": "Manejo de estado atómico para proyectos en edición"
      },
      {
        "name": "NativeWind & Tailwind CSS",
        "use": "Estilizado del tema oscuro y componentes de interfaz"
      }
    ],
    "platform": "iOS / Android"
  },
  "rhema-notes": {
    "overview": "Rhema Notes es una aplicación móvil de estudio bíblico y toma de notas diseñada para lectores y asistentes a comunidades de fe que registran sus reflexiones. Combina la consulta de la Biblia Reina-Valera 1960 sin conexión con un editor de texto enriquecido que permite vincular pasajes directamente mientras se escribe.",
    "challenge": "Al tomar apuntes de estudio o predicaciones desde el celular, las personas suelen alternar entre una aplicación bíblica y otra de notas, perdiendo el hilo al buscar y copiar referencias manualmente. Además, los editores móviles tradicionales no cuentan con atajos pensados para insertar versículos al vuelo ni organizar apuntes alrededor de libros bíblicos.",
    "solution": "Keyner construyó una aplicación local-first en React Native con Expo que integra la Biblia RVR1960 y los apuntes del usuario en SQLite para garantizar acceso inmediato sin internet. Para lograr una experiencia de escritura fluida y flexible en móvil, embebió un editor basado en Lexical dentro de un WebView sincronizado con controles nativos, menús de comandos con '/' y menciones con '@' para citar pasajes al instante. El estado de notas, cuadernos y lectura se centralizó con Zustand, acompañado de un sistema visual propio con temas Pergamino y Noche implementado en NativeWind.",
    "features": [
      {
        "title": "Citas bíblicas con @",
        "text": "Buscador paso a paso al escribir '@' o '/' para localizar e insertar versículos directamente en la nota."
      },
      {
        "title": "Biblia RVR1960 sin conexión",
        "text": "Lectura local en SQLite con división por perícopas y selector ágil por testamento, libro, capítulo y versículo."
      },
      {
        "title": "Editor de texto enriquecido",
        "text": "Motor Lexical integrado con jerarquía de títulos, alineación, sangrías y resaltado de texto en cuatro colores."
      },
      {
        "title": "Organización por cuadernos y fechas",
        "text": "Gestión de cuadernos personalizados, tarjetas fijadas y franja semanal para filtrar notas de los últimos siete días."
      },
      {
        "title": "Temas Pergamino y Noche",
        "text": "Sistema visual adaptable a lectura diurna o nocturna con tipografías editoriales Literata y Plus Jakarta Sans."
      }
    ],
    "role": [
      "Diseño UI y sistema de temas",
      "Arquitectura local-first y datos SQLite",
      "Desarrollo móvil con React Native",
      "Integración de editor enriquecido"
    ],
    "tools": [
      {
        "name": "React Native & Expo",
        "use": "Base de la aplicación móvil multiplataforma y recursos"
      },
      {
        "name": "TypeScript",
        "use": "Tipado estático de entidades, stores y componentes"
      },
      {
        "name": "Expo SQLite",
        "use": "Persistencia local de notas, cuadernos y Biblia RVR1960"
      },
      {
        "name": "Lexical & WebView",
        "use": "Motor de edición de texto enriquecido dentro de la app"
      },
      {
        "name": "Zustand",
        "use": "Gestión de estado global de notas, lectura y preferencias"
      },
      {
        "name": "NativeWind (Tailwind CSS)",
        "use": "Sistema de estilos y paletas de color Pergamino y Noche"
      },
      {
        "name": "React Navigation",
        "use": "Navegación principal por pestañas y pilas nativas"
      },
      {
        "name": "Reanimated & Bottom Sheet",
        "use": "Animaciones de interfaz y paneles modales interactivos"
      }
    ],
    "platform": "iOS / Android"
  },
  "brote": {
    "overview": "Brote es una aplicación móvil enfocada en la creación de hábitos diarios, la gestión de alarmas y el seguimiento del bienestar personal. Está dirigida a personas que buscan organizar sus rutinas cotidianas, cuidar su hidratación, realizar pausas activas y visualizar su constancia desde un solo lugar.",
    "challenge": "Sostener rutinas saludables suele complicarse cuando las alarmas para despertar, el control de hidratación y los recordatorios de metas están dispersos en varias herramientas. A esto se suma que las alarmas tradicionales se posponen o apagan por inercia sin confirmar que la persona despertó, y una mala configuración de permisos en el teléfono puede silenciar avisos críticos.",
    "solution": "Keyner De la Hoz partió de un sistema de diseño de 21 pantallas para desarrollar la aplicación en Flutter bajo una arquitectura modular organizada por dominios funcionales. Implementó el manejo de estado con Riverpod y estructuró la navegación declarativa con GoRouter, aislando las vistas principales de los flujos a pantalla completa como la alarma sonando y la solicitud de permisos. Además, integró persistencia local de datos mediante generación de código, opciones de personalización visual y pruebas automatizadas de lógica y widgets.",
    "features": [
      {
        "title": "Alarmas con confirmación activa",
        "text": "Pantalla completa al sonar con ventana de 3 minutos para confirmar el despertar antes de reactivar la alarma."
      },
      {
        "title": "Metas, hábitos y recordatorios",
        "text": "Gestión de actividades recurrentes configurables por días de la semana, horarios de inicio y fin e intervalos."
      },
      {
        "title": "Hidratación y pausas activas",
        "text": "Registro diario de consumo de agua y cálculo automático de la próxima pausa según la jornada configurada."
      },
      {
        "title": "Planta evolutiva por rachas",
        "text": "Sistema visual que avanza en cinco etapas, desde semilla hasta árbol, al sostener rachas de hasta 90 días."
      },
      {
        "title": "Estadísticas de progreso temporal",
        "text": "Panel de seguimiento con métricas de cumplimiento diario y visualización filtrable por día, semana, mes y año."
      },
      {
        "title": "Onboarding guiado de permisos",
        "text": "Flujo paso a paso que verifica estados concedidos o bloqueados en el sistema para asegurar las notificaciones."
      }
    ],
    "role": [
      "Diseño UI/UX (21 pantallas)",
      "Arquitectura y desarrollo móvil",
      "Persistencia local y estado",
      "Pruebas unitarias y de widgets"
    ],
    "tools": [
      {
        "name": "Flutter",
        "use": "Desarrollo de la interfaz móvil y widgets personalizados"
      },
      {
        "name": "Dart",
        "use": "Lógica de negocio, modelos de datos y temporizadores"
      },
      {
        "name": "flutter_riverpod",
        "use": "Gestión reactiva de estado e inyección de dependencias"
      },
      {
        "name": "go_router",
        "use": "Navegación declarativa y rutas de pantalla completa"
      },
      {
        "name": "intl",
        "use": "Localización y formato de fechas y horas en español"
      },
      {
        "name": "flutter_test",
        "use": "Pruebas automatizadas de controladores, datos y pantallas"
      }
    ],
    "platform": "iOS / Android"
  },
  "stylesyncs": {
    "overview": "Stylesyncs es una aplicación web de agendamiento y gestión de citas diseñada para barberos, peluqueros independientes y sus clientes. Permite a los usuarios reservar turnos en línea en cualquier momento y brinda a los profesionales un panel dedicado para administrar su agenda, horarios y servicios.",
    "challenge": "Coordinar citas de peluquería y barbería mediante llamadas o mensajes manuales suele provocar cruces de horarios, tiempos de espera y desorden operativo. Tanto los profesionales como sus clientes necesitan un flujo directo para consultar disponibilidad real, confirmar turnos y registrar cada atención en el local.",
    "solution": "Se construyó una aplicación en Next.js 16 con App Router, React 19 y TypeScript, separando la lógica de negocio en servicios dedicados para citas, usuarios y autenticación junto con estado global en Zustand. El respaldo de datos y la sincronización en tiempo real de la agenda se implementaron con Firebase Auth y Cloud Firestore. Para agilizar la recepción en barbería, se integró generación de códigos QR en la reserva y un lector por cámara web, sobre una interfaz responsiva con Tailwind CSS 4, Radix UI y navegación inferior pensada para pantallas móviles.",
    "features": [
      {
        "title": "Agendamiento por enlace propio",
        "text": "Flujo de reserva por pasos y enlaces públicos por profesional con disponibilidad sincronizada en tiempo real."
      },
      {
        "title": "Validación con código QR",
        "text": "Generación de código QR al crear la cita y escáner integrado con cámara para completar la atención en el panel."
      },
      {
        "title": "Panel de control para barberos",
        "text": "Gestión de citas pendientes o confirmadas y consulta de métricas filtrables por día, semana o mes."
      },
      {
        "title": "Configuración de perfil laboral",
        "text": "Administración de días y horarios de atención, catálogo de servicios y enlace directo para compartir con clientes."
      },
      {
        "title": "Experiencia optimizada en móvil",
        "text": "Diseño adaptable con barra de navegación inferior para el barbero, pantalla de inicio animada y alertas en pantalla."
      }
    ],
    "role": [
      "Diseño UI/UX",
      "Desarrollo Frontend",
      "Integración con Firebase",
      "Arquitectura de estado y servicios"
    ],
    "tools": [
      {
        "name": "Next.js 16",
        "use": "Framework web, enrutamiento con App Router y vistas"
      },
      {
        "name": "React 19 & TypeScript",
        "use": "Desarrollo de interfaz modular con tipado estático"
      },
      {
        "name": "Firebase",
        "use": "Autenticación de usuarios y base de datos en Firestore"
      },
      {
        "name": "Tailwind CSS 4",
        "use": "Estilos responsivos, sistema de diseño y animaciones"
      },
      {
        "name": "Zustand",
        "use": "Gestión del estado global de sesión del usuario"
      },
      {
        "name": "Radix UI & Vaul",
        "use": "Componentes accesibles de interfaz, menús y drawers"
      },
      {
        "name": "qrcode.react & html5-qrcode",
        "use": "Generación y escaneo por cámara de códigos QR de citas"
      },
      {
        "name": "React Day Picker & date-fns",
        "use": "Calendario interactivo de reservas y manejo de fechas"
      }
    ],
    "platform": "Web"
  },
  "luxurious-flooring": {
    "overview": "Sitio web corporativo desarrollado para Luxurious Flooring & Construction LLC, una empresa contratista especializada en pisos, acabados y remodelaciones en Tulsa, Oklahoma. Está dirigido a propietarios y clientes locales que buscan servicios profesionales de instalación de cerámica, porcelanato, madera, alfombra y sistemas certificados.",
    "challenge": "La empresa necesitaba consolidar su presencia digital en luxuriousflooringllc.com para presentar sus servicios especializados y respaldar su trabajo con certificaciones técnicas como Schluter®-Systems y GURU. Además, requería captar solicitudes de cotización gratuita desde buscadores y enlaces de Instagram sin depender de infraestructura de backend propia.",
    "solution": "Se construyó una aplicación web de una sola página con Next.js 16, React 19 y TypeScript, estilizada con Tailwind CSS v4 y soporte automático para modo claro y oscuro según la preferencia del sistema. Se implementaron animaciones escalonadas con Framer Motion y optimización nativa de imágenes y tipografía Inter para cuidar la presentación visual y el rendimiento. Para facilitar el contacto directo sin servidor, el formulario procesa los datos del proyecto en el navegador y redirige la solicitud estructurada hacia WhatsApp o el cliente de correo electrónico. También se integraron metadatos de SEO local, imagen OpenGraph dedicada y detección de tráfico desde Instagram con useSyncExternalStore.",
    "features": [
      {
        "title": "Cotización vía WhatsApp o correo",
        "text": "Formulario que estructura el tipo de proyecto y contacto para enviarlo directo por WhatsApp o correo sin backend."
      },
      {
        "title": "Servicios y sistemas certificados",
        "text": "Presentación de instalación de cerámica, madera, alfombra y sistemas especializados con insignias Schluter® y GURU."
      },
      {
        "title": "Detección de vista Instagram",
        "text": "Lectura sincronizada de parámetros en la URL con useSyncExternalStore para identificar visitas desde Instagram."
      },
      {
        "title": "Animaciones de interfaz fluidas",
        "text": "Secuencias de entrada en encabezado, títulos, estadísticas y tarjetas mediante Framer Motion y curvas cúbicas."
      },
      {
        "title": "SEO local y OpenGraph",
        "text": "Metadatos configurados para Tulsa, Oklahoma, tarjetas para redes sociales e imagen OpenGraph generada en la app."
      },
      {
        "title": "Modo claro y oscuro",
        "text": "Variables de color adaptables automáticamente según la configuración del sistema operativo con Tailwind CSS v4."
      }
    ],
    "role": [
      "Diseño UI",
      "Desarrollo Frontend",
      "Animaciones e Interacción",
      "Optimización SEO"
    ],
    "tools": [
      {
        "name": "Next.js",
        "use": "Framework React con App Router, SEO e imágenes optimizadas"
      },
      {
        "name": "React",
        "use": "Construcción de la interfaz interactiva y manejo de estado"
      },
      {
        "name": "TypeScript",
        "use": "Tipado estático en componentes, eventos y metadatos"
      },
      {
        "name": "Tailwind CSS",
        "use": "Estilos utilitarios, diseño adaptable y modo oscuro"
      },
      {
        "name": "Framer Motion",
        "use": "Animaciones de entrada y transiciones con curvas cúbicas"
      },
      {
        "name": "PostCSS",
        "use": "Procesamiento de hojas de estilo para Tailwind CSS v4"
      },
      {
        "name": "ESLint",
        "use": "Análisis estático de código con reglas para Next.js"
      }
    ],
    "platform": "Web"
  },
  "ecofusion": {
    "overview": "Sitio web corporativo desarrollado para Ecofusion, firma colombiana de arquitectura, ingeniería y construcción sostenible con metodología BIM. La plataforma presenta su portafolio de obras civiles, interventoría y consultoría ante clientes empresariales y residenciales. Está diseñada para respaldar su gestión comercial exhibiendo proyectos ejecutados para compañías como Coca-Cola FEMSA, Tiendas Ara y Constructora Arrecife.",
    "challenge": "Ecofusion necesitaba llevar el contenido técnico de su portafolio comercial a un canal digital claro, ágil y estructurado. El reto principal consistía en organizar un archivo fotográfico amplio de obras reales y explicar servicios especializados de ingeniería sin recargar la navegación. Asimismo, debía integrar canales de contacto inmediato cumpliendo la normativa colombiana de protección de datos personales.",
    "solution": "Se construyó una aplicación web con Next.js 16 (App Router), React 19 y TypeScript, centralizando la información corporativa y de proyectos en módulos tipados para generar páginas dinámicas por cada obra. La interfaz se maquetó con Tailwind CSS 4 usando variables de tema personalizadas, tipografía DM Sans con next/font y optimización de fotografías mediante next/image. Para acompañar la exploración visual se implementaron revelados de texto y carruseles continuos con Framer Motion, complementados con un formulario interactivo y botón flotante de WhatsApp.",
    "features": [
      {
        "title": "Catálogo dinámico de proyectos",
        "text": "Vitrina fotográfica con rutas dinámicas de detalle para obras corporativas, comerciales y residenciales."
      },
      {
        "title": "Módulos de servicios e interventoría",
        "text": "Secciones dedicadas a asesoría, construcción e interventoría con carruseles y desglose de alcances técnicos."
      },
      {
        "title": "Animaciones e interacción fluida",
        "text": "Transiciones de texto y carruseles animados con Framer Motion para presentar clientes aliados y obras."
      },
      {
        "title": "Canales directos de contacto",
        "text": "Formulario interactivo y botón flotante de WhatsApp disponible en todas las vistas del sitio."
      },
      {
        "title": "Respaldo institucional y legal",
        "text": "Páginas de equipo, experiencia directiva y políticas ajustadas a la Ley 1581 de 2012 en Colombia."
      }
    ],
    "role": [
      "Implementación UI",
      "Desarrollo Frontend",
      "Estructuración de contenidos",
      "Optimización de recursos multimedia"
    ],
    "tools": [
      {
        "name": "Next.js 16",
        "use": "Enrutamiento App Router, rutas dinámicas y optimización web"
      },
      {
        "name": "React 19",
        "use": "Arquitectura de componentes reutilizables y estado cliente"
      },
      {
        "name": "TypeScript",
        "use": "Tipado estático para componentes, propiedades y datos"
      },
      {
        "name": "Tailwind CSS 4",
        "use": "Sistema de estilos, variables de marca y diseño adaptable"
      },
      {
        "name": "Framer Motion",
        "use": "Animaciones de entrada, carruseles continuos y transiciones"
      },
      {
        "name": "ESLint",
        "use": "Verificación estática de código bajo reglas de Next.js"
      }
    ],
    "platform": "Web"
  }
};
