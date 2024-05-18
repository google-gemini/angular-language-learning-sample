/*
 Copyright 2024 Google LLC

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';
import {
  GoogleGenerativeAI,
  GenerateContentRequest,
} from '@google/generative-ai';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  // Update this line to add your API_KEY if you are not using env variables
  const GEMINI_API_KEY = process.env['API_KEY'] || '';
  const commonEngine = new CommonEngine();

  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro-latest' });
  const DEFAULT_LANG = 'spanish';

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Define Express Rest API endpoints
  server.get('/api/ask-gemini', async (req, res) => {
    if (!GEMINI_API_KEY) {
      return res.status(500).send({
        message: 'Please provide an API key for Gemini, using default {$DEFAULT_LANG} translations.',
      });
    }

    let language = req.query['lang'] ? req.query['lang'] as string : DEFAULT_LANG;

    try {
      const prompt = `Your task is to generate 25 vocabulary words for learning ${language}.
      Provide the ${language} translation, with 1 correct english translation and 2 incorrect english translations. 
      
      input: generate 25 vocaulary words for learning spanish
      output: [{"phrase": "hola", "options"=["goodbye", "wait", "hello"], "answer": "hello"}, {"phrase": "adios", "options":["good morning", "see you later", "car"], "answer": "see you later"}, {"phrase": "gracias", "options":["shoes", "thank you", "comb"], "answer": "thank you"}]
      `;
      const request: GenerateContentRequest = {
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        tools: [],
      };
      const results = await model.generateContent(request);

      return res
        .status(200)
        .send({ response: results.response.text(), usingDefault: false });
    } catch (e) {
      return res.status(500).send({
        message: `Unable to generate the practice questions for ${language}, using default {$DEFAULT_LANG} translations.`,
      });
    }
  });

  // Serve static files from /browser
  server.get(
    '*.*',
    express.static(browserDistFolder, {
      maxAge: '1y',
    })
  );

  // All regular routes use the Angular engine
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
