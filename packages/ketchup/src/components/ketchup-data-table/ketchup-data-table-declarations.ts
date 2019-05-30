export interface Column {
    name: string;
    title: string;
    size: number;
}

export interface Row {
    cells: {
        [index: string]: Cell;
    };

    group?: {
        column: string;
        expanded: boolean;
        label: string;
        children: Array<Row>;
    };
}

export interface Cell {
    obj: {
        t: string;
        p: string;
        k: string;
    };
    value: string;
    style?: GenericMap;
}

export interface GenericMap {
    [index: string]: string;
}

export interface SortObject {
    column: string;
    sortMode: SortMode;
}

export enum SortMode {
    A = 'A',
    D = 'D',
}

export enum TotalMode {
    COUNT = 'Count',
    SUM = 'Sum',
    AVARAGE = 'Avarage',
}

export enum PaginatorPos {
    TOP = 'Top',
    BOTTOM = 'Bottom',
    BOTH = 'Both',
}

export interface GroupObject {
    column: string;
    visible: boolean;
}
