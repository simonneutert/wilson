## FAQ<!-- omit in toc -->

- [It's not working, what do I do?](#its-not-working-what-do-i-do)
- [I accidentally created several assistants, how do I delete them?](#i-accidentally-created-several-assistants-how-do-i-delete-them)
- [I sent the personal data of the patient, what do I do?](#i-sent-the-personal-data-of-the-patient-what-do-i-do)
- [Does Deno support "cross compilation"?](#does-deno-support-cross-compilation)
- [You didn't add a single test, what's up with that?](#you-didnt-add-a-single-test-whats-up-with-that)
- [Run the docker image for a quick demo (Chapter is WIP)](#run-the-docker-image-for-a-quick-demo-chapter-is-wip)

---

### It's not working, what do I do?

You most probably haven't got the Environment Variables set up correctly. \

I use [direnv](https://direnv.net/) to manage my environment variables.

Another way of setting the environment variables for the session is to run the
following command in the terminal:

```shell
export $(cat .env | xargs) && ./dist/wilson
# or
export $(cat .env | xargs) && ./dist/wilson-replay assistants/replays/<assistant_ID>/replay_xxx.json
```

### I accidentally created several assistants, how do I delete them?

https://platform.openai.com/assistants/asst_ug76fbt0KnD55NuNCz69WuhZ

### I sent the personal data of the patient, what do I do?

Let's hope it was just the first name, bad enough, but not as bad as the full
name.

Delete the file containing the patient's data, first.\
And what's done is done, what's sent is sent. No going back.

The data is processed on OpenAI's servers. This means that you leaked personal
information to OpenAI. 😫

We cannot stress this often enough: **Do not provide personal information.**

### Does Deno support "cross compilation"?

You can cross-compile binaries for other platforms by using the --target flag.

```shell
# Cross compile for Apple Silicon
deno compile --target aarch64-apple-darwin main.ts
```

```shell
# Cross compile for Windows with an icon
deno compile --target x86_64-pc-windows-msvc --icon ./icon.ico main.ts
```

Deno supports cross compiling to all targets regardless of the host platform.

| OS      | Architecture | Target                    |
| ------- | ------------ | ------------------------- |
| Windows | x86_64       | x86_64-pc-windows-msvc    |
| macOS   | x86_64       | x86_64-apple-darwin       |
| macOS   | ARM64        | aarch64-apple-darwin      |
| Linux   | x86_64       | x86_64-unknown-linux-gnu  |
| Linux   | ARM64        | aarch64-unknown-linux-gnu |

### You didn't add a single test, what's up with that?

I know, I know. I'm not sorry. Testing is important, but I'm not going to test
this.

There's nothing I can't manually test in 5 minutes time. Easy peasy. And for
what it is, it's not worth the hustle.

### Run the docker image for a quick demo (Chapter is WIP)

Clone the repository, change into the directory, and create the `.env` file as
described in the README.

Set the environment variables in the `.env` file. Then run the following
command:

```shell
# --rm removes the container after it's done
# -it runs the container in interactive mode (it is a terminal application after all)
# --env-file=.env sets the environment variables from the .env file
$ docker run --rm -it --env-file=.env --user $(id -u):$(id -g) -v ./assistants:/app/assistants ghcr.io/simonneutert/wilson:main
```

**Important** the `.env` must be `KEY=VALUE` pairs separated by newlines - no
ampersands or quotes for the values.
