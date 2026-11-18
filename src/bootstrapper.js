const ProjectAssetLoader = require('project-asset-loader');
const FixedSearchView = require('./fixedSearchView');
const FixedSearchController = require('./fixedSearchController');

class FixedSearchBootstrapper {
    constructor({ targetId, basePath }) {
        this.assetLoader = new ProjectAssetLoader();
        this.basePath = basePath || FEATURE_BASE_PATH;
        return this.init({ targetId });
    }

    async init({ targetId }) {
        this.assetLoader.setBasePath({ path: this.basePath });

        const cssPromise = this.assetLoader.loadStyle({ path: 'fixed-search.css' });
        const htmlPromise = this.assetLoader.loadMustacheHtmlToDomElementById({
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