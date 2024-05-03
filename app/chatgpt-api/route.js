import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const modifiedText = `${body.text} ${body.extraInformation}`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // Adjust model as needed
        messages: [{ role: "user", content: modifiedText }],
      }),
    });

    const result = await response.json();
    return new NextResponse(JSON.stringify({ data: result }), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
