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
                padding: 0 .5em;
                border: solid 1px #0003;
            }
            select.is-right {
                box-shadow: 0 0 0 3px green;
            }
            select.is-wrong {
                box-shadow: 0 0 0 3px red;
            }
            span:not(:empty) {
                padding: .5em;
            }
        `;
        const selector = this.ownerDocument.createElement('select');
        const message = this.ownerDocument.createElement('span');

        shadow.appendChild(styles);
        shadow.appendChild(selector);
        shadow.appendChild(message);

        const options = this.innerHTML.split(',').map(option => `<option>${option.trim()}</option>`);
        selector.innerHTML = `<option></option>` + options;

        selector.addEventListener('change', ev => {
            const correct = this.getAttribute('correct');

            if (selector.value === correct) {
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