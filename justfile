default:
	@just --list

run file="assistants/templates/demo.json":
	@deno task run {{file}}

replay file:
	@deno task replay {{file}}

create_assistant:
	@deno task create-assistant

clean_assistant_files:
	rm -rf assistants/assistant_*.json
	rm -rf assistants/replays
	mkdir assistants/replays && touch assistants/replays/.gitkeep

vhs_record:
	@just compile
	@vhs demo.tape

compile:
	@deno compile --allow-run --allow-net --allow-env --allow-read --allow-write --output dist/wilson main.jsx
	@deno compile --allow-run --allow-net --allow-env --allow-read --allow-write --output dist/wilson-replay lib/replay_assistant.js
	@deno compile --allow-run --allow-net --allow-env --allow-read --allow-write --output dist/wilson-create-assistant lib/create_assistant.jsx

publish_ghcr:
	docker buildx build --platform linux/amd64,linux/arm64 -t ghcr.io/simonneutert/wilson:main --push .    
