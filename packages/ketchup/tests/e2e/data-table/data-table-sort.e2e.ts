import { newE2EPage } from '@stencil/core/testing';

import { multiSortMockData, staticData } from './mocked-data';

const sortIconSelector = 'kup-data-table >>> table thead .column-sort icon';
const cellSelector = 'kup-data-table >>> table tbody > tr > td';

describe('sorting disabled', () => {
    it('sorting is disabled', async () => {
        const page = await newE2EPage();

        await page.setContent('<kup-data-table></kup-data-table>');
        const element = await page.find('kup-data-table');

        element.setProperty('data', multiSortMockData);
        element.setProperty('sortEnabled', false);

        await page.waitForChanges();

        // no sort icons
        const sortIcons = await page.findAll(sortIconSelector);
        expect(sortIcons).toHaveLength(0);
    });
});

describe('sort rows', () => {
    it('single sort', async () => {
        const page = await newE2EPage();

        await page.setContent('<kup-data-table></kup-data-table>');

        const element = await page.find('kup-data-table');
        element.setProperty('data', staticData);

        await page.waitForChanges();

        // getting all sort icons
        const sortIcons = await page.findAll(sortIconSelector);
        expect(sortIcons).toHaveLength(3);

        let cells = await page.findAll(cellSelector);
        expect(cells).toHaveLength(9);

        expect(cells[0]).toEqualText('CASFRA');
        expect(cells[3]).toEqualText('PARFRA');
        expect(cells[6]).toEqualText('DELGIO');

        await sortIcons[0].click();

        await page.waitForChanges();

        cells = await page.findAll(cellSelector);
        expect(cells).toHaveLength(9);

        expect(cells[0]).toEqualText('CASFRA');
        expect(cells[3]).toEqualText('DELGIO');
        expect(cells[6]).toEqualText('PARFRA');

        await sortIcons[0].click();

        await page.waitForChanges();

        cells = await page.findAll(cellSelector);
        expect(cells).toHaveLength(9);

        expect(cells[0]).toEqualText('PARFRA');
        expect(cells[3]).toEqualText('DELGIO');
        expect(cells[6]).toEqualText('CASFRA');
    });

    it('multi sorts rows', async () => {
        const page = await newE2EPage();

        await page.setContent('<kup-data-table></kup-data-table>');

        const element = await page.find('kup-data-table');
        element.setProperty('data', multiSortMockData);

        await page.waitForChanges();

        // getting all sort icons
        const sortIcons = await page.findAll(sortIconSelector);
        expect(sortIcons).toHaveLength(3);

        let cells = await page.findAll(cellSelector);
        expect(cells).toHaveLength(27);

        expect(cells[0]).toEqualText('CASFRA');
        expect(cells[3]).toEqualText('PARFRA');
        expect(cells[6]).toEqualText('DELGIO');

        await sortIcons[0].click();

        await page.waitForChanges();

        cells = await page.findAll(cellSelector);
        expect(cells).toHaveLength(27);

        expect(cells[0]).toEqualText('CASFRA');
        expect(cells[3]).toEqualText('CASFRA');
        expect(cells[6]).toEqualText('CASFRA');

        expect(cells[1]).toEqualText('10');
        expect(cells[4]).toEqualText('11');
        expect(cells[7]).toEqualText('12');

        // Ctrl+click on second column
        await page.keyboard.down('Control');
        await sortIcons[1].click();
        await page.keyboard.up('Control');

        await page.waitForChanges();

        cells = await page.findAll(cellSelector);
        expect(cells).toHaveLength(27);

        expect(cells[0]).toEqualText('CASFRA');
        expect(cells[3]).toEqualText('CASFRA');
        expect(cells[6]).toEqualText('CASFRA');

        expect(cells[1]).toEqualText('10');
        expect(cells[4]).toEqualText('11');
        expect(cells[7]).toEqualText('12');

        // Ctrl+click on second column
        await page.keyboard.down('Control');
        await sortIcons[1].click();
        await page.keyboard.up('Control');

        await page.waitForChanges();

        cells = await page.findAll(cellSelector);
        expect(cells).toHaveLength(27);

        expect(cells[0]).toEqualText('CASFRA');
        expect(cells[3]).toEqualText('CASFRA');
        expect(cells[6]).toEqualText('CASFRA');

        expect(cells[1]).toEqualText('12');
        expect(cells[4]).toEqualText('11');
        expect(cells[7]).toEqualText('10');
    });
});
