# express-generate-api

**A CLI tool to quickly generate a boilerplate for your Express API project**

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## Overview

`express-generate-api` is a command-line tool that helps you kickstart your API development by generating a ready-to-use boilerplate for your Express project. The tool supports both JavaScript and TypeScript templates, so you can choose the one that best fits your development style.

When you run the command, the tool:
- Prompts you with questions to customize your project setup.
- Clones the selected template repository.
- Copies the template files into your desired project folder.
- Updates the project metadata (e.g., `package.json`) with your project name.
- Provides you with next steps for development.

## Installation

Install `express-generate-api` globally using npm:

```bash
npm install express-generate-api -g
```

## Usage

After installing the tool globally, navigate to the directory where you want your project created and run:

```bash
express-generate-api
```

You will be prompted with a few questions to customize your new project. Once completed, the tool will generate your Express API boilerplate in the specified folder.

## Templates

The tool supports two types of templates:

- **JavaScript Template:**  
  [express-api-template-js](https://github.com/amjadcp/express-api-template-js)

- **TypeScript Template:**  
  [express-api-template-ts](https://github.com/amjadcp/express-api-template-ts)

These templates provide a basic folder structure and setup for an Express API. For details on the folder structure, check out the [basic-folder-structure-node-api](https://github.com/amjadcp/basic-folder-structure-node-api) repository.

## Next Steps

Once your project has been generated, follow these steps to get started:

1. **Navigate to your project folder (if created in a separate folder):**

   ```bash
   cd your-project-name
   ```

2. **Install project dependencies:**

   ```bash
   npm install
   ```

3. **Start development:**

   - For development:

     ```bash
     npm run dev
     ```

   - For production:

     ```bash
     npm start
     ```

## Contributing

Contributions are welcome! Feel free to fork this repository, open issues, or submit pull requests if you have ideas to improve the tool.

## License

Distributed under the MIT License. See `LICENSE` for more information.
