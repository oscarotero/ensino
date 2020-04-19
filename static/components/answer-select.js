class AnswerSelect extends HTMLElement {
    connectedCallback() {
        const emojis = ['👍', '👎'];

        const shadow = this.attachShadow({mode: 'open'});
        const styles = this.ownerDocument.createElement('style');
        styles.innerHTML = `
            select {
                margin: 0 3px;
                background: white;
                font-family: inherit;
                font-size: inherit;
                color: inherit;
                padding: .25em .5em;
                border: none;
                box-shadow: var(--shadow);
                border-radius: 3px;
            }
            select.is-right {
                box-shadow: 0 0 0 3px var(--correct);
            }
            select.is-wrong {
                box-shadow: 0 0 0 3px var(--error);
                color: var(--error);
            }
            span:not(:empty) {
                padding: 0 .3em;
                transform: scale(1.5);
                display: inline-block;
            }
        `;
        const selector = this.ownerDocument.createElement('select');
        const message = this.ownerDocument.createElement('span');

        shadow.appendChild(styles);
        shadow.appendChild(selector);
        shadow.appendChild(message);

        const correct = this.innerHTML;
        const options = this.hasAttribute('options') ? (this.getAttribute('options') || '').split(',').map(option => option.trim()) : [];

        if (!options.includes(correct)) {
            options.push(correct);
        }
        options.sort();

        selector.innerHTML = `<option></option>` + options.map(option => `<option>${option}</option>`).join();

        selector.addEventListener('change', () => {
            if (!selector.value) {
                selector.classList.remove('is-wrong', 'is-right');
                message.innerHTML = '';
            } else if (selector.value === correct) {
                selector.classList.add('is-right');
                selector.classList.remove('is-wrong');
                message.innerHTML = emojis[0];
                
            } else {
                selector.classList.remove('is-right');
                selector.classList.add('is-wrong');
                message.innerHTML = emojis[1];
            }
        })
    }
}

customElements.define('answer-select', AnswerSelect);
