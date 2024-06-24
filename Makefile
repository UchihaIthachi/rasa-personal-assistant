CHATBOT_DIR := chat-bot
WEBSITE_DIR := website
API_DIR := rest-api

# Train the full Rasa model
train: ## Train the full Rasa model
	rasa train --domain $(CHATBOT_DIR)/config/domain.yml --data $(CHATBOT_DIR)/data --config $(CHATBOT_DIR)/config/config.yml --out $(CHATBOT_DIR)/models

# Train only the NLU model
train-nlu: ## Train only the NLU model
	rasa train nlu --nlu $(CHATBOT_DIR)/data/nlu.yml --config $(CHATBOT_DIR)/config/config.yml --out $(CHATBOT_DIR)/models/nlu

# Run the action server
run-actions: ## Run the action server
	rasa run actions --actions $(CHATBOT_DIR)/actions --cors "*" --debug

# Run an interactive Rasa shell
shell: ## Run an interactive Rasa shell
	$(MAKE) run-actions &
	rasa shell -m $(CHATBOT_DIR)/models --endpoints $(CHATBOT_DIR)/config/endpoints.yml

# Run the Rasa server with API enabled
run: ## Run the Rasa server with API enabled
	$(MAKE) run-actions &
	rasa run --enable-api -m $(CHATBOT_DIR)/models --cors "*" --debug
# Run Rasa X with API enabled and CORS support
run-x: ## Run Rasa X with API enabled and CORS support
	$(MAKE) run-actions &
	rasa x --no-prompt -c $(CHATBOT_DIR)/config/config.yml --cors "*" --endpoints $(CHATBOT_DIR)/config/endpoints.yml --enable-api

# Validate the Rasa files
validate: ## Validate the Rasa files
	rasa data validate --domain $(CHATBOT_DIR)/config/domain.yml --data $(CHATBOT_DIR)/data --config $(CHATBOT_DIR)/config/config.yml

# Help display
help:  ## Display this help
	@echo "Usage:"
	@echo "  make <target>"
	@echo ""
	@echo "Targets:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'
