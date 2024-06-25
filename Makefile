CHATBOT_DIR := chat-bot
WEBSITE_DIR := chatbot-html-js-css-web-app
API_DIR := rest-api
REACT_APP_DIR := chatbot-react-vite-web-app

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

# Build and serve the React app
build-react: ## Build the React app
	cd $(REACT_APP_DIR) && npm install && npm run build && cd ..

serve-react: ## Serve the React app
	cd $(REACT_APP_DIR) && npm run dev

# Run the Rasa server with React web app
run: ## Run the Rasa server with React web app
	$(MAKE) run-actions &
	rasa run --enable-api -m $(CHATBOT_DIR)/models --cors "*" --debug &
	$(MAKE) serve-react &
	cd ..


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
