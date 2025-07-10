import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import PDFDocument from "pdfkit";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") return res.status(405).end();

  const { order, toEmail } = req.body;

  if (!order || !toEmail)
    return res.status(400).json({ error: "Missing order or recipient email" });

  // TODO: Replace with your SMTP credentials
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // use TLS
    auth: {
      user: "rares.chivu@gmail.com",
      pass: "stqw aakh vfdf hqpm", // your App Password
    },
    tls: {
      rejectUnauthorized: false, // <--- add this line
    },
  });

  // Generate PDF from order JSON
  const doc = new PDFDocument();
  let pdfBuffer: Buffer | null = null;
  const chunks: Buffer[] = [];
  doc.on("data", (chunk) => chunks.push(chunk));
  doc.on("end", () => {
    pdfBuffer = Buffer.concat(chunks);
  });

  doc.fontSize(18).text("Car Order Details", { align: "center" });
  doc.moveDown();
  Object.entries(order).forEach(([key, value]) => {
    doc
      .fontSize(12)
      .text(
        `${key}: ${typeof value === "object" ? JSON.stringify(value) : value}`,
      );
  });
  doc.end();

  // Wait for PDF to finish
  await new Promise((resolve) => doc.on("end", resolve));

  try {
    await transporter.sendMail({
      from: "Car Handover <rares.chivu@gmail.com>",
      to: toEmail,
      subject: "New Car Order Assignment",
      text: "You have a new car order assignment. See the attached PDF for details.",
      attachments: [
        {
          filename: "order.pdf",
          content: pdfBuffer ?? Buffer.alloc(0),
        },
      ],
    });
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Failed to send email:", err);
    res.status(500).json({ error: "Failed to send email", details: err });
  }
}
