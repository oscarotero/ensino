const themes = [
  ["#fff", "#340e09"],
  ["#a2a8f0", "#432452"],
  ["#d11046", "#cffafa"],
  ["#dbc173", "#3f5056"],
  ["#cce69a", "#353224"],
  ["#0c44dd", "#f7c843"],
  ["#ba7e4c", "#020168"],
  ["#751084", "#2ce1d7"],
  ["#286a37", "#bdf6b0"],
  ["#b1bac2", "#463507"],
  ["#d5de62", "#9f1458"],
];
class Tag extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });
    const desc = this.hasAttribute("desc")
      ? `<em>${this.getAttribute("desc")}</em>`
      : "";
    shadow.innerHTML = `
            <style>
                .tag {
                    font-size: 1.6em;
                    font-weight: bold;
                    padding: .3em;
                    border-radius: 3px;
                    display: inline-block;
                    line-height: 1.3;
                    margin: 0;
                    text-align: center;
                }
                .tag em {
                    display: block;
                    font-size: .6em;
                    font-style: normal;
                    font-weight: normal;
                }
            </style>
            <span class="tag">
                <slot></slot>
                ${desc}
            </span>
        `;

    const theme = themes[this.getAttribute("color") || 0];
    const tag = shadow.querySelector(".tag");

    tag.style.color = theme[1];
    tag.style.backgroundColor = theme[0];
  }
}

customElements.define("e-tag", Tag);
