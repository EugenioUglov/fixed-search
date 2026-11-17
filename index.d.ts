/**
 * TypeScript declarations for fixed-search
 */

export interface ProjectAssetLoader {
    setBasePath: (opts: { path: string }) => void;
    loadStyle: (opts: { path: string }) => Promise<void>;
    loadMustacheHtmlToDomElementById: (opts: { targetId: string; pathHtml: string }) => Promise<void>;
    loadJavaScript: (opts: { path: string }) => Promise<void>;
}

export interface FixedSearchBootstrapperOptions {
    projectAssetLoader: ProjectAssetLoader;
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
    init(opts: { projectAssetLoader: ProjectAssetLoader; targetId: string }): Promise<FixedSearchController>;
}

export default FixedSearchBootstrapper;
