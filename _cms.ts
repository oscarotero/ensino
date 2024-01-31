import lume from "cms/adapters/lume.ts";
import site from "./_config.ts";

const app = await lume({
  site,
  server: {
    port: 80,
  },
});

app.git("master");

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
