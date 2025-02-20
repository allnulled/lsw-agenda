Vue.component("LswAgenda", {
  name: "LswAgenda",
  template: $template,
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