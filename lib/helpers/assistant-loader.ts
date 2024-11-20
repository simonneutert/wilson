import OpenAI from "openai";
import { WilsonAssistant, WilsonData } from "../assistant.ts";
import { AssistantWriter } from "./assistant-writer.ts";

export class AssistantLoader {
  client: OpenAI;
  assistant: WilsonAssistant;
  constructor(client: OpenAI, assistant: WilsonAssistant) {
    this.client = client;
    this.assistant = assistant;
  }

  /** Get or create an OpenAI Assistant. */
  async getOrCreateOpenAiAssistant(props: WilsonData) {
    if (!this.assistant?.id || this.assistant.id === "") {
      const assistant = await this.createOpenAiAssistant();
      this.assistant.id = assistant.id;
      const writer = new AssistantWriter();
      await writer.persistAiAssistant(assistant, props);
      return assistant;
    } else {
      return this.assistant;
    }
  }

  /** Create a new OpenAI Assistant. */
  async createOpenAiAssistant(): Promise<OpenAI.Beta.Assistants.Assistant> {
    return await this.client.beta.assistants.create({
      model: "gpt-4o-mini",
      name: this.assistant.name,
      instructions: this.assistant.instruction,
      // tools = [],
    });
  }
}
