import { newE2EPage } from '@stencil/core/testing';

import { groupingData } from './mocked-data';

const rowSelector = 'kup-data-table >>> table > tbody > tr';
const rowExpanderSelector = 'kup-data-table >>> table > tbody > tr.group icon';
const sortIconSelector = 'kup-data-table >>> table thead .column-sort icon';

describe('kup-data-table with single grouping', () => {
    it('visible group and expansion', async () => {
        const page = await newE2EPage();

        await page.setContent(
            '<kup-data-table global-filter></kup-data-table>'
        );
        const element = await page.find('kup-data-table');

        element.setProperty('data', groupingData);
        element.setProperty('groups', [{ column: 'FLD0', visible: true }]);

        await page.waitForChanges();

        // TODO test header (number of columns)

        let rows = await page.findAll(rowSelector);

        expect(rows).toHaveLength(5);

        // all group rows
        rows.forEach(async (row) => {
            expect(row).toHaveClass('group');

            const cells = await row.findAll('td');

            expect(cells).toHaveLength(1);

            expect(cells[0]).toEqualAttribute('colspan', '10');

            const expandIcon = await cells[0].find('icon.mdi');

            expect(expandIcon).toHaveClasses(['mdi', 'mdi-chevron-down']);
        });

        // expanding first group
        let icon = await page.find(rowExpanderSelector);

        await icon.click();

        await page.waitForChanges();

        rows = await page.findAll(rowSelector);

        expect(rows).toHaveLength(15);

        // testing some rows...
        for (let i = 0; i <= 2; i++) {
            const row = rows[i];

            const cells = await row.findAll('td');

            if (i == 0) {
                // grouping
                expect(cells).toHaveLength(1);

                expect(cells[0]).toEqualAttribute('colspan', '10');

                const expandIcon = await cells[0].find('icon.mdi');

                expect(expandIcon).toHaveClasses(['mdi', 'mdi-chevron-right']);
            } else {
                // normal row
                expect(cells).toHaveLength(10);
            }
        }

        // collapsing group
        icon = await page.find(rowExpanderSelector);

        await icon.click();

        await page.waitForChanges();

        rows = await page.findAll(rowSelector);

        expect(rows).toHaveLength(5);

        rows.forEach((r) => expect(r).toHaveClass('group'));
    });

    it('hidden group and expansion', async () => {
        const page = await newE2EPage();

        await page.setContent(
            '<kup-data-table global-filter></kup-data-table>'
        );
        const element = await page.find('kup-data-table');

        element.setProperty('data', groupingData);
        element.setProperty('groups', [{ column: 'FLD0', visible: false }]);

        await page.waitForChanges();

        let rows = await page.findAll(rowSelector);

        expect(rows).toHaveLength(5);

        // all group rows
        rows.forEach(async (row) => {
            expect(row).toHaveClass('group');

            const cells = await row.findAll('td');

            expect(cells).toHaveLength(1);

            expect(cells[0]).toEqualAttribute('colspan', '9');

            const expandIcon = await cells[0].find('icon.mdi');

            expect(expandIcon).toHaveClasses(['mdi', 'mdi-chevron-down']);
        });

        // expanding first group
        let icon = await page.find(rowExpanderSelector);

        await icon.click();

        await page.waitForChanges();

        rows = await page.findAll(rowSelector);

        expect(rows).toHaveLength(15);

        // testing some rows...
        for (let i = 0; i <= 2; i++) {
            const row = rows[i];

            const cells = await row.findAll('td');

            if (i == 0) {
                // grouping
                expect(cells).toHaveLength(1);

                expect(cells[0]).toEqualAttribute('colspan', '9');

                const expandIcon = await cells[0].find('icon.mdi');

                expect(expandIcon).toHaveClasses(['mdi', 'mdi-chevron-right']);
            } else {
                // normal row
                expect(cells).toHaveLength(9);
            }
        }
    });

    it('expand group and sort column', async () => {
        const page = await newE2EPage();

        await page.setContent(
            '<kup-data-table global-filter></kup-data-table>'
        );
        const element = await page.find('kup-data-table');

        element.setProperty('data', groupingData);
        element.setProperty('groups', [{ column: 'FLD0', visible: false }]);

        await page.waitForChanges();

        // expanding first group
        let icon = await page.find(rowExpanderSelector);

        await icon.click();

        await page.waitForChanges();

        // testing sort icons
        const sortIcon = await page.find(sortIconSelector);

        await sortIcon.click();

        await page.waitForChanges();
    });
});
