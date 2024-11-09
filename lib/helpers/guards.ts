import { OpenAI } from "openai";
/** Type guard to check if content is of type that has text property */
export function isTextContentBlock(
  content: OpenAI.Beta.Threads.MessageContent,
): content is OpenAI.Beta.Threads.TextContentBlock {
  return (content as OpenAI.Beta.Threads.TextContentBlock).text !== undefined;
}
