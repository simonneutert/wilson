FROM denoland/deno:2.0.5 AS builder

WORKDIR /app

# COPY the files over
COPY deno.json deno.lock justfile ./
COPY main.jsx ./
COPY lib /app/lib
COPY components /app/components
COPY assistants/templates /app/assistants/templates

# Compile the code to /app/dist
RUN deno compile --allow-net --allow-env --allow-read --allow-run --allow-write --output dist/wilson main.jsx
RUN deno compile --allow-net --allow-env --allow-read --allow-run --allow-write --output dist/wilson-replay lib/replay_assistant.js
RUN deno compile --allow-run --allow-net --allow-env --allow-read --allow-write --output dist/wilson-create-assistant lib/create_assistant.jsx

FROM denoland/deno:2.0.5

USER deno

COPY LICENSE ./
WORKDIR /app
COPY --from=builder /app/dist /app/
COPY assistants/templates /app/assistants/templates

CMD [ "./wilson" ]
