Vue.component("LswAgenda", {
  name: "LswAgenda",
  template: $template,
  props: {},
  data() {
    this.$trace("lsw-agenda.data");
    return {
      selectedDayTasks: [{
        name: 'Carl',
        age: 33,
        city: "OK...1",
      }, {
        name: 'C18',
        age: 34,
        city: "OK...2",
      }, {
        name: 'Carlson',
        age: 35,
        city: "OK...3",
      }]
    };
  },
  methods: {
    loadDate(value, calendarioComponent) {
      console.log("agenda: " + value);
      console.log(this.$lsw.database);
    }
  },
  watch: {

  },
  async mounted() {
    try {
      this.$trace("lsw-agenda.mounted");
    } catch (error) {
      console.log(error);
    }
  }
});