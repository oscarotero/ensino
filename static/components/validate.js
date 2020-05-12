class Validate extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({mode: 'open'});
        shadow.innerHTML = `
            <style>
                button {
                    margin: 0 3px;
                    background: var(--primary);
                    color: white;
                    font-family: inherit;
                    font-size: inherit;
                    font-weight: bold;
                    padding: 1em;
                    border: none;
                    box-shadow: var(--shadow);
                    border-radius: 5px;
                }
                button:hover {
                    background: var(--black);
                }
            </style>
            <p>
                <button type="button"><slot>Validate</slot></button>
            </p>
        `;

        const button = shadow.querySelector('button');

        button.addEventListener('click', () => this.getAnswers().forEach(el => el.validate()));
    }

    getAnswers() {
        let results = [];
        let stop = false;

        this.ownerDocument.querySelectorAll('e-answer, e-validate').forEach(el => {
            if (stop) {
                return;
            }

            if (el === this) {
                stop = true;
                return;
            }

            if (el.matches('e-validate')) {
                results = [];
                return;
            }

            results.push(el);
        })

        return results;
    }
}

customElements.define('e-validate', Validate);
