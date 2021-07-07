import lume from "lume/mod.ts";
import slugifyUrls from "lume/plugins/slugify_urls.ts";
import inline from "lume/plugins/inline.ts";

const site = lume({
  src: ".",
  dest: "_site",
  location: new URL("https://laurarubio.net/"),
});

site.ignore("README.md")
  .use(slugifyUrls())
  .use(inline())
  .copy("admin")
  .copy("favicon.ico")
  .copy("css")
  .copy("img")
  .copy("js");

export default site;
