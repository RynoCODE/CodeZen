import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prismaClient = new PrismaClient();

var questionId = 1;

const question = prismaClient.questions.findMany({
  where: { question_id: parseInt(questionId, 10) },
  include: {
    question_template: {
      include: {
        testcases: true,
      },
    },
  },
});
console.log(question);
