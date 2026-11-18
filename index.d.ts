/**
 * TypeScript declarations for fixed-search
 */

export interface FixedSearchBootstrapperOptions {
    targetId: string;
    basePath?: string;
}

export class FixedSearchView {
    constructor(opts: { domContainer: HTMLElement });
    show(): void;
    hide(): void;
    getText(): string;
    setText(text: string): void;
    getRequest(): string;
    setTextColorInInputField(newColor: string): void;
    clear(): void;
    focus(): void;
    bindEnter(handler: () => void): void;
    bindClickBtnClear(handler: () => void): void;
    bindKeyUp(handler: (request: string, keyCode: number) => void): void;
    bindInput(handler: (request: string, keyCode: number) => void): void;
}

export class FixedSearchController {
    constructor(opts: { view: FixedSearchView });
    show(): void;
    hide(): void;
    setText(text: string): void;
    getText(): void;
    clear(): void;
    bindKeyUp(handler: (request: string, keyCode: number) => void): void;
    bindInput(handler: (request: string, keyCode: number) => void): void;
    bindClickBtnClear(handler: () => void): void;
    bindEnter(handler: () => void): void;
}

export class FixedSearchBootstrapper {
    constructor(opts: FixedSearchBootstrapperOptions);
    init(opts: { targetId: string }): Promise<FixedSearchController>;
}

export default FixedSearchBootstrapper;
