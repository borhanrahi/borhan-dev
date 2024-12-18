import { NextResponse } from "next/server";
import { Resend } from "resend";
import type { CreateEmailResponse } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface ApiResponse {
  message: string;
  success: boolean;
  data?: CreateEmailResponse;
}

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY || !process.env.EMAIL_USER) {
    return NextResponse.json(
      {
        message: "Email service not configured",
        success: false,
      },
      { status: 500 }
    );
  }

  try {
    const { name, email, message }: ContactFormData = await request.json();

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        {
          message: "Missing required fields",
          success: false,
        },
        { status: 400 }
      );
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return NextResponse.json(
        {
          message: "Invalid email format",
          success: false,
        },
        { status: 400 }
      );
    }

    const data = await resend.emails.send({
      from: "contact@borhandev.site",
      to: process.env.EMAIL_USER,
      subject: "New Contact Form Submission",
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json(
      {
        message: "Email sent successfully",
        success: true,
        data: data,
      } satisfies ApiResponse,
      { status: 200 }
    );
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      {
        message: "Failed to send email",
        success: false,
      },
      { status: 500 }
    );
  }
}
