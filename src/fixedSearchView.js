class FixedSearchView {
    constructor({ domContainer }) {
        this.#domContainer = domContainer;

        // Set text gray in input field.
        this.#domContainer.querySelector('#searchInputField').style.color = 'gray';
        
        this.#setEventListeners();
    }

    #domContainer;
    #enterHandler;
    #clickBtnClearHandler;
    #keyUpHandler;
    #inputHandler;

    show() {
        this.#domContainer.style.display = 'block';
    }

    hide() {
        this.#domContainer.style.display = 'none';
    }

    getText() {
        const userPhrase = this.#domContainer.querySelector('#searchInputField').value;
        return userPhrase;
    }

    setText(text) {
        this.#domContainer.querySelector('#searchInputField').value = text;
    }

    getRequest() {
        return this.#domContainer.querySelector('#searchInputField').value;
    }

    setTextColorInInputField(newColor) {
        this.#domContainer.querySelector('#searchInputField').style.color = newColor;
    }

    clear() {
        this.#domContainer.querySelector('#searchInputField').value = '';
    }

    focus() {
        const input = this.#domContainer.querySelector('#searchInputField');
        input.focus();            
        input.select();
        input.selectionStart = input.value.length;
    }

    bindEnter(handler) {
        this.#enterHandler = handler;
    }
    
    bindClickBtnClear(handler) {
        this.#clickBtnClearHandler = handler;
    }

    bindKeyUp(handler) {
        this.#keyUpHandler = handler;
    }

    bindInput(handler) {
        this.#inputHandler = handler; 
    }

    #handleEnter() {
        this.#enterHandler?.();
        this.setTextColorInInputField('black');
    }
    
    #handleBtnClearClick() {
        const container = this.#domContainer;

        this.#clickBtnClearHandler?.();
        this.clear();
        container.querySelector("#searchInputField").focus();
    }

    #setEventListeners() {
        const container = this.#domContainer;
        const inputField = container.querySelector('#searchInputField');
        const fixedSearchWrapper = container.querySelector('#fixedSearchWrapper');

        container.querySelector('#searchInputField').addEventListener('input', (e) => {
            const request = container.querySelector('#searchInputField').value;
            
            this.#inputHandler?.(request, e.keyCode);
            // handler(request, e.keyCode);
        });

        container.querySelector('#searchInputField').addEventListener('keyup', (e) => {
            const request = container.querySelector('#searchInputField').value;
            this.#keyUpHandler?.(request, e.keyCode);
            // handler(request, e.keyCode);
        });

        container.querySelector('#btnClear').addEventListener('click', () => {
            this.#handleBtnClearClick();
        });

        container.querySelector('#btnSearch').addEventListener('click', () => { 
            this.#handleEnter();
        });

        inputField.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') { // e.code === 'Enter' / e.keyCode === 13
                this.#handleEnter();
            }
        });

        inputField.addEventListener('input', (e) => {
            inputField.style.color = 'gray';
        });
        
        inputField.onfocus = () => {
            fixedSearchWrapper.style.boxShadow = "0px 0px 5px 1px #4285f4"; 
            fixedSearchWrapper.style.webkitBoxShadow = "0px 0px 5px 2px #4285f4";
            fixedSearchWrapper.style.mozBoxShadow = "0px 0px 5px 2px #4285f4";
        };
        
        inputField.addEventListener('focusout', () => {
            fixedSearchWrapper.style.boxShadow = null;
            fixedSearchWrapper.style.webkitBoxShadow = null;
            fixedSearchWrapper.style.mozBoxShadow = null;
        });

        container.querySelector("#btnSearch").addEventListener('click', () => {
            inputField.focus();
        });
        

        // IF mouse over input field THEN set show tooltip with text taking from input field.
        inputField.addEventListener('mouseenter', function(event) {
            this.setAttribute('title', inputField.value);
        });
    }
}

module.exports = FixedSearchView;
module.exports.default = FixedSearchView;