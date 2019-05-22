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
                    <template v-slot:items="props">
                        <td>{{ props.item.detail.date }}</td>
                        <td>{{ props.item.identify }}</td>
                        <td>{{ props.item.name }}</td>
                        <td class="text-xs-left">{{ props.item.detail.requests.join() }}</td>
                        <td class="text-xs-left">{{ props.item.detail.phone }}</td>
                        <td class="text-xs-left">{{ props.item.detail.typeLine }}</td>
                        <td class="text-xs-left">
                            <span v-if="props.item.status">Procesado</span>
                            <span 
                                v-if="!props.item.status"
                            >
                                Pendiente
                                <strong>
                                    ({{props.item.detail.pending}}/{{props.item.detail.quality}})
                                </strong> 
                                {{dateRelative(props.item.detail.date)}}
                            </span>
                        </td>
                        <v-icon
                    small
                    class="mr-2"
                    @click="editItem(props.item)"
                  >
                    edit
                  </v-icon>
                    </template>
                   <template v-slot:no-results>
                        <v-alert :value="true" color="error" icon="warning">
                        Your search for "{{ search }}" found no results.
                        </v-alert>
                    </template>
                    </v-data-table>
                </v-card>
            </v-flex>
        </v-layout>
        <template>
            <v-layout row justify-center>
                <v-dialog v-model="changeStatus" persistent max-width="290">
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
                        <div class="text-center">
                            <span >
                                Requerimiento(s)
                            </span>
                        </div>
                        <v-container>
                            <v-layout wrap>
                                <v-flex 
                                    v-for="(request, index) in dialogStatus.detail.requests" 
                                    :key="index"
                                    xs12
                                    class="text-center"
                                >
                                    <v-switch
                                        v-model="dialogStatus.detail.statusRequests[index]"
                                        :label="request"
                                        color="deep-orange lighten-1"
                                    ></v-switch>
                                    <strong class="success--text" v-if="dialogStatus.detail.statusRequests[index]">Procesado</strong>
                                    <strong class="red--text" v-else>Pendiente</strong>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" flat @click="changeStatus = false">Cancelar</v-btn>
                    <v-btn color="success" flat @click="save(dialogStatus.key, dialogStatus.detail.statusRequests), changeStatus = false">Guardar</v-btn>
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
          text: 'Fecha',
          align: 'left',
          value: 'date',
          view: true
        },
        { text: 'Cédula', value: 'identify', view: true },
        { text: 'Usuario', value: 'name', view: true },
        { text: 'Requerimiento(s)', value: 'requests', view: true },
        { text: 'Línea/ Cantd. Líneas Nueva', value: 'phone', view: true, sortable: false },
        { text: 'Tec.', value: 'typeLine', view: true, sortable: false },
        { text: 'Estatus', value: 'status', view: true, sortable: false }

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
        save(key, val){
            firebase.database().ref(`history/${key}/statusRequests`)
                .set(val)
            this.reload()
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