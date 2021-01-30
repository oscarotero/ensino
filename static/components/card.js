const themes = [
  ['#fff', '#340e09'],
  ['#a2a8f0', '#432452'],
  ['#d11046', '#cffafa'],
  ['#dbc173', '#3f5056'],
  ['#cce69a', '#353224'],
  ['#0c44dd', '#f7c843'],
  ['#ba7e4c', '#020168'],
  ['#751084', '#2ce1d7'],
  ['#286a37', '#bdf6b0'],
  ['#b1bac2', '#463507'],
  ['#d5de62', '#9f1458'],
];
class Card extends HTMLElement {
  constructor() {
      super();

      const shadow = this.attachShadow({mode: 'open'});
      shadow.innerHTML = `
          <style>
              .card {
                  perspective: 1500px;
                  transform-style: preserve-3d;
                  position: relative;
                  will-change: transform;
                  display: inline-grid;
                  vertical-align: top;
                  cursor: pointer;
                  width: 18em;
                  max-width: 100%;
                  min-height: 14em;
                  margin: 0 1rem 1rem 0;
              }
              .card ::slotted(*) {
                -webkit-backface-visibility: hidden;
                backface-visibility: hidden;
                transition: .4s;
                transform-style: preserve-3d;
                padding: 1rem;
                margin: 0;
                grid-area: 1 / 1;
                border-radius: 6px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                color: var(--color);
                background-color: var(--background);
                border: solid 4px var(--background);
              }
              .card ::slotted(:hover) {
                box-shadow: 0 3px 10px 2px #0004;
              }
              .card ::slotted(:first-child) {
                font-size: 1.6em;
                font-weight: bold;
                text-align: center;
                line-height: 1.2;
              }
              .card.is-reversed ::slotted(:first-child) {
                transform: rotateY(180deg);
              }
              .card ::slotted(:last-child) {
                transform: rotateY(-180deg);
                color: #340e09;
                background-color: white;
                border-color: var(--background);
              }
              .card.is-reversed ::slotted(:last-child) {
                transform: rotateY(0);
                z-index: 3;
              }
          </style>
          <div class="card">
            <slot></slot>
          </div>
      `;

      const theme = themes[this.getAttribute('color') || 0];
      const tag = shadow.querySelector('.card');

      tag.addEventListener("click", () => {
        tag.classList.toggle("is-reversed")
      })

      tag.style.setProperty('--color', theme[1]);
      tag.style.setProperty('--background', theme[0]);
  }
}

customElements.define('e-card', Card);
