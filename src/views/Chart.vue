<template>
    <v-container>
        <v-layout wrap row>
            <v-flex xs12 lg5 mb-3>
                <v-card  
                color="light-green lighten-4"
              >
                <v-card-title primary-title dark>
                  <div>
                    <h3 class="headline mb-0">Monitor Diario</h3>
                  </div>
                </v-card-title>
                <highcharts :options="chartOptionsNow"></highcharts>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn 
                    flat
                    dark 
                  >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
                    <path d="M 12 3 L 2 5 L 2 19 L 12 21 L 12 3 z M 14 5 L 14 7 L 16 7 L 16 9 L 14 9 L 14 11 L 16 11 L 16 13 L 14 13 L 14 15 L 16 15 L 16 17 L 14 17 L 14 19 L 21 19 C 21.552 19 22 18.552 22 18 L 22 6 C 22 5.448 21.552 5 21 5 L 14 5 z M 18 7 L 20 7 L 20 9 L 18 9 L 18 7 z M 4.1757812 8.296875 L 5.953125 8.296875 L 6.8769531 10.511719 C 6.9519531 10.692719 7.0084063 10.902625 7.0664062 11.140625 L 7.0917969 11.140625 C 7.1247969 10.997625 7.1919688 10.779141 7.2929688 10.494141 L 8.3222656 8.296875 L 9.9433594 8.296875 L 8.0078125 11.966797 L 10 15.703125 L 8.2714844 15.703125 L 7.1582031 13.289062 C 7.1162031 13.204062 7.0663906 13.032922 7.0253906 12.794922 L 7.0097656 12.794922 C 6.9847656 12.908922 6.934375 13.079594 6.859375 13.308594 L 5.7363281 15.703125 L 4 15.703125 L 6.0605469 11.996094 L 4.1757812 8.296875 z M 18 11 L 20 11 L 20 13 L 18 13 L 18 11 z M 18 15 L 20 15 L 20 17 L 18 17 L 18 15 z"/>
                  </svg>
                  <v-icon
                    color="black"
                  >
                    arrow_downward
                  </v-icon>
                </v-btn>
              </v-card-actions>
              </v-card>
            </v-flex>
            <v-flex xs12 lg5 offset-lg2>
              <v-card  
                color="teal lighten-4"
              >
                <v-card-title primary-title dark>
                  <h3 class="headline mb-0">Monitor por Fecha</h3>
                  <v-spacer></v-spacer>
                  <v-date-picker
                    mode='range'
                    v-model='selectedDate'
                    :disabled-dates='[
                      {
                        start: new Date(),
                        end: null
                      }]'
                    show-caps>
                  </v-date-picker>
                </v-card-title>
                <highcharts :options="chartOptionsNow"></highcharts>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn 
                    flat
                    dark 
                  >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
                    <path d="M 12 3 L 2 5 L 2 19 L 12 21 L 12 3 z M 14 5 L 14 7 L 16 7 L 16 9 L 14 9 L 14 11 L 16 11 L 16 13 L 14 13 L 14 15 L 16 15 L 16 17 L 14 17 L 14 19 L 21 19 C 21.552 19 22 18.552 22 18 L 22 6 C 22 5.448 21.552 5 21 5 L 14 5 z M 18 7 L 20 7 L 20 9 L 18 9 L 18 7 z M 4.1757812 8.296875 L 5.953125 8.296875 L 6.8769531 10.511719 C 6.9519531 10.692719 7.0084063 10.902625 7.0664062 11.140625 L 7.0917969 11.140625 C 7.1247969 10.997625 7.1919688 10.779141 7.2929688 10.494141 L 8.3222656 8.296875 L 9.9433594 8.296875 L 8.0078125 11.966797 L 10 15.703125 L 8.2714844 15.703125 L 7.1582031 13.289062 C 7.1162031 13.204062 7.0663906 13.032922 7.0253906 12.794922 L 7.0097656 12.794922 C 6.9847656 12.908922 6.934375 13.079594 6.859375 13.308594 L 5.7363281 15.703125 L 4 15.703125 L 6.0605469 11.996094 L 4.1757812 8.296875 z M 18 11 L 20 11 L 20 13 L 18 13 L 18 11 z M 18 15 L 20 15 L 20 17 L 18 17 L 18 15 z"/>
                  </svg>
                  <v-icon
                    color="black"
                  >
                    arrow_downward
                  </v-icon>
                </v-btn>
              </v-card-actions>
              </v-card>
            </v-flex>
            <v-flex xs12>
                <v-divider></v-divider>
            </v-flex>
            <v-flex xs12>
              <v-card  
                color="blue lighten-4"
              >
                <v-card-title primary-title dark>
                  <div>
                    <h3 class="headline mb-0">Historial</h3>
                  </div>
                </v-card-title>
                <highcharts :options="chartOptionsHistory"></highcharts>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn 
                    flat
                    dark 
                    color="deep-orange darken-1"
                  >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
                    <path d="M 12 3 L 2 5 L 2 19 L 12 21 L 12 3 z M 14 5 L 14 7 L 16 7 L 16 9 L 14 9 L 14 11 L 16 11 L 16 13 L 14 13 L 14 15 L 16 15 L 16 17 L 14 17 L 14 19 L 21 19 C 21.552 19 22 18.552 22 18 L 22 6 C 22 5.448 21.552 5 21 5 L 14 5 z M 18 7 L 20 7 L 20 9 L 18 9 L 18 7 z M 4.1757812 8.296875 L 5.953125 8.296875 L 6.8769531 10.511719 C 6.9519531 10.692719 7.0084063 10.902625 7.0664062 11.140625 L 7.0917969 11.140625 C 7.1247969 10.997625 7.1919688 10.779141 7.2929688 10.494141 L 8.3222656 8.296875 L 9.9433594 8.296875 L 8.0078125 11.966797 L 10 15.703125 L 8.2714844 15.703125 L 7.1582031 13.289062 C 7.1162031 13.204062 7.0663906 13.032922 7.0253906 12.794922 L 7.0097656 12.794922 C 6.9847656 12.908922 6.934375 13.079594 6.859375 13.308594 L 5.7363281 15.703125 L 4 15.703125 L 6.0605469 11.996094 L 4.1757812 8.296875 z M 18 11 L 20 11 L 20 13 L 18 13 L 18 11 z M 18 15 L 20 15 L 20 17 L 18 17 L 18 15 z"/>
                  </svg>
                  <v-icon
                    color="black"
                  >
                    arrow_downward
                  </v-icon>
                </v-btn>
              </v-card-actions>
              </v-card>
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

exportingInit(Highcharts)

export default {
  data() {
    return {
      selectedDate: {
        start: new Date(),
        end: new Date()
      },
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
        requests : [ "Suspensión de Línea", "Venta de Sim Card", "Línea Nueva" ],
        typeLine: ["Pre/CDMA", "Pre/GSM", "Cre/CDMA", "Cre/GSM"],
        "options": {
          "Suspensión de Línea" : {
            0 : true,
            1 : true,
            2 : true,
            3 : true,
          },
          "Venta de Sim Card" : {
            0 : true,
            1 : true,
            2 : true,
            3 : true,
          },
          "Línea Nueva" : {
            0 : true,
            1 : true,
            2 : true,
            3 : true,
          }
        }
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
