import OpenAI from "openai";
import { sanitizeString } from "./sanitize-string.ts";
import writeJsonFile from "./write-json-file-formatted.ts";
import { WilsonAssistant, WilsonTemplate } from "../assistant.ts";

export class AssistantLoader {
  client: OpenAI;
  assistant: WilsonAssistant;
  constructor(client: OpenAI, assistant: WilsonAssistant) {
    this.client = client;
    this.assistant = assistant;
  }

  /** Get or create an OpenAI Assistant. */
  async getOrCreateOpenAiAssistant(props: WilsonTemplate) {
    if (!this.assistant?.id || this.assistant.id === "") {
      const assistant = await this
        .createOpenAiAssistant();
      this.assistant.id = assistant.id;
      await this.persistAiAssistant(assistant, props);
      return assistant;
    } else {
      return this.assistant;
    }
  }

  /** Persist the WilsonTemplate to a file. */
  async persistAiAssistant(
    assistant: OpenAI.Beta.Assistants.Assistant | WilsonAssistant,
    props: WilsonTemplate,
  ): Promise<WilsonTemplate> {
    const newRecipeFilename = `assistants/assistant_${
      this.sanitizeString(assistant.name)
    }_${new Date().getTime()}.json`;

    this.debugHintNewAssistant(assistant.id, newRecipeFilename);
    const clonedProps = { ...props } as WilsonTemplate;
    clonedProps.assistant.id = assistant.id;
    await writeJsonFile(newRecipeFilename, clonedProps);
    return clonedProps;
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

  /** Sanitize a string for use in filenames. */
  sanitizeString(inputString: string | null): string {
    if (inputString === null) {
      throw new Error("Input string is null");
    }
    return sanitizeString(inputString);
  }

  /** Debug hint for new assistant creation. */
  debugHintNewAssistant(assistantId: string, newRecipeFilename: string): void {
    console.log("\n\n\n");
    console.log("Created Assistant with Id: " + assistantId);
    console.log("\n\n\n");
    console.log(
      "writing new recipe file with assistant id:\n" + newRecipeFilename,
    );
    console.log("\n\n");
    console.log(
      "Manage your assistants at https://platform.openai.com/assistants/",
    );
    console.log("\n\n\n-----------------------------------\n\n\n");
  }
}
