# fixed-search

Fixed position search bar component for the browser. Can be used as:

- **ESM module**: `import FixedSearchBootstrapper from 'fixed-search'`
- **CommonJS**: `const FixedSearchBootstrapper = require('fixed-search')`
- **Browser global** (UMD): `<script src="fixed-search.umd.js"></script>` → `window.FixedSearchBootstrapper`

## Installation

```bash
npm install fixed-search
```

## Quick Start

### As ESM module

```js
import FixedSearchBootstrapper from 'fixed-search';

const controller = await new FixedSearchBootstrapper({
    targetId: 'search-container',
    basePath: '/node_modules/fixed-search/dist/', // optional
});

controller.bindEnter((request) => {
    console.log('Search:', request);
});
```

### As CommonJS class

```js
const FixedSearchBootstrapper = require('fixed-search');

const controller = await new FixedSearchBootstrapper({
    targetId: 'search-container',
});

controller.setText('initial query');
```

### As browser class (UMD)

```html
<div id="search-container"></div>

<script src="/path/to/fixed-search.umd.js"></script>
<script>
    const bootstrapper = new window.FixedSearchBootstrapper({
        targetId: 'search-container',
    });

    bootstrapper.then(controller => {
        controller.bindEnter((request) => {
            console.log(request);
        });
    });
</script>
```

## Exports

| Name | Description |
|------|-------------|
| `FixedSearchBootstrapper` (default) | Main class — initializes CSS, HTML, creates View and Controller |
| `FixedSearchController` | Controls search: show/hide, setText, bindEnter, etc. |
| `FixedSearchView` | DOM work: input, buttons, events |

## Assets

The package includes static files in `dist/`:

- `dist/fixed-search.css` — styles
- `dist/index.mustache` — HTML template
- `dist/icons/` — icons (search.png, x.png, x-fat.png)

Your `basePath` should point to the `dist/` folder where `fixed-search.css` and `index.mustache` are located.

## Development

All source files are in `src/`. After making changes, run:

```bash
npm run build
```

This generates all distribution formats (`index.js`, `index.mjs`, `dist/fixed-search.umd.js`) from the source in `src/`.

## Browser Tests

A test page is included in `test/`. To run it:

1. Build the package: `npm run build`
2. Serve the folder (e.g., with `npx serve` or `python -m http.server`)
3. Open `http://localhost:8000/test/index.html` in your browser
4. Open DevTools Console to see test results

The test page includes a mock `project-asset-loader` so it works without installing the real package.


## Support ☕🤗

If you find this package useful, you can
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/eugeniouglb)

## License

MIT
