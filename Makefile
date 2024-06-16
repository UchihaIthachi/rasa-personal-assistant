# Train the full Rasa model
train:
	rasa train --domain domain.yml --data data --config config.yml --out models

# Train only the NLU model
train-nlu:
	rasa train nlu --nlu split_data/nlu --config configs.yml --out models/nlu

# Run the action server
run-actions:
	rasa run actions

# Run an interactive Rasa shell
shell:
	make run-actions &
	rasa shell -m models --endpoints configs/endpoints.yml

# Run the Rasa server with API enabled
run:
	make run-actions &
	rasa run --enable-api -m models --endpoints configs/endpoints.yml -p 5005

# Run Rasa X with API enabled and CORS support
run-x:
	make run-actions &
	rasa x --no-prompt -c configs.yml --cors "*" --endpoints configs/endpoints.yml --enable-api
