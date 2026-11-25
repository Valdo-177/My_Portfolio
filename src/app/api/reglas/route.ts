import { readFile } from "node:fs/promises";
import { join } from "node:path";
import nodemailer from "nodemailer";
import { site } from "@/data/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Envía el PDF "Reglas XML para Alight Motion" al correo que deja el visitante.
 *
 * Variables de entorno (Vercel → Settings → Environment Variables):
 *   SMTP_USER   cuenta que envía (ej. tu Gmail)
 *   SMTP_PASS   contraseña de aplicación de Google (no tu contraseña normal)
 *   SMTP_HOST   opcional, por defecto smtp.gmail.com
 *   SMTP_PORT   opcional, por defecto 465
 *   LEADS_NOTIFY opcional, correo que recibe aviso de cada descarga (por defecto site.email)
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const hits = new Map<string, number[]>();
const LIMIT = 5; // envíos por IP
const WINDOW = 60 * 60 * 1000; // por hora

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > LIMIT;
}

export async function POST(req: Request) {
  let body: { email?: string; website?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Solicitud inválida." }, { status: 400 });
  }

  // Honeypot: los bots llenan este campo oculto
  if (body.website) return Response.json({ ok: true });

  const email = String(body.email ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(email) || email.length > 200) {
    return Response.json({ ok: false, error: "Escribe un correo válido." }, { status: 400 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (rateLimited(ip)) {
    return Response.json({ ok: false, error: "Demasiados intentos. Prueba en un rato." }, { status: 429 });
  }

  const { SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_USER || !SMTP_PASS) {
    console.error("[reglas] Falta configurar SMTP_USER / SMTP_PASS");
    return Response.json(
      { ok: false, error: "El envío no está disponible ahora mismo. Escríbeme y te lo mando." },
      { status: 503 }
    );
  }

  try {
    const pdf = await readFile(join(process.cwd(), "private", "reglas-xml-alight-motion.pdf"));
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT || 465),
      secure: Number(process.env.SMTP_PORT || 465) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const postUrl = `${site.url}/blog/alight-motion-inteligencia-artificial-xml`;

    await transporter.sendMail({
      from: `"${site.name}" <${SMTP_USER}>`,
      to: email,
      replyTo: site.email,
      subject: "Tus reglas XML para Alight Motion (PDF)",
      text: `¡Hola!\n\nAquí tienes el PDF con las reglas que uso para que un agente de IA escriba proyectos de Alight Motion en XML.\n\nÚsalo como contrato: pégalo en el contexto de tu agente antes de pedirle una animación.\n\nArtículo: ${postUrl}\n\nSi lo pruebas, me encantaría ver el resultado. Responde a este correo.\n\n— ${site.name}`,
      html: `<div style="font-family:Arial,Helvetica,sans-serif;background:#000;color:#ededed;padding:32px">
  <div style="max-width:520px;margin:0 auto">
    <div style="width:12px;height:12px;background:#52a8ff;margin-bottom:24px"></div>
    <h1 style="font-size:22px;margin:0 0 16px;color:#fff">Tus reglas XML para Alight Motion</h1>
    <p style="line-height:1.5;color:#bdbdbd">Adjunto va el PDF con las reglas que uso para que un agente de IA escriba proyectos de Alight Motion en XML.</p>
    <p style="line-height:1.5;color:#bdbdbd">Úsalo como contrato: pégalo en el contexto de tu agente antes de pedirle una animación, y actualízalo cuando una prueba lo contradiga.</p>
    <p style="margin:28px 0"><a href="${postUrl}" style="background:#0070f3;color:#fff;padding:12px 18px;border-radius:6px;text-decoration:none">Volver al artículo</a></p>
    <p style="line-height:1.5;color:#8f8f8f;font-size:13px">Si lo pruebas, responde a este correo: me encantaría ver lo que haces.<br/>— ${site.name}</p>
  </div>
</div>`,
      attachments: [{ filename: "Reglas XML para Alight Motion.pdf", content: pdf, contentType: "application/pdf" }],
    });

    // Aviso para Keyner (no bloquea la respuesta si falla)
    transporter
      .sendMail({
        from: `"Portafolio" <${SMTP_USER}>`,
        to: process.env.LEADS_NOTIFY || site.email,
        subject: `Nueva descarga de reglas: ${email}`,
        text: `${email} pidió el PDF de reglas de Alight Motion.`,
      })
      .catch((e) => console.error("[reglas] aviso falló", e));

    return Response.json({ ok: true });
  } catch (e) {
    console.error("[reglas] error enviando", e);
    return Response.json({ ok: false, error: "No pude enviar el correo. Inténtalo de nuevo." }, { status: 500 });
  }
}
