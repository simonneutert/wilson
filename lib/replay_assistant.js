import { Assistant } from "./assistant.js";

function readPatientJsonDataFromFile(pathToFile) {
  const data = Deno.readTextFileSync(pathToFile);
  return JSON.parse(data);
}

const pathToFile = Deno.args[0];
const filename = `${pathToFile}`.split("/").pop();
const data = readPatientJsonDataFromFile(pathToFile);

const assistant = new Assistant(data);
assistant.call({ filename: filename }).then((response) => {
  console.log(response);
});
