const FixedSearchView = require('./fixedSearchView');
const FixedSearchController = require('./fixedSearchController');

class FixedSearchBootstrapper {
    constructor({ projectAssetLoader, targetId, basePath }) {
        this.basePath = basePath || FEATURE_BASE_PATH;
        return this.init({ projectAssetLoader, targetId });
    }

    async init({ projectAssetLoader, targetId }) {
        projectAssetLoader.setBasePath({ path: this.basePath });

        const cssPromise = projectAssetLoader.loadStyle({ path: 'style.css' });
        const htmlPromise = projectAssetLoader.loadMustacheHtmlToDomElementById({
            targetId,
            pathHtml: 'index.mustache',
        });

        await Promise.all([cssPromise, htmlPromise]);

        const domContainer = document.getElementById(targetId);
        if (!domContainer) {
            throw new Error(
                `fixed-search: element with id "${targetId}" not found in DOM`
            );
        }

        const view = new FixedSearchView({ domContainer });
        const controller = new FixedSearchController({ view });

        return controller;
    }
}

module.exports = FixedSearchBootstrapper;
module.exports.default = FixedSearchBootstrapper;