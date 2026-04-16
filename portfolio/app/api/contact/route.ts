import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email, message, color } = await req.json();

    if (!email || !message) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    const data = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>", // change later
      to: ["your@email.com"], // 👉 YOUR email here
      subject: "New Contact Form Message 🚀",
      html: `
        <div style="font-family: sans-serif;">
          <h2>New Message</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong> ${message}</p>
          <p><strong>Color:</strong> ${color}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Email failed" },
      { status: 500 }
    );
  }
}