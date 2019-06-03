<template>
    <v-container grid-list-lg>
       <v-layout>
        <v-flex>
          <v-card  
              >
                <v-card-title primary-title dark>
                  <div>
                    <h3 class="headline mb-0 font-weight-light font-italic">
                      <v-icon>
                        insert_chart
                      </v-icon>
                      Gráficos
                    </h3>
                  </div>
                  <v-spacer></v-spacer>
                  <v-btn
                    outline
                    color="orange darken-3"
                    @click="downloadExcelNow"
                    small
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
                      <path d="M 12 3 L 2 5 L 2 19 L 12 21 L 12 3 z M 14 5 L 14 7 L 16 7 L 16 9 L 14 9 L 14 11 L 16 11 L 16 13 L 14 13 L 14 15 L 16 15 L 16 17 L 14 17 L 14 19 L 21 19 C 21.552 19 22 18.552 22 18 L 22 6 C 22 5.448 21.552 5 21 5 L 14 5 z M 18 7 L 20 7 L 20 9 L 18 9 L 18 7 z M 4.1757812 8.296875 L 5.953125 8.296875 L 6.8769531 10.511719 C 6.9519531 10.692719 7.0084063 10.902625 7.0664062 11.140625 L 7.0917969 11.140625 C 7.1247969 10.997625 7.1919688 10.779141 7.2929688 10.494141 L 8.3222656 8.296875 L 9.9433594 8.296875 L 8.0078125 11.966797 L 10 15.703125 L 8.2714844 15.703125 L 7.1582031 13.289062 C 7.1162031 13.204062 7.0663906 13.032922 7.0253906 12.794922 L 7.0097656 12.794922 C 6.9847656 12.908922 6.934375 13.079594 6.859375 13.308594 L 5.7363281 15.703125 L 4 15.703125 L 6.0605469 11.996094 L 4.1757812 8.296875 z M 18 11 L 20 11 L 20 13 L 18 13 L 18 11 z M 18 15 L 20 15 L 20 17 L 18 17 L 18 15 z"/>
                    </svg>
                    Data Hoy
                  </v-btn>
                  <v-btn
                    outline
                    color="orange darken-3"
                    @click="downloadExcelRange"
                    small
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
                      <path d="M 12 3 L 2 5 L 2 19 L 12 21 L 12 3 z M 14 5 L 14 7 L 16 7 L 16 9 L 14 9 L 14 11 L 16 11 L 16 13 L 14 13 L 14 15 L 16 15 L 16 17 L 14 17 L 14 19 L 21 19 C 21.552 19 22 18.552 22 18 L 22 6 C 22 5.448 21.552 5 21 5 L 14 5 z M 18 7 L 20 7 L 20 9 L 18 9 L 18 7 z M 4.1757812 8.296875 L 5.953125 8.296875 L 6.8769531 10.511719 C 6.9519531 10.692719 7.0084063 10.902625 7.0664062 11.140625 L 7.0917969 11.140625 C 7.1247969 10.997625 7.1919688 10.779141 7.2929688 10.494141 L 8.3222656 8.296875 L 9.9433594 8.296875 L 8.0078125 11.966797 L 10 15.703125 L 8.2714844 15.703125 L 7.1582031 13.289062 C 7.1162031 13.204062 7.0663906 13.032922 7.0253906 12.794922 L 7.0097656 12.794922 C 6.9847656 12.908922 6.934375 13.079594 6.859375 13.308594 L 5.7363281 15.703125 L 4 15.703125 L 6.0605469 11.996094 L 4.1757812 8.296875 z M 18 11 L 20 11 L 20 13 L 18 13 L 18 11 z M 18 15 L 20 15 L 20 17 L 18 17 L 18 15 z"/>
                    </svg>
                    Data Rango
                  </v-btn>
                </v-card-title>
        <v-layout 
          wrap 
          row 
          :class="{'ma-4': $vuetify.breakpoint.smAndUp}">
            <v-flex xs12 lg6>
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
                </v-card-actions>
              </v-card>
            </v-flex>
            <v-flex xs12 lg6>
              <v-card  
                color="teal lighten-4"
              >
                <v-card-title primary-title dark>
                  <h3 class="headline mb-0">Monitor por Rango</h3>
                  <v-spacer></v-spacer>
                  <v-date-picker
                    @click="sendDateRange"
                    mode='range'
                    v-model='selectedDate'
                    :max-date='new Date()'
                    left-start
                    show-caps>
                  </v-date-picker>
                </v-card-title>
                <highcharts :options="chartOptionsRange"></highcharts>
                <v-card-actions>
                </v-card-actions>
              </v-card>
            </v-flex>
            <v-flex xs12>
                <v-divider></v-divider>
            </v-flex>
            <v-flex xs12>
              <v-card  
                color="grey lighten-2"
              >
                <v-card-title primary-title dark>
                  <div>
                    <h3 class="headline mb-0">Monitor en vivo</h3>
                  </div>
                </v-card-title>
                <highcharts :options="chartActions"></highcharts>
                <v-card-actions>
                </v-card-actions>
              </v-card>
            </v-flex>
            <v-flex xs12>
                <v-divider></v-divider>
            </v-flex>
            <v-flex xs12>
              <v-card  
                color="green accent-1"
              >
                <v-card-title primary-title dark>
                  <div>
                    <h3 class="headline mb-0">Estatus Requerimiento(s)</h3>
                  </div>
                </v-card-title>
                <highcharts :options="chartOptionsHistory"></highcharts>
                <v-card-actions>
                </v-card-actions>
              </v-card>
            </v-flex>
        </v-layout>
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
import XLSX  from "xlsx"

exportingInit(Highcharts)

export default {
  data() {
    return {
      selectedDate: {
        start: new Date(),
        end: new Date()
      },
      start: '',
      end: '',
      today: moment().format("YYYY-MM-DD"),
      typeLine: '',
      serie: [],
      chartActions: {
        chart: {
          type: 'spline',
          style: {
            fontFamily: 'serif'
          },
          animation: Highcharts.svg, // don't animate in old IE
          marginRight: 10,
          events: {
              load: function () {

                  // set up the updating of the chart each second
                  var series = this.series[0];
                  setInterval(function () {
                      var x = (new Date()).getTime(), // current time
                          y = Math.random();
                      series.addPoint([x, y], true, true);
                  }, 1000);
              }
          }
        },

        time: {
            useUTC: false
        },

        title: {
            text: 'Promedio de Requerimientos Generados'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150
        },
        yAxis: {
            title: {
                text: 'Requerimiento(s)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            headerFormat: '<b>{series.name}</b><br/>',
            pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}'
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        credits: {
          enabled: false,
        },
        series: [{
            name: 'Random data',
            data: (function () {
                // generate an array of random data
                var data = [],
                    time = (new Date()).getTime(),
                    i;

                for (i = -19; i <= 0; i += 1) {
                    data.push({
                        x: time + i * 1000,
                        y: Math.random()
                    });
                }
                return data;
            }())
        }]
      },
      chartOptionsHistory: {
        chart: {
          type: 'bar',
          style: {
            fontFamily: 'serif'
          }
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
        responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }
      },
      chartOptionsNow: {
        chart: {
          type: 'column',
          style: {
            fontFamily: 'serif'
          }
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
      chartRange: {
        chart: {
          type: 'column',
          style: {
            fontFamily: 'serif'
          }
        },
        title: {
          text: ''
        },
        subtitle: {
          text: 'OC Caricuao'
        },
        xAxis: {
            categories: [],
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
  watch: {
    selectedDate (val) {
      this.sendDateRange(val.start, val.end)
    }
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
          //this.loadSeriesForRange(data.val())
          // Se obtiene el historial de la OC Seleccionada para el gráfico Historial
          firebase.database().ref('history')
            .orderByChild('ocm')
            .equalTo('Caricuao')
            .on('value', registers => this.loadRegisterHistory(registers.val()))
        })
      })

      this.sendDateRange(this.today, this.today)
  },
  computed: {
    chartOptionsRange: (data) => data.chartRange
  },
  methods: {
    sendDateRange(start, end){ 
      this.start = moment(start).format("YYYY-MM-DD", "00:00:00") 
      this.end = moment(end).format("YYYY-MM-DD")
      firebase.database().ref('history')
      .once('value', () => {
        firebase.database().ref('settings')
        .once('value', data => {
          this.chartRange.xAxis.categories = data.val().requests //Se carga los requerimientos desde los settings
          this.seriesForRange(data.val())
        })
      })
    },
    seriesForRange(results){
        var series = []
        results.typeLine.forEach((typeLine, index) => {
          var data = []
          this.chartRange.xAxis.categories.forEach((categories, i) => {
          data[i] = 0
          })
          firebase.database().ref('history')
            .orderByChild('date')
            .startAt(this.start+ ' 00:00:00')
            .endAt(this.end + ' 23:59:00')
            .once('value', registers => {
                for(let key in registers.val()){
                  if(registers.val()[key].ocm === 'Caricuao' && registers.val()[key].typeLine === typeLine){
                      this.chartRange.xAxis.categories.forEach((categories, i) => {
                        if(registers.val()[key].requests.includes(categories)){
                          data[i]++
                        }
                      })
                    }
                }
            })
            series.push({name: typeLine, data: data})
        })
        this.loadSeriesForRange(series)
    },
    loadSeriesForRange(series){
      this.chartRange.title.text = 'Requerimientos Registrados entre ' + this.start + ' - ' + this.end
      this.chartRange.series = series
    },
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
    },
    downloadExcelRange(){
      var r = []
      firebase.database().ref('history')
        .orderByChild('ocm')
        .equalTo('Caricuao')
        .once('value', requests => {
          requests.forEach(request => {
            if(request.val().date >= this.start + ' 00:00:00' && request.val().date <= this.end + ' 23:59:00'){
              for(let key in request.val().requests){
              r.push({
                "Fecha/Hora": request.val().date,
                "Línea/# Líneas": request.val().phone,
                Tecnólogia: request.val().typeLine,
                "Requerimiento(s)": request.val().requests[key],
                Estatus: (request.val().statusRequests[key]) ? 'Procesado' : 'Pendiente',
                Contacto: request.val().contact,
                Oficina: request.val().ocm,
                Observaciones: request.val().observations
              })
              }
            }
          })
          let data = XLSX.utils.json_to_sheet(r)
          const workbook = XLSX.utils.book_new()
          const filename = this.filename
          XLSX.utils.book_append_sheet(workbook, data, filename)
          XLSX.writeFile(workbook, `${this.start}_${this.end}.xlsx`)
        })
    },
    downloadExcelNow(){
      var r = []
      firebase.database().ref('history')
        .orderByChild('ocm')
        .equalTo('Caricuao')
        .once('value', requests => {
          requests.forEach(request => {
            if(request.val().date >= this.today){
              for(let key in request.val().requests){
              r.push({
                "Fecha/Hora": request.val().date,
                "Línea": request.val().phone,
                Tecnólogia: request.val().typeLine,
                "Requerimiento(s)": request.val().requests[key],
                Estatus: (request.val().statusRequests[key]) ? 'Procesado' : 'Pendiente',
                Contacto: request.val().contact,
                Oficina: request.val().ocm,
                Observaciones: request.val().observations
              })
              }
            }
          })
          let data = XLSX.utils.json_to_sheet(r)
          const workbook = XLSX.utils.book_new()
          const filename = this.filename
          XLSX.utils.book_append_sheet(workbook, data, filename)
          XLSX.writeFile(workbook, `${this.today}.xlsx`)
        })
    }
  },
  
}
</script>
