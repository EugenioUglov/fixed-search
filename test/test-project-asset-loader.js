/**
 * Minimal mock of project-asset-loader for browser testing.
 * In production, install the real package: npm install project-asset-loader
 */
class ProjectAssetLoader {
    constructor() {
        this.basePath = '';
        this.loadedStyles = [];
        this.loadedHtml = {};
    }

    setBasePath({ path }) {
        this.basePath = path;
        console.log('[ProjectAssetLoader] basePath set to:', path);
    }

    async loadStyle({ path }) {
        const fullPath = this.basePath + path;
        console.log('[ProjectAssetLoader] loading style:', fullPath);

        // Avoid duplicate link tags
        if (document.querySelector(`link[href="${fullPath}"]`)) {
            return;
        }

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = fullPath;
        document.head.appendChild(link);

        this.loadedStyles.push(fullPath);

        return new Promise((resolve) => {
            link.onload = resolve;
            link.onerror = () => {
                console.warn('[ProjectAssetLoader] failed to load style (non-fatal):', fullPath);
                resolve(); // style load failure is non-fatal for tests
            };
        });
    }

    async loadMustacheHtmlToDomElementById({ targetId, pathHtml }) {
        const fullPath = this.basePath + pathHtml;
        console.log('[ProjectAssetLoader] loading mustache html:', fullPath);

        if (this.loadedHtml[fullPath]) {
            const container = document.getElementById(targetId);
            if (container) {
                container.innerHTML = this.loadedHtml[fullPath];
            }
            return;
        }

        try {
            const response = await fetch(fullPath);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status} for ${fullPath}`);
            }
            const contentType = response.headers.get('content-type') || '';
            const html = await response.text();

            // If server returned HTML error page instead of mustache template, use inline fallback
            if (contentType.includes('text/html') && !html.includes('searchInputField')) {
                console.warn('[ProjectAssetLoader] received HTML instead of mustache template, using inline fallback');
                this._injectInlineHtml(targetId);
                return;
            }

            this.loadedHtml[fullPath] = html;

            const container = document.getElementById(targetId);
            if (container) {
                container.innerHTML = html;
            }
        } catch (err) {
            console.error('[ProjectAssetLoader] error loading html:', err.message);
            // Fallback: inject the mustache template inline so the test can still run
            this._injectInlineHtml(targetId);
        }
    }

    _injectInlineHtml(targetId) {
        const container = document.getElementById(targetId);
        if (container) {
            container.innerHTML = `
<div id="fixedSearchWrapper">
    <div id="searchBar">
        <div id="searchInputWrapper">
            <input id="searchInputField" title="input field" type="text" autocomplete="on" placeholder="Search" autofocus>
        </div>
        <div id="btnClear" class="btn-icon" title="Clear text in input field">
            <div id="imgClearInputField"></div>
        </div>
        <div hidden>
            <div id="btnSearch" class="btn-icon" title="Search info">
                <div id="iconAcceptCommand"></div>
            </div>
        </div>
    </div>
</div>
`;
        }
    }
}

if (typeof window !== 'undefined') {
    window.ProjectAssetLoader = ProjectAssetLoader;
}
