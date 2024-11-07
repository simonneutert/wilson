import OpenAI from "npm:openai";
import { ensureFileSync } from "@std/fs";
import { sanitizeString } from "./helpers/sanitize-string.ts";

async function writeJsonFile(filename, data) {
  const dataStr = JSON.stringify(data, null, 2);
  ensureFileSync(filename);
  await Deno.writeTextFile(filename, dataStr);
}

export class Assistant {
  constructor(props) {
    this.allProps = props;
    this.baseData = props.baseData;
    // this.assistantId = Deno.env.get("OPENAI_API_ASSISTANT_ID");
    this.assistant = props.assistant;
  }

  writeReplayFile(options = {}) {
    if (
      options.filename && options.filename !== "" &&
      options.filename.includes(".json")
    ) {
      const path =
        `assistants/replays/${this.assistant.id}/${options.filename}`;
      writeJsonFile(path, {
        assistant: { ...this.assistant },
        baseData: [...this.baseData],
      });
    } else {
      writeJsonFile(
        `assistants/replays/${this.assistant.id}/replay_${
          this.sanitizeString(this.assistant.name)
        }_${new Date().getTime()}.json`,
        {
          assistant: { ...this.assistant },
          baseData: [...this.baseData],
        },
      );
    }
  }

  /**
   * @param {string} inputString
   * @returns {string} sanitized string with only alphanumeric characters
   */
  sanitizeString(inputString) {
    return sanitizeString(inputString);
  }

  call(options = {}) {
    options = options || {};

    const client = new OpenAI({
      apiKey: Deno.env.get("OPENAI_API_KEY"),
    });

    const main = async (baseData) => {
      let assistantId;
      if (!this.assistant?.id || this.assistant.id === "") {
        const assistant = await client.beta.assistants.create({
          model: "gpt-4o-mini",
          name: this.assistant.name,
          instructions: this.assistant.instruction,
          // tools = [],
        });
        assistantId = assistant.id;
        this.assistant.id = assistant.id;
        const newRecipeFilename = `assistants/assistant_${
          this.sanitizeString(this.assistant.name)
        }_${new Date().getTime()}.json`;
        console.log("\n\n\n");
        console.log("Created Assistant with Id: " + assistantId);
        console.log("\n\n\n");
        console.log(
          "writing new recipe file with assistant id:\n" + newRecipeFilename,
        );
        console.log("\n\n\n");
        const clonedProps = { ...this.allProps };
        clonedProps.assistant.id = assistantId;
        writeJsonFile(
          newRecipeFilename,
          clonedProps,
        );
      } else {
        assistantId = this.assistant.id;
      }
      this.writeReplayFile(options);

      const thread = await client.beta.threads.create({
        messages: [
          {
            role: "user",
            content: baseData.join("\n"),
          },
          {
            role: "user",
            content: this.assistant.threads.shift(),
          },
        ],
      });

      let run = await client.beta.threads.runs.createAndPoll(thread.id, {
        assistant_id: assistantId,
      });

      // forEach will break the async surrounding the loop 🤷‍♂️
      for (const element of this.assistant.threads) {
        await client.beta.threads.messages.create(thread.id, {
          role: "user",
          content: element,
        });

        run = await client.beta.threads.runs.createAndPoll(thread.id, {
          assistant_id: assistantId,
        });
      }

      let assistantMessages = [];
      if (run.status == "completed") {
        const messages = await client.beta.threads.messages.list(thread.id);
        const paginatedMessages = messages.getPaginatedItems();
        for (const message of paginatedMessages) {
          if (message.role == "assistant") {
            if (message.content[0]?.text?.value) {
              assistantMessages.push(message.content[0]?.text.value);
            }
          }
        }
        assistantMessages = assistantMessages.reverse().join("\n\n---\n\n");
      } else {
        assistantMessages =
          `Sorry, something went wrong. Please try again later. Run status: ${run.status}`;
      }
      return assistantMessages;
    };

    return main(this.baseData);
  }
}
