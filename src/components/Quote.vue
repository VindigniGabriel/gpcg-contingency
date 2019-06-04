<template>
    <v-container>
        <v-layout>
            <v-flex>
                <v-card>
                    <v-card-title primary-title dark>
                        <div>
                            <h3 class="headline mb-0 font-weight-light font-italic">
                            <v-icon>
                                event
                            </v-icon>
                            Gestión de citas
                            </h3>
                        </div>
                    </v-card-title>
                    <v-container grid-list-lg>
                        <v-layout wrap>
                            <v-flex xs12 md6>
                                <v-card>
                                    <v-sheet
                                    class="v-sheet--offset mx-auto"
                                    color="grey lighten-3"
                                    elevation="12"
                                    max-width="calc(100% - 32px)"
                                    >
                                    <v-container>
                                        <v-layout>
                                            <v-flex xs12>
                                                Atención no presencial
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                    </v-sheet>
                                    <v-card-title>
                                    <v-spacer></v-spacer>
                                    <v-text-field
                                        v-model="search"
                                        append-icon="search"
                                        label="Filtrar"
                                        single-line
                                        hide-details
                                        color="orange"
                                    ></v-text-field>
                                    </v-card-title>
                                    <v-data-table
                                    :headers="headers"
                                    :items="requests"
                                    :search="search"
                                    >
                                    <template v-slot:items="props">
                                        <tr @click="processRequest(props.item)">
                                            <td>{{ props.item.date }}</td>
                                            <td>{{ props.item.phone }}</td>
                                            <td>{{ props.item.typeLine }}</td>
                                            <td>{{ props.item.request }}</td>
                                        </tr>
                                    </template>
                                    <template v-slot:no-results>
                                        <v-alert :value="true" color="error" icon="warning">
                                        Your search for "{{ search }}" found no results.
                                        </v-alert>
                                    </template>
                                    </v-data-table>
                                </v-card>
                            </v-flex>
                            <v-flex xs12 md6>
                                <v-card>
                                    <v-sheet
                                    class="v-sheet--offset mx-auto"
                                    color="grey lighten-3"
                                    elevation="12"
                                    max-width="calc(100% - 32px)"
                                    >
                                    <v-container>
                                        <v-layout>
                                            <v-flex xs12>
                                                Atención presencial
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                    </v-sheet>
                                    <v-card-title>
                                    <v-spacer></v-spacer>
                                    <v-text-field
                                        v-model="search"
                                        append-icon="search"
                                        label="Search"
                                        single-line
                                        hide-details
                                    ></v-text-field>
                                    </v-card-title>
                                    <v-data-table
                                    :headers="headers"
                                    :items="requests"
                                    :search="search"
                                    >
                                    <template v-slot:items="props">
                                        <td>{{ props.item.date }}</td>
                                        <td>{{ props.item.phone }}</td>
                                        <td>{{ props.item.typeLine }}</td>
                                        <td>{{ props.item.request }}</td>
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
                    </v-container>
                </v-card>
                <v-layout row justify-center>
                    <v-dialog v-model="dialogRequest" fullscreen hide-overlay transition="dialog-bottom-transition">
                        <v-card>
                            <v-toolbar dark color="#f48342">
                            <v-btn icon dark @click="dialogRequest = false">
                                <v-icon>close</v-icon>
                            </v-btn>
                            <v-toolbar-title>Atención no presencial</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-toolbar-items>
                                <v-btn dark flat @click="dialog = false">Guardar</v-btn>
                            </v-toolbar-items>
                            </v-toolbar>
                            <v-container>
                                <v-layout>
                                    <v-flex xs12 md6>
                                        <v-list three-line subheader>
                                            <v-subheader>Datos del Usuario</v-subheader>
                                            <v-list-tile>
                                                <v-list-tile-content>
                                                <v-list-tile-title>Titular - Cédula</v-list-tile-title>
                                                <v-list-tile-sub-title></v-list-tile-sub-title>
                                                </v-list-tile-content>
                                            </v-list-tile>
                                            <v-list-tile>
                                                <v-list-tile-content>
                                                <v-list-tile-title>Línea - Tipo de Línea</v-list-tile-title>
                                                <v-list-tile-sub-title>{{face.phone === '-' ? 'N/A' : face.phone }} - {{face.typeLine}}</v-list-tile-sub-title>
                                                </v-list-tile-content>
                                            </v-list-tile>
                                        </v-list>
                                    </v-flex>
                                    <v-flex xs12 md6>
                                        <v-list three-line subheader>
                                            <v-subheader>Otros datos</v-subheader>
                                            <v-list-tile>
                                                <v-list-tile-content>
                                                <v-list-tile-title>Tél. Contacto</v-list-tile-title>
                                                <v-list-tile-sub-title>{{face.contact}}</v-list-tile-sub-title>
                                                </v-list-tile-content>
                                            </v-list-tile>
                                            <v-list-tile>
                                                <v-list-tile-content>
                                                <v-list-tile-title>Ult. Actualización</v-list-tile-title>
                                                <v-list-tile-sub-title>{{face.update}}</v-list-tile-sub-title>
                                                </v-list-tile-content>
                                            </v-list-tile>
                                        </v-list>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                            <v-divider></v-divider>
                            <v-container>
                                <v-layout>
                                    <v-flex xs12 md6>
                                        <v-list three-line subheader>
                                            <v-subheader>Requerimiento</v-subheader>
                                            <v-list-tile>
                                                <v-list-tile-action>
                                                <v-switch color="success"></v-switch>
                                                </v-list-tile-action>
                                                <v-list-tile-content>
                                                <v-list-tile-title>{{face.request}}</v-list-tile-title>
                                                </v-list-tile-content>
                                            </v-list-tile>
                                        </v-list>
                                    </v-flex>
                                    <v-flex xs12 md6>
                                        <v-subheader>Memo</v-subheader>
                                        <v-textarea
                                        color="deep-orange darken-1"
                                        box
                                        label="Observaciones"
                                        ></v-textarea>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card>
                    </v-dialog>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import firebase from 'firebase'
export default {
    data () {
        return {
        face: '',
        dialogRequest: false,
        search: '',
        headers: [
            {
            text: 'Fecha',
            align: 'left',
            sortable: false,
            value: 'date'
            },
            {
            text: 'Línea',
            align: 'left',
            sortable: false,
            value: 'phone'
            },
            { text: 'Tec.', value: 'typeLine', sortable: false, },
            { text: 'Requerimiento', value: 'request', sortable: false, }
        ],
        requests: []
        }
    },
    methods: {
        processRequest (request){
            this.face = Object.assign({}, request)
            this.dialogRequest = true
        }
    },
    mounted() {
        this.requests = []
        firebase.database().ref('history')
            .on('value', requests => {
                var request = requests.val()
                for(let key in request){
                    request[key].requests.forEach(element => {
                        this.requests.push({
                        key: key,
                        date: request[key].date,
                        phone:  request[key].phone,
                        typeLine:  request[key].typeLine,
                        request: element,
                        contact: request[key].contact,
                        update: request[key].update
                        })
                    }); 
                }
            })
    },
}
</script>
