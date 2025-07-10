import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

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
  });

  const orderJson = JSON.stringify(order, null, 2);

  try {
    await transporter.sendMail({
      from: "Car Handover <rares.chivu@gmail.com>",
      to: toEmail,
      subject: "New Car Order Assignment",
      text: "You have a new car order assignment. See the attached document for details.",
      attachments: [
        {
          filename: "order.json",
          content: orderJson,
        },
      ],
    });
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Failed to send email:", err);
    res.status(500).json({ error: "Failed to send email", details: err });
  }
}
