let trackerCounter = 0;

Vue.component("LswAgendaTaskForm", {
  name: "LswAgendaTaskForm",
  template: $template,
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