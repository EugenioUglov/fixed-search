const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, 'src');
const DIST = path.join(__dirname, 'dist');
const ROOT = __dirname;

function read(file) {
    return fs.readFileSync(path.join(SRC, file), 'utf8');
}

// Ensure dist/ exists
if (!fs.existsSync(DIST)) {
    fs.mkdirSync(DIST, { recursive: true });
}

// Copy CSS from root to dist/
const cssSrc = path.join(ROOT, 'style.css');
const cssDest = path.join(DIST, 'fixed-search.css');
if (fs.existsSync(cssSrc)) {
    fs.copyFileSync(cssSrc, cssDest);
    console.log('Copied style.css → dist/fixed-search.css');
}

// Copy mustache template from root to dist/
const mustacheSrc = path.join(ROOT, 'index.mustache');
const mustacheDest = path.join(DIST, 'index.mustache');
if (fs.existsSync(mustacheSrc)) {
    fs.copyFileSync(mustacheSrc, mustacheDest);
    console.log('Copied index.mustache → dist/');
}

// Copy icons from root/icons/ to dist/icons/
const iconsSrc = path.join(ROOT, 'icons');
const iconsDest = path.join(DIST, 'icons');
if (fs.existsSync(iconsSrc)) {
    if (!fs.existsSync(iconsDest)) {
        fs.mkdirSync(iconsDest, { recursive: true });
    }
    for (const file of fs.readdirSync(iconsSrc)) {
        fs.copyFileSync(path.join(iconsSrc, file), path.join(iconsDest, file));
    }
    console.log('Copied icons → dist/icons/');
}

// Generate dist/fixed-search.umd.js (browser bundle)
const controllerSrc = read('fixedSearchController.js')
    .replace(/module\.exports = FixedSearchController;/, '')
    .replace(/module\.exports\.default = FixedSearchController;/g, '');

const viewSrc = read('fixedSearchView.js')
    .replace(/module\.exports = FixedSearchView;/, '')
    .replace(/module\.exports\.default = FixedSearchView;/g, '');

// Remove require/export lines from bootstrapper source (we inline it in UMD)
let bootstrapperBody = read('bootstrapper.js')
    .replace(/const ProjectAssetLoader = require\('project-asset-loader'\);/g, '')
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
        define(['project-asset-loader'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('project-asset-loader'));
    } else {
        root.fixedSearch = factory(root.ProjectAssetLoader);
    }
})(typeof self !== 'undefined' ? self : this, function (ProjectAssetLoader) {
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

${bootstrapperBody}

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