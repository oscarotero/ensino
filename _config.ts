import lume from "lume/mod.ts";
import slugifyUrls from "lume/plugins/slugify_urls.ts";
import inline from "lume/plugins/inline.ts";
import netlifyCms from "https://raw.githubusercontent.com/lumeland/experimental-plugins/main/netlifycms/mod.ts";

const site = lume({
  src: ".",
  dest: "_site",
  location: new URL("https://laurarubio.net/"),
});

site.ignore("README.md")
  .use(slugifyUrls())
  .use(inline())
  .use(netlifyCms({
    netlifyIdentity: true,
    previewStyle: "admin/admin.css",
  }))
  .copy("admin")
  .copy("admin.css", "admin/admin.css")
  .copy("favicon.ico")
  .copy("css")
  .copy("img")
  .copy("js");

export default site;
