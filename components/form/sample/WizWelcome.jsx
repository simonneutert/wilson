import React from "npm:react";
import { Box, Newline, Text } from "npm:ink";

export function WizWelcome(props) {
  const recipe = props.recipe;
  return (
    <Box padding={2} borderStyle="double">
      <Text>
        <Text bold>
          Assistant: {recipe.assistant.name}
        </Text>
        <Newline />
        <Newline />
        {renderSteps(recipe)}
      </Text>
    </Box>
  );
}

function renderSteps(recipe) {
  return recipe.recipe.map((item, idx) => {
    const { attr, details } = item;
    return (
      <Text key={idx}>
        <Text>
          {idx + 1}. {item.details.text}
        </Text>
        <Newline />
        <Text>
          {"     "}
          attr: {attr}
        </Text>
        <Newline />
        {defaultVal(details)}
        <Newline />
      </Text>
    );
  });
}

function defaultVal(details) {
  if (details.defaultValue) {
    return (
      <Text>
        {"     "}
        `default: ${details.defaultValue}`
        <Newline />
      </Text>
    );
  }
  return "";
}
