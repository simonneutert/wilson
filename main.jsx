import React from "react";
import { render } from "ink";

import { FormInput } from "./components/form/sample/FormInput.jsx";
import { FormSelect } from "./components/form/sample/FormSelect.jsx";
import { WizWelcome } from "./components/form/sample/WizWelcome.jsx";

const filename = Deno.args[0] || "assistants/templates/demo.json";
const recipeData = JSON.parse(Deno.readTextFileSync(filename));

const elemCount = 0;
const start = recipeData.recipe[elemCount];
const { attr, inputType, details } = start;

if (inputType === "input") {
  render(
    <>
      <WizWelcome recipe={recipeData} />
      <FormInput
        assistant={recipeData.assistant}
        recipe={recipeData.recipe}
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
        keyCount={elemCount}
        attr={attr}
        prevProps={new Object()}
        config={details}
      />
    </>,
  );
}
