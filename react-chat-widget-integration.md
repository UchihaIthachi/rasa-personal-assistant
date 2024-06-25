To integrate the React Chat Widget into your project using Vite for development and webpack for bundling, follow these steps:

### 1. Install Dependencies

Install the necessary dependencies for React, Vite, webpack, and other required tools:

```bash
npm install --save react-chat-widget axios
npm install -D @babel/core @babel/preset-env @babel/preset-react babel-loader css-loader file-loader style-loader terser-webpack-plugin webpack webpack-cli
```

### 2. Create webpack Configuration

Create a `webpack.config.js` file in the root of your project with the following content:

```javascript
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: path.join(__dirname, "src/index"),
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.min.js",
    assetModuleFilename: "bundle.min.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          limit: 1000,
        },
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};
```

### 3. Update `package.json` Scripts

Update the `scripts` section in your `package.json` to include build commands for both Vite and webpack:

```json
"scripts": {
  "start": "vite",
  "build:app": "vite build",
  "build:bundle": "webpack --mode production",
  "build": "npm run build:app && npm run build:bundle"
},
```

### 4. Integrate React Chat Widget

In your React component where you want to integrate the Chat Widget (`App.js` for example):

```jsx
import React, { useEffect } from "react";
import axios from "axios";
import { Widget, addResponseMessage } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";

const App = () => {
  useEffect(() => {
    addResponseMessage("Welcome to the chatbot");
  }, []);

  const handleNewUserMessage = (newMessage) => {
    // Send the user message to Rasa server
    axios
      .post("http://localhost:5005/webhooks/rest/webhook", {
        sender: "user",
        message: newMessage,
      })
      .then((response) => {
        // Process the response from Rasa server
        if (response.data && response.data.length > 0) {
          const botResponse = response.data[0].text;
          addResponseMessage(botResponse);
        }
      })
      .catch((error) => {
        console.error("Error communicating with Rasa:", error);
      });
  };

  return (
    <div>
      <Widget
        handleNewUserMessage={handleNewUserMessage}
        profileAvatar={
          "https://avatars.dicebear.com/api/male/1.svg?background=%23000000&color=%23ffffff"
        }
        title="Welcome to the chatbot"
        subtitle="We are here to help you"
      />
    </div>
  );
};

export default App;
```

### Explanation:

- **Webpack Configuration**: Sets up webpack to bundle your React application and assets (`js`, `css`, `images`).
- **Package.json Scripts**: Defines scripts to build both the Vite development bundle (`build:app`) and the webpack production bundle (`build:bundle`).
- **React Chat Widget Integration**: Shows how to integrate the React Chat Widget into your React component. The `handleNewUserMessage` function sends user messages to your Rasa server and displays responses from the bot using `axios` for HTTP requests and `addResponseMessage` from the Chat Widget.

Make sure to adjust paths and configurations according to your project structure and specific requirements. This setup allows you to leverage the development experience of Vite while ensuring a production-ready bundle with webpack.
