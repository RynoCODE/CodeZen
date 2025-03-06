import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

interface SubmitCodeRequest {
  question_id: number;
  user_id: number;
  code: string;
  output: string;
  language: "python" | "c" | "cpp";
}

export async function POST(request: Request) {
  const body: SubmitCodeRequest = await request.json();

  try {
    const submission = await prisma.code_submit.create({
      data: {
        question_id: body.question_id,
        user_id: body.user_id,
        code: body.code,
        output: body.output,
        language: body.language,
      },
    });

    return NextResponse.json(submission, { status: 201 });
  } catch (error) {
    console.error(error);
      return NextResponse.json(
        { error: "Error submitting code" },
        { status: 500 }
      );
  }
}
