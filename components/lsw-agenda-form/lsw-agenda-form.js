
Vue.component("LswAgendaForm", {
  template: $template,
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