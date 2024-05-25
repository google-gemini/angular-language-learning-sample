# Angular language learning sample
Developer sample written in Angular, demonstrating how to use system instruction and prompting
in the Gemini API to collaboratively and iteratively create to create quiz questions in
supported languages

<a href="https://idx.google.com/import?url=https://github.com/google-gemini/angular-language-learning-sample">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://cdn.idx.dev/btn/open_dark_32@2x.png">
  <source media="(prefers-color-scheme: light)" srcset="https://cdn.idx.dev/btn/open_light_32@2x.png">
  <img height="32" alt="Open in IDX" src="https://cdn.idx.dev/btn/open_purple_32@2x.png">
</picture>
</a>

## Setup & Getting Started
This example uses [Angular](http://angular.dev) and [Gemini API](http://ai.google.dev).

### Before you start
Your system needs to be configured to run [Angular](https://angular.dev/tools/cli/setup-local#dependencies).

You need Gemini API key in order to run this demo. Here's how:
1. Launch [Google AI Studio](https://aistudio.google.com/)
1. Click "Get API Key"

> Caution: **Using the Google AI SDK for JavaScript directly from a client-side
app is recommended for prototyping only.** For non-prototyping use cases, we
strongly recommend that you call the Google AI Gemini API only server-side to
keep your API key safe. If you embed your API key directly in your JavaScript
app or fetch it remotely at runtime, you risk potentially exposing your API key
to malicious actors.

### Getting the code
You have two options to get this code:
* [Open it in IDX](https://idx.google.com/import?url=https://github.com/google-gemini/angular-language-learning-sample)
* Clone this repo to your local machine.

### Configure your environment
To run this application, you can either
* hard code your API key in `server.ts`
* set it as an environment variable called `API_KEY`


### Starting the application
> Note: Do not use `ng serve` as this sample uses server side rendering (SSR).
1. Build the example with `ng build`
2. Run the demo with `npm start`
3. Navigate to `http://localhost:4000/`

That's it, have fun!

### Making local changes
> Note: Do not use `ng serve` as this sample uses server side rendering (SSR).
1. Update the files.
2. Stop the server
3. Run `ng build`
4. Run `npm start`