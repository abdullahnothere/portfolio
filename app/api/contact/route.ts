import { NextResponse } from "next/server";

/**
 * Minimal, deliberately boring. Swap the TODO for Resend, Postmark, or a
 * Formspree endpoint — the client contract does not change either way.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Expected a JSON body." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? body.from ?? "").trim();
  const message = String(body.message ?? body.about ?? "").trim();

  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
  }
  if (message.length < 2 || message.length > 5000) {
    return NextResponse.json({ error: "Message must be between 2 and 5000 characters." }, { status: 400 });
  }

  // TODO: send. e.g. await resend.emails.send({ ... })
  console.info("contact.received", { name, email, length: message.length });

  return NextResponse.json({ ok: true });
}
