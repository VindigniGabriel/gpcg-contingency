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
                        person_add
                      </v-icon>
                      Registro de Usuario
                    </h3>
                  </div>
                </v-card-title>

<div>
  <v-container fluid>
    <v-layout  align-start justify-center row fill-height wrap>
      <v-flex xs6 md3>
        <form>
          <v-select
            :items="nacionality"
            color="dark"
            v-model="selectNacionality"
            label="Seleccione nacionalidad"
            @change="selectN"
          ></v-select>
          <cleave 
            :options="options" 
            class="form-control" 
            color="blue"
            v-model.number="searchIdentify"
            type="tel"
          >
          </cleave>
          <v-layout align-center justify-space-around row fill-height>
            <v-btn 
              @click="search" 
              color="success" 
              flat
              icon 
              :disabled="verifySearch"
            >
              <v-icon>
                search
              </v-icon>
            </v-btn>
            <v-btn 
              @click="clear" 
              color="red darken-3" 
              flat
              icon 
              :disabled="progress"
            >
              <v-icon>
                delete_sweep
              </v-icon>
            </v-btn>
          </v-layout>
        </form>
        <br>
          <v-progress-linear
            v-show="progress" 
            :indeterminate="progress" 
            color="blue lighten-3"
          >
          </v-progress-linear>
      </v-flex>
    </v-layout>
    <v-layout align-start justify-center row fill-height wrap v-show="dataUser">
      <v-flex xs12 md8>
        <v-alert
          :value="true"
          color="deep-orange lighten-1"
          icon="account_circle"
          outline
        >
          <span>
            <span v-show="!showField" @click="focusField()">{{userName}}</span>
            <v-text-field 
              v-model="userName" 
              v-show="showField" 
              @focus="focusField()" 
              @blur="blurField"
              label="Titular de la cédula de identidad"
              single-line
              clearable
              color="blue"
            >
            </v-text-field>
            - {{ searchIdentify }} 
          </span>
        </v-alert>
        <template>
          <div>
            <v-toolbar flat color="deep-orange lighten-1">
              <v-toolbar-title>Historial</v-toolbar-title>
              <v-divider
                class="mx-2"
                inset
                vertical
              ></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on }">
                  <v-btn color="white" dark class="mb-2" v-on="on" flat @click="updateDate" :disabled="addHistory">
                    <v-icon>
                      add
                    </v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12 sm6>
                          <v-text-field 
                            v-model="editedItem.date" 
                            label="Fecha/Hora" 
                            :disabled="true"
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                          <v-checkbox
                            v-model="editedItem.new"
                            label="Línea Nueva"
                            color="blue"
                          ></v-checkbox>
                        </v-flex>
                        <v-flex xs12 sm6 v-if="!editedItem.new">
                          <v-text-field
                            v-model="editedItem.phone"
                            label="Línea"
                            hint="Ejemplo. (416) xxx - xxxx"
                            persistent-hint
                            single-line
                            :mask="mask"
                            color="dark"
                            type="tel"
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 v-else>
                          <v-text-field 
                            v-model="editedItem.phone" 
                            label="Cantidad de Líneas" 
                            color="blue"
                            disabled
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                          <v-select
                            v-model="editedItem.typeLine"
                            :items="typeLine"
                            label="Tipo de Línea"
                            color="blue"
                            @blur="changeTypeLine"
                          ></v-select>
                        </v-flex>
                        <v-flex xs12>
                          <v-select
                            v-model="editedItem.requests"
                            :items="requestsDynamic"
                            label="Requerimiento(s)"
                            multiple
                            chips
                            persistent-hint
                            color="blue"
                          ></v-select>
                        </v-flex>
                        <v-flex xs12 sm6>
                          <v-text-field
                            v-model="editedItem.contact"
                            label="Tél. Contacto"
                            hint="Ejemplo. (212) xxx - xxxx"
                            persistent-hint
                            single-line
                            :mask="mask"
                            color="dark"
                            type="tel"
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                           <v-text-field 
                            v-model="editedItem.location" 
                            label="Sector"
                            color="blue"
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                          <v-select
                            v-model="editedItem.ocm"
                            :items="ocms"
                            label="Oficina"
                            persistent-hint
                            color="blue"
                          ></v-select>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-3" flat @click="close">Cancelar</v-btn>
                    <v-btn color="success" flat @click="save" :disabled="!validateAdd">Agregar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
            <v-data-table
              :headers="filterHeaderTable"
              :items="filterItemsTable"
              class="elevation-1"
            >
              <template v-slot:items="props">
                <td>{{ props.item.date }}</td>
                <td class="text-xs-left">{{ props.item.requests.join() }}</td>
                <td class="text-xs-left">{{ props.item.phone }}</td>
                <td class="text-xs-left">{{ props.item.typeLine }}</td>
                <td class="justify-center layout">
                  <v-icon
                    small
                    class="mr-2"
                    @click="editItem(props.item)"
                  >
                    edit
                  </v-icon>
                  <v-icon
                    small
                    @click="deleteItem(props.item, props.item.key)"
                  >
                    delete
                  </v-icon>
                </td>
              </template>
            </v-data-table>
          </div>
        </template>
        <v-flex xs12>
        <div class="text-xs-center">
          <v-btn 
            round 
            color="success" 
            dark
            outline
            :disabled="updateRecord"
            @click="update"
          >
            Listo
            <v-icon 
              right 
              dark
            >
              check
            </v-icon>
          </v-btn>
        </div>
      </v-flex>
      </v-flex>
    </v-layout>
    <v-layout align-start justify-center row fill-height wrap v-show="updated">
      <v-flex xs12 sm8 md6>
       <div>
        <v-alert
          :value="updated"
          type="success"
          transition="scale-transition"
        >
          {{ userName }} - {{ searchIdentify }}. Actualizado con Éxito!
        </v-alert>
        <div class="text-xs-center">
          <v-btn
            round
            outline
            color="success"
            @click="updated = !updated, searchIdentify = ''"
          >
            Aceptar
          </v-btn>
        </div>
      </div>
      </v-flex>
    </v-layout>
  </v-container>
    <div v-show="intro">
      <v-container fill-height>
        <v-layout align-center justify-center column> 
          <v-flex xs12 sm8 md4>
            <v-avatar
              :tile="false"
              size="40px"
              color="grey lighten-4"
            >
              <img src="https://pbs.twimg.com/profile_images/855250504464703490/mrIeA3nU_400x400.jpg" alt="avatar">
            </v-avatar>
          </v-flex>
        </v-layout>
      </v-container>
      <v-container fill-height>
        <v-layout align-center justify-center column> 
          <v-flex xs12 sm8 md4>
            <span class="font-weight-thin">Registro de Usuarios <v-icon color="deep-orange lighten-1">add</v-icon> Requerimientos</span>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </div>
  </v-card>
        </v-flex>
</v-layout>
</v-container>
</template> 
<script>
import moment from 'moment'
import { validationMixin } from 'vuelidate'
import Cleave from 'vue-cleave-component';
import { required, maxLength } from 'vuelidate/lib/validators'
import { setInterval } from 'timers';
import firebase from 'firebase'
import { isNull } from 'util';
export default {
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(10) },
  },
  components: {
    Cleave
  },
  data() {
    return {
      db: firebase.database(),
      snackbar: false,
      color: '',
      mode: '',
      timeout: 6000,
      text: 'Recuerde Actualizar Registro(s)',
      updated: false,
      hora: 'date.now()',
      typeLine: [],
      mask: 'phone',
      userName: 'Titular de la cédula de identidad',
      showField: true,
      dialog: false,
      requests: [],
      ocms: [
        'Caricuao',
        'Metrocencer',
        'Sambil'
      ],
      headers: [
        {
          text: 'Fecha/Hora',
          align: 'left',
          value: 'date',
          view: true
        },
        { text: 'Requerimiento(s)', value: 'requests', view: true },
        { text: 'Línea/ Cantd. Líneas Nueva', value: 'phone', view: true, sortable: false },
        { text: 'Tec.', value: 'typeLine', view: true, sortable: false }
      ],
      records: [],
      editedIndex: -1,
      editedItem: {
        date: '',
        requests: '',
        phone: 416,
        new: false,
        typeLine: [],
        contact: 212,
        status: 'Pendiente',
        ocm: '',
        update: '',
        statusRequests: []
      },
      defaultItem: {
        date: '',
        requests: '',
        phone: 416,
        new: false,
        typeLine: [],
        contact: 212,
        status: 'Pendiente',
        ocm: '',
        update: '',
        statusRequests: []
      },
      ver: 'null',
      step: 1,
      date: '',
      menu: false,
      dataUser: false,
      progress: false,
      identify: false,
      nacionality: [
        'Venezolana',
        'Extranjero'
      ],
      searchIdentify: '', 
      options: {
        numeral: true,
        numeralDecimalMark: ',',
        delimiter: '.',
        prefix: 'V'
      },
      selectNacionality: 'Venezolana'
    }
  },
   watch: {
      dialog (val) {
        val || this.close()
      }
    },
  computed:{
    requestsDynamic: (data) => {
      if(data.editedItem.new){
        data.editedItem.phone = '1'
        return ['Línea Nueva']
      }else{
        data.editedItem.phone = '416'
        return data.requests
      }
    },
    intro: data => data.searchIdentify.length < 2 && !data.dataUser,
    validateAdd(){
      return (this.editedItem.requests.length > 0 && this.editedItem.typeLine !== '' && this.editedItem.contact.length == 10 && (this.editedItem.phone.length === 1 || this.editedItem.phone.length === 10 )) ? true : false
    },
    updateRecord(){
      if(this.userName == '' || this.userName == null ||  this.userName == 'Titular de la cédula de identidad' || this.records.length < 1){
        return true
      }else{
        return false
      }
    },
    addHistory(){
      return (this.userName == '' || this.userName == null ||  this.userName == 'Titular de la cédula de identidad') ? true : false
    },
    filterHeaderTable(){
      return this.headers.filter((header) => header.view)
    },
    filterItemsTable(){
    return this.records.map(record => {
      let filtered = Object.assign({}, record)
      this.headers.forEach(header => {
        if (!header.view) delete filtered[header.value]
      })
      return filtered
    })
  },
    formTitle () {
        return this.editedIndex === -1 ? 'Crear Requerimiento' : 'Editar Requerimiento'
      },
    verifySearch: (data) => {
      data.updated = false
      data.records = []
      data.dataUser = false
      data.userName =  'Titular de la cédula de identidad'
      if  (data.searchIdentify.length > 6) {
        data.intro = false
        return false
      }else{
        return true
      }
    },
    currentTitle () {
        switch (this.step) {
          case 1: return 'Nombre - Usuari@'
          case 2: return 'Registrar Evento'
          default: return 'Detalle del Evento'
        }
      }
  },
  methods: {
    changeTypeLine(){
      this.requests = []
      const key = this.typeLine.indexOf(this.editedItem.typeLine)
        if(key > -1){
          firebase.database().ref('settings/options')
            .on('value', request => {
              for(let k in request.val()){
                if(request.val()[k][key]){
                  this.requests.push(k)
                }
              }
            })
        }
    },
    updateDate(){
      this.addRequests()
      this.editedItem.date =  moment().format("YYYY-MM-DD HH:mm:ss")
      this.defaultItem.date =  moment().format("YYYY-MM-DD HH:mm:ss")
    },
    update(){
      this.db.ref(`userData/${this.searchIdentify}`)
        .update({
          name: this.userName
        })
      this.dataUser = false,
      this.updated = true,
      this.intro = true
    },
    initialize (val) {
      this.typeLine = []
      val.forEach( valor => this.typeLine.push(valor))
    },
    addRequests(){
      firebase.database().ref('settings/typeLine').on('value', snapshot => this.initialize(snapshot.val()))
    },
    deleteItem (item, key) {
      const index = this.records.indexOf(item)
      if(confirm('¿Está seguro que desea eliminar este requerimiento?')) {
        this.records.splice(index, 1)
      console.log(key)

        this.db.ref(`history/${key}`).remove()
        this.db.ref(`userHistory/${key}`).remove()
        key = ''
      }
    },
    save () {
       var statusRequests = []
      if (this.editedIndex > -1) {
        Object.assign(this.records[this.editedIndex], this.editedItem)
        Object.assign(this.records[this.editedIndex], {quality: this.records[this.editedIndex].requests.length, pending:this.editedItem.requests.length})

        this.records[this.editedIndex].requests.forEach(value => {
          statusRequests.push(false)
        })
        Object.assign(this.records[this.editedIndex], {statusRequests: statusRequests})
        this.db.ref(`history/${this.records[this.editedIndex].key}`)
          .update(this.records[this.editedIndex])
      } else {
        var index = []
        this.editedItem.requests.forEach(value => {
          statusRequests.push(false)
        })
        Object.assign(this.editedItem, {statusRequests: statusRequests})
        Object.assign(this.editedItem, {quality: this.editedItem.requests.length, pending:this.editedItem.requests.length })
        
        var key = this.db.ref('history')
          .push(this.editedItem).key
        this.records.push(Object.assign({ key: key }, this.editedItem))
        

        this.db.ref(`userData/${this.searchIdentify}`)
          .set({name: this.userName})
        this.db.ref()
          .child('userHistory')
          .child(key)
          .set(this.searchIdentify)
      }
      this.close()
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    editItem (item) {
      this.editedIndex = this.filterItemsTable.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    prueba(val){
      this.ver = val
    },
    selectN(){
      this.searchIdentify = ''
      this.options.prefix = this.selectNacionality.substr(0,1)
    },
    cargarRecords(snapshot){
      for( let key in snapshot){
        this.db.ref(`history/${key}`).once('value')
          .then(history => {
              this.records.push(Object.assign({ key: key }, history.val()))
          })
      }
      
    },
    search(){
      this.updated = false
      this.records = []
      this.progress = true
      firebase.database().ref(`userData/${this.searchIdentify}`).once('value')
      .then(snapshot => {
        this.userName = snapshot.val().name
        this.progress = false
        this.dataUser = true
         firebase.database().ref('userHistory')
          .orderByValue()
          .equalTo(this.searchIdentify)
          .once('value', snapshot => {
            this.cargarRecords(snapshot.val())
          })
        })
        .catch( error => {
          this.progress = false
          this.dataUser = true
        })
    },
    clear () {
      this.options.prefix = 'V',
      this.searchIdentify = '',
      this.selectNacionality = 'Venezolana'
      this.dataUser = false
      this.updated = false
    },
    focusField(){
      this.showField = true
      if(this.userName == 'Titular de la cédula de identidad') {
        this.userName = ''
      }
    },
    blurField(){
      this.showField = false
      if(this.userName == '' || this.userName == null) {
        this.userName = 'Titular de la cédula de identidad'
      }
    }
  },
  
  created() {
    this.addRequests()
  }
}
</script>
<style>
.resultContainer {
    height: 750px;
  }
</style>