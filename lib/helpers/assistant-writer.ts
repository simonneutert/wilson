import { WilsonAssistant, WilsonOptions } from "../assistant.ts";
import { sanitizeString } from "./sanitize-string.ts";
import writeJsonFile from "./write-json-file-formatted.ts";

export class AssistantWriter {
  sanitizeString(str: string): string {
    return sanitizeString(str);
  }

  constructBasePath(assistant: WilsonAssistant): string {
    return `assistants/replays/${assistant.name}/${assistant.id}`;
  }

  writeRecipeReplayFile(
    baseData: string[],
    assistant: WilsonAssistant,
    options = {} as WilsonOptions,
  ) {
    if (
      options.filename && options.filename !== "" &&
      options.filename.includes(".json")
    ) {
      const path = `${this.constructBasePath(assistant)}/${options.filename}`;
      writeJsonFile(path, {
        assistant: { ...assistant },
        baseData: [...baseData],
      });
    } else {
      writeJsonFile(
        `${this.constructBasePath(assistant)}/replay_${
          this.sanitizeString(assistant.name)
        }_${new Date().getTime()}.json`,
        {
          assistant: { ...assistant },
          baseData: [...baseData],
        },
      );
    }
  }
}
