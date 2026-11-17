const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, 'src');
const DIST = path.join(__dirname, 'dist');

function read(file) {
    return fs.readFileSync(path.join(SRC, file), 'utf8');
}

// Generate dist/fixed-search.umd.js (browser bundle)
const controllerSrc = read('fixedSearchController.js')
    .replace(/module\.exports = FixedSearchController;/, '')
    .replace(/module\.exports\.default = FixedSearchController;/g, '');

const viewSrc = read('fixedSearchView.js')
    .replace(/module\.exports = FixedSearchView;/, '')
    .replace(/module\.exports\.default = FixedSearchView;/g, '');

let bootstrapperSrc = read('bootstrapper.js')
    .replace(/const FixedSearchView = require\('\.\/fixedSearchView'\);/g, '')
    .replace(/const FixedSearchController = require\('\.\/fixedSearchController'\);/g, '')
    .replace(/module\.exports = FixedSearchBootstrapper;/, '')
    .replace(/module\.exports\.default = FixedSearchBootstrapper;/g, '')
    .replace(/module\.exports\.FixedSearchController = FixedSearchController;/g, '')
    .replace(/module\.exports\.FixedSearchView = FixedSearchView;/g, '');

const umd = `/**
 * fixed-search — UMD build for browser <script src="...">
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.fixedSearch = factory();
    }
})(typeof self !== 'undefined' ? self : this, function () {
    const FEATURE_BASE_PATH = (function () {
        if (typeof document !== 'undefined' && document.currentScript) {
            return document.currentScript.src.substring(
                0,
                document.currentScript.src.lastIndexOf('/') + 1
            );
        }
        return '';
    })();

${controllerSrc}

${viewSrc}

${bootstrapperSrc}

    if (typeof window !== 'undefined') {
        window.FixedSearchBootstrapper = FixedSearchBootstrapper;
        window.FixedSearchController = FixedSearchController;
        window.FixedSearchView = FixedSearchView;
    }

    return {
        FixedSearchBootstrapper,
        FixedSearchController,
        FixedSearchView,
        default: FixedSearchBootstrapper,
    };
});
`;

fs.writeFileSync(path.join(DIST, 'fixed-search.umd.js'), umd);

console.log('Build complete!');