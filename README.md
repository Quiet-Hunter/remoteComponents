# Remote React Component

This project demonstrates how to create a React component, bundle it using Webpack, and make it accessible from GitHub Pages.

## Getting Started

### 1. Create a React Component

1. Create a new React component and save it in the `src` folder. For example, create a file named `MyNewComponent.tsx`.

### 2. Add the New Component to Webpack Configuration

1. Open the `webpack.config.js` file.
2. Add the new component to the `entry` section:

    ```javascript
    const path = require("path");

    module.exports = {
      mode: "development",
      entry: {
        ...
        MyNewComponent: "./src/MyNewComponent.tsx", // Add this line
      },
      output: {
        ...
      }
    };
    ```

### 3. Bundle the Components

1. Run the following command to bundle the components:

    ```sh
    npx webpack
    ```

### 4. Access the Bundle from GitHub Pages

1. Commit and push your changes to your GitHub repository.
2. Enable GitHub Pages in your repository settings, and set the source to the `dist` folder.
3. Access your bundled components from the GitHub Pages URL.
