import lume from "cms/adapters/lume.ts";
import site from "./_config.ts";
import cms from "./_cms.ts";

const app = await lume({
  site,
  cms,
});

Deno.serve(app.fetch);
