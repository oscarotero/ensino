import htm from "https://unpkg.com/htm?module";
import format from "https://unpkg.com/date-fns@2.7.0/esm/format/index.js?module";

const html = htm.bind(h);

// Preview component for a Post
const Post = createClass({
  render() {
    const entry = this.props.entry;

    return html`
      <main>
        <article>
          <header>
            <h1>${entry.getIn(["data", "title"], null)}</h1>
            <p class="big">${entry.getIn(["data", "summary"], "")}</p>
          </header>

          ${this.props.widgetFor("body")}
        </article>
      </main>
    `;
  }
});

export default Post;
