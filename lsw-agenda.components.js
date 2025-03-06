(function(factory) {
  const mod = factory();
  if(typeof window !== 'undefined') {
    window["Lsw_agenda_components"] = mod;
  }
  if(typeof global !== 'undefined') {
    global["Lsw_agenda_components"] = mod;
  }
  if(typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function() {
Vue.component("LswAgenda", {
  name: "LswAgenda",
  template: `<div class="lsw_agenda">
    <div v-descriptor="'agenda.calendar.buttons_panel_1'"
        class="flex_1 flex_row"
        style="gap: 4px;">
        <div class="flex_1">
            <button class="width_100 nowrap"
                v-on:click="() => selectSubmenu1('add')">+</button>
            <div class="hidden_menu"
                v-if="selectedSubmenu1 === 'add'">
                <div class="hidden_menu_fixed_layer"
                    v-on:click="() => selectSubmenu1('none')"></div>
                <div class="hidden_menu_box ">
                    <div class="hidden_menu_items">
                        <div>
                            <button v-on:click="() => selectContext('accion.add', { initialValues: { starts_at: selectedDate } })">Nueva acción</button>
                        </div>
                        <div>
                            <button v-on:click="() => selectContext('concepto.add')">Nuevo concepto</button>
                        </div>
                        <div>
                            <button v-on:click="() => selectContext('limitador.add')">Nuevo limitador</button>
                        </div>
                        <div>
                            <button v-on:click="() => selectContext('impresion.add')">Nueva impresión</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex_1">
            <button class="width_100 nowrap"
                v-on:click="() => selectSubmenu1('search')">🔎</button>
            <div class="hidden_menu"
                v-if="selectedSubmenu1 === 'search'">
                <div class="hidden_menu_fixed_layer"
                    v-on:click="() => selectSubmenu1('none')"></div>
                <div class="hidden_menu_box ">
                    <div class="hidden_menu_items">
                        <div>
                            <button v-on:click="() => selectContext('accion.search')">Buscar acción</button>
                        </div>
                        <div>
                            <button v-on:click="() => selectContext('concepto.search')">Buscar concepto</button>
                        </div>
                        <div>
                            <button v-on:click="() => selectContext('propagador.search')">Buscar propagador</button>
                        </div>
                        <div>
                            <button v-on:click="() => selectContext('limitador.search')">Buscar límite</button>
                        </div>
                        <div>
                            <button v-on:click="() => selectContext('impresion.search')">Buscar impresión</button>
                        </div>
                        <div>
                            <button v-on:click="() => selectContext('propagacion.search')">Buscar propagación</button>
                        </div>
                        <div>
                            <button v-on:click="() => selectContext('infraccion.search')">Buscar infracción</button>
                        </div>
                        <div>
                            <button v-on:click="() => selectContext('postimpresion.search')">Buscar postimpresión</button>
                        </div>
                        <div>
                            <button v-on:click="() => selectContext('evento.search')">Buscar evento</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex_1">
            <button class="width_100 nowrap"
                v-on:click="() => selectSubmenu1('reports')">📊</button>
        </div>
        <div class="flex_1">
            <button class="width_100 nowrap"
                v-on:click="() => selectSubmenu1('settings')">⚙️</button>
        </div>
        <div class="flex_100"></div>
    </div>

    <div class="calendar_main_panel">
        <div v-if="selectedContext === 'accion.add'">
            <div class="breadcrumb_box">
                <lsw-agenda-breadcrumb :agenda="this" :path-items="[{label:'Añadir acción'}]" />
            </div>
            <lsw-agenda-accion-add :initial-data="selectedContextParameters.values" />
        </div>
        <div v-else-if="selectedContext === 'accion.search'">
            <div class="breadcrumb_box">
                <lsw-agenda-breadcrumb :agenda="this" :path-items="[{label:'Buscar acción'}]" />
            </div>
            <lsw-agenda-accion-search />
        </div>
        <div v-else-if="selectedContext === 'concepto.add'">
            <div class="breadcrumb_box">
                <lsw-agenda-breadcrumb
                    :agenda="this" 
                    :path-items="[{label:'Añadir concepto'}]" />
            </div>
            <lsw-agenda-concepto-add />
        </div>
        <div v-else-if="selectedContext === 'concepto.search'">
            <div class="breadcrumb_box">
                <lsw-agenda-breadcrumb
                    :agenda="this" 
                    :path-items="[{label:'Buscar concepto'}]" />
            </div>
            <lsw-agenda-concepto-search />
        </div>
        <div v-else-if="selectedContext === 'limitador.add'">
            <div class="breadcrumb_box">
                <lsw-agenda-breadcrumb
                    :agenda="this" :path-items="[{label:'Añadir límite'}]" />
            </div>
            <lsw-agenda-limitador-add />
        </div>
        <div v-else-if="selectedContext === 'limitador.search'">
            <div class="breadcrumb_box">
                <lsw-agenda-breadcrumb
                    :agenda="this" :path-items="[{label:'Buscar límite'}]" />
            </div>
            <lsw-agenda-limitador-search />
        </div>
        <div v-else-if="selectedContext === 'impresion.add'">
            <div class="breadcrumb_box">
                <lsw-agenda-breadcrumb
                    :agenda="this" 
                    :path-items="[{label:'Añadir impresión'}]" />
            </div>
            <lsw-agenda-impresion-add />
        </div>
        <div v-else-if="selectedContext === 'impresion.search'">
            <div class="breadcrumb_box">
                <lsw-agenda-breadcrumb
                    :agenda="this" 
                    :path-items="[{label:'Buscar impresión'}]" />
            </div>
            <lsw-agenda-impresion-search />
        </div>
        <div v-else-if="selectedContext === 'propagacion.search'">
            <div class="breadcrumb_box">
                <lsw-agenda-breadcrumb
                    :agenda="this" 
                    :path-items="[{label:'Buscar propagación'}]" />
            </div>
            <lsw-agenda-propagacion-search />
        </div>
        <div v-else-if="selectedContext === 'postimpresion.search'">
            <div class="breadcrumb_box">
                <lsw-agenda-breadcrumb
                    :agenda="this" 
                    :path-items="[{label:'Buscar postimpresión'}]" />
            </div>
            <lsw-agenda-postimpresion-search />
        </div>
        <div v-else-if="selectedContext === 'infraccion.search'">
            <div class="breadcrumb_box">
                <lsw-agenda-breadcrumb
                    :agenda="this" 
                    :path-items="[{label:'Buscar infracción'}]" />
            </div>
            <lsw-agenda-infraccion-search />
        </div>
        <div v-else-if="selectedContext === 'evento.search'">
            <div class="breadcrumb_box">
                <lsw-agenda-breadcrumb
                    :agenda="this" :path-items="[{label:'Buscar evento'}]" />
            </div>
            <lsw-agenda-evento-search />
        </div>
        <div v-else-if="selectedContext === 'propagador.search'">
            <div class="breadcrumb_box">
                <lsw-agenda-breadcrumb
                    :agenda="this" 
                    :path-items="[{label:'Buscar propagador'}]" />
            </div>
            <lsw-agenda-propagador-search />
        </div>
    </div>
    <div v-if="selectedContext === 'agenda'">
        <div class="breadcrumb_box" style="padding-left: 8px;">
            <lsw-agenda-breadcrumb :agenda="this" :path-items="[{label:'Día ' + $lsw.timer.utils.formatDatestringFromDate(selectedDate, true),noop:true}]" />
        </div>
        <div class="calendar_viewer">
            <lsw-calendario ref="calendario"
                :solo-fecha="true"
                :al-cambiar-valor="v => loadDateTasks(v)" />
        </div>
        <div class="no_tasks_message"
            v-if="isLoading">
            Por favor, aguarde hasta recuperar los datos.
        </div>
        <div class="box_for_date_details"
            v-else-if="(!isLoading) && selectedDateTasksFormattedPerHour && selectedDateTasksFormattedPerHour.length">
            <div class="hour_table"
                v-for="franja, franjaIndex in selectedDateTasksFormattedPerHour"
                v-bind:key="'franja_horaria_' + franjaIndex">
                <div class="hour_lapse_separator"
                    v-on:click="() => toggleHour(franja.hora)">
                    {{ $lsw.timer.utils.formatHourFromMomento(franja) }} · <span class="hour_compromises">{{
                        $lsw.utils.pluralizar("compromiso", "compromisos", "%i %s", Object.keys(franja.tareas).length) }}</span>
                </div>
                <div class="hour_lapse_list"
                    v-show="hiddenDateHours.indexOf(franja.hora) === -1">
                    <template v-for="tarea, tareaIndex in franja.tareas">
                        <div class="hour_task_block"
                            :class="{is_completed: tarea.estado === 'done', is_failed: tarea.estado === 'failed', is_pending: tarea.estado === 'pending'}"
                            v-bind:key="'franja_horaria_' + franjaIndex + '_tarea_' + tareaIndex">
                            <div class="hour_task_pill pill">
                                <span class="hour_task_dragger pill_start">
                                    ≡</span><span class="hour_task_name pill_middle">
                                    {{ tarea.refers_to_concept }}</span><span class="hour_task_details_start pill_middle">
                                    {{ $lsw.timer.utils.formatHourFromMomentoCode(tarea.starts_at, false) }}</span><span
                                    class="hour_task_details_duration pill_middle">
                                    {{ tarea.has_duration }}</span><span class="hour_task_editer pill_middle"
                                    v-on:click="() => openUpdateTaskDialog(tarea)">
                                    ⚙</span><span class="hour_task_deleter pill_end"
                                    v-on:click="() => openDeleteTaskDialog(tarea)">
                                    ❌</span>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
        <div class="no_tasks_message"
            v-else>
            No hay tareas asignadas para este día.
        </div>
    </div>
</div>`,
  props: {},
  data() {
    this.$trace("lsw-agenda.data");
    return {
      counter: 0,
      isLoading: false,
      selectedContext: "agenda",
      selectedSubmenu1: 'none',
      selectedDate: undefined,
      selectedDateTasks: undefined,
      selectedDateTasksFormattedPerHour: undefined,
      hiddenDateHours: [],
    };
  },
  methods: {
    selectContext(id, parameters = {}) {
      this.selectedSubmenu1 = "none";
      this.selectedContextParameters = parameters;
      this.selectedContext = id;
    },
    selectSubmenu1(id) {
      this.selectedSubmenu1 = id;
    },
    toggleHour(hourInt) {
      const pos = this.hiddenDateHours.indexOf(hourInt);
      if(pos === -1) {
        this.hiddenDateHours.push(hourInt);
      } else {
        this.hiddenDateHours.splice(pos, 1);
      }
    },
    async loadDateTasks(newDate) {
      this.$trace("lsw-agenda.methods.loadDateTasks");
      this.isLoading = true;
      console.log("Loading date tasks of: " + newDate);
      try {
        this.selectedDate = newDate;
        const selectedDate = this.selectedDate;
        const selectedDateTasks = await this.$lsw.database.selectMany("accion", valueBrute => {
          const valueList = Timeformat_parser.parse(valueBrute.starts_at);
          const value = valueList[0];
          const isSameYear = value.anio === selectedDate.getFullYear();
          const isSameMonth = value.mes === (selectedDate.getMonth()+1);
          const isSameDay = value.dia === selectedDate.getDate();
          const isAccepted = isSameYear && isSameMonth && isSameDay;
          console.log("isSameYear", isSameYear);
          console.log("isSameMonth", isSameMonth);
          console.log("isSameDay", isSameDay);
          console.log("isAccepted", isAccepted);
          console.log(isAccepted);
          return isAccepted;
        });
        console.log("selectedDate");
        console.log(selectedDate);
        console.log("selectedDateTasks");
        console.log(selectedDateTasks);
        this.selectedDateTasks = selectedDateTasks;
        this.propagateDateTasks();
      } catch (error) {
        console.log("Error loading date taskes:", error);
      } finally {
        setTimeout(() => this.isLoading = false, 100);
      }
    },
    groupTasksByHour(tareas = this.selectedDateTasks) {
      this.$trace("lsw-agenda.methods.groupTasksByHour");
      const mapaHoras = new Map();
      for (let i = 0; i < tareas.length; i++) {
        const tarea = tareas[i];
        const { hora, minuto } = tarea;
        if (!mapaHoras.has(hora)) {
          mapaHoras.set(hora, []);
        }
        mapaHoras.get(hora).push(tarea);
      }
      const resultado = [];
      for (const [hora, lista] of mapaHoras) {
        // Ordenar tareas por minuto
        for (let j = 1; j < lista.length; j++) {
          let k = j;
          while (k > 0 && lista[k - 1].minuto > lista[k].minuto) {
            [lista[k - 1], lista[k]] = [lista[k], lista[k - 1]];
            k--;
          }
        }
        resultado.push({ hora: Number(hora), tareas: lista });
      }
      for (let i = 1; i < resultado.length; i++) {
        let j = i;
        while (j > 0 && resultado[j - 1].hora > resultado[j].hora) {
          [resultado[j - 1], resultado[j]] = [resultado[j], resultado[j - 1]];
          j--;
        }
      }
      return resultado;
    },
    propagateDateTasks() {
      this.$trace("lsw-agenda.methods.propagateDateTasks");
      this.selectedDateTasksFormattedPerHour = this.groupTasksByHour();
    },
    async openInsertTaskDialog() {
      this.$trace("lsw-agenda.methods.openInsertTaskDialog");
      // @TODO: 
    },
    async openUpdateTaskDialog(tarea) {
      this.$trace("lsw-agenda.methods.openUpdateTaskDialog");
      // @TODO: 
      
    },
    async openDeleteTaskDialog() {
      this.$trace("lsw-agenda.methods.openDeleteTaskDialog");
      // @TODO: 
      const data = await this.$dialogs.open({
        id: "agenda-viewer-delete-task-" + this.$lsw.utils.getRandomString(5),
        title: "Delete task confirmation",
        template: `
          <div>
            <p>Are you sure you want to cancel task deletion?</p>
          </div>
        `,
        acceptButton: {
          text: "OK",
          callback: (id) => {
            this.$dialogs.accept(id);
          },
        },
        cancelButton: {
          text: "Cancel",
          callback: (id) => {
            this.$dialogs.cancel(id);
          },
        }
      });
      console.log(data);
    },
  },
  watch: {
  },
  async mounted() {
    try {
      this.$trace("lsw-agenda.mounted");
      const selectedDate = this.$refs.calendario.getValue();
      this.loadDateTasks(selectedDate);
    } catch (error) {
      console.log(error);
    }
  }
});
Vue.component("LswAgendaAccionAdd", {
  template: `<div class="LswAgendaAccionAdd" style="padding-top: 4px;">
  <template v-if="formMetadata">
    <lsw-agenda-form :form-metadata="formMetadata"></lsw-agenda-form>
  </template>
</div>`,
  props: {},
  data() {
    this.$trace("lsw-agenda-accion-add.data");
    return {
      refers_to_concept: "",
      has_duration: "",
      starts_at: "",
      has_emotions: "",
      has_details: "",
      has_description: "",
      has_steps: "",
      has_reasoning: "",
      has_expectations: "",
      has_learning: "",
      has_intention: "",
      has_result: "",
      has_history: "",
      has_consequences: "",
      // Campos para el formulario:
      formScope: Object.freeze({}), // El scope que usará el formulario que queremos.
      formMetadata: false, // Los metadatos, que incluyen fields y form.
    };
  },
  methods: {
    loadFormMetadata() {
      const outterFormScope = {};
      const fields = [{
        type: "input",
        enunciate: "Concepto al que se refiere:",
        code1: "it.refers_to_concept",
        code2: "refers_to_concept",
        code3: "string",
        explanation: "tiene que coincidir con el «has_name» del concepto para que funcionen los propagadores correspondientes.",
        placeholder: "Ej: Desayunar",
        errorConfig: {
          parentId: "refers_to_concept",
          parentScope: outterFormScope,
        },
        inputConfig: {
          parentId: "formularioInicial",
          parentScope: outterFormScope,
          selfId: "refers_to_concept",
          selfScope: outterFormScope,
          name: "refers_to_concept"
        }
      }, {
        type: "input",
        enunciate: "Duración:",
        code1: "it.has_duration",
        code2: "has_duration",
        code3: "string",
        explanation: "tiene que cumplir con el formato «0y 0mon 0d 0h 0min 0s» para referir a una duración.",
        placeholder: "Ej: 0y 0mon 0d 0h 0min",
        errorConfig: {
          parentId: "has_duration",
          parentScope: outterFormScope,
          onSuccessStatus: {
            name: "OK",
            message: "El campo cumple con un formato válido."
          }
        },
        inputConfig: {
          parentId: "formularioInicial",
          parentScope: outterFormScope,
          selfId: "has_duration",
          selfScope: outterFormScope,
          name: "has_duration",
          onValidate: function(value) {
            const result = Timeformat_parser.parse(value);
            if(result.length !== 1) {
              throw new Error("Only 1 expression allowed");
            }
            if(result[0].tipo !== "Duracion") {
              throw new Error("Only 1 expression of type «Duración» allowed");
            }
          }
        }
      }, {
        type: "input",
        enunciate: "Inicio:",
        code1: "it.starts_at",
        code2: "starts_at",
        code3: "string",
        explanation: "tiene que cumplir con el formato «2025/01/01 23:59» para ser válido.",
        placeholder: "2025/01/01 00:00",
        errorConfig: {
          parentId: "starts_at",
          parentScope: outterFormScope,
          onSuccessStatus: {
            name: "OK",
            message: "El campo cumple con un formato válido."
          }
        },
        inputConfig: {
          parentId: "formularioInicial",
          parentScope: outterFormScope,
          selfId: "starts_at",
          selfScope: outterFormScope,
          name: "starts_at",
          onValidate: function(value) {
            const result = Timeformat_parser.parse(value);
            if(result.length !== 1) {
              throw new Error("Only 1 expression allowed");
            }
            if(result[0].tipo !== "FechaHora") {
              throw new Error("Only 1 expression of type «FechaHora» allowed");
            }
          }
        }
      }, {
        type: "select",
        enunciate: "Estado:",
        code1: "it.has_state",
        code2: "has_state",
        code3: "string",
        explanation: "tiene que ser uno entre «pendiente», «fallido» y «completo»",
        options: [{
          value: "pendiente",
          text: "Pendiente"
        }, {
          value: "fallido",
          text: "Fallido"
        }, {
          value: "completo",
          text: "Completo"
        }],
        errorConfig: {
          parentId: "has_state",
          parentScope: outterFormScope,
        },
        inputConfig: {
          parentId: "formularioInicial",
          parentScope: outterFormScope,
          selfId: "has_state",
          selfScope: outterFormScope,
          name: "has_state"
        }
      }, {
        type: "input",
        enunciate: "Emociones asociadas:",
        code1: "it.has_emotions",
        code2: "has_emotions",
        code3: "string",
        explanation: "blablabla.",
        placeholder: "blabla",
        errorConfig: {
          parentId: "has_emotions",
          parentScope: outterFormScope,
        },
        inputConfig: {
          parentId: "formularioInicial",
          parentScope: outterFormScope,
          selfId: "has_emotions",
          selfScope: outterFormScope,
          name: "has_emotions"
        }
      }, {
        type: "input",
        enunciate: "Detalles:",
        code1: "it.has_details",
        code2: "has_details",
        code3: "string",
        explanation: "blablabla.",
        placeholder: "blabla",
        errorConfig: {
          parentId: "has_details",
          parentScope: outterFormScope,
        },
        inputConfig: {
          parentId: "formularioInicial",
          parentScope: outterFormScope,
          selfId: "has_details",
          selfScope: outterFormScope,
          name: "has_details"
        }
      }, {
        type: "input",
        enunciate: "Descripción:",
        code1: "it.has_description",
        code2: "has_description",
        code3: "string",
        explanation: "blablabla.",
        placeholder: "blabla",
        errorConfig: {
          parentId: "has_description",
          parentScope: outterFormScope,
        },
        inputConfig: {
          parentId: "formularioInicial",
          parentScope: outterFormScope,
          selfId: "has_description",
          selfScope: outterFormScope,
          name: "has_description"
        }
      }, {
        type: "input",
        enunciate: "Pasos:",
        code1: "it.has_steps",
        code2: "has_steps",
        code3: "string",
        explanation: "blablabla.",
        placeholder: "blabla",
        errorConfig: {
          parentId: "has_steps",
          parentScope: outterFormScope,
        },
        inputConfig: {
          parentId: "formularioInicial",
          parentScope: outterFormScope,
          selfId: "has_steps",
          selfScope: outterFormScope,
          name: "has_steps"
        }
      }, {
        type: "input",
        enunciate: "Razonamiento:",
        code1: "it.has_reasoning",
        code2: "has_reasoning",
        code3: "string",
        explanation: "blablabla.",
        placeholder: "blabla",
        errorConfig: {
          parentId: "has_reasoning",
          parentScope: outterFormScope,
        },
        inputConfig: {
          parentId: "formularioInicial",
          parentScope: outterFormScope,
          selfId: "has_reasoning",
          selfScope: outterFormScope,
          name: "has_reasoning"
        }
      }, {
        type: "input",
        enunciate: "Expectativas:",
        code1: "it.has_expectations",
        code2: "has_expectations",
        code3: "string",
        explanation: "blablabla.",
        placeholder: "blabla",
        errorConfig: {
          parentId: "has_expectations",
          parentScope: outterFormScope,
        },
        inputConfig: {
          parentId: "formularioInicial",
          parentScope: outterFormScope,
          selfId: "has_expectations",
          selfScope: outterFormScope,
          name: "has_expectations"
        }
      }, {
        type: "input",
        enunciate: "Aprendizaje:",
        code1: "it.has_learning",
        code2: "has_learning",
        code3: "string",
        explanation: "blablabla.",
        placeholder: "blabla",
        errorConfig: {
          parentId: "has_learning",
          parentScope: outterFormScope,
        },
        inputConfig: {
          parentId: "formularioInicial",
          parentScope: outterFormScope,
          selfId: "has_learning",
          selfScope: outterFormScope,
          name: "has_learning"
        }
      }, {
        type: "input",
        enunciate: "Intención:",
        code1: "it.has_intention",
        code2: "has_intention",
        code3: "string",
        explanation: "blablabla.",
        placeholder: "blabla",
        errorConfig: {
          parentId: "has_intention",
          parentScope: outterFormScope,
        },
        inputConfig: {
          parentId: "formularioInicial",
          parentScope: outterFormScope,
          selfId: "has_intention",
          selfScope: outterFormScope,
          name: "has_intention"
        }
      }, {
        type: "input",
        enunciate: "Resultado:",
        code1: "it.has_result",
        code2: "has_result",
        code3: "string",
        explanation: "blablabla.",
        placeholder: "blabla",
        errorConfig: {
          parentId: "has_result",
          parentScope: outterFormScope,
        },
        inputConfig: {
          parentId: "formularioInicial",
          parentScope: outterFormScope,
          selfId: "has_result",
          selfScope: outterFormScope,
          name: "has_result"
        }
      }, {
        type: "input",
        enunciate: "Historia:",
        code1: "it.has_history",
        code2: "has_history",
        code3: "string",
        explanation: "blablabla.",
        placeholder: "blabla",
        errorConfig: {
          parentId: "has_history",
          parentScope: outterFormScope,
        },
        inputConfig: {
          parentId: "formularioInicial",
          parentScope: outterFormScope,
          selfId: "has_history",
          selfScope: outterFormScope,
          name: "has_history"
        }
      }, {
        type: "input",
        enunciate: "Consequencias:",
        code1: "it.has_consequences",
        code2: "has_consequences",
        code3: "string",
        explanation: "blablabla.",
        placeholder: "blabla",
        errorConfig: {
          parentId: "has_consequences",
          parentScope: outterFormScope,
        },
        inputConfig: {
          parentId: "formularioInicial",
          parentScope: outterFormScope,
          selfId: "has_consequences",
          selfScope: outterFormScope,
          name: "has_consequences"
        }
      }, ];
      this.formMetadata = Object.freeze({
        form: {
          selfScope: outterFormScope,
          selfId: "formularioInicial",
          onSubmit: async (value) => {
            const id = await this.$lsw.database.insert("accion", value);
            console.log("ID:", id);
            this.$parent.selectContext("agenda");
          }
        },
        fields: fields,
      });
    }
  },
  watch: {},
  mounted() {
    try {
      this.$trace("lsw-agenda-accion-add.mounted");
      this.loadFormMetadata();
    } catch(error) {
      console.log(error);
    }
  }
});
Vue.component("LswAgendaAccionSearch", {
  template: `<div class="LswAgendaAccionSearch">
  <lsw-table :initial-input="[{nombre:$lsw.utils.getRandomString(5)},{nombre:$lsw.utils.getRandomString(5)},{nombre:$lsw.utils.getRandomString(5)},{nombre:$lsw.utils.getRandomString(5)},{nombre:$lsw.utils.getRandomString(5)},{nombre:$lsw.utils.getRandomString(5)},{nombre:$lsw.utils.getRandomString(5)},{nombre:$lsw.utils.getRandomString(5)},{nombre:$lsw.utils.getRandomString(5)},{nombre:$lsw.utils.getRandomString(5)},{nombre:$lsw.utils.getRandomString(5)},{nombre:$lsw.utils.getRandomString(5)},{nombre:$lsw.utils.getRandomString(5)},{nombre:$lsw.utils.getRandomString(5)},{nombre:$lsw.utils.getRandomString(5)},{nombre:$lsw.utils.getRandomString(5)},{nombre:$lsw.utils.getRandomString(5)},{nombre:$lsw.utils.getRandomString(5)},{nombre:$lsw.utils.getRandomString(5)},{nombre:$lsw.utils.getRandomString(5)},{nombre:$lsw.utils.getRandomString(5)},{nombre:$lsw.utils.getRandomString(5)},{nombre:$lsw.utils.getRandomString(5)},{nombre:$lsw.utils.getRandomString(5)},{nombre:$lsw.utils.getRandomString(5)},{nombre:$lsw.utils.getRandomString(5)},{nombre:$lsw.utils.getRandomString(5)},{nombre:$lsw.utils.getRandomString(5)},{nombre:$lsw.utils.getRandomString(5)},{nombre:$lsw.utils.getRandomString(5)},{nombre:$lsw.utils.getRandomString(5)},{nombre:$lsw.utils.getRandomString(5)},{nombre:$lsw.utils.getRandomString(5)},{nombre:$lsw.utils.getRandomString(5)},{nombre:$lsw.utils.getRandomString(5)},{nombre:$lsw.utils.getRandomString(5)},{nombre:$lsw.utils.getRandomString(5)},{nombre:$lsw.utils.getRandomString(5)},{nombre:$lsw.utils.getRandomString(5)},{nombre:$lsw.utils.getRandomString(5)},{nombre:$lsw.utils.getRandomString(5)},{nombre:$lsw.utils.getRandomString(5)},{nombre:$lsw.utils.getRandomString(5)},{nombre:$lsw.utils.getRandomString(5)},{nombre:$lsw.utils.getRandomString(5)},{nombre:$lsw.utils.getRandomString(5)},{nombre:$lsw.utils.getRandomString(5)},{nombre:$lsw.utils.getRandomString(5)},{nombre:$lsw.utils.getRandomString(5)},{nombre:$lsw.utils.getRandomString(5)},{nombre:$lsw.utils.getRandomString(5)},{nombre:$lsw.utils.getRandomString(5)},{nombre:$lsw.utils.getRandomString(5)},{nombre:$lsw.utils.getRandomString(5)},{nombre:$lsw.utils.getRandomString(5)},{nombre:$lsw.utils.getRandomString(5)},{nombre:$lsw.utils.getRandomString(5)},{nombre:$lsw.utils.getRandomString(5)},{nombre:$lsw.utils.getRandomString(5)},{nombre:$lsw.utils.getRandomString(5)},{nombre:$lsw.utils.getRandomString(5)},{nombre:$lsw.utils.getRandomString(5)},{nombre:$lsw.utils.getRandomString(5)},{nombre:$lsw.utils.getRandomString(5)}]"></lsw-table>
</div>`,
  props: {},
  data() {
    this.$trace("lsw-agenda-accion-search.data");
    return {};
  },
  methods: {},
  watch: {},
  mounted() {
    try {
      this.$trace("lsw-agenda-accion-search.mounted");
    } catch(error) {
      console.log(error);
    }
  }
});
Vue.component("LswAgendaBreadcrumb", {
  name: "LswAgendaBreadcrumb",
  template: `<div class="lsw_agenda_breadcrumb">
    <div class="flex_row centered">
        <div class="right_padded_1">
            <button v-on:click="() => goToSection('agenda')">📆</button>
        </div>
        <div class="agenda_breadcrumb flex_100">
            <div class="agenda_bradcrumb_item"
                v-for="pathItem, pathIndex in pathItems"
                v-bind:key="'agenda-breadcrumb-path-item-' + pathIndex">
                <span v-if="pathIndex !== 0"> » </span>
                <span class="agenda_breadcrumb_link"
                    v-if="pathItem.link">
                    <a :href="pathItem.link">{{ pathItem.label }}</a>
                </span>
                <span class="agenda_breadcrumb_link"
                    v-else-if="pathItem.section">
                    <span v-on:click="() => goToSection(pathItem.section)">{{ pathItem.label }}</span>
                </span>
                <span class="agenda_breadcrumb_link"
                    v-else-if="pathItem.event">
                    <span v-on:click="pathItem.event">{{ pathItem.label }}</span>
                </span>
                <span class="agenda_breadcrumb_link only_label"
                    v-else-if="pathItem.label">
                    <span>{{ pathItem.label }}</span>
                </span>
            </div>
        </div>
    </div>
</div>`,
  props: {
    agenda: {
      type: Object,
      default: () => null
    },
    pathItems: {
      type: Array,
      required: true
    }
  },
  data() {
    this.$trace("lsw-agenda-breadcrumb.data");
    return {
      
    };
  },
  methods: {
    goToSection(section) {
      this.$trace("lsw-agenda-breadcrumb.methods.goToSection");
      if(this.agenda) {
        this.agenda.selectContext(section);
      }
    }
  },
  watch: {

  },
  async mounted() {
    try {
      this.$trace("lsw-agenda-breadcrumb.mounted");
    } catch (error) {
      console.log(error);
    }
  }
});
const outterFormScope = {};

Vue.component("LswAgendaConceptoAdd", {
  template: `<div class="LswAgendaConceptoAdd">
  <template v-if="formMetadata">
    <lsw-agenda-form :form-metadata="formMetadata"></lsw-agenda-form>
  </template>
</div>`,
  props: {},
  data() {
    this.$trace("lsw-agenda-concepto-add.data");
    return {
      formMetadata: false
    };
  },
  methods: {
    sendForm(v) {
      this.$trace("lsw-agenda-concepto-add.methods.sendForm");
      console.log("Sedingin form...", v);
    },
    loadFormMetadata() {
      this.$trace("lsw-agenda-concepto-add.methods.loadFormMetadata");
      this.formMetadata = {
        form: {
          selfScope: outterFormScope,
          selfId: "formularioInicial",
          expectedChildren: 1,
          onSubmit: (v) => {
            this.sendForm(v);
          }
        },
        fields: [{
          type: "input",
          enunciate: "Consequencias:",
          code1: "it.has_consequences",
          code2: "has_consequences",
          code3: "string",
          explanation: "blablabla.",
          placeholder: "blabla",
          errorConfig: {
            parentId: "has_consequences",
            parentScope: outterFormScope,
          },
          inputConfig: {
            parentId: "formularioInicial",
            parentScope: outterFormScope,
            selfId: "has_consequences",
            selfScope: outterFormScope,
            name: "has_consequences"
          }
        }]
      }
    }
  },
  watch: {},
  mounted() {
    try {
      this.$trace("lsw-agenda-concepto-add.mounted");
      this.loadFormMetadata();
    } catch (error) {
      console.log(error);
    }
  }
});
Vue.component("LswAgendaConceptoSearch", {
  template: `<div class="LswAgendaConceptoSearch">
  LswAgendaConceptoSearch
</div>`,
  props: {},
  data() {
    this.$trace("lsw-agenda-concepto-search.data");
    return {};
  },
  methods: {},
  watch: {},
  mounted() {
    try {
      this.$trace("lsw-agenda-concepto-search.mounted");
    } catch(error) {
      console.log(error);
    }
  }
});
Vue.component("LswAgendaEventoSearch", {
  template: `<div class="LswAgendaEventoSearch">
  LswAgendaEventoSearch
</div>`,
  props: {},
  data() {
    this.$trace("lsw-agenda-evento-search.data");
    return {};
  },
  methods: {},
  watch: {},
  mounted() {
    try {
      this.$trace("lsw-agenda-evento-search.mounted");
    } catch(error) {
      console.log(error);
    }
  }
});

Vue.component("LswAgendaForm", {
  template: `<div>
    <div class="form_structure"
        v-form.form="formMetadata.form"
        ref="agenda_form">
        <div class="form_item text_align_right">
            <button v-on:click="() => $refs.agenda_form.$lswFormMetadata.methods.submit()">Submit</button>
        </div>
        <div class="form_item"
            v-for="field, fieldIndex in formMetadata.fields"
            v-bind:key="'form_field_' + fieldIndex">
            <div class="form_label">
                <div class="enunciate_box2">
                    <div class="enunciate">
                        <span class="enunciate_text">{{ fieldIndex + 1 }}. {{ field.enunciate }}</span>
                        <span class="coderef">
                            <span class="codenote as_note">como</span>
                            <span class="codetext codetype">{{ field.code3 }}</span>
                            <span class="codenote as_note">en</span>
                            <span class="codetext codetype">{{ field.code1 }}</span>
                        </span>
                        <span class="explanation_block">
                            <span class="iconref"
                                style="flex:100;">
                                <span class="info_icon"
                                    v-on:click="() => toggleExplanation(field.code2)">ℹ️</span>
                            </span>
                            <span class="explanation"
                                v-if="expandedExplanations.indexOf(field.code2) !== -1">{{ field.explanation }}</span>
                        </span>
                    </div>
                </div>
            </div>
            <template v-if="field.type === 'input'">
                <input class="form_control"
                    type="text"
                    :placeholder="field.placeholder"
                    v-form.input="field.inputConfig" />
                <div class="validationBox"
                    v-form.error="field.errorConfig"></div>
            </template>
            <template v-else-if="field.type === 'textarea'">
                <textarea class="form_control"
                    :placeholder="field.placeholder"
                    v-form.input="field.inputConfig" />
                <div class="validationBox"
                    v-form.error="field.errorConfig"></div>
            </template>
            <template v-else-if="field.type === 'select'">
                <select class="form_control" v-form.input="field.inputConfig">
                    <option :value="option.value" v-for="option, optionIndex in field.options" v-bind:key="'field_' + fieldIndex + '_selector_option_' + optionIndex">
                        {{ option.text }}
                    </option>
                </select>
                <div class="validationBox"
                    v-form.error="field.errorConfig"></div>
            </template>
        </div>
        <div class="form_item text_align_right">
            <button v-on:click="() => $refs.agenda_form.$lswFormMetadata.methods.submit()">Submit</button>
        </div>
    </div>
</div>`,
  props: {
    formMetadata: {
      type: Object,
      required: true,
    }
  },
  data() {
    this.$trace("lsw-agenda-form.data");
    this.validateFormMetadata(this.formMetadata);
    return {
      expandedExplanations: [],
      formScope: {},
      formState: {}
    };
  },
  methods: {
    validateFormMetadata(v) {
      const isObject = typeof v === "object";
      const hasFormAsObject = typeof v.form === "object";
      const hasFieldsAsArray = Array.isArray(v.fields);
      if(!isObject) {
        throw new Error("Required parameter «formMetadata» to be an object on «LswAgendaForm.methods.validateFormMetadata»");
      }
      if(!hasFormAsObject) {
        throw new Error("Required parameter «formMetadata.form» to be an object on «LswAgendaForm.methods.validateFormMetadata»");
      }
      if(!hasFieldsAsArray) {
        throw new Error("Required parameter «formMetadata.fields» to be an array on «LswAgendaForm.methods.validateFormMetadata»");
      }
    },
    toggleExplanation(id) {
      const pos = this.expandedExplanations.indexOf(id);
      if(pos === -1) {
        this.expandedExplanations.push(id);
      } else {
        this.expandedExplanations.splice(pos, 1);
      }
    },
    loadFields() {
      this.$window.F = this.$refs.agenda_form;
    }
  },
  watch: {},
  mounted() {
    try {
      this.$trace("lsw-agenda-form.mounted");
      this.loadFields();
    } catch(error) {
      console.log(error);
    }
  }
});
Vue.component("LswAgendaImpresionAdd", {
  template: `<div class="LswAgendaImpresionAdd">
  LswAgendaImpresionAdd
</div>`,
  props: {},
  data() {
    this.$trace("lsw-agenda-impresion-add.data");
    return {};
  },
  methods: {},
  watch: {},
  mounted() {
    try {
      this.$trace("lsw-agenda-impresion-add.mounted");
    } catch(error) {
      console.log(error);
    }
  }
});
Vue.component("LswAgendaImpresionSearch", {
  template: `<div class="LswAgendaImpresionSearch">
  LswAgendaImpresionSearch
</div>`,
  props: {},
  data() {
    this.$trace("lsw-agenda-impresion-search.data");
    return {};
  },
  methods: {},
  watch: {},
  mounted() {
    try {
      this.$trace("lsw-agenda-impresion-search.mounted");
    } catch(error) {
      console.log(error);
    }
  }
});
Vue.component("LswAgendaInfraccionSearch", {
  template: `<div class="LswAgendaInfraccionSearch">
  LswAgendaInfraccionSearch
</div>`,
  props: {},
  data() {
    this.$trace("lsw-agenda-infraccion-search.data");
    return {};
  },
  methods: {},
  watch: {},
  mounted() {
    try {
      this.$trace("lsw-agenda-infraccion-search.mounted");
    } catch(error) {
      console.log(error);
    }
  }
});
Vue.component("LswAgendaLimitadorAdd", {
  template: `<div class="LswAgendaLimitadorAdd">
  LswAgendaLimitadorAdd
</div>`,
  props: {},
  data() {
    this.$trace("lsw-agenda-limitador-add.data");
    return {};
  },
  methods: {},
  watch: {},
  mounted() {
    try {
      this.$trace("lsw-agenda-limitador-add.mounted");
    } catch(error) {
      console.log(error);
    }
  }
});
Vue.component("LswAgendaLimitadorSearch", {
  template: `<div class="LswAgendaLimitadorSearch">
  LswAgendaLimitadorSearch
</div>`,
  props: {},
  data() {
    this.$trace("lsw-agenda-limitador-search.data");
    return {};
  },
  methods: {},
  watch: {},
  mounted() {
    try {
      this.$trace("lsw-agenda-limitador-search.mounted");
    } catch(error) {
      console.log(error);
    }
  }
});
Vue.component("LswAgendaPostimpresionSearch", {
  template: `<div class="LswAgendaPostimpresionSearch">
  LswAgendaPostimpresionSearch
</div>`,
  props: {},
  data() {
    this.$trace("lsw-agenda-postimpresion-search.data");
    return {};
  },
  methods: {},
  watch: {},
  mounted() {
    try {
      this.$trace("lsw-agenda-postimpresion-search.mounted");
    } catch(error) {
      console.log(error);
    }
  }
});
Vue.component("LswAgendaPropagacionSearch", {
  template: `<div class="LswAgendaPropagacionSearch">
  LswAgendaPropagacionSearch
</div>`,
  props: {},
  data() {
    this.$trace("lsw-agenda-propagacion-search.data");
    return {};
  },
  methods: {},
  watch: {},
  mounted() {
    try {
      this.$trace("lsw-agenda-propagacion-search.mounted");
    } catch(error) {
      console.log(error);
    }
  }
});
Vue.component("LswAgendaPropagadorSearch", {
  template: `<div class="LswAgendaPropagadorSearch">
  LswAgendaPropagadorSearch
</div>`,
  props: {},
  data() {
    this.$trace("lsw-agenda-propagador-search.data");
    return {};
  },
  methods: {},
  watch: {},
  mounted() {
    try {
      this.$trace("lsw-agenda-propagador-search.mounted");
    } catch(error) {
      console.log(error);
    }
  }
});
});
