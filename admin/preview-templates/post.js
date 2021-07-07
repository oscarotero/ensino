import htm from "https://unpkg.com/htm?module";

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
  },
});

export default Post;
