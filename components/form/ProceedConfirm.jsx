import React from "react";
import { Box } from "ink";
import { ConfirmInput } from "@inkjs/ui";
import { Renderer } from "./Renderer.jsx";
import { EmptyLine } from "./EmptyLine.jsx";
import { WizSummary } from "./WizSummary.jsx";
import { DoYouWantToProceed } from "./DoYouWantToProceed.jsx";

export const ProceedConfirm = (props) => {
  const wizProps = {
    ...props.prevProps,
    sampleProp: props.sampleProp,
  };
  wizProps.config.defaultValue = props.sampleProp;

  return (
    <Box flexDirection="column" gap={1}>
      <WizSummary wizProps={wizProps} />
      <EmptyLine />

      <DoYouWantToProceed />
      <ConfirmInput
        onConfirm={() => {
          const prevProps = { ...props.prevProps };
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
