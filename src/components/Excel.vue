<template>
    <div>
        <v-btn
        @click="exportExcel">
            Download
        </v-btn>
    </div>
</template>

<script>

import XLSX  from "xlsx"
export default {
  name: 'AnyComponentName',
  data () {
    return {
        filename: 'OCM_Caricuao',
        dataToExport: [
            {
            name: 'Jorge',
            occupation: 'Best Admin'
            },
            {
            name: 'Héctor',
            occupation: 'Worst Admin'
            },
            {
            name: 'gmq',
            occupation: ':shrug:'
            }
        ]
        }
    },
  methods: {
    exportExcel: function () {
      let data = XLSX.utils.json_to_sheet(this.dataToExport)
      const workbook = XLSX.utils.book_new()
      const filename = this.filename
      XLSX.utils.book_append_sheet(workbook, data, filename)
      XLSX.writeFile(workbook, `${filename}.xlsx`)
    }
  }
}
</script>
