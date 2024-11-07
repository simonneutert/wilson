import React from "npm:react";
import { render } from "npm:ink";
import { ProceedConfirm } from "./ProceedConfirm.jsx";

export function ProceedRenderer(props, sampleProp) {
  const { rerender } = render(
    <ProceedConfirm
      prevProps={props}
      sampleProp={sampleProp}
    />,
  );

  rerender(
    <ProceedConfirm
      prevProps={props}
      sampleProp={sampleProp}
    />,
  );
}
