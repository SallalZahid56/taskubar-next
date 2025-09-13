// src/app/api/requests/create/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Parse FormData
    const formData = await req.formData();
    const task = formData.get("task");
    const service = formData.get("service");
    const topic = formData.get("topic");
    const description = formData.get("description");
    const timeline = formData.get("timeline");
    const file = formData.get("file");

    let filePath = null;

    if (file && file.name) {
      // Save file to /public/uploads/
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadDir = path.join(process.cwd(), "public", "uploads");
      const fileName = `${Date.now()}-${file.name}`;
      filePath = `/uploads/${fileName}`;

      await writeFile(path.join(uploadDir, fileName), buffer);
    }

    // ✅ Save request in DB
    const request = await prisma.serviceRequest.create({
      data: {
        task,
        service,
        topic,
        description,
        timeline,
        fileUrl: filePath,
        userId: decoded.id,
      },
    });

    // ✅ Fetch user name
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    // ✅ Save notification in DB with clear name
    await prisma.notification.create({
      data: {
        message: `📩 New request submitted by ${user.name}`,
        userId: decoded.id,
      },
    });

    return NextResponse.json(
      { message: "Request submitted successfully", request },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error creating request:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}