class Answer extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({mode: 'open'});
        shadow.innerHTML = `
            <style>
                input {
                    margin: 0;
                    background: white;
                    font-family: inherit;
                    font-size: inherit;
                    text-align: center;
                    color: inherit;
                    padding: .25em 1em .25em .5em;
                    border: none;
                    box-shadow: var(--shadow);
                    border-radius: 5px;
                }
                input.is-right {
                    box-shadow: 0 0 0 1px var(--correct);
                    background: none;
                }
                input.is-wrong {
                    box-shadow: 0 0 0 3px var(--error), var(--shadow);
                    color: var(--error);
                }
                .answer {
                    position: relative;
                    margin: 0 .3em;
                }
                .message {
                    position: absolute;
                    right: .5em;
                    top: 0;
                    font-size: 1.2em;
                    line-height: 1;
                }
            </style>
            <span class="answer">
                <input type="text">
                <span class="message"></span>
            </span>
        `;

        this.input = shadow.querySelector('input');
        this.input.size = this.getAttribute('size') || 8;
        this.input.placeholder = this.getAttribute('placeholder') || '...';
        this.message = shadow.querySelector('.message');
        this.input.addEventListener('focus', () => this.reset());
    }

    validate() {
        const solution = this.innerHTML;
        const value = this.input.value;

        if (value.toLowerCase() === solution.toLowerCase()) {
            this.input.classList.add('is-right');
            this.input.classList.remove('is-wrong');
            this.message.innerHTML = '👍';
            return true;
        }

        this.input.classList.remove('is-right');
        this.input.classList.add('is-wrong');
        this.message.innerHTML = '👎';
        return false;
    }

    reset() {
        this.input.classList.remove('is-right', 'is-wrong');
        this.message.innerHTML = '';
    }
}

customElements.define('e-answer', Answer);
