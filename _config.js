import lume from "https://deno.land/x/lume@v0.16.2/mod.js";

const site = lume({
  src: ".",
  dest: "_site",
});

site.ignore("README.md");

site.copy("favicon.ico");
site.copy("static");
site.copy("admin");
site.copy("_includes/assets/");

export default site;
