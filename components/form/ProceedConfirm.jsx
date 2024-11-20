import React from "react";
import { Box } from "ink";
import { ConfirmInput } from "@inkjs/ui";
import { Renderer } from "./Renderer.jsx";
import { WizSummary } from "./WizSummary.jsx";
import { DoYouWantToProceed } from "./DoYouWantToProceed.jsx";

export const ProceedConfirm = (props) => {
  const wizProps = {
    ...props.prevProps,
    userInputValue: props.userInputValue,
  };
  wizProps.config.defaultValue = props.userInputValue;

  return (
    <Box flexDirection="column" gap={1} padding={1} borderStyle="round">
      <WizSummary wizProps={wizProps} />
      <Box flexDirection="column" paddingLeft={2} gap={1}>
        <DoYouWantToProceed />
        <ConfirmInput
          onConfirm={() => {
            const prevProps = { ...props.prevProps };
            prevProps.keyCount = prevProps.keyCount + 1;
            prevProps.prevProps = prevProps.prevProps || {};
            prevProps.prevProps[prevProps.attr] = props.userInputValue;
            Renderer(prevProps);
          }}
          onCancel={() => {
            Renderer(wizProps);
          }}
        />
      </Box>
    </Box>
  );
};
