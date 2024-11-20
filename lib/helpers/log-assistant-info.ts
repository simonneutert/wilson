/** Debug hint for new assistant creation. */
export function debugHintNewAssistant(
  assistantId: string,
  newRecipeFilename: string,
): void {
  if (Deno.env.get("VHS_RECORDING") === "true") {
    return;
  }

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
