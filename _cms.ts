import lume from "cms/adapters/lume.ts";
import site from "./_config.ts";

import {} from "./posts/_data.js"; // temporal hack

const app = await lume({ site });

app.storage("fs");

app.collection(
  "posts",
  "fs:posts/*.md",
  [
    "title: text",
    "summary: textarea",
    "tags: list",
    "image: file",
    "draft: checkbox",
    "show_toc: checkbox",
    "content: markdown",
  ],
);

app.collection("paxinas", "fs:pages", [
  "title: text",
  "url: text",
  "content: markdown",
]);

app.collection("categorías", "fs:categories", [
  "title: text",
  "id: text",
  "tags: list",
]);

app.upload("imaxes", "fs:img");

app.serve();
