import {
    Component,
    Event,
    EventEmitter,
    Prop,
    State,
    Watch,
    JSXElements,
} from '@stencil/core';

import {
    Column,
    PaginatorPos,
    SortMode,
    SortObject,
    Row,
    TotalMode,
    GenericMap,
    GroupObject,
} from './ketchup-data-table-declarations';

import { filterRows, groupRows, sortRows } from './ketchup-data-table-helper';

import numeral from 'numeral';

@Component({
    tag: 'kup-data-table',
    styleUrl: 'ketchup-data-table.scss',
    shadow: true,
})
export class KetchupDataTable {
    @Prop() data: { columns?: Array<Column>; rows?: Array<Row> };

    @Prop()
    showFilters = false;

    @Prop({ mutable: true })
    filters: GenericMap = {};

    @Prop()
    totals: {
        [index: string]: TotalMode;
    };

    @Prop()
    globalFilter = false;

    @Prop()
    sortEnabled = true;

    @Prop({ mutable: true })
    sort: Array<SortObject> = [];

    @Prop()
    rowsPerPage = 10;

    @Prop()
    paginatorPos: PaginatorPos = PaginatorPos.TOP;

    @Prop()
    columnsWidth: Array<{
        column: string;
        width: number;
    }> = [];

    @Prop()
    showHeader = true;

    @Prop()
    showGrid = true;

    @Prop()
    selectRow: number;

    @Prop()
    groups: Array<GroupObject> = [];

    @State()
    private globalFilterValue = '';

    @State()
    private currentPage = 1;

    @State()
    private currentRowsPerPage = 10;

    @State()
    private selectedRow: Row = null;

    @State()
    private groupState: {
        [index: string]: {
            expanded: boolean;
        };
    } = {};

    @Watch('rowsPerPage')
    rowsPerPageHandler(newValue: number) {
        this.currentRowsPerPage = newValue;
    }

    /**
     * When a row is selected
     */
    @Event({
        eventName: 'kupRowSelected',
        composed: true,
        cancelable: false,
        bubbles: true,
    })
    kupRowSelected: EventEmitter<{ row: Row }>;

    // lifecycle
    componentWillLoad() {
        this.rowsPerPageHandler(this.rowsPerPage);

        if (this.selectRow && this.selectRow > 0) {
            const sortedRows = this.sortRows(this.getFilteredRows());

            if (this.selectRow <= sortedRows.length) {
                this.selectedRow = sortedRows[this.selectRow - 1];
                this.kupRowSelected.emit({ row: this.selectedRow });
            }
        }
    }

    private getColumns(): Array<Column> {
        return this.data && this.data.columns
            ? this.data.columns
            : [{ title: '', name: '', size: 0 }];
    }

    private getVisibleColumns(): Array<Column> {
        const columns = this.getColumns();

        // check grouping
        if (this.isGrouping()) {
            // filtering column based on group visibility
            return columns.filter((column) => {
                // check if in group
                let group = null;
                for (let i = 0; i < this.groups.length; i++) {
                    const currentGroup = this.groups[i];

                    if (currentGroup.column === column.name) {
                        group = currentGroup;
                        break;
                    }
                }

                if (group) {
                    // return true if
                    // 1) group obj has not the 'visible' property or
                    // 2) group has 'visible' property and it is true
                    return !group.hasOwnProperty('visible') || group.visible;
                }

                // not in group -> visible
                return true;
            });
        }

        return columns;
    }

    private getRows(): Array<Row> {
        return this.data && this.data.rows ? this.data.rows : [];
    }

    private isGrouping() {
        return this.groups && this.groups.length > 0;
    }

    private getFilteredRows(): Array<any> {
        return filterRows(
            this.getRows(),
            this.filters,
            this.globalFilterValue,
            this.getVisibleColumns().map((c) => c.name)
        );
    }

    private onColumnSort(e: MouseEvent) {
        const columnName: string = (e.target as HTMLElement).dataset.col;

        // check if columnName is already in sort array
        let i = 0;
        for (; i < this.sort.length; i++) {
            const sortObj = this.sort[i];
            if (sortObj.column === columnName) {
                break;
            }
        }

        if (i < this.sort.length) {
            // already in array... switching sort
            const sortObj = this.sort[i];

            const newSortObj: SortObject = {
                ...sortObj,
                sortMode:
                    sortObj.sortMode === SortMode.A ? SortMode.D : SortMode.A,
            };

            if (e.ctrlKey) {
                const newSort = [...this.sort];
                newSort[i] = newSortObj;
                this.sort = newSort;
            } else {
                this.sort = [newSortObj];
            }
        } else {
            const sortObj: SortObject = {
                column: columnName,
                sortMode: SortMode.A,
            };

            // if CTRL is pressed, push to array
            // else, replace current array
            if (e.ctrlKey) {
                this.sort = [...this.sort, sortObj];
            } else {
                this.sort = [sortObj];
            }
        }
    }

    private onFilterChange(event: CustomEvent) {
        // resetting current page
        this.currentPage = 1;

        // getting column name from data-col
        const columnName = (event.target as HTMLElement).dataset.col;

        const newFilters = { ...this.filters };
        if (event.detail.value.length === 0) {
            delete newFilters[columnName];
        } else {
            newFilters[columnName] = event.detail.value;
        }

        this.filters = newFilters;
    }

    private onGlobalFilterChange(event: CustomEvent) {
        // resetting current page
        this.currentPage = 1;

        this.globalFilterValue = event.detail.value;
    }

    private groupRows(rows: Array<any>): Array<Row> {
        if (!this.isGrouping()) {
            return rows;
        }

        const groupedRows = groupRows(rows, this.groups);

        this.adjustGroupState(groupedRows);

        return groupedRows;
    }

    private adjustGroupState(rows: Array<Row>): void {
        if (!rows || rows.length === 0 || !rows[0].hasOwnProperty('group')) {
            // no grouping
            return;
        }

        rows.forEach((r) => this.adjustGroupStateFromRow(r));
    }

    private adjustGroupStateFromRow(row: Row): void {
        if (!row || !row.hasOwnProperty('group')) {
            // not a groping row, nothing to do
            return;
        }

        const group = row.group;

        // check if already in group state
        let groupFromState = this.groupState[group.label];

        if (!groupFromState) {
            // add to state
            this.groupState[group.label] = group;
        } else {
            // update expanded
            group.expanded = groupFromState.expanded;
        }

        group.children.forEach((child) => this.adjustGroupStateFromRow(child));
    }

    private sortRows(rows: Array<any>): Array<any> {
        return sortRows(rows, this.sort);
    }

    private paginateRows(rows: Array<any>): Array<any> {
        const start =
            this.currentPage * this.currentRowsPerPage -
            this.currentRowsPerPage;

        return rows.slice(start, start + this.currentRowsPerPage);
    }

    private getSortIcon(columnName: string): string {
        // check if column in sort array
        for (let i = 0; i < this.sort.length; i++) {
            const sortObj = this.sort[i];

            if (sortObj.column === columnName) {
                return 'A' === sortObj.sortMode
                    ? 'mdi-sort-ascending'
                    : 'mdi-sort-descending';
            }
        }

        // default
        return 'mdi-sort';
    }

    private handlePageChanged({ detail }) {
        this.currentPage = detail.newPage;
    }

    private handleRowsPerPageChanged({ detail }) {
        this.currentRowsPerPage = detail.newRowsPerPage;
    }

    private onRowClick(row: Row) {
        this.kupRowSelected.emit({ row });
        this.selectedRow = row;
    }

    private onRowExpand(row: Row) {
        // row should be a 'group' row
        row.group.expanded = !row.group.expanded;

        // updating group map
        this.groupState[row.group.label].expanded = row.group.expanded;

        // forcing rendering... meh
        this.groupState = { ...this.groupState };
    }

    // render methods
    private renderHeader() {
        const hasCustomColumnsWidth = this.columnsWidth.length > 0;

        const dataColumns = this.getVisibleColumns().map((column) => {
            // filter
            let filter = null;
            if (this.showFilters) {
                let filterValue = '';
                if (this.filters && this.filters[column.name]) {
                    filterValue = this.filters[column.name];
                }

                filter = (
                    <div>
                        <kup-text-input
                            initialValue={filterValue}
                            data-col={column.name}
                            onKetchupTextInputUpdated={(e) => {
                                this.onFilterChange(e);
                            }}
                        />
                    </div>
                );
            }

            // sort
            let sort = null;
            if (this.sortEnabled) {
                sort = (
                    <span class="column-sort">
                        <icon
                            class={'mdi ' + this.getSortIcon(column.name)}
                            data-col={column.name}
                            onClick={(e: MouseEvent) => this.onColumnSort(e)}
                        />
                    </span>
                );
            }

            let thStyle = null;
            if (hasCustomColumnsWidth) {
                for (let i = 0; i < this.columnsWidth.length; i++) {
                    const currentCol = this.columnsWidth[i];

                    if (currentCol.column === column.name) {
                        const width = currentCol.width.toString() + 'px';
                        thStyle = {
                            width,
                            minWidth: width,
                            maxWidth: width,
                        };
                        break;
                    }
                }
            }

            return (
                <th style={thStyle}>
                    <span class="column-title">{column.title}</span>
                    {sort}
                    {filter}
                </th>
            );
        });

        return dataColumns;
    }

    renderFooter(
        rows: Array<Row>
    ): JSXElements.HTMLAttributes<HTMLTableSectionElement> | null {
        if (!this.totals) {
            // no footer
            return null;
        }

        const keys = Object.keys(this.totals);

        const footerRow = {};

        // if there are only COUNT, no need to loop on rows
        let onlyCount =
            keys.length === 0 ||
            keys.every((key) => this.totals[key] === TotalMode.COUNT);

        if (onlyCount) {
            keys.forEach((columnName) => (footerRow[columnName] = rows.length));
        } else {
            rows.forEach((r) => {
                keys.filter(
                    (key) => TotalMode.COUNT !== this.totals[key]
                ).forEach((key) => {
                    // getting column
                    const cell = r.cells[key];

                    // check if number
                    if (cell.obj.t === 'NR') {
                        const cellValue = numeral(cell.obj.k);

                        const currentFooterValue = footerRow[key] || 0;

                        footerRow[key] = cellValue
                            .add(currentFooterValue)
                            .value();
                    }
                });
            });

            // fixing count and avg
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];

                if (this.totals[key] === TotalMode.AVARAGE) {
                    const sum: number = footerRow[key];

                    if (sum && rows.length > 0) {
                        footerRow[key] = numeral(sum)
                            .divide(rows.length)
                            .value();
                    }
                } else if (this.totals[key] === TotalMode.COUNT) {
                    footerRow[key] = rows.length;
                }
            }
        }

        const footerCells = this.getVisibleColumns().map(({ name }) => (
            <td>{footerRow[name]}</td>
        ));

        const footer = (
            <tfoot>
                <tr>{footerCells}</tr>
            </tfoot>
        );

        return footer;
    }

    private renderRow(row: Row, level = 0) {
        const visibleColumns = this.getVisibleColumns();

        if (row.group) {
            if (row.group.children.length === 0) {
                // empty group
                return null;
            }

            let icon =
                'mdi mdi-chevron-' + (row.group.expanded ? 'right' : 'down');

            const jsxRows = [];

            let indent = [];
            for (let i = 0; i < level; i++) {
                indent.push(<span class="indent" />);
            }

            jsxRows.push(
                <tr class="group">
                    <td colSpan={visibleColumns.length}>
                        {indent}
                        <icon
                            class={icon}
                            onClick={() => this.onRowExpand(row)}
                        />
                        {row.group.label}
                    </td>
                </tr>
            );

            // if group is expanded, add children
            if (row.group.expanded) {
                row.group.children
                    .map((r) => {
                        return this.renderRow(r, level + 1);
                    })
                    .forEach((jsxRow) => {
                        if (Array.isArray(jsxRow)) {
                            jsxRow.forEach((jr) => jsxRows.push(jr));
                        } else {
                            jsxRows.push(jsxRow);
                        }
                    });
            }

            // grouping row
            return jsxRows;
        } else {
            const cells = visibleColumns.map(({ name }, index) => {
                let indend = [];
                if (index === 0) {
                    for (let i = 0; i < level; i++) {
                        indend.push(<span class="indent" />);
                    }
                }

                return (
                    <td>
                        {indend}
                        {row.cells[name].value}
                    </td>
                );
            });

            let rowClass = null;
            if (this.selectedRow === row) {
                rowClass = 'selected';
            }

            return (
                <tr class={rowClass} onClick={() => this.onRowClick(row)}>
                    {cells}
                </tr>
            );
        }
    }

    render() {
        // header
        const header = this.renderHeader();

        // rows
        // 1) filters
        const filteredRows = this.getFilteredRows();

        // 2) footer (based on filtered rows)
        const footer = this.renderFooter(filteredRows);

        // 3) grouping
        const grouped = this.groupRows(filteredRows);

        // 4) sort
        const sortedRows = this.sortRows(grouped);

        // 5) pagination
        const paginatedRows = this.paginateRows(sortedRows);

        let rows = null;
        if (paginatedRows.length === 0) {
            rows = (
                <tr>
                    <td colSpan={this.getVisibleColumns().length}>
                        Empty data
                    </td>
                </tr>
            );
        } else {
            rows = [];
            paginatedRows
                .map((row: Row) => this.renderRow(row))
                .forEach((jsxRow) => {
                    if (Array.isArray(jsxRow)) {
                        jsxRow.forEach((jr) => rows.push(jr));
                    } else {
                        rows.push(jsxRow);
                    }
                });
        }

        let globalFilter = null;
        if (this.globalFilter) {
            globalFilter = (
                <div id="globalFilter">
                    <kup-text-input
                        label="Global filter"
                        onKetchupTextInputUpdated={(event) =>
                            this.onGlobalFilterChange(event)
                        }
                    />
                </div>
            );
        }

        let paginatorTop = null;
        if (
            PaginatorPos.TOP === this.paginatorPos ||
            PaginatorPos.BOTH === this.paginatorPos
        ) {
            paginatorTop = (
                <kup-paginator
                    max={filteredRows.length}
                    perPage={this.rowsPerPage}
                    selectedPerPage={this.currentRowsPerPage}
                    currentPage={this.currentPage}
                    onKupPageChanged={(e) => this.handlePageChanged(e)}
                    onKupRowsPerPageChanged={(e) =>
                        this.handleRowsPerPageChanged(e)
                    }
                />
            );
        }

        let paginatorBottom = null;
        if (
            PaginatorPos.BOTTOM === this.paginatorPos ||
            PaginatorPos.BOTH === this.paginatorPos
        ) {
            paginatorBottom = (
                <kup-paginator
                    max={filteredRows.length}
                    perPage={this.rowsPerPage}
                    selectedPerPage={this.currentRowsPerPage}
                    currentPage={this.currentPage}
                    onKupPageChanged={(e) => this.handlePageChanged(e)}
                    onKupRowsPerPageChanged={(e) =>
                        this.handleRowsPerPageChanged(e)
                    }
                />
            );
        }

        let tableClass = null;
        if (!this.showGrid) {
            tableClass = 'noGrid';
        }

        return (
            <div>
                {paginatorTop}
                {globalFilter}
                <div id="data-table-wrapper">
                    <table class={tableClass}>
                        <thead hidden={!this.showHeader}>
                            <tr>{header}</tr>
                        </thead>
                        <tbody>{rows}</tbody>
                        {footer}
                    </table>
                </div>
                {paginatorBottom}
            </div>
        );
    }
}
