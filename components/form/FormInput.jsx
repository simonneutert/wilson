import React, { useState } from "react";
import { Box, Text } from "ink";
import { TextInput } from "@inkjs/ui";
import { ProceedRenderer } from "./ProceedRenderer.jsx";
import { WizSummary } from "./WizSummary.jsx";

export function FormInput(props) {
  const [value, setValue] = useState(
    props.userInputValue || props.config.defaultValue || "",
  );

  return (
    <Box flexDirection="column" gap={1} padding={2} borderStyle="round">
      <WizSummary wizProps={props} />
      <Text>
        {props.config.text}
      </Text>
      <TextInput
        defaultValue={value}
        onChange={setValue}
        onSubmit={() => {
          ProceedRenderer(props, value);
        }}
      />
    </Box>
  );
}
