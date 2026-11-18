/**
 * Browser test suite for fixed-search component.
 * Opens test/index.html in a browser and checks the console for results.
 */

(function () {
    let passed = 0;
    let failed = 0;

    function assert(condition, message) {
        if (condition) {
            console.log('✓ PASS:', message);
            passed++;
        } else {
            console.error('✗ FAIL:', message);
            failed++;
        }
    }

    // Wait for an element to appear in the DOM (with timeout)
    async function waitForElement(selector, timeoutMs = 5000) {
        const start = Date.now();
        while (Date.now() - start < timeoutMs) {
            const el = document.querySelector(selector);
            if (el) return el;
            await new Promise((r) => setTimeout(r, 100));
        }
        return null;
    }

    async function runTests() {
        console.log('\n=== fixed-search Browser Tests ===\n');

        // Wait for component scripts to load
        await new Promise((resolve) => setTimeout(resolve, 500));

        const container = await waitForElement('#search-container');

        // Test 1: Container exists
        assert(!!container, 'search-container element exists in DOM');

        // Test 2: Component initialized (window globals exist)
        assert(typeof window.FixedSearchBootstrapper !== 'undefined', 'FixedSearchBootstrapper is exposed on window');
        assert(typeof window.FixedSearchController !== 'undefined', 'FixedSearchController is exposed on window');
        assert(typeof window.FixedSearchView !== 'undefined', 'FixedSearchView is exposed on window');

        // Test 3: Initialize component (this injects mustache HTML into container)
        let controller;
        let input;
        let btnSearch;
        let btnClear;
        try {
            controller = await new window.FixedSearchBootstrapper({
                targetId: 'search-container',
                basePath: '../dist/',
            });
            assert(!!controller, 'FixedSearchBootstrapper initialized and returned controller');
        } catch (err) {
            console.error('Initialization error:', err);
            assert(false, 'FixedSearchBootstrapper initialized without error');
        }

        // After init, wait for mustache-injected elements
        input = await waitForElement('#searchInputField');
        btnSearch = await waitForElement('#btnSearch');
        btnClear = await waitForElement('#btnClear');

        // Test 4: Input field exists (loaded from mustache template)
        assert(!!input, 'searchInputField element exists');

        // Test 5: Controller has expected methods
        assert(typeof controller.show === 'function', 'controller.show is a function');
        assert(typeof controller.hide === 'function', 'controller.hide is a function');
        assert(typeof controller.setText === 'function', 'controller.setText is a function');
        assert(typeof controller.clear === 'function', 'controller.clear is a function');
        assert(typeof controller.bindEnter === 'function', 'controller.bindEnter is a function');

        // Test 6: setText / getText
        if (controller && input) {
            controller.setText('hello world');
            assert(input.value === 'hello world', 'setText updates input value');

            const text = input.value;
            assert(text === 'hello world', 'input value matches set text');

            // Test 7: clear
            controller.clear();
            assert(input.value === '', 'clear empties the input');

            // Test 8: show / hide
            controller.hide();
            assert(container.style.display === 'none', 'hide sets display to none');

            controller.show();
            assert(container.style.display === 'block', 'show sets display to block');
        }

        // Test 9: bindEnter triggers handler on Enter key
        if (controller && input) {
            let enterCalled = false;
            controller.bindEnter(() => {
                enterCalled = true;
            });

            // Simulate Enter key
            const enterEvent = new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter' });
            input.dispatchEvent(enterEvent);

            // Also test btnSearch click
            if (btnSearch) {
                btnSearch.click();
            }

            setTimeout(() => {
                assert(enterCalled, 'bindEnter handler called on Enter / search click');
                printSummary();
            }, 300);
        } else {
            printSummary();
        }
    }

    function printSummary() {
        console.log('\n=== Test Summary ===');
        console.log('Passed:', passed);
        console.log('Failed:', failed);
        if (failed === 0) {
            console.log('🎉 All tests passed!');
        } else {
            console.log('⚠ Some tests failed.');
        }
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', runTests);
    } else {
        runTests();
    }
})();
