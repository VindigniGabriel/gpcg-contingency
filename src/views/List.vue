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
                            list
                        </v-icon>
                            Historial de la OC
                        </h3>
                    </div>
                    <v-spacer></v-spacer>
                    <v-badge
                        color="success"
                        v-if="notifycationView"
                    >
                        <span class="font-weight-regular font-italic">Se ha(n) registrado <strong>{{notifycationCount}}</strong> cambio(s) en el Historial</span>
                        <v-btn outline small fab color="teal" @click="reload">
                            <v-icon>list</v-icon>
                        </v-btn>
                    </v-badge>
                </v-card-title>
                <v-layout>
        <v-flex xs12 md8 offset-md2 py-2>
          <div>
            <v-alert
              v-model="alert"
              dismissible
              type="success"
            >
              Los cambios han sido guardadas para {{ userChange }} - {{ identifyChange }}
            </v-alert>
          </div>
        </v-flex>
      </v-layout>
        <v-layout m-4>
            <v-flex>
                <v-card>
                    <v-card-title>
                    Listado de Usuarios registrados
                    <v-spacer></v-spacer>
                    <v-text-field
                        v-model="search"
                        append-icon="search"
                        label="Cédula/Nombre/Apellido"
                        single-line
                        hide-details
                        color="blue"
                    ></v-text-field>
                    </v-card-title>
                    <v-data-table
                    :headers="headers"
                    :items="requests"
                    :search="search"
                    :pagination.sync="pagination"
                    >
                    <template 
                        v-slot:items="props" 
                    >
                    <tr @click="editItem(props.item)">
                        <td>{{ props.item.detail.date }}</td>
                         <td class="text-xs-left">
                            <span v-if="props.item.detail.statusRequests.indexOf(false) === -1">Procesado</span>
                            <span 
                                v-else
                            >
                                Pendiente
                                <strong>
                                    ({{props.item.detail.pending}}/{{props.item.detail.quality}})
                                </strong> 
                                {{dateRelative(props.item.detail.date)}}
                            </span>
                        </td>
                        <td>{{ props.item.identify }}</td>
                        <td>{{ props.item.name }}</td>
                        <td class="text-xs-left">{{ props.item.detail.requests.join() }}</td>
                        <td class="text-xs-left">{{ props.item.detail.phone }}</td>
                        <td class="text-xs-left">{{ props.item.detail.typeLine }}</td>
                        <td class="text-xs-left">{{ props.item.detail.observations }}</td>
                        <td class="text-xs-left">{{ props.item.detail.update }}</td>
                    </tr>
                    </template>
                   <template v-slot:no-results>
                        Sin resultados para "{{ search }}".
                    </template>
                    </v-data-table>
                </v-card>
            </v-flex>
        </v-layout>
        <template>
            <v-layout row justify-center>
                <v-dialog v-model="changeStatus" persistent max-width="390">
                <v-card>
                    <v-card-title class="headline">Cambio de Estatus</v-card-title>
                    <v-card-text>
                        <span>
                            <v-icon>
                                person_pin
                            </v-icon>
                            {{dialogStatus.name}} - {{dialogStatus.identify}}
                        </span>
                        <v-divider></v-divider>
                        <span>
                            <v-icon>
                                phone_android
                            </v-icon>
                            {{dialogStatus.detail.phone}}
                        </span>
                        <v-divider></v-divider>
                        <span>
                            <v-icon>
                                schedule
                            </v-icon>
                            {{dialogStatus.detail.date}}
                        </span>
                        <v-divider></v-divider>
                        <v-textarea
                            box
                            name="input-7-4"
                            label="Observaciones"
                            color="blue"
                            v-model="dialogStatus.detail.observations"
                        ></v-textarea>
                        <v-divider></v-divider>
                        <div class="text-center">
                            <span >
                                Requerimiento(s)
                            </span>
                        </div>
                        <v-container>
                            <v-layout  
                                v-for="(request, index) in dialogStatus.detail.requests" 
                                :key="index"
                                xs12
                                class="text-center"
                                
                            >
                               <v-flex xs6 ma-auto>
                                   <v-switch
                                    v-model="dialogStatus.detail.statusRequests[index]"
                                    :label="request"
                                    color="deep-orange lighten-1"
                                    ></v-switch>
                               </v-flex>
                               <v-flex xs6 ma-auto>
                                    <strong class="success--text" v-if="dialogStatus.detail.statusRequests[index]">Procesado</strong>
                                    <strong class="red--text" v-else>Pendiente</strong>
                               </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" flat @click="changeStatus = false, reload()">Cancelar</v-btn>
                    <v-btn color="success" flat :disabled="!dialogStatus.detail.observations" @click="save(dialogStatus.key, dialogStatus.detail.statusRequests, dialogStatus.detail.observations), changeStatus = false">Guardar</v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>
            </v-layout>
        </template>
                </v-card>
            </v-flex>
          </v-layout>
    </v-container>
</template>

<script>
import firebase from 'firebase'
import moment from 'moment'
import { spawn } from 'child_process';

moment.locale('es')
  export default {
    data () {
      return {
        userChange: '',
        identifyChange: '',
        today: moment().format("YYYY-MM-DD, h:mm:ss a"),
        alert: false,
        notifycation: true,
        notifycationCount : 0,
        dialogStatus: {
            key: '',
            identify: '',
            name: '',
            detail: {
                phone: '',
                date: '',
                request: ''
            }
        },
        changeStatus: false,
        pagination: { rowsPerPage: 25 },
        search: '',
        status: [
            'Pendiente',
            'Procesado',
            'No Procedente',
            'Eliminado'
        ],
        headers: [
        {
          text: 'Fecha de Creación',
          align: 'left',
          value: 'date',
          view: true
        },
        { text: 'Estatus', value: 'status', view: true, sortable: false },
        { text: 'Cédula', value: 'identify', view: true },
        { text: 'Usuario', value: 'name', view: true },
        { text: 'Requerimiento(s)', value: 'requests', view: true },
        { text: 'Línea', value: 'phone', view: true, sortable: false },
        { text: 'Tec.', value: 'typeLine', view: true, sortable: false },
        { text: 'Observaciones', value: 'observations', view: true, sortable: false },
        { text: 'Ult. Actualización', value: 'update', view: true, sortable: false }

      ],
        requests: []
      }
    },
    mounted (){
        /*firebase.database().ref('users').on('value', snapshot => {
            this.requests = []
            this.cargarData(snapshot.val())
        }),*/

       firebase.database().ref('history')
        .orderByChild('ocm')
        .equalTo('Caricuao')
        .on('value', data => {
            if(this.notifycation){
                this.notifycationCount = 0
                this.notifycation = false
                this.requests = []
                this.cargarData(data.val())
            }else{
                this.notifycationCount++
            }
        })
    },
    computed: {
        notifycationView(){
            return this.notifycationCount > 0 ? true : false
        }
    },
    methods: {
        reload(){
            firebase.database().ref('history')
                .orderByChild('ocm')
                .equalTo('Caricuao')
                .once('value', data => {
                    this.notifycationCount = 0
                    this.requests = []
                    this.cargarData(data.val())
                })
        },
        save(key, val, obs){
            this.alert = false
            this.userChange = ''
            this.identifyChange = ''
            var pending = 0
            val.forEach(element => {
                if(!element) pending++
            });
            firebase.database().ref(`history/${key}/statusRequests`)
                .set(val)
            firebase.database().ref(`history/${key}/observations`)
                .set(obs)
            firebase.database().ref(`history/${key}/pending`)
                .set(pending)
            firebase.database().ref(`history/${key}/update`)
                .set(this.today)
            this.reload()
            firebase.database().ref(`userHistory/${key}`)
                .once('value', identify => {
                    this.identifyChange = identify.val()
                    firebase.database().ref(`userData/${this.identifyChange}`)
                        .once('value', user => {
                            this.userChange = user.val().name
                            this.alert = true
                            })
                    })
        },
        editItem (item) {
            this.changeStatus = true
            this.dialogStatus = Object.assign({}, item)
            /* this.editedIndex = this.requests.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true */
        },
        dateRelative(fecha){
            return moment(fecha).fromNow()
        },
        cargarData(registers) {
            for(let key in registers){
            firebase.database().ref(`userHistory/${key}`)
                .once('value', identify => {
                    firebase.database().ref(`userHistory/${key}`)
                        .once('value', identify => {
                            firebase.database().ref(`userData/${identify.val()}`)
                                .once('value', name => {
                                    this.requests.push({
                                        key: key,
                                        identify: identify.val(),
                                        name: name.val().name,
                                        detail: registers[key]
                                    })
                                })
                        })
                })

            }
          
        },
    }
  }
</script>