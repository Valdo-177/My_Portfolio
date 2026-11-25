// Genera las imágenes de previsualización (Open Graph, 1200x630) para proyectos y blog.
// Uso: npm run og   → escribe PNGs en public/og/
//
// Se generan aparte (y no con next/og) porque next/og falla al prerenderizar en Windows con Next 14.
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, extname } from "node:path";
import { projects } from "../../src/data/projects.ts";
import { posts } from "../../src/data/posts.ts";
import { gallery } from "../../src/data/gallery.ts";

const ROOT = process.cwd();
const OUT = join(ROOT, "public", "og");
mkdirSync(OUT, { recursive: true });

const fonts = [
  { name: "Geist", data: readFileSync(join(ROOT, "scripts/og/_og/Geist-Medium.ttf")), weight: 500, style: "normal" },
  { name: "GeistMono", data: readFileSync(join(ROOT, "scripts/og/_og/GeistMono-Regular.ttf")), weight: 400, style: "normal" },
];

const W = 1200;
const H = 630;
const BLUE = "#52a8ff";

// Mini "JSX": h(tipo, estilos, ...hijos)
const h = (type, style = {}, ...children) => ({
  type,
  props: { style: { display: "flex", ...style }, children: children.flat().filter((c) => c !== null && c !== false) },
});
const img = (src, style) => ({ type: "img", props: { src, style } });

const dataUri = (publicPath) => {
  const file = join(ROOT, "public", publicPath);
  if (!existsSync(file)) return null;
  const mime = extname(file) === ".png" ? "image/png" : "image/jpeg";
  return `data:${mime};base64,${readFileSync(file).toString("base64")}`;
};

const LOGO = [1, 1, 0, 1, 0, 1, 1, 1, 0];
const logo = () =>
  h(
    "div",
    { flexWrap: "wrap", width: 30, gap: 3 },
    LOGO.map((on, i) => h("div", { width: 8, height: 8, background: on ? (i === 0 ? BLUE : "#ededed") : "#262626" }))
  );

function frame({ eyebrow, title, subtitle, visual }) {
  return h(
    "div",
    {
      width: W,
      height: H,
      background: "#000",
      color: "#fff",
      fontFamily: "Geist",
      padding: 64,
      gap: 48,
      backgroundImage: "radial-gradient(rgba(255,255,255,0.09) 1.5px, transparent 1.5px)",
      backgroundSize: "24px 24px",
    },
    h(
      "div",
      { flexDirection: "column", justifyContent: "space-between", flex: 1 },
      h(
        "div",
        { alignItems: "center", fontFamily: "GeistMono", fontSize: 18, letterSpacing: 2.5, color: "#8f8f8f" },
        h("div", { width: 12, height: 12, background: BLUE, marginRight: 16 }),
        eyebrow.toUpperCase()
      ),
      h(
        "div",
        { flexDirection: "column" },
        h("div", { fontSize: title.length > 34 ? 54 : 66, lineHeight: 1.02, letterSpacing: -2.5 }, title),
        subtitle ? h("div", { marginTop: 22, fontSize: 26, lineHeight: 1.3, color: "#a1a1a1" }, subtitle) : null
      ),
      h(
        "div",
        { alignItems: "center", gap: 16, fontFamily: "GeistMono", fontSize: 20, color: "#ededed" },
        logo(),
        "Keyner De la Hoz",
        h("span", { color: "#575757" }, "· Developer & Filmmaker")
      )
    ),
    visual
  );
}

const panel = (child) =>
  h(
    "div",
    {
      width: 440,
      height: H - 128,
      borderRadius: 16,
      border: "1px solid #262626",
      background: "#0a0a0a",
      overflow: "hidden",
      alignItems: "center",
      justifyContent: "center",
    },
    child
  );

function projectVisual(p) {
  const shots = gallery[p.slug] ?? [];
  const desktop = shots.find((s) => s.kind === "desktop");
  const mobile = shots.find((s) => s.kind === "mobile");
  if (mobile) {
    const uri = dataUri(mobile.src);
    if (uri)
      return panel(
        h(
          "div",
          { width: 230, height: 470, borderRadius: 30, border: "6px solid #262626", overflow: "hidden", boxShadow: "0 0 60px rgba(0,112,243,0.45)" },
          img(uri, { width: 218, height: 458, objectFit: "cover", objectPosition: "top" })
        )
      );
  }
  if (desktop) {
    const uri = dataUri(desktop.src);
    if (uri) return panel(img(uri, { width: 440, height: H - 128, objectFit: "cover", objectPosition: "left top" }));
  }
  const initials = p.title.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  return panel(h("div", { fontSize: 180, color: BLUE, letterSpacing: -6 }, initials));
}

function render(tree, name) {
  return satori(tree, { width: W, height: H, fonts }).then((svg) => {
    writeFileSync(join(OUT, name), new Resvg(svg).render().asPng());
    console.log("✓ og/" + name);
  });
}

// Proyectos
for (const p of projects) {
  await render(
    frame({ eyebrow: `Proyecto · ${p.type} · ${p.year}`, title: p.title, subtitle: p.tagline, visual: projectVisual(p) }),
    `proyecto-${p.slug}.png`
  );
}

// Artículos
for (const post of posts) {
  const uri = dataUri(post.cover);
  await render(
    frame({
      eyebrow: `Blog · ${post.tags[0]} · ${post.readingMinutes} min`,
      title: post.title,
      subtitle: null,
      visual: panel(uri ? img(uri, { width: 440, height: H - 128, objectFit: "cover" }) : h("div", {}, "")),
    }),
    `blog-${post.slug}.png`
  );
}

// Índice del blog
const K = ["10001", "10010", "11100", "10010", "10001"].join("");
await render(
  frame({
    eyebrow: "Blog · Notas y procesos",
    title: "Desarrollo, IA y creación de contenido",
    subtitle: "Lo que aprendo construyendo productos y haciendo video.",
    visual: panel(
      h(
        "div",
        { flexWrap: "wrap", width: 290, gap: 10 },
        K.split("").map((on, i) =>
          h("div", {
            width: 50,
            height: 50,
            borderRadius: on === "1" ? 9 : 25,
            background: on === "1" ? (i === 12 ? BLUE : "#ededed") : "#1a1a1a",
          })
        )
      )
    ),
  }),
  "blog.png"
);
