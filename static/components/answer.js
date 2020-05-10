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
                    font-size: 110%;
                    text-align: center;
                    color: inherit;
                    padding: 0;
                    border: solid 1px #0003;
                    box-shadow: inset 0 1px 3px #0002;
                    border-radius: 5px;
                }
                input:focus {
                    box-shadow: var(--shadow);
                    position: relative;
                    z-index: 2;
                }
                input:hover {
                    border-color: #0006;
                }
                input::placeholder {
                    color: var(--gray);
                }
                input.is-right {
                    box-shadow: 0 0 0 1px var(--correct);
                    background: none;
                }
                input.is-wrong {
                    box-shadow: 0 0 0 3px var(--error), var(--shadow);
                    color: var(--error);
                }
                input.is-highlight {
                    background: rgba(255,255,0,0.5);
                }
                .answer {
                    position: relative;
                    margin: 0 .3em;
                    display: inline-block;
                }
                .message {
                    position: absolute;
                    left: 100%;
                    top: .2em;
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

        if (this.hasAttribute('highlight')) {
            this.input.classList.add('is-highlight');
        }
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
