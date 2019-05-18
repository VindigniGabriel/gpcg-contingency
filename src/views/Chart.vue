<template>
    <v-container>
        <v-layout wrap row>
            <v-flex xs12 lg5 mb-3>
                <h3>Monitor Diario</h3>
                <highcharts :options="chartOptionsNow"></highcharts>
            </v-flex>
            <v-flex xs12 lg5 offset-lg2>
                <h3>Monitor por Fecha</h3>
                <highcharts :options="chartOptionsNow"></highcharts>
            </v-flex>
            <v-flex xs12>
                <v-divider></v-divider>
            </v-flex>
            <v-flex xs12>
                <h3>Historial</h3>
                <highcharts :options="chartOptionsHistory"></highcharts>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import moment from 'moment'
import firebase from 'firebase'
import {Chart} from 'highcharts-vue'

import Highcharts from 'highcharts'
import exportingInit from 'highcharts/modules/exporting'
import { type } from 'os';

exportingInit(Highcharts)

export default {
  data() {
    return {
      today: moment().format("YYYY-MM-DD"),
      typeLine: '',
      serie: [],
      chartOptionsHistory: {
        chart: {
          type: 'bar',
        },
        title: {
          text: 'Requerimientos Registrados Histórico',
        },
        subtitle: {
          text: 'OC Caricuao'
        },
        xAxis: {
          categories: [],
          title: {
            text: null,
          },
        },
        yAxis: {
          min: 0,
          title: {
            text: '',
          },
          labels: {
            overflow: 'justify',
          },
        },
        tooltip: {
          valueSuffix: ' registro(s)',
        },
        plotOptions: {
          bar: {
            dataLabels: {
              enabled: true,
            },
          },
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'top',
          x: -40,
          y: 20,
          floating: true,
          borderWidth: 1,
          backgroundColor:
            (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
          shadow: true,
        },
        credits: {
          enabled: false,
        },
        lang: {
        viewFullscreen: 'Ver pantalla grande',
        printChart: 'Imprimir Gráfico',
        downloadPNG: 'Descargar PNG imagen',
        downloadJPEG: 'Descargar JPEG imagen',
        downloadPDF: 'Descargar PDF documento',
        downloadSVG: 'Descargar SVG imagen vector',
        contextButtonTitle: 'Opciones para el gráfico'

        },
        series: [
          {
            name: 'Requerimientos',
            data: [0],
            color: '#B3E5FC'
          },
          {
            name: 'Procesados',
            data: [0],
            color: '#B2DFDB'
          },
          {
            name: 'Pendientes',
            data: [0],
            color: '#EF5350'
          },
        ],
      },
      chartOptionsNow: {
        chart: {
        type: 'column'
        },
        title: {
          text: '',
        },
        subtitle: {
          text: 'OC Caricuao'
        },
        xAxis: {
            categories: []
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Requerimientos (%)'
            }
        },
        credits: {
          enabled: false
        },
        lang: {
        viewFullscreen: 'Ver pantalla grande',
        printChart: 'Imprimir Gráfico',
        downloadPNG: 'Descargar PNG imagen',
        downloadJPEG: 'Descargar JPEG imagen',
        downloadPDF: 'Descargar PDF documento',
        downloadSVG: 'Descargar SVG imagen vector',
        contextButtonTitle: 'Opciones para el gráfico'

        },
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
            shared: true
        },
        plotOptions: {
            column: {
                stacking: 'percent'
            }
        },
        series: []
      },
      registersOcm : [],
      qualityForCategory: null,
      series: []
    }
  },
  components: {
    highcharts: Chart 
  },
  mounted() {
    /* firebase.database().ref('settings')
      .set({
        requests : [ "Suspensión de Línea", "Venta de Sim Card" ],
        typeLine: ['Pre/CDMA', 'Pre/GSM', 'Crédito']
      }) */
    firebase.database().ref('history')
      .on('value', () => {

        firebase.database().ref('settings')
        .on('value', data => {
          this.chartOptionsHistory.xAxis.categories = data.val().requests //Se carga los requerimientos desde los settings
          this.chartOptionsNow.xAxis.categories = data.val().requests //Se carga los requerimientos desde los settings
          this.createdSeries(data.val())
          // Se obtiene el historial de la OC Seleccionada para el gráfico Historial
          firebase.database().ref('history')
            .orderByChild('ocm')
            .equalTo('Caricuao')
            .on('value', registers => this.loadRegisterHistory(registers.val()))
        })
      })
  },
  methods: {
    createdSeries(results){
        var series = []
        results.typeLine.forEach((typeLine, index) => {
          var data = []
          this.chartOptionsNow.xAxis.categories.forEach((categories, i) => {
          data[i] = 0
        })
          firebase.database().ref('history')
            .orderByChild('date')
            .startAt(this.today)
            .on('value', registers => {
                for(let key in registers.val()){
                  if(registers.val()[key].ocm === 'Caricuao' && registers.val()[key].typeLine === typeLine){
                      this.chartOptionsNow.xAxis.categories.forEach((categories, i) => {
                        if(registers.val()[key].requests.includes(categories)){
                          data[i]++
                        }
                      })
                    }
                }
            })
            series.push({name: typeLine, data: data})
        })

        this.loadSeries(series)
    },
    loadSeries(series){
      this.chartOptionsNow.title.text = 'Requerimientos Registrados ' + this.today
      this.chartOptionsNow.series = series
    },
    loadRegisterHistory(r){
      var qualityForCategory = []
      var qualityForCategoryProcessed = []
      var qualityForCategorySlopes = []

      this.chartOptionsHistory.xAxis.categories.forEach((val, index) => {
        qualityForCategory[index] = 0
        qualityForCategoryProcessed[index] = 0
        qualityForCategorySlopes[index] = 0
      })
      
      for(let key in r){
        var status = 0
        this.chartOptionsHistory.xAxis.categories.forEach((category, i) =>{
          if(r[key].requests.includes(category)) {
            qualityForCategory[i]++
            r[key].statusRequests[status] ?  qualityForCategoryProcessed[i]++ : qualityForCategorySlopes[i] = qualityForCategory[i] - qualityForCategoryProcessed[i]
            status++
          }
        })
        this.chartOptionsHistory.series[0].data = qualityForCategory
        this.chartOptionsHistory.series[1].data = qualityForCategoryProcessed
        this.chartOptionsHistory.series[2].data = qualityForCategorySlopes
      }
    }
  },
  
}
</script>
