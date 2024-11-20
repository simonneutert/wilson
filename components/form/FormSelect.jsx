import React from "react";
import { Box, Newline, Text } from "ink";
import { Select } from "@inkjs/ui";
import { ProceedRenderer } from "./ProceedRenderer.jsx";

export const FormSelect = (props) => {
  return (
    <>
      <Box flexDirection="column" gap={1} padding={2} borderStyle="round">
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
