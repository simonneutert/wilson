# Wilson<!-- omit in toc -->

A simple terminal application that allows you to run through your multistep
OpenAI assistants.

> [!CAUTION]
> This tool currently is a Proof of Concept (Deno and Ink). It does not have any
> error handling or input validation. In its current state, it is not suitable
> for production use.
>
> It may grow as we go. But for now, it's good-enough® software for me.
>
> see: Ideas/Todos/Wishlist

---

💡 This is just a glorified API Client for OpenAI's GPT! 💣\
You are responsible for the costs you incur by using this software.\
And the responses are generated by OpenAI's GPT Model.\
You should not use this software, if you don't know that with AI comes great
responsibility. 🕷️🦸

---

## Table of Contents<!-- omit in toc -->

- [Rationale](#rationale)
  - [Minimum Viable Product](#minimum-viable-product)
- [Requirements](#requirements)
  - [How it works](#how-it-works)
- [Examples](#examples)
- [Demo](#demo)
- [Create your own Assistant](#create-your-own-assistant)
  - [Create a new template using AI (Inception 🙃)](#create-a-new-template-using-ai-inception-)
  - [Create a new Assistant by copying from a template](#create-a-new-assistant-by-copying-from-a-template)
- [Template Assistants](#template-assistants)
- [Use your created Assistants](#use-your-created-assistants)
- [Ideas/Todos/Wishlist](#ideastodoswishlist)
  - [Developer README](#developer-readme)
  - [Contributions](#contributions)

---

## Rationale

Find yourself in a situation where you ask the AI questions in a thread-like
manner?\
Are you tired of coming up with the same questions over and over again?\
Or worse, you forget to ask the most important questions?

Give your thoughts a place to live and breathe.\
Store processes as recipes and never forget a question again.

### Minimum Viable Product

I wanted a simple way to create a multistep assistant that can help me develop a
roadmap for a problem.\
In a minute or two, one can setup a multistep assistant and interact with it in
the terminal.

<img src="./wilson_logo.webp" width="200" alt="Wilson Logo" align="Wilson Repository image: A volleyball with a face balancing on a paperclip" />

> Image created using ChatGPT - of course. 🤖

Wilson, named after the famous volleyball in the movie _Cast Away_.\
The image shows Wilson balancing on a paperclip, that is definitely not MS
Office's famous _Clippy_.\
Wilson - your trusty old sidekick, when you feel stranded.

## Requirements

Here's what you need to run Wilson:

- [Deno](https://deno.com/) v2.0.0 or higher
- An OpenAI API secret key
- copy the `.env.init` to `.env` and add your OpenAI API key
- Optional: [just](https://github.com/casey/just) for running the tasks

Software is not tested on Windows. 🧨

### How it works

The assistant is more or less a cli wizard.

- it reads in a JSON file with the assistant's configuration
- it runs you through the inputs (select or input at the time)
- the collected data is structured and sent to OpenAI
- a thread with the assistant will be started
- the threads configured in the template will be run one by one
- eventually it prints the assistant's answers to your terminal

## Examples

Here are some examples of how you could use Wilson:

### IT Mentor (included)<!-- omit in toc -->

As a mentor, the AI can give you a series of handles to understand a complex
topic.

- Explain it to me like I'm five, in just a few sentences.
- What are the most important concepts?
- Give me what I need to know to be 80% proficient in this topic.

### Personal Trainer (as an exercise for you)<!-- omit in toc -->

As a personal trainer, the AI can help you create a workout plan.

- Provide a workout plan for the next 4 weeks.
- What are the most important exercises for my goals?
- What are the most common mistakes people make?
- Motivate me to stick to the plan.
- Add a 10 minute routine for when I'm short on time.

### Others<!-- omit in toc -->

Some inspiration, but probably you can think of a few more:

- Nutritionist
- Spiritual Leader
- Yoga Guru
- Financial Advisor 🤣
- ...

## Demo

Demo showcasing the CLI and every step of the AI Assistant's wizard:

![Demo gif animation of the CLI](demo.gif)

> This animation was created using
> [charmbracelet's vhs on GitHub](https://github.com/charmbracelet/vhs).

## Create your own Assistant

Currently there's no programmatic way to create your own assistant. 🙃

### Create a new template using AI (Inception 🙃)

`$ just compile` then `$ ./dist/wilson-create-assistant`

`$ just create_assistant` OR `$ deno task create-assistant`

Glimpse into
[assistants/template-inception.json](./assistants/template-inception.json) file
if like to know what this action is based on, other than the `demo.json`
template.

### Create a new Assistant by copying from a template

You can create your own assistant by creating a json file with the steps and
questions.

Start by copying the `assistants/templates/demo.json` to a
`assistants/templates/my_new_assistant.json` file and modify it to your needs.

The `demo.json` is a wizard that answers in tweets.

<details>

<summary>Click to see the JSON structure for the demo assistant</summary>

```json
{
  "assistant": {
    "id": "",
    "name": "Consultant Wizard",
    "instruction": "I am an author working on a novel. You are a wizard trained in all fields of magic. No boundaries exist to help me reach my fictional goals. Each of your answers must fit within 140 characters.",
    "threads": [
      "Can you share some wisdom on how to reach my goal(s)? It can be a different perspective, a trick, advice or a way to con.",
      "Invest and explain a spell that help me reach my goal(s).",
      "Provide a recipe for a potion that helps me reach my goal(s)."
    ]
  },
  "recipe": [
    {
      "attr": "timeline",
      "inputType": "select",
      "details": {
        "selectOptions": [
          {
            "label": "tactical",
            "value": "tactical"
          },
          {
            "label": "strategic",
            "value": "strategic"
          },
          {
            "label": "other",
            "value": "other"
          }
        ],
        "text": "Please select the best fitting scope/timeline",
        "summaryText": "The scope I need consulting on is"
      }
    },
    {
      "attr": "goals",
      "inputType": "input",
      "details": {
        "defaultValue": "",
        "text": "What do you need magical help with?",
        "summaryText": "I need magical help with"
      }
    }
  ]
}
```

</details>

### JSON Structure for Assistants<!-- omit in toc -->

See [assistants/template-inception.json](./assistants/template-inception.json)
for a detailed example.

#### Assistant<!-- omit in toc -->

The `assistant:` contains the information about the assistant.

- `id` - The id of the assistant. Will be automagically created for you from
  this template.
- `name` - The name of the assistant.
- `instruction` - The initial instruction for the assistant.
- `threads` - The list of threads the assistant will answer in context of the
  previous "thoughts".

#### Recipe<!-- omit in toc -->

The `recipe` is a list of steps the assistant will follow to build the
information you need and provide its answers.

Each step has the following structure:

- `attr` - The **unique** attribute the step will fill.
- `inputType` - The type of input the step will ask for: `[select, input]`
- `details` - The details of the step:

**if the `inputType` is `select`:**

- `selectOptions` - The list of options for the `select` input type.
- `text` - The question the assistant will ask.
- `summaryText` - How your input for the attr will be put in context.

**if the `inputType` is `input`:**

- `defaultValue` - The default value for the step.
- `text` - The question the assistant will ask.
- `summaryText` - How your input for the attr will be put in context.

### Running the assistant for the first time<!-- omit in toc -->

> Note: The assistant's id was an empty string.

`$ deno task run my_new_assistant.json`

After running the assistant for the first time, the assistant will create a new
file in `assistants/`.

Similar to `assistants/assistant_consultant_wizard_1730899839833.json`.\
The filename is the name of the assistant with a timestamp appended to it.

This will be the assistant you can use over and over again. This has the benefit
that you don't clutter your account with dead assistants (this will make Neo
happy, but you arent't doing your self a favor).

Rename the file to something more meaningful, e.g.
`assistants/assistant_consultant_wizard.json`.

And run the assistant with:

`$ deno task run assistants/assistant_consultant_wizard.json`

## Template Assistants

There are some template assistants in the `assistants/templates/` directory.

One of them is the `it-mentor.json` assistant.\
Make him help you understand "Apache Kafka".

You'd be surprised how much you can learn.\
Communication is the biggest part of Software Development after all.

`$ deno task run assistants/templates/it-mentor.json`

Brew yourself a coffee, this one will take a while. ☕

## Use your created Assistants

Use a created assistant when possible, not the templates.

**Every time you run a "template" a new assistant will be created 🧨**\
This is not a problem, but it will clutter your account with dead assistants.

Your configured assistants are stored in the `assistants/` directory directly.
The assistants contain the agent's `id` that is needed to interact with a
specific assistant. This `id` identifies the assistant in your OpenAI account.

You can rename the assistant file to something more meaningful, e.g.

```bash
$ mv assistants/assistant_consultant_wizard_1730899839833.json assistants/assistant_consultant_wizard.json
```

When you then want to run the assistant, you can do so with:

`$ deno task run assistants/assistant_consultant_wizard.json`

## Features<!-- omit in toc -->

Read the `justfile`. It contains some useful commands to help you running the
project.

Implemented features:

- [x] tui/cli interaction with a multistep assistant
- [x] edit and replay a conversation
- [x] multiple assistants side by side

## Tech Stack<!-- omit in toc -->

Made with [Deno](https://deno.com/) 🦕,
[Ink](https://github.com/vadimdemedes/ink) 🌈 and
[OpenAI's Client for Deno](https://github.com/openai/openai-deno-build) 🤖 this
little code dump is more of a playground to get the hang of Deno and Ink.

In order to run this code, you need:

- an API key for OpenAI and some credits
- Deno v2.0.0 or higher installed

## Ideas/Todos/Wishlist

- [ ] write a Dockerfile Readme about how to run the project in a container
- [ ] Add some tests
- [ ] load a previous conversation (replay) and make the answers the default
      values for interactive replay
- [ ] Add error handling
- [ ] Add input validation
- [ ] Add programmatic way to create your own assistant
- [ ] Add more input types (e.g. `Multi select`)
- [ ] save the conversation to a file
- [ ] when continuing development, add a CHANGELOG.md

### Developer README

See the [Developer README](./README.DEVELOPER.md) for more information.

### Contributions

Let's discuss first! 🤓

Please open an issue to discuss what you would like to change or tackle and in
what way you would like to contribute.

I am sure we can work something out. 🤝

It is important to me that we are on the same page and that we can work together
in a way that is fun and productive for both of us.
