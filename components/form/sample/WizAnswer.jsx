import React, { useEffect, useState } from "npm:react";
import { Text, useApp } from "npm:ink";
import { Assistant } from "../../../lib/assistant.js";

export function WizAnswer(props) {
  const [answer, setAnswer] = useState("Loading ... please stand by!");
  const { exit } = useApp();

  const wizAnswers = { ...props.answers };
  wizAnswers.recipe = wizAnswers.recipe.map((item) => {
    const val = wizAnswers.prevProps[item.attr];
    item.details.formValue = val;
    return item;
  });

  wizAnswers.baseData = wizAnswers.recipe.map((item) => {
    return `${item.details.summaryText}: ${item.details.formValue}`;
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

  return <Text>{answer}</Text>;
}
