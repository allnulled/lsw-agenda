/*
  @artifact:  Lite Starter Web Dependency
  @url:       https://github.com/allnulled/lsw-agenda.git
  @name:      @allnulled/lsw-agenda
  @version:   1.0.0
*/(function(factory) {
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
    <div class="calendar_viewer">
        <lsw-calendario ref="calendario" :solo-fecha="true" :al-cambiar-valor="selectedDateTasks" />
    </div>
    <template v-if="selectedDateTasks && selectedDateTasks.length">
        <table>
            <tbody>
                <template v-for="task, taskIndex in selectedDateTasks">
                    <tr v-bind:key="'task-overview-' + taskIndex">
                        <td>{{ $lsw.utils.formatHour(task.hora, task.minuto) }}</td>
                        <td>{{ task.nombre }}</td>
                    </tr>
                    <tr v-bind:key="'task-details-' + taskIndex">
                        <td>{{ $lsw.utils.formatHour(task.hora, task.minuto) }}</td>
                        <td>{{ task.nombre }}</td>
                    </tr>
                </template>
            </tbody>
        </table>
        <pre>{{ selectedDateTasks }}</pre>
    </template>
    <div class="no_tasks_message" v-else>
        There are no tasks assigned to this day.
    </div>
</div>`,
  props: {},
  data() {
    this.$trace("lsw-agenda.data");
    return {
      selectedDate: undefined,
      selectedDateTasks: undefined,
    };
  },
  methods: {
    async loadDateTasks(newDate) {
      this.$trace("lsw-agenda.methods.loadDateTasks");
      this.selectedDate = newDate;
      const selectedDate = this.selectedDate;
      const selectedDateTasks = await this.$lsw.database.select("procedimiento", value => {
        const isSameYear = value.anio === selectedDate.getFullYear();
        const isSameMonth = value.mes === selectedDate.getMonth();
        const isSameDay = value.dia === selectedDate.getDate();
        console.log(isSameYear);
        console.log(isSameMonth);
        console.log(isSameDay);
        return isSameYear && isSameMonth && isSameDay;
      });
      this.selectedDateTasks = selectedDateTasks;
    }
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

