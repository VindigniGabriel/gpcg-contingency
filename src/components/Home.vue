<template>
<v-container>
<v-layout>
  <v-flex>
    <v-card>
      <v-card-title primary-title dark>
        <div>
          <h3 class="headline mb-0 font-weight-light font-italic">
            <v-icon>
              person_add
            </v-icon>
            Registro de Usuario
          </h3>
        </div>
        <v-spacer></v-spacer>
        <v-btn
            v-show="dataUser" 
            color="success" 
            dark
            outline
            :disabled="updateRecord"
            @click="updateClient"
            center
          >
            Listo
            <v-icon 
              right 
              dark
            >
              check
            </v-icon>
          </v-btn>
      </v-card-title>
    <div>
  <v-container>
    <v-layout  align-start justify-center row fill-height wrap v-show="!dataUser">
      <v-flex xs6 md3>
        <form @submit.prevent="search">
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
              type="submit"
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
        <v-layout mt-4 v-show="dataUser">
            <v-flex xs12>
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
                  <v-btn dark class="mb-2" v-on="on" flat icon @click="updateDate" :disabled="addHistory">
                    <v-icon>
                      add
                    </v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">Agregar Requerimiento</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12 sm6>
                          <v-text-field 
                            v-model="date" 
                            label="Fecha/Hora" 
                            :disabled="true"
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                          <v-checkbox
                            v-model="LineNew"
                            label="Línea Nueva"
                            color="blue"
                          ></v-checkbox>
                        </v-flex>
                        <v-flex xs12 sm6 v-if="!LineNew">
                          <v-text-field
                            v-model="phone"
                            label="Línea"
                            hint="Ejemplo. (416) xxx - xxxx"
                            persistent-hint
                            single-line
                            :mask="mask"
                            color="dark"
                            type="tel"
                            :error-messages="phoneErrors"
                            @input="$v.phone.$touch()"
                            @blur="$v.phone.$touch()"
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 v-else>
                          <v-text-field 
                            v-model="phone" 
                            label="Línea Nueva" 
                            color="blue"
                            disabled
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                          <v-select
                            v-model="typeLine"
                            :items="typeLineItems"
                            label="Tipo de Línea"
                            color="blue"
                            @change="changeTypeLine"
                            :error-messages="typeLineErrors"
                            @input="$v.typeLine.$touch()"
                            @blur="$v.typeLine.$touch()"
                          ></v-select>
                        </v-flex>
                        <v-flex xs12>
                          <v-select
                            v-model="requests"
                            :items="requestsDynamic"
                            label="Requerimiento(s)"
                            multiple
                            chips
                            persistent-hint
                            color="blue"
                            :error-messages="requestsErrors"
                            @input="$v.requests.$touch()"
                            @blur="$v.requests.$touch()"
                          ></v-select>
                        </v-flex>
                        <v-flex xs12 sm6>
                          <v-text-field
                            v-model="contact"
                            label="Tél. Contacto"
                            hint="Ejemplo. (212) xxx - xxxx"
                            persistent-hint
                            single-line
                            :mask="mask"
                            color="dark"
                            type="tel"
                            :error-messages="contactErrors"
                            @input="$v.contact.$touch()"
                            @blur="$v.contact.$touch()"
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                           <v-text-field 
                            v-model="location" 
                            label="Sector"
                            color="blue"
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                          <v-select
                            v-model="ocm"
                            :items="ocms"
                            label="Oficina"
                            persistent-hint
                            color="blue"
                          ></v-select>
                        </v-flex>
                        <v-flex xs12>
                          <v-textarea
                            box
                            name="input-7-4"
                            label="Observaciones"
                            color="blue"
                            v-model="observations"
                            :counter="30"
                            :error-messages="observationsErrors"
                            @input="$v.observations.$touch()"
                            @blur="$v.observations.$touch()"
                          ></v-textarea>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-3" flat @click="close">Cancelar</v-btn>
                    <v-btn color="success" flat @click="save">Agregar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>

 <v-card
    class="mt-5 mx-auto"
  >
  <v-sheet
      class="v-sheet--offset mx-auto"
      color="grey lighten-3"
      elevation="12"
      max-width="calc(100% - 32px)"
    >
      <v-container>
        <v-layout>
          <v-flex xs12>
            
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
          </v-flex>
        </v-layout>
      </v-container>
      
    </v-sheet>

    <v-card-text class="pt-0">

            <v-data-table
              :headers="filterHeaderTable"
              :items="filterItemsTable"
              class="elevation-1"
            >
              <template v-slot:items="props">
                <tr :class="props.item.pending ? 'red accent-1' : 'green accent-1'">
                <td>{{ props.item.date }}</td>
                <td class="text-xs-left">{{ props.item.phone }}</td>
                <td class="text-xs-left">{{ props.item.requests.join() }}</td>
                <td class="text-xs-left">{{ props.item.typeLine }}</td>
                <td class="text-xs-left">{{ props.item.ocm }}</td>
                <td class="text-xs-left">{{ props.item.update }}</td>
                <td class="text-xs-right">
                  <v-edit-dialog
                    :return-value.sync="props.item.contact"
                    lazy
                    @save="editContact(props.item)"
                  >
                    <div>{{ props.item.contact }}</div>
                    <template v-slot:input>
                      <div class="mt-3 title">Update Iron</div>
                    </template>
                    <template v-slot:input>
                      <v-text-field
                        v-model="props.item.contact"
                        label="Tél. Contacto"
                        hint="Ejemplo. (212) xxx - xxxx"
                        persistent-hint
                        single-line
                        :mask="mask"
                        color="dark"
                        type="tel"
                      ></v-text-field>
                      <span>Enter para guardar</span>
                    </template>
                  </v-edit-dialog>
                </td>
                <td class="text-xs-left">{{ props.item.observations }}</td>
                </tr>
              </template>
              <template v-slot:footer>
                <td :colspan="headers.length">
                  <strong>(*) Campo editable</strong>
                  <v-chip color="green" dark>cerrado</v-chip>
                  <v-chip color="red" dark>pendiente</v-chip>
                </td>
              </template>
            </v-data-table>


 </v-card-text>
  </v-card>
          </div>
        </template>
        <v-flex xs12>
        <v-snackbar v-model="snackEditContact" :timeout="3000" color="success">
          Tél. contacto ha sido actualizado
          <v-btn flat @click="snackEditContact = false">Cerrar</v-btn>
        </v-snackbar>
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
import { required, minLength, maxLength} from 'vuelidate/lib/validators'
import { setInterval } from 'timers';
import firebase from 'firebase'
import { isNull } from 'util';
export default {
  mixins: [validationMixin],

  validations() {
      if(this.LineNew){
        return {
          phone: { required },
          typeLine: { required },
          requests: { required },
          contact: { required,  minLength: minLength(10) },
          observations: { required }
        }
      }else{
        return {
          phone: { required, minLength: minLength(10) },
          typeLine: { required },
          requests: { required },
          contact: { required,  minLength: minLength(10) },
          observations: { required }
        }
      }
    },
  
  /* validations(){
    console.log('valida')
  }, */

  components: {
    Cleave
  },
  data() {
    return {
      snackEditContact: false,
      date: '',
      requests: '',
      requestsItems: [],
      phone: 416,
      LineNew: false,
      typeLine: '',
      typeLineItems: [],
      contact: 212,
      ocm: '',
      location: '',
      observations: '',
      db: firebase.database(),
      snackbar: false,
      color: '',
      mode: '',
      timeout: 6000,
      text: 'Recuerde Actualizar Registro(s)',
      updated: false,
      hora: 'date.now()',
      mask: 'phone',
      userName: 'Titular de la cédula de identidad',
      showField: false,
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
        { text: 'Línea', value: 'phone', view: true, sortable: false },
        { text: 'Requerimientos', value: 'requests', view: true, sortable: false },
        { text: 'Tec.', value: 'typeLine', view: true, sortable: false },
        { text: 'Oficina', value: 'ocm', view: true, sortable: false },
        { text: 'Ult. Act.', value: 'update', view: true, sortable: false },
        { text: 'Tél. Contacto (*)', value: 'contact', view: true, sortable: false },
        { text: 'Observaciones', value: 'observations', view: true, sortable: false }
      ],
      records: [],
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
    },
    LineNew (val) {
      if(val){
        this.phone = '-'
      }else{
        this.phone = '416'
      }
    }
  },
  computed:{
    phoneErrors () {
      const errors = []
      if (!this.$v.phone.$dirty) return errors
      !this.$v.phone.required && errors.push('Teléfono requerido.')
      !this.$v.phone.minLength && errors.push('Télefono no valido')
      return errors
    },
    typeLineErrors () {
      const errors = []
      if (!this.$v.typeLine.$dirty) return errors
      !this.$v.typeLine.required && errors.push('Tipo de Línea requerido.')
      return errors
    },
    requestsErrors () {
      const errors = []
      if (!this.$v.requests.$dirty) return errors
      !this.$v.requests.required && errors.push('Seleccione al menos un requerimiento.')
      return errors
    },
    contactErrors () {
      const errors = []
      if (!this.$v.contact.$dirty) return errors
      !this.$v.contact.required && errors.push('Teléfono de contacto requerido.')
      !this.$v.contact.minLength && errors.push('Télefono de contacto no valido')
      return errors
    },
    observationsErrors () {
      const errors = []
      if (!this.$v.observations.$dirty) return errors
      !this.$v.observations.required && errors.push('Debe dejar un comentario breve.')
      return errors
    },
    requestsDynamic: (data) => {
      data.requests = ''
      if(data.LineNew){
        return ['Línea Nueva']
      }else{
        return data.requestsItems
      }
    },
    intro: data => data.searchIdentify.length < 2 && !data.dataUser,
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
    }
  },
  methods: {
    editContact (request) {
      for(let key in this.records){
        if(this.records[key].key === request.key)
          this.records[key].contact = request.contact
      }
      firebase.database().ref(`history/${request.key}`)
        .update({
          contact: request.contact
        })
      this.snackEditContact = true
    },
    changeTypeLine () {
      this.requestsItems = []
      const key = this.typeLineItems.indexOf(this.typeLine)
        if(key > -1){
          firebase.database().ref('settings/options')
            .on('value', request => {
              for(let k in request.val()){
                if(request.val()[k][key]){
                  this.requestsItems.push(k)
                }
              }
            })
        }
    },
    updateDate(){
      this.addRequests()
      this.date =  moment().format("YYYY-MM-DD HH:mm:ss")
    },
    updateClient(){
      this.db.ref(`userData/${this.searchIdentify}`)
        .update({
          name: this.userName
        })
      this.dataUser = false,
      this.updated = true,
      this.intro = true
    },
    initialize (val) {
      this.$v.$reset()
      this.phone = '416'
      this.typeLine = ''
      this.requests = ''
      this.contact = '212'
      this.location = ''
      this.LineNew = false
      this.observations = ''
      this.typeLineItems = []
      val.forEach( valor => this.typeLineItems.push(valor))
    },
    addRequests(){
      firebase.database().ref('settings/typeLine').on('value', snapshot => this.initialize(snapshot.val()))
    },
    save () {
      this.$v.$touch()
      var statusRequests = []

      if (!this.$v.$invalid) {
        var index = [],
            request = {
            date: this.date,
            requests: this.requests,
            phone: this.phone,
            LineNew: this.LineNew,
            typeLine: this.typeLine,
            contact: this.contact,
            ocm: this.ocm,
            update: '',
            location: this.location,
            observations: this.observations
            }

        request.requests.forEach(value => {
          statusRequests.push(false)
        })
        Object.assign(request, {statusRequests: statusRequests})
        Object.assign(request, {quality: request.requests.length, pending: request.requests.length })
        
        var key = this.db.ref('history')
          .push(request).key

        this.records.push(Object.assign({ key: key }, request))

        this.db.ref(`userData/${this.searchIdentify}`)
          .set({name: this.userName})
        this.db.ref()
          .child('userHistory')
          .child(key)
          .set(this.searchIdentify)

        this.dialog = false
      }
    },
    close () {
      this.$v.$reset()
      this.dialog = false
    },
    selectN(){
      this.searchIdentify = ''
      this.options.prefix = this.selectNacionality.substr(0,1)
    },
    cargarRecords(snapshot){
      this.records = []
      for( let key in snapshot){
        this.db.ref(`history/${key}`).once('value')
          .then(history => {
              this.records.push(Object.assign({ key: key }, history.val()))
          })
        this.progress = false
      }
    },
    search(){
      this.updated = false
      this.progress = true
      firebase.database().ref(`userData/${this.searchIdentify}`).once('value')
      .then(snapshot => {
        this.userName = snapshot.val().name
        this.dataUser = true
         firebase.database().ref('userHistory')
          .orderByValue()
          .equalTo(this.searchIdentify)
          .on('value', snapshot => {
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
  .v-sheet--offset {
    top: -24px;
    position: relative;
  }
</style>