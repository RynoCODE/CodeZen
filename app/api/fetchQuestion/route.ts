// app/api/fetchQuestion/route.ts

import { prismaClient } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const questionId = searchParams.get("question_id");

  if (!questionId) {
    console.error("Question ID is required");
    return NextResponse.json(
      { error: "Question ID is required" },
      { status: 400 }
    );
  }

  try {
    const question = await prismaClient.questions.findUnique({
      where: { question_id: parseInt(questionId, 10) },
      include: {
        question_template: {
          include: {
            testcases: true,
          },
        },
      },
    });

    return NextResponse.json(question);
  } catch (error) {
    console.error("Error fetching question:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
