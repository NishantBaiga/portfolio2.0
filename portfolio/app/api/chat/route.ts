import { NextRequest, NextResponse } from "next/server";
import { getChatResponse } from "@/services/geminiServices";
import clientPromise from "@/lib/mongoDb";

export async function POST(req: NextRequest) {
  try {
    const { message, sessionId } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("brickbot");

    // ✅ Use string sessionId directly
    const sessionKey = sessionId || crypto.randomUUID();

    // ✅ Save user message
    await db.collection("messages").insertOne({
      sessionId: sessionKey,
      role: "user",
      text: message,
      createdAt: new Date(),
    });

    // ✅ Get history
    const history = await db
      .collection("messages")
      .find({ sessionId: sessionKey })
      .sort({ createdAt: 1 })
      .limit(20)
      .toArray();

    const formattedHistory = history.map((m) => ({
      role: m.role,
      parts: [{ text: m.text }],
    }));

    // ✅ AI response
    const aiResponse = await getChatResponse(message, formattedHistory);

    // ✅ Save AI response
    await db.collection("messages").insertOne({
      sessionId: sessionKey,
      role: "model",
      text: aiResponse,
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      message: aiResponse,
      sessionId: sessionKey,
    });
  } catch (error) {
    console.error("Chat API Error:", error);

    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}