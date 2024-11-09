# Wilson - Developer's README<!-- omit in toc -->

Here you will find information for developers contributing to the project.

## Table of Contents<!-- omit in toc -->

- [Update VHS Demo](#update-vhs-demo)
- [Publish Package on GHCR.io](#publish-package-on-ghcrio)
- [Run the project](#run-the-project)
- [Debugging VSCode](#debugging-vscode)

## Update VHS Demo

To update the VHS demo, run the following command:

`$ just vhs-record`

## Publish Package on GHCR.io

Publish the package on GHCR.io using the following command:

`$ just publish-ghcr`

## Run the project

Running the project is simple:

`$ just run`

## Debugging VSCode

- Open the project in VSCode.
- Create a debug profile with VSCode's debug helper button.

Here is an example of a `launch.json` configuration for debugging Deno scripts,
the `runtimeExecutable` path should be updated to the path of the Deno
executable on your system:

```text
{
  "version": "0.2.0",
  "configurations": [
    {
      "request": "launch",
      "name": "Launch Program",
      "type": "node",
      "program": "${workspaceFolder}/lib/replay-assistant.ts",
      "cwd": "${workspaceFolder}",
      "env": {},
      "runtimeExecutable": "/path/to/bin/deno",
      "runtimeArgs": [
        "run",
        "--unstable",
        "--inspect-wait",
        "--allow-all"
      ],
      "attachSimplePort": 9229,
      "args": ["assistant/templates/demo.json"]
    }
  ]
}
```
