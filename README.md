# The Solution Architect's Handbook

This repository contains the source code for "The Solution Architect's Handbook," a Docusaurus-based website with documentation and resources for Solution Architects working with Rossum.ai.

The tagline for this handbook is: "Build something cool with Rossum.ai and @mrtnzlml".

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have [Yarn](https://yarnpkg.com/) installed on your machine.

### Installation

1.  Clone the repo:
    ```sh
    git clone https://github.com/mrtnzlml/rossum-sa-handbook.git
    ```
2.  Install YARN packages:
    ```sh
    yarn
    ```

### Running the development server

To start the development server, run:

```sh
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Running Tests

This project uses [Playwright](https://playwright.dev/) for end-to-end testing. To run the tests, use the following command:

```sh
yarn playwright test
```

You can also open the Playwright UI to view and debug tests:

```sh
yarn playwright test --ui
```

## Building and Serving Locally

To create a static build of the website, run:

```sh
yarn build
```

This command generates static content into the `build` directory.

You can serve the built site locally using:

```sh
yarn serve
```

This is a great way to check the production build before deploying.

## Deployment

This website is deployed to GitHub Pages. The deployment is handled automatically by a GitHub Actions workflow.

You can also trigger a manual deployment by running:

```sh
yarn deploy
```

## Content Management

### Archiving and Deprecating Pages

When a page is no longer relevant, it should be archived. Follow these steps:

1.  Use the `<Deprecated />` tag on the relevant page(s).
2.  Move the page into the `docs/learn/deprecated` folder.
3.  Adjust any broken links and imports.
4.  Add a `slug` to the [front matter](https://docusaurus.io/docs/create-doc#doc-front-matter) to remove the `/deprecated/` path from the URL for backwards compatibility. For example: `slug: /my-old-url`.

### Collecting All Documentation

For tasks that require all documentation content in a single file (like training AI models), you can use this handy script:

```bash
find ./docs ./cookbook -name "*.md" | xargs cat > ./all_handbook_content.txt
```

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

The documentation source files are located in the `/docs` directory. You can edit them directly in GitHub by clicking the "Edit this page" link at the bottom of each documentation page, or by navigating to the file in the repository. The edit URL is configured as: `https://github.com/mrtnzlml/rossum-sa-handbook/tree/master/`.
