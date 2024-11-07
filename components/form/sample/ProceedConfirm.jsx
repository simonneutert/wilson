import React from "npm:react";
import { Box } from "npm:ink";
import { ConfirmInput } from "npm:@inkjs/ui";
import { Renderer } from "./Renderer.jsx";
import { EmptyLine } from "./EmptyLine.jsx";
import { WizSummary } from "./WizSummary.jsx";
import { DoYouWantToProceed } from "./DoYouWantToProceed.jsx";

export const ProceedConfirm = (props) => {
  const xprevProps = props.prevProps;

  const wizProps = {
    ...xprevProps,
    sampleProp: props.sampleProp,
  };
  return (
    <Box flexDirection="column" gap={1}>
      <WizSummary wizProps={wizProps} />
      <EmptyLine />

      <DoYouWantToProceed />
      <ConfirmInput
        onConfirm={() => {
          const prevProps = { ...xprevProps };
          prevProps.keyCount = prevProps.keyCount + 1;
          prevProps.prevProps = prevProps.prevProps || {};
          prevProps.prevProps[prevProps.attr] = props.sampleProp;
          Renderer(prevProps);
        }}
        onCancel={() => {
          Renderer(wizProps);
        }}
      />
    </Box>
  );
};
