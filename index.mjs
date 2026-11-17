/**
 * fixed-search — ESM entry point (import)
 * Usage: import FixedSearchBootstrapper from 'fixed-search'
 */

import FixedSearchBootstrapper from './src/bootstrapper.js';
import FixedSearchController from './src/fixedSearchController.js';
import FixedSearchView from './src/fixedSearchView.js';

export default FixedSearchBootstrapper;
export { FixedSearchBootstrapper, FixedSearchController, FixedSearchView };

if (typeof window !== 'undefined') {
    window.FixedSearchBootstrapper = FixedSearchBootstrapper;
    window.FixedSearchController = FixedSearchController;
    window.FixedSearchView = FixedSearchView;
}
