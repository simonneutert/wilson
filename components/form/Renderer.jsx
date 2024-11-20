import React from "react";
import { render } from "ink";
import { FormInput } from "./FormInput.jsx";
import { FormSelect } from "./FormSelect.jsx";
import { WizAnswer } from "./WizAnswer.jsx";

export function Renderer(props) {
  const { rerender } = render(determineNextStep(props));

  rerender(determineNextStep(props));
}

function determineNextStep(props) {
  if (props.keyCount >= props.recipe.length) {
    return <WizAnswer answers={props} />;
  }

  const { attr, inputType, details } = props.recipe[props.keyCount];
  if (inputType === "select") {
    return (
      <FormSelect
        assistant={props.assistant}
        recipe={props.recipe}
        recipeDataTemplate={props.recipeDataTemplate}
        keyCount={props.keyCount}
        attr={attr}
        prevProps={props.prevProps}
        config={details}
      />
    );
  } else if (
    inputType === "input"
  ) {
    return (
      <FormInput
        assistant={props.assistant}
        recipe={props.recipe}
        recipeDataTemplate={props.recipeDataTemplate}
        keyCount={props.keyCount}
        attr={attr}
        prevProps={props.prevProps}
        config={details}
      />
    );
  }
}
