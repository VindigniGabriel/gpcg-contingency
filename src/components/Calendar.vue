<template>
    <v-container>
        <v-layout>
            <v-flex>
                <v-card  
                >
                    <v-card-title primary-title dark>
                    <div>
                        <h3 class="headline mb-0 font-weight-light font-italic">
                        <v-icon>
                            event
                        </v-icon>
                        Calendario de Eventos
                        </h3>
                    </div>
                    </v-card-title>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12 sm4>
                                    <v-card>
                                        <v-toolbar color="teal" dark>

                                        <v-toolbar-title class="text-xs-center">Aplicaciones</v-toolbar-title>

                                        <v-spacer></v-spacer>

                                        <v-btn 
                                        icon
                                        @click.stop="dialogEvent = true"
                                        >
                                            <v-icon>add</v-icon>
                                        </v-btn>
                                        </v-toolbar>

                                        <v-list subheader>
                                        <v-list-tile
                                            v-for="item in aplications"
                                            :key="item.title"
                                            avatar
                                            @click=""
                                        >
                                            <v-list-tile-content>
                                            <v-list-tile-title v-html="item.title"></v-list-tile-title>
                                            </v-list-tile-content>

                                            <v-list-tile-action>
                                                <v-switch
                                                color="success"
                                                v-model="item.active"
                                                :label="item.active ? 'Disponible' : 'No Disponible'"
                                                ></v-switch>    
                                            </v-list-tile-action>
                                        </v-list-tile>
                                        </v-list>
                                        <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn
                                            color="green darken-1"
                                            flat="flat"
                                            @click="updateEvent"
                                        >
                                            Actualizar
                                        </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-flex>
                                <v-flex xs12 sm8>
                                    <v-tabs
                                    color="cyan"
                                    dark
                                    slider-color="yellow"
                                    >
                                        <v-tab
                                            v-for="aplication in aplications"
                                            :key="aplication.value"
                                            ripple
                                        >
                                            {{ aplication.title }}

                                        </v-tab>
                                        <v-tab-item
                                            v-for="aplication in aplications"
                                            :key="aplication.value"
                                        >
                                            <v-card flat>
                                            <v-card-text>
                                                <vue-cal
                                                    small 
                                                    :selected-date="today"
                                                    :time-from="8 * 60"
                                                    :time-to="18 * 60"
                                                    :disable-views="['years', 'year']"
                                                    :events="events[aplication.key]"
                                                    :on-event-click="onEventClick"
                                                    locale="es"
                                                    :no-event-overlaps="true">
                                                </vue-cal>
                                            </v-card-text>
                                            </v-card>
                                        </v-tab-item>
                                    </v-tabs>
                                    
                                    <!-- Using Vuetify -->
                                    <v-dialog v-model="showDialog" max-width="290">
                                        <v-card>
                                            <v-card-title>
                                            <v-spacer/>
                                            <strong>{{ selectedEvent.startDate }}</strong>
                                            </v-card-title>
                                            <v-card-text>
                                            <strong>Detalle:</strong>
                                            <ul>
                                                <li>Inicio: {{ selectedEvent.startTime }}</li>
                                                <li>Fin: {{ selectedEvent.endTime }}</li>
                                            </ul>
                                            </v-card-text>
                                        </v-card>
                                    </v-dialog>
                                </v-flex>
                                
                        </v-layout>
                    </v-container>
                </v-card>
                <v-dialog
      v-model="dialogEvent"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">Eventos Aplicaciones</v-card-title>

        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-select
                  :items="['Xpert', 'Sinapsis', 'RTB']"
                  label="Aplicación"
                  required
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6>
                <v-autocomplete
                  :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                  label="Interests"
                  multiple
                ></v-autocomplete>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            flat="flat"
            @click="dialogEvent = false"
          >
            Disagree
          </v-btn>

          <v-btn
            color="green darken-1"
            flat="flat"
            @click="dialogEvent = false"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import firebase from 'firebase'
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import moment from 'moment'
export default {
    components: { VueCal },
    
    data: () => ({
        available: 'blue lighten-2',
        notAvailable: 'red lighten-2',
        today: moment().format("YYYY-MM-DD HH:mm:ss"),
        dialogEvent: false,
        selectedEvent: {},
        showDialog: false,
        events: {},
        aplications: [
            { active: true, title: 'RTB', class: 'red lighten-2', key: 'rtb', value: 1 },
            { active: true, title: 'Sinapsis', class: 'red lighten-2', key: 'sinapsis', value: 2 },
            { active: true, title: 'Xpert', class: 'red lighten-2', key: 'xpert', value: 3}
        ]
    }),
    methods: {
        ini () {
            this.events = ''
            firebase.database().ref('events')
                .on('value', s =>  this.events = s.val())

            this.aplications.forEach((aplication, i) => {
                    var key = this.events[aplication.key].length - 1
                    this.aplications[i].active = this.events[aplication.key][key].active
                })
        },
        onEventClick (event, e) {
            this.selectedEvent = event
            this.showDialog = true

            // Prevent navigating to narrower view (default vue-cal behavior).
            e.stopPropagation()
        },
        updateEvent() {
            this.events.push({
                start: this.today,
                end: this.today,
                class: 'red lighten-2'
            })
        },
        updateEvent () {
            this.aplications.forEach(aplication => {
                var key = this.events[aplication.key].length - 1
                if (aplication.active && this.events[aplication.key][key].class === this.notAvailable) {

                    this.events[aplication.key][key].end = moment().format("YYYY-MM-DD HH:mm:ss")
                    this.events[aplication.key].push({
                        start: moment().format("YYYY-MM-DD HH:mm:ss"),
                        end: moment().format("YYYY-MM-DD HH:mm:ss"),
                        class: this.available,
                        active: true
                    })
                    firebase.database().ref('events')
                        .set(this.events)
                        
                } else if (!aplication.active && this.events[aplication.key][key].class === this.available) {

                    this.events[aplication.key][key].end = moment().format("YYYY-MM-DD HH:mm:ss")
                    this.events[aplication.key].push({
                        start: moment().format("YYYY-MM-DD HH:mm:ss"),
                        end: moment().format("YYYY-MM-DD HH:mm:ss"),
                        class: this.notAvailable,
                        active: false
                    })
                    firebase.database().ref('events')
                        .set(this.events)

                } else if (this.events[aplication.key][key].class === ''){

                    var valueClass = aplication.active ? this.available : this.notAvailable
                    
                    this.events[aplication.key][key].end = moment().format("YYYY-MM-DD HH:mm:ss")
                    this.events[aplication.key].push({
                        start: moment().format("YYYY-MM-DD HH:mm:ss"),
                        end: moment().format("YYYY-MM-DD HH:mm:ss"),
                        class: valueClass,
                        active: aplication.active 
                    })
                    firebase.database().ref('events')
                        .set(this.events)


                }
               
            })
        },
        updateEnd (){
            setInterval(() => {
                this.aplications.forEach(aplication => {
                    var key = this.events[aplication.key].length - 1
                    console.log(key)
                    this.events[aplication.key][key].end = moment().format("YYYY-MM-DD HH:mm:ss")
                    firebase.database().ref('events')
                        .set(this.events)
                })
		    }, 300000)
        }
    }, 
    mounted() {
       this.ini()
       this.updateEnd()
       /* firebase.database().ref('events')
        .set({
            xpert: [{
                start: moment().format("YYYY-MM-DD HH:mm:ss"),
                end: moment().format("YYYY-MM-DD HH:mm:ss"),
                class: '',
                active: ''
            }],
            rtb: [{
                start: moment().format("YYYY-MM-DD HH:mm:ss"),
                end: moment().format("YYYY-MM-DD HH:mm:ss"),
                class: '',
                active: ''
            }],
            sinapsis: [{
                start: moment().format("YYYY-MM-DD HH:mm:ss"),
                end: moment().format("YYYY-MM-DD HH:mm:ss"),
                class: '',
                active: ''
            }],
        }) */
    },
}
</script>