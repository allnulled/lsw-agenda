let trackerCounter = 0;

Vue.component("LswAgenda", {
  name: "LswAgenda",
  template: $template,
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