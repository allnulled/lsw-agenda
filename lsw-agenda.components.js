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
    openInsertTaskDialog() {
      this.$trace("lsw-agenda.methods.openInsertTaskDialog");
      // @TODO: 
    },
    openUpdateTaskDialog() {
      this.$trace("lsw-agenda.methods.openUpdateTaskDialog");
      // @TODO: 
    },
    openDeleteTaskDialog() {
      this.$trace("lsw-agenda.methods.openDeleteTaskDialog");
      // @TODO: 
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
});
