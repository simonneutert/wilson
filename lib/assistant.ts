import OpenAI from "openai";
import { sanitizeString } from "./helpers/sanitize-string.ts";
import { AssistantLoader } from "./helpers/assistant-loader.ts";
import { AssistantWriter } from "./helpers/assistant-writer.ts";
import * as guards from "./helpers/guards.ts";

export class Assistant {
  allProps: WilsonTemplate;
  baseData: string[];
  assistant: WilsonAssistant;
  assistantLoader: AssistantLoader;
  assistantWriter: AssistantWriter;
  client: OpenAI;

  constructor(props: WilsonTemplateFromInk) {
    this.allProps = props;
    this.baseData = props.baseData;
    this.assistant = props.assistant;
    const apiKey = Deno.env.get("OPENAI_API_KEY");
    if (!apiKey) {
      throw new Error("OPENAI_API_KEY environment variable is not set");
    }
    this.client = new OpenAI({ apiKey });
    this.assistantLoader = new AssistantLoader(
      this.client,
      this.assistant,
    );
    this.assistantWriter = new AssistantWriter();
  }

  call(options?: WilsonOptions): Promise<string> {
    options = options || {};

    return this.apiCallback(options);
  }

  async apiCallback(options: WilsonOptions): Promise<string> {
    try {
      // load or create assistant
      const assistant = await this.assistantLoader.getOrCreateOpenAiAssistant(
        { ...this.allProps } as WilsonData,
      );
      this.assistant.id = assistant.id;
      // write replay file
      this.assistantWriter.writeRecipeReplayFile(
        this.baseData,
        this.assistant,
        options,
      );
      // create first thread for the assistant
      const thread = await this.client.beta.threads.create({
        messages: [
          {
            role: "user",
            content: this.baseData.join("\n"),
          },
          {
            role: "user",
            content: this.assistant.threads.shift(),
          },
        ],
      } as OpenAI.Beta.Threads.ThreadCreateParams);
      // poll first thread
      let run = await this.client.beta.threads.runs.createAndPoll(thread.id, {
        assistant_id: assistant.id,
      });

      // forEach will break the async surrounding the loop 🤷‍♂️
      for (const element of this.assistant.threads) {
        await this.client.beta.threads.messages.create(thread.id, {
          role: "user",
          content: element,
        });

        run = await this.client.beta.threads.runs.createAndPoll(thread.id, {
          assistant_id: assistant.id,
        });
      }

      // collect assistant messages
      let assistantMessages = "";
      const assistantMessagesCollection: string[] = [];
      if (run.status == "completed") {
        const messages = await this.client.beta.threads.messages.list(
          thread.id,
        );
        const paginatedMessages = messages.getPaginatedItems();
        for (const message of paginatedMessages) {
          if (message.role == "assistant") {
            const content = message.content[0];
            if (guards.isTextContentBlock(content)) {
              assistantMessagesCollection.push(content.text.value);
            }
          }
        }
        assistantMessages = assistantMessagesCollection.reverse().join(
          "\n\n---\n\n",
        );
      } else {
        assistantMessages =
          `Sorry, something went wrong. Please try again later. Run status: ${run.status}`;
      }
      return assistantMessages;
    } catch (error) {
      console.error("Error in apiCallback:", error);
      return "An error occurred while processing your request.";
    }
  }

  /** Sanitize a string for use in filenames. */
  sanitizeString(inputString: string): string {
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

export interface WilsonAssistant {
  id: string;
  name: string;
  instruction: string;
  threads: string[];
}

export interface WilsonTemplate {
  assistant: WilsonAssistant;
  baseData: string[];
}

export interface WilsonData {
  assistant: WilsonAssistant;
  recipe: WilsonForm[];
  baseData: string[];
  recipeDataTemplate: WilsonTemplate;
}

export interface WilsonTemplateFromInk extends WilsonTemplate {
  baseData: string[];
}

interface WilsonForm {
  attr: string;
  inputType: WilsonInputType;
  details: WilsonSelectInputDetails | WilsonTextInputDetails;
}

export interface WilsonSelectOption {
  value: string;
  label: string;
}

export interface WilsonOptions {
  filename?: string;
}

interface WilsonSelectInputDetails {
  selectOptions: WilsonSelectOption[];
  defaultValue: string;
  text: string;
  summaryText: string;
}

interface WilsonTextInputDetails {
  attr: string;
  inputType: WilsonInputType;
  details: WilsonTextInputDetails;
}

type WilsonInputType = "select" | "input";
