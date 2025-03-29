Vue.component("LswAgenda", {
  name: "LswAgenda",
  template: $template,
  props: {},
  data() {
    this.$trace("lsw-agenda.data");
    return {
      counter: 0,
      isLoading: false,
      hasPsicodelia: true,
      selectedContext: "agenda",
      selectedSubmenu1: 'none',
      selectedDate: undefined,
      selectedDateTasks: undefined,
      selectedDateTasksFormattedPerHour: undefined,
      selectedForm: undefined,
      hiddenDateHours: [],
    };
  },
  methods: {
    showAllHours() {
      this.$trace("lsw-agenda.methods.showAllHours");
      this.hiddenDateHours = [];
    },
    hideAllHours() {
      this.$trace("lsw-agenda.methods.hideAllHours");
      this.hiddenDateHours = ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23"];
    },
    selectContext(id, parameters = {}) {
      this.$trace("lsw-agenda.methods.selectContext");
      this.selectedSubmenu1 = "none";
      this.selectedContextParameters = parameters;
      this.selectedContext = id;
    },
    selectSubmenu1(id) {
      this.$trace("lsw-agenda.methods.selectSubmenu1");
      this.selectedSubmenu1 = id;
    },
    togglePsicodelia() {
      this.$trace("lsw-agenda.methods.togglePsicodelia");
      this.hasPsicodelia = !this.hasPsicodelia;
    },
    toggleHour(hourInt) {
      this.$trace("lsw-agenda.methods.toggleHour");
      const pos = this.hiddenDateHours.indexOf(hourInt);
      if (pos === -1) {
        this.hiddenDateHours.push(hourInt);
      } else {
        this.hiddenDateHours.splice(pos, 1);
      }
    },
    async loadDateTasks(newDate, calendario) {
      this.$trace("lsw-agenda.methods.loadDateTasks");
      this.isLoading = true;
      console.log("Loading date tasks of: " + newDate);
      try {
        this.selectedDate = newDate;
        const selectedDate = this.selectedDate;
        const selectedDateTasks = await this.$lsw.database.selectMany("Accion", valueBrute => {
          try {
            const valueList = Timeformat_parser.parse(valueBrute.tiene_inicio);
            const value = valueList[0];
            const isSameYear = value.anio === selectedDate.getFullYear();
            const isSameMonth = value.mes === (selectedDate.getMonth() + 1);
            const isSameDay = value.dia === selectedDate.getDate();
            const isAccepted = isSameYear && isSameMonth && isSameDay;
            return isAccepted;
          } catch (error) {
            return true;
          }
        });
        this.selectedDateTasks = selectedDateTasks;
        this.propagateDateTasks();
      } catch (error) {
        console.log("Error loading date taskes:", error);
      } finally {
        setTimeout(() => {this.isLoading = false}, 100);
      }
      if(calendario) {
        const selectedDate = this.selectedDate;
        const tasksOfMonth = await this.$lsw.database.selectMany("Accion", valueBrute => {
          const valueList = Timeformat_parser.parse(valueBrute.tiene_inicio);
          const value = valueList[0];
          const isSameYear = value.anio === selectedDate.getFullYear();
          const isSameMonth = value.mes === (selectedDate.getMonth() + 1);
          const isAccepted = isSameYear && isSameMonth;
          return isAccepted;
        });
        const tasksOfMonthByDay = tasksOfMonth.reduce((out, item) => {
          const valueList = Timeformat_parser.parse(item.tiene_inicio);
          const value = valueList[0];
          const day = value.dia;
          if(!(day in out)) {
            out[day] = [];
          }
          out[day].push(item);
          return out;
        }, {});
        calendario.establecer_marcadores_del_mes(tasksOfMonthByDay);
      }
    },
    groupTasksByHour(tareas = this.selectedDateTasks) {
      this.$trace("lsw-agenda.methods.groupTasksByHour");
      const mapaHoras = {};
      Agrupacion_inicial:
      for (let i = 0; i < tareas.length; i++) {
        const tarea = tareas[i];
        const { tiene_inicio } = tarea;
        const [inicioObject] = Timeformat_parser.parse(tiene_inicio);
        const { hora, minuto } = inicioObject;
        if(typeof hora !== "number") {
          continue Agrupacion_inicial;
        }
        if (!(hora in mapaHoras)) {
          mapaHoras[hora] = [];
        }
        mapaHoras[hora].push(tarea);
      }
      //return mapaHoras;
      const segunHoras = [];
      Formateo_final:
      for(let hora in mapaHoras) {
        const lista = mapaHoras[hora];
        segunHoras.push({
          hora,
          tareas: lista,
        });
      }
      return segunHoras;
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
      this.selectHour(tarea.id);
    },
    async openDeleteTaskDialog(tarea, e) {
      this.$trace("lsw-agenda.methods.openDeleteTaskDialog");
      const confirmed = await Vue.prototype.$dialogs.open({
        title: "Eliminar registro",
        template: `
          <div>
            <div class="pad_2">¿Seguro que quieres eliminar el registro?</div>
            <hr class="margin_0" />
            <div class="pad_2 text_align_right">
              <button class="danger_button" v-on:click="() => accept(true)">Eliminar</button>
              <button class="" v-on:click="() => accept(false)">Cancelar</button>
            </div>
          </div>
        `,
      });
      console.log(confirmed);
      if(!confirmed) return false;
      await this.$lsw.database.delete("Accion", tarea.id);
      this.selectedForm = undefined;
      this.refreshTasks();
    },
    selectHour(hora) {
      this.$trace("lsw-agenda.methods.selectHour");
      if(this.selectedForm === hora) {
        this.selectedForm = undefined;
      } else {
        this.selectedForm = hora;
      }
    },
    async refreshTasks() {
      this.$trace("lsw-agenda.methods.refreshTasks");
      this.loadDateTasks(new Date(this.selectedDate));
    },
    async onUpdateTask(v, tarea) {
      this.$trace("lsw-agenda.methods.onUpdateTask");
      await this.$lsw.database.update('Accion', tarea.id, v);
      this.selectedForm = tarea.id;
      this.refreshTasks();
    },
    async onInsertTask(v, tarea) {
      this.$trace("lsw-agenda.methods.onInsertTask");
      const id = await this.$lsw.database.insert('Accion', v);
      this.selectedForm = id;
      this.refreshTasks();
    },
    async advanceTaskState(tarea) {
      this.$trace("lsw-agenda.methods.onInsertTask");
      const siguienteEstado = (() => {
        switch(tarea.tiene_estado) {
          case "pendiente": return "completada";
          case "completada": return "fallida";
          case "fallida": return "pendiente";
          default: return "pendiente";
        }
      })();
      await this.$lsw.database.overwrite('Accion', tarea.id, {
        tiene_estado: siguienteEstado
      });
      this.refreshTasks();
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