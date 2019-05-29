function createDataForPagination(colSize: number, rowSize: number) {
  const columns: any = [];
  for (let i = 0; i < colSize; i++) {
    columns.push({
      name: 'FLD' + i,
      title: 'Column ' + i,
      size: 10,
    });
  }

  const rows = [];
  for (let i = 0; i < rowSize; i++) {
    const currentRow: {
      cells: any;
    } = { cells: {} };

    for (let j = 0; j < columns.length; j++) {
      const cell: any = {};
      cell.value = i.toString() + j.toString();

      cell.obj = {
        t: 'NR',
        p: '',
        k: cell.value,
      };

      currentRow.cells[columns[j].name] = cell;
    }

    rows.push(currentRow);
  }

  return {
    columns,
    rows,
  };
}

export const defaultDataTable = {
  columns: [
    {
      name: 'FLD1',
      title: 'Column A',
      size: '',
    },
    {
      name: 'FLD2',
      title: 'Column B',
      size: 10,
    },
    {
      name: 'FLD3',
      title: 'Column C',
      size: 10,
    },
    {
      name: 'FLD4',
      title: 'Column D',
      size: 10,
    },
  ],
  rows: [
    {
      cells: {
        FLD1: {
          obj: {
            t: 'CN',
            p: 'COL',
            k: 'CASFRA',
          },
          value: 'CASFRA',
        },
        FLD2: {
          obj: {
            t: 'NR',
            p: '',
            k: '10',
          },
          value: '10',
        },
        FLD3: {
          obj: {
            t: 'NR',
            p: '',
            k: '100.60',
          },
          value: '100.60',
        },
        FLD4: {
          obj: {
            t: 'D8',
            p: '*YYMD',
            k: '20180101',
          },
          value: '01/01/2018',
        },
      },
    },
    {
      cells: {
        FLD1: {
          obj: {
            t: 'CN',
            p: 'COL',
            k: 'DELGIO',
          },
          value: 'DELGIO',
        },
        FLD2: {
          obj: {
            t: 'NR',
            p: '',
            k: '6',
          },
          value: '6',
        },
        FLD3: {
          obj: {
            t: 'NR',
            p: '',
            k: '67.8',
          },
          value: '67.8',
        },
        FLD4: {
          obj: {
            t: 'D8',
            p: '*YYMD',
            k: '20180102',
          },
          value: '02/01/2018',
        },
      },
    },
    {
      cells: {
        FLD1: {
          obj: {
            t: 'CN',
            p: 'COL',
            k: 'PARFRA',
          },
          value: 'PARFRA',
        },
        FLD2: {
          obj: {
            t: 'NR',
            p: '',
            k: '5',
          },
          value: '5',
        },
        FLD3: {
          obj: {
            t: 'NR',
            p: '',
            k: '120.06',
          },
          value: '120.06',
        },
        FLD4: {
          obj: {
            t: 'D8',
            p: '*YYMD',
            k: '20180103',
          },
          value: '03/01/2018',
        },
      },
    },
  ],
};

export const sortDataTable = {
  columns: [
    {
      name: 'FLD1',
      title: 'Column A',
      size: '',
    },
    {
      name: 'FLD2',
      title: 'Column B',
      size: 10,
    },
    {
      name: 'FLD3',
      title: 'Column C',
      size: 10,
    },
    {
      name: 'FLD4',
      title: 'Column D',
      size: 10,
    },
  ],
  rows: [
    {
      cells: {
        FLD1: {
          obj: {
            t: 'CN',
            p: 'COL',
            k: 'CASFRA',
          },
          value: 'CASFRA',
        },
        FLD2: {
          obj: {
            t: 'NR',
            p: '',
            k: '10',
          },
          value: '10',
        },
        FLD3: {
          obj: {
            t: 'NR',
            p: '',
            k: '100.60',
          },
          value: '100.60',
        },
        FLD4: {
          obj: {
            t: 'D8',
            p: '*YYMD',
            k: '20180101',
          },
          value: '01/01/2018',
        },
      },
    },
    {
      cells: {
        FLD1: {
          obj: {
            t: 'CN',
            p: 'COL',
            k: 'DELGIO',
          },
          value: 'DELGIO',
        },
        FLD2: {
          obj: {
            t: 'NR',
            p: '',
            k: '6',
          },
          value: '6',
        },
        FLD3: {
          obj: {
            t: 'NR',
            p: '',
            k: '67.8',
          },
          value: '67.8',
        },
        FLD4: {
          obj: {
            t: 'D8',
            p: '*YYMD',
            k: '20180102',
          },
          value: '02/01/2018',
        },
      },
    },
    {
      cells: {
        FLD1: {
          obj: {
            t: 'CN',
            p: 'COL',
            k: 'PARFRA',
          },
          value: 'PARFRA',
        },
        FLD2: {
          obj: {
            t: 'NR',
            p: '',
            k: '5',
          },
          value: '5',
        },
        FLD3: {
          obj: {
            t: 'NR',
            p: '',
            k: '120.06',
          },
          value: '120.06',
        },
        FLD4: {
          obj: {
            t: 'D8',
            p: '*YYMD',
            k: '20180103',
          },
          value: '03/01/2018',
        },
      },
    },
    {
      cells: {
        FLD1: {
          obj: {
            t: 'CN',
            p: 'COL',
            k: 'CASFRA',
          },
          value: 'CASFRA',
        },
        FLD2: {
          obj: {
            t: 'NR',
            p: '',
            k: '11',
          },
          value: '11',
        },
        FLD3: {
          obj: {
            t: 'NR',
            p: '',
            k: '100.60',
          },
          value: '100.60',
        },
        FLD4: {
          obj: {
            t: 'D8',
            p: '*YYMD',
            k: '20180101',
          },
          value: '01/01/2018',
        },
      },
    },
    {
      cells: {
        FLD1: {
          obj: {
            t: 'CN',
            p: 'COL',
            k: 'DELGIO',
          },
          value: 'DELGIO',
        },
        FLD2: {
          obj: {
            t: 'NR',
            p: '',
            k: '7',
          },
          value: '7',
        },
        FLD3: {
          obj: {
            t: 'NR',
            p: '',
            k: '67.8',
          },
          value: '67.8',
        },
        FLD4: {
          obj: {
            t: 'D8',
            p: '*YYMD',
            k: '20180102',
          },
          value: '02/01/2018',
        },
      },
    },
    {
      cells: {
        FLD1: {
          obj: {
            t: 'CN',
            p: 'COL',
            k: 'PARFRA',
          },
          value: 'PARFRA',
        },
        FLD2: {
          obj: {
            t: 'NR',
            p: '',
            k: '6',
          },
          value: '6',
        },
        FLD3: {
          obj: {
            t: 'NR',
            p: '',
            k: '120.06',
          },
          value: '120.06',
        },
        FLD4: {
          obj: {
            t: 'D8',
            p: '*YYMD',
            k: '20180103',
          },
          value: '03/01/2018',
        },
      },
    },
    {
      cells: {
        FLD1: {
          obj: {
            t: 'CN',
            p: 'COL',
            k: 'CASFRA',
          },
          value: 'CASFRA',
        },
        FLD2: {
          obj: {
            t: 'NR',
            p: '',
            k: '12',
          },
          value: '12',
        },
        FLD3: {
          obj: {
            t: 'NR',
            p: '',
            k: '100.60',
          },
          value: '100.60',
        },
        FLD4: {
          obj: {
            t: 'D8',
            p: '*YYMD',
            k: '20180101',
          },
          value: '01/01/2018',
        },
      },
    },
    {
      cells: {
        FLD1: {
          obj: {
            t: 'CN',
            p: 'COL',
            k: 'DELGIO',
          },
          value: 'DELGIO',
        },
        FLD2: {
          obj: {
            t: 'NR',
            p: '',
            k: '8',
          },
          value: '8',
        },
        FLD3: {
          obj: {
            t: 'NR',
            p: '',
            k: '67.8',
          },
          value: '67.8',
        },
        FLD4: {
          obj: {
            t: 'D8',
            p: '*YYMD',
            k: '20180102',
          },
          value: '02/01/2018',
        },
      },
    },
    {
      cells: {
        FLD1: {
          obj: {
            t: 'CN',
            p: 'COL',
            k: 'PARFRA',
          },
          value: 'PARFRA',
        },
        FLD2: {
          obj: {
            t: 'NR',
            p: '',
            k: '7',
          },
          value: '7',
        },
        FLD3: {
          obj: {
            t: 'NR',
            p: '',
            k: '120.06',
          },
          value: '120.06',
        },
        FLD4: {
          obj: {
            t: 'D8',
            p: '*YYMD',
            k: '20180103',
          },
          value: '03/01/2018',
        },
      },
    },
  ],
};

export const paginateDataTable = createDataForPagination(20, 10000);

export const groupDataTable = {
  columns: [
    {
      name: 'FLD1',
      title: 'Continent',
      size: 99,
    },
    {
      name: 'FLD2',
      title: 'State',
      size: 10,
    },
    {
      name: 'FLD3',
      title: 'City',
      size: 10,
    },
  ],
  rows: [
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
  ],
};
