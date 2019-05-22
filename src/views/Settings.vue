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
                        settings
                      </v-icon>
                      Configuraciones
                    </h3>
                  </div>
                </v-card-title>
      <v-layout>
        <v-flex xs12 md8 offset-md2 py-2>
          <div>
            <v-alert
              v-model="alert"
              dismissible
              type="success"
            >
              Las configuraciones han sido guardadas.
            </v-alert>
          </div>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
      <v-flex xs12 md8 offset-md2 mb-3>
        <v-expansion-panel popout>
          <v-expansion-panel-content
          >
            <template v-slot:header>
              <span>
                Requerimientos
              </span>
            </template>
                <template>
                  <div>
                    <v-toolbar flat color="white">
                      <v-toolbar-title class="hidden-sm-and-down">Actualizar</v-toolbar-title>
                      <v-divider
                        class="mx-2"
                        inset
                        vertical
                      ></v-divider>
                      <v-spacer></v-spacer>
                      <v-dialog v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ on }">
                          <v-btn color="blue" dark class="mb-2" v-on="on" outline>Agregar</v-btn>
                          <v-btn color="success" dark class="mb-2" @click="saveChange" outline>Guardar</v-btn>
                        </template>
                        <v-card>
                          <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                          </v-card-title>

                          <v-card-text>
                            <v-container grid-list-md>
                              <v-layout wrap>
                                <v-flex xs12>
                                  <v-text-field 
                                    v-model="newRequest" 
                                    label="Nombre del requerimiento"
                                    color="blue"
                                  ></v-text-field>
                                </v-flex>
                                <v-flex>
                                  <v-alert
                                    :value="true"
                                    type="warning"
                                  >
                                    Tenga en cuenta que los requerimientos agregados no podrán ser editados ni eliminados.
                                  </v-alert>
                                </v-flex>
                              </v-layout>
                            </v-container>
                          </v-card-text>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="red" flat @click="close">Cancelar</v-btn>
                            <v-btn color="success" flat @click="save" :disabled="disabledNewRequest">Guardar</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-toolbar>
                    <v-data-table
                      :headers="headers"
                      class="elevation-1"
                      :items="requests"
                    >
                      <template v-slot:items="props">
                        <td>{{ props.item }}</td>
                        <td v-for="(type, i) in typeLine" :key="i">
                          <v-switch 
                            color="success"
                            v-model="options[props.index][i]"
                          >
                          </v-switch>
                        </td>
                      </template>
                    </v-data-table>
                  </div>
                </template>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
    </v-layout>
    </v-card>
        </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
import firebase from 'firebase'
  export default {
    data: () => ({
      alert: false,
      newRequest: '',
      options: [],
      typeLine: [],
      dialog: false,
      headers: [
        {
          text: 'Requerimientos',
          align: 'center'
        },
        {
          text: 'Pre/CDMA',
          sortable: false,
          align: 'center'
        },
        {
          text: 'Pre/GSM',
          sortable: false,
          align: 'center'
        },
        {
          text: 'Cre/CDMA',
          sortable: false,
          align: 'center'
        },
        {
          text: 'Cre/GSM',
          sortable: false,
          align: 'center'
        }
      ],
      requests: [],
      editedIndex: -1,
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Agregar' : 'Editar'
      },
      disabledNewRequest(){
        return (this.newRequest === '') ? true : false
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.initialize()
    },

    methods: {
      saveChange(){
        this.requests.forEach((request, key) => {
          firebase.database().ref('settings/options')
            .child(request)
            .set(this.options[key])
          })

        firebase.database().ref('settings')
          .child('requests')
          .set(this.requests)

        this.alert = true
        
      },
      initialize () {
        this.typeLine = [],
        firebase.database().ref('settings')
        .child('typeLine')
        .once('value', typeLine => {
          this.typeLine = typeLine.val()
        })
      },

      close () {
        this.dialog = false
      },

      save () {
        var n = []
        this.typeLine.forEach((type, index) => {
            n.push(false)
        })
        this.options.push(n)
        this.requests.push(this.newRequest)

        this.close()
      }
    },
    mounted() {
      firebase.database().ref('settings')
        .once('value', options => {
          this.requests = Object.keys(options.val().options).map(i => i)
          this.options = Object.keys(options.val().options).map(i => options.val().options[i] )
        })
    },
  }
</script>
