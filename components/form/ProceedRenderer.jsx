import React from "react";
import { render } from "ink";
import { ProceedConfirm } from "./ProceedConfirm.jsx";

export function ProceedRenderer(props, userInputValue) {
  const { rerender } = render(
    <ProceedConfirm
      prevProps={props}
      userInputValue={userInputValue}
    />,
  );

  rerender(
    <ProceedConfirm
      prevProps={props}
      userInputValue={userInputValue}
    />,
  );
}
