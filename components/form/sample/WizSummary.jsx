import React from "npm:react";
import { Box, Newline, Text } from "npm:ink";
import { EmptyLine } from "./EmptyLine.jsx";

export function WizSummary(props) {
  const { wizProps } = props;
  const coll = [];

  wizProps.recipe.map((pKey, idx) => {
    const { attr, details } = pKey;
    if (idx > wizProps.keyCount) {
      return;
    }
    if (wizProps.prevProps[attr]) {
      coll.push(
        `${details.text}: ${wizProps.prevProps[attr]}`,
      );
    }
  });

  if (wizProps.sampleProp) {
    coll.push(
      `${wizProps.config.summaryText}: ${wizProps.sampleProp}`,
    );
  }

  if (coll.length === 0) {
    return <></>;
  }

  return (
    <Box padding={2} borderStyle="double">
      <Text>
        <Newline />
        <Text>
          {coll.join("\n")}
        </Text>
        <EmptyLine />
      </Text>
    </Box>
  );
}
