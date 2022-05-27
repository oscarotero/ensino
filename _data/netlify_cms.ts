import f from "https://deno.land/x/netlify_cms_config@v0.1.0/mod.ts";

f.defaultRequired = false;

const categorias = f.folder("Categorías", "/categories", [
  f.string("Nombre").name("title"),
  f.string("Identificador").name("id"),
  f.relation("Categorías nas que aparece")
    .name("tags")
    .collection("categorías")
    .valueField("id")
    .displayFields(["title"])
    .searchFields(["title"])
    .multiple(),
  f.markdown("Corpo").name("body"),
])
  .create()
  .slug("{{slug}}");

const paxinas = f.folder("Páxinas", "/pages", [
  f.string("Título").name("title"),
  f.markdown("Corpo").name("body"),
])
  .create()
  .slug("{{slug}}");

const exercicios = f.folder("Exercicios", "/posts", [
  f.string("Título").name("title"),
  f.text("Sumario").name("summary"),
  f.relation("Categorías nas que aparece", categorias, "id")
    .name("tags")
    .multiple(),
  f.boolean("Ocultar").name("draft").default(false),
  f.markdown("Corpo").name("body"),
])
  .create()
  .slug("{{slug}}");

export default {
  backend: {
    name: "git-gateway",
    branch: "master",
  },
  media_folder: "img",
  public_folder: "/img",
  collections: [
    exercicios.toJSON(),
    paxinas.toJSON(),
    categorias.toJSON(),
  ],
};
