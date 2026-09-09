import { z } from "zod";
import superjson from "superjson";

export const schema = z.object({
  task: z.enum(["resume", "email", "research", "chat"]),
  candidateName: z.string().max(120).default(""),
  targetRole: z.string().max(160).default(""),
  careerInfo: z.string().max(12000).default(""),
  jobDescription: z.string().max(18000).default(""),
  emailContext: z.string().max(12000).default(""),
  researchText: z.string().max(24000).default(""),
  researchQuestion: z.string().max(2000).default(""),
});

export type InputType = z.infer<typeof schema>;
export type OutputType = { output: string; score: number | null };

export const postAiGenerate = async (body: InputType, init?: RequestInit): Promise<OutputType> => {
  const validatedInput = schema.parse(body);
  const result = await fetch("/_api/ai/generate", {
    method: "POST",
    body: superjson.stringify(validatedInput),
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
  });
  if (!result.ok) {
    const errorObject = superjson.parse<{ error: string }>(await result.text());
    throw new Error(errorObject.error);
  }
  return superjson.parse<OutputType>(await result.text());
};
