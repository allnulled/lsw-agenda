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
let trackerCounter = 0;

Vue.component("LswAgenda", {
  name: "LswAgenda",
  template: `<div class="lsw_agenda">
    <div class="flex_row">
        <div class="flex_100">
            <div class="calendar_viewer">
                <lsw-calendario ref="calendario"
                    :solo-fecha="true"
                    :al-cambiar-valor="v => loadDateTasks(v)" />
            </div>
        </div>
        <div class="flex_1 flex_column" style="padding:8px; padding-left: 0px; gap: 4px;">
            <div class="flex_1"><button class="width_100 nowrap" v-on:click="() => openInsertTaskDialog()">New task</button></div>
            <div class="flex_1"><button class="width_100 nowrap" v-on:click="() => goToToday()">Today?</button></div>
            <div class="flex_1"><button class="width_100 nowrap" v-on:click="() => goToToday()">Tomorrow?</button></div>
            <div class="flex_100"></div>
        </div>
    </div>
    <div class="no_tasks_message" v-if="isLoading">
        Please, wait a moment to fetch the data.
    </div>
    <div class="box_for_date_details" v-else-if="(!isLoading) && selectedDateTasksFormattedPerHour && selectedDateTasksFormattedPerHour.length">
        <div class="hour_table" v-for="franja, franjaIndex in selectedDateTasksFormattedPerHour" v-bind:key="'franja_horaria_' + franjaIndex">
            <div class="hour_lapse_separator" v-on:click="() => toggleHour(franja.hora)">
                {{ $lsw.timer.utils.formatHourFromMomento(franja) }} · <span class="hour_compromises">{{ $lsw.utils.pluralizar("compromiso", "compromisos", "%i %s", Object.keys(franja.tareas).length) }}</span>
            </div>
            <div class="hour_lapse_list" v-show="hiddenDateHours.indexOf(franja.hora) === -1">
                <template v-for="tarea, tareaIndex in franja.tareas">
                    <div class="hour_task_block" :class="{is_completed: tarea.estado === 'done', is_failed: tarea.estado === 'failed', is_pending: tarea.estado === 'pending'}" v-bind:key="'franja_horaria_' + franjaIndex + '_tarea_' + tareaIndex">
                        <div class="hour_task_pill pill">
                            <span class="hour_task_dragger pill_start">
                                ≡</span><span class="hour_task_name pill_middle">
                                {{ tarea.nombre }}</span><span class="hour_task_details_start pill_middle">
                                {{ $lsw.timer.utils.formatHourFromMomento(tarea, false) }}</span><span class="hour_task_details_duration pill_middle">
                                {{ tarea.duracion }}</span><span class="hour_task_editer pill_middle" v-on:click="() => openUpdateTaskDialog(tarea)">
                                ⚙</span><span class="hour_task_deleter pill_end" v-on:click="() => openDeleteTaskDialog(tarea)">
                                ❌</span>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
    <div class="no_tasks_message"
        v-else>
        There are no tasks assigned to this day.
    </div>
</div>`,
  props: {},
  data() {
    this.$trace("lsw-agenda.data");
    return {
      counter: 0,
      isLoading: false,
      selectedDate: undefined,
      selectedDateTasks: undefined,
      selectedDateTasksFormattedPerHour: undefined,
      hiddenDateHours: [],
    };
  },
  methods: {
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
        const selectedDateTasks = await this.$lsw.database.selectMany("procedimiento", value => {
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
    goToToday() {
      this.$trace("lsw-agenda.methods.goToToday");
      // @TODO: 
    },
    async openInsertTaskDialog() {
      this.$trace("lsw-agenda.methods.openInsertTaskDialog");
      // @TODO: 
    },
    async openUpdateTaskDialog(tarea) {
      this.$trace("lsw-agenda.methods.openUpdateTaskDialog");
      // @TODO: 
      const data = await this.$dialogs.open({
        id: "agenda-viewer-update-task-" + this.$lsw.utils.getRandomString(5),
        title: "Update task information",
        template: `
          <div>
            <lsw-agenda-task-form :task="task" ref="taskForm" />
          </div>
        `,
        factory: {
          data: {
            task: tarea
          },
        }
      });
      console.log(data);
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
let trackerCounter = 0;

Vue.component("LswAgendaTaskForm", {
  name: "LswAgendaTaskForm",
  template: `<div class="lsw_agenda_task_form" style="padding: 4px;">
    <control-box ref="agenda_task_form_control_box" form-id="agenda_task_form_for_update" :on-submit="$window.console.log"
        validate-button="Validar" submit-button="Añadir">
        <string-control label="Concepto:" form-id="agenda_task_form_for_update" :on-validate="v => { if( v.trim() === '' ) { throw new Error('Concepto no puede estar vacío') } }" placeholder="Identificador único de concepto" :initial-value="''" />
        <string-control label="Duración:" form-id="agenda_task_form_for_update" :on-validate="v => $lsw.timer.utils.isDurationOrThrow(v)" placeholder="0y 0mon 0d 0h 0min 0s" />
        <string-control label="Día:" form-id="agenda_task_form_for_update" :on-validate="v => $lsw.timer.utils.isDateOrThrow(v)" placeholder="2025/01/01" />
        <string-control label="Hora:" form-id="agenda_task_form_for_update" :on-validate="v => $lsw.timer.utils.isHourOrThrow(v)" placeholder="00:00" />
        <string-control label="Detalles:" form-id="agenda_task_form_for_update" placeholder="Especificaciones extra si las requieres." :multiline="true" />
        <div class="flex_row centered" style="padding-bottom: 4px;">
            <div class="flex_1" style="padding-right: 4px;">Sección: </div>
            <select class="flex_100 width_100" v-model="selectedSubsection">
                <option value="Propios">Propios</option>
                <option value="Agregados">Agregados</option>
            </select>
        </div>
        <div v-if="selectedSubsection === 'Propios'">
            <div v-descriptor="'agenda.task_form.title'">Propios</div>
            <div v-descriptor="'agenda.task_form.block'">
                <string-control label="Actitudes:" form-id="agenda_task_form_for_update" placeholder="Actitud1, actitud2, actitud3" />
            </div>
        </div>
        <div v-if="selectedSubsection === 'Agregados'">
            <div v-descriptor="'agenda.task_form.title'">Agregados</div>
            <div v-descriptor="'agenda.task_form.block'">
                <button v-on:click="addAggregation">Add</button>
                <div v-for="aggregation, aggregationIndex in aggregations" v-bind:key="'aggregated_' + aggregationIndex">
                    <div v-descriptor="'agenda.task_form.aggregations.block'">
                        <string-control label="Clave:" :initial-value="aggregation.key" />
                        <string-control label="Valor:" :initial-value="aggregation.value" :multiline="true" />
                        
                    </div>
                </div>
            </div>
        </div>
    </control-box>
</div>`,
  props: {
    task: {
      type: Object,
      default: () => undefined
    }
  },
  data() {
    this.$trace("lsw-agenda-task-form.data");
    return {
      selectedSubsection: "Propios",
      aggregations: []
    };
  },
  methods: {
    getFormControl() {
      return this.$refs.agenda_task_form_control_box[0];
    },
    getValue() {
      return this.getFormControl().getValue();
    },
    addAggregation() {
      this.aggregations.push({
        key: "",
        value: "",
        type: "text"
      });
    }
  },
  watch: {},
  async mounted() {
    try {
      this.$trace("lsw-agenda-task-form.mounted");
      
    } catch (error) {
      console.log(error);
    }
  }
});
});
