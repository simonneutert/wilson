import OpenAI from "openai";
import {
  WilsonAssistant,
  WilsonData,
  WilsonOptions,
  WilsonTemplate,
} from "../assistant.ts";
import { sanitizeString } from "./sanitize-string.ts";
import writeJsonFile from "./write-json-file-formatted.ts";
import { debugHintNewAssistant } from "./log-assistant-info.ts";

export class AssistantWriter {
  /** Sanitize a string for use in filenames. */
  sanitizeString(inputString: string | null): string {
    if (inputString === null) {
      throw new Error("Input string is null");
    }
    return sanitizeString(inputString);
  }

  generateAssistantFilename(
    assistant: OpenAI.Beta.Assistants.Assistant | WilsonAssistant,
  ): string {
    const utcTime = new Date().getTime();
    return `assistants/assistant_${
      this.sanitizeString(assistant.name)
    }_${utcTime}.json`;
  }

  /** Persist the WilsonTemplate to a file. */
  async persistAiAssistant(
    assistant: OpenAI.Beta.Assistants.Assistant | WilsonAssistant,
    props: WilsonData,
  ): Promise<OpenAI.Beta.Assistants.Assistant | WilsonAssistant> {
    const newRecipeFilename = this.generateAssistantFilename(assistant);
    debugHintNewAssistant(assistant.id, newRecipeFilename);
    const clonedPropsDefaultTemplate = JSON.parse(
      JSON.stringify(props.recipeDataTemplate),
    ) as WilsonTemplate;
    clonedPropsDefaultTemplate.assistant.id = assistant.id;
    await writeJsonFile(newRecipeFilename, clonedPropsDefaultTemplate);
    return assistant;
  }

  constructBaseReplayPath(assistant: WilsonAssistant): string {
    return `assistants/replays/${assistant.name}/${assistant.id}`;
  }

  conditionalBaseReplayPath(
    assistant: WilsonAssistant,
    options: WilsonOptions,
  ): string {
    let path = "";
    if (
      options.filename && options.filename !== "" &&
      options.filename.includes(".json")
    ) {
      path = `${this.constructBaseReplayPath(assistant)}/${options.filename}`;
    } else {
      path = `${this.constructBaseReplayPath(assistant)}/replay_${
        this.sanitizeString(assistant.name)
      }_${new Date().getTime()}.json`;
    }
    if (path === "") {
      throw new Error("Path is empty");
    }
    return path;
  }

  writeRecipeReplayFile(
    baseData: string[],
    assistant: WilsonAssistant,
    options = {} as WilsonOptions,
  ) {
    const path = this.conditionalBaseReplayPath(assistant, options);
    writeJsonFile(path, {
      assistant: { ...assistant },
      baseData: [...baseData],
    });
  }
}
