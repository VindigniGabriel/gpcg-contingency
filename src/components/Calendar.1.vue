<template>
    <v-container>
        <v-layout>
            {{events.xpert}}
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
                                                    :time-to="23 * 60"
                                                    :disable-views="['years', 'year']"
                                                    :events="events.xpert"
                                                    :on-event-click="onEventClick"
                                                    locale="es"
                                                    :no-event-overlaps="false">
                                                </vue-cal>
                                            </v-card-text>
                                            </v-card>
                                        </v-tab-item>
                                    </v-tabs>
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
        today: moment().format("YYYY-MM-DD HH:mm"),
        dialogEvent: false,
        selectedEvent: {},
        showDialog: false,
        events: {
            xpert: [
                 {
      start: '2019-06-02',
      end: '2019-06-03',
      title: 'Need to go shopping',
      content: '<i class="v-icon material-icons">shopping_cart</i>',
      class: 'red'
    }
            ],
            rtb: [{
                start: moment().format("YYYY-MM-DD HH:mm"),
                end: moment().format("YYYY-MM-DD 23:59"),
                class: 'red',
                active: true
            }],
            sinapsis: [{
                start: moment().format("YYYY-MM-DD HH:mm"),
                end: moment().format("YYYY-MM-DD 23:59"),
                class: 'red',
                active: true
            }],
        },
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
        },
        onEventClick (event, e) {
            this.selectedEvent = event
            this.showDialog = true

            // Prevent navigating to narrower view (default vue-cal behavior).
            e.stopPropagation()
        },
        updateEvent() {
            console.log(this.events)
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

                    this.events[aplication.key][key].end = moment().format("YYYY-MM-DD HH:mm")
                    this.events[aplication.key].push({
                        start: moment().format("YYYY-MM-DD HH:mm"),
                        end: moment().format("YYYY-MM-DD 19:59"),
                        class: this.available,
                        active: true
                    })
                    firebase.database().ref('events')
                        .update(this.events)
                        
                } else if (!aplication.active && this.events[aplication.key][key].class === this.available) {

                    this.events[aplication.key][key].end = moment().format("YYYY-MM-DD HH:mm")
                    this.events[aplication.key].push({
                        start: moment().format("YYYY-MM-DD HH:mm"),
                        end: moment().format("YYYY-MM-DD 19:59"),
                        class: this.notAvailable,
                        active: false
                    })
                    firebase.database().ref('events')
                        .update(this.events)
                } 
               
            })

		/* this.polling = setInterval(() => {
			this.events.forEach((event, key) => {
                this.events[key].end =  moment().format("YYYY-MM-DD HH:mm:ss")
                console.log(this.events[key].end)
            })
		}, 10000) */
	    }
    }, 
    mounted() {
       this.ini()
    },
}
</script>