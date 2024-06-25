# Hotel Assistant Chatbot

Welcome to the Hotel Assistant Chatbot project! This repository contains a conversational AI powered by the Rasa framework, integrating Language Model capabilities from OpenAI. The chatbot assists users with various hotel-related queries, leveraging both structured data and natural language understanding.

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
  - [Training the Model](#training-the-model)
  - [Running the Action Server](#running-the-action-server)
  - [Interacting with the Bot](#interacting-with-the-bot)
  - [Using Rasa X](#using-rasa-x)
- [Web Application Implementations](#web-application-implementations)
  - [HTML + JS + CSS](#html--js--css)
  - [React + Vite](#react--vite)
- [Configuration](#configuration)
- [File Structure](#file-structure)
- [Makefile Commands](#makefile-commands)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/your-username/hotel-assistant-bot.git
   cd hotel-assistant-bot
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

To train the Rasa model with your current data, run:

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

Once the server is running, you can interact with the bot using either of the following web applications:

- **[chatbot-html-js-css-web-app](./chatbot-html-js-css-web-app)**: Basic interface for chatting with the bot using HTML, JavaScript, and CSS.
  - **Directory**: [Chatbot HTML + JS + CSS](https://github.com/JiteshGaikwad/Chatbot-Widget/tree/main)
- **[chatbot-react-vite-web-app](./chatbot-react-vite-web-app)**: Modern and dynamic web application using React + Vite.
  - **Directory**: [React Chat Widget](https://github.com/Wolox/react-chat-widget/tree/master)

To run the React application, navigate to its directory and execute `npm run dev`.

### Using Rasa X

To use Rasa X for managing and improving your bot, run:

```sh
make run-x
```

Open Rasa X in your web browser at `http://localhost:5002`. Rasa X provides an interface for chatting with your bot, reviewing conversations, annotating data, and retraining models.

## Configuration

- **Domain File:** `configs/domain.yml` contains the intents, entities, slots, responses, and forms used by the bot.
- **Training Data:** `data` directory contains the NLU and Core training data.
- **Config File:** `configs/config.yml` specifies the pipeline and policies for training the model.
- **Endpoints File:** `configs/endpoints.yml` defines the endpoints for the action server and other external services.

## File Structure

```plaintext
hotel-assistant-bot/
├── .rasa/
├── configs/
│   ├── domain.yml
│   ├── config.yml
│   └── endpoints.yml
├── data/
│   ├── nlu.yml
│   ├── rules.yml
│   └── stories.yml
├── models/
├── actions/
│   └── actions.py
├── chatbot-react-vite-web-app/
├── chatbot-html-js-css-web-app/
├── requirements.txt
├── Makefile
└── README.md
```

## Makefile Commands

Here are some useful commands to manage and run your Hotel Assistant Chatbot:

- **`make train`**: Train the Rasa model with domain, data, and config files.
- **`make train-nlu`**: Train only the NLU model.
- **`make run-actions`**: Start the action server for handling custom actions.
- **`make shell`**: Start the action server and open Rasa shell for interaction.
- **`make run`**: Start the action server and Rasa server with API enabled.
- **`make validate`**: Validate the Rasa configuration and training data.
- **`make help`**: Display help information with available targets.

## Contributing

Contributions are welcome! Please create a new issue or submit a pull request if you have any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

```

### Explanation:

- **Introduction**: Provides a concise overview of the Hotel Assistant Chatbot project, highlighting its purpose and technologies used.
- **Web Application Implementations**: Details the two implementations for the web interface using HTML + JS + CSS and React + Vite, linking directly to their respective GitHub repositories.
- **Updated Sections**: Ensures all sections (installation, usage, configuration, file structure, makefile commands, contributing, license) are clear and up-to-date with the latest project details.

Feel free to further customize the README to fit your specific project requirements and provide additional information as needed.
```
