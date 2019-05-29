import { groupRows } from '../../../src/components/ketchup-data-table/ketchup-data-table-helper';

const rows = [
    {
        cells: {
            FLD1: {
                obj: {
                    t: '',
                    p: '',
                    k: 'Europe',
                },
                value: 'Europe',
            },
            FLD2: {
                obj: {
                    t: '',
                    p: '',
                    k: 'Italy',
                },
                value: 'Italy',
            },
            FLD3: {
                obj: {
                    t: '',
                    p: '',
                    k: 'Rome',
                },
                value: 'Rome',
            },
        },
    },
    {
        cells: {
            FLD1: {
                obj: {
                    t: '',
                    p: '',
                    k: 'Europe',
                },
                value: 'Europe',
            },
            FLD2: {
                obj: {
                    t: '',
                    p: '',
                    k: 'France',
                },
                value: 'France',
            },
            FLD3: {
                obj: {
                    t: '',
                    p: '',
                    k: 'Paris',
                },
                value: 'Paris',
            },
        },
    },
    {
        cells: {
            FLD1: {
                obj: {
                    t: '',
                    p: '',
                    k: 'Europe',
                },
                value: 'Europe',
            },
            FLD2: {
                obj: {
                    t: '',
                    p: '',
                    k: 'Spain',
                },
                value: 'Spain',
            },
            FLD3: {
                obj: {
                    t: '',
                    p: '',
                    k: 'Madrid',
                },
                value: 'Madrid',
            },
        },
    },
    {
        cells: {
            FLD1: {
                obj: {
                    t: '',
                    p: '',
                    k: 'America',
                },
                value: 'America',
            },
            FLD2: {
                obj: {
                    t: '',
                    p: '',
                    k: 'California',
                },
                value: 'California',
            },
            FLD3: {
                obj: {
                    t: '',
                    p: '',
                    k: 'Los Angeles',
                },
                value: 'Los Angeles',
            },
        },
    },
    {
        cells: {
            FLD1: {
                obj: {
                    t: '',
                    p: '',
                    k: 'America',
                },
                value: 'America',
            },
            FLD2: {
                obj: {
                    t: '',
                    p: '',
                    k: 'Florida',
                },
                value: 'Florida',
            },
            FLD3: {
                obj: {
                    t: '',
                    p: '',
                    k: 'Miami',
                },
                value: 'Miami',
            },
        },
    },
    {
        cells: {
            FLD1: {
                obj: {
                    t: '',
                    p: '',
                    k: 'America',
                },
                value: 'America',
            },
            FLD2: {
                obj: {
                    t: '',
                    p: '',
                    k: 'Texas',
                },
                value: 'Texas',
            },
            FLD3: {
                obj: {
                    t: '',
                    p: '',
                    k: 'Austin',
                },
                value: 'Austin',
            },
        },
    },
    {
        cells: {
            FLD1: {
                obj: {
                    t: '',
                    p: '',
                    k: 'Asia',
                },
                value: 'Asia',
            },
            FLD2: {
                obj: {
                    t: '',
                    p: '',
                    k: 'Japan',
                },
                value: 'Japan',
            },
            FLD3: {
                obj: {
                    t: '',
                    p: '',
                    k: 'Tokyo',
                },
                value: 'Tokyo',
            },
        },
    },
    {
        cells: {
            FLD1: {
                obj: {
                    t: '',
                    p: '',
                    k: 'Asia',
                },
                value: 'Asia',
            },
            FLD2: {
                obj: {
                    t: '',
                    p: '',
                    k: 'China',
                },
                value: 'China',
            },
            FLD3: {
                obj: {
                    t: '',
                    p: '',
                    k: 'Beijing',
                },
                value: 'Beijing',
            },
        },
    },
    {
        cells: {
            FLD1: {
                obj: {
                    t: '',
                    p: '',
                    k: 'Asia',
                },
                value: 'Asia',
            },
            FLD2: {
                obj: {
                    t: '',
                    p: '',
                    k: 'India',
                },
                value: 'India',
            },
            FLD3: {
                obj: {
                    t: '',
                    p: '',
                    k: 'New Delhi',
                },
                value: 'New Delhi',
            },
        },
    },
];

describe('it group rows', () => {
    it('group without parameters', () => {
        const groups = groupRows();

        expect(groups).toEqual([]);
    });

    it('group with empty rows', () => {
        let groups = groupRows(null);

        expect(groups).toEqual([]);

        groups = groupRows([]);

        expect(groups).toEqual([]);
    });

    it('if no / null / empty group, return rows as they are', () => {
        let groups = groupRows(rows);

        expect(groups).toEqual(rows);

        groups = groupRows(rows, null);

        expect(groups).toEqual(rows);

        groups = groupRows(rows, []);

        expect(groups).toEqual(rows);
    });

    it('Grouping on FLD1', () => {
        const groups = groupRows(rows, [{ column: 'FLD1', visible: true }]);

        expect(groups).not.toEqual(rows);

        expect(groups).toHaveLength(3);

        for (let i = 0; i < groups.length; i++) {
            const group = groups[i];

            expect(group).toHaveProperty('group');

            const { children, column, label } = group.group;

            switch (i) {
                case 0:
                    expect(label).toEqual('Europe');
                    expect(column).toEqual('FLD1');
                    expect(children).toHaveLength(3);

                    // testing children
                    expect(children[0]).not.toHaveProperty('group');
                    expect(children[0].cells['FLD2'].value).toEqual('Italy');
                    expect(children[1]).not.toHaveProperty('group');
                    expect(children[1].cells['FLD2'].value).toEqual('France');
                    expect(children[2]).not.toHaveProperty('group');
                    expect(children[2].cells['FLD2'].value).toEqual('Spain');
                    break;

                case 1:
                    expect(label).toEqual('America');
                    expect(column).toEqual('FLD1');
                    expect(children).toHaveLength(3);

                    // testing children
                    expect(children[0]).not.toHaveProperty('group');
                    expect(children[0].cells['FLD2'].value).toEqual(
                        'California'
                    );
                    expect(children[1]).not.toHaveProperty('group');
                    expect(children[1].cells['FLD2'].value).toEqual('Florida');
                    expect(children[2]).not.toHaveProperty('group');
                    expect(children[2].cells['FLD2'].value).toEqual('Texas');
                    break;

                default:
                    expect(label).toEqual('Asia');
                    expect(column).toEqual('FLD1');
                    expect(children).toHaveLength(3);

                    // testing children
                    expect(children[0]).not.toHaveProperty('group');
                    expect(children[0].cells['FLD2'].value).toEqual('Japan');
                    expect(children[1]).not.toHaveProperty('group');
                    expect(children[1].cells['FLD2'].value).toEqual('China');
                    expect(children[2]).not.toHaveProperty('group');
                    expect(children[2].cells['FLD2'].value).toEqual('India');
                    break;
            }
        }
    });

    it('Grouping on FLD1 and FLD2', () => {
        const groups = groupRows(rows, [
            { column: 'FLD1', visible: true },
            { column: 'FLD2', visible: true },
        ]);

        expect(groups).not.toEqual(rows);

        expect(groups).toHaveLength(3);

        for (let i = 0; i < groups.length; i++) {
            const group = groups[i];

            expect(group).toHaveProperty('group');

            const { children, column, label } = group.group;

            let firstChild;

            switch (i) {
                case 0:
                    expect(label).toEqual('Europe');
                    expect(column).toEqual('FLD1');
                    expect(children).toHaveLength(3);

                    // testing children
                    expect(children[0]).toHaveProperty('group');
                    expect(children[0].group.column).toEqual('FLD2');
                    expect(children[0].group.children).toHaveLength(1);
                    firstChild = children[0].group.children[0];
                    expect(firstChild.cells['FLD2'].value).toEqual('Italy');

                    expect(children[1]).toHaveProperty('group');
                    expect(children[1].group.column).toEqual('FLD2');
                    expect(children[1].group.children).toHaveLength(1);
                    firstChild = children[1].group.children[0];
                    expect(firstChild.cells['FLD2'].value).toEqual('France');

                    expect(children[2]).toHaveProperty('group');
                    expect(children[2].group.column).toEqual('FLD2');
                    expect(children[2].group.children).toHaveLength(1);
                    firstChild = children[2].group.children[0];
                    expect(firstChild.cells['FLD2'].value).toEqual('Spain');
                    break;

                case 1:
                    expect(label).toEqual('America');
                    expect(column).toEqual('FLD1');
                    expect(children).toHaveLength(3);

                    // testing children
                    expect(children[0]).toHaveProperty('group');
                    expect(children[0].group.column).toEqual('FLD2');
                    expect(children[0].group.children).toHaveLength(1);
                    firstChild = children[0].group.children[0];
                    expect(firstChild.cells['FLD2'].value).toEqual(
                        'California'
                    );

                    expect(children[1]).toHaveProperty('group');
                    expect(children[1].group.column).toEqual('FLD2');
                    expect(children[1].group.children).toHaveLength(1);
                    firstChild = children[1].group.children[0];
                    expect(firstChild.cells['FLD2'].value).toEqual('Florida');

                    expect(children[2]).toHaveProperty('group');
                    expect(children[2].group.column).toEqual('FLD2');
                    expect(children[2].group.children).toHaveLength(1);
                    firstChild = children[2].group.children[0];
                    expect(firstChild.cells['FLD2'].value).toEqual('Texas');
                    break;

                default:
                    expect(label).toEqual('Asia');
                    expect(column).toEqual('FLD1');
                    expect(children).toHaveLength(3);

                    // testing children
                    expect(children[0]).toHaveProperty('group');
                    expect(children[0].group.column).toEqual('FLD2');
                    expect(children[0].group.children).toHaveLength(1);
                    firstChild = children[0].group.children[0];
                    expect(firstChild.cells['FLD2'].value).toEqual('Japan');

                    expect(children[1]).toHaveProperty('group');
                    expect(children[1].group.column).toEqual('FLD2');
                    expect(children[1].group.children).toHaveLength(1);
                    firstChild = children[1].group.children[0];
                    expect(firstChild.cells['FLD2'].value).toEqual('China');

                    expect(children[2]).toHaveProperty('group');
                    expect(children[2].group.column).toEqual('FLD2');
                    expect(children[2].group.children).toHaveLength(1);
                    firstChild = children[2].group.children[0];
                    expect(firstChild.cells['FLD2'].value).toEqual('India');
                    break;
            }
        }
    });
});
