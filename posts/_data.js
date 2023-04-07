export const layout = "layouts/exercise.njk";
export const type = "exercise";
export function url (page) {
  return `./${page.data.title}/`;
}