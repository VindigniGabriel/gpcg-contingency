<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 lg5 mb-3>
        <v-expansion-panel popout>
          <v-expansion-panel-content
            v-for="(item,i) in helps"
            :key="i"
          >
            <template v-slot:header>
              <div>{{helps[i].title}}</div>
            </template>
            <v-card>
              <v-container>
              <v-timeline>
                <v-timeline-item
                  v-for="(step, index) in helps[i].intructions"
                  :key="index"
                  color="deep-orange lighten-1"
                  large
                >
                  <template v-slot:opposite>
                    <span>{{step.title}}</span>
                  </template>
                  <v-card class="elevation-2">
                    <v-card-title class="headline">{{step.name}}</v-card-title>
                    <v-card-text>
                      <ul>
                        <li v-for="(list, index) in step.lists" :key="index">
                          {{list}}
                        </li>
                      </ul>
                    </v-card-text>
                  </v-card>
                </v-timeline-item>
              </v-timeline>
              </v-container>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>

      <v-flex xs12 lg5 offset-lg2>
        <v-expansion-panel inset>
          <v-expansion-panel-content
            v-for="(item,i) in 5"
            :key="i"
          >
            <template v-slot:header>
              <div>Item</div>
            </template>
            <v-card>
              <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
    data() {
      return {
        helps: [{
          intructions: [
            { name: 'Paso 1',
              title: 'Verifica los Datos',
              lists: [
                'Solicita Cédula Láminada',
                'Selecciona Tipo de Nacionalidad',
                'Introduce número de Cédula',
                'Click en Buscar (Icono Lupa)'
              ]
            },
            { name: 'Paso 2',
              title: 'Ingresa ó Edita el Nombre del Usuario',
              lists: [
                `Click en el campo 'Titular de la cédula de identidad'`,
                'Ingresa el Nombre y Apellido(s) del Usuario',
                'Verifica una vez más la Cédula del Usuario'
              ]
            },
            { name: 'Paso 3', 
              title: 'Agrega Requerimiento(s)',
              lists: [
                'Completado los Pasos 1 y 2 se habilita el incono "+" para abrir el Formulario de Requerimiento',
                'Selecciona uno o varios Requerimientos sobre una misma Línea',
                'Completados los campos requeridos se hablita el Boton "Agregar" para finalizar el registro',
                'Si el usuario desea realizar otras transacciones sobre otra Línea dar click en "+"'
              ]
            },
            { name: 'Paso 4 (opcional)', 
              title: 'Edita - Elimina Requerimiento(s)',
              lists: [
                'Cada registro de Líneas con Requerimiento(s) cuenta con las opciones de Editar y Eliminar',
                'Considere que el proceso de Eliminar será de forma permanente sobre el registro eliminado'
              ]
            }
          ], title : 'Registro de Usuarios'
        }]
      }
    },
}
</script>