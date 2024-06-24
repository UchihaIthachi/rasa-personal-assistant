# Hotel Management Chatbot

This repository contains a chatbot for hotel management, built using Rasa. The chatbot can handle various customer inquiries such as booking rooms, canceling reservations, checking availability, and providing information about hotel amenities.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Training the Model](#training-the-model)
  - [Running the Action Server](#running-the-action-server)
  - [Interacting with the Bot](#interacting-with-the-bot)
  - [Using Rasa X](#using-rasa-x)
- [Configuration](#configuration)
- [File Structure](#file-structure)
- [Makefile Commands](#makefile-commands)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/your-username/hotel-management-chatbot.git
   cd hotel-management-chatbot
   ```

2. **Create and activate a virtual environment:**

   ```sh
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```sh
   pip install -r requirements.txt
   ```

## Usage

### Training the Model

To train the model with your current data, run:

```sh
make train
```

This command will train the Rasa model using the domain, data, and configuration files, and save the trained model in the `models` directory.

### Running the Action Server

To start the action server, which handles custom actions, run:

```sh
make run-actions
```

### Interacting with the Bot

You can interact with the bot using Rasa Shell:

```sh
make shell
```

This will start the action server and open the Rasa shell, allowing you to chat with the bot in the terminal.

Alternatively, you can run the bot and interact with it via HTTP API:

```sh
make run
```

Once the server is running, you can send messages to the bot using a curl command or any API testing tool like Postman:

```sh
curl -X POST \
  http://localhost:5005/webhooks/rest/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "sender": "test_user",
    "message": "I need to book a room"
  }'
```

### Using Rasa X

To use Rasa X for managing and improving your bot, run:

```sh
make run-x
```

Open Rasa X in your web browser at `http://localhost:5002`. Rasa X provides an interface for chatting with your bot, reviewing conversations, annotating data, and retraining models.

## Configuration

- **Domain File:** `domain.yml` contains the intents, entities, slots, responses, and forms used by the bot.
- **Training Data:** `data` directory contains the NLU and Core training data.
- **Config File:** `config.yml` specifies the pipeline and policies for training the model.
- **Endpoints File:** `configs/endpoints.yml` defines the endpoints for the action server and other external services.

## File Structure

```sh
hotel-management-chatbot/
├── .rasa/
├── configs/
│   └── endpoints.yml
├── data/
│   ├── nlu.yml
│   ├── rules.yml
│   └── stories.yml
├── models/
├── actions/
│   └── actions.py
├── domain.yml
├── config.yml
├── requirements.txt
├── Makefile
└── README.md
```

## Makefile Commands

- **`make train`**: Train the model using the domain, data, and config files.
- **`make train-nlu`**: Train only the NLU model.
- **`make run-actions`**: Start the action server.
- **`make shell`**: Start the action server and open Rasa shell for interaction.
- **`make run`**: Start the action server and Rasa server with API enabled.
- **`make run-x`**: Start the action server and Rasa X for bot management.

## Contributing

Contributions are welcome! Please create a new issue or submit a pull request if you have any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
