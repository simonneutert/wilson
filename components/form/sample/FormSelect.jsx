import React from "npm:react";
import { Box, Newline, Text } from "npm:ink";
import { Select } from "npm:@inkjs/ui";
import { ProceedRenderer } from "./ProceedRenderer.jsx";

export const FormSelect = (props) => {
  return (
    <>
      <Box flexDirection="column" gap={1} borderStyle="round">
        <Text>
          <Text>{props.config.text}</Text>
          <Newline />
        </Text>
        <Select
          options={props.config.selectOptions}
          onChange={(newValue) => {
            ProceedRenderer(props, newValue);
          }}
        />
      </Box>
    </>
  );
};
