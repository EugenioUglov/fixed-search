/**
 * fixed-search — CommonJS entry point (require)
 * Usage: const FixedSearchBootstrapper = require('fixed-search')
 */

const FixedSearchBootstrapper = require('./src/bootstrapper');
const FixedSearchController = require('./src/fixedSearchController');
const FixedSearchView = require('./src/fixedSearchView');

(function () {
    const FEATURE_BASE_PATH = (function () {
        if (typeof document !== 'undefined' && document.currentScript) {
            return document.currentScript.src.substring(
                0,
                document.currentScript.src.lastIndexOf('/') + 1
            );
        }
        return '';
    })();

    if (typeof window !== 'undefined') {
        window.FixedSearchBootstrapper = FixedSearchBootstrapper;
        window.FixedSearchController = FixedSearchController;
        window.FixedSearchView = FixedSearchView;
    }
})();

module.exports = FixedSearchBootstrapper;
module.exports.FixedSearchBootstrapper = FixedSearchBootstrapper;
module.exports.FixedSearchController = FixedSearchController;
module.exports.FixedSearchView = FixedSearchView;
