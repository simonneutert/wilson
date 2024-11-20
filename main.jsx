import React from "react";
import { render } from "ink";

import { FormInput } from "./components/form/FormInput.jsx";
import { FormSelect } from "./components/form/FormSelect.jsx";
import { WizWelcome } from "./components/form/WizWelcome.jsx";

const filename = Deno.args[0] || "assistants/templates/demo.json";
// send a copy of the original data through the pipeline
const recipeDataTemplate = JSON.parse(Deno.readTextFileSync(filename));
// this will be the data that can and will be mutated
const recipeData = JSON.parse(Deno.readTextFileSync(filename));

const elemCount = 0;
const start = recipeData.recipe[elemCount];
const { attr, inputType, details } = start;

if (inputType === "input") {
  render(
    <>
      <WizWelcome recipe={recipeDataTemplate} />
      <FormInput
        assistant={recipeData.assistant}
        recipe={recipeData.recipe}
        recipeDataTemplate={recipeDataTemplate}
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
      <WizWelcome recipe={recipeData} />
      <FormSelect
        assistant={recipeData.assistant}
        recipe={recipeData.recipe}
        recipeDataTemplate={recipeDataTemplate}
        keyCount={elemCount}
        attr={attr}
        prevProps={new Object()}
        config={details}
      />
    </>,
  );
}
