import React from "react";
import { render } from "ink";

import { FormInput } from "../components/form/FormInput.jsx";
import { FormSelect } from "../components/form/FormSelect.jsx";
import { WizWelcome } from "../components/form/WizWelcome.jsx";

// here be dragons :)

let fileContent = "";
function readPatientJsonDataFromFile(pathToFile) {
  fileContent = Deno.readTextFileSync(pathToFile);
  return JSON.parse(fileContent);
}
readPatientJsonDataFromFile("assistants/template-inception.json");
const schema = `${fileContent}`;

const pathToFile = "assistants/templates/demo.json";
const data = readPatientJsonDataFromFile(pathToFile);

data.assistant.instruction = `Your are a data specialist.

Here's how a file needs to be structured (the SCHEMA):
~~~json
${schema}
~~~

And this is a working demo for a tweeting wizard:

~~~json
${fileContent}
~~~

I need you to help me creating a new assistant following the schema.`;

data.assistant.name = "Data Specialist for editing JSON Schemas";
data.assistant.threads = [
  "I need you to help me editing the file and add fields you would suggest to make a great template. Please make sure the file is structured correctly.  Please make sure the file is structured correctly.",
];
data.recipe = [
  {
    attr: "templateWish",
    inputType: "input",
    details: {
      defaultValue: "",
      text:
        "Describe here the expectations you have for the new template/assistant:",
      summaryText: "The new template will be an assistant for...",
    },
  },
];

const elemCount = 0;
const start = data.recipe[elemCount];
const { attr, inputType, details } = start;

if (inputType === "input") {
  render(
    <>
      <WizWelcome recipe={data} />
      <FormInput
        assistant={data.assistant}
        recipe={data.recipe}
        keyCount={elemCount}
        attr={attr}
        prevProps={new Object()}
        config={details}
      />
    </>,
  );
} else if (inputType === "select") {
  render(
    <>
      <WizWelcome recipe={data} />
      <FormSelect
        assistant={data.assistant}
        recipe={data.recipe}
        keyCount={elemCount}
        attr={attr}
        prevProps={new Object()}
        config={details}
      />
    </>,
  );
}
