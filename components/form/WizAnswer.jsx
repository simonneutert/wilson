import React, { useEffect, useState } from "react";
import { Text, useApp } from "ink";
import Spinner from "ink-spinner";
import { Assistant } from "../../lib/assistant.ts";

function formatSummaryText(summaryText) {
  if (summaryText.endsWith(":")) {
    return summaryText.slice(0, -1);
  } else {
    return summaryText;
  }
}

export function WizAnswer(props) {
  const [answer, setAnswer] = useState("");
  const { exit } = useApp();

  const wizAnswers = { ...props.answers };
  wizAnswers.recipe = wizAnswers.recipe.map((item) => {
    const val = wizAnswers.prevProps[item.attr];
    item.details.formValue = val;
    return item;
  });

  wizAnswers.baseData = wizAnswers.recipe.map((item) => {
    return `${
      formatSummaryText(item.details.summaryText)
    }: ${item.details.formValue}`;
  });

  useEffect(() => {
    const mp = new Assistant(wizAnswers);
    mp.call().then((response) => {
      setAnswer(response);
      setTimeout(() => {
        exit();
      }, 100);
    });
  }, []);

  if (!answer) {
    return <LoadingWithSpinner />;
  }

  return <Text>{answer}</Text>;
}

function LoadingWithSpinner() {
  return (
    <Text>
      <Text color="green">
        <Spinner type="dots" />
      </Text>
      {" The assistant is coming up with answers ... please stand by!"}
    </Text>
  );
}
