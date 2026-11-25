import Image from "next/image";
import { Code, CodeBlock, DownloadCard, H2, P, Steps, Video } from "@/components/blog/Prose";
import LeadForm from "@/components/blog/LeadForm";

// Borrador redactado por un agente de Antigravity a partir del PDF de reglas, editado a mano.

const BASE = "/blog/alight-motion-ia";

export const toc = [
  { id: "resultado", label: "El resultado" },
  { id: "por-que-xml", label: "Por qué XML + IA" },
  { id: "como-funciona", label: "Cómo funciona, paso a paso" },
  { id: "el-xml", label: "El XML que escribió el agente" },
  { id: "reglas-clave", label: "5 reglas clave" },
  { id: "errores", label: "Errores comunes" },
  { id: "faq", label: "Preguntas frecuentes" },
];

export const faq = [
  {
    q: "¿Qué agente de IA funciona mejor para generar proyectos XML de Alight Motion?",
    a: "Cualquier modelo con buena ventana de contexto y precisión con código estructurado, como Claude o Gemini. Lo importante no es tanto el modelo como darle el documento de reglas verificadas para que respete la sintaxis exacta de Alight Motion.",
  },
  {
    q: "¿En qué versión de Alight Motion están probadas estas reglas?",
    a: "En Alight Motion 5.0.273 para Android, comparando archivos generados con los que exporté después de corregirlos a mano, en proyectos a 60 fps en 9:16, 4:5 y 1:1.",
  },
  {
    q: "¿Puedo descargar los XML de ejemplo y el PDF de reglas?",
    a: "Sí. Los XML de «Muestrario Geist» e «Ikoodi · Los 300 ms de un clic» se descargan desde esta página, y el PDF completo de 13 páginas te llega gratis al correo.",
  },
  {
    q: "¿La IA reemplaza la edición manual en Alight Motion?",
    a: "No. Quita la parte repetitiva: estructura del proyecto, grupos por escena, posiciones y curvas base. Después importo el archivo en el celular para ajustar ritmo, tipografía y detalles finos.",
  },
];

const XML_EXCERPT = `<scene title="Ikoodi · Los 300 ms de un clic" width="1080" height="1920"
  bgcolor="#ff0a0a0a" totalTime="60000" fps="60" ...>
  <shape id="300000001" label="Fondo E0" startTime="0" endTime="7500"
    fillType="color" mediaFillMode="fill" s=".rect">
    <transform>
      <location value="540.000000,960.000000,0.000000" />
    </transform>
    <fillColor value="#ff0a0a0a" />
    <property name="size" type="vec2" value="540.000000,960.000000" />
  </shape>
  <nullobj id="300000002" label="Teléfono E0" startTime="469" endTime="7320"
    mediaFillMode="fill" type="perspective">
    <transform>
      <location>
        <kf t="0.000000" v="540.000000,1020.000000,0.000000" />
        <kf t="0.065684" v="540.000000,980.000000,0.000000" e="cubicBezier 0.65 0.0 0.35 1.0" />
        <kf t="0.547365" v="540.000000,980.000000,0.000000" />
        <kf t="0.613049" v="540.000000,1220.000000,0.000000" e="cubicBezier 0.65 0.0 0.35 1.0" />
      </location>
      <opacity>
        <kf t="0.000000" v="0.000000" />
        <kf t="0.058386" v="1.000000" e="cubicBezier 0.16 1.0 0.3 1.0" />
        <kf t="0.956503" v="0.620000" />
        <kf t="1.000000" v="0.000000" e="cubicBezier 0.7 0.0 0.84 0.0" />
      </opacity>
    </transform>
  </nullobj>
  <shape id="300000003" label="Teléfono cuerpo" startTime="469" endTime="7320"
    parent="300000002" s=".roundrect">
    <fillColor value="#ff1a1a1a" />
    <path-stroke direction="centered" end-size="1.000000">
      <color value="#ff2e2e2e" />
      <size value="2.000000" />
    </path-stroke>
    <property name="size" type="vec2" value="260.000000,500.000000" />
  </shape>
  ...
</scene>`;

const RULES = [
  {
    rule: "Colores en #AARRGGBB: el alfa va primero.",
    detail: "#80ffffff es blanco al 50 %. Si el color es blanco, la app lo omite al exportar; no es un error.",
  },
  {
    rule: "El tiempo t de un keyframe va de 0 a 1 y es relativo a su propia capa.",
    detail: "t = (tiempo_absoluto_ms − startTime) / (endTime − startTime). El easing (e) va en el keyframe de llegada.",
  },
  {
    rule: "En rectángulos, size es la mitad del ancho y del alto.",
    detail: "Una tarjeta de 900×640 se escribe 450,320. La forma se dibuja centrada en location.",
  },
  {
    rule: "La location de un texto es el centro de su caja.",
    detail: "En X, el centro de wrapWidth; en Y, el centro vertical de todo el bloque. wrapWidth nunca debe salirse del contenedor.",
  },
  {
    rule: "Cámara a escala 1 con FOV de 60°: z = −(alto/2) / tan(30°).",
    detail: "Para 1080×1920 la cámara va en (540, 960, −1662,77). z positivo = más lejos; z negativo = más cerca.",
  },
];

const PITFALLS = [
  "Escribir keyframes con t menor que 0, mayor que 1 o repetidos en la misma propiedad: generan saltos. Lo mismo pasa si recortas una capa en el XML sin recalcular sus t.",
  "Arreglar el aviso de «Fuentes faltantes» cambiando la fuente capa por capa en la app. Hay que corregir el atributo font en el XML (con &amp; en vez de &) y volver a importar.",
  "Inventar el id de un efecto que nunca apareció en un XML exportado, o dejar que un grupo padre termine antes que sus capas hijas: los hijos saltan de posición.",
  "Importar video vertical grabado con el celular sin rotarlo 90° a mano (se guarda acostado en 1920×1080), o activar el desenfoque de profundidad en proyectos grandes.",
];

export default function AlightMotionPost() {
  return (
    <>
      <P lead>
        Animar desde cero en el celular toma horas cuando toca ajustar keyframes, curvas y coordenadas capa por capa.
        Como desarrollador y creador de contenido, probé otro camino: que un agente de IA escriba el proyecto
        completo de Alight Motion en XML, listo para abrir en el teléfono.
      </P>
      <P>
        Para que la inteligencia artificial no inventara etiquetas ni rompiera los archivos, armé un documento de
        reglas comparando los XML que generaba el agente con los que exporté desde Alight Motion 5.0.273 después de
        corregirlos a mano. Con ese flujo salieron las dos piezas de abajo; sus XML se pueden descargar y las
        reglas completas te las envío por correo.
      </P>

      <H2 id="resultado">El resultado</H2>
      <P>
        Dos piezas generadas por el agente e importadas sin tocar la estructura: un muestrario tipográfico de Geist
        Pixel en formato cuadrado y un explicador vertical de 60 segundos sobre lo que pasa en los 300 ms de un clic.
      </P>
      <div className="grid gap-6 sm:grid-cols-[1.15fr_1fr] sm:items-start">
        <Video src={`${BASE}/muestrario-geist.mp4`} poster={`${BASE}/muestrario-poster.jpg`} caption="Muestrario Geist · 1:1 · 26 s" />
        <Video vertical src={`${BASE}/ikoodi-300ms.mp4`} poster={`${BASE}/ikoodi-300ms-poster.jpg`} caption="Ikoodi · Los 300 ms de un clic · 9:16 · 60 s" />
      </div>

      <H2 id="por-que-xml">Por qué XML + IA tiene sentido</H2>
      <P>
        Un proyecto de Alight Motion es un archivo XML de texto plano: un elemento raíz <Code>&lt;scene&gt;</Code> con
        las capas, tiempos en milisegundos, transformaciones y curvas <Code>cubicBezier</Code>. Tratar la animación
        como código tiene sentido porque un agente puede calcular posiciones exactas, jerarquías de grupos y decenas
        de keyframes normalizados en segundos, algo tedioso de hacer a mano en una pantalla táctil.
      </P>
      <P>
        Sin restricciones, cualquier modelo asume reglas de SVG o CSS que en Alight Motion fallan al importar o
        desarman el diseño. Con un contrato verificado con pruebas reales en el teléfono, el agente resuelve la parte
        mecánica y tú te concentras en el ritmo, la composición y el acabado.
      </P>
      <figure className="mt-8">
        <div className="relative aspect-[1.7] overflow-hidden rounded-lg border border-line">
          <Image src={`${BASE}/referencia.jpg`} alt="Hoja de referencia con fotogramas de un video de Geist Pixel usada para describir el estilo al agente" fill sizes="(min-width: 768px) 720px, 100vw" className="object-cover" />
        </div>
        <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-dim">
          Referencia visual que le pasé al agente para el Muestrario Geist
        </figcaption>
      </figure>

      <H2 id="como-funciona">Cómo funciona, paso a paso</H2>
      <Steps
        items={[
          {
            title: "Exportar un proyecto de referencia",
            text: "Armo una escena mínima en Alight Motion con las capas, fuentes o efectos que necesito comprobar y exporto el XML. Ese archivo es la verdad base para ver cómo escribe la app cada propiedad y en qué unidades.",
          },
          {
            title: "Darle las reglas al agente",
            text: "Antes de pedir cualquier animación, pego el documento de reglas en el contexto del agente como contrato obligatorio: coordenadas, colores con alfa primero, curvas de animación y estructura de grupos.",
          },
          {
            title: "Describir la pieza con referencias",
            text: "Defino lienzo, duración, zonas de diseño y una referencia visual. Para el muestrario pedí 1:1, 26 s, Geist Pixel con onda de carga; para Ikoodi, 60 s en 9:16 divididos por escenas.",
          },
          {
            title: "Generar el XML",
            text: "El agente escribe la escena completa, separa cada bloque narrativo en su propio grupo, asigna ids únicos y convierte cada tiempo absoluto al rango relativo 0–1 de su capa.",
          },
          {
            title: "Importar en Alight Motion",
            text: "Paso el archivo .xml al teléfono, lo abro con Alight Motion y reviso la vista previa de principio a fin: fuentes, márgenes y transiciones entre escenas.",
          },
          {
            title: "Revisar y actualizar las reglas",
            text: "Si algo se descuadra, lo corrijo en la app, vuelvo a exportar y comparo ambos XML línea por línea. Cuando una prueba contradice una regla, la corrijo primero en el documento y luego en el prompt.",
          },
        ]}
      />

      <H2 id="el-xml">El XML que escribió el agente</H2>
      <P>
        Este es el inicio real del proyecto de Ikoodi: un fondo, un objeto nulo con perspectiva que mueve el
        teléfono (fíjate en los <Code>t</Code> entre 0 y 1 y en el easing en el keyframe de llegada) y el cuerpo del
        teléfono como rectángulo redondeado hijo de ese nulo.
      </P>
      <CodeBlock title="Ikoodi_300ms.xml · extracto" code={XML_EXCERPT} />
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <DownloadCard href={`${BASE}/muestrario-geist.xml`} name="Muestrario_Geist.xml" meta="1:1 · 26 s · 1,3 MB" />
        <DownloadCard href={`${BASE}/ikoodi-300ms.xml`} name="Ikoodi_300ms.xml" meta="9:16 · 60 s · 2,6 MB" />
      </div>

      <LeadForm />

      <H2 id="reglas-clave">5 reglas clave (del documento completo)</H2>
      <ul className="mt-6 flex flex-col divide-y divide-line border-y border-line">
        {RULES.map((r, i) => (
          <li key={r.rule} className="grid gap-2 py-5 sm:grid-cols-[2.5rem_1fr]">
            <span className="font-mono text-xs text-blue-bright">0{i + 1}</span>
            <div>
              <p className="font-medium text-white">{r.rule}</p>
              <p className="mt-1 text-[15px] text-muted">{r.detail}</p>
            </div>
          </li>
        ))}
      </ul>

      <H2 id="errores">Errores comunes</H2>
      <ul className="mt-6 flex flex-col gap-4">
        {PITFALLS.map((t) => (
          <li key={t} className="flex gap-3 text-[16px] leading-[1.6] text-white/75">
            <span className="mt-[9px] h-[6px] w-[6px] shrink-0 bg-red-400" aria-hidden />
            {t}
          </li>
        ))}
      </ul>

      <H2 id="cierre">Para cerrar</H2>
      <P>
        Descarga los XML, ábrelos en Alight Motion y revisa cada grupo para ver cómo están armados por dentro. Si
        quieres aplicar este flujo con tu propio agente sin empezar a ciegas, pídeme el PDF: trae todas las reglas
        confirmadas, tablas de medidas, curvas y la lista de verificación antes de entregar.
      </P>

      <H2 id="faq">Preguntas frecuentes</H2>
      <div className="mt-6 flex flex-col divide-y divide-line border-y border-line">
        {faq.map((f) => (
          <details key={f.q} className="group py-5">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-medium text-white">
              {f.q}
              <span className="mt-1 font-mono text-blue-bright transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-[15px] leading-[1.6] text-muted">{f.a}</p>
          </details>
        ))}
      </div>
    </>
  );
}
