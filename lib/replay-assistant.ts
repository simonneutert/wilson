import { Assistant, WilsonTemplateFromInk } from "./assistant.ts";

function readPatientJsonDataFromFile(
  pathToFile: string,
): WilsonTemplateFromInk {
  const data = Deno.readTextFileSync(pathToFile);
  return JSON.parse(data);
}

const pathToFile = Deno.args[0];
const filename = `${pathToFile}`.split("/").pop();
const data = readPatientJsonDataFromFile(pathToFile);

const assistant = new Assistant(data);
console.log(`Replaying assistant with data from:\n${pathToFile}\n\n`);
console.log(`---------------------------------------------\n\n`);
assistant.call({ filename: filename }).then((response) => {
  console.log(response);
});
