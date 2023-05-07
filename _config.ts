import lume from "lume/mod.ts";
import slugifyUrls from "lume/plugins/slugify_urls.ts";
import inline from "lume/plugins/inline.ts";
import pagefind from "lume/plugins/pagefind.ts";
import netlifyCms from "lume/plugins/netlify_cms.ts";
import toc from "https://deno.land/x/lume_markdown_plugins@v0.5.0/toc.ts";

const site = lume({
  src: ".",
  dest: "_site",
  location: new URL("https://laurarubio.net/"),
});

site.ignore("README.md")
  .use(slugifyUrls())
  .use(inline())
  .use(pagefind())
  .use(netlifyCms({
    netlifyIdentity: true,
    previewStyle: "admin/admin.css",
  }))
  .use(toc())
  .copy("admin")
  .copy("admin.css", "admin/admin.css")
  .copy("favicon.ico")
  .copy("css")
  .copy("img")
  .copy("js");

export default site;
