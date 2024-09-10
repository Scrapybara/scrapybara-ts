# Scrapybara TypeScript Client

## Documentation

[Scrapybara API Documentation](https://docs.scrapybara.com/api-reference)

## Installation

```bash
npm install scrapybara
# or
yarn add scrapybara
# or
pnpm add scrapybara
# or
bun add scrapybara
```

## Usage

```typescript
import { ScrapybaraClient } from "scrapybara";

const client = new ScrapybaraClient("your-api-key");

const response = await client.generateScript({
  url: "https://news.ycombinator.com",
  command: "Scrape all posts",
});
```
