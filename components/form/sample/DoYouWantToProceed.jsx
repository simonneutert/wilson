import React from "npm:react";
import { Box, Text } from "npm:ink";

export function DoYouWantToProceed() {
  return (
    <Box flexDirection="column" gap={1}>
      <Text>
        Do you want to continue?
      </Text>
    </Box>
  );
}
