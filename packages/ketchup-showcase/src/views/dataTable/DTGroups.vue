<style scoped>
h3 {
  margin: 1rem 0;
}
</style>

<template>
  <div>
    <h1>Grouping</h1>

    <h3>Group on continent</h3>
    <kup-data-table
      :data.prop="data"
      :groups.prop="group1"
      :showFilters.prop="true"
    ></kup-data-table>

    <h3>Hidden group on continent</h3>
    <kup-data-table :data.prop="data" :groups.prop="group2"></kup-data-table>

    <h3>Group on continent and state</h3>
    <kup-data-table :data.prop="data" :groups.prop="group3"></kup-data-table>

    <h3>Hidden group on continent and state</h3>
    <kup-data-table :data.prop="data" :groups.prop="group4"></kup-data-table>

    <h3>Group and continent and count on state</h3>
    <kup-data-table
      :data.prop="data"
      :groups.prop="group1"
      :totals.prop="totals1"
    ></kup-data-table>
  </div>
</template>

<script>
import { groupDataTable } from '@/mock/dataTable';

export default {
  name: 'dataTableFilters',

  data() {
    return {
      data: {
        ...groupDataTable,
      },
      group1: [
        {
          column: 'FLD0',
        },
      ],
      group2: [
        {
          column: 'FLD0',
          visible: false,
        },
      ],
      group3: [
        {
          column: 'FLD0',
        },
        {
          column: 'FLD1',
        },
      ],
      group4: [
        {
          column: 'FLD0',
          visible: false,
        },
        {
          column: 'FLD1',
          visible: false,
        },
      ],
      totals1: {
        FLD2: 'Count',
      },
    };
  },
};
</script>
