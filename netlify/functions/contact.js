// app/api/contact/route.js
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body || {};

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        {
          status: "error",
          message:
            "Missing required fields: Name, Email, Subject and Message are required.",
        },
        { status: 400 }
      );
    }

    // Check required env vars for sending email
    const GMAIL_USER = process.env.GMAIL_USER;
    const GMAIL_PASS = process.env.GMAIL_PASS;
    const RECEIVING_EMAIL = process.env.RECEIVING_EMAIL;
    const MAILER_DISABLED = String(process.env.MAILER_DISABLED || "").toLowerCase();

    if (!MAILER_DISABLED || MAILER_DISABLED === "false") {
      if (!GMAIL_USER || !GMAIL_PASS || !RECEIVING_EMAIL) {
        console.error("Missing email environment variables (GMAIL_USER, GMAIL_PASS, RECEIVING_EMAIL)");
        return NextResponse.json(
          {
            status: "error",
            message:
              "Email service not configured. Missing server environment variables.",
          },
          { status: 500 }
        );
      }
    }

    // Allow a disabled/mocked-mailer mode for local testing (set MAILER_DISABLED=1)
    const mockMailer = MAILER_DISABLED === "1" || MAILER_DISABLED === "true";

    // Create transporter using SMTP config (more explicit than `service: 'gmail'`)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 465,
      secure: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) === 465 : true,
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASS,
      },
      // TLS option can be adjusted for strictness in production
      tls: { rejectUnauthorized: process.env.NODE_ENV === "production" },
    });

    const logoUrl = process.env.SITE_URL
      ? `${process.env.SITE_URL.replace(/\/$/, "")}/assets/logo.png`
      : "https://raw.githubusercontent.com/montuyadav18/QR_Code_Genrator/refs/heads/main/SM-logo-white.png";

    // ---------- ADMIN EMAIL ----------
    const adminHtml = `
  <!doctype html>
  <html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>New Contact</title>
    <style>
      :root { --page-bg: #ffffff; --card-bg: #000000; --accent: #fbbb51; --muted: #9ca3af; --card-radius:16px; }

      html,body{
        height:100%;
        margin:0;
        padding:0;
        background:var(--page-bg);
        font-family:'Syne',sans-serif;
        -webkit-text-size-adjust:none;
        -ms-text-size-adjust:none;
        max-width:800px;
        margin:0 auto;
      }
      table{border-collapse:collapse}
      a{color:inherit}

      .wrap{width:100%;padding:36px 12px;box-sizing:border-box;background:#000; max-width:750px;  margin:0 auto; border-radius: 10px}
      .container{max-width:760px;margin:0 auto}
      .card{background:var(--card-bg);color:#ffffff;border-radius:var(--card-radius);overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,0.35)}
      .logo-area{padding:28px 24px 6px 24px;text-align:center;background:transparent}
      .logo{display:inline-block;height:68px;width:auto}
      .header{padding:12px 24px 20px 24px;text-align:center}
      .title{display:inline-flex;align-items:center;gap:10px;font-size:20px;font-weight:700;color:#ffffff}
      .title .icon{font-size:20px}
      .sub{margin-top:8px;color:rgba(255,255,255,0.85);font-size:13px}
      .divider{border-top:3px dotted rgba(255,255,255,0.12);margin:18px 24px}
      .content{padding:6px 24px 6px 24px}
      .meta-table{width:100%;margin-bottom:18px}
      .meta-table td{padding:10px 6px;vertical-align:top}
      .label{width:120px;font-weight:700;color:#ffffff;font-size:14px}
      .value{color:rgba(255,255,255,0.95);font-size:14px}
      .value a{background:rgba(255,255,255,0.18);padding:6px 8px;border-radius:4px;color:#fff;text-decoration:none}
      .message-box{background:#fff;border-radius:10px;padding:18px;color:#0f172a;margin-top:14px;font-size:14px;line-height:1.6}
      .message-title{font-weight:700;margin-bottom:8px;color:#0f172a}
      .actions{margin-top:20px;text-align:center}
      .reply-btn{display:inline-block;background:rgba(255,255,255,0.18);color:#ffffff!important;padding:12px 22px;border-radius:999px;font-weight:700;text-decoration:none;box-shadow:inset 0 -4px 0 rgba(0,0,0,0.25)}
      .footer{padding:0px;text-align:center;color:var(--muted);font-size:13px}
      .outer-pad{padding:8px;border-radius:calc(var(--card-radius) + 6px);} 
      @media only screen and (max-width:520px){
        .logo{height:56px}
        .label{display:block;width:100%;margin-bottom:6px}
        .meta-table td{display:block;padding:8px 0}
      }
    </style>
  </head>
  <body>
    <div class="wrap">
      <div class="container">
        <div class="outer-pad">
          <div class="card" role="article" aria-label="New contact notification">
            <div class="logo-area">
              <img src="${logoUrl}" alt="Logo" class="logo" />
            </div>
            <div class="header">
              <div class="title"><span class="icon">📬</span>New Contact Submission</div>
              <div class="sub">You received a message from your portfolio contact form — quick summary below.</div>
            </div>
            <div class="divider"></div>
            <div class="content">
              <table class="meta-table" role="presentation">
                <tr><td class="label">Name</td><td class="value">${escapeHtml(name)}</td></tr>
                <tr><td class="label">Email</td><td class="value"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
                <tr><td class="label">Phone</td><td class="value">${escapeHtml(phone || 'N/A')}</td></tr>
                <tr><td class="label">Subject</td><td class="value">${escapeHtml(subject)}</td></tr>
              </table>
              <div class="message-box" role="region" aria-label="Message">
                <div class="message-title">Message</div>
                <div>${nl2br(escapeHtml(message))}</div>
              </div>
              <div class="actions">
                <a class="reply-btn" href="mailto:${escapeHtml(email)}">Reply to ${escapeHtml(name)}</a>
              </div>
              <p style="margin-top:20px;color:var(--muted);text-align:center;font-size:13px">
                This notification was generated automatically from your portfolio contact form. 
              </p>
            </div>
            <div class="footer">© ${new Date().getFullYear()} Sajjat Mujawar Portfolio — Built with care</div>
          </div>
        </div>
      </div>
    </div>
  </body>
  </html>
`;


    // ---------- AUTO-REPLY EMAIL ----------
    const userHtml = `
  <!doctype html>
  <html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Thank You — Sajjat Mujawar | Senior Creative Designer</title>
    <meta name="description" content="Portfolio of Sajjat Mujawar, showcasing UI/UX, branding, and creative projects." />
    <meta name="keywords" content="Sajjat Mujawar, Creative Designer, Portfolio, UI UX, Branding, Web Design, Graphic Design" />
    <style>
      :root { --page-bg:#f9fafb;--card-bg:#000;--accent:#fbbb51;--muted:#9ca3af;--card-radius:16px; }
      html,body{margin:0;padding:0;background:var(--page-bg);font-family:'Syne',sans-serif;max-width:800px;margin:0 auto;}
      .wrap{width:100%;padding:36px 12px;background:#000;max-width:750px;  margin:0 auto;border-radius:10px}
      .card{background:var(--card-bg);color:#fff;border-radius:var(--card-radius);box-shadow:0 8px 30px rgba(0,0,0,0.35)}
      .logo-area{text-align:center;padding:28px 24px 6px 24px}
      .logo{height:68px}
      .header{text-align:center;padding:12px 24px 20px 24px}
      .title{font-size:20px;font-weight:700;color:var(--accent);}
      .divider{border-top:3px dotted rgba(255,255,255,0.12);margin:18px 24px}
      .content{padding:6px 24px 6px 24px}
      .message-box{background:#fff;border-radius:10px;padding:18px;color:#000;margin-top:14px;font-size:14px;line-height:1.6}
      .footer{text-align:center;color:var(--muted);font-size:13px;padding:20px}
    </style>
  </head>
  <body>
    <div class="wrap">
      <div class="card">
        <div class="logo-area">
          <img src="${logoUrl}" alt="Logo" class="logo" />
        </div>
        <div class="header">
          <div class="title">Thank you, ${escapeHtml(name)}.</div>
          <div>Your message has been received by <strong>Sajjat Mujawar</strong>.</div>
        </div>
        <div class="divider"></div>
        <div class="content">
          <div class="message-box">
            <p>Hi ${escapeHtml(name)},</p>

            <p>I truly appreciate you taking the time to reach out about <strong>${escapeHtml(subject)}</strong>. Your message has been received through my portfolio website, and I’ll be reviewing it shortly.</p>

            <p>As a bit of background — I’m <strong>Sajjat Mujawar</strong>, a <strong>Senior Creative Designer</strong> focused on UI/UX, branding, and creative storytelling through design. My portfolio highlights projects that combine functionality with visual identity to create memorable digital experiences.</p>

            <p>I’ll personally get back to you as soon as possible with the next steps or answers to your query.</p>

            <p><strong>Your message:</strong></p>
            <blockquote style="border-left:4px solid var(--accent);margin:12px 0;padding-left:12px;color:#111;">${nl2br(escapeHtml(message))}</blockquote>

            <p>If you’d like to share more details about your project or attach any references, feel free to reply directly to this email.</p>

            <p>Warm regards,<br/>
            <strong>Sajjat Mujawar</strong><br/>
            Senior Creative Designer — UI/UX & Branding<br/>

          </div>
        </div>
        <div class="footer">© ${new Date().getFullYear()} Sajjat Mujawar Portfolio — Built with care</div>
      </div>
    </div>
  </body>
  </html>
`;


    // ---------- SEND EMAILS (or mock) ----------
    if (mockMailer) {
      // In mock mode we don't send emails — just log payload and return success.
      console.log("[MAILER MOCK] Admin email would be sent to:", RECEIVING_EMAIL);
      console.log("[MAILER MOCK] User reply would be sent to:", email);
      return NextResponse.json(
        { status: "success", message: "(Mock) Email would be sent (MAILER_DISABLED)." },
        { status: 200 }
      );
    }

    // Send admin notification
    await transporter.sendMail({
      from: `Portfolio Contact Form <${GMAIL_USER}>`,
      to: RECEIVING_EMAIL,
      replyTo: email,
      subject: `✨ Sajjat Mujawar Portfolio Website - ${subject}`,
      html: adminHtml,
    });

    // Send auto-reply to user
    await transporter.sendMail({
      from: `Sajjat Mujawar Portfolio <${GMAIL_USER}>`,
      to: email,
      subject: `✅ Message received successfully, ${name}!`,
      html: userHtml,
    });

    return NextResponse.json(
      { status: "success", message: "Email sent successfully! 🎉" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Nodemailer error:", err);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to send email. Check server logs.",
        error: err?.message ?? String(err),
      },
      { status: 500 }
    );
  }
}

function escapeHtml(str = "") {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function nl2br(str = "") {
  return str.replaceAll(/\r?\n/g, "<br/>");
}
